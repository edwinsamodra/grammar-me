import type { TenseId } from "../engine/conjugate";

export interface ChooseQ { kind: "choose"; q: string; options: string[]; answer: number; why: string; topic: string }
/** Spot the error: `bad` is the wrong word (as written in `q`); null = the sentence is correct. */
export interface ErrorQ { kind: "error"; q: string; bad: string | null; fix: string; why: string; topic: string }
export interface TransformQ { kind: "transform"; q: string; task: string; answers: string[]; why: string; topic: string }
export type Question = ChooseQ | ErrorQ | TransformQ;

const t = (id: TenseId) => id;

export const CHOOSE: ChooseQ[] = [
  { kind: "choose", q: "My father ___ the newspaper every morning.", options: ["read", "reads", "is reading", "has read"], answer: 1, why: "'every morning' = routine → simple present; my father = he → reads.", topic: t("present-simple") },
  { kind: "choose", q: "Be quiet! The baby ___.", options: ["sleeps", "slept", "is sleeping", "has slept"], answer: 2, why: "Happening right now → present continuous.", topic: t("present-continuous") },
  { kind: "choose", q: "I ___ my keys. I can't open the door.", options: ["lost", "have lost", "was losing", "lose"], answer: 1, why: "Past action with a result now, no time given → present perfect.", topic: t("present-perfect") },
  { kind: "choose", q: "We ___ to the beach last weekend.", options: ["have gone", "go", "went", "had gone"], answer: 2, why: "'last weekend' = finished time → simple past.", topic: t("past-simple") },
  { kind: "choose", q: "I ___ dinner when the lights went out.", options: ["cooked", "was cooking", "have cooked", "cook"], answer: 1, why: "Longer action interrupted by a short one → past continuous.", topic: t("past-continuous") },
  { kind: "choose", q: "When we arrived at the station, the train ___.", options: ["already left", "has already left", "had already left", "was leaving already"], answer: 2, why: "The train left before we arrived → past perfect.", topic: t("past-perfect") },
  { kind: "choose", q: "She ___ for the bus for 30 minutes. She's getting angry.", options: ["waits", "is waiting", "has been waiting", "waited"], answer: 2, why: "Duration from the past until now → present perfect continuous.", topic: t("present-perfect-continuous") },
  { kind: "choose", q: "It's hot in here. I ___ the window.", options: ["open", "will open", "am opening", "opened"], answer: 1, why: "Decision made at the moment of speaking → will.", topic: t("future-simple") },
  { kind: "choose", q: "This time tomorrow, I ___ on the beach.", options: ["will lie", "will be lying", "lie", "will have lain"], answer: 1, why: "In progress at a future time → future continuous.", topic: t("future-continuous") },
  { kind: "choose", q: "By 8 p.m., I ___ all the laundry.", options: ["will do", "will have done", "do", "am doing"], answer: 1, why: "'By 8 p.m.' = completed before a future point → future perfect.", topic: t("future-perfect") },
  { kind: "choose", q: "___ you ever ___ rendang?", options: ["Did / eat", "Have / eaten", "Do / eat", "Have / ate"], answer: 1, why: "Life experience with 'ever' → present perfect: have + V3.", topic: t("present-perfect") },
  { kind: "choose", q: "She ___ like spicy food.", options: ["don't", "doesn't", "isn't", "not"], answer: 1, why: "she + simple present negative → doesn't + V1.", topic: t("present-simple") },
  { kind: "choose", q: "___ you go to work yesterday?", options: ["Do", "Were", "Did", "Have"], answer: 2, why: "Past simple question with a main verb → Did + S + V1.", topic: t("past-simple") },
  { kind: "choose", q: "The room ___ every day by the hotel staff.", options: ["cleans", "is cleaned", "is cleaning", "cleaned"], answer: 1, why: "The room receives the action, routine → present simple passive: is + V3.", topic: t("present-simple") },
  { kind: "choose", q: "The cookies ___ by the kids before I got home.", options: ["were eaten", "had been eaten", "have been eaten", "ate"], answer: 1, why: "Passive + earlier past action → had been + V3.", topic: t("past-perfect") },
  { kind: "choose", q: "My car ___ at the moment, so I'm taking the bus.", options: ["is repaired", "is being repaired", "repairs", "has repaired"], answer: 1, why: "Passive + happening now → is being + V3.", topic: t("present-continuous") },
  { kind: "choose", q: "I have lived here ___ 2015.", options: ["for", "since", "from", "in"], answer: 1, why: "since + starting point.", topic: "preposition" },
  { kind: "choose", q: "I'll call you when I ___ home.", options: ["will get", "get", "got", "am getting"], answer: 1, why: "After 'when' about the future → simple present.", topic: t("future-simple") },
  { kind: "choose", q: "Look at those dark clouds! It ___ rain.", options: ["will", "is going to", "rains", "is raining to"], answer: 1, why: "Prediction based on evidence now → be going to.", topic: t("future-simple") },
  { kind: "choose", q: "The movie was so ___ that I fell asleep.", options: ["bored", "boring", "bore", "boredly"], answer: 1, why: "-ing adjective describes the cause.", topic: "adjective" },
  { kind: "choose", q: "She sings very ___.", options: ["good", "well", "nicely good", "goodly"], answer: 1, why: "Describes the verb 'sings' → adverb 'well'.", topic: "adverb" },
  { kind: "choose", q: "Everyone in my family ___ coffee.", options: ["drink", "drinks", "are drinking", "have drunk"], answer: 1, why: "everyone → singular verb.", topic: "agreement" },
  { kind: "choose", q: "There ___ some eggs in the fridge.", options: ["is", "are", "has", "have"], answer: 1, why: "There are + plural noun.", topic: "agreement" },
  { kind: "choose", q: "We ___ dinner. Do you want to join us?", options: ["are having", "have", "are have", "having"], answer: 0, why: "'have' as an action (eat) can be continuous; happening now.", topic: t("present-continuous") },
  { kind: "choose", q: "By next June, she ___ at this company for ten years.", options: ["will work", "will be working", "will have been working", "has worked"], answer: 2, why: "Duration up to a future point → future perfect continuous.", topic: t("future-perfect-continuous") },
  { kind: "choose", q: "He was tired because he ___ all day.", options: ["worked", "has been working", "had been working", "was work"], answer: 2, why: "Activity continuing up to a past moment, explaining a past result → past perfect continuous.", topic: t("past-perfect-continuous") },
  { kind: "choose", q: "Where ___ you buy those shoes?", options: ["did", "do", "were", "have"], answer: 0, why: "Finished past purchase → did + S + V1.", topic: t("past-simple") },
  { kind: "choose", q: "I ___ my homework yet.", options: ["didn't finish", "haven't finished", "don't finish", "hadn't finish"], answer: 1, why: "'yet' with negatives → present perfect.", topic: t("present-perfect") },
];

