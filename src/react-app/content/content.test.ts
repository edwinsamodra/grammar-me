import { describe, expect, it } from "vitest";
import { ALL_TENSES } from "../engine/conjugate";
import { POS } from "./pos";
import { CHOOSE, ERRORS, TRANSFORMS } from "./practice";
import { PATTERNS, SENTENCE_TYPES } from "./structure";
import { TENSES } from "./tenses";

const VALID_TAGS = new Set(["s", "a", "n", "v", "pt", "o", "c", "ag", "wh", "t", "adv", "adj", "prep", "conj", "det"]);

function assertMarked(str: string, where: string) {
  let depth = 0;
  for (const ch of str) {
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    expect(depth, `Unbalanced braces in ${where}: ${str}`).toBeGreaterThanOrEqual(0);
  }
  expect(depth, `Unclosed brace in ${where}: ${str}`).toBe(0);

  const re = /\{([a-z]+)\|([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(str)) !== null) {
    expect(VALID_TAGS.has(m[1]), `Unknown tag "${m[1]}" in ${where}: ${str}`).toBe(true);
    expect(m[2].trim().length, `Empty tagged text in ${where}: ${str}`).toBeGreaterThan(0);
  }
}

describe("content integrity", () => {
  it("covers all 12 tenses completely", () => {
    expect(TENSES.map((t) => t.id).sort()).toEqual([...ALL_TENSES].sort());
    for (const t of TENSES) {
      expect(t.uses.length).toBeGreaterThan(0);
      expect(t.signalWords.length).toBeGreaterThan(0);
      expect(t.mistakes.length).toBeGreaterThan(0);
      expect(t.detect.length).toBeGreaterThan(0);
      assertMarked(t.story, `tense ${t.id} story`);
      for (const u of t.uses) {
        for (const ex of u.examples) assertMarked(ex, `tense ${t.id} use "${u.title}"`);
      }
      for (const ex of t.passive.examples) assertMarked(ex, `tense ${t.id} passive`);
    }
  });

  it("has valid marked examples in POS and Structure", () => {
    expect(POS.length).toBe(9);
    for (const p of POS) {
      for (const ex of p.examples) assertMarked(ex, `POS ${p.id}`);
    }
    for (const pat of PATTERNS) {
      for (const ex of pat.examples) assertMarked(ex, `pattern ${pat.code}`);
    }
    for (const st of SENTENCE_TYPES) {
      assertMarked(st.example, `sentence type ${st.name}`);
    }
  });

  it("has valid, clickable quiz questions", () => {
    expect(CHOOSE.length).toBeGreaterThanOrEqual(25);
    expect(ERRORS.length).toBeGreaterThanOrEqual(25);
    expect(TRANSFORMS.length).toBeGreaterThanOrEqual(12);

    for (const q of CHOOSE) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
    for (const q of ERRORS) {
      if (q.bad !== null) {
        const words = q.q.split(" ").map((w) => w.replace(/^[("'“]+|[.,?!)"'”]+$/g, ""));
        expect(words, `Error word "${q.bad}" not clickable in "${q.q}"`).toContain(q.bad);
      }
    }
    for (const q of TRANSFORMS) {
      expect(q.answers.length).toBeGreaterThan(0);
    }
  });
});
