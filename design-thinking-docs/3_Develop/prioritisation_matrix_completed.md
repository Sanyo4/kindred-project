# Prioritisation Matrix -- Completed

**Project:** Kindred
**Step:** 13 (Part F: Selection)
**Goal:** Apply the Impact vs Effort (I/E) model to prioritise all 20 brainstormed features (Step 10) + 9 SCAMPER variations (Step 11) for MVP selection, ensuring complete coverage of the three competitive gaps identified in the Benchmarking Report.

**Data Sources:** `ideation_completed.md` (20 features + evaluation table), `scamper_template.md` (9 refined variations + Top 3 Innovations), `benchmarking_report.md` (3 competitive gaps + HEART analysis), `design_by_analogy_template.md` (analogy framing + pitches), `5_whys_completed.md` (root cause convergence)

---

## 1. Scoring Model: Impact vs Effort (I/E)

### Impact (1-5)

Impact measures how strongly a feature addresses the validated research findings. Three weighted criteria:

| Criterion | Weight | Description |
| :--- | :---: | :--- |
| **Solves a "High Stakes" Benchmarking Gap** | 40% | Does it directly address Gap 1 (sync-async continuity), Gap 2 (developmental scaffolding), or Gap 3 (dialogic reading)? Features addressing gaps that no competitor covers score highest. |
| **Addresses Deep Root Causes (5 Whys)** | 35% | Does it target root causes at the deepest convergence level (B2/B5 async dependency, A1/A3/A5 engagement scaffolding, C1/C3/C5 routine protection)? More root causes addressed = higher score. |
| **Serves Persona Core Needs** | 25% | Does it directly serve Sarah's goals (5+/7 nights, guilt reduction, presence) or Max's goals (agency, familiar voice, predictable ritual, character engagement)? |

| Score | Meaning |
| :---: | :--- |
| **5** | Addresses a competitive gap no one else covers AND targets the deepest root cause convergence AND serves a core persona need. This feature *is* the UVP. |
| **4** | Addresses a competitive gap AND targets multiple root causes. Strong contribution to differentiation. |
| **3** | Addresses a competitive gap OR targets root causes. Solid but not unique. |
| **2** | Supports the experience but does not address a gap or deep root cause directly. Enhancement, not differentiator. |
| **1** | Marginal contribution to the core value proposition. |

### Effort (1-5)

Effort measures implementation feasibility within the 12-week project timeline using React, Node.js, and WebSockets. **Higher score = lower effort = easier to build.**

| Score | Meaning | Examples |
| :---: | :--- | :--- |
| **5** | Trivial -- CSS/animation changes, static UI, config-level work. < 1 week. | Progressive dimming, slow-motion pages |
| **4** | Straightforward -- standard React components, simple state management, well-documented patterns. 1-2 weeks. | One-tap notification, sticker display, audio recording UI |
| **3** | Moderate -- WebSocket integration, real-time state sync, multi-device coordination, custom animation sequences. 2-4 weeks. | Page sync, dialogic prompt engine, async handoff logic |
| **2** | Complex -- third-party API integration, cross-platform calendar sync, multi-tier adaptive systems. 4-6 weeks. | Calendar API integration, age-adaptive mode with three UX tracks |
| **1** | Very complex -- requires NLP/speech recognition, generative AI, or novel infrastructure beyond scope. 6+ weeks or research-phase dependency. | Child speech recognition, AI-generated story content |

### Priority Score

**Priority Score = Impact x Effort.** Range: 1-25. Higher = better candidate for MVP (high value, achievable effort).

### Prioritisation Quadrants

| Quadrant | Impact | Effort | Strategy |
| :--- | :---: | :---: | :--- |
| **Quick Wins** | >= 4 | >= 4 | Ship first. MVP core. |
| **Big Bets** | >= 4 | 1-3 | Worth the investment if they address critical, irreplaceable gaps. Evaluate for MVP on a case-by-case basis. |
| **Fill-Ins** | 1-3 | >= 4 | Nice-to-haves. Phase 2. |
| **Avoid** | 1-3 | 1-3 | Defer or reject. Not worth the effort for the impact. |

---

## 2. Mindell Stimulation Filter

Per Mindell et al. (2015), consistent bedtime routines with calming activities have a dose-dependent association with improved sleep outcomes. **Any feature that introduces high stimulation -- bright flashing visuals, competitive gamification, loud sound effects, rapid animations, or screen brightness increases -- is rejected regardless of its I/E score.**

### Filter Application

