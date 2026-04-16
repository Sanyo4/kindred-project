# Prototyping Canvas -- Completed

**Project:** Kindred
**Step:** 17 (Part G.5: Prototype Scoping)
**Date:** April 2026
**Focus:** Moving from validated concept to buildable prototype specification. This canvas defines the scope, features, technical architecture, phasing, and success criteria for the Kindred prototype.

**Data Sources:** `prioritisation_matrix_completed.md` (10-feature MVP set, Phase 2 backlog, I x E scores), `real_win_worth_completed.md` (RWW 14/15, 4 parallel dev streams, tech stack, effort budget), `storyboard_completed.md` (6-panel journey, Panel 3-4 transition), `service_blueprint_completed.md` (3 swimlanes, KPIs, pain points), `persona_completed.md` (Sarah + Max/Lily)

**Concept Validation Status:** The core concept — live reading transitions seamlessly to pre-recorded narration via a character-mediated bridge, without the child perceiving a disruption — is grounded in the literature (Raffle et al., 2010; Yarosh & Abowd, 2011) and validated by interview findings from 5 work-separated parents. Proceed to prototype build.

---

## 1. Core Functionality (The 3 "Must Haves")

The literature review and interview findings validated the **Panel 3-4 transition** as the core concept: a live shared reading session breaks due to a WiFi drop and the system recovers without the child noticing. Three feature bundles are structurally irreplaceable for demonstrating this transition. Without any one of them, the prototype cannot show the core value proposition.

### Must-Have 1: Synchronised Page-Turn with Shared Touch (Idea 1)

* **Objective:** Enable real-time shared reading where both parent and child see the same page at the same moment.
* **What It Does:** WebSocket `page_sync` events propagate page-turn actions between parent and child devices with sub-100ms latency. Both screens display identical storybook pages. Parent's touch interactions (pointing, highlighting) are visible on the child's screen as a hand cursor via `touch_indicator` events.
* **Why It Is Structurally Irreplaceable:** This is the foundation layer. Without page sync, there is no shared reading experience to break or recover from. The entire Panel 3-4 transition depends on the existence of a synchronised session -- the handoff (Must-Have 2) transitions *from* this live sync state *to* async playback. Remove page sync and there is nothing to hand off.
* **Traceability:**
    * **Gap:** Gap 2 (Developmentally Appropriate Scaffolding) -- shared object of attention replaces conversation, which preschoolers aged 2-4 cannot sustain (Yarosh & Abowd, 2011)
    * **RWW Evidence:** RWW 1.1A -- *"Shared activity replaces conversation"* (Strategy A1); Technology Assessment: *"WebSockets (Socket.io) -- Standard; sub-100ms achievable"*
    * **Interview Evidence:** P2: *"The book gives him something to focus on. That's what's missing from a video call -- there's no shared object between us."*
    * **Academic Foundation:** Raffle et al. (2010) -- shared-activity engagement extends preschooler attention from 2-3 minutes to 15-20 minutes; the book is the shared attention object
    * **Service Blueprint:** Scenario 1, Step 2 -- `page_sync` events, sub-100ms latency KPI

### Must-Have 2: Sync-to-Async Seamless Handoff (Idea 15) + Character-Mediated Handoff Bridge (SCAMPER 1.2)

* **Objective:** When the live connection drops, transition seamlessly from synchronous reading to pre-recorded narration, masking the technical event behind a character animation so the child perceives no disruption.
* **What It Does:** Two architecturally inseparable components:
    * **Idea 15 (Handoff):** The engineering layer. Server detects WebSocket `ping` timeout after 3 consecutive misses at 5-second intervals (15 seconds total). Emits `fallback_activated` event. Loads pre-cached async recording of the current story. Seeks to `current_page_index`. Crossfades live audio to recorded audio over 0.5 seconds. Transitions session mode flag from `SYNC` to `ASYNC_FALLBACK`. Monitors for parent reconnection (offers seamless re-transition within 5 minutes).
    * **SCAMPER 1.2 (Bridge):** The UX layer. On `fallback_activated`, the Sleepy Owl slides from its corner perch to the centre of the page, performs a 3-second "shh" animation (wing raised to beak), and plays the bridge audio: *"Shh... let's keep reading while Mummy gets comfortable!"* This 3-second buffer occupies the silence between the live audio cutting and the pre-recorded narration starting. The child perceives a story-world event (owl says "shh"), not a technical failure.
* **Why It Is Structurally Irreplaceable:** This is the core architectural differentiator. FaceTime shows a failed call state. Caribu does not provide a like-for-like bedtime fallback flow. Kindred is designed to keep the story going. The bridge without the handoff has nothing to bridge; the handoff without the bridge is a jarring audio cut that risks the worst emotional outcome in the problem space -- a child perceiving technical disconnection as parental abandonment (P4: *"The twin screamed for twenty minutes"*). They are one feature, not two.
* **Traceability:**
    * **Gap:** Gap 1 (Sync-Async Routine Continuity) -- limited competitor coverage; designed to combine both modes in the same activity
    * **RWW Evidence:** RWW 2.1 -- *"No competitor handles connection drops gracefully"*; 5 Whys convergence on root causes B2 (real-time dependency) and B5 (no sync+async combination)
    * **Interview Evidence:** P4: *"I had to say Daddy has to go NOW and hang up. The twin screamed for twenty minutes afterwards."* P3: *"The screen freezes on his face and I can hear him saying Mummy but I can't respond. It's worse than not calling."*
    * **Academic Foundation:** Yarosh & Abowd (2011) -- children cannot cognitively separate "Daddy left the call" from "Daddy left me"; failed connections are actively harmful
    * **Interview Validation:** Parents consistently described the emotional harm of abrupt disconnection (P4: *"The twin screamed for twenty minutes"*; P3: *"It's worse than not calling"*), validating that a seamless handoff with a reassuring character bridge addresses a critical unmet need.
    * **Service Blueprint:** Scenario 3 -- full degradation sequence (Section 4), 15s detection + 3s bridge + 0.5s crossfade

### Must-Have 3: Story Banking (Idea 5) + Audio-Only Recording Over Animated Pages (SCAMPER 1.1)

