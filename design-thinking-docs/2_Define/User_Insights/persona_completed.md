# User Personas -- Kindred Bedtime Storytelling App

Based on the **Problem Tree** and **Empathy Map**, we have two distinct users: "The Traveling Parent" (Remote) and "The Child" (Co-located). These personas synthesize data from 5 user interviews, the thematic analysis (5 themes, 59 coded responses), and the 5 Whys root cause verification.

**Data Sources:** `empathy_map_completed.md`, `thematic_analysis_completed.md`, `problem_tree_completed.md`, `solution_tree_completed.md`, `5_whys_completed.md`

---

## Persona A: Sarah Chen, 34 — The Traveling Parent

> **Composite persona.** Sarah is a synthesis of interview participants P1-P5: travel pattern and tech profile (P1), timezone severity and async validation (P2), connectivity constraints and caregiver limitations (P3), emotional stakes and schedule unpredictability (P4), and self-consciousness and older-child dynamics (P5). She is distinct from any single participant.

### Profile

| Field | Detail |
| :--- | :--- |
| **Name** | Sarah Chen |
| **Age** | 34 |
| **Occupation** | Management Consultant |
| **Location** | London, UK |
| **Family** | Partner Alex (works from home, graphic designer); daughter Lily (age 4); mother-in-law Jan occasionally assists at bedtime |
| **Travel Pattern** | Mon–Thu domestic weekly (UK/Europe, 0–1hr offset); quarterly international (US West Coast, 8hr offset) |
| **Primary Constraint** | Time zone mismatch on international trips + unreliable hotel WiFi |
| **Secondary Constraint** | At-home caregiver patience ceiling (~2 min for Alex; near-zero for Jan) |
| **Current Tools** | FaceTime for live calls (frequently fails); WhatsApp voice notes as ad hoc async workaround |
| **Tech Comfort** | High (Sarah); moderate (Alex); very low (Jan) |
| **Bedtime Routine (when home)** | Bath → teeth → Lily picks first book, Sarah picks second → read together → lights out by 7:45pm |

### Goal

Achieve **"constant presence"** in Lily's bedtime routine despite physical absence (Yarosh & Abowd, 2011). Not occasional check-ins — embedded, ritual participation. Target: story time on 5+ of 7 nights during separation.

### Core Motivation

Wants to alleviate guilt and maintain the bedtime bond, but current tools make her feel like *"a talking head"* (P1). Video calls feel empty because there is nothing to do together — *"the book gives him something to focus on. That's what's missing from a video call — there's no shared object between us"* (P2). She has independently invented a low-fidelity async workaround (voice notes), proving the demand is real, not hypothetical.

### Trigger

Often in a non-ideal time zone: *"Her bedtime was eleven in the morning for me and I was literally in a workshop"* (P1). Hotel WiFi is unreliable. Alex is exhausted by 7:30pm after solo parenting since school pickup. When Alex's mother Jan steps in as caregiver, connectivity drops to near-zero — Jan cannot operate video calls despite months of training.

### Goals (Mapped to Solution Tree Strategies)

1. **Read a bedtime story every night she is away** — even if she cannot be live, her voice should be in Lily's bedtime. Async if not sync. *"He doesn't care that it's not live. He just wants to hear my voice doing the thing"* (P2). **Maps to Strategy B2** (Asynchronous Fallback Mode).

2. **Feel present, not performative** — wants to see Lily's reaction, not record into a void. *"I'd feel a bit performative? Sitting in a hotel room recording myself reading a bedtime story feels oddly exposed"* (P5). The recording experience must feel like reading TO the child, not performing INTO a camera. **Maps to Strategy B2** (recording-environment design).

3. **Zero-friction handoff** — Alex (or Jan, or any caregiver) must be able to start the session with a single tap on a notification at bedtime. No account setup, no navigation, no troubleshooting. *"If it's not open-tap-play she won't use it"* (P4). *"One button. That's it"* (P3). **Maps to Strategy B5** (Minimise Setup Complexity) + **Strategy C3** (Reduce Facilitation Burden).

### Frustrations (Mapped to Problem Tree Root Causes)

