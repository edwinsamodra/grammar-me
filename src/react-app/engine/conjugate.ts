// The conjugation engine. Every table, formula and Sentence Builder output
// in the app is produced here, so it can be unit-tested in one place.

import { isThirdSingular, subjectById, type Subject } from "./subjects";
import { ingForm, thirdPersonS, type Verb } from "./verbs";

export type Time = "past" | "present" | "future";
export type Aspect = "simple" | "continuous" | "perfect" | "perfect-continuous";
export type TenseId = `${Time}-${Aspect}`;
export type Voice = "active" | "passive";
export type Form = "positive" | "negative" | "question" | "wh" | "short";
export type WhWord = "what" | "who" | "when" | "where" | "why" | "how often";

export const TIMES: Time[] = ["past", "present", "future"];
export const ASPECTS: Aspect[] = ["simple", "continuous", "perfect", "perfect-continuous"];
export const ALL_TENSES: TenseId[] = TIMES.flatMap((t) => ASPECTS.map((a) => `${t}-${a}` as TenseId));

export function splitTense(id: TenseId): { time: Time; aspect: Aspect } {
  const [time, ...rest] = id.split("-");
  return { time: time as Time, aspect: rest.join("-") as Aspect };
}

export function tenseName(id: TenseId): string {
  const { time, aspect } = splitTense(id);
  const a = aspect === "perfect-continuous" ? "Perfect Continuous" : cap(aspect);
  return `${cap(time)} ${a}`;
}

/** Passive forms that exist in theory but are rare / awkward in real life. */
export const RARE_PASSIVE: TenseId[] = [
  "future-continuous",
  "present-perfect-continuous",
  "past-perfect-continuous",
  "future-perfect-continuous",
];

export type Role =
  | "subject" | "aux" | "not" | "verb" | "particle" | "object" | "complement"
  | "agent" | "wh" | "time" | "answer" | "punct" | "sep";

export interface Token {
  text: string;
  role: Role;
  /** No space before this token (punctuation, contractions like 'm). */
  attach?: boolean;
  note?: string;
}

export interface ConjugateOptions {
  subject: Subject;
  verb: Verb;
  tense: TenseId;
  voice: Voice;
  form: Form;
  wh?: WhWord;
  contracted?: boolean;
  /** Use the plural object (affects passive agreement). */
  pluralObject?: boolean;
  /** Receiver/object person for personObject verbs (defaults to "the kids" or "him"). */
  receiver?: Subject;
  /** Add a typical time expression for the tense. */
  withTime?: boolean;
  /** Show "by + agent" in passive sentences. Default true. */
  withAgent?: boolean;
}

export const TIME_EXPRESSIONS: Record<TenseId, string> = {
  "present-simple": "every morning",
  "present-continuous": "right now",
  "present-perfect": "this week",
  "present-perfect-continuous": "for two hours",
  "past-simple": "yesterday",
  "past-continuous": "at 8 p.m. last night",
  "past-perfect": "by 9 a.m. yesterday",
  "past-perfect-continuous": "for an hour before the guests arrived",
  "future-simple": "tomorrow",
  "future-continuous": "at this time tomorrow",
  "future-perfect": "by tomorrow evening",
  "future-perfect-continuous": "for two hours by noon",
};

// ---------------------------------------------------------------------------
// Verb chain
// ---------------------------------------------------------------------------

type Lex = "will" | "have" | "be-prog" | "be-pass" | "do" | "main";
type VForm = "finite" | "base" | "pp" | "ing";

interface Slot { lex: Lex; form: VForm }

/** What form does the NEXT verb take after this auxiliary? */
const GOVERNS: Record<Exclude<Lex, "main">, VForm> = {
  will: "base",
  do: "base",
  have: "pp",
  "be-prog": "ing",
  "be-pass": "pp",
};

