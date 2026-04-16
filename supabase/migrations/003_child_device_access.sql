-- Child devices are unauthenticated (paired via family code, IDs in localStorage).
-- They need read access to stories and sessions, and write access to sessions.

-- Stories: anonymous read (filtered client-side by family_id)
create policy "Child devices can view stories"
  on stories for select
  using (true);

-- Sessions: anonymous read, insert, update
create policy "Child devices can view sessions"
  on sessions for select
  using (true);

create policy "Child devices can create sessions"
  on sessions for insert
  with check (true);

create policy "Child devices can update sessions"
  on sessions for update
  using (true);

-- Session events: child devices already have insert via "Anyone can insert events"
-- No changes needed there.

-- Enable Supabase Realtime on sessions table so child can subscribe to changes
alter publication supabase_realtime add table sessions;
