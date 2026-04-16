# Competitive Benchmarking Report (HEART Framework)

**Project:** Kindred
**Author:** Sanay Sheetal Shah
**Date:** February 2026
**Focus:** Evaluating FaceTime and Caribu against preschooler-specific design requirements derived from Hiniker et al. (2015) and Raffle et al. (2010), and identifying the gaps that constitute Kindred's Unique Value Proposition.

---

## 1. Feature Comparison Matrix

| Feature / Requirement | FaceTime / WhatsApp | Caribu | StoryVisit (Research Prototype) | Kindred (Proposed) |
| :--- | :---: | :---: | :---: | :---: |
| **Shared Object of Attention** | No | Yes (Books, Games) | Yes (Sensor-enhanced Book) | Yes (Interactive Digital Books) |
| **Real-time Page Sync** | No | Yes (Software) | Yes (Hardware Sensor Frame) | Yes (Planned WebSocket sync) |
| **Async Fallback Mode** | No (Live video only) | Limited (No routine-embedded fallback) | No | Yes (Recorded story sessions) |
| **Preschooler-Appropriate Prompts** | None | Visual-only UI elements | Character-delivered (Elmo) | Character-delivered (PEER/CROWD) |
| **Calm / Low-Stimulation Bedtime UI** | No (Standard video UI) | No clear bedtime-specific calm design | Neutral | Yes (Core design principle) |
| **Escalating Scaffolding (Model Demo)** | No | No structured mechanism identified | No | Yes (Planned: Visual → Audio → Character → Parent Model) |
| **Dialogic Reading Integration** | No | No | Yes (Elmo thought-bubble prompts) | Yes (Automated PEER/CROWD prompts) |
| **Collocated Adult Support** | None | None | Grandparent training video (Maria) | Setup facilitation + parent guidance tips |

---

## 2. HEART Framework Analysis

The HEART framework (Happiness, Engagement, Adoption, Retention, Task Success) was developed by Google's research team to measure user experience at scale. Below, each dimension is evaluated for FaceTime and Caribu against two empirical benchmarks: Hiniker et al.'s (2015) findings on visual-only prompt failures and Raffle et al.'s (2010) findings on shared-activity-driven engagement. These evaluations are then used to surface Kindred's design opportunities.

### 2.1 Happiness (User Satisfaction and Perceived Value)

**FaceTime / WhatsApp:**
Yarosh and Abowd (2011) found that children were "reluctant to engage in virtual contact with family members, finding it boring or they would rather be doing something else." For preschoolers specifically, the absence of a shared activity means sessions devolve into the parent attempting conversation with a child who lacks the developmental capacity for sustained verbal exchange (Raffle et al., 2010). The remote parent experiences guilt; the at-home caregiver experiences facilitation stress. Satisfaction is low for all three parties.

**Caribu:**
Caribu improves satisfaction by providing a shared book as a joint focus, which directly addresses Raffle et al.'s core insight that "even when co-located adults interact with young children they do not have a conversation, but rather they play together." However, Caribu's brighter, more playful visual style appears less aligned with a low-stimulation bedtime context than a purpose-built bedtime interface would be. Mindell et al. (2015) established a dose-dependent association between consistent bedtime routines and sleep outcomes, so interface tone matters in this context. Parental satisfaction is further limited by the absence of an asynchronous mode for nights when time zones prevent live sessions, meaning the routine simply breaks.

**Gap for Kindred:**
A low-stimulation, bedtime-specific aesthetic paired with routine continuity (via async fallback) would address the satisfaction failures of both competitors. The parent's sense of "constant presence" (Yarosh and Abowd, 2011) depends on the routine persisting even when synchronous contact is impossible.

### 2.2 Engagement (Depth and Duration of Interaction)

**FaceTime / WhatsApp:**
Raffle et al.'s work, alongside later StoryVisit reporting, suggests that shared reading can sustain interaction for materially longer than standard video calls with very young children. FaceTime offers no shared object of attention, no joint activity, and no scaffolding. Engagement often collapses because there is nothing for the child to do.

**Caribu:**
Caribu introduces shared books and games, which provides the joint attention that FaceTime lacks. This is a meaningful improvement. However, Caribu appears to rely primarily on visual UI elements (buttons, highlights, touch affordances), whereas Hiniker et al. (2015) found visual-only prompting to be the least effective prompt type for preschoolers. Visual state changes draw attention but cannot clearly communicate what gesture to perform. Without audio or character-demonstration prompts, younger preschoolers may struggle to interact independently, limiting depth of engagement. Furthermore, Caribu does not appear to implement dialogic reading prompts (PEER/CROWD), so reading sessions lack the structured questioning that Raffle et al. associated with richer shared storytelling.

**Gap for Kindred:**
Two engagement gaps are exploitable. First, replacing visual-only prompts with multimodal prompts (audio instruction paired with character demonstration) would align with Hiniker et al.'s hierarchy: Model (adult demo) > Audio ≈ Hand (character demo) >> Visual. Second, embedding dialogic reading prompts (character-delivered PEER/CROWD sequences) would replicate the engagement uplift observed in Raffle et al.'s study, where children showed sustained, rich interaction far beyond what bare UI prompts achieve.

