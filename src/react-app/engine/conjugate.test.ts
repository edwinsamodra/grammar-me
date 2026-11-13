import { describe, expect, it } from "vitest";
import { ALL_TENSES, availableWh, canPassive, conjugate, formula, render, type ConjugateOptions, type Form, type TenseId, type Voice } from "./conjugate";
import { SUBJECTS, subjectById } from "./subjects";
import { VERBS, ingForm, thirdPersonS, verbById } from "./verbs";

const s = (id: string) => subjectById(id);
const v = (id: string) => verbById(id);
const say = (o: Partial<ConjugateOptions> & { tense: TenseId }) =>
  render(conjugate({ subject: s("he"), verb: v("wash"), voice: "active", form: "positive", ...o }));

describe("verb morphology", () => {
  it("adds -s / -es / -ies correctly", () => {
    expect(thirdPersonS(v("wash"))).toBe("washes");
    expect(thirdPersonS(v("watch"))).toBe("watches");
    expect(thirdPersonS(v("fix"))).toBe("fixes");
    expect(thirdPersonS(v("study"))).toBe("studies");
    expect(thirdPersonS(v("pay"))).toBe("pays");
    expect(thirdPersonS(v("go"))).toBe("goes");
    expect(thirdPersonS(v("do"))).toBe("does");
    expect(thirdPersonS(v("have"))).toBe("has");
  });
  it("forms -ing correctly", () => {
    expect(ingForm(v("make"))).toBe("making");
    expect(ingForm(v("drive"))).toBe("driving");
    expect(ingForm(v("run"))).toBe("running");
    expect(ingForm(v("plan"))).toBe("planning");
    expect(ingForm(v("study"))).toBe("studying");
    expect(ingForm(v("sleep"))).toBe("sleeping");
  });
});

describe("active voice — all 12 tenses (He, wash the dish)", () => {
  const expected: Record<TenseId, [string, string, string]> = {
    "present-simple": ["He washes the dish.", "He does not wash the dish.", "Does he wash the dish?"],
    "present-continuous": ["He is washing the dish.", "He is not washing the dish.", "Is he washing the dish?"],
    "present-perfect": ["He has washed the dish.", "He has not washed the dish.", "Has he washed the dish?"],
    "present-perfect-continuous": ["He has been washing the dish.", "He has not been washing the dish.", "Has he been washing the dish?"],
    "past-simple": ["He washed the dish.", "He did not wash the dish.", "Did he wash the dish?"],
    "past-continuous": ["He was washing the dish.", "He was not washing the dish.", "Was he washing the dish?"],
    "past-perfect": ["He had washed the dish.", "He had not washed the dish.", "Had he washed the dish?"],
    "past-perfect-continuous": ["He had been washing the dish.", "He had not been washing the dish.", "Had he been washing the dish?"],
    "future-simple": ["He will wash the dish.", "He will not wash the dish.", "Will he wash the dish?"],
    "future-continuous": ["He will be washing the dish.", "He will not be washing the dish.", "Will he be washing the dish?"],
    "future-perfect": ["He will have washed the dish.", "He will not have washed the dish.", "Will he have washed the dish?"],
    "future-perfect-continuous": ["He will have been washing the dish.", "He will not have been washing the dish.", "Will he have been washing the dish?"],
  };
  for (const tense of ALL_TENSES) {
    it(tense, () => {
      const [p, n, q] = expected[tense];
      expect(say({ tense })).toBe(p);
      expect(say({ tense, form: "negative" })).toBe(n);
      expect(say({ tense, form: "question" })).toBe(q);
    });
  }
});

