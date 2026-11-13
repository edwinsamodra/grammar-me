// Daily-life verbs with their full forms.

export interface Verb {
  id: string;
  base: string;          // V1 (just the verb word, no particle)
  past: string;          // V2
  pp: string;            // V3 (past participle)
  s?: string;            // override for 3rd person singular
  ing?: string;          // override for -ing form
  particle?: string;     // phrasal verbs: "wake UP", "take OUT"
  irregular: boolean;
  /** Active complement. For transitive verbs this is the object. */
  object?: { sg: string; pl: string };
  /** Non-object complement for intransitive verbs ("to work", "early"). */
  complement?: string;
  /** The object is a person (me / you / the kids…) chosen as the "receiver". */
  personObject?: boolean;
  passive: boolean;      // can this verb be used in the passive?
  label: string;         // shown in dropdowns
}

export const VERBS: Verb[] = [
  { id: "wash", base: "wash", past: "washed", pp: "washed", irregular: false, object: { sg: "the dish", pl: "the dishes" }, passive: true, label: "wash the dishes" },
  { id: "cook", base: "cook", past: "cooked", pp: "cooked", irregular: false, object: { sg: "dinner", pl: "the vegetables" }, passive: true, label: "cook dinner" },
  { id: "eat", base: "eat", past: "ate", pp: "eaten", irregular: true, object: { sg: "an apple", pl: "the cookies" }, passive: true, label: "eat an apple" },
  { id: "drink", base: "drink", past: "drank", pp: "drunk", irregular: true, object: { sg: "the coffee", pl: "two glasses of water" }, passive: true, label: "drink coffee" },
  { id: "make", base: "make", past: "made", pp: "made", irregular: true, object: { sg: "the bed", pl: "sandwiches" }, passive: true, label: "make the bed" },
  { id: "clean", base: "clean", past: "cleaned", pp: "cleaned", irregular: false, object: { sg: "the bathroom", pl: "the windows" }, passive: true, label: "clean the bathroom" },
  { id: "do", base: "do", past: "did", pp: "done", s: "does", irregular: true, object: { sg: "the laundry", pl: "the chores" }, passive: true, label: "do the laundry" },
  { id: "buy", base: "buy", past: "bought", pp: "bought", irregular: true, object: { sg: "a loaf of bread", pl: "groceries" }, passive: true, label: "buy groceries" },
  { id: "pay", base: "pay", past: "paid", pp: "paid", irregular: true, object: { sg: "the electricity bill", pl: "the bills" }, passive: true, label: "pay the bills" },
  { id: "read", base: "read", past: "read", pp: "read", irregular: true, object: { sg: "the news", pl: "emails" }, passive: true, label: "read the news" },
  { id: "write", base: "write", past: "wrote", pp: "written", irregular: true, object: { sg: "a report", pl: "messages" }, passive: true, label: "write a report" },
  { id: "send", base: "send", past: "sent", pp: "sent", irregular: true, object: { sg: "a message", pl: "the invitations" }, passive: true, label: "send a message" },
  { id: "watch", base: "watch", past: "watched", pp: "watched", irregular: false, object: { sg: "a movie", pl: "cartoons" }, passive: true, label: "watch a movie" },
  { id: "drive", base: "drive", past: "drove", pp: "driven", irregular: true, object: { sg: "the car", pl: "the kids" }, passive: true, label: "drive the car" },
  { id: "fix", base: "fix", past: "fixed", pp: "fixed", irregular: false, object: { sg: "the bike", pl: "the broken chairs" }, passive: true, label: "fix the bike" },
  { id: "water", base: "water", past: "watered", pp: "watered", irregular: false, object: { sg: "the garden", pl: "the plants" }, passive: true, label: "water the plants" },
  { id: "feed", base: "feed", past: "fed", pp: "fed", irregular: true, object: { sg: "the cat", pl: "the fish" }, passive: true, label: "feed the cat" },
  { id: "take-out", base: "take", past: "took", pp: "taken", particle: "out", irregular: true, object: { sg: "the trash", pl: "the trash bags" }, passive: true, label: "take out the trash" },
  { id: "iron", base: "iron", past: "ironed", pp: "ironed", irregular: false, object: { sg: "my shirt", pl: "the clothes" }, passive: true, label: "iron the clothes" },
  { id: "study", base: "study", past: "studied", pp: "studied", irregular: false, object: { sg: "English", pl: "the new words" }, passive: true, label: "study English" },
  { id: "plan", base: "plan", past: "planned", pp: "planned", ing: "planning", irregular: false, object: { sg: "the weekend trip", pl: "the meals" }, passive: true, label: "plan the weekend" },
  { id: "pick-up", base: "pick", past: "picked", pp: "picked", particle: "up", irregular: false, personObject: true, complement: "from school", passive: true, label: "pick (someone) up from school" },
  { id: "invite", base: "invite", past: "invited", pp: "invited", irregular: false, personObject: true, complement: "to the party", passive: true, label: "invite (someone) to the party" },
  { id: "help", base: "help", past: "helped", pp: "helped", irregular: false, personObject: true, complement: "with the housework", passive: true, label: "help (someone) with the housework" },
  { id: "take-doctor", base: "take", past: "took", pp: "taken", irregular: true, personObject: true, complement: "to the doctor", passive: true, label: "take (someone) to the doctor" },
  { id: "wake-someone", base: "wake", past: "woke", pp: "woken", particle: "up", irregular: true, personObject: true, complement: "at six", passive: true, label: "wake (someone) up at six" },
  { id: "have", base: "have", past: "had", pp: "had", s: "has", irregular: true, object: { sg: "breakfast", pl: "two cups of tea" }, passive: false, label: "have breakfast" },
  { id: "take-shower", base: "take", past: "took", pp: "taken", irregular: true, object: { sg: "a shower", pl: "two showers" }, passive: false, label: "take a shower" },
  { id: "wake-up", base: "wake", past: "woke", pp: "woken", particle: "up", irregular: true, complement: "early", passive: false, label: "wake up early" },
  { id: "go", base: "go", past: "went", pp: "gone", s: "goes", irregular: true, complement: "to work", passive: false, label: "go to work" },
  { id: "get-up", base: "get", past: "got", pp: "gotten", ing: "getting", particle: "up", irregular: true, complement: "at six", passive: false, label: "get up at six" },
  { id: "sleep", base: "sleep", past: "slept", pp: "slept", irregular: true, complement: "well", passive: false, label: "sleep well" },
  { id: "run", base: "run", past: "ran", pp: "run", ing: "running", irregular: true, complement: "in the park", passive: false, label: "run in the park" },
  { id: "walk", base: "walk", past: "walked", pp: "walked", irregular: false, complement: "to the market", passive: false, label: "walk to the market" },
  { id: "come", base: "come", past: "came", pp: "come", irregular: true, complement: "home late", passive: false, label: "come home late" },
  { id: "sit", base: "sit", past: "sat", pp: "sat", ing: "sitting", irregular: true, complement: "on the sofa", passive: false, label: "sit on the sofa" },
  { id: "work", base: "work", past: "worked", pp: "worked", irregular: false, complement: "from home", passive: false, label: "work from home" },
];

export function verbById(id: string): Verb {
  return VERBS.find((v) => v.id === id) ?? VERBS[0];
}

const VOWELS = "aeiou";

/** 3rd person singular present: wash → washes, study → studies, play → plays. */
export function thirdPersonS(v: Verb): string {
  if (v.s) return v.s;
  const b = v.base;
  if (/(s|sh|ch|x|z|o)$/.test(b)) return b + "es";
  if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + "ies";
  return b + "s";
}

/** -ing form: make → making, lie → lying, plan → planning (via override). */
export function ingForm(v: Verb): string {
  if (v.ing) return v.ing;
  const b = v.base;
  if (b.endsWith("ie")) return b.slice(0, -2) + "ying";
  if (b.endsWith("e") && !/(ee|ye|oe)$/.test(b) && b.length > 2) return b.slice(0, -1) + "ing";
  return b + "ing";
}

export function isVowel(ch: string): boolean {
  return VOWELS.includes(ch.toLowerCase());
}
