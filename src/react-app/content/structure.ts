import type { Marked, Mistake } from "./types";

export interface Pattern { code: string; name: string; detail: string; examples: Marked[] }

export const PATTERNS: Pattern[] = [
  { code: "S + V", name: "Subject + Verb", detail: "Intransitive verbs — the sentence is complete without an object.",
    examples: ["{s|The baby} {v|is sleeping}.".replace("{v|is sleeping}", "{a|is} {v|sleeping}"), "{s|I} {v|woke} {pt|up}.", "{s|She} {v|arrived}."] },
  { code: "S + V + O", name: "Subject + Verb + Object", detail: "Transitive verbs — the object receives the action. Only this kind of sentence can become passive.",
    examples: ["{s|I} {v|cooked} {o|dinner}.", "{s|My son} {v|broke} {o|the glass}."] },
  { code: "S + V + C", name: "Subject + Linking verb + Complement", detail: "be / look / feel / seem / become + adjective or noun that describes the subject.",
    examples: ["{s|The soup} {v|is} {c|hot}.", "{s|She} {v|became} {c|a nurse}.", "{s|You} {v|look} {c|tired}."] },
  { code: "S + V + A", name: "Subject + Verb + Adverbial", detail: "Verb + a necessary place/time phrase.",
    examples: ["{s|My keys} {v|are} {prep|on the table}.", "{s|We} {v|live} {prep|in Depok}."] },
  { code: "S + V + IO + DO", name: "Subject + Verb + Indirect Object + Direct Object", detail: "give / send / buy / show / tell someone something. Can also be written S + V + DO + to/for + IO.",
    examples: ["{s|I} {v|sent} {o|my mom} {o|a message}.", "{s|I} {v|sent} {o|a message} {prep|to my mom}."] },
  { code: "S + V + O + C", name: "Subject + Verb + Object + Complement", detail: "The complement describes the object.",
    examples: ["{s|The noise} {v|made} {o|me} {c|angry}.", "{s|We} {v|painted} {o|the room} {c|blue}."] },
];

export const WORD_ORDER = {
  title: "Standard word order (statement)",
  slots: [
    { label: "Time (optional, start)", tag: "t", example: "Yesterday," },
    { label: "Subject", tag: "s", example: "my sister" },
    { label: "Auxiliary", tag: "a", example: "had" },
    { label: "Frequency adverb", tag: "adv", example: "never" },
    { label: "Main verb", tag: "v", example: "cooked" },
    { label: "Object", tag: "o", example: "rendang" },
    { label: "Manner", tag: "adv", example: "so well" },
    { label: "Place", tag: "prep", example: "at home" },
    { label: "Time", tag: "t", example: "before." },
  ],
};

export const QUESTION_ORDER = {
  title: "Question word order — QUASM",
  detail: "Question word · Auxiliary · Subject · Main verb · (rest)",
  slots: [
    { label: "Question word", tag: "wh", example: "Where" },
    { label: "Auxiliary", tag: "a", example: "did" },
    { label: "Subject", tag: "s", example: "you" },
    { label: "Main verb (V1)", tag: "v", example: "buy" },
    { label: "Object", tag: "o", example: "these shoes" },
    { label: "?", tag: "punct", example: "?" },
  ],
};

export const AUX_RULES: { aux: string; next: string; example: string }[] = [
  { aux: "do / does / did", next: "V1", example: "does eat · did go" },
  { aux: "will / can / should / must (modals)", next: "V1", example: "will eat · can go" },
  { aux: "have / has / had", next: "V3", example: "has eaten · had gone" },
  { aux: "am / is / are / was / were (continuous)", next: "V-ing", example: "is eating · were going" },
  { aux: "am / is / are / was / were (passive)", next: "V3", example: "is eaten · was taken" },
  { aux: "been", next: "V-ing (perf. continuous) or V3 (perf. passive)", example: "has been eating · has been eaten" },
  { aux: "being", next: "V3 (continuous passive)", example: "is being cleaned" },
  { aux: "be (after will / modal)", next: "V-ing or V3", example: "will be eating · will be eaten" },
];

export const AGREEMENT: { rule: string; right: string; wrong: string }[] = [
  { rule: "he / she / it / singular noun → verb + s (simple present)", right: "My father reads the news.", wrong: "My father read the news every day." },
  { rule: "Two subjects joined by and → plural", right: "My brother and I are hungry.", wrong: "My brother and I is hungry." },
  { rule: "Uncountable nouns → singular", right: "The rice is ready.", wrong: "The rice are ready." },
  { rule: "everyone / somebody / nothing / each / every → singular", right: "Everyone likes martabak.", wrong: "Everyone like martabak." },
  { rule: "The verb agrees with the head noun, not the nearest noun", right: "The box of cookies is on the table.", wrong: "The box of cookies are on the table." },
  { rule: "There is + singular / There are + plural", right: "There are two eggs in the fridge.", wrong: "There is two eggs in the fridge." },
  { rule: "One of + plural noun + singular verb", right: "One of my friends lives nearby.", wrong: "One of my friend live nearby." },
  { rule: "Gerund subject → singular", right: "Cooking takes time.", wrong: "Cooking take time." },
];

export const SENTENCE_TYPES: { name: string; detail: string; example: Marked }[] = [
  { name: "Simple", detail: "One independent clause.", example: "{s|I} {v|made} {o|coffee}." },
  { name: "Compound", detail: "Two independent clauses + FANBOYS (and, but, so, or…).", example: "{s|I} {v|made} {o|coffee}, {conj|but} {s|she} {v|wanted} {o|tea}." },
  { name: "Complex", detail: "Independent + dependent clause (because, when, although…).", example: "{conj|Because} {s|it} {v|was} {c|late}, {s|we} {v|ordered} {o|food} {adv|online}." },
  { name: "Compound-complex", detail: "Two independent + at least one dependent clause.", example: "{conj|When} {s|I} {v|got} {adv|home}, {s|the kids} {a|were} {v|sleeping}, {conj|so} {s|I} {v|ate} {adv|alone}." },
];

export const STRUCTURE_MISTAKES: Mistake[] = [
  { wrong: "Is very hot today.", right: "It is very hot today.", why: "English sentences always need a subject — use dummy 'it' for weather, time, distance." },
  { wrong: "Have many people in the market.", right: "There are many people in the market.", why: "'ada' (existence) = there is / there are, not have." },
  { wrong: "My mother she cooks every day.", right: "My mother cooks every day.", why: "Don't repeat the subject with a pronoun." },
  { wrong: "I very like coffee.", right: "I really like coffee. / I like coffee very much.", why: "very can't modify a verb." },
  { wrong: "Why you didn't come?", right: "Why didn't you come?", why: "Question: WH + auxiliary + subject + verb." },
  { wrong: "I don't know where is the key.", right: "I don't know where the key is.", why: "Embedded question → statement word order." },
  { wrong: "The man which lives next door is nice.", right: "The man who lives next door is nice.", why: "who for people, which for things." },
];
