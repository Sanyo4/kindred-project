# Structured literature review: remote storytelling and separated families

Three foundational CHI papers — Raffle et al. (2010) on character-guided remote reading, Yarosh & Abowd (2011) on work-separated family communication, and Hiniker et al. (2015) on touchscreen prompting for preschoolers — provide the empirical backbone for designing an interactive remote bedtime storytelling app. Together, they establish that **shared activity trumps mere conversation** for young children, that synchronous and asynchronous modes must coexist, and that **comprehension, not motor skill, is the primary barrier** to successful interaction. Below are complete structured extractions for all three papers, mapped to your CM3203 project objectives.

---

## Paper 1: Raffle et al. (2010) — "Family story play: Reading with young children (and Elmo) over a distance"

**Venue:** CHI 2010, pp. 1583–1592 | **Authors:** Raffle, Ballagas, Horii, Go, Mori, Kaye, Spasojevic (Nokia Research), Revelle, Reardon (Sesame Workshop), Follmer (MIT Media Lab)

### 1. Motivation

Raffle et al. identified a fundamental mismatch between existing video communication tools and the developmental capabilities of young children. Their core observation: **"Both parties must have sophisticated conversational skills (and young children rarely do)"** — phone and Skype demand sustained conversation, which toddlers cannot provide. While video conferencing engaged children "considerably better than telephone," long-distance family members still reported difficulty connecting meaningfully.

The pivotal insight was that **"even when co-located adults interact with young children they do not have a conversation, but rather they play together."** Standard video chat provides no shared object of attention — no joint activity to anchor the interaction. The paper frames this as a problem of **shared context and joint attention**: without a common focus, remote interactions with 2–4-year-olds collapse within minutes. Their solution pursued a "convergence of communication, education, and entertainment" by using **shared book reading** as scaffolding and a **familiar media character (Elmo)** to guide dialogic interaction.

**Connection to Objective 1:** This paper directly demonstrates that mediated parent-child contact requires activity-based design, not conversation-based design — a foundational design pattern for your app.

### 2. Methods

**Participants:** 8 families with children aged **2–4 years old**. Each family completed reading sessions with a remote adult (typically a grandparent).

**Study design:** Within-subjects, counterbalanced. Each family used both **Family Story Play** and a **Skype baseline** condition. Due to child fatigue during second readings, behavioral analysis was based on **4 families per condition** (first sessions only). Interview data drew from all 8 families. The study was lab-based with simulated distance.

**Books:** Family Story Play used *The Monster at the End of This Book* (Jon Stone); Skype used *Another Monster at the End of This Book*. Both sides had identical **physical paper copies** — this was not a digital book system.

**System architecture — four integrated components:**

- **Physical paper book** in a **sensor-enhanced frame** that detected page turns and identified the current page
- **Real-time video conferencing** between grandparent and child on laptop screens
- **Pre-recorded Sesame Street Muppet Elmo video clips**, displayed alongside the video chat on the child's touchscreen
- A **"remote page icon"** on the grandparent's display showing which page the child was viewing, enabling page synchronization

**Elmo implementation:** Elmo was not a puppet or live character but **pre-produced video content** of the actual Sesame Street Muppet. At specific story points, **"Elmo's thought bubble"** appeared on screen. The child or grandparent could **touch the thought bubble** to trigger Elmo's utterance — a dialogic reading prompt such as *"Woah! Look at how big those letters are! How do you think Grover feels?"* Grandparents had control over when to deploy Elmo, allowing strategic, well-timed interventions.

**Adult training:** A **"Maria Video"** (featuring the Sesame Street educator character) taught grandparents **dialogic reading principles** — how to ask open-ended questions, encourage responses, and expand on children's answers. This maps directly to the PEER/CROWD framework.

**Analysis:** Video-coded behavioral sessions across all book pages. Categories included interaction with Elmo (touches, verbal responses, nonverbal responses), plus engagement behaviors coded across both conditions. **Inter-rater reliability: 91%.**

### 3. Results

**Engagement:** Family Story Play **improved child engagement** in long-distance communication compared to Skype and **increased interaction quality** between young children and distant grandparents. Children showed more engagement with Story Play than when reading over plain Skype. The system successfully **encouraged dialogic reading styles** linked with literacy development.

