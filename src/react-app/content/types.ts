// Content model shared by all content files.
import type { TenseId } from "../engine/conjugate";

/**
 * Annotated sentence markup: {tag|text}. Text outside braces is plain.
 * Tags: s subject · a auxiliary · n not · v main verb · o object · c complement
 *       adv adverb · adj adjective · prep preposition phrase · t time expression
 *       conj conjunction · wh question word · det determiner · pt particle · ag agent
 *       x error highlight
 */
export type Marked = string;

export interface TimelineMark {
  type: "point" | "range" | "repeat" | "cross";
  x?: number;          // 0..100, NOW = 50
  from?: number;
  to?: number;
  label?: string;
  open?: boolean;      // range continues (arrow)
  dashed?: boolean;
}

export interface Mistake { wrong: string; right: string; why: string }

export interface TenseUse { title: string; detail: string; examples: Marked[] }

export interface TenseContent {
  id: TenseId;
  tagline: string;
  core: string;             // the one-sentence "meaning" of the tense
  timeline: TimelineMark[];
  uses: TenseUse[];
  signalWords: string[];
  notes?: { title: string; items: string[] }[];
  mistakes: Mistake[];
  compare: { with: TenseId; difference: string; a: string; b: string }[];
  passive: { note: string; examples: Marked[] };
  detect: string[];         // checklist when you see this tense
  story: Marked;            // daily-life mini paragraph
}