* **Objective:** Enable parents to pre-record narrated stories that are page-synced, cached on the child's device, and available as the fallback content when the handoff activates.
* **What It Does:** Two components forming the async content pipeline:
    * **Idea 5 (Story Banking):** The parent records narration during an available window (hotel evening, post-shift quiet time). The system generates a page-sync timeline JSON mapping narration timestamps to page indices and prompt trigger points. Content is compressed, packaged with book page images, and pre-downloaded to the child's device during WiFi windows. Offline-first playback requires zero network at session time. Parents can batch-record multiple stories (*"banking content for the trip"* -- P4).
    * **SCAMPER 1.1 (Audio-Only Recording):** The recording interface shows book pages on the parent's screen with a child-perspective preview panel (what the child will see: PIP face + book pages). The parent reads TO the preview, not into a camera void. No video-of-self is visible during recording -- only the parent's voice is captured over the animated storybook pages. This removes the self-consciousness barrier P5 identified.
* **Why It Is Structurally Irreplaceable:** The handoff (Must-Have 2) depends on pre-recorded content existing on the child's device. Without Story Banking, there is nothing to fall back to when the connection drops. The service blueprint explicitly states the prerequisite: *"The fail-safe depends on a pre-cached async recording of the current story existing on the child's device."* Additionally, the RWW and interview data establish that for the majority of use cases (P2 in Osaka, P3 in rural India, P4 on night shift), async is the *primary* mode, not a fallback -- making Story Banking structurally central to the product, not merely a safety net.
* **Traceability:**
    * **Gap:** Gap 1 (Sync-Async Routine Continuity) -- FaceTime and Caribu are sync-only; Kindred is the first product combining both
    * **RWW Evidence:** RWW 1.2 Theme 1 -- *"The Routine Must Survive"* (26 coded instances, dominant theme); RWW 1.1D -- Mindell et al. (2015) dose-dependent routine benefits require *every* night to count
    * **Interview Evidence:** P2: *"He doesn't care that it's not live. He just wants to hear my voice doing the thing."* P4: *"The core idea of banking content when I'm free and deploying it when I'm not -- that makes complete sense."*
    * **Academic Foundation:** Mindell et al. (2015) -- each missed routine night weakens the protective association with sleep outcomes; dose-dependency demands continuity across all nights, including those where live connection is impossible
    * **Interview Validation:** Parents confirmed that pre-recorded voice maintains felt-presence. P2: *"He doesn't care that it's not live. He just wants to hear my voice doing the thing."* This validates Story Banking as maintaining "Mummy is reading to me" presence rather than audiobook impersonality.
    * **Service Blueprint:** Scenario 2 -- full async recording and playback pipeline; Scenario 3 prerequisite table

---

## 2. Supporting MVP Features

The remaining 5 features from the 10-feature MVP set are not structurally required to demonstrate the Panel 3-4 transition, but they are essential for the full product experience. They are introduced progressively across the prototyping phases:

