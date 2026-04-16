# User Evaluation Task Script

**Project:** Kindred
**Participants:** 5 parents (P6-P10) — parents of children aged 3-5 with experience of work-separated bedtimes
**Duration:** ~30 minutes per participant
**Method:** Task-based walkthrough with think-aloud protocol, followed by SUS questionnaire and Feedback Capture Matrix

---

## Session Structure

| Phase | Duration | Activity |
|-------|----------|----------|
| A | 3 min | Briefing and setup |
| B | 20 min | Task walkthrough (think-aloud) |
| C | 5 min | SUS questionnaire |
| D | 5 min | Feedback Capture Matrix |

---

## Phase A: Briefing (3 minutes)

Read to participant:

> "Thank you for taking part. You'll be testing Kindred — a bedtime storytelling app designed for families where a parent is away from home due to work travel. The app lets a parent read a bedtime story to their child remotely, either live or through a pre-recorded version.
>
> I'd like you to think aloud as you use the app — tell me what you're thinking, what you expect to happen, and anything that confuses or delights you. There are no wrong answers. I'm testing the app, not you.
>
> The session will take about 30 minutes. You can stop at any time."

**Setup:**
- Provide participant with the app URL on a device (phone or tablet)
- Ensure they have a second device available for the child-side view if testing sync mode
- Confirm they are comfortable with think-aloud

---

## Phase B: Task Walkthrough (20 minutes)

### Task 1: Account Setup and Family Pairing (~3 min)

**Instruction:** "Please sign up as a parent and create a new family. Then pair a child device using the family code."

**What to observe:**
- Can they complete magic-link authentication without help?
- Do they understand the family code pairing flow?
- Time to complete pairing

**Supabase data captured:** `families` row created, `child_devices` row created

---

### Task 2: Generate a Bedtime Story (~3 min)

**Instruction:** "Your child's bedtime is coming up and you'd like a new story. Please create a bedtime story for your child."

**What to observe:**
- Do they find the story generation feature?
- Do they understand the AI-generated story concept?
- Reaction to the generated story content and illustrations

**Supabase data captured:** `stories` row created

---

### Task 3: Live Sync Reading Session (~5 min)

**Instruction:** "Imagine you're in a hotel room and your child is at home with a caregiver. Start a live reading session and read the first few pages of the story."

**What to observe:**
- Can they start a sync session?
- Do they notice page-sync between devices? (if two devices available)
- Do they interact with or notice the owl character?
- Do they engage with the dialogic prompts (thought bubbles)?
- Do they notice the progressive dimming?
- Overall pacing and comfort level

**Supabase data captured:** `sessions` row (mode: SYNC), `session_events` (page_turn, owl_state_change, dimming_change, prompt_shown, prompt_response/prompt_timeout, webrtc_connected)

---

### Task 4: Story Banking — Record a Story (~5 min)

**Instruction:** "Now imagine you have some free time before a trip. Please record a story so your child can listen to it while you're away."

**What to observe:**
- Do they find the recording interface?
- Does the recording flow feel like "reading to my child" or "recording into a void"?
- How comfortable are they with the recording process?
- Do they complete the recording or abandon it?

**Supabase data captured:** `story_recordings` row (duration_seconds, page_timeline)

---

### Task 5: Async Playback Session (~4 min)

**Instruction:** "Your child is ready for bed and you're not available tonight. Please start a bedtime session using the recorded story."

**What to observe:**
- Can they (or a caregiver) launch the async session?
- Does the pre-recorded narration feel warm and personal?
- Do they notice the owl character behaviour during async mode?
- Does the progressive dimming and sleeping owl nightlight work as a wind-down?

**Supabase data captured:** `sessions` row (mode: ASYNC), `session_events` (page_turn, owl_state_change, dimming_change)

**Follow-up question:** "If your child heard that recording at bedtime, do you think it would feel like you were reading to them, or more like an audiobook?"

---