| Frustration | Problem Tree Node(s) | Evidence |
| :--- | :--- | :--- |
| Lily engages for 2 minutes on video calls then wanders off — there is nothing for her to do on screen | **A1** (conversational skills) + **B1** (no shared object) | P1: *"She'll engage for maybe two minutes and then she's off"*; P2: child disengages in 5 seconds |
| Holding a phone and a book simultaneously is impossible; the duplicate-book workaround failed because page sync broke | **B3** (no sync mechanism) + **C3** (facilitation burden) | P1: *"It's a three-handed job and he only has two"*; P1: *"the book is at home"* |
| When the connection freezes or she has to hang up abruptly, the emotional fallout is worse than not calling at all | **B2** (real-time dependency) + **C4** (asymmetric motivation) | P3: *"It's worse than not calling"*; P4: child screamed for 20 minutes after abrupt hangup; P4: family rule — *"Don't call unless you can finish"* |
| Alex's patience for tech setup at bedtime is ~2 minutes; Jan cannot operate the app at all | **C3** (facilitation burden) | P1: *"I'm not going to faff about with an app when she's already in meltdown mode"*; P2: *"Getting her to set up a video call is a non-starter"*; P3: *"One button"* |
| Timezone offset makes live bedtime impossible on international trips; 3 consecutive missed bedtimes trigger behavioural regression in Lily | **C2** (timezone) + **C1** (recurring separation) + **C5** (bedtime is high-stakes) | P1: *"Her bedtime was eleven in the morning for me"*; P5: 3 missed bedtimes = most pronounced behavioural changes (Mindell dose-dependent) |
| WhatsApp voice notes feel one-directional and inadequate — her voice goes out but nothing comes back | **B5** (no sync + async combination) | P1: *"Mummy's phone talks but it doesn't listen"* |
| Recording alone in a hotel room feels self-conscious and transactional, not intimate | **B5** (no purpose-built recording tool) | P5: *"feels oddly exposed"*; P5: *"A WhatsApp video is a workaround. A purpose-built tool signals that this matters"* |

### A Day in Sarah's Life (Scenario)

**Monday, 7:15 PM GMT — Hotel room in Frankfurt.** Sarah has just finished a client workshop. Lily's bedtime is 7:30. The timezone is fine tonight (1 hour ahead), but the hotel WiFi dropped twice during the workshop. Sarah opens Kindred. She pre-recorded The Gruffalo on Sunday, so even if the live connection fails, Lily will hear her voice tonight. She tries to join live — the connection holds. She reads aloud while Lily taps the character prompts on her iPad at home. Alex tapped the notification 15 seconds ago and is now brushing his teeth.

**Thursday, 11:30 AM PST — Conference centre in San Francisco.** Lily's bedtime was 90 minutes ago. Sarah already recorded Owl Babies and Room on the Broom before the trip. Lily listened to Owl Babies tonight — Sarah gets a notification with a photo of Lily holding up her completion sticker. The "dose" tracker shows 4 consecutive nights. The routine survived.

---

## Persona B: Max, 4 — The Child

> [!NOTE]
> This is a **Proxy Persona**. Since children are not directly interviewed in this study, Max's goals and frustrations are synthesised from **Literature Review** (Hiniker et al., 2015; Raffle et al., 2010; Yarosh & Abowd, 2011) and **Parental Reports** of child behaviour across all 5 interviews. Child behaviours are reported verbatim from parent descriptions; developmental capabilities are grounded in empirical findings.

### Profile

| Field | Detail |
| :--- | :--- |
| **Name** | Max |
| **Age** | 4 (represents the core preschooler target; developmental composite from ages 3–7) |
| **Lives with** | At-home caregiver during parent's absence |
| **Favourite books** | We're Going on a Bear Hunt (P2 — *"every single night without fail"*), Owl Babies (P4 — *"almost always picks Owl Babies. Every time"*), The Gruffalo (P1 and P5 as a comfort/regression title) |
| **Developmental composite** | P1 (age 4) — attention span; P2 (age 3) — async preference, repetition; P3 (age 5) — comfort-seeking repetition; P4 (age 5) — multi-child dynamics; P5 (age 7) — age-boundary agency |

### Goal