export const ERRORS: ErrorQ[] = [
  { kind: "error", q: "She cook dinner every night.", bad: "cook", fix: "cooks", why: "she + simple present → -s.", topic: t("present-simple") },
  { kind: "error", q: "Did you went to the market this morning?", bad: "went", fix: "go", why: "did + V1.", topic: t("past-simple") },
  { kind: "error", q: "I have finished my report yesterday.", bad: "have", fix: "(I finished)", why: "'yesterday' → simple past, not present perfect.", topic: t("present-perfect") },
  { kind: "error", q: "My brother doesn't likes vegetables.", bad: "likes", fix: "like", why: "doesn't + V1.", topic: t("present-simple") },
  { kind: "error", q: "They was watching TV when I called.", bad: "was", fix: "were", why: "they → were.", topic: t("past-continuous") },
  { kind: "error", q: "I am agree with your idea.", bad: "am", fix: "(I agree)", why: "agree is a verb — no am.", topic: "verb" },
  { kind: "error", q: "We have lived in this house since ten years.", bad: "since", fix: "for", why: "period → for.", topic: "preposition" },
  { kind: "error", q: "The package was deliver this morning.", bad: "deliver", fix: "delivered", why: "Passive: was + V3.", topic: t("past-simple") },
  { kind: "error", q: "I usually wake up at six and take a shower.", bad: null, fix: "", why: "Correct: routine → simple present; I → no -s.", topic: t("present-simple") },
  { kind: "error", q: "She has went to the bank.", bad: "went", fix: "gone", why: "has + V3 (gone).", topic: t("present-perfect") },
  { kind: "error", q: "When I will arrive, I'll text you.", bad: "will", fix: "(When I arrive)", why: "Time clause → simple present.", topic: t("future-simple") },
  { kind: "error", q: "I'm knowing the answer.", bad: "I'm", fix: "(I know)", why: "know is stative → simple present.", topic: t("present-continuous") },
  { kind: "error", q: "My mother is cooking in the kitchen right now.", bad: null, fix: "", why: "Correct: now → present continuous; mother = she → is.", topic: t("present-continuous") },
  { kind: "error", q: "The accident was happened near my house.", bad: "was", fix: "(The accident happened)", why: "happen is intransitive → no passive.", topic: "verb" },
  { kind: "error", q: "Everyone are waiting for the bus.", bad: "are", fix: "is", why: "everyone → singular.", topic: "agreement" },
  { kind: "error", q: "I will to help you with the dishes.", bad: "to", fix: "(will help)", why: "will + V1, no to.", topic: t("future-simple") },
  { kind: "error", q: "When I got to the cinema, the movie had already started.", bad: null, fix: "", why: "Correct: the movie started first → past perfect.", topic: t("past-perfect") },
  { kind: "error", q: "Where you are going?", bad: "you", fix: "(Where are you going?)", why: "Question: WH + aux + subject.", topic: "structure" },
  { kind: "error", q: "I'm a teacher and my wife is nurse.", bad: "nurse", fix: "a nurse", why: "Singular countable noun needs an article.", topic: "determiner" },
  { kind: "error", q: "The food smells deliciously.", bad: "deliciously", fix: "delicious", why: "Linking verb + adjective.", topic: "adjective" },
  { kind: "error", q: "Me and my friend went jogging.", bad: "Me", fix: "My friend and I", why: "Subject position → I.", topic: "pronoun" },
  { kind: "error", q: "I have been waiting for you for an hour!", bad: null, fix: "", why: "Correct: duration until now → present perfect continuous.", topic: t("present-perfect-continuous") },
  { kind: "error", q: "By the time you arrive, I will finished cooking.", bad: "finished", fix: "have finished", why: "Future perfect: will have + V3.", topic: t("future-perfect") },
  { kind: "error", q: "The windows are clean every week.", bad: "clean", fix: "cleaned", why: "Passive: are + V3.", topic: t("present-simple") },
  { kind: "error", q: "Is very cold this morning.", bad: "Is", fix: "It is", why: "A sentence needs a subject (dummy it).", topic: "structure" },
  { kind: "error", q: "I don't know where is my phone.", bad: "is", fix: "(where my phone is)", why: "Embedded question → statement order.", topic: "structure" },
  { kind: "error", q: "She is used to drink coffee every morning.", bad: "drink", fix: "drinking", why: "be used to + V-ing (to is a preposition here).", topic: "preposition" },
  { kind: "error", q: "We were having lunch when it started to rain.", bad: null, fix: "", why: "Correct: background (past continuous) + interruption (past simple).", topic: t("past-continuous") },
];