describe("passive voice — all 12 tenses (the dishes, by her)", () => {
  const expected: Record<TenseId, string> = {
    "present-simple": "The dishes are washed by her.",
    "present-continuous": "The dishes are being washed by her.",
    "present-perfect": "The dishes have been washed by her.",
    "present-perfect-continuous": "The dishes have been being washed by her.",
    "past-simple": "The dishes were washed by her.",
    "past-continuous": "The dishes were being washed by her.",
    "past-perfect": "The dishes had been washed by her.",
    "past-perfect-continuous": "The dishes had been being washed by her.",
    "future-simple": "The dishes will be washed by her.",
    "future-continuous": "The dishes will be being washed by her.",
    "future-perfect": "The dishes will have been washed by her.",
    "future-perfect-continuous": "The dishes will have been being washed by her.",
  };
  for (const tense of ALL_TENSES) {
    it(tense, () => {
      expect(say({ tense, subject: s("she"), voice: "passive", pluralObject: true })).toBe(expected[tense]);
    });
  }
  it("agrees with the receiver, not the doer", () => {
    expect(say({ tense: "present-simple", subject: s("they"), voice: "passive" })).toBe("The dish is washed by them.");
    expect(say({ tense: "past-simple", subject: s("i"), voice: "passive" })).toBe("The dish was washed by me.");
    expect(say({ tense: "present-perfect", subject: s("we"), voice: "passive", form: "question" })).toBe("Has the dish been washed by us?");
    expect(say({ tense: "present-simple", subject: s("he"), voice: "passive", form: "negative", contracted: true })).toBe("The dish isn't washed by him.");
  });
  it("keeps the particle of phrasal verbs", () => {
    expect(say({ tense: "past-simple", verb: v("take-out"), subject: s("kids"), voice: "passive" })).toBe("The trash was taken out by the kids.");
  });
  it("keeps proper nouns capitalized mid-sentence", () => {
    expect(say({ tense: "present-simple", verb: v("study"), voice: "passive", form: "question" })).toBe("Is English studied by him?");
  });
  it("refuses passive for verbs without an object", () => {
    expect(canPassive(v("go"))).toBe(false);
    expect(() => say({ tense: "present-simple", verb: v("go"), voice: "passive" })).toThrow();
  });
  it("handles person-object verbs in active and passive", () => {
    expect(say({ tense: "past-simple", verb: v("pick-up"), subject: s("mother"), receiver: s("i") })).toBe("My mother picked me up from school.");
    expect(say({ tense: "past-simple", verb: v("pick-up"), subject: s("mother"), receiver: s("i"), voice: "passive" })).toBe("I was picked up from school by my mother.");
    expect(say({ tense: "present-simple", verb: v("invite"), subject: s("she"), receiver: s("we"), voice: "passive", form: "question" })).toBe("Are we invited to the party by her?");
  });
});

describe("subject agreement", () => {
  it("be: am / is / are, was / were", () => {
    const pc = (id: string) => say({ tense: "present-continuous", subject: s(id) });
    expect(pc("i")).toBe("I am washing the dish.");
    expect(pc("you")).toBe("You are washing the dish.");
    expect(pc("it")).toBe("It is washing the dish.");
    expect(pc("mother")).toBe("My mother is washing the dish.");
    expect(pc("kids")).toBe("The kids are washing the dish.");
    const pa = (id: string) => say({ tense: "past-continuous", subject: s(id) });
    expect(pa("i")).toBe("I was washing the dish.");
    expect(pa("you")).toBe("You were washing the dish.");
    expect(pa("she")).toBe("She was washing the dish.");
    expect(pa("we")).toBe("We were washing the dish.");
  });
  it("simple present -s only for third-person singular", () => {
    const sp = (id: string) => say({ tense: "present-simple", subject: s(id), verb: v("go") });
    expect(sp("i")).toBe("I go to work.");
    expect(sp("they")).toBe("They go to work.");
    expect(sp("she")).toBe("She goes to work.");
    expect(sp("mother")).toBe("My mother goes to work.");
    expect(sp("kids")).toBe("The kids go to work.");
  });
});

describe("questions, WH, short answers and contractions", () => {
  it("lowercases subjects after the auxiliary (except I)", () => {
    expect(say({ tense: "past-simple", subject: s("i"), form: "question" })).toBe("Did I wash the dish?");
    expect(say({ tense: "past-simple", subject: s("mother"), form: "question" })).toBe("Did my mother wash the dish?");
  });
  it("WH questions", () => {
    expect(say({ tense: "present-simple", form: "wh", wh: "what", verb: v("eat") })).toBe("What does he eat?");
    expect(say({ tense: "past-simple", form: "wh", wh: "when", subject: s("you") })).toBe("When did you wash the dish?");
    expect(say({ tense: "present-perfect", form: "wh", wh: "why", subject: s("they"), verb: v("go") })).toBe("Why have they gone to work?");
    expect(say({ tense: "present-simple", form: "wh", wh: "who", subject: s("i"), verb: v("eat") })).toBe("Who eats an apple?");
    expect(say({ tense: "past-simple", form: "wh", wh: "who", verb: v("cook") })).toBe("Who cooked dinner?");
  });
  it("'what' is only offered when there is an object to ask about", () => {
    expect(availableWh(v("go"), "active")).not.toContain("what");
    expect(availableWh(v("eat"), "active")).toContain("what");
    expect(availableWh(v("eat"), "passive")).not.toContain("who");
  });
  it("short answers", () => {
    expect(say({ tense: "present-simple", form: "short" })).toBe("Yes, he does. / No, he doesn't.");
    expect(say({ tense: "present-continuous", form: "short", subject: s("i") })).toBe("Yes, I am. / No, I'm not.");
    expect(say({ tense: "future-perfect", form: "short", subject: s("we") })).toBe("Yes, we will. / No, we won't.");
    expect(say({ tense: "present-simple", form: "short", subject: s("mother") })).toBe("Yes, she does. / No, she doesn't.");
    expect(say({ tense: "past-simple", form: "short", voice: "passive", pluralObject: true })).toBe("Yes, they were. / No, they weren't.");
  });
  it("contractions", () => {
    expect(say({ tense: "present-continuous", subject: s("i"), contracted: true })).toBe("I'm washing the dish.");
    expect(say({ tense: "present-continuous", subject: s("i"), form: "negative", contracted: true })).toBe("I'm not washing the dish.");
    expect(say({ tense: "present-perfect", subject: s("they"), contracted: true })).toBe("They've washed the dish.");
    expect(say({ tense: "future-simple", form: "negative", contracted: true })).toBe("He won't wash the dish.");
    expect(say({ tense: "past-simple", form: "negative", contracted: true })).toBe("He didn't wash the dish.");
    // Never contract a main verb "have"
    expect(say({ tense: "present-simple", subject: s("i"), verb: v("have"), contracted: true })).toBe("I have breakfast.");
    // Nouns are not contracted in positive sentences
    expect(say({ tense: "present-continuous", subject: s("kids"), contracted: true })).toBe("The kids are washing the dish.");
  });
  it("time expressions", () => {
    expect(say({ tense: "past-simple", withTime: true, verb: v("wake-up"), subject: s("i") })).toBe("I woke up early yesterday.");
    expect(say({ tense: "present-perfect-continuous", withTime: true, subject: s("she"), verb: v("work") })).toBe("She has been working from home for two hours.");
  });
});