### 2.3 Adoption (Willingness to Start Using the Tool)

**FaceTime / WhatsApp:**
Adoption friction is extremely low. These tools are pre-installed or widely installed, require no additional accounts for the family's core use case, and benefit from high familiarity. This is their primary competitive advantage, and it is significant. However, easy adoption does not translate to sustained use for the preschooler bedtime context because the experience itself fails (as documented above).

**Caribu:**
Adoption requires downloading a dedicated app, creating accounts, and navigating a content library — higher friction than FaceTime. For families already struggling with the facilitation burden described by Yarosh and Abowd (2011), where the collocated adult must "set up technology, coax the child into participating, and manage the interaction," any additional setup complexity is a barrier. Caribu's value proposition (shared reading) is clear, but the onboarding assumes a technically confident at-home caregiver.

**Gap for Kindred:**
Kindred must minimise onboarding friction for the collocated adult, who is the critical adoption gatekeeper. Features that support this include streamlined session launch (one-tap to resume a story), clear guidance for the at-home caregiver, and a frictionless first-use experience. The async mode also lowers the adoption threshold: a traveling parent can record a story segment before the child even uses the app, giving the at-home caregiver a ready-made session to play rather than coordinating schedules for a first live call.

### 2.4 Retention (Continued Use Over Time)

**FaceTime / WhatsApp:**
Retention for the preschooler bedtime use case is poor. Yarosh and Abowd (2011) documented a pattern where parents "initiate contact more often than their children" and children perceive forced calls as intrusive. Without structured activities, each session risks reinforcing the child's negative association with remote contact. Over time, this asymmetry escalates: "If remote interactions are consistently boring or frustrating, children may refuse to participate at all" (Problem Tree analysis, Section 3B). The tool is retained for general family communication but abandoned for the bedtime routine.

**Caribu:**
Caribu's retention is supported by its content library (new books to read), but it lacks two features critical for routine persistence. First, no async fallback means that when schedules misalign, the routine breaks entirely — and Mindell et al. (2015) demonstrated that routine consistency operates on a dose-dependent basis. Each missed night weakens the protective association. Second, the absence of dialogic reading prompts means sessions lack the progressive learning and relational depth that would give families a reason to return beyond novelty. Once the child has seen the available books, engagement plateaus.

**Gap for Kindred:**
Kindred's retention strategy rests on two pillars. The sync-async hybrid ensures the routine never breaks entirely — when live reading is impossible, a pre-recorded session preserves the "dose" (Mindell et al., 2015). Dialogic reading prompts (PEER/CROWD) provide progressive depth: the same book can be re-read with increasingly complex question types (starting with Completion and Wh-questions, progressing to Recall and Distancing), creating a reason to return. Activity logs and shared reading histories reinforce the parent's sense of "constant presence" across separation periods.

### 2.5 Task Success (Ability to Complete Core Interactions)

**FaceTime / WhatsApp:**
The core task — sustaining a shared bedtime reading session — is poorly supported. There is no shared book view, no page synchronisation, and no prompting mechanism. The child's "task" is to sit still and converse, which Raffle et al. (2010) suggests is structurally mismatched with the developmental stage of 2–4-year-olds. Task success for the intended bedtime-reading use case is therefore likely to be very low.

**Caribu:**
Caribu enables the core task of shared reading with page sync. However, task success for preschooler-initiated interactions is compromised by the visual-only prompt problem identified by Hiniker et al. (2015). When a child needs to perform a gesture (tap, swipe, interact with a story element), the app relies on visual cues that cannot communicate the required action. Hiniker et al. found that when children understood a gesture, they executed it successfully 87% of the time — the bottleneck is comprehension, not motor skill. Caribu's visual-only prompts fail at the comprehension stage, meaning preschoolers cannot independently complete interactive tasks without constant adult verbal instruction. For children under 3, Hiniker et al. showed that no in-app prompt works without an adult co-user, but Caribu provides no structured mechanism for the remote parent to model gestures via the video feed.

**Gap for Kindred:**
Kindred's escalating scaffolding system directly addresses this task-success bottleneck. The proposed hierarchy — visual cue → audio instruction → character hand demonstration → remote parent modelling via synchronised video — mirrors Hiniker et al.'s empirical effectiveness ranking. Concrete, imperative audio phrasing ("Tap the star two times") replaces vague visual glows. Character demonstrations show the action being performed. And when the live parent is present in sync mode, their ability to model gestures via the shared interface activates the most effective prompt type (adult modelling), which Hiniker et al. found works even for the youngest participants (age 2).

---

## 3. Benchmarking Against Specific HCI Findings

### 3.1 Hiniker et al. (2015): Visual-Only Prompt Failures

Hiniker et al. tested four prompt types with 34 preschoolers (ages 2–5) and established a clear hierarchy: Model (adult demo) > Audio ≈ Hand (character demo) >> Visual (state change). The following table evaluates each competitor against these findings.

