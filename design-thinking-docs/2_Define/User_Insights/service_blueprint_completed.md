# Service Blueprint -- Kindred Bedtime Storytelling App

**Goal:** Map the end-to-end journey for Kindred's bedtime storytelling experience, separating Customer Actions from Backstage Events. This blueprint covers three scenarios: synchronous (live) reading, asynchronous (pre-recorded) reading, and the critical sync-to-async graceful degradation when a connection drops mid-session. Support processes include the Mindell-inspired routine habit tracker.

**Data Sources:** `persona_completed.md` (Sarah + Max), `solution_tree_completed.md` (Strategies A1–A5, B1–B5, C1–C5), `5_whys_completed.md` (convergence on B2/B5), `thematic_analysis_completed.md`

---

## 1. Blueprint Architecture (Standard Layers)

The blueprint uses the standard 5-layer service design architecture, adapted for Kindred's three-interface model (Remote Parent, Child, At-Home Caregiver):

* **Physical Evidence:** Touchpoints the user interacts with — devices (parent's phone in hotel; child's tablet propped on bed; caregiver's phone for notifications), push notifications, the app UI, digital storybook pages, parent's PIP face overlay, animated character guide.
* **Customer Actions:** What each user does, split into three swimlanes:
    * **Remote Parent** — reads, records, triggers prompts, reviews engagement.
    * **Child** — taps, listens, responds to prompts, turns pages.
    * **At-Home Caregiver** — initiates session (single tap), then steps away. Deliberately thin swimlane per Strategy C3.
* --- *Line of Interaction* ---
* **Front Stage Actions:** App UI responses visible to users — Reader View, character animations, PIP overlays, prompt thought bubbles, goodnight animations.
* --- *Line of Visibility* ---
* **Back Stage Actions:** Server-side logic invisible to users — WebSocket room management, `page_sync` events, connection health monitoring, sync-to-async degradation logic, session state persistence.
* --- *Line of Internal Interaction* ---
* **Support Processes:** Auth service, CDN asset delivery, push notification service (FCM/APNs), blob storage (for recorded narrations), database (session logs, routine tracker data), Mindell-inspired "dose" history.

---

## 2. Scenario 1: Synchronous (Live) Reading

*Focus: Managing real-time state, WebSocket sync, and dual-PIP video. Sarah reads live to Lily from a hotel room.*

| Layer | Step 1: Initiation | Step 2: Reading | Step 3: Interaction | Step 4: Wrap-up |
| :--- | :--- | :--- | :--- | :--- |
| **Evidence** | Push notification on caregiver's phone: *"Story time with Mummy in 5 min — tap to start"* (Strategy B5). Child's tablet displays splash with parent's face + tonight's book cover. | Storybook page visible on both devices simultaneously. Parent's face in PIP corner on child's screen. Child's face in PIP on parent's screen. Text highlighting synced as parent reads. | Character "thought bubble" appears on story page with PEER/CROWD prompt (Strategy A2). Audio instruction plays: *"Tap the owl!"* Character hand demonstrates the tap gesture (Strategy A3). | *"Goodnight"* animation with progressive screen dimming (Strategy C5). Parent's personalised goodnight message plays. Completion sticker awarded. Screen brightness reduces to minimum. |
| **---** | **---** | **---** | **---** | **---** |
| **Caregiver Action** | Taps push notification. Hands tablet to child. Steps away. **Total involvement: ~10 seconds.** (Addresses C3: *"If it's not open-tap-play she won't use it"*) | None required. | None required. | None required. |
| **Child Action** | Sees parent's face on splash. Taps *"Open Book"* (large illustrated button with audio label). Picks tonight's story from 2–3 options shown as book covers. | Watches pages, listens to parent reading. Can tap page elements for audio labels (e.g., tap the fox → *"Fox!"*). | Taps character thought bubble. Answers CROWD prompt (e.g., taps the correct colour, points to the character). If no response within 10s: escalation cascade begins (Strategy A4). | Waves goodbye to parent via camera. Receives completion sticker. Device auto-dims. |
| **Parent Action** | Receives *"Lily is ready!"* notification. Opens app from hotel room. Joins session. | Reads aloud. Sees child's face in PIP. Sees synchronised page. Can tap to highlight/point — visible on child's screen as a hand cursor (Strategy B4). | Sees prompt displayed on own screen. Can guide child: *"Look at the owl, Lily!"* Sees child's tap response in real time. Can trigger additional prompts or skip. At escalation tier 3: models gesture via live video (Strategy A4). | Says personalised goodnight. Taps *"End Story."* Reviews session summary: pages read, prompts completed, engagement duration, Lily's prompt success rate. |
| **---** | **---** | **---** | **---** | **---** |
| **Front Stage** | Splash screen: parent PIP + book selector (2–3 covers with audio labels). One-tap join. Calm palette — warm blues, soft purples (Strategy C5). | Shared Reader View: synchronised book pages + dual PIP video + text highlighting. Gentle page-turn animation. Parent's touch indicator visible on child's screen as hand cursor. | Character animation: thought bubble slides in from side. Audio prompt plays. **Escalation cascade:** (1) Repeat audio prompt after 10s, (2) Character hand demonstrates gesture after 15s, (3) Parent prompted to model via video after 20s (Strategy A4). | Goodnight animation: stars fade in, screen dims progressively. Completion sticker with gentle chime. Session summary card for parent. |
| **---** | **---** | **---** | **---** | **---** |
| **Back Stage** | Create WebSocket Room (`room_id: UUID`). Authenticate both devices via JWT. Load story asset manifest from CDN. Emit `session_start` event. **Connection quality check:** if latency >300ms or packet loss >5%, recommend async mode proactively. | **WS: Emit `page_sync`** events on parent page-turn. Synchronise touch coordinates via `touch_indicator` events. Stream audio/video via WebRTC with TURN server fallback for NAT traversal. **Connection health monitor:** `ping` every 5s; timeout threshold at 3 consecutive misses (15s). | Emit `prompt_shown` event with prompt type (Completion/Recall/Open/Wh/Distancing). Log `child_response` event with timestamp, response type, and escalation tier reached. Track engagement metrics: time-to-respond, accuracy, escalation frequency. | Emit `session_end` event. Save session log to database. Calculate session metrics (duration, pages, prompt completion rate). **Update "dose" history** (Mindell tracker). Trigger async backup: save session state so story can resume if interrupted. |
| **---** | **---** | **---** | **---** | **---** |
| **Support** | Auth Service (JWT token validation). Push Notification Service (FCM/APNs). CDN: pre-cached book assets on child's device (images, audio labels). | CDN asset delivery. WebRTC TURN server for NAT traversal. Audio-visual sync engine. | Activity logger (prompt-response pairs). Prompt sequencing engine: PEER/CROWD progression tracks across repeated readings of same book. | Database: session log write. **Mindell routine tracker** update (see Section 5). Push notification to parent: session summary. |
| **---** | **---** | **---** | **---** | **---** |
| **KPI** | <1s load time after caregiver tap. 100% caregiver involvement limited to initiation (0 mid-session interactions). | 100% page sync (sub-100ms latency per Raffle et al. benchmark). <2% video frame drop. | 80%+ child engagement with prompts (Outcome A2 target from Solution Tree). <10% escalation to tier 3 (adult modelling). | Session log saved within 2s. "Dose" counter incremented. Parent satisfaction >4/5 on felt-presence scale (Outcome A4). |

---

## 3. Scenario 2: Asynchronous (Pre-Recorded) Reading

*Focus: Time-zone handling, offline-first playback, and the recording workflow. For P2, P3, and P4, this is the PRIMARY mode — not a degraded version of sync.*

> **Design principle:** The async mode is not a fallback. The thematic analysis states: *"The core value proposition is routine continuity through pre-recorded narrated stories, not 'video calling but better.' The async mode is not a fallback; for the majority of use cases in this dataset, it is the primary mode."* (Theme 1: "The Routine Must Survive")

| Layer | Step 1: Parent Recording | Step 2: Content Delivery | Step 3: Child Playback | Step 4: Response Loop |
| :--- | :--- | :--- | :--- | :--- |
| **Evidence** | Recording interface on parent's phone. Book pages visible in recording view. PIP preview showing what child will see (addresses P5 self-consciousness: parent reads TO the preview, not into a void). Prompt trigger points marked on timeline. *"Stories banked: 3/5 for this trip"* counter. | *"Daddy sent a story!"* notification on caregiver's phone / child's tablet. Story thumbnail showing parent's face + book cover. Scheduled for delivery at bedtime per routine tracker. | Full-screen storybook with parent's recorded narration playing in sync with page advances. Parent's face in PIP corner (recorded). Character prompts still active and interactive — pre-sequenced by parent during recording. | Parent receives notification: *"Lily watched Owl Babies!"* Session duration, prompts completed, and (optional) child's reaction selfie/short video clip captured at goodnight screen. |
| **---** | **---** | **---** | **---** | **---** |
| **Caregiver Action** | N/A | Taps notification. Hands tablet to child. (For ages 5+, child may self-initiate from the story notification; for ages 7+, child initiates independently per Strategy C4.) | None required. | None required. |
| **Child Action** | N/A | Sees notification. Excited: *"Mummy's story!"* Taps to open. | Listens to recording. Turns pages — auto-advance synced to narration with manual override (tap to advance or tap-and-hold to pause). Taps character prompts: these are interactive even in async mode (pre-positioned by parent during recording, with pre-recorded response audio). At ages 3–4: selects from curated set of 2–3 stories. At ages 5+: browses library. | Optional: prompted to take a selfie or say *"Goodnight Mummy!"* to camera (captured as reaction clip). Receives completion sticker. |
| **Parent Action** | Opens app during available window (e.g. P4: 2–5am quiet patch on night shift; P1: hotel evening; P2: late-night hotel downtime). Selects book from library. Reads aloud — voice recorded. Taps to advance pages. Places prompt trigger points: *"Ask about the owl here."* Records personalised messages at key pages: *"I love you, sleep tight."* Can **batch-record** 2–3 stories if desired (P4: *"banking content"*). | Receives *"Story delivered"* confirmation. Can set scheduled delivery time (default: child's bedtime per routine tracker). | Receives *"Child is listening"* real-time status if device has connectivity. | Views reaction clip. Sees engagement metrics (duration, pages, prompt completion). Receives "dose" tracker update: *"4 consecutive nights."* |
| **---** | **---** | **---** | **---** | **---** |
| **Front Stage** | Recording interface: book pages + parent face PIP + child-perspective preview panel (what the child will see). Ambient noise indicator (warns if hotel AC is audible). Prompt placement UI: drag markers to page positions. Personalised message recorder at bookmarks. *"Stories banked: 3/5"* trip counter. | Push notification with story thumbnail. Story card in child's library with *"NEW"* badge. Scheduled delivery: notification arrives at bedtime. | Autoplay Sync Reader: pages advance in sync with recorded narration. Parent PIP plays recorded face (warm, present, not a static thumbnail). Character prompts appear at parent-set trigger points. Calm bedtime palette. Progressive dimming on final pages. | *"Goodnight!"* screen. Optional reaction capture: front camera activates briefly with gentle prompt. Session complete sticker. |
| **---** | **---** | **---** | **---** | **---** |
| **Back Stage** | Upload narration audio blob to object storage (S3/R2). Generate **page-sync timeline JSON**: maps narration timestamps to page indices, prompt trigger points, and personalised message positions. Compress and optimise for offline delivery. Queue for content packaging. | Push notification via FCM/APNs. **Pre-download story package** to child's device: book page images + narration audio + sync timeline JSON + prompt definitions + parent PIP video segments. **Offline-first architecture:** download during WiFi windows, not mobile data. Update session queue in database. | **Fetch locally cached story package — zero network required at playback.** (Directly addresses P3: *"If your app needs a stable video connection it's useless to me."*) Play narration synced to page timeline. Trigger character prompts at pre-set timestamps. Log prompt interactions locally; sync to server when connectivity resumes. | Upload reaction clip to storage. Send push notification to parent with session summary payload. **Update "dose" history** (Mindell tracker). Sync local engagement logs to server. |
| **---** | **---** | **---** | **---** | **---** |
| **Support** | Object storage (S3/R2). Audio transcoding pipeline. Timeline generation engine (narration → page-sync JSON). Batch queue manager (multi-story recording sessions). | Push notification service (FCM/APNs). Offline content packager. Pre-download scheduler (opportunistic WiFi download). | **Local playback engine** (no server dependency). Prompt interaction logger (local-first, eventual-sync). | Reaction clip storage. Notification service. Mindell routine tracker. Database: session log. |
| **---** | **---** | **---** | **---** | **---** |
| **KPI** | Recording completes in <1.5x story reading time (minimal overhead). Upload succeeds within 60s on 3G. Batch recording of 3 stories in <20 minutes. | Story package pre-downloaded to device >95% of the time before bedtime. Notification delivered within 30s of scheduled time. | **100% offline playback success** (zero network dependency). 80%+ child prompt engagement (matching sync benchmark). | Reaction clip delivered to parent within 5 minutes of session end (when connectivity available). "Dose" counter incremented. |

---

## 4. Scenario 3: Sync-to-Async Graceful Degradation

*Focus: The critical fail-safe when a WebSocket connection drops mid-reading session. This is the core architectural differentiator identified in the 5 Whys convergence (Analyses 1, 3, and 5 converge on B2/B5). It directly prevents the most damaging incident in the dataset: P4's pager going off mid-story and a child reacting with prolonged distress.*

> **Design principle:** The story ALWAYS finishes. The routine NEVER breaks. An abrupt disconnection is actively harmful — the child cannot cognitively separate "Daddy left the call" from "Daddy left me." *(5 Whys Analysis 1; Theme 4: "When Connection Breaks")*

### Trigger Conditions

| Trigger | Detection Mechanism | Timeline |
| :--- | :--- | :--- |
| WiFi drops mid-story | Server detects `ping` timeout: 3 consecutive missed pings at 5s intervals = 15s total | Automatic |
| Parent must leave suddenly (pager, emergency, meeting) | Parent taps **"I need to go"** button (always visible in parent UI as a small exit icon) | Manual |
| Connection degrades below quality threshold | Latency >500ms sustained for >10s OR packet loss >10% | Automatic |

### Degradation Sequence

```
Timeline    Child's Screen                          Back Stage Logic
─────────────────────────────────────────────────────────────────────────
0s          Live reading in progress                 ping OK
5s          Live reading continues                   ping MISS #1 → log warning
10s         Live reading continues (no visible       ping MISS #2 → prepare fallback:
            change to child)                         locate pre-cached async recording
                                                     of current story
15s         Character guide slides in:               ping MISS #3 → TRIGGER FALLBACK
            "Let's keep reading while Mummy           └→ Emit `fallback_activated` event
            gets comfortable!"                        └→ Load async recording
            Brief character animation (3s buffer)     └→ Seek to current_page_index
20s         Recorded narration begins from            Seamless audio crossfade:
            current page. Parent's recorded face      live PIP → recorded PIP (0.5s fade)
            replaces live PIP. Story continues        Session mode: SYNC → ASYNC_FALLBACK
            without interruption.
20s–end     Child continues reading session           Log all interactions locally.
            normally. May not notice the switch.      Monitor for parent reconnection.
                                                     If parent reconnects within 5 min:
                                                       → offer seamless re-transition to live
                                                     If not:
                                                       → async plays to completion
End         Goodnight animation + sticker             Save session log with mode flag:
            (identical to normal completion)           "sync_partial + async_fallback"
                                                     Update "dose" counter (session COMPLETE)
```

### Parent Experience During Degradation

1. **Connection lost:** Parent sees *"Connection interrupted — Lily's story is continuing with your recording"* message.
2. **If reconnection possible:** Parent sees *"Reconnect?"* button. Tapping it re-establishes the live session seamlessly from the current page.
3. **If reconnection not possible** (or parent tapped "I need to go"): Parent receives a notification after the session completes with the full summary — pages read, prompts completed, mode transition logged. The session counts as complete in the "dose" tracker.

### Prerequisite: Async Recording Must Exist

The fail-safe depends on a pre-cached async recording of the current story existing on the child's device. The system handles the case where no recording exists:

| Condition | System Response |
| :--- | :--- |
| Async recording of current story exists on device | Seamless switch (sequence above) |
| Async recording exists but for a different page range | Switch to recording; start from nearest available page with character bridge: *"Let's go back to this part!"* |
| No async recording of this story exists | **Character-led completion:** The in-app character guide narrates remaining pages using text-to-speech with the book's built-in audio. Less personal but the story still finishes. Parent dashboard flags: *"Record a backup of [Story Title] for next time"* |
| No async recording of ANY story exists (first-time use) | Character reads remaining pages. Onboarding prompt to parent: *"Record your first story so Lily always has your voice at bedtime"* |

---

## 5. Pain Points & Fail-Safe Mechanisms

*How the Back Stage handles friction across all scenarios.*

| Friction Point | Theme | Detection Mechanism | Child Experience | Back Stage Logic | Solution Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Poor WiFi (Parent) — connection drops mid-story** | Theme 5 | `ping` timeout (3 × 5s) | Character buffer animation → seamless switch to async recording (see Scenario 3) | Load cached async; resume from `current_page_index`; log `fallback_activated`; monitor for reconnection | **B2:** Async Fallback |
| **Parent must leave suddenly** (pager, emergency) | Theme 4 | Parent taps "I need to go" button | Character says *"Mummy says goodnight early tonight!"* → async continues to completion | Emit `parent_exit` event; activate fallback immediately (no 15s wait); send parent session summary later | **B2 + C4:** Harm reduction |
| **Child doesn't understand gesture prompt** | Theme 2 | `timeout_event`: no response within 10s | **Tier 1** (10s): Repeat audio prompt. **Tier 2** (15s): Character hand demonstrates gesture with visible contact dot. **Tier 3** (20s): Parent prompted to model via live video; in async mode, character demonstrates with simplified instruction | Log `escalation_tier`; adjust future prompt difficulty for this child's age profile | **A3 + A4:** Multimodal scaffolding |
| **Child's device has no connectivity at all** (e.g., rural, airplane mode) | Theme 5 | Detected at app launch: no network | Plays from fully local cache. All interactions logged locally, synced to server when connectivity resumes. Parent does not receive real-time status but gets summary when device reconnects. | **Offline-first architecture**: story packages pre-downloaded; local-first storage with eventual-sync | **B2:** Offline-first |
| **Caregiver cannot operate the app** (grandparent, low tech literacy) | Theme 3 | N/A — addressed by design | Push notification → single tap → story begins. No account login, no navigation, no troubleshooting. For ages 5+: child self-initiates from notification. For ages 7+: child initiates independently. | Session initiation via deep-link in push notification; pre-authenticated device token; no per-session login | **B5 + C3:** One-tap setup |
| **Multi-child screen competition** (twins, siblings) | Theme 5 | Parent configures per-child story queue during recording | Per-child story selection: *"Child 1's turn — Owl Babies"* then *"Child 2's turn — Room on the Broom."* Sequential playback with child-specific character greeting. | Per-child session IDs; separate engagement logs; parent receives per-child summary | **B3:** Multi-child support |
| **Parent feels self-conscious recording** (performing into void) | Theme 1 | N/A — addressed by recording UI design | N/A — parent-side issue | Recording interface shows child-perspective preview panel: parent sees what the child will see (PIP face + book pages), making it feel like reading TO the child, not into a camera. Ambient sound monitor. Warm, cosy recording UI. | **B5:** Purpose-built recording experience |
| **3+ consecutive missed bedtimes** (critical threshold per Mindell) | Theme 4 | "Dose" tracker detects streak break approaching | N/A — parent-side notification | Mindell tracker sends proactive alert to parent: *"Lily hasn't had story time in 2 nights — would you like to record one now?"* Surfaces pre-recorded stories as quick option. | **C1 + C5:** Routine preservation |

---

## 6. Mindell-Inspired Routine Habit Tracker (Support Process)

*A persistent back-stage/support process running across all three scenarios. Based on Mindell et al. (2015): dose-dependent positive association between bedtime routine consistency and children's sleep outcomes. This is not a front-stage feature — it is a data layer that drives notifications, recommendations, and the parent dashboard.*

### Components

#### 6.1 "Dose" Counter
Tracks **consecutive nights with a completed bedtime story session** (live, async, or fallback — all count equally). Visible to the parent as a streak counter on the dashboard.

* **Research basis:** Mindell et al. (2015) showed that routine consistency has a dose-dependent positive effect on going to sleep, sleep quality, and night waking. More consistent routine nights = better sleep outcomes.
* **Design rule:** A session counts as "complete" if the story reached the final page, regardless of mode. A fallback-completed session counts the same as a fully live session. The routine survived — that is what matters.
* **Display:** Streak counter on parent dashboard: *"12 consecutive nights"* with gentle visual indicator (growing constellation of stars).

#### 6.2 Trip Planner Integration
When the parent logs upcoming trip dates (or the system detects a recurring travel pattern), the tracker calculates how many async recordings are needed to cover every night of absence.

* **Pre-trip prompt:** *"You're away Mon–Thu. You have 2 stories banked. Record 2 more to cover every night."*
* **Batch recording window:** Surfaces recording UI on Sunday evening (or whenever the parent's schedule shows availability) with the suggested story count.
* **Banking model:** P4 validated this directly: *"The core idea of banking content when I'm free and deploying it when I'm not — that makes complete sense."*

#### 6.3 Bedtime Clock (Strategy C2)
Dual-timezone display showing:

* Parent's current local time
* Child's current local time
* Tonight's overlap window (if any) for a live session
* Recommendation: **LIVE** (overlap exists and connection quality is good) or **ASYNC** (no overlap, or connection quality below threshold)
* Upcoming nights flagged as async-only based on the parent's itinerary

#### 6.4 Weekly Summary
Push notification to parent, sent Sunday evening:

> *"Lily had story time 6 of 7 nights this week. Current streak: 12 nights. Most-read story: Owl Babies (3 times). Prompt success rate: 84%."*

Reinforces routine maintenance and gives the parent tangible evidence of continued participation in the child's bedtime — addressing the felt-presence need identified in the empathy map.

#### 6.5 Data Layer

| Data Point | Collected By | Purpose |
| :--- | :--- | :--- |
| Session completion (yes/no) | Back Stage: `session_end` event | "Dose" counter |
| Mode used (sync / async / fallback) | Back Stage: session mode flag | Mode distribution analytics; fallback frequency monitoring |
| Session duration (minutes) | Back Stage: `session_start` → `session_end` timestamps | Engagement tracking; target 15–20 min (Outcome A1) |
| Pages read | Back Stage: `page_sync` event count | Story progress tracking |
| Prompt completion rate | Back Stage: `child_response` / `prompt_shown` ratio | Engagement quality; target 80%+ (Outcome A2) |
| Escalation frequency | Back Stage: `escalation_tier` logs | Age-adaptive prompt calibration |
| Caregiver mid-session interactions | Front Stage: interaction event count (should be 0) | Facilitation burden tracking (Outcome A3) |
| Parent felt-presence score | Post-session Likert prompt (optional) | Outcome A4 measurement |
| Child's favourite stories | Aggregated from story selection events | Library curation; licensing priority |
| Consecutive night streak | Derived from session completion dates | "Dose" counter; proactive alerts at streak risk |

---

## 7. Solution Tree Strategy Coverage

Every Solution Tree strategy is implemented in at least one blueprint scenario:

| Strategy | Description | Blueprint Location |
| :--- | :--- | :--- |
| **A1** | Shared activity replaces conversation | Scenario 1 Step 2 (shared reader view); Scenario 2 Step 3 (interactive playback) |
| **A2** | Character-guided PEER/CROWD prompts | Scenario 1 Step 3 (interaction); Scenario 2 Step 3 (pre-sequenced prompts) |
| **A3** | Multimodal prompts (audio + hand demo) | Scenario 1 Step 3 (escalation cascade); Pain Points table (child doesn't understand) |
| **A4** | Escalating scaffolding with parent as tier 3 | Scenario 1 Step 3 (3-tier cascade); Pain Points table |
| **A5** | Age-adaptive interaction design | Pain Points table (caregiver burden — ages 5+ and 7+ self-initiate) |
| **B1** | WebSocket synchronisation | Scenario 1 Step 2 (`page_sync` events, sub-100ms) |
| **B2** | Asynchronous fallback mode | Scenario 2 (entire); Scenario 3 (graceful degradation); Pain Points (WiFi drop, parent exit) |
| **B3** | Character demos + audio-first UI | Scenario 1 Step 3 (character prompts); Pain Points (multi-child support) |
| **B4** | Shared digital storybook | Scenario 1 Step 2 (synchronised pages + touch indicators) |
| **B5** | One-tap session initiation | Scenario 1 Step 1 (push notification → tap → session); Scenario 2 Step 2 |
| **C1** | Scheduled recurring sessions | Section 6: Mindell Tracker (trip planner, bedtime clock) |
| **C2** | Timezone adaptation | Section 6.3: Bedtime Clock (dual-timezone, live vs async recommendation) |
| **C3** | Reduce caregiver burden | Scenario 1 Step 1 (caregiver involvement ~10s); Pain Points (one-tap, self-initiate) |
| **C4** | Intrinsic child appeal | Scenario 1 Step 3 (playful character prompts, stickers); Persona B goals |
| **C5** | Calm, low-stimulation design | Scenario 1 Steps 2–4 (warm palette, progressive dimming, gentle animations) |