**Sustained engagement through play, not conversation** (Raffle et al., 2010). Max wants to do something, not talk about something. The distinction is structural: *"even when co-located adults interact with young children they do not have a conversation, but rather they play together"* (Raffle et al., 2010).

### Core Motivation

Wants to play, not talk. Conversation is boring; activity is fun. Does not care whether the parent is live or recorded — wants to hear the familiar voice doing the familiar thing. *"He doesn't care that it's not live. He just wants to hear my voice doing the thing"* (P2). The parent's presence is carried by voice + shared activity, not by the live video feed itself.

### Developmental Stage (Hiniker et al., 2015 / Raffle et al., 2010)

* **Cannot read text.** Needs audio prompts with character demonstration. Text-based prompts (used in 19% of children's apps per Hiniker et al.) are completely ineffective for pre-literates. Character demonstrations (used in only 3% of apps) are the most effective non-adult prompt type.

* **Cannot hold a sustained conversation.** Needs concrete, closed-ended questions — *"What colour is the bear?"* not *"How was your day?"* PEER/CROWD dialogic reading prompts provide the structure: Completion and Wh-questions for initial readings; Recall and Distancing for repeated readings. Emotion-focused prompts (*"How do you think the owl feels?"*) generate the strongest engagement (Raffle et al., 2010).

* **Short attention span on unstructured calls; stronger engagement with shared activity.** Engages for ~2 minutes on standard video calls (P1) or ~5 seconds (P2, age 3). In contrast, the literature suggests that shared reading activity can sustain interaction far longer than plain video chat. The bottleneck is the absence of structure, not the absence of motivation.

* **High repetition tolerance.** Actively prefers the same story repeated. P2: child picks Bear Hunt every night. P3: child watches the same recording for 2 weeks. P4: child always picks Owl Babies. Repetition is a feature — it provides predictability and comfort that is especially important during the disruption of parental absence. The PEER/CROWD framework leverages repetition: prompts progress in difficulty across re-readings of the same book.

* **Age-dependent agency.** The child's capacity to self-direct changes dramatically across the 3–7 range:
    * **Ages 3–4:** Selects from a curated set of 2–3 story options presented with cover images and audio labels. Cannot navigate a library or initiate a session without caregiver.
    * **Ages 5–6:** Navigates the story library independently. Can select books, replay favourites, and respond to all prompt types without adult help. Still needs caregiver to initiate the session.
    * **Age 7+:** Sets up and initiates the session without caregiver involvement. P5: *"At what point does the child set it up themselves?"* — a 7-year-old self-initiating fundamentally changes the caregiver burden dynamic (addresses Problem Tree C3).

### Goals (Mapped to Solution Tree Strategies)

1. **Turn the page** — wants physical agency and control over the story pace. Tap to advance the page; touch elements on the page to hear audio labels; feel like an active participant, not a passive viewer. The digital storybook gives Max the same control he has with a physical book in his lap. **Maps to Strategy A1** (shared activity) + **Strategy B4** (shared digital artefact).

2. **See the character, hear the question** — responds to animated character prompts (the in-app guide, modelled on Raffle et al.'s "Elmo" mechanism) far more reliably than to a parent's disembodied voice asking questions from a video feed. The character is the engagement anchor — it delivers the PEER/CROWD prompts in a format Max can understand: audio instruction + animated hand demonstration. **Maps to Strategy A2** (character-guided dialogic reading) + **Strategy A3** (multimodal prompts).

3. **Predictability and ritual** — wants the same story, the same voice, the same sequence. The comfort of repetition. When the routine breaks — when the story doesn't happen, when a different voice reads it, when the screen freezes mid-page — Max exhibits regression: stalling bedtime, requesting the nightlight, reverting to outgrown comfort books. *"He asks for extra stories. He wants to sleep with the light on which he hasn't needed for over a year"* (P5). **Maps to Strategy C5** (calm, low-stimulation design) + **Strategy C1** (scheduled recurring sessions).

### Frustrations (Mapped to Problem Tree Root Causes)

| Frustration | Problem Tree Node(s) | Evidence |
| :--- | :--- | :--- |
| The screen froze — Mummy appeared and then disappeared without explanation. Max cannot cognitively separate "the call dropped" from "Mummy left me" | **B2** (real-time dependency) + **C4** (asymmetric motivation) | P3: frozen screen; P4: child screamed for 20 minutes after abrupt hangup; P4: *"She's five and she's already learned not to expect me"* |
| Visual-only UI cues (glowing buttons, pulsing elements) draw attention but don't communicate what gesture to perform — Max knows where to look but not what to do | **A2** (comprehension barrier) + **A3** (visual-only prompts ineffective) | Hiniker et al.: 41% of children's apps use visual-only prompts — the least effective type. When children understood the gesture, they succeeded 87% of the time |
| Nothing to do together — the video call is just a talking head. Boredom within 2 minutes, then Max wanders off | **B1** (no shared object) + **A5** (need shared activity) + **B4** (designed for adult conversation) | P1: 2-minute ceiling; P2: 5-second ceiling for a younger child; P5: *"It's the shared activity that holds his attention"*; P5: *"I'm essentially asking a seven-year-old to generate content for a video call which isn't fair"* |
| Screen competition with sibling — one child dominates the device, the other is overlooked and disengages | **B3** (one-parent-one-child-one-screen assumption) | P4: *"The technology assumes one parent one child one screen. That's not our reality"*; one twin dominates, the other is consistently overlooked |
| Routine breaks when parent is absent — regression to comfort-seeking behaviours (outgrown books, nightlight, bedtime stalling) | **C5** (bedtime is high-stakes) + **C1** (recurring separation) | P5: child asks for outgrown comfort books; P4: caregiver reports *"they stall more — more trips to the toilet, more requests for water"*; Mindell: dose-dependent disruption |
| Cannot respond to in-app prompts without adult help at youngest ages (under 3.5) | **A4** (adult co-user required) + **A5** (age-threshold for independent interaction) | Hiniker et al.: sharp performance gains between ages 3 and 3.5 for audio and hand prompts. Under 3, adult modelling is the only effective method |

### Max's Bedtime (Scenario)

**Tuesday, 7:25 PM — Home.** Mummy is in San Francisco. The iPad pings: *"Mummy sent a story!"* Grandma taps the notification. Max sees The Gruffalo on screen — his favourite — with Mummy's face in the corner, already reading. He taps the page to turn it. The owl character asks *"What colour is the mouse?"* Max taps the brown mouse. *"That's right!"* He has heard this story 14 times. He does not care. He hears Mummy's voice saying *"Goodnight, Max"* as the screen dims. He is asleep by 7:50.

---

## Problem Tree Coverage Check

Every root cause node from the Problem Tree is addressed by at least one persona frustration:

| Node | Category | Addressed by |
| :--- | :--- | :--- |
| A1 | Conversational skills | Persona A: Lily disengages in 2 min (no shared activity) |
| A2 | Comprehension barrier | Persona B: Visual-only cues don't communicate gesture |
| A3 | Visual-only prompts ineffective | Persona B: Visual-only cues don't communicate gesture |
| A4 | Under-3 needs adult co-user | Persona B: Cannot respond to prompts without adult help |
| A5 | Need shared activity | Persona B: Nothing to do together = boredom |
| B1 | No shared object of attention | Persona A: Lily disengages; Persona B: Nothing to do together |
| B2 | Real-time dependency | Persona A: Failed connection worse than none; Persona B: Screen froze |
| B3 | No sync mechanism / multi-child | Persona A: Three-handed problem; Persona B: Screen competition |
| B4 | Designed for adult conversation | Persona B: Nothing to do together |
| B5 | No sync + async combination | Persona A: Voice notes feel one-directional; recording feels performative |
| C1 | Recurring separation | Persona A: Timezone + missed bedtimes; Persona B: Routine breaks |
| C2 | Timezone differences | Persona A: Live bedtime impossible on international trips |
| C3 | Facilitation burden | Persona A: Caregiver patience ceiling |
| C4 | Asymmetric motivation | Persona A: Failed connection worse than none; Persona B: Screen froze |
| C5 | Bedtime is high-stakes | Persona A: 3 missed bedtimes = regression; Persona B: Routine breaks |