| Hiniker Criterion | FaceTime | Caribu | Kindred (Proposed) |
| :--- | :--- | :--- | :--- |
| **Avoids visual-only prompts** | N/A (no interactive prompts) | No — relies on glowing/pulsing UI buttons | Yes — audio-first with character demo fallback |
| **Uses concrete audio phrasing** | N/A | No — no audio prompting for gestures | Yes — imperative instructions (e.g., "Tap the dog two times") |
| **Provides character demonstration** | N/A | No | Yes — animated character hand demo for gesture modelling |
| **Supports adult modelling** | Possible via live video but unstructured | No structured mechanism | Yes — escalating scaffolding prompts the parent to demonstrate via sync video |
| **Accounts for age 3–3.5 cognitive threshold** | No | No | Yes — prompt complexity scales with child's developmental stage |

### 3.2 Raffle et al. (2010): Shared Activity Metrics

Raffle et al. showed that anchoring remote interaction to a shared reading activity with character-guided prompts transformed passive viewing into collaborative storytelling and supported materially longer engagement than plain video chat.

| Raffle Criterion | FaceTime | Caribu | Kindred (Proposed) |
| :--- | :--- | :--- | :--- |
| **Provides shared object of attention** | No | Yes (shared book view) | Yes (shared interactive book view) |
| **Enables page synchronisation** | No | Yes (software-based) | Yes (WebSocket event-driven) |
| **Delivers dialogic reading prompts (PEER/CROWD)** | No | No | Yes (character-delivered, page-specific) |
| **Uses trusted character as prompt vehicle** | No | No | Yes (animated guide character) |
| **Gives child agency via touch-to-trigger prompts** | No | Limited | Yes (thought-bubble / highlighted element triggers) |
| **Provides adult reader with dialogic guidance** | No | No | Yes (embedded tips for PEER sequence) |
| **Supports progressive question complexity** | No | No | Yes (Completion → Wh-questions → Recall → Distancing) |

---

## 4. Gap Analysis: Kindred's Unique Value Proposition

The benchmarking reveals three structural gaps in the current market that no single existing solution addresses. Together, these gaps constitute Kindred's UVP.

**Gap 1: Sync-Async Routine Continuity.**
Yarosh and Abowd (2011) identified that families naturally combine "scheduled synchronous" and "spontaneous asynchronous" strategies, yet no consumer tool supports both within the same bedtime activity. FaceTime is synchronous-only. Caribu is synchronous-only with limited offline content. When time zones or schedules prevent a live session, the bedtime routine breaks entirely. Mindell et al. (2015) demonstrated this has measurable consequences — fewer consistent routine nights mean worse sleep outcomes. Kindred's async fallback (pre-recorded story sessions with embedded dialogic prompts) ensures the "dose" is preserved even when synchronous reading is impossible.

**Gap 2: Developmentally Appropriate Interaction Scaffolding.**
Hiniker et al. (2015) found that visual-only prompts — the dominant approach in 41% of the children's apps they reviewed — were the least effective prompt type for preschoolers and showed no improvement with age. Caribu appears to rely mainly on visual UI prompting, while FaceTime provides no prompting support at all. Neither tool implements the evidence-based hierarchy (audio + character demonstration + adult modelling) that Hiniker et al. validated. Kindred's escalating scaffolding system is designed as a response to this gap, especially around the 3–3.5-year-old cognitive threshold where audio and hand prompts showed sharp performance gains.

**Gap 3: Dialogic Reading as a Core Interaction Model.**
Raffle et al. (2010) demonstrated that character-guided prompts transformed remote reading from passive page-turning into collaborative storytelling. No major commercial app reviewed here appears to integrate dialogic reading methodology into a remote shared reading experience. Caribu provides books but no structured questioning framework. Kindred embeds page-specific, character-delivered PEER/CROWD prompts that give both the child (via touch-to-trigger thought bubbles) and the parent (via embedded guidance) scaffolding for dialogic reading — the same general approach that Raffle et al. found "encouraged dialogic reading styles even among untrained grandparents."

---

## 5. Summary: Real–Win–Worth Assessment

| Dimension | Assessment | Evidence |
| :--- | :--- | :--- |
| **Is it Real?** (Does the need exist?) | Yes. Yarosh & Abowd cite broader family-separation prevalence figures and show that work-related separation creates distinct communication challenges. Bedtime routine disruption has dose-dependent sleep consequences (Mindell et al., 2015). Existing tools fit preschoolers poorly from a developmental perspective (Raffle et al., 2010; Hiniker et al., 2015). | Three CHI papers + one Sleep journal paper establish the need empirically. |
| **Can we Win?** (Is the solution differentiated?) | Yes. No commercial tool combines sync-async routine continuity, evidence-based preschooler prompting, and dialogic reading integration. | Gap analysis (Section 4) identifies three structural differentiators with no current competitor coverage. |
| **Is it Worth it?** (Is the effort justified?) | Yes. The project integrates real-time synchronisation, HCI-grounded interaction design for a specific developmental stage, and potential generative AI — exceeding standard application complexity. It directly addresses CM3203 requirements for research, design, implementation, and evaluation. | Project plan (Initial Plan, Section 1) establishes academic justification; the HEART analysis confirms each gap maps to a measurable UX dimension. |
