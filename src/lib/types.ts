// --- Story Types ---

export interface DialogicPrompt {
  type: 'completion' | 'wh-question' | 'recall' | 'open-ended' | 'distancing';
  text: string;
  audioLabel: string;
  triggerAfterSeconds: number;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  illustration: string;
  illustrationDescription: string;
  dimmingLevel: number;
  prompts: DialogicPrompt[];
  isGoodnight?: boolean;
}

export interface Story {
  id: string;
  family_id: string;
  title: string;
  author: string;
  page_count: number;
  target_age: string;
  pages: StoryPage[];
  goodnight_message: {
    slot: boolean;
    defaultText: string;
  };
  created_at: string;
}

// --- Family & Auth Types ---

export interface Family {
  id: string;
  name: string;
  family_code: string;
  created_at: string;
}

export interface Profile {
  id: string;
  family_id: string | null;
  display_name: string;
  role: 'parent' | 'caregiver';
  avatar_url: string | null;
  created_at: string;
}

export interface ChildDevice {
  id: string;
  family_id: string;
  device_name: string;
  child_name: string;
  paired_at: string;
}

// --- Session Types ---

export type SessionMode = 'SYNC' | 'ASYNC' | 'ASYNC_FALLBACK';

export interface Session {
  id: string;
  family_id: string;
  story_id: string;
  recording_id: string | null;
  mode: SessionMode;
  started_at: string;
  ended_at: string | null;
  current_page: number;
  is_complete: boolean;
}

// --- Session Events ---

export type EventType =
  | 'session_start'
  | 'session_end'
  | 'page_turn'
  | 'prompt_shown'
  | 'prompt_response'
  | 'prompt_timeout'
  | 'mode_change'
  | 'fallback_activated'
  | 'owl_state_change'
  | 'dimming_change'
  | 'connection_quality'
  | 'nightlight_start'
  | 'webrtc_connected'
  | 'webrtc_failed';

export interface SessionEvent {
  id: string;
  session_id: string;
  event_type: EventType;
  payload: Record<string, unknown>;
  created_at: string;
}

// --- Owl Types ---

export type OwlState = 'awake' | 'cosy' | 'sleepy' | 'asleep';

// --- Realtime Events ---

export interface PageSyncPayload {
  pageNumber: number;
  timestamp: number;
}

export interface PromptTriggerPayload {
  promptIndex: number;
}

export interface PingPayload {
  from: 'parent' | 'child';
  timestamp: number;
}

// --- WebRTC Signaling Types ---

export type WebRTCConnectionState = 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed';

// --- Recording Types ---

export interface StoryRecording {
  id: string;
  story_id: string;
  recorded_by: string;
  audio_url: string;
  page_timeline: PageTimeline;
  duration_seconds: number;
  created_at: string;
}

export interface PageTimeline {
  entries: {
    pageNumber: number;
    startTimestamp: number;
    endTimestamp: number;
    promptTimestamps: {
      promptIndex: number;
      timestamp: number;
    }[];
  }[];
}
