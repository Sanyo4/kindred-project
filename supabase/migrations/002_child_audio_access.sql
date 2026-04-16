-- Allow unauthenticated child devices to access recordings
-- Child devices have no Supabase auth session (family_id stored in localStorage)

-- Make recordings bucket public so getPublicUrl() works without auth
update storage.buckets set public = true where id = 'recordings';

-- Open SELECT on storage.objects for recordings bucket
-- (child devices need to stream audio without being authenticated)
create policy "Anyone can read recordings"
  on storage.objects for select
  using (bucket_id = 'recordings');

-- Open SELECT on story_recordings so child can fetch recording metadata
create policy "Anyone can view recordings for playback"
  on story_recordings for select
  using (true);