describe("exhaustive sweep — no classic errors anywhere", () => {
  const forms: Form[] = ["positive", "negative", "question", "wh", "short"];
  const voices: Voice[] = ["active", "passive"];
  const bad = [
    /\b(does|did|do)(n't)? (not )?(\w+ )?(washes|watches|goes|has|studies|ate|went|washed|cooked|made|took|had)\b/i,
    /\bdid(n't)? (not )?(\w+ )?(went|ate|drank|made|bought|paid|wrote|sent|drove|fed|took|woke|got|slept|ran|came|sat)\b/i,
    /\b(have|has|had)(n't)? (not )?(\w+ )?(went|ate|drank|wrote|drove|took|woke|ran|came)\b/i,
    /\b(He|She|It|My mother) (have|do|are|were|go|wash)\b/,
    /\bI (is|are|has|were)\b/,
    /\b(You|We|They|The kids) (is|was|has)\b/,
    /\bwill (not )?(I |you |he |she |it |we |they )?(is|are|am|has|goes|washes|went|been)\b/i,
    /\b(is|are|am|was|were)(n't)? (not )?(\w+ )?(wash|cook|eat|go|went|ate)\b/i,
  ];
  it("generates >10,000 sentences without classic errors", () => {
    let count = 0;
    const problems: string[] = [];
    for (const verb of VERBS)
      for (const subject of SUBJECTS)
        for (const tense of ALL_TENSES)
          for (const voice of voices) {
            if (voice === "passive" && !canPassive(verb)) continue;
            for (const form of forms) {
              const whs = form === "wh" ? availableWh(verb, voice) : [undefined];
              for (const wh of whs)
                for (const contracted of [false, true]) {
                  const text = render(conjugate({ subject, verb, tense, voice, form, wh, contracted, withTime: true }));
                  count++;
                  for (const re of bad) if (re.test(text)) problems.push(`${text}  ⟵ ${re}`);
                  if (!/[.?]$/.test(text)) problems.push(`no final punctuation: ${text}`);
                  if (text.charAt(0) !== text.charAt(0).toUpperCase()) problems.push(`lowercase start: ${text}`);
                  if (/\s{2,}|undefined|null/.test(text)) problems.push(`garbage: ${text}`);
                }
            }
          }
    expect(problems.slice(0, 20)).toEqual([]);
    expect(count).toBeGreaterThan(10000);
  });
});

describe("formulas", () => {
  const f = (t: TenseId, vo: Voice, fo: Form) => formula(t, vo, fo).map((p) => p.text).join(" ");
  it("generates readable formulas", () => {
    expect(f("present-simple", "active", "positive")).toBe("S V1 / V1+s/es (O)");
    expect(f("present-simple", "active", "negative")).toBe("S do/does not V1 (O)");
    expect(f("past-simple", "active", "question")).toBe("did S V1 (O) ?");
    expect(f("present-perfect-continuous", "active", "positive")).toBe("S have/has been V-ing (O)");
    expect(f("future-perfect", "passive", "positive")).toBe("S (receiver) will have been V3 (by + agent)");
    expect(f("past-continuous", "passive", "wh")).toBe("WH was/were S (receiver) being V3 (by + agent) ?");
  });
});
