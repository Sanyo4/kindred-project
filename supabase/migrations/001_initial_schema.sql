-- Families
create table families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  family_code text unique not null,
  created_at timestamptz default now()
);

-- Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  family_id uuid references families(id) on delete set null,
  display_name text not null,
  role text not null check (role in ('parent', 'caregiver')),
  avatar_url text,
  created_at timestamptz default now()
);

-- Child devices (paired via family code)
create table child_devices (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  device_name text not null default 'Tablet',
  child_name text not null,
  paired_at timestamptz default now()
);

-- Stories (AI-generated or curated)
create table stories (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  title text not null,
  author text not null default 'Kindred AI',
  page_count int not null,
  target_age text not null default 'preschool',
  pages jsonb not null,
  goodnight_message jsonb,
  created_at timestamptz default now()
);

-- Story recordings (parent audio for story banking)
create table story_recordings (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references stories(id) on delete cascade,
  recorded_by uuid not null references profiles(id),
  audio_url text not null,
  page_timeline jsonb not null,
  duration_seconds int not null,
  created_at timestamptz default now()
);

-- Sessions (a reading session)
create table sessions (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id),
  story_id uuid not null references stories(id),
  recording_id uuid references story_recordings(id),
  mode text not null default 'SYNC' check (mode in ('SYNC', 'ASYNC', 'ASYNC_FALLBACK')),
  started_at timestamptz default now(),
  ended_at timestamptz,
  current_page int not null default 1,
  is_complete boolean not null default false
);

-- Session events (evaluation logging)
create table session_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}',
  created_at timestamptz default now()
);

-- Indexes for fast event queries
create index idx_session_events_session_id on session_events(session_id);
create index idx_session_events_type on session_events(event_type);

-- RLS policies
alter table families enable row level security;
alter table profiles enable row level security;
alter table child_devices enable row level security;
alter table stories enable row level security;
alter table story_recordings enable row level security;
alter table sessions enable row level security;
alter table session_events enable row level security;

-- Families
create policy "Users view own family" on families
  for select using (
    id in (select family_id from profiles where id = auth.uid())
  );
create policy "Authenticated users can create families" on families
  for insert with check (auth.uid() is not null);

-- Profiles
create policy "Users view own profile" on profiles
  for select using (id = auth.uid());
create policy "Users can insert own profile" on profiles
  for insert with check (id = auth.uid());
create policy "Users update own profile" on profiles
  for update using (id = auth.uid());

-- Child devices
create policy "Family members view child devices" on child_devices
  for select using (
    family_id in (select family_id from profiles where id = auth.uid())
  );
create policy "Anyone can insert child devices" on child_devices
  for insert with check (true);

-- Stories
create policy "Family members view stories" on stories
  for select using (
    family_id in (select family_id from profiles where id = auth.uid())
  );
create policy "Family members create stories" on stories
  for insert with check (
    family_id in (select family_id from profiles where id = auth.uid())
  );

-- Story recordings
create policy "Family members view recordings" on story_recordings
  for select using (
    story_id in (
      select id from stories where family_id in (
        select family_id from profiles where id = auth.uid()
      )
    )
  );
create policy "Parents create recordings" on story_recordings
  for insert with check (recorded_by = auth.uid());

-- Sessions
create policy "Family members view sessions" on sessions
  for select using (
    family_id in (select family_id from profiles where id = auth.uid())
  );
create policy "Family members create sessions" on sessions
  for insert with check (
    family_id in (select family_id from profiles where id = auth.uid())
  );
create policy "Family members update sessions" on sessions
  for update using (
    family_id in (select family_id from profiles where id = auth.uid())
  );

-- Session events
create policy "Anyone can insert events" on session_events
  for insert with check (true);
create policy "Family members view events" on session_events
  for select using (
    session_id in (
      select id from sessions where family_id in (
        select family_id from profiles where id = auth.uid()
      )
    )
  );

-- Storage bucket for recordings
insert into storage.buckets (id, name, public) values ('recordings', 'recordings', false);

create policy "Authenticated users upload recordings" on storage.objects
  for insert with check (bucket_id = 'recordings' and auth.uid() is not null);
create policy "Authenticated users read recordings" on storage.objects
  for select using (bucket_id = 'recordings' and auth.uid() is not null);

-- Auto-create profile on signup (trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Parent'), 'parent');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