function buildChain(tense: TenseId, voice: Voice, needsDo: boolean): Slot[] {
  const { time, aspect } = splitTense(tense);
  const lexes: Lex[] = [];
  if (time === "future") lexes.push("will");
  if (aspect === "perfect" || aspect === "perfect-continuous") lexes.push("have");
  if (aspect === "continuous" || aspect === "perfect-continuous") lexes.push("be-prog");
  if (voice === "passive") lexes.push("be-pass");
  lexes.push("main");
  if (lexes.length === 1 && needsDo) lexes.unshift("do");

  const slots: Slot[] = [];
  lexes.forEach((lex, i) => {
    const prev = lexes[i - 1];
    const form: VForm = i === 0 ? "finite" : GOVERNS[prev as Exclude<Lex, "main">];
    slots.push({ lex, form });
  });
  return slots;
}

/** Agreement target for the finite verb. */
interface Agr { person: 1 | 2 | 3; plural: boolean }

function realize(slot: Slot, verb: Verb, time: Time, agr: Agr): string {
  const third = isThirdSingular(agr);
  const past = time === "past";
  switch (slot.lex) {
    case "will":
      return "will";
    case "do":
      return past ? "did" : third ? "does" : "do";
    case "have":
      if (slot.form === "finite") return past ? "had" : third ? "has" : "have";
      return "have";
    case "be-prog":
    case "be-pass":
      if (slot.form === "finite") {
        if (past) return agr.plural || agr.person === 2 ? "were" : "was";
        if (agr.person === 1 && !agr.plural) return "am";
        return third ? "is" : "are";
      }
      return slot.form === "ing" ? "being" : slot.form === "pp" ? "been" : "be";
    case "main":
      if (slot.form === "finite") return past ? verb.past : third ? thirdPersonS(verb) : verb.base;
      if (slot.form === "pp") return verb.pp;
      if (slot.form === "ing") return ingForm(verb);
      return verb.base;
  }
}

const NEG_CONTRACTION: Record<string, string> = {
  do: "don't", does: "doesn't", did: "didn't", will: "won't",
  have: "haven't", has: "hasn't", had: "hadn't",
  is: "isn't", are: "aren't", was: "wasn't", were: "weren't",
};