Note: Specific effect sizes and statistical tests are limited by the small behavioral sample (n = 4 per condition). The paper reports comparative observations rather than formal inferential statistics.

**Qualitative findings (all 8 families):** Elmo became **"the center of the show"** — children were highly engaged by his presence. Grandparents wanted even more control over Elmo's behavior to strategically manage the child's attention. Reading sessions evolved beyond simple book reading into **"a creative shared activity that suggests a new kind of collaborative story telling"** — children and adults improvised, mimicked characters, and generated playful exchanges. Transcript excerpts show rich back-and-forth exchanges impossible in standard video calls.

**Later StoryVisit reporting:** Follow-up reporting on the broader StoryVisit programme is often cited as showing substantially longer interactions for young children than standard video calls, with shared activity acting as the key mechanism. Because those figures are not established in the core CHI 2010 paper summarised here, they should be treated as a directional design benchmark rather than a precise primary-source statistic.

**Connection to Objective 3:** The Elmo prompt mechanism directly validates designing audio/visual prompts for preschoolers — character-delivered PEER/CROWD prompts drive engagement far beyond what bare UI prompts achieve.

### 4. Strengths and adoptable features

The design decisions most transferable to your app are:

- **Page-turn detection and synchronization** — the sensor frame automatically detected which page was open and displayed a remote page icon to the grandparent, maintaining shared context. For your app, this maps to **WebSocket-based page sync events**.
- **Character-mediated dialogic prompts** — rather than generic pop-up prompts, questions were delivered by a trusted, familiar character (Elmo), making PEER/CROWD interactions feel like play rather than instruction. Prompt example: *"How do you think Grover feels?"* (open-ended/wh-question CROWD type).
- **Touch-to-trigger interaction** — "thought bubble" touch targets gave children **agency** over when prompts appeared, appropriate for the motor skills of 2–4-year-olds. This is directly implementable as tap interactions on a tablet.
- **Adult scaffolding through the Maria Video** — training the remote adult in dialogic reading improved interaction quality. Your app could embed brief guidance tips for the reading adult.
- **Grandparent control over character behavior** — adults could strategically deploy prompts, maintaining responsive timing rather than fixed automation.
- **Hybrid physical-digital design** — the combination of a real book with digital overlays preserved the tactile reading experience.

### 5. Limitations

**Small sample size** is the most significant limitation — **8 families total, behavioral data from only 4 per condition** due to fatigue-related data loss. This severely limits statistical generalizability.

**Content scalability** was constrained: Elmo's video clips were **specifically produced for a single book title** (*The Monster at the End of This Book*) in collaboration with Sesame Workshop. Scaling this to a library of books would require prohibitive production costs — or, as your app could implement, **algorithmically generated prompts** (e.g., AI/LLM-based PEER/CROWD generation).

**Hardware complexity** required a sensor-enhanced frame, touchscreen displays, and video conferencing equipment — not deployable in typical homes. Your tablet-native design eliminates this barrier entirely.

**Lab-based conditions** did not capture real-world variables: network latency, home distractions, varying lighting, different devices. **No longitudinal component** — each family completed single sessions, leaving open whether engagement sustains over weeks.

**Different books across conditions** (though both by the same author with similar structure) introduces a potential confound. Licensed Sesame Street content creates replication barriers.

### 6. Main takeaways and design implications

**Dialogic reading support:** The paper **explicitly frames** its design around dialogic reading research, citing Zevenbergen & Whitehurst (2003) and the Mol et al. (2008) meta-analysis. Elmo's prompts directly implement CROWD-type questions (open-ended, wh-questions, completion), and the Maria Video teaches PEER sequence techniques to adults. The key finding: **the system encouraged dialogic reading styles even among untrained grandparents**, because the character modeled the behavior. A supplementary study by Revelle et al. (2022) with 73 children (ages 3–4) confirmed that **digital modeling of dialogic questioning through an e-book character significantly increased mutuality, on-task behaviors, and positivity** — validating this approach.

**Design decisions for your app's prompts:**
- Deliver prompts through an **animated character** rather than plain UI elements
- Make prompts **page-specific** and tied to story content
- Use **touchable trigger points** (thought bubbles, highlighted elements) giving children control
- Give the **adult reader control** over prompt timing
- Start with simpler CROWD types (completion, wh-questions) and progress to harder types (recall, distancing) across repeated readings
- Front-load **emotion-focused and observation prompts** (e.g., "How does the character feel?" "Look at how big those letters are!") as these generated the strongest engagement

