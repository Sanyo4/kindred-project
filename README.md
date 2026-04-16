# Kindred

Kindred is a bedtime storytelling app for work-separated families. It lets a travelling parent read to a preschool child remotely through a shared digital storybook, with live page sync, live audio/video, and fallback to recorded narration.

## Core Features

- AI-generated bedtime stories with page-by-page prompts
- Shared illustrated storybook for parent and child
- Real-time page synchronisation
- Parent-to-child WebRTC audio/video stream
- Story recording and playback for asynchronous reading
- Sync-to-async fallback when a live session ends or drops
- Progressive dimming and owl-led bedtime wind-down
- Event logging for dissertation evaluation

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Realtime Broadcast, and Storage
- WebRTC for parent-to-child media streaming
- Vercel AI SDK + Groq for structured story generation

## Project Structure

```text
src/
  app/            App routes for parent, child, auth, and API
  components/     Story, reading, owl, recording, and shared UI
  hooks/          Realtime sync, WebRTC, audio, and connection hooks
  lib/            Types, Supabase clients, story generation, utilities

public/
  illustrations/  Storybook SVG asset set

supabase/
  migrations/     Database schema and policy SQL
```

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with the required credentials:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=
```

3. Apply the SQL files in `supabase/migrations/` to your Supabase project.

4. Start the development server:

```bash
npm run dev
```

5. Build for production verification:

```bash
npm run build
```

## Notes

- The app expects a configured Supabase project for auth, storage, and realtime sync.
- WebRTC is configured with public STUN only; TURN support was left out of scope for the MVP.
- Story illustrations are stored in `public/illustrations/` and rendered through a recipe-based illustration system.
