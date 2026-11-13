// Grammar Detective: a step-by-step checklist to check any sentence by hand,
// plus worked examples showing the checklist in action.

export interface DetectiveStep {
  n: number;
  title: string;
  ask: string;
  checks: string[];
  redFlags: { wrong: string; right: string }[];
}

export const STEPS: DetectiveStep[] = [
  {
    n: 1, title: "Split into clauses", ask: "How many subject + verb pairs are there?",
    checks: ["Every clause needs a subject and a finite verb.", "Two complete clauses need a conjunction (and, but, because…) or a period — not just a comma.", "A because / when / although clause alone is a fragment."],
    redFlags: [{ wrong: "I was hungry, I ate noodles.", right: "I was hungry, so I ate noodles." }, { wrong: "Is raining.", right: "It is raining." }],
  },
  {
    n: 2, title: "Find the subject", ask: "Who or what does the action? Is it singular or plural?",
    checks: ["I / you / we / they / plural noun / A and B → plural forms.", "he / she / it / singular noun / uncountable / everyone / gerund → singular forms.", "Ignore 'of …' phrases: The bag of apples IS heavy."],
    redFlags: [{ wrong: "The list of chores are long.", right: "The list of chores is long." }],
  },
  {
    n: 3, title: "Find the time", ask: "When does it happen? Are there signal words?",
    checks: ["yesterday / ago / last… → simple past (not present perfect).", "now / at the moment → present continuous.", "every day / usually → simple present.", "since / for + until now → present perfect (continuous).", "tomorrow / next… → future (will / be going to / present continuous for plans).", "by + time → perfect tense."],
    redFlags: [{ wrong: "I have seen him yesterday.", right: "I saw him yesterday." }, { wrong: "I live here since 2020.", right: "I have lived here since 2020." }],
  },
  {
    n: 4, title: "Check the first verb (finite)", ask: "Does the first verb agree with the subject and show the right time?",
    checks: ["Simple present: he/she/it + V-s.", "be: I am · he/she/it is/was · you/we/they are/were.", "have: he/she/it has.", "will / modal: same for all subjects, no -s."],
    redFlags: [{ wrong: "She don't like it.", right: "She doesn't like it." }, { wrong: "They was late.", right: "They were late." }],
  },
  {
    n: 5, title: "Check the verb chain", ask: "Is each verb in the form required by the auxiliary before it?",
    checks: ["do / does / did + V1", "will / can / should + V1", "have / has / had + V3", "be + V-ing (continuous) or be + V3 (passive)", "Only ONE verb carries tense: did + V1, not did + V2."],
    redFlags: [{ wrong: "Did you saw it?", right: "Did you see it?" }, { wrong: "She has went home.", right: "She has gone home." }, { wrong: "I am agree.", right: "I agree." }],
  },
  {
    n: 6, title: "Active or passive?", ask: "Does the subject DO the action or RECEIVE it?",
    checks: ["Receives the action → be + V3 (The car was washed).", "Intransitive verbs (happen, arrive, die, sleep) can't be passive.", "The passive be agrees with the receiver, not the doer."],
    redFlags: [{ wrong: "The window broke by the kids.", right: "The window was broken by the kids." }, { wrong: "The accident was happened.", right: "The accident happened." }],
  },
  {
    n: 7, title: "Check word order", ask: "Statement or question? Is everything in the right slot?",
    checks: ["Statement: S + Aux + V + O + manner + place + time.", "Question: WH + Aux + S + V.", "Embedded question (I know where…): statement order.", "Frequency adverbs: before main verb, after be."],
    redFlags: [{ wrong: "Where you are going?", right: "Where are you going?" }, { wrong: "I go always to the gym.", right: "I always go to the gym." }],
  },
  {
    n: 8, title: "Check the small words", ask: "Articles, prepositions, pronouns, plurals.",
    checks: ["Singular countable noun needs a / an / the / my…", "at / on / in for time and place.", "Subject pronoun vs object pronoun.", "Plural -s after numbers; no -s on adjectives.", "its / it's, their / there / they're, your / you're."],
    redFlags: [{ wrong: "I'm teacher.", right: "I'm a teacher." }, { wrong: "See you in Monday.", right: "See you on Monday." }],
  },
  {
    n: 9, title: "Check consistency (paragraphs)", ask: "Does the tense stay consistent across sentences?",
    checks: ["Stories in the past stay in the past unless there's a reason to shift.", "Background = past continuous; events = past simple; earlier events = past perfect.", "Facts that are still true can stay present."],
    redFlags: [{ wrong: "Yesterday I go to the mall and bought shoes.", right: "Yesterday I went to the mall and bought shoes." }],
  },
];

export interface WorkedExample {
  sentence: string;
  findings: { step: number; note: string; ok: boolean }[];
  corrected: string;
}

export const WORKED: WorkedExample[] = [
  {
    sentence: "Yesterday my mother don't cooked dinner because she have a headache.",
    findings: [
      { step: 2, note: "Subject 'my mother' = she (singular).", ok: true },
      { step: 3, note: "'Yesterday' → simple past.", ok: true },
      { step: 4, note: "'don't' is present and not for she → 'didn't'.", ok: false },
      { step: 5, note: "After did/didn't → V1: 'cook' (not cooked).", ok: false },
      { step: 4, note: "Second clause: 'she have' → past: 'she had'.", ok: false },
    ],
    corrected: "Yesterday my mother didn't cook dinner because she had a headache.",
  },
  {
    sentence: "I am living in this house since 2018 and I am knowing all the neighbors.",
    findings: [
      { step: 3, note: "'since 2018' = from the past until now → present perfect (continuous).", ok: false },
      { step: 5, note: "'know' is stative → no -ing.", ok: false },
    ],
    corrected: "I have lived (I have been living) in this house since 2018, and I know all the neighbors.",
  },
  {
    sentence: "Where you bought this bag? It looks very expensively.",
    findings: [
      { step: 7, note: "Question order: WH + did + you + V1.", ok: false },
      { step: 5, note: "did + V1 → 'buy'.", ok: false },
      { step: 8, note: "look (linking verb) + adjective → 'expensive'.", ok: false },
    ],
    corrected: "Where did you buy this bag? It looks very expensive.",
  },
  {
    sentence: "The dishes was wash by my brother after we finish dinner.",
    findings: [
      { step: 6, note: "The dishes receive the action → passive: be + V3.", ok: true },
      { step: 4, note: "'the dishes' is plural → 'were'.", ok: false },
      { step: 5, note: "Passive be + V3 → 'washed'.", ok: false },
      { step: 9, note: "Past story → 'finished' (or 'had finished').", ok: false },
    ],
    corrected: "The dishes were washed by my brother after we finished dinner.",
  },
  {
    sentence: "When I will get home, I will to call you.",
    findings: [
      { step: 3, note: "Time clause with 'when' about the future → simple present: 'when I get'.", ok: false },
      { step: 5, note: "will + V1, no 'to'.", ok: false },
    ],
    corrected: "When I get home, I will call you.",
  },
];