export const TRANSFORMS: TransformQ[] = [
  { kind: "transform", q: "She washes the dishes.", task: "Make it negative.", answers: ["She doesn't wash the dishes.", "She does not wash the dishes."], why: "does not + V1 — the -s moves to does.", topic: t("present-simple") },
  { kind: "transform", q: "They went to the market.", task: "Make it a yes/no question.", answers: ["Did they go to the market?"], why: "Did + S + V1.", topic: t("past-simple") },
  { kind: "transform", q: "My mother cooks dinner.", task: "Make it passive.", answers: ["Dinner is cooked by my mother."], why: "Object → subject; is + V3; by + doer.", topic: t("present-simple") },
  { kind: "transform", q: "Someone stole my bike.", task: "Make it passive (no agent).", answers: ["My bike was stolen."], why: "was + V3; 'someone' is dropped.", topic: t("past-simple") },
  { kind: "transform", q: "He has finished his homework.", task: "Make it a yes/no question.", answers: ["Has he finished his homework?"], why: "Move 'has' before the subject.", topic: t("present-perfect") },
  { kind: "transform", q: "I am cooking dinner.", task: "Change to the past continuous.", answers: ["I was cooking dinner."], why: "am → was.", topic: t("past-continuous") },
  { kind: "transform", q: "We will clean the house.", task: "Make it passive.", answers: ["The house will be cleaned by us.", "The house will be cleaned."], why: "will be + V3.", topic: t("future-simple") },
  { kind: "transform", q: "The kids are eating the cake.", task: "Make it passive.", answers: ["The cake is being eaten by the kids."], why: "is being + V3 — 'the cake' is singular → is.", topic: t("present-continuous") },
  { kind: "transform", q: "She drinks coffee every morning.", task: "Ask about the object with 'What'.", answers: ["What does she drink every morning?"], why: "What + does + S + V1 — the object disappears.", topic: t("present-simple") },
  { kind: "transform", q: "My dad fixed the bike.", task: "Ask about the subject with 'Who'.", answers: ["Who fixed the bike?"], why: "Subject question: no did, normal order.", topic: t("past-simple") },
  { kind: "transform", q: "I have paid the bills.", task: "Make it negative with 'yet'.", answers: ["I haven't paid the bills yet.", "I have not paid the bills yet."], why: "have not + V3 … yet.", topic: t("present-perfect") },
  { kind: "transform", q: "They had eaten all the cookies.", task: "Make it passive.", answers: ["All the cookies had been eaten by them.", "All the cookies had been eaten."], why: "had been + V3.", topic: t("past-perfect") },
  { kind: "transform", q: "He wakes up at six.", task: "Change to the simple past.", answers: ["He woke up at six."], why: "wake → woke (irregular).", topic: t("past-simple") },
  { kind: "transform", q: "I wait for the bus. (start: 20 minutes ago, still waiting)", task: "Use the present perfect continuous with 'for 20 minutes'.", answers: ["I have been waiting for the bus for 20 minutes.", "I've been waiting for the bus for 20 minutes."], why: "have been + V-ing + for.", topic: t("present-perfect-continuous") },
];

export function normalize(s: string): string {
  return s.toLowerCase().replace(/[’`]/g, "'").replace(/[.?!,]/g, "").replace(/\s+/g, " ").trim();
}