| # | Feature | I x E | Role | Phase Introduced |
| :--- | :--- | :---: | :--- | :--- |
| 3 | **Live Dialogic Reading Prompts (PEER/CROWD)** | 15 | Gap 3 closer -- owl delivers page-specific prompts (Completion, Recall, Open, Wh, Distancing) calibrated to reading number; sustains engagement from 2-3 min to 15-20 min (Raffle et al.) | Phase 2 (Mid-Fi) |
| 9 | **One-Tap Bedtime Launch** | 20 | Adoption gatekeeper -- push notification with deep-link to pre-selected story; caregiver involvement <10 seconds; no login, no navigation, no book selection required | Phase 1 (Lo-Fi wireframe), Phase 3 (functional) |
| 11 | **Sleepy Owl Guide Character** | 15 | Prompt delivery vehicle + bedtime wind-down arc; 4-state progression (awake -> cosy -> sleepy -> asleep) models the emotional trajectory the child should follow; replaces visual-only cues (Caribu's approach, least effective per Hiniker et al.) with audio + character demonstration | Phase 2 (Mid-Fi) |
| 18 | **Progressive Dimming Interface** | 20 | Bedtime-calm design -- CSS brightness/warmth transitions tied to page progress; warm blues and muted golds from launch, sunset-style dimming on final pages; no competitor modulates UI for bedtime context | Phase 1 (Lo-Fi palette spec), Phase 3 (functional) |
| 2.1 | **Owl as Transitional Comfort Object** | 16 | Post-story sleep companion -- sleeping owl on dimmed screen fills the gap between "story over" and "falling asleep"; amber nightlight glow for configurable 20-minute duration; addresses P5's finding of nightlight regression during parental absence | Phase 2 (Mid-Fi) |

### Feature Introduction Map Across Phases

| Feature | Phase 1 (Lo-Fi) | Phase 2 (Mid-Fi) | Phase 3 (Hi-Fi) |
| :--- | :--- | :--- | :--- |
| **Idea 1:** Page-Turn Sync | Wireframe of sync layout; PIP + book spatial relationship | Figma page-turn animation with 14 pages | Working WebSocket `page_sync` between two browser instances |
| **Idea 15 + SCAMPER 1.2:** Handoff + Bridge | Storyboard of drop -> bridge -> resume sequence | Animated transition in Figma + functional audio crossfade demo | Working state machine with ping detection, `fallback_activated` event, Lottie bridge animation |
| **Idea 5 + SCAMPER 1.1:** Story Banking + Audio Recording | -- | Parent recording flow screen-by-screen walkthrough | Full audio recording pipeline (Web Audio API) + page-sync timeline JSON + blob storage |
| **Idea 3:** Dialogic Prompts | -- | 4 prompts in Figma with tap interactions + owl voice clips | Functional prompt engine with PEER/CROWD progression across repeated readings |
| **Idea 9:** One-Tap Launch | Notification-to-splash wireframe | Notification -> splash -> reading flow in Figma | Simulated push notification with deep-link to pre-authenticated session |
| **Idea 11:** Sleepy Owl | Owl position wireframe (corner perch) | Full 4-state animation (awake/cosy/sleepy/asleep) in Figma + voice clips | Lottie animation integrated into reading view with state machine |
| **Idea 18:** Progressive Dimming | Colour palette swatches + brightness curve specification | Dimming applied across Figma prototype pages | CSS `brightness`/`warmth` transition system tied to page index |
| **SCAMPER 1.1:** Audio Recording | -- | Recording UI walkthrough with child-perspective preview panel | Web Audio API + MediaRecorder recording with blob storage |
| **SCAMPER 1.2:** Owl Bridge | Bridge moment wireframe (owl centre-stage, "shh") | 3-second animated bridge in Figma with audio | Lottie bridge triggered on `fallback_activated` event |
| **SCAMPER 2.1:** Owl Comfort Object | Sleeping owl screen wireframe | Animated nightlight screen with breathing animation | Configurable nightlight with 20-minute auto-off timeout |

---

## 3. User Interface (UI) Components

Organised by the three swimlanes from the service blueprint (Section 1: Blueprint Architecture).

### 3.1 Child Side (Primary Interface)

The child's interface is the most constrained: it must be navigable by a non-literate user (ages 3-5) with developing motor skills, in a dimly lit bedroom, at a time when the child should be winding down for sleep. Every design decision optimises for calm, autonomy, and zero-text interaction.

| Component | Description | Design Constraint | Traces To |
| :--- | :--- | :--- | :--- |
| **Full-Screen Storybook Renderer** | Book illustrations fill the screen; pages advance via tap or auto-sync with parent's page turns | No text buttons; visual-only navigation; gentle page-turn animation | Service Blueprint Scenario 1 Step 2; Strategy A1 (shared activity) |
| **Parent PIP Video Circle** | Small circle (top-right corner, ~15% of screen area) showing parent's face; warm-toned border to distinguish from illustration | Must not occlude key illustration elements; warm border maintains bedtime palette; transitions from live to recorded PIP with 0.5s fade during handoff | Storyboard Panel 3; Service Blueprint Scenario 1 Step 2 |
| **Sleepy Owl Character Overlay** | Owl perched in corner of illustration, separate from story art; progressively sleepier across the story (awake -> cosy -> sleepy -> asleep) | Must feel like part of the story world, not a UI element; corner position is ambient, not attention-competing; size: ~10% of screen | Storyboard Panels 3-5; Idea 11 |
| **Thought-Bubble Prompt Overlay** | Slides in from the owl with PEER/CROWD question; accompanied by owl's voice reading the prompt aloud; tap-target for child response | Audio-first (no text reliance); auto-escalation cascade: repeat audio (10s) -> character hand demo (15s) -> parent models (20s, sync only) | Storyboard Panel 3; Idea 3; Strategy A2-A4; Hiniker et al. (2015) |
| **Large Tap Targets** | All interactive elements minimum 60x60pt (exceeding Apple's 44x44pt minimum); high-contrast touch feedback | Preschooler motor skills require oversized targets; Persona B: Max composite aged 3-5 | Persona B; Strategy A5 |
| **Owl Bridge Animation** | Owl slides from corner to centre, raises wing to beak ("shh"), plays bridge audio, returns to perch; 3-second duration | Must begin within 1 second of audio cut; occupies the silence between live and recorded narration; child perceives a story-world event | Storyboard Panel 4; SCAMPER 1.2; Interview P4 (emotional safety) |
| **Progressive Dimming Layer** | CSS `brightness` and colour warmth transitions tied to page index; warm blues and muted golds from launch; sunset-style dimming on final 3-4 pages; near-minimum brightness at goodnight screen | No bright whites at any point; the app is a nightlight, not a television; Mindell-appropriate bedtime stimulus level | Storyboard Panels 2, 5; Idea 18; Strategy C5 |
| **Sleeping Owl Nightlight Screen** | Post-story: owl curls up on moonlit branch, tucks head under wing, slow breathing animation; warm amber glow; configurable 20-minute duration before screen off | Fills the emotionally vulnerable gap between "story over" and "falling asleep"; functions as digital transitional comfort object | Storyboard Panel 5; SCAMPER 2.1; P5 nightlight regression |
| **Warm Bedtime Colour Palette** | Soft blues (#4A6FA5), muted golds (#C4A35A), warm greys (#8B8589); no pure whites, no saturated reds or greens; gentle gradients | Mindell stimulation filter: all colours pass low-stimulation threshold | Prioritisation Matrix Mindell Filter; Strategy C5 |
| **One-Tap Splash Screen** | Parent's face in circle + tonight's book cover + large illustrated "Open Book" button with audio label that says the words aloud | Zero text; audio cue for non-literate user; single tap to begin; calm launch experience | Storyboard Panel 2; Idea 9 |

### 3.2 Parent Side (Remote Parent Interface)

The parent's interface serves three modes: live reading, recording, and monitoring. It balances functionality with emotional reassurance -- the parent needs to feel present and informed, not overwhelmed by controls.

| Component | Description | Mode | Traces To |
| :--- | :--- | :--- | :--- |
| **Synchronised Story Page View** | Same storybook page as child's device, updated via WebSocket `page_sync` events | Live Reading | Service Blueprint Scenario 1 Step 2 |
| **Child PIP Video Feed** | Child's face in PIP corner via WebRTC; shows child's engagement and reactions in real time | Live Reading | Storyboard Panel 3; Strategy B4 |
| **Connection Status Indicator** | Traffic-light indicator: green (connected), amber (degraded: latency >300ms or packet loss >5%), red (disconnected) | Live Reading | Service Blueprint Scenario 1 Step 2 Back Stage |
| **Page Advance Controls** | Tap to turn page; touch interactions visible on child's screen as hand cursor via `touch_indicator` events | Live Reading | Service Blueprint Scenario 1 Step 2; Strategy B4 |
| **Prompt Trigger Buttons** | Manual PEER/CROWD prompt triggers; can also allow auto-delivery; sees child's tap response in real time | Live Reading | Storyboard Panel 3; Idea 3 |
| **Interruption Message Panel** | *"Connection interrupted -- [Child]'s story is continuing with your recording."* Reconnect button + live page tracker showing child's current page | Live Reading (post-drop) | Storyboard Panel 4; Service Blueprint Scenario 3 |
| **Recording Interface** | Book pages visible in recording view; child-perspective preview panel (what child will see: PIP face + pages); no camera-of-self visible; ambient noise indicator; prompt placement markers (drag to page positions); "Stories banked: X/Y" trip counter | Recording | Service Blueprint Scenario 2 Step 1; SCAMPER 1.1; P5 self-consciousness |
| **Session Summary Card** | Post-completion: pages read, prompts answered, engagement duration, mode transitions logged, "dose" streak counter | Post-Session | Storyboard Panel 6; Service Blueprint Scenario 1 Step 4 |

### 3.3 At-Home Caregiver Side (Deliberately Minimal)

Per Strategy C3, the caregiver interface is intentionally the thinnest swimlane. The design principle: if it requires more than one tap at 7:25 PM after solo parenting since 3:30 PM, the caregiver will not use it.

| Component | Description | Traces To |
| :--- | :--- | :--- |
| **Push Notification** | Parent's photo + book cover + *"Story time with [Parent] in 5 min -- tap to start"*; deep-link pre-authenticates the session | Storyboard Panel 2; Idea 9; P3: *"One button. That's it."* |
| **Zero Mid-Session Interface** | No in-app UI during the reading. The caregiver taps the notification and walks away. Total involvement: <10 seconds. | Service Blueprint Scenario 1 Step 1: *"Total involvement: ~10 seconds"*; Strategy C3 |

---

## 4. Technical Stack

All components are standard, mature, and production-proven. No novel research or unproven infrastructure is required (RWW Technology Assessment, Score: 5/5). Technical risk is integration complexity, not individual technology maturity.

| Layer | Technology | Rationale | Maturity |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 18+ (with hooks) | Largest ecosystem; component model suits the multi-view architecture (child view, parent view, recording view); project's established choice from RWW analysis | Industry standard |
| **Backend** | Node.js + Express | Native WebSocket support; single-language stack with frontend; standard for real-time applications | Industry standard |
| **Real-Time Sync** | Socket.io (WebSocket with long-polling fallback) | `page_sync` events, `touch_indicator` events, `prompt_shown`/`child_response` events, `ping` health monitor (5s intervals, 3-miss timeout at 15s). Chosen over raw WebSocket for auto-reconnection, room management (`room_id: UUID`), and built-in fallback | Standard; sub-100ms achievable |
| **Video/Audio Streaming** | WebRTC with TURN server fallback | Parent PIP face overlay (live and recorded); NAT traversal for hotel/corporate WiFi scenarios | Mature browser APIs |
| **Audio Recording** | Web Audio API + MediaRecorder API | Parent narration capture; outputs audio blobs segmented per page for granular fallback seek. No third-party dependencies | Native browser APIs |
| **Audio/Asset Storage** | Blob/Object storage (AWS S3 or Cloudflare R2) | Pre-recorded narration blobs + page-sync timeline JSON + book page images + parent PIP video segments. Immutable content model (no sync conflicts) | Mature cloud services |
| **Offline Foundation** | Service Workers + IndexedDB | Pre-download story packages (images + audio + sync timeline) during WiFi windows; zero-network playback. Full offline-first resilience deferred to Phase 2A (Idea 17) but architectural foundation laid in Hi-Fi phase | Mature PWA patterns |
| **Character Animation** | Lottie (`lottie-web`) + CSS transitions | Owl states (awake/cosy/sleepy/asleep), thought-bubble entries, "shh" bridge animation, sleeping-owl nightlight breathing. Lottie for complex multi-state character sequences; CSS for progressive dimming and page transitions | Well-supported |
| **Push Notifications** | Firebase Cloud Messaging (FCM) / Web Push API | One-Tap launch notifications to caregiver; session completion summaries to parent; "dose" streak alerts | Standard UX pattern |
| **State Management** | React Context + useReducer | Session state machine: `IDLE` -> `SYNC` -> `ASYNC_FALLBACK` -> `COMPLETE`; page index, prompt history, connection status, owl state. Zustand as fallback if state complexity exceeds Context capacity | Standard React patterns |
| **Deployment** | Vercel | API routes for backend logic; optimised for React applications; environment variable management; preview deployments for prototype iterations | Production platform |

### Architecture Overview

```
┌─────────────────────┐         WebSocket (Socket.io)        ┌─────────────────────┐
│   PARENT DEVICE     │ ◄──────────────────────────────────► │   NODE.JS SERVER    │
│                     │         WebRTC (PIP video)            │                     │
│ - React App         │ ◄──────────────────────────────────► │ - Express           │
│ - Recording View    │                                       │ - Socket.io Rooms   │
│ - Live Reading View │         REST API                      │ - Session State     │
│ - Session Summary   │ ◄──────────────────────────────────► │ - Ping Monitor      │
│                     │                                       │ - Fallback Logic    │
└─────────────────────┘                                       └──────────┬──────────┘
                                                                         │
                                                              WebSocket (Socket.io)
                                                                         │
                                                              ┌──────────▼──────────┐
                                                              │   CHILD DEVICE      │
                                                              │                     │
                                                              │ - React App         │
                                                              │ - Reader View       │
                                                              │ - Owl Animations    │
                                                              │ - Offline Cache     │
                                                              │   (IndexedDB)       │
                                                              └─────────────────────┘
                         ┌─────────────────────┐
                         │   BLOB STORAGE      │
                         │   (S3 / R2)         │
                         │                     │
                         │ - Narration audio   │
                         │ - Page-sync JSON    │
                         │ - Book page images  │
                         │ - Parent PIP video  │
                         └─────────────────────┘
```

---

## 5. Prototyping Phases

### Phase 1: Lo-Fi (Paper + Clickable Figma Prototype) -- Week 1

**Goal:** Validate layout, information hierarchy, and the Panel 3-4 flow sequencing *before writing any code*. Test whether the spatial arrangement of PIP, book, owl, and prompts is cognitively parseable in a bedtime context.

**Deliverables:**

1. **Paper wireframes of 4 key screens:**
    * (a) **One-Tap Splash/Launch** -- parent's face circle, book cover, "Open Book" button with audio label indicator
    * (b) **Live Reading View (child side)** -- storybook page, parent PIP position (top-right), owl perch position (illustration corner), thought-bubble prompt zone
    * (c) **Owl Bridge Moment** -- owl centre-stage, "shh" gesture, visual indication of audio gap being bridged
    * (d) **Sleeping Owl Nightlight** -- post-story screen, owl asleep, amber glow, dimmed to near-minimum

2. **Clickable Figma prototype** linking the 4 screens with tap hotspots simulating:
    * Page turns (tap to advance)
    * Owl prompt appearance (thought bubble slides in)
    * The drop-to-bridge-to-async transition (3-screen sequence: reading -> owl bridge -> reading resumes)

3. **Parent-side wireframes:**
    * Live reading view with child PIP, page controls, connection status
    * Interruption message panel (*"Connection interrupted -- story continuing"*)
    * Recording interface with child-perspective preview panel

4. **Progressive Dimming specification:** colour palette swatches (soft blues, muted golds, warm greys) and brightness curve showing reduction from page 1 to page 14

**Key Questions to Answer:**

| Question | Why It Matters | Informed By |
| :--- | :--- | :--- |
| Is the video PIP distracting the child from the book illustrations, or does it coexist at the periphery? | If PIP draws attention away from the book, the shared-attention mechanism fails | Interview data: where did parents report children looking during shared reading? |
| Does the owl's corner position feel like part of the story world or like a UI element bolted on? | Story-world integration is essential for the bridge to work -- if the owl feels "app-like," the "shh" will feel like a system message, not a character moment | Storyboard Panel 3 design intent |
| Can the Panel 3-4 transition be understood from a spatial walkthrough alone? | If the drop -> bridge -> resume sequence is narratively incoherent in wireframes, it will not work at higher fidelity | Storyboard Panel 4: the transition must be cognitively seamless |

**MVP Features Introduced:**
* Progressive Dimming (Idea 18) -- represented as colour palette and brightness curve specification
* One-Tap Bedtime Launch (Idea 9) -- wireframed as notification -> splash -> reading flow

**Test Method:** Show Lo-Fi prototype to 2-3 users (may include interview participants for continuity) in a moderated walkthrough. Task: *"Where would your child look first? Does the layout feel calm? Walk me through what happens when the connection drops."*

**Completion Gate:** Layout locked -- PIP placement, owl positioning, and transition spatial sequencing validated. Proceed to Mid-Fi only after these are confirmed.

---

### Phase 2: Mid-Fi (Figma Interactive + Functional Audio Prototype) -- Weeks 2-3

**Goal:** Test the interaction flow end-to-end. Can a parent record a story? Can a child (via proxy) open and navigate it? Does the handoff *feel* seamless with real audio crossfading? This phase bridges visual design with functional audio behaviour.

**Deliverables:**

1. **Interactive Figma prototype** with:
    * Full 14-page reading flow (The Gruffalo, consistent with the storyboard material)
    * Animated owl states: awake (pages 1-8) -> cosy (pages 9-11) -> sleepy (pages 12-13, half-closed eyes, yawns) -> asleep (page 14+, curled up, breathing)
    * 4 thought-bubble prompt interactions at story-specific pages (matching dialogic reading prompts: "Can you find something brown?", "What do you think happens next?", "Where is the mouse hiding?", "Is the Gruffalo scary or silly?")
    * The drop-bridge-async transition animated at correct timing: audio cuts at *"terrible cla--"* -> 3s owl bridge -> recorded narration resumes from page 8 -> PIP crossfade
    * Progressive dimming applied visually across the 14-page sequence

2. **Functional audio-only web prototype (React):**
    * Two audio tracks loaded: "live" narration and "recorded" narration of The Gruffalo
    * Hardware audio crossfade at the bridge moment: live track cuts -> 3-second bridge audio plays -> recorded track starts from current page with 0.5s fade-in
    * Demonstrates sub-second audio transition -- the core engineering proof-of-concept
    * Does *not* need page sync or visual UI -- purely validates the audio pipeline

3. **Parent recording flow prototype (Figma):**
    * Screen-by-screen walkthrough: open app -> select book -> see book pages + child-perspective preview -> read aloud -> place prompt markers -> personalised goodnight message -> "Stories banked: 3/5" counter
    * Validates that the recording interface feels like "reading to my child" not "recording into a void"

4. **Caregiver notification flow (Figma):**
    * Push notification mockup with deep-link -> splash screen -> story begins
    * Validates <10-second total caregiver involvement

**Key Questions to Answer:**

| Question | Why It Matters | Informed By |
| :--- | :--- | :--- |
| Is the navigation intuitive for a non-literate user? Can a proxy (parent acting as child) open a story and advance pages using only visual/audio cues with zero text? | If the child cannot navigate independently, the caregiver burden increases beyond the one-tap threshold | Persona B: Max (non-literate, ages 3-5); Strategy C3 |
| Does the audio crossfade between live and recorded narration feel continuous or is there a perceptible seam? | A perceptible seam invalidates the handoff invisibility claim | Service blueprint target: <0.5s transition |
| Does the owl's sleepiness progression (across 14 pages) feel gradual and natural or abrupt? | Abrupt owl state changes would feel like system events, not story-world modelling | Storyboard Panel 5: owl models wind-down arc |
| Does the recording interface feel like "reading to my child" or "recording into a void"? | Self-consciousness is an async adoption barrier (P5); the preview panel must resolve it | SCAMPER 1.1; P5: *"performing into a void"* |

**MVP Features Introduced:**
* Sleepy Owl Guide Character (Idea 11) -- full 4-state progression animated in Figma; functional as voice clips in audio prototype
* Live Dialogic Reading Prompts (Idea 3) -- 4 PEER/CROWD prompts integrated at story-specific pages with tap interaction flow
* Owl as Transitional Comfort Object (SCAMPER 2.1) -- post-story sleeping owl screen with nightlight glow and breathing animation

**Test Method:** Moderated usability walkthrough with 3-5 users. Task-based: *"Your partner tapped the notification. Show me how you'd get your child to the story."* Then experience the full 14-page reading with the drop transition. Post-task Likert ratings on navigation ease and transition believability.

**Completion Gate:** Audio crossfade verified as seamless (<0.5s, no perceptible silence gap); interaction flow validated as navigable without text; owl progression confirmed as natural. Proceed to Hi-Fi.

---

### Phase 3: Hi-Fi (Functional Web Application) -- Weeks 4-8

**Goal:** Build the working prototype using the validated layouts and flows from Phases 1-2. Test real-time synchronisation, actual WebSocket latency, and live cross-device coordination. All 10 MVP features are functional.

**Deliverables:**

1. **Working React web application deployed to Vercel** with:
    * WebSocket page sync between two browser instances (parent + child) via Socket.io with room management
    * Audio recording pipeline (Web Audio API + MediaRecorder) with page-sync timeline JSON generation
    * Async playback engine: page-synced recorded narration with auto-advance and manual override
    * Sync-to-async handoff state machine: `SYNC` -> `ASYNC_FALLBACK` on ping timeout (3 x 5s = 15s detection)
    * Character-mediated bridge animation (Lottie): owl "shh" triggered on `fallback_activated` event
    * Audio crossfade: live -> recorded over 0.5s at `current_page_index`
    * PIP transition: live video -> recorded video PIP with 0.5s fade
    * Progressive dimming: CSS `brightness`/`warmth` transitions tied to page progress
    * One-Tap launch flow: simulated push notification -> deep-link -> pre-authenticated session
    * Sleepy Owl with 4-state Lottie animation (awake/cosy/sleepy/asleep) and 4 thought-bubble PEER/CROWD prompts per story
    * Sleeping owl post-story nightlight screen with 20-minute configurable auto-off
    * Parent reconnection flow: if parent reconnects within 5 minutes, seamless re-transition to live

2. **3 fully integrated stories** with page-synced narration and per-page dialogic prompts:
    * The Gruffalo (14 pages) -- consistent with the storyboard material
    * Owl Babies (10 pages) -- appears in storyboard Trip Planner
    * We're Going on a Bear Hunt (12 pages) -- referenced in persona data

3. **Instrumentation layer** capturing:
    * Page-sync latency (WebSocket round-trip timestamps)
    * Session mode transitions (SYNC -> ASYNC_FALLBACK, with timestamps)
    * Prompt engagement (time-to-respond, tap accuracy, escalation tier reached)
    * Session duration (first page to goodnight screen)
    * Connection health metrics (ping latency, packet loss, timeout events)

**Development Streams (4 parallel tracks, per RWW Section 3.1):**

| Stream | Features | Shared Infrastructure | Est. Time |
| :--- | :--- | :--- | :--- |
| **Sync Layer** | Page-Turn Sync (Idea 1), Dialogic Prompts (Idea 3) | WebSocket server, story renderer, event bus | 2-4 weeks |
| **Async Layer** | Story Banking (Idea 5), Audio Recording (SCAMPER 1.1), Handoff (Idea 15), Bridge (SCAMPER 1.2) | Audio pipeline, page-level sync, scheduler, fallback state machine | 2-4 weeks |
| **Character Layer** | Sleepy Owl (Idea 11), Comfort Object (SCAMPER 2.1) | Character animation engine, state machine (awake -> cosy -> sleepy -> asleep), Lottie integration | 2-3 weeks |
| **Calm Layer** | Progressive Dimming (Idea 18), One-Tap Launch (Idea 9) | CSS transition system, notification pipeline, splash screen | 1-2 weeks |

**Key Questions to Answer:**

| Question | Why It Matters | Informed By |
| :--- | :--- | :--- |
| Does the <100ms page-sync latency target feel "real-time" on actual devices over actual networks? | If sync feels laggy, the shared-attention mechanism degrades | Service Blueprint KPI: sub-100ms; Raffle et al. benchmark |
| Can the sync-to-async handoff complete within 4 seconds of child-perceptible disruption (3s bridge + 0.5s crossfade + 0.5s buffer)? | Service blueprint specifies 3-4 seconds as acceptable; longer gaps risk child awareness | Service Blueprint Scenario 3: *"Total disruption window: 3-4 seconds"* |
| Do parent evaluators achieve 15-minute engagement sessions? | Raffle et al.'s 5x engagement uplift is the product's core engagement claim | RWW 1.1B; Raffle et al. (2010) benchmark |
| Can a parent complete a Story Banking recording in <1.5x reading time? | Recording overhead above 1.5x creates friction that prevents adoption | Service Blueprint Scenario 2 KPI |

**Test Method:** User evaluation session (Step 20) with 5 parents. Live cross-device testing over real networks. Latency measurement via instrumentation. Session duration tracking. Post-session SUS questionnaire, semi-structured interview, and Feedback Capture Matrix.

**Completion Gate:** All 5 primary success metrics (Section 6) meet their targets.

---

## 6. Success Metrics for the Prototype

Each metric traces to the academic literature, interview findings, and service blueprint KPIs, ensuring consistency from research through prototype evaluation.

> **Note:** All five metrics are evaluated directly via the deployed application. Metrics 1 (Page-Sync Latency) and 3 (Child Independence) require functional infrastructure and real interaction. Metrics 2, 4, and 5 are assessed through the user evaluation study with parent evaluators.

### 6.1 Primary Metrics (Gating)

| # | Metric | Measure | Target | Phase Measured | Academic Basis | Blueprint KPI |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Page-Sync Latency** | Mean delay between parent `page_turn` event emission and child page update, measured via WebSocket round-trip timestamps | <100ms | Phase 3 (Hi-Fi instrumentation) | Raffle et al. (2010) real-time shared activity benchmark | Scenario 1 Step 2: *"100% page sync (sub-100ms latency per Raffle et al. benchmark)"* |
| 2 | **Handoff Invisibility** | % of parent evaluators who rate the sync-to-async transition as unnoticeable for their child (Likert >= 4 on 5-point scale) | >= 80% (4/5 parents) | Phase 3 (User evaluation, Step 20) | Yarosh & Abowd (2011): children cannot separate technical failure from parental abandonment | Scenario 3: session mode `SYNC` -> `ASYNC_FALLBACK` with zero child-perceived disruption |
| 3 | **Child Independence** | % of sessions where the child (or parent-as-proxy) navigates from splash screen to active reading with zero caregiver interaction beyond the initial notification tap | >= 80% | Phase 2 (Mid-Fi usability test) + Phase 3 (Hi-Fi evaluation) | Hiniker et al. (2015): audio-first prompts for preschooler independence | Scenario 1 Step 1: *"100% caregiver involvement limited to initiation (0 mid-session interactions)"* |
| 4 | **Engagement Duration** | Mean session length from first page to goodnight screen completion | >= 15 minutes | Phase 3 (Hi-Fi instrumentation) | Raffle et al. (2010): shared activity extends engagement from 2-3 min to 15-20 min | Section 6 Data Layer: *"Session duration 15-20 min (Outcome A1)"*; Raffle et al. (2010) benchmark |
| 5 | **Felt-Presence Persistence** | % of parent evaluators who rate the pre-recorded voice as maintaining "Mummy/Daddy is reading to me" presence, not audiobook impersonality (Likert >= 4 on 5-point scale) | >= 80% (4/5 parents) | Phase 3 (User evaluation, Step 20) | Interview P2: *"He doesn't care that it's not live. He just wants to hear my voice"* | Section 6 Data Layer: *"Parent felt-presence score >4/5 on felt-presence scale (Outcome A4)"* |

### 6.2 Secondary Metrics (Tracked, Not Gating)

These inform design refinements and identify areas for Phase 2 optimisation but do not trigger pass/fail decisions for the prototype.

| Metric | Target | Phase Measured | Source |
| :--- | :--- | :--- | :--- |
| Video frame drop rate (PIP) | <2% | Phase 3 (WebRTC monitoring) | Blueprint Scenario 1 Step 2 KPI |
| Owl bridge emotional safety | >= 80% of evaluators score 4-5 (Likert) | Phase 3 (User evaluation) | Interview P4: emotional harm from abrupt disconnection |
| Prompt engagement rate | >= 80% of prompts receive a child response | Phase 3 (instrumentation) | Blueprint Scenario 1 Step 3: *"80%+ child engagement with prompts (Outcome A2)"* |
| Recording overhead | Story Banking recording completes in <1.5x reading time | Phase 2 (Mid-Fi) + Phase 3 | Blueprint Scenario 2 Step 1 KPI |
| Session log persistence | Saved within 2 seconds of `session_end` event | Phase 3 (instrumentation) | Blueprint Scenario 1 Step 4 KPI |
| Handoff transition window | Child-perceptible disruption <4 seconds (3s bridge + 0.5s crossfade + buffer) | Phase 3 (instrumentation) | Service Blueprint Scenario 3: *"Total disruption window: 3-4 seconds"* |

---

## 7. What We Are NOT Building

Scope discipline is critical. The 10-feature MVP is validated and sufficient. The following features are explicitly deferred to prevent scope creep. They are organised by the Phase 2 backlog tiers from the prioritisation matrix (Step 13), with specific reasons for deferral grounded in the MVP's gap coverage.

### Phase 2A -- High-Value Enhancements (First Post-MVP Sprint)

These are the next features to build after the prototype is validated at Step 20. They enhance the MVP experience but are not structurally required for the Panel 3-4 demonstration or gap coverage.

| Feature | I x E | Why Deferred |
| :--- | :--- | :--- |
| **Tap-to-Explore Interactive Elements** (Idea 2) | 16 | Dialogic Prompts (Idea 3) already covers Gap 3 engagement. Tap-to-Explore adds depth (audio labels on page elements) but is additive, not structural. |
| **"I Need to Go" Emergency Exit Button** (Idea 16) | 16 | Sync-to-Async Handoff (Idea 15) already handles involuntary connection drops. This handles voluntary parent exit -- same fallback architecture, lower urgency. |
| **Offline-First Story Cache** (Idea 17) | 16 | Architectural foundation (Service Workers + IndexedDB) is laid in Phase 3 for async playback, but full offline-first resilience (pre-download during WiFi windows, zero-network playback guarantee, opportunistic sync) is a hardening feature, not a demo feature. |
| **Character Hand Demonstration** (Idea 12) | 12 | Sleepy Owl (Idea 11) already delivers prompts via audio + thought bubble. Hand demo adds Hiniker et al.'s escalation Tier 2 -- valuable depth for comprehension, but Tier 1 (audio repeat) and Tier 3 (parent models) are sufficient for prototype. |
| **Owl Micro-Reactions** (SCAMPER 2.2) | 12 | Enriches owl emotional presence (nods, blinks in response to child taps) but requires per-story content authoring at scale. Core owl ships without it. |

### Phase 2B -- Retention and Depth (Second Post-MVP Sprint)

These features improve long-term engagement and parent satisfaction but do not close any of the three structural gaps.

| Feature | I x E | Why Deferred |
| :--- | :--- | :--- |
| **Trip Planner** (Idea 6) | 12 | Parent-facing planning tool; child experience unaffected. Story Banking alone covers the core recording need. |
| **Routine Dose Tracker** (Idea 10) | 12 | Motivational layer (sleeping-star constellation, Mindell-inspired streaks). Data layer foundation exists from session logging, but the front-end visualisation is retention, not validation. |
| **Page Annotations** (Idea 8) | 12 | Personalised parent messages at specific pages. Story Banking already provides voice presence; annotations add depth but not a new capability. |
| **Ambient Soundscape** (Idea 19) | 12 | Post-story wind-down audio (rain, white noise). Owl Comfort Object (SCAMPER 2.1) covers the story-to-sleep transition. |
| **Parent Voice Spotlight** (Idea 4) | 12 | Audio routing refinement (amplify parent voice, suppress background noise). Useful for hotel WiFi scenarios but not a gap closer. |
| **Child Request Button** (SCAMPER 3.3) | 12 | Child-initiated story requests (*"Read me Owl Babies!"*). Better suited for Phase 2 when child agency features expand. |

### Phase 2C -- Long-Term Roadmap (Third Sprint and Beyond)

These features represent the product vision beyond the academic prototype. They involve significant complexity (NLP, speech recognition, third-party APIs) or address edge cases.

| Feature | I x E | Why Deferred |
| :--- | :--- | :--- |
| **Completion Stickers** (Idea 13) | 10 | Micro-gamification; low priority vs. core reading experience. |
| **Slow-Motion Page Turn** (Idea 20) | 10 | Subtle pacing refinement; CSS-trivial but minimal impact on engagement metrics. |
| **Async Reaction Loop** (Idea 7) | 9 | Bidirectional async exchange (child sends reaction clip back to parent). Novel but requires reliable preschooler-generated content capture. |
| **Child Recording** (SCAMPER 1.3) | 9 | Child records their own narration. Requires reliable preschooler audio capture and raises content moderation questions. |
| **Auto-Play Mode** (SCAMPER 3.2) | 9 | Zero-tap story launch (story begins automatically at bedtime). Raises parental control concerns; One-Tap (Idea 9) is sufficient. |
| **Age-Adaptive Interaction Mode** (Idea 14) | 6 | Three separate UX tracks for ages 3-4, 5-6, 7+. High complexity; single track targeting ages 3-5 is appropriate for prototype. |
| **Calendar Sync** (SCAMPER 3.1) | 6 | Google/Outlook API integration for automatic trip detection. High effort for modest gain over manual Trip Planner (itself deferred to 2B). |
| **Child Owl Questions** (SCAMPER 2.3) | 3 | Child asks the owl questions via speech. Requires preschooler speech recognition -- a research-phase dependency, not an engineering task. |

### Explicit Non-Goals for the Prototype

* **No multi-child support.** P4's twins scenario (the twins receiving sequential per-child stories) is a Phase 2B feature. The prototype targets one parent + one child.
* **No age-adaptive UX tracks.** Single interaction mode targeting the core preschooler range (ages 3-5). Persona B's age-7+ self-initiation capability is Phase 2C.
* **No third-party calendar integration.** Trip planning is manual (or absent) in the prototype.
* **No speech recognition or NLP.** All child interactions are tap-based. Voice input is Phase 2C.
* **No user accounts or authentication system.** The prototype uses device-token-based sessions. A proper auth system is pre-launch infrastructure, not prototype scope.
* **No content library beyond 3 stories.** Depth of interaction per book (repeated readings with escalating PEER/CROWD prompts) over breadth of catalogue. P2 and P3 both confirmed sustained engagement with the same recording across multiple nights.
* **No app store deployment.** The prototype is a web application accessed via browser URL, deployed to Vercel. Native mobile app packaging is a production concern.

---

## 8. Research Validation: How Interview Findings Inform Prototype Design

The interview findings (Step 2) and literature review established four key design dimensions. This section documents how each validated dimension translates into specific prototype design decisions, and where qualitative feedback refines the implementation.

### 8.1 Dimension-to-Design Mapping

| Design Dimension | Evidence | Design Implication for Prototype |
| :--- | :--- | :--- |
| **A: Handoff Believability** | Yarosh & Abowd (2011): children cannot separate technical failure from parental abandonment. P4: *"The twin screamed for twenty minutes."* P3: *"It's worse than not calling."* | Proceed with the handoff architecture: 15s detection -> 3s owl bridge -> 0.5s audio crossfade -> recorded narration from `current_page_index`. Phase 3 engineering focuses on achieving the timing precision specified in the service blueprint. |
| **B: Owl Bridge Emotional Safety** | Interview evidence of emotional harm from abrupt disconnection confirms the need for a character-mediated bridge. The owl "shh" bridge is designed as emotionally reassuring. | Proceed with Lottie animation of the owl sliding centre, wing-to-beak gesture, and the bridge audio clip. The 3-second duration and phrasing (*"Shh... let's keep reading while Mummy gets comfortable!"*) will be validated in the user evaluation study. |
| **C: Dialogic Prompt Value** | Raffle et al. (2010): character-mediated PEER/CROWD prompts extended engagement from 2-3 min to 15-20 min. | Prompts are grounded in literature but real interaction data is needed. **Prototype implication:** instrument prompt engagement heavily -- track time-to-respond, tap accuracy, escalation tier reached per prompt per session. The user evaluation study will provide the real interaction data. |
| **D: Felt-Presence** | P2: *"He doesn't care that it's not live. He just wants to hear my voice doing the thing."* | Pre-recorded voice maintains felt-presence. This validates Story Banking (Idea 5) + Audio-Only Recording (SCAMPER 1.1) as the correct async approach. **Prototype implication:** the recording interface must prioritise warmth and child-directed intimacy -- child-perspective preview, book pages visible during recording, personalised goodnight message at the end. |

### 8.2 Design Refinements from Interview Qualitative Data

The interview findings and open-ended responses surface specific concerns and suggestions that should be incorporated as prototype constraints:

| Data Source | Expected Input Type | Prototype Application |
| :--- | :--- | :--- |
| **E3: Open-ended concerns** (*"Is there anything that concerned you?"*) | Specific concerns about child safety, screen time, or feature gaps | Incorporated as design constraints in Phase 2 (Mid-Fi) layout decisions and Phase 3 (Hi-Fi) interaction details |
| **C2: Most-valued prompt types** (*"Which owl questions would work best for your child?"*) | Ranking of Completion, Recall, Open, Wh, Distancing prompts by perceived effectiveness | Prioritise the top-ranked prompt types for the 4 prompts per story; deprioritise the least-valued types to Phase 2 prompt expansion |
| **Interview Q13: Owl behaviour suggestions** (*"Anything you'd add to the owl?"*) | Suggestions for owl personality, voice, or interaction patterns | Tune character animation style, voice warmth, and response timing in Phase 2 (Mid-Fi) Figma prototype before locking for Phase 3 |
| **Interview Q9: Recording comfort** (*"Would you feel comfortable recording in a hotel room?"*) | Specific self-consciousness triggers or facilitators | Refine SCAMPER 1.1 recording interface: ensure child-perspective preview is prominent, ambient noise indicator is visible, and the experience feels like reading TO the child |
| **Interview Q4: Child behaviour prediction** (*"What would your child do at the moment of the cut?"*) | Predictions of child reactions based on parent knowledge | Validate against Phase 3 instrumentation data; if Phase 3 reveals children do notice the transition, revisit bridge duration or add a secondary buffer |
| **B3: Connection failure experiences** (*"Has your child experienced a dropped video call?"*) | Personal anecdotes of real connection failures and child reactions | Use as emotional anchors for the handoff design -- the prototype must perform better than these described worst-case experiences |

### 8.3 Concept Validation Basis

The decision to proceed to prototype build is grounded in converging evidence from three sources:

| Validation Source | Key Evidence |
| :--- | :--- |
| **Academic literature** | Raffle et al. (2010): character-mediated shared activity extends engagement from 2-3 min to 15-20 min; Yarosh & Abowd (2011): children cannot separate "parent left the call" from "parent left me" |
| **Interview findings** | 5 parents (59 coded data points): P4's account of emotional harm from abrupt disconnection; P2 confirming pre-recorded voice maintains felt-presence; P3 on connection failure being worse than no contact |
| **Competitive gap analysis** | No existing product (FaceTime, Caribu, StoryVisit) combines sync and async modes, handles connection drops gracefully, or provides character-mediated dialogic reading prompts |

These three sources provide sufficient confidence to proceed. The core interaction concepts (handoff believability, owl bridge safety, dialogic prompt engagement, felt-presence) will be formally evaluated with the deployed application in the user evaluation study.

---

## Next Step

This completed Prototyping Canvas feeds into **Step 18: Wireframing** (`4_Deliver/wireframing`). The Lo-Fi wireframes specified in Phase 1 are the first deliverable, testable within 1 week. The validated layouts from Phase 1 then inform the Mid-Fi interactive prototype (Phase 2, Weeks 2-3) and ultimately the Hi-Fi functional web application (Phase 3, Weeks 4-8).

The Phase 3 Hi-Fi prototype is evaluated at **Step 20: User Feedback Synthesis** using the 5 primary success metrics defined in Section 6, with SUS questionnaire, semi-structured interviews, and behavioural analytics from Supabase session logs.