| # | Feature | High Stimulation Risk? | Verdict |
| :--- | :--- | :--- | :--- |
| 1 | Synchronised Page-Turn with Shared Touch | No -- gentle page animations, soft cursor indicators | **Pass** |
| 2 | Tap-to-Explore Interactive Story Elements | Low -- audio labels and gentle pulse; NOT flashy animations | **Pass** |
| 3 | Live Dialogic Reading Prompts (PEER/CROWD) | No -- thought bubbles, conversational tone, parent-controlled pacing | **Pass** |
| 4 | Parent Voice Spotlight | No -- merges voice into story view; reduces visual split | **Pass** |
| 5 | Story Banking | No -- asynchronous recording and playback; no live stimulation | **Pass** |
| 6 | Trip Planner with Bedtime Calendar | No -- parent-facing dashboard; child never sees it | **Pass** |
| 7 | Async Reaction Loop | Low -- child records a voice/drawing; calm, creative activity | **Pass** |
| 8 | Personalised Page Annotations | No -- star icon tap reveals audio; gentle discovery mechanic | **Pass** |
| 9 | One-Tap Bedtime Launch | No -- single notification; removes complexity rather than adding stimulation | **Pass** |
| 10 | Routine Dose Tracker | No -- sleeping stars, low-stimulation visual; NOT competitive gamification | **Pass** |
| 11 | Sleepy Owl Guide Character | No -- explicitly designed to model wind-down; progressive sleepiness | **Pass** |
| 12 | Character Hand Demo (Escalating Scaffolding) | No -- animated hand demo is calm and instructional | **Pass** |
| 13 | Story Completion Stickers | Low -- calm, illustrative stickers; no flashing, no game sounds, no competitive framing | **Pass** |
| 14 | Age-Adaptive Story Mode | No -- adapts complexity, does not add stimulation | **Pass** |
| 15 | Sync-to-Async Seamless Handoff | No -- owl "shh" animation is calming by design | **Pass** |
| 16 | "I Need to Go" Button | No -- parent-facing; child hears a warm sign-off, not an alert | **Pass** |
| 17 | Offline-First Story Cache | No -- infrastructure feature; invisible to the child | **Pass** |
| 18 | Progressive Dimming Interface | No -- actively reduces stimulation; this IS the calming mechanism | **Pass** |
| 19 | Ambient Soundscape Transition | No -- white noise, gentle rain; designed for sleep onset | **Pass** |
| 20 | Slow-Motion Final Pages | No -- deliberately decelerates interaction; anti-stimulation | **Pass** |
| 1.1 | Audio-Only Recording Over Animated Pages | No -- removes video rectangle; book illustrations are calm | **Pass** |
| 1.2 | Character-Mediated Handoff Bridge | No -- 3-second owl "shh" animation; reassuring, not stimulating | **Pass** |
| 1.3 | Child Records a Story for the Parent | Low -- child narrates at their own pace; creative, not competitive | **Pass** |
| 2.1 | Owl as Transitional Comfort Object | No -- sleeping owl on dimmed screen; designed as digital nightlight | **Pass** |
| 2.2 | Owl Micro-Reactions (Emotional Co-Reader) | Low -- subtle expressions (covers eyes, smiles); no sudden movements or sounds | **Pass** |
| 2.3 | Child Asks the Owl Questions | Low -- conversational play; owl responds calmly | **Pass** |
| 3.1 | Calendar Sync with Auto-Coverage Plan | No -- parent-facing; child never interacts with it | **Pass** |
| 3.2 | Auto-Play on Schedule (Zero-Tap Launch) | No -- gentle chime + owl appearance; bedtime signal, not alarm | **Pass** |
| 3.3 | "I Want a Story from Mummy" Request Button | No -- single tap on owl illustration; calm initiation | **Pass** |

**Result:** All 29 features pass the stimulation filter. This is expected -- the ideation process (Step 10) embedded bedtime calm as a core design constraint from the outset. No features require rejection.

---

## 3. Impact vs Effort Scoring Matrix

### A. Brainstormed Features (Ideas 1-20)