## Phase C: SUS Questionnaire (5 minutes)

Hand participant the SUS questionnaire (`4_Deliver/sus_questionnaire.md`).

Say: "Please complete this short questionnaire about your experience. Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)."

---

## Phase D: Feedback Capture Matrix (5 minutes)

Use the Feedback Capture Matrix (`4_Deliver/feedback_matrix_template.md`).

Ask these four questions and record answers in the matrix quadrants:

1. **(+) Likes:** "What did you like most about the experience?"
2. **(-) Criticisms:** "What frustrated you or didn't work well?"
3. **(?) Questions:** "Was there anything you found confusing or unclear?"
4. **(!) Ideas:** "If you could change or add one thing, what would it be?"

**Additional targeted questions** (record key quotes):

5. "If the live connection dropped during a reading, do you think your child would notice the switch to the recording?"
6. "How did the owl character feel — reassuring, confusing, or something else?"
7. "Would you use this app on nights you're away from home? What would stop you?"

---

## Post-Session Checklist

After each participant session, verify:

- [ ] SUS questionnaire completed and scored
- [ ] Feedback Capture Matrix filled in with quotes
- [ ] Supabase session events logged (check the `sessions` and `session_events` tables)
- [ ] Note participant code (P6/P7/P8/P9/P10) and session timestamp for Supabase cross-reference
- [ ] Record any spontaneous observations or notable moments

---

## Supabase Queries for Report Data

After all 5 sessions are complete, run these to extract evaluation metrics:

### Session durations
```sql
SELECT s.id, s.mode, s.started_at, s.ended_at,
  EXTRACT(EPOCH FROM (s.ended_at - s.started_at)) / 60 AS duration_minutes,
  st.title
FROM sessions s
JOIN stories st ON s.story_id = st.id
WHERE s.started_at > '[DATE_OF_FIRST_EVALUATION_SESSION]'
ORDER BY s.started_at;
```

### Prompt engagement rate
```sql
SELECT event_type, COUNT(*) 
FROM session_events 
WHERE session_id IN (
  SELECT id FROM sessions WHERE started_at > '[DATE_OF_FIRST_EVALUATION_SESSION]'
)
AND event_type IN ('prompt_shown', 'prompt_response', 'prompt_timeout')
GROUP BY event_type;
```

### Page completion rates
```sql
SELECT s.id, s.mode, MAX(se.payload->>'pageNumber') AS last_page, st.page_count
FROM sessions s
JOIN session_events se ON se.session_id = s.id
JOIN stories st ON s.story_id = st.id
WHERE se.event_type = 'page_turn'
AND s.started_at > '[DATE_OF_FIRST_EVALUATION_SESSION]'
GROUP BY s.id, s.mode, st.page_count;
```

### Fallback activations
```sql
SELECT se.created_at, se.payload
FROM session_events se
JOIN sessions s ON se.session_id = s.id
WHERE se.event_type = 'fallback_activated'
AND s.started_at > '[DATE_OF_FIRST_EVALUATION_SESSION]';
```

---

## Mapping Results to Report Chapter 6

| Task | Report Section | What to Report |
|------|---------------|----------------|
| Tasks 1-5 | 6.1.1 Participants and Procedure | Session structure, participant demographics |
| SUS scores | 6.1.2 SUS Results | Individual scores, mean, comparison to 68 benchmark |
| Supabase logs | 6.1.3 Behavioural Metrics | Session durations vs Raffle 15-20 min, prompt engagement rates, page completion, fallback triggers |
| Feedback Matrix + quotes | 6.1.4 Qualitative Findings | Thematic grouping, key quotes, likes/criticisms/questions/ideas |
| All data | 6.3 Evaluation Against Design Principles | Map findings to DP1-DP6 |
| All data | 6.4 Evaluation Against Objectives | Map findings to Objectives 1-4 |
| All data | 6.5 Discussion | Compare against Raffle, Mindell, Yarosh, Hiniker |