**Connection to Objective 4:** The page-sync mechanism (sensor-detected page turns + remote page icon) provides the conceptual model for your WebSocket real-time sync — emit page-turn events, display synchronized state, and maintain a shared reading position across devices.

---

## Paper 2: Yarosh & Abowd (2011) — "Mediated parent-child contact in work-separated families"

**Venue:** CHI 2011, pp. 1185–1194 | **Authors:** Svetlana Yarosh, Gregory D. Abowd (Georgia Institute of Technology)

### 1. Motivation

Yarosh and Abowd addressed a gap in the literature: while divorced families and military deployment had received research attention, **regular work-related separation** — business travel, long commutes, rotational work — remained understudied despite being the most common form of parent-child separation. In the United States, **32% of children live apart from one of their parents**, and approximately **25% of those live in a different city from their non-residential parent** (Yarosh et al., 2009).

Work separation differs structurally from other types: it is **recurring rather than permanent** (unlike divorce), **predictable and shorter in duration** (unlike military deployment), and involves **no inter-household conflict** (unlike custody situations). These differences create distinct design opportunities — families know when separation will begin and end, both parents cooperate, and the at-home environment remains stable.

The authors' earlier work on divorced families (Yarosh, Chew & Abowd, 2009) found that **"both parents and children sought ways to maintain contact through shared activities and routines but found little technological support to do so while separated."** The 2011 study extends this investigation to work-separated families, examining the specific strategies families develop and identifying gaps that technology could fill.

**Note on bedtime and ritual context:** While specific quotes about bedtime rituals were not extractable from available sources, Yarosh's broader research program — including the ShareTable system (IDC 2009) and her PhD dissertation at Georgia Tech — extensively addresses the disruption of daily routines including bedtime reading, and positions routine-embedded communication as the primary design target.

**Connection to Objective 1:** This paper provides the empirical grounding for why your app should target routine activities (specifically bedtime storytelling) rather than general-purpose video calls.

### 2. Methods

**Participants:** **14 pairs of parents and children** from work-separated families. Children were **ages 7–13**. Each interview lasted approximately **one hour** and was conducted as a **semi-structured interview**.

**Interview focus areas:** General experiences with separation; means used to manage contact during separation; how technology was used to stay in touch; experiences with the two most common communication technologies they used.

**Analysis:** Consistent with Yarosh's methodological approach across her Georgia Tech research (supervised by Abowd), the analysis likely employed qualitative coding methods (thematic analysis or grounded theory), though the specific method could not be confirmed from available sources.

**Important note for your project:** The participant age range (7–13) is **older than your target population (3–7)**. This is a significant gap — the findings about children's communication preferences (e.g., preference for text-based async communication) apply primarily to school-age children and may not transfer directly to preschoolers. However, the findings about **parent strategies, the collocated adult role, and the sync/async framework** are age-independent and directly applicable.

### 3. Results: synchronous vs. asynchronous strategies

The paper's central contribution is a **dual-perspective model** of how parents and children experience and manage work separation differently.

**Parent strategies — "constant presence" through scheduled synchronous + spontaneous asynchronous communication:**
Parents focused on maintaining **"a constant presence in the life of the child"** by combining two communication modes. **Scheduled synchronous communication** (e.g., planned video calls at fixed times — often aligned with routines like bedtime) provided regular touchpoints. **Spontaneous asynchronous communication** (e.g., text messages, leaving voice messages, sending photos when convenient) filled the gaps between scheduled calls, creating a persistent sense of involvement even when real-time contact was impossible.

**Child strategies — fundamentally different from parents:**
Children focused on **three coping mechanisms**: (1) drawing on **other sources of support** (friends, the at-home parent, extended family), (2) staying engaged with **other activities** (school, hobbies, play), and (3) looking forward to **the eventual reunion**. This reveals a critical **asymmetry**: parents want constant contact, but children want to live their lives and reconnect when the parent returns. Technology that forces engagement risks being perceived as intrusive.