| # | Feature | Impact | Impact Justification | Effort | Effort Justification | I x E | Gaps | Quadrant |
| :--- | :--- | :---: | :--- | :---: | :--- | :---: | :--- | :--- |
| 1 | Synchronised Page-Turn with Shared Touch | 5 | Foundation of shared-reading experience; addresses Gap 2 (shared object); Root Causes B1, B3, B4; Raffle et al. found page-sync extended engagement from 2 to 15-20 min | 3 | WebSocket real-time sync with <100ms latency; dual-cursor rendering; moderate complexity but well-documented patterns | **15** | Gap 2 | Big Bet |
| 2 | Tap-to-Explore Interactive Story Elements | 4 | Addresses Gap 2 (audio-first prompts vs visual-only); multimodal interaction per Hiniker et al.; Root Causes A1, A3, B1 | 4 | Standard touch handlers + audio playback; hotspot metadata per story page; straightforward React component | **16** | Gap 2 | Quick Win |
| 3 | Live Dialogic Reading Prompts (PEER/CROWD) | 5 | Addresses Gap 3 directly -- no competitor integrates PEER/CROWD; Raffle et al. 5x engagement uplift; Root Causes A1, A5, B4, B1 | 3 | Prompt engine with page-specific triggers, progressive complexity tracking across re-readings, parent preview/trigger UI | **15** | Gap 3 | Big Bet |
| 4 | Parent Voice Spotlight | 3 | Supports shared attention but not a unique differentiator; Root Causes B1, B4 | 4 | Audio routing + small video thumbnail overlay; standard media integration | **12** | Gap 2 | Fill-In |
| 5 | Story Banking (Pre-Record a Trip's Worth) | 5 | Core async UVP; addresses Gap 1; deepest root cause convergence (B2, B5, C1, C2); P4 explicitly validated the concept; Mindell dose-dependent routine protection | 3 | Audio recording pipeline, story-page synchronisation, scheduling system, progress indicator ("4 of 5 nights covered") | **15** | Gap 1 | Big Bet |
| 6 | Trip Planner with Bedtime Calendar | 4 | Addresses Gap 1 (proactive preparation); Root Causes C1, C2, C5; entirely novel -- no competitor helps parents plan ahead | 3 | Visual calendar UI, time-zone overlay, recording queue management; moderate state complexity | **12** | Gap 1 | Big Bet |
| 7 | Async Reaction Loop | 3 | Extends async connection but not core to routine continuity; Root Causes B5, C4 | 3 | Voice/photo capture, notification system, cross-device message passing | **9** | Gap 1 | Avoid |
| 8 | Personalised Page Annotations | 3 | Makes async personal but not a gap-closing differentiator; Root Causes B5, B2 | 4 | Page-anchored audio recording + star icon tap overlay; extends the Story Banking recording UI | **12** | Gap 1 | Fill-In |
| 9 | One-Tap Bedtime Launch | 4 | Adoption gatekeeper -- P1, P2, P3, P4 all independently cite one-tap simplicity; Root Causes C3, B5; critical for caregiver retention | 5 | Push notification + deep link to pre-selected story; minimal UI; standard mobile notification pattern | **20** | Gap 1 | Quick Win |
| 10 | Routine Dose Tracker | 3 | Motivational but not a gap-closing differentiator; Mindell dose-dependent evidence; Root Causes C1, C5 | 4 | Streak counter + sleeping-star visual; simple state tracking across sessions | **12** | Gap 1 | Fill-In |
| 11 | Sleepy Owl Guide Character | 5 | Prompt delivery vehicle for Gap 3 (PEER/CROWD) + Gap 2 (character demonstration -- most effective non-adult prompt type per Hiniker et al.); Root Causes A1, A3, C5; wind-down arc supports bedtime context | 3 | Animated character with multiple states (awake/cosy/sleepy/asleep), thought-bubble prompts, progressive sleepiness logic | **15** | Gap 2, 3 | Big Bet |
| 12 | Character Hand Demo (Escalating Scaffolding) | 4 | Directly implements Hiniker et al. evidence-based prompt hierarchy (audio + hand demo); addresses Gap 2; Root Causes A2, A3, A4 | 3 | Three-tier escalation engine with configurable timeouts; animated hand overlay; parent-trigger fallback | **12** | Gap 2 | Big Bet |
| 13 | Story Completion Stickers | 2 | Small gamification; micro-connection but not a differentiator; Root Causes C4, C5 | 5 | Static sticker images + collection display; notification to parent; trivial implementation | **10** | Gap 1, 2 | Fill-In |
| 14 | Age-Adaptive Story Mode | 3 | Addresses developmental scaling but not a launch differentiator; Root Causes A4, A5, C3; important for long-term retention, not MVP | 2 | Three separate UX tracks (Guided/Explorer/Independent) with age-gated transitions, configurable overrides; complex UX architecture | **6** | Gap 2 | Avoid |
| 15 | Sync-to-Async Seamless Handoff | 5 | Zero-competition space; addresses Gap 1; prevents the worst emotional outcome (child perceives abandonment); deepest root cause convergence B2/B5; P3, P4 evidence of real harm from abrupt disconnection | 3 | WebSocket drop detection (5s), page-level audio matching to pre-recorded narration, state transfer logic; moderate-high complexity | **15** | Gap 1 | Big Bet |
| 16 | "I Need to Go" Button | 4 | Addresses Gap 1; graceful parent exit prevents the P4 scenario (the twin screamed 20 min); Root Causes B2, C4 | 4 | Quick sign-off recording + transition to async playback; extends the handoff system (Idea 15) | **16** | Gap 1 | Quick Win |
| 17 | Offline-First Story Cache | 4 | Addresses Gap 1; ensures the routine survives any connectivity scenario; Root Causes B2, C2; P3: *"If your app needs a stable video connection it's useless to me"* | 4 | Pre-download scheduled stories + book assets during WiFi; deferred session-data sync; standard offline-first patterns (Service Workers, IndexedDB) | **16** | Gap 1 | Quick Win |
| 18 | Progressive Dimming Interface | 4 | Addresses Gap 2 (bedtime-specific design); no competitor modulates UI for bedtime context; Root Causes C5, B4; Mindell: calming routine activities | 5 | CSS brightness/warmth transitions tied to page progress; configurable curve; trivial implementation | **20** | Gap 2 | Quick Win |
| 19 | Ambient Soundscape Transition | 3 | Supports post-story wind-down but not a gap-closing differentiator; Root Causes C5, C4 | 4 | Audio crossfade from narration to ambient track; configurable duration and sound; standard audio API | **12** | Gap 2 | Fill-In |
| 20 | Slow-Motion Final Pages | 2 | Subtle pacing detail; enhances calm but not a differentiator; Root Cause C5 | 5 | Reduced animation speed + narration tempo for last 2-3 pages; CSS timing adjustments | **10** | Gap 2 | Fill-In |

### B. SCAMPER Variations (1.1 - 3.3)

| # | Variation | Impact | Impact Justification | Effort | Effort Justification | I x E | Gaps | Quadrant |
| :--- | :--- | :---: | :--- | :---: | :--- | :---: | :--- | :--- |
| 1.1 | Audio-Only Recording Over Animated Pages | 4 | Enables Story Banking to work practically -- removes the self-consciousness barrier (P5); book illustrations provide visual richness without video; Root Causes B5, B2 | 4 | Audio capture + overlay on existing animated story pages; no video processing needed; simplifies the recording pipeline | **16** | Gap 1 | Quick Win |
| 1.2 | Character-Mediated Handoff Bridge | 5 | Prevents the single worst emotional outcome in the problem space (child perceives connection drop as abandonment); transforms a technical event into a story-world moment; near-zero cost for maximum emotional impact; Root Causes B2, C4 | 4 | 3-second owl animation + "shh" audio clip triggered on WebSocket drop; minimal asset creation; hooks into existing handoff logic (Idea 15) | **20** | Gap 1 | Quick Win |
| 1.3 | Child Records a Story for the Parent | 3 | Bidirectional async is novel but not core to routine continuity; addresses child agency; Root Causes C4, B5 | 3 | Child-facing recording mode, capture touch + voice, package + send to parent; moderate complexity | **9** | Gap 1 | Avoid |
| 2.1 | Owl as Transitional Comfort Object | 4 | Addresses Gap 2 -- no competitor addresses the post-story transition at all; extends Kindred's value from "story delivery" to "bedtime companion"; Root Causes C5, C4; fills the most emotionally vulnerable gap in the journey | 4 | Static sleeping owl animation on dimmed screen; warm nightlight glow; configurable duration before screen off; simple implementation | **16** | Gap 2 | Quick Win |
| 2.2 | Owl Micro-Reactions (Emotional Co-Reader) | 4 | Addresses Gap 2 + Gap 3; non-verbal emotional scaffolding supplements PEER/CROWD; Raffle et al.: emotion-focused engagement strongest; Root Causes A1, A3, B1 | 3 | Page-specific emotion states for the owl; animation library per story; content authoring per book; moderate-high effort at scale | **12** | Gap 2, 3 | Big Bet |
| 2.3 | Child Asks the Owl Questions | 3 | Activates highest-tier PEER/CROWD (Distancing) but requires speech recognition for preschoolers -- technically unreliable for age 3-4 | 1 | Requires real-time speech-to-text for preschooler speech (highly error-prone); NLU for question intent; response generation; research-phase dependency | **3** | Gap 3 | Avoid |
| 3.1 | Calendar Sync with Auto-Coverage Plan | 3 | Valuable for reducing parent cognitive load but not a gap-closing differentiator for the child's experience; Root Causes C1, C2 | 2 | Google Calendar / Outlook API integration; time zone calculation engine; auto-generation of coverage plans; OAuth flows; high integration complexity | **6** | Gap 1 | Avoid |
| 3.2 | Auto-Play on Schedule (Zero-Tap Launch) | 3 | Pushes facilitation to zero but raises parental control concerns; One-Tap (Idea 9) already achieves the critical friction reduction; marginal gain over one-tap for significant added complexity | 3 | Scheduled local notification that auto-launches media; requires background app permissions, device-specific audio routing, smart display API; platform-dependent edge cases | **9** | Gap 1 | Avoid |
| 3.3 | "I Want a Story from Mummy" Request Button | 3 | Novel child-initiation mechanic but not core to MVP routine continuity; better suited for Phase 2 when child agency features expand | 4 | Simple UI button + notification to parent + one-tap recording flow; straightforward implementation | **12** | Gap 1 | Fill-In |

---

## 4. Quadrant Summary

### A. Quick Wins (High Impact, Low Effort) -- MVP Core

| # | Feature | I x E | Gaps |
| :--- | :--- | :---: | :--- |
| 9 | One-Tap Bedtime Launch | **20** | Gap 1 |
| 18 | Progressive Dimming Interface | **20** | Gap 2 |
| 1.2 | Character-Mediated Handoff Bridge | **20** | Gap 1 |
| 2 | Tap-to-Explore Interactive Story Elements | **16** | Gap 2 |
| 16 | "I Need to Go" Button (Graceful Parent Exit) | **16** | Gap 1 |
| 17 | Offline-First Story Cache | **16** | Gap 1 |
| 1.1 | Audio-Only Recording Over Animated Pages | **16** | Gap 1 |
| 2.1 | Owl as Transitional Comfort Object | **16** | Gap 2 |

### B. Big Bets (High Impact, High Effort) -- MVP if Gap-Critical

| # | Feature | I x E | Gaps |
| :--- | :--- | :---: | :--- |
| 1 | Synchronised Page-Turn with Shared Touch | **15** | Gap 2 |
| 3 | Live Dialogic Reading Prompts (PEER/CROWD) | **15** | Gap 3 |
| 5 | Story Banking (Pre-Record a Trip's Worth) | **15** | Gap 1 |
| 11 | Sleepy Owl Guide Character | **15** | Gap 2, 3 |
| 15 | Sync-to-Async Seamless Handoff | **15** | Gap 1 |
| 6 | Trip Planner with Bedtime Calendar | **12** | Gap 1 |
| 12 | Character Hand Demo (Escalating Scaffolding) | **12** | Gap 2 |
| 2.2 | Owl Micro-Reactions (Emotional Co-Reader) | **12** | Gap 2, 3 |

### C. Fill-Ins (Low Impact, Low Effort) -- Phase 2

| # | Feature | I x E | Gaps |
| :--- | :--- | :---: | :--- |
| 4 | Parent Voice Spotlight | **12** | Gap 2 |
| 8 | Personalised Page Annotations | **12** | Gap 1 |
| 10 | Routine Dose Tracker | **12** | Gap 1 |
| 19 | Ambient Soundscape Transition | **12** | Gap 2 |
| 3.3 | "I Want a Story from Mummy" Request Button | **12** | Gap 1 |
| 13 | Story Completion Stickers | **10** | Gap 1, 2 |
| 20 | Slow-Motion Final Pages | **10** | Gap 2 |

### D. Avoid (Low Impact, High Effort) -- Defer

| # | Feature | I x E | Gaps |
| :--- | :--- | :---: | :--- |
| 7 | Async Reaction Loop | **9** | Gap 1 |
| 1.3 | Child Records a Story for the Parent | **9** | Gap 1 |
| 3.2 | Auto-Play on Schedule (Zero-Tap Launch) | **9** | Gap 1 |
| 14 | Age-Adaptive Story Mode | **6** | Gap 2 |
| 3.1 | Calendar Sync with Auto-Coverage Plan | **6** | Gap 1 |
| 2.3 | Child Asks the Owl Questions | **3** | Gap 3 |

---

## 5. MVP Feature Set (The Prototype Scope)

The MVP must satisfy three constraints simultaneously:
1. **Gap Coverage:** All three competitive gaps from the benchmarking report must be addressed.
2. **12-Week Feasibility:** The combined effort must fit within the project timeline (React/Node.js/WebSockets stack).
3. **Bedtime Calm:** Every feature must pass the Mindell stimulation filter (all do -- see Section 2).

### Selection Logic

The MVP is composed of all **Quick Wins** plus the **Big Bets that are structurally irreplaceable** for gap coverage. The key test: *if we remove this feature, does a competitive gap go unaddressed?*

| # | Feature | Source | Role in MVP | Gap(s) Covered | Effort |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **1** | **Synchronised Page-Turn with Shared Touch** | Idea 1 | Foundation layer -- the shared reading mechanic that everything else builds on. Without page sync, there is no shared object of attention and the Raffle et al. engagement mechanism cannot function. | Gap 2 | 3 |
| **3** | **Live Dialogic Reading Prompts (PEER/CROWD)** | Idea 3 | Gap 3 closer -- the ONLY feature that implements PEER/CROWD dialogic reading, which is Kindred's second-largest differentiator. Without this, Gap 3 is entirely unaddressed. | Gap 3 | 3 |
| **5** | **Story Banking (Pre-Record a Trip's Worth)** | Idea 5 | Gap 1 closer -- the core async UVP. Enables pre-recorded narrated story sessions scheduled for specific nights. Without this, there is no async mode. | Gap 1 | 3 |
| **9** | **One-Tap Bedtime Launch** | Idea 9 | Adoption gatekeeper. All 4 interview participants who discussed facilitation independently cited one-tap as the threshold. Without this, the at-home caregiver cannot reliably start sessions. | Gap 1 | 5 |
| **11** | **Sleepy Owl Guide Character** | Idea 11 | Prompt delivery vehicle for PEER/CROWD (Idea 3) + character demonstration (most effective non-adult prompt per Hiniker et al.) + bedtime wind-down arc. Without this, dialogic prompts have no delivery mechanism. | Gap 2, 3 | 3 |
| **15** | **Sync-to-Async Seamless Handoff** | Idea 15 | Gap 1 closer -- ensures the story always finishes when a live connection drops. This is the technical mechanism that makes sync+async coexist within the same activity. Zero-competition space. | Gap 1 | 3 |
| **18** | **Progressive Dimming Interface** | Idea 18 | Bedtime-calm design principle. No competitor modulates their UI for the bedtime context. Trivial to implement; disproportionate impact on perceived product quality and Mindell compliance. | Gap 2 | 5 |
| **1.1** | **Audio-Only Recording Over Animated Pages** | SCAMPER 1.1 | Enables Story Banking to work practically. Removes the self-consciousness barrier that would otherwise suppress recording adoption. The child sees rich book illustrations while hearing the parent's voice. | Gap 1 | 4 |
| **1.2** | **Character-Mediated Handoff Bridge** | SCAMPER 1.2 | Emotional safety layer on the Sync-to-Async Handoff. Transforms the technical transition into a story-world moment. Prevents the worst emotional outcome at near-zero cost. | Gap 1 | 4 |
| **2.1** | **Owl as Transitional Comfort Object** | SCAMPER 2.1 | Post-story wind-down. No competitor addresses the story-to-sleep transition. Extends the Sleepy Owl (Idea 11) into the most emotionally vulnerable moment. Minimal additional implementation. | Gap 2 | 4 |

### MVP Effort Budget

| Effort Score | Meaning | Features | Count |
| :---: | :--- | :--- | :---: |
| 5 (< 1 week) | Trivial | Ideas 9, 18 | 2 |
| 4 (1-2 weeks) | Straightforward | SCAMPER 1.1, 1.2, 2.1 | 3 |
| 3 (2-4 weeks) | Moderate | Ideas 1, 3, 5, 11, 15 | 5 |

**Total estimated effort:** 2 features x ~0.5 weeks + 3 features x ~1.5 weeks + 5 features x ~3 weeks = ~20.5 weeks of sequential effort. However, features can be developed in **parallel streams** (Sync Layer, Async Layer, Character Layer, Calm Layer) and share infrastructure (WebSocket server, story renderer, audio pipeline). Realistic parallel timeline: **8-10 weeks of development** within a 12-week project that includes research, design, and evaluation phases.

---

## 6. Phase 2 Features (Post-MVP Iteration)

These features scored well on Impact or Effort but are not structurally required for gap coverage. They enhance the MVP experience and would be prioritised for the next release.

### Phase 2A: High-Value Enhancements (First Post-MVP Sprint)

| # | Feature | I x E | Rationale for Deferral |
| :--- | :--- | :---: | :--- |
| 2 | Tap-to-Explore Interactive Story Elements | **16** | Enhances engagement but Dialogic Prompts (Idea 3) already cover Gap 2. Add after core reading loop is stable. |
| 16 | "I Need to Go" Button | **16** | Valuable parent UX but the Seamless Handoff (Idea 15) already handles the worst case (connection drops). This handles the voluntary-exit case. |
| 17 | Offline-First Story Cache | **16** | Important for reliability but not launch-blocking. Async stories require internet to initially download; offline cache makes them resilient to mid-session drops. |
| 12 | Character Hand Demo (Escalating Scaffolding) | **12** | Deepens Gap 2 coverage but the Sleepy Owl (Idea 11) already provides character-delivered prompts. Escalation adds a second tier. |
| 2.2 | Owl Micro-Reactions | **12** | Enriches the owl's emotional presence but the core owl character (Idea 11) ships without it. Phase 2 content authoring per book. |

### Phase 2B: Retention & Depth (Second Post-MVP Sprint)

| # | Feature | I x E | Rationale for Deferral |
| :--- | :--- | :---: | :--- |
| 6 | Trip Planner with Bedtime Calendar | **12** | Proactive preparation is valuable but Story Banking (Idea 5) already provides the recording mechanism. The planner adds planning UX on top. |
| 10 | Routine Dose Tracker | **12** | Motivational layer. Streak tracking reinforces Mindell dose-dependency but the routine itself must work first. |
| 8 | Personalised Page Annotations | **12** | Makes async feel warmer but Story Banking + Audio-Only Recording already deliver the core async experience. Annotations add richness. |
| 19 | Ambient Soundscape Transition | **12** | Extends the post-story wind-down. Owl Comfort Object (SCAMPER 2.1) already addresses this moment. Soundscape adds audio layer. |
| 4 | Parent Voice Spotlight | **12** | Merges parent presence with the book. Good UX but not a gap-closer. |
| 3.3 | "I Want a Story from Mummy" Request Button | **12** | Child-initiated async. Novel but requires the async ecosystem (Story Banking) to be mature first. |

### Phase 2C: Long-Term Features (Deferred Indefinitely or V2)

| # | Feature | I x E | Rationale for Deferral |
| :--- | :--- | :---: | :--- |
| 13 | Story Completion Stickers | **10** | Small gamification. Low priority. |
| 20 | Slow-Motion Final Pages | **10** | Subtle pacing detail. Progressive Dimming (Idea 18) covers the calm-ending need. |
| 7 | Async Reaction Loop | **9** | Bidirectional async exchange. Needs mature async infrastructure + child recording capability. |
| 1.3 | Child Records a Story for Parent | **9** | Same dependency as Idea 7. Child recording is Phase 2+ territory. |
| 3.2 | Auto-Play on Schedule (Zero-Tap) | **9** | Marginal gain over One-Tap (Idea 9). Platform-dependent edge cases. |
| 14 | Age-Adaptive Story Mode | **6** | Three UX tracks is significant complexity. Ship one mode (Guided, ages 3-5) and expand later. |
| 3.1 | Calendar Sync with Auto-Coverage | **6** | Third-party API integration beyond project scope. Trip Planner (Idea 6) is the manual-input version. |
| 2.3 | Child Asks the Owl Questions | **3** | Requires preschooler speech recognition -- technically unreliable at the target age. Research project in itself. |

---

## 7. Gap Coverage Traceability Matrix

This table confirms that the MVP feature set provides complete coverage of all three competitive gaps identified in the benchmarking report.

| Competitive Gap | Definition | MVP Features Addressing It | Coverage Assessment |
| :--- | :--- | :--- | :--- |
| **Gap 1: Sync-Async Routine Continuity** | No consumer tool supports both synchronous and asynchronous modes within the same bedtime activity. FaceTime is sync-only. Caribu has no async. When time zones prevent live sessions, the routine breaks. (Yarosh & Abowd, 2011; Mindell et al., 2015) | **Idea 5** (Story Banking) + **Idea 15** (Sync-to-Async Handoff) + **SCAMPER 1.1** (Audio-Only Recording) + **SCAMPER 1.2** (Character-Mediated Bridge) + **Idea 9** (One-Tap Launch) | **Full coverage.** Five features spanning recording, delivery, graceful degradation, emotional transition, and session initiation. The routine survives time zones (Story Banking), connection drops (Handoff + Bridge), and caregiver friction (One-Tap). |
| **Gap 2: Developmentally Appropriate Interaction Scaffolding** | Visual-only prompts are the least effective prompt type for preschoolers (Hiniker et al., 2015). Caribu relies on visual-only UI. No competitor implements the evidence-based hierarchy (audio + character demonstration + adult modelling). (Hiniker et al., 2015) | **Idea 11** (Sleepy Owl -- character demonstration) + **Idea 1** (Synchronised Page-Turn -- shared object) + **Idea 18** (Progressive Dimming -- bedtime-appropriate design) + **SCAMPER 2.1** (Owl Comfort Object -- post-story scaffolding) | **Full coverage.** The Sleepy Owl delivers multimodal prompts (audio + character demo), replacing visual-only cues. Page-sync provides the shared object of attention. Progressive Dimming and the Comfort Object address the bedtime context no competitor acknowledges. |
| **Gap 3: Dialogic Reading as Core Interaction Model** | No commercial app integrates PEER/CROWD dialogic reading prompts into remote shared reading. Caribu provides books but no structured questioning. (Raffle et al., 2010) | **Idea 3** (Live Dialogic Prompts -- PEER/CROWD engine) + **Idea 11** (Sleepy Owl -- character delivers prompts via thought bubbles) | **Full coverage.** The dialogic prompt engine (Idea 3) + the character delivery vehicle (Idea 11) together implement the Raffle et al. mechanism. Prompt types progress across re-readings: Completion and Wh-questions on first reads, Recall and Distancing on repeated readings. |

**Result: All three gaps fully covered by the MVP feature set.**

---

## 8. The MVP Feature List (Final Selection)

1. **Synchronised Page-Turn with Shared Touch** (Idea 1) -- The shared reading foundation
2. **Live Dialogic Reading Prompts via PEER/CROWD** (Idea 3) -- The engagement differentiator
3. **Story Banking: Pre-Record a Trip's Worth** (Idea 5) -- The async UVP
4. **One-Tap Bedtime Launch** (Idea 9) -- The adoption gatekeeper
5. **Sleepy Owl Guide Character** (Idea 11) -- The prompt delivery vehicle and bedtime companion
6. **Sync-to-Async Seamless Handoff** (Idea 15) -- The graceful degradation mechanism
7. **Progressive Dimming Interface** (Idea 18) -- The bedtime-calm design principle
8. **Audio-Only Recording Over Animated Pages** (SCAMPER 1.1) -- The practical recording mode
9. **Character-Mediated Handoff Bridge** (SCAMPER 1.2) -- The emotional safety net
10. **Owl as Transitional Comfort Object** (SCAMPER 2.1) -- The post-story sleep companion

---

## 9. Prioritisation Visual: I/E Plot

```
                          EFFORT (Ease of Implementation) →
                    1 (Very Hard)    2          3          4          5 (Trivial)
                 ┌──────────────┬──────────┬──────────┬──────────┬──────────┐
            5    │              │          │ *1  *3   │ *1.2     │ *9  *18  │
   (Critical)   │              │          │ *5  *11  │ *1.1     │          │
                 │              │          │ *15      │ *2.1     │          │
   I             ├──────────────┼──────────┼──────────┼──────────┼──────────┤
   M        4    │              │          │ 6   12   │ 2   16   │          │
   P             │              │          │ 2.2      │ 17       │          │
   A             │              │          │          │          │          │
   C             ├──────────────┼──────────┼──────────┼──────────┼──────────┤
   T        3    │              │          │ 7   3.2  │ 8   19   │ 13  20   │
                 │              │  3.1     │ 1.3      │ 3.3  10  │          │
   ↓             │  2.3         │          │          │ 4        │          │
                 ├──────────────┼──────────┼──────────┼──────────┼──────────┤
            2    │              │  14      │          │          │          │
                 │              │          │          │          │          │
                 ├──────────────┼──────────┼──────────┼──────────┼──────────┤
            1    │              │          │          │          │          │
                 └──────────────┴──────────┴──────────┴──────────┴──────────┘

   * = MVP feature (starred)

   Top-right quadrant = QUICK WINS (ship first)
   Top-left quadrant  = BIG BETS (invest if gap-critical)
   Bottom-right       = FILL-INS (Phase 2)
   Bottom-left        = AVOID (defer)
```

---

## 10. Next Steps

1. Feed the MVP Feature List into the **Real-Win-Worth Analysis** (Step 14) to validate feasibility against the 12-week timeline, competitive positioning, and academic requirements.
2. Use the "X for Y" pitches from `design_by_analogy_template.md` to communicate the MVP's value proposition in the RWW assessment.
3. Phase 2 features form the **iteration backlog** -- prioritised for post-prototype enhancement based on user testing feedback (Step 20).
