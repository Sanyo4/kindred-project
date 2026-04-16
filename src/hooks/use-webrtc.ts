'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logSessionEvent } from '@/lib/event-logger';
import type { WebRTCConnectionState } from '@/lib/types';

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
];

const OFFER_RETRY_INTERVAL = 3000;
const MAX_ICE_RESTARTS = 3;

interface UseWebRTCOptions {
  sessionId: string;
  role: 'parent' | 'child';
  enabled?: boolean;
}

export function useWebRTC({ sessionId, role, enabled = true }: UseWebRTCOptions) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionState, setConnectionState] = useState<WebRTCConnectionState>('new');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const iceCandidateQueue = useRef<RTCIceCandidate[]>([]);
  const offerRetryRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iceRestartCount = useRef(0);
  const hasAnswered = useRef(false);

  useEffect(() => {
    if (!enabled || !sessionId) return;

    const supabase = createClient();
    const channel = supabase.channel(`webrtc:${sessionId}`);
    let pc: RTCPeerConnection | null = null;
    let localMedia: MediaStream | null = null;
    const childReady = { current: false };
    const remoteMediaStream = new MediaStream();

    function createPeerConnection() {
      const conn = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pcRef.current = conn;

      conn.onicecandidate = (event) => {
        if (event.candidate) {
          channel.send({
            type: 'broadcast',
            event: 'webrtc_ice',
            payload: { candidate: event.candidate.toJSON(), from: role },
          });
        }
      };

      conn.oniceconnectionstatechange = () => {
        const state = conn.iceConnectionState;
        if (state === 'connected' || state === 'completed') {
          setConnectionState('connected');
          iceRestartCount.current = 0;
          clearOfferRetry();
          logSessionEvent(supabase, sessionId, 'webrtc_connected', { role });
        } else if (state === 'disconnected') {
          setConnectionState('disconnected');
        } else if (state === 'failed') {
          if (iceRestartCount.current < MAX_ICE_RESTARTS) {
            iceRestartCount.current++;
            conn.restartIce();
            if (role === 'parent') {
              createAndSendOffer(conn);
            }
          } else {
            setConnectionState('failed');
            logSessionEvent(supabase, sessionId, 'webrtc_failed', {
              role,
              restartAttempts: iceRestartCount.current,
            });
          }
        } else if (state === 'checking') {
          setConnectionState('connecting');
        }
      };

      conn.ontrack = (event) => {
        event.streams[0]?.getTracks().forEach((track) => {
          remoteMediaStream.addTrack(track);
        });
        setRemoteStream(remoteMediaStream);
      };

      return conn;
    }

    async function createAndSendOffer(conn: RTCPeerConnection) {
      try {
        const offer = await conn.createOffer();
        await conn.setLocalDescription(offer);
        channel.send({
          type: 'broadcast',
          event: 'webrtc_offer',
          payload: { sdp: conn.localDescription },
        });
      } catch (e) {
        console.error('Failed to create/send offer:', e);
      }
    }

    function clearOfferRetry() {
      if (offerRetryRef.current) {
        clearInterval(offerRetryRef.current);
        offerRetryRef.current = null;
      }
    }

    async function flushIceCandidateQueue(conn: RTCPeerConnection) {
      for (const candidate of iceCandidateQueue.current) {
        try {
          await conn.addIceCandidate(candidate);
        } catch (e) {
          console.error('Failed to add queued ICE candidate:', e);
        }
      }
      iceCandidateQueue.current = [];
    }

    // Set up signaling listeners
    channel.on('broadcast', { event: 'webrtc_ice' }, async ({ payload }) => {
      if (payload.from === role) return;
      const candidate = new RTCIceCandidate(payload.candidate);
      if (pc?.remoteDescription) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (e) {
          console.error('Failed to add ICE candidate:', e);
        }
      } else {
        iceCandidateQueue.current.push(candidate);
      }
    });

    if (role === 'parent') {
      // Parent: capture media, wait for child ready, then offer
      channel.on('broadcast', { event: 'webrtc_ready' }, async ({ payload }) => {
        if (payload.role === 'child') {
          childReady.current = true;
          if (localMedia && pc && !pc.remoteDescription) {
            await createAndSendOffer(pc);
            // Retry offer if no answer received
            clearOfferRetry();
            offerRetryRef.current = setInterval(() => {
              if (pc && pc.signalingState !== 'stable') {
                createAndSendOffer(pc);
              } else {
                clearOfferRetry();
              }
            }, OFFER_RETRY_INTERVAL);
          }
        }
      });

      channel.on('broadcast', { event: 'webrtc_answer' }, async ({ payload }) => {
        if (!pc) return;
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
          await flushIceCandidateQueue(pc);
          clearOfferRetry();
        } catch (e) {
          console.error('Failed to set remote description from answer:', e);
        }
      });

      channel.subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;

        // Capture media
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: 'user', width: { ideal: 320 }, height: { ideal: 320 } },
          });
          localMedia = stream;
          localStreamRef.current = stream;
          setLocalStream(stream);

          // Create peer connection and add tracks
          pc = createPeerConnection();
          stream.getTracks().forEach((track) => pc!.addTrack(track, stream));

          // Signal ready
          channel.send({
            type: 'broadcast',
            event: 'webrtc_ready',
            payload: { role: 'parent' },
          });

          // If child is already ready, start immediately
          if (childReady.current) {
            await createAndSendOffer(pc);
            offerRetryRef.current = setInterval(() => {
              if (pc && pc.signalingState !== 'stable') {
                createAndSendOffer(pc);
              } else {
                clearOfferRetry();
              }
            }, OFFER_RETRY_INTERVAL);
          }
        } catch (e) {
          console.error('getUserMedia failed:', e);
        }
      });
    } else {
      // Child: wait for offer, create answer
      channel.on('broadcast', { event: 'webrtc_offer' }, async ({ payload }) => {
        // Only answer once per offer (avoid duplicate answers from retries)
        if (hasAnswered.current && pc?.remoteDescription) return;

        try {
          if (!pc) {
            pc = createPeerConnection();
          }
          await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
          await flushIceCandidateQueue(pc);

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          channel.send({
            type: 'broadcast',
            event: 'webrtc_answer',
            payload: { sdp: pc.localDescription },
          });
          hasAnswered.current = true;
        } catch (e) {
          console.error('Failed to handle offer:', e);
        }
      });

      channel.subscribe((status) => {
        if (status !== 'SUBSCRIBED') return;
        channel.send({
          type: 'broadcast',
          event: 'webrtc_ready',
          payload: { role: 'child' },
        });
      });
    }

    return () => {
      clearOfferRetry();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
      setLocalStream(null);
      setRemoteStream(null);
      pcRef.current?.close();
      pcRef.current = null;
      iceCandidateQueue.current = [];
      hasAnswered.current = false;
      iceRestartCount.current = 0;
      supabase.removeChannel(channel);
    };
  }, [sessionId, role, enabled]);

  const toggleAudio = useCallback(() => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  }, []);

  const toggleVideo = useCallback(() => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  }, []);

  return {
    localStream,
    remoteStream,
    connectionState,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
  };
}