const POS_CONTRACTION: Record<string, string> = {
  am: "'m", is: "'s", are: "'re", have: "'ve", has: "'s", will: "'ll", had: "'d",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function midSentence(text: string, isPronoun: boolean): string {
  if (text === "I") return "I";
  if (isPronoun) return text.toLowerCase();
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function availableWh(verb: Verb, voice: Voice): WhWord[] {
  const list: WhWord[] = [];
  if (voice === "active" && verb.object) list.push("what");
  if (voice === "active") list.push("who");
  list.push("when");
  if (voice === "passive" || verb.object || !/^(to|in|on|at|from|home)\b/.test(verb.complement ?? "")) list.push("where");
  list.push("why", "how often");
  return list;
}

export function canPassive(verb: Verb): boolean {
  return verb.passive && (!!verb.object || !!verb.personObject);
}

function resolveReceiver(o: ConjugateOptions): Subject {
  if (o.receiver) return o.receiver;
  return o.subject.id === "kids" ? subjectById("he") : subjectById("kids");
}

// ---------------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------------

export function conjugate(o: ConjugateOptions): Token[] {
  const { verb, tense, voice, form } = o;
  if (voice === "passive" && !canPassive(verb)) {
    throw new Error(`"${verb.label}" has no passive form (no object).`);
  }
  const { time } = splitTense(tense);
  const wh: WhWord | undefined = form === "wh" ? o.wh ?? "when" : undefined;
  const isWho = wh === "who";
  const receiver = verb.personObject ? resolveReceiver(o) : undefined;
  const objText = verb.object ? (o.pluralObject ? verb.object.pl : verb.object.sg) : undefined;

  // Grammatical subject of the sentence.
  let subjText: string;
  let subjPronoun: string;
  let subjIsPronoun: boolean;
  let agr: Agr;
  if (voice === "passive") {
    if (receiver) {
      subjText = receiver.text;
      subjPronoun = receiver.pronoun;
      subjIsPronoun = receiver.isPronoun;
      agr = { person: receiver.person, plural: receiver.plural };
    } else {
      subjText = cap(objText!);
      subjPronoun = o.pluralObject ? "they" : "it";
      subjIsPronoun = false;
      agr = { person: 3, plural: !!o.pluralObject };
    }
  } else if (isWho) {
    subjText = "Who";
    subjPronoun = "who";
    subjIsPronoun = true;
    agr = { person: 3, plural: false };
  } else {
    subjText = o.subject.text;
    subjPronoun = o.subject.pronoun;
    subjIsPronoun = o.subject.isPronoun;
    agr = { person: o.subject.person, plural: o.subject.plural };
  }

  const needsDo = form !== "positive" && !isWho;
  const chain = buildChain(tense, voice, needsDo);
  const words = chain.map((s) => realize(s, verb, time, agr));
  const auxWord = words[0];

  const T = (text: string, role: Role, extra: Partial<Token> = {}): Token => ({ text, role, ...extra });

  // --- Short answers --------------------------------------------------------
  if (form === "short") {
    const pr = subjPronoun === "I" ? "I" : subjPronoun;
    const yes: Token[] = [T("Yes,", "answer"), T(pr, "subject"), T(auxWord, "aux"), T(".", "punct", { attach: true })];
    let no: Token[];
    if (auxWord === "am") {
      no = [T("No,", "answer"), T("I", "subject"), T("'m", "aux", { attach: true }), T("not", "not"), T(".", "punct", { attach: true })];
    } else {
      no = [T("No,", "answer"), T(pr, "subject"), T(NEG_CONTRACTION[auxWord], "aux", { note: `${auxWord} + not` }), T(".", "punct", { attach: true })];
    }
    return [...yes, T("/", "sep"), ...no];
  }

  // --- Verb phrase tokens ---------------------------------------------------
  const verbTokens: Token[] = chain.map((s, i) =>
    T(words[i], s.lex === "main" ? "verb" : "aux", { note: slotNote(s, words[i]) }),
  );
  if (verb.particle && !(voice === "active" && receiver)) {
    verbTokens.push(T(verb.particle, "particle"));
  }

  // Tail: object / complement / agent / time.
  const tail: Token[] = [];
  if (voice === "active") {
    if (receiver) {
      tail.push(T(receiver.objectForm, "object"));
      if (verb.particle) tail.push(T(verb.particle, "particle"));
    } else if (objText && wh !== "what") {
      tail.push(T(objText, "object"));
    }
    if (verb.complement) tail.push(T(verb.complement, "complement"));
  } else {
    if (verb.complement) tail.push(T(verb.complement, "complement"));
    if (o.withAgent !== false) tail.push(T(`by ${o.subject.objectForm}`, "agent"));
  }
  const dropTime = wh === "when" || wh === "how often";
  if (o.withTime && !dropTime) tail.push(T(TIME_EXPRESSIONS[tense], "time"));

  const subjTok = (first: boolean): Token =>
    T(first ? subjText : voice === "passive" && !receiver ? objText! : midSentence(subjText, subjIsPronoun), "subject");

  // --- Positive ------------------------------------------------------------
  if (form === "positive" || isWho) {
    const out: Token[] = [];
    if (isWho) out.push(T("Who", "wh", { note: "Subject question: no do/does/did, normal word order." }));
    else out.push(subjTok(true));
    if (o.contracted && !isWho && subjIsPronoun && chain[0].lex !== "main" && POS_CONTRACTION[auxWord]) {
      out.push(T(POS_CONTRACTION[auxWord], "aux", { attach: true, note: `${auxWord} (contracted)` }));
      out.push(...verbTokens.slice(1));
    } else {
      out.push(...verbTokens);
    }
    out.push(...tail, T(isWho ? "?" : ".", "punct", { attach: true }));
    return out;
  }

  // --- Negative ------------------------------------------------------------
  if (form === "negative") {
    const out: Token[] = [subjTok(true)];
    if (o.contracted) {
      if (auxWord === "am") {
        if (subjIsPronoun) out.push(T("'m", "aux", { attach: true, note: "am (contracted)" }), T("not", "not"));
        else out.push(T("am", "aux"), T("not", "not"));
      } else {
        out.push(T(NEG_CONTRACTION[auxWord], "aux", { note: `${auxWord} + not` }));
      }
    } else {
      out.push(verbTokens[0], T("not", "not"));
    }
    out.push(...verbTokens.slice(1), ...tail, T(".", "punct", { attach: true }));
    return out;
  }

  // --- Yes/No and WH questions ---------------------------------------------
  const out: Token[] = [];
  if (wh) out.push(T(cap(wh), "wh"));
  const first = verbTokens[0];
  out.push({ ...first, text: wh ? first.text : cap(first.text) });
  out.push(subjTok(false));
  out.push(...verbTokens.slice(1), ...tail, T("?", "punct", { attach: true }));
  return out;
}

function slotNote(s: Slot, word: string): string {
  switch (s.lex) {
    case "will": return "will — future auxiliary (modal)";
    case "do": return `${word} — do-support auxiliary`;
    case "have": return `${word} — perfect auxiliary`;
    case "be-prog": return `${word} — continuous auxiliary (be)`;
    case "be-pass": return `${word} — passive auxiliary (be)`;
    case "main":
      return s.form === "pp" ? "past participle (V3)" : s.form === "ing" ? "present participle (V-ing)" : s.form === "base" ? "base form (V1)" : "main verb (finite)";
  }
}

export function render(tokens: Token[]): string {
  return tokens.reduce((acc, t, i) => (i === 0 || t.attach ? acc + t.text : acc + " " + t.text), "");
}

// ---------------------------------------------------------------------------
// Formulas (generated from the same chain so they never disagree)
// ---------------------------------------------------------------------------

function slotLabel(s: Slot, time: Time): string {
  const past = time === "past";
  switch (s.lex) {
    case "will": return "will";
    case "do": return past ? "did" : "do/does";
    case "have": return s.form === "finite" ? (past ? "had" : "have/has") : "have";
    case "be-prog":
    case "be-pass":
      if (s.form === "finite") return past ? "was/were" : "am/is/are";
      return s.form === "ing" ? "being" : s.form === "pp" ? "been" : "be";
    case "main":
      if (s.form === "finite") return past ? "V2" : "V1 / V1+s/es";
      return s.form === "pp" ? "V3" : s.form === "ing" ? "V-ing" : "V1";
  }
}

export interface FormulaPart { text: string; role: Role }

export function formula(tense: TenseId, voice: Voice, form: Form): FormulaPart[] {
  const { time } = splitTense(tense);
  const chain = buildChain(tense, voice, form !== "positive");
  const labels = chain.map((s) => ({ text: slotLabel(s, time), role: (s.lex === "main" ? "verb" : "aux") as Role }));
  const S: FormulaPart = { text: voice === "passive" ? "S (receiver)" : "S", role: "subject" };
  const tail: FormulaPart[] = voice === "active"
    ? [{ text: "(O)", role: "object" }]
    : [{ text: "(by + agent)", role: "agent" }];
  const plus = (parts: FormulaPart[]) => parts;

  switch (form) {
    case "positive":
      return plus([S, ...labels, ...tail]);
    case "negative":
      return plus([S, labels[0], { text: "not", role: "not" }, ...labels.slice(1), ...tail]);
    case "question":
      return plus([labels[0], S, ...labels.slice(1), ...tail, { text: "?", role: "punct" }]);
    case "wh":
      return plus([{ text: "WH", role: "wh" }, labels[0], S, ...labels.slice(1), ...tail, { text: "?", role: "punct" }]);
    case "short": {
      const a = labels[0].text;
      return [
        { text: "Yes,", role: "answer" }, { text: "S", role: "subject" }, { text: a, role: "aux" },
        { text: "/", role: "sep" },
        { text: "No,", role: "answer" }, { text: "S", role: "subject" }, { text: `${a} + not`, role: "aux" },
      ];
    }
  }
}

// ---------------------------------------------------------------------------
// Step-by-step explanation for the Sentence Builder
// ---------------------------------------------------------------------------

export function explain(o: ConjugateOptions): string[] {
  const { verb, tense, voice, form, subject } = o;
  const { time } = splitTense(tense);
  const steps: string[] = [];
  const isWho = form === "wh" && o.wh === "who";
  const receiver = verb.personObject ? resolveReceiver(o) : undefined;
  const objText = verb.object ? (o.pluralObject ? verb.object.pl : verb.object.sg) : (receiver ? receiver.text : "");

  steps.push(`${tenseName(tense)} (${voice}) → ${formula(tense, voice, "positive").map((p) => p.text).join(" + ")}`);

  if (voice === "passive") {
    steps.push(`Passive: the receiver "${objText}" becomes the subject. The doer moves after "by" (by ${subject.objectForm}).`);
    steps.push(`"${objText}" is ${receiver ? (receiver.plural ? "plural" : "singular") : (o.pluralObject ? "plural" : "singular")} → the auxiliary agrees with it, not with the doer.`);
  } else if (isWho) {
    steps.push(`"Who" asks about the subject, so it takes the subject's place: no do/does/did, and the verb is singular (like he/she).`);
  } else {
    const kind = isThirdSingular(subject)
      ? "third-person singular (he / she / it)"
      : subject.text === "I" ? "first-person singular (I)" : "plural-type (you / we / they)";
    steps.push(`Subject "${subject.text}" is ${kind}.`);
  }

  const needsDo = form !== "positive" && !isWho;
  const chain = buildChain(tense, voice, needsDo);
  const agr: Agr = voice === "passive"
    ? (receiver ? { person: receiver.person, plural: receiver.plural } : { person: 3, plural: !!o.pluralObject })
    : isWho ? { person: 3, plural: false } : subject;
  const words = chain.map((s) => realize(s, verb, time, agr));

  if (chain[0].lex === "do") {
    steps.push(`Simple ${time} has no auxiliary in the positive, so negatives and questions borrow "${words[0]}" (do-support). The main verb goes back to V1: "${words[1]}".`);
  } else if (chain[0].lex === "main") {
    steps.push(time === "past"
      ? `Simple past positive: use V2 for every subject → "${words[0]}".`
      : `Simple present positive: ${isThirdSingular(agr) ? `he/she/it adds -s/-es → "${words[0]}"` : `base form (V1) → "${words[0]}"`}.`);
  } else {
    chain.forEach((s, i) => {
      if (i === 0) steps.push(`First (finite) auxiliary agrees with the subject and shows the time → "${words[0]}".`);
      else steps.push(`After "${words[i - 1]}" comes the ${s.form === "pp" ? "past participle (V3)" : s.form === "ing" ? "-ing form" : "base form"} → "${words[i]}".`);
    });
  }

  if (form === "negative") steps.push(`Negative: put "not" right after the first auxiliary ("${words[0]} not"${o.contracted && NEG_CONTRACTION[words[0]] ? ` → "${NEG_CONTRACTION[words[0]]}"` : ""}).`);
  if (form === "question") steps.push(`Yes/No question: move the first auxiliary "${words[0]}" in front of the subject.`);
  if (form === "wh" && !isWho) steps.push(`WH question: WH-word + first auxiliary + subject + rest of the verb${o.wh === "what" ? `. "What" replaces the object, so "${objText}" disappears.` : "."}`);
  if (form === "short") steps.push(`Short answer: Yes/No + subject pronoun + first auxiliary only. Never repeat the main verb ("Yes, I do", not "Yes, I eat").`);
  if (voice === "passive" && RARE_PASSIVE.includes(tense)) steps.push(`⚠️ This passive is grammatically possible but rare in everyday speech.`);
  return steps;
}