**The collocated adult as critical mediator:**
Both the remote parent and the child **"rely heavily on a collocated adult to maintain awareness and contact."** The at-home parent/caregiver functions as a communication facilitator — setting up calls, providing the traveling parent with updates about the child's day, and helping the child engage. For younger children especially, **"who do not have the language or technical skills to send emails or text-based messages, [they] need others to facilitate such communication."**

**Challenges with synchronous communication:**
Children could be **"reluctant to engage in virtual contact with family members, finding it boring or they would rather be doing something else."** Parents tended to **"initiate contact more often than their children"**, which children could find **intrusive**, particularly if they were busy. This parent-child asymmetry is a key design challenge.

**Asynchronous communication findings:**
**"Asynchronous text-based communication rather than video or audio calls is especially favoured by young people,"** but this **"lacks the ability for emotional expressiveness and is less suitable for younger children"** who may not have their own device or literacy skills. The paper identifies three design opportunities for work-separated families emerging from the interviews (the specific details of all three were not fully extractable, but the framework clearly centers on supporting multimodal, mixed-synchrony communication).

**On the term "Asynchronous Fallback":** The paper uses **"spontaneous asynchronous"** rather than the exact phrase "asynchronous fallback." However, the concept is functionally identical — when scheduled synchronous communication is impossible (due to time zones, schedules, or child's unwillingness), asynchronous methods serve as the fallback mechanism for maintaining presence.

**Connection to Objective 2:** This paper provides the primary theoretical framework for mapping async vs. sync strategies. The "scheduled synchronous + spontaneous asynchronous" model directly supports your app's architecture of real-time WebSocket sync as the primary mode with async fallback (recorded stories, messages) when synchronous reading isn't possible.

### 4. Strengths and design-relevant strategies

**"Constant presence" as the design goal:** Rather than optimizing for call duration or frequency, the paper redefines success as **constant presence** — the feeling that the remote parent remains a continuous part of the child's life. This aligns with Licoppe's (2004) concept of "connected presence," where mediated communication creates a seamless web between co-present and remote interaction. For your app, this means the goal is not just the reading session itself but the surrounding ecosystem — notifications, saved stories, reminders that create a persistent sense of connection.

**Natural parent strategies reported across Yarosh's research program** include: video tours of where the parent is traveling, playing games together over video, **reading bedtime stories**, homework help, watching dinner or bath time, co-viewing TV shows, and "virtual accompaniment" during daily activities. The ShareTable system (Yarosh et al., 2013, CSCW) — deployed with 2 divorced families over 4 weeks — found families used the technology for **(a) creating playful context** (drawing, show-and-tell, tic-tac-toe), **(b) providing instrumental care** (homework help, co-parenting coordination), and **(c) sharing moments and affection** through "metaphorical touch."

**Connection to Objective 3:** The finding that children find plain video calls boring directly supports embedding structured activities (dialogic reading prompts, character interactions, interactive story elements) into the reading experience to sustain attention.

### 5. Limitations

**Device context (2011 technology):** The study was conducted when **Skype on laptops** was the dominant video communication tool. The iPad had launched only in 2010 and FaceTime was brand new. The shift to **tablets and smartphones** as primary family communication devices fundamentally changes the interaction paradigm — touchscreens enable child-initiated interaction, portability allows bedtime use in bed, and always-on connectivity supports spontaneous async contact. The paper's findings about communication patterns remain valid, but the specific technological constraints (laptop setup time, fixed locations, limited mobility) are largely resolved by modern tablets.

**Age range (7–13) excludes preschoolers:** This is the most significant limitation for your project. Children aged 7–13 can text, navigate devices independently, and articulate preferences. **Children aged 3–7 cannot** — they depend entirely on the collocated adult for technology setup and may need character-guided interactions rather than text-based async communication. The paper's framework must be adapted: for preschoolers, async fallback should be **audio/visual** (recorded stories, voice messages, video clips) rather than text-based.

**Sample demographics:** 14 families from likely a single geographic area (Atlanta, GA) limits demographic diversity. Focus on business-travel separation may not generalize to other work patterns (FIFO mining, seasonal labor, long-haul trucking).

### 6. Main takeaways and design implications

**Routine over conversation:** The strongest design implication from this paper is that **technology for separated families should embed into existing routines rather than creating standalone communication events.** Bedtime storytelling is an ideal target routine — it occurs daily, has a fixed time, involves a structured activity (reading), and carries strong emotional significance. Your app's positioning as a bedtime storytelling tool rather than a general video chat is directly supported.

**Handling time zones:** The "scheduled synchronous + spontaneous asynchronous" model provides the architecture. When time zones prevent real-time bedtime reading, the traveling parent can **pre-record a story reading** (async mode) that the child plays at their own bedtime, preserving the routine. The at-home parent (collocated adult) facilitates playback. When schedules align, real-time sync mode enables live shared reading.

**Designing for the parent-child asymmetry:** Your app should make engagement **appealing rather than obligatory** for children — through character interactions, interactive prompts, and playful elements — while giving parents the constant-presence feeling through activity logs, completion notifications, and shared reading histories.

**The collocated adult role:** Your app design must account for the at-home caregiver as a **critical facilitator**, especially for children under 7. Features should include: easy session setup for the collocated adult, notifications when the remote parent has recorded a story, and minimal technical barriers to initiating either sync or async reading.

---

## Paper 3: Hiniker et al. (2015) — "Less than Totally Trivial: Investigating Touchscreen Gesture Tuning with Preschoolers"

**Venue:** CHI 2015, pp. 473–482 | **Authors:** Hiniker, Sobel, Hong, Suh, Irish, Kim, Kientz (University of Washington)

### 1. Motivation

Hiniker et al. identified that while 75% of American families with a child under 8 own a touchscreen device, design conventions were built for adults. Their preliminary review of **100 children's apps** revealed a lack of evidence-based prompting: 19% used text (useless for pre-literates), 41% used visual state changes, and only 3% used character demonstrations.

The research gap was specific: most guidelines assume users can decode abstract icons and symbolic representations. The goal was to determine which prompt style — audio, visual, hand demonstration, or adult modeling — is most effective for teaching new gestures to preschoolers aged 2–5, and how this effectiveness changes with developmental age.

### 2. Methods

**Participants:** **34 children** (ages 2–5, mean 3y 7m) from a Seattle preschool. Prior touchscreen experience varied widely but did not predict understanding of any prompt type, suggesting results reflect developmental readiness rather than practice effects.

**Gestures tested:** Four uncommon gestures: **double tap**, **horizontal swipe**, **vertical swipe**, and **shaking the iPad**. These were chosen to be difficult to perform accidentally but easy once understood.

**Prompt conditions (Latin Square within-subjects):**
- **Audio prompt:** Directive, concrete MP3 instructions (e.g., *"Tap the dog two times"*).
- **Hand prompt:** Animated cartoon hand demonstrating the gesture with a contact dot.
- **Model prompt (Baseline):** Physical adult demonstration (researcher hovering above the screen).
- **Visual prompt:** Visual state changes (pulsing, glowing, or animating the target item).

**Analysis:** Video-coded for **(1) understanding** (deliberateness/follow-up questions) and **(2) execution**. Inter-rater reliability was high (**Cohen's κ = .926**).

### 3. Results

**The hierarchy of effectiveness:**
**Model (adult demo) > Audio ≈ Hand (cartoon demo) >> Visual (state change)**

- **Visual prompts failed:** Despite being in 41% of apps, they were the least effective and showed **no improvement with age**. They draw attention but cannot communicate *what* gesture to perform.
- **Motor skill is not the bottleneck:** When children understood the gesture, they executed it successfully **87% of the time**. Comprehension is the primary barrier.
- **Age-dependency:** Audio and hand prompts were strongly age-dependent (success rising sharply between ages 3 and 3.5). Adult modeling was effective even for the youngest participants (age 2).

### 4. Strengths and adoptable design features

- **Focus on cognitive scaffolding:** Since motor execution is high (87%), design effort should be spent on prompt clarity rather than gesture simplification.
- **The "Adult Modeling" gold standard:** Physical demonstration works for all ages. In a remote app, the parent on video can serve as this "model prompt."
- **Cartoon hand/Character demonstration:** Showing the action is moderately effective but requires developmental readiness (dual representation) typically appearing around age 3.5.
- **Concrete audio phrasing:** Using direct, imperative language (*"Tap the dog..."*) rather than invitational language is more effective for preschoolers.

### 5. Limitations

- **Lab-like setting:** Single sessions in a preschool office may differ from naturalistic home use with trial-and-error.
- **First-encounter only:** The study captures immediate understanding, not the learning curve that would occur with repeated use of a storytelling app.
- **Simple gestures:** Results may not generalize to complex interactions like pinch-to-zoom or multi-touch.
- **No multimodal testing:** The study didn't test if combining audio + visual (as recommended by the authors) would be synergistic.

### 6. Main takeaways and design implications

- **Never rely on visual-only prompts:** Always pair visual cues with audio instructions or demonstrations.
- **Design for joint engagement (Under age 3):** No in-app prompt works for children under 3; an adult co-user is mandatory.
- **Implement escalating scaffolding:** Start with visual/audio and escalate to character demonstration or parental coaching.
- **Leverage the remote parent:** The parent's ability to model gestures via video is the app's most powerful instructional tool, bypassing the cognitive limitations of pre-recorded prompts.

---

## Synthesis: how these papers map to your four objectives

### Objective 1 — Literature on mediated contact and remote storytelling design patterns

Raffle et al. establish that **activity-based interaction (shared reading) can sustain engagement far better than plain video chat** for young children. Yarosh & Abowd demonstrate that **routine-embedded communication supports a sense of "constant presence"** more effectively than standalone calls. Hiniker et al. (2015) provide the **interaction design foundations**: they show that **comprehension is the bottleneck**, not motor skill, and that the remote parent's role as an "adult modeler" is the most effective way to teach interaction to preschoolers.

### Objective 2 — Mapping async vs. sync strategies

Yarosh & Abowd provide the theoretical framework: families naturally combine **"scheduled synchronous" (planned bedtime reading sessions)** with **"spontaneous asynchronous" (recorded stories, messages)** communication. Raffle et al. demonstrate the sync interaction model — page synchronization, shared pointing, and simultaneous prompts. Hiniker et al. suggest that for async mode, **multimodal prompts (audio + character demo)** are essential since the child lacks the "model prompt" of the live parent.

### Objective 3 — Audio/visual prompts effective for preschoolers

Raffle et al. provide evidence that **character-delivered dialogic reading prompts** via thought bubbles engage 2–4-year-olds. Hiniker et al. (2015) provide the **"golden rules" for these prompts**: never rely on visual-only cues, use concrete audio phrasing, and expect sharp performance gains between ages 3 and 3.5. Together, they support a design where an animated character delivers PEER/CROWD prompts, supported by a visual attention-grabber and a concrete audio instruction.

### Objective 4 — Real-time sync with async fallback

Raffle et al.'s page-sync mechanism provides the conceptual model for WebSocket event architecture. Hiniker et al. reinforce the importance of this sync: because **adult modeling is the most effective prompt type**, the parent's ability to live-demonstrate a gesture via a synchronized interface is critical for the youngest users. For async fallback, the traveling parent's recording must be paired with high-quality character demonstrations to compensate for the absence of live modeling.

### Key data points summary

| Metric | Raffle et al. (2010) | Yarosh & Abowd (2011) | Hiniker et al. (2015) |
|---|---|---|---|
| **Participants** | 8 families (behavioral: 4 per cond.) | 14 parent-child pairs | 34 children |
| **Child ages** | 2–4 years | 7–13 years | 2–5 years |
| **Method** | Within-subjects lab study + interviews | Semi-structured interviews | Within-subjects experiment |
| **Core finding** | Character-guided shared reading sustains engagement better than plain video chat | Scheduled sync + spontaneous async for "constant presence" | Comprehension, not motor skill, is the primary barrier |
| **Interaction insight** | Dialogic prompts via familiar character + page sync | Collocated adult as critical facilitator | Model (Adult) > Audio ≈ Hand >> Visual |
| **Key stat** | Later StoryVisit reporting suggests materially longer interactions than plain video chat | Children find video calls boring/intrusive | 87% execution success when gesture is understood |
| **Design Rule** | Use joint activity to anchor interaction | Embed in routines (like bedtime) | Never rely on visual-only prompts |

Both papers converge on the same fundamental principle: **for young children, technology must transform remote communication from a conversation into a shared experience** — structured, activity-based, routine-embedded, and scaffolded by familiar elements that make the interaction feel like play rather than a phone call.
