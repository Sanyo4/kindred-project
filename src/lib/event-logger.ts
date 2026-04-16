import type { SupabaseClient } from '@supabase/supabase-js';
import type { EventType } from './types';

export async function logSessionEvent(
  supabase: SupabaseClient,
  sessionId: string,
  eventType: EventType,
  payload: Record<string, unknown> = {}
) {
  const { error } = await supabase
    .from('session_events')
    .insert({
      session_id: sessionId,
      event_type: eventType,
      payload,
    });

  if (error) {
    console.error(`Failed to log event ${eventType}:`, error);
  }
}
