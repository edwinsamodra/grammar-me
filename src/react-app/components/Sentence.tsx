import { Fragment } from "react";
import type { FormulaPart, Role, Token } from "../engine/conjugate";
import type { Marked } from "../content/types";

export const ROLE_META: Record<string, { label: string; short: string; cls: string }> = {
  s: { label: "Subject (Noun / Pronoun)", short: "S", cls: "role-subject" },
  subject: { label: "Subject (Noun / Pronoun)", short: "S", cls: "role-subject" },
  a: { label: "Auxiliary (Helping Verb)", short: "Aux", cls: "role-aux" },
  aux: { label: "Auxiliary (Helping Verb)", short: "Aux", cls: "role-aux" },
  n: { label: "Negation (not)", short: "Not", cls: "role-not" },
  not: { label: "Negation (not)", short: "Not", cls: "role-not" },
  v: { label: "Main Verb", short: "V", cls: "role-verb" },
  verb: { label: "Main Verb", short: "V", cls: "role-verb" },
  pt: { label: "Verb Particle", short: "Part", cls: "role-particle" },
  particle: { label: "Verb Particle", short: "Part", cls: "role-particle" },
  o: { label: "Object (Noun / Pronoun)", short: "O", cls: "role-object" },
  object: { label: "Object (Noun / Pronoun)", short: "O", cls: "role-object" },
  c: { label: "Complement (Noun / Adj)", short: "C", cls: "role-complement" },
  complement: { label: "Complement (Adverbial / Adj)", short: "C", cls: "role-complement" },
  ag: { label: "Agent (by + doer)", short: "Agent", cls: "role-agent" },
  agent: { label: "Agent (by + doer)", short: "Agent", cls: "role-agent" },
  wh: { label: "Question Word (WH)", short: "WH", cls: "role-wh" },
  t: { label: "Time Expression", short: "Time", cls: "role-time" },
  time: { label: "Time Expression", short: "Time", cls: "role-time" },
  adv: { label: "Adverb", short: "Adv", cls: "role-adv" },
  adj: { label: "Adjective", short: "Adj", cls: "role-adj" },
  prep: { label: "Prepositional Phrase", short: "Prep", cls: "role-prep" },
  conj: { label: "Conjunction", short: "Conj", cls: "role-conj" },
  det: { label: "Determiner / Article", short: "Det", cls: "role-det" },
  answer: { label: "Short Answer", short: "Ans", cls: "role-answer" },
  punct: { label: "Punctuation", short: "", cls: "role-punct" },
  sep: { label: "Separator", short: "", cls: "role-sep" },
};

/** Parse `{tag|text}` marked strings into segments. */
function parseMarked(text: Marked): Array<{ tag?: string; text: string }> {
  const out: Array<{ tag?: string; text: string }> = [];
  const re = /\{([a-z]+)\|([^}]+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ tag: m[1], text: m[2] });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export function TokenSentence({
  tokens,
  showTags = false,
  className = "",
}: {
  tokens: Token[];
  showTags?: boolean;
  className?: string;
}) {
  return (
    <span className={`sentence ${className}`}>
      {tokens.map((tok, i) => {
        const meta = ROLE_META[tok.role];
        const noSpace = i === 0 || tok.attach;
        const isPunct = tok.role === "punct" || tok.role === "sep";
        const tip = tok.note ? `${meta?.label ?? tok.role} — ${tok.note}` : meta?.label;
        return (
          <Fragment key={i}>
            {!noSpace && " "}
            {isPunct ? (
              <span className={`tok ${meta?.cls ?? ""}`}>{tok.text}</span>
            ) : (
              <span
                className={`tok ${meta?.cls ?? ""} ${showTags ? "with-tag" : ""}`}
                title={tip}
              >
                {tok.text}
                {showTags && meta?.short && <span className="tok-tag">{meta.short}</span>}
              </span>
            )}
          </Fragment>
        );
      })}
    </span>
  );
}

export function MarkedSentence({
  text,
  showTags = false,
  className = "",
}: {
  text: Marked;
  showTags?: boolean;
  className?: string;
}) {
  const parts = parseMarked(text);
  return (
    <span className={`sentence ${className}`}>
      {parts.map((p, i) => {
        if (!p.tag) return <span key={i} className="tok plain">{p.text}</span>;
        const meta = ROLE_META[p.tag];
        return (
          <span
            key={i}
            className={`tok ${meta?.cls ?? ""} ${showTags ? "with-tag" : ""}`}
            title={meta?.label ?? p.tag}
          >
            {p.text}
            {showTags && meta?.short && <span className="tok-tag">{meta.short}</span>}
          </span>
        );
      })}
    </span>
  );
}

export function FormulaBar({ parts, label }: { parts: FormulaPart[]; label?: string }) {
  return (
    <div className="formula-bar">
      {label && <strong style={{ marginRight: 6, color: "var(--text-muted)", fontSize: 12 }}>{label}</strong>}
      {parts.map((p, i) => {
        const meta = ROLE_META[p.role];
        const isSep = p.role === "punct" || p.role === "sep";
        return (
          <Fragment key={i}>
            {i > 0 && !isSep && parts[i - 1].role !== "sep" && <span className="formula-plus">+</span>}
            <span className={`tok ${meta?.cls ?? ""}`} title={meta?.label}>
              {p.text}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}

const LEGEND_KEYS: Array<{ key: Role | string; label: string }> = [
  { key: "subject", label: "Subject" },
  { key: "aux", label: "Auxiliary" },
  { key: "not", label: "Not" },
  { key: "verb", label: "Main Verb" },
  { key: "object", label: "Object" },
  { key: "complement", label: "Complement" },
  { key: "agent", label: "Agent (by…)" },
  { key: "adv", label: "Adverb" },
  { key: "adj", label: "Adjective" },
  { key: "prep", label: "Preposition" },
  { key: "conj", label: "Conjunction" },
  { key: "time", label: "Time" },
];

export function RoleLegend() {
  return (
    <div className="legend-strip" aria-label="Color legend for sentence roles">
      <strong style={{ color: "var(--text-muted)" }}>Colors:</strong>
      {LEGEND_KEYS.map((item) => (
        <span key={item.key} className={`tok ${ROLE_META[item.key].cls}`} style={{ fontSize: 11.5 }}>
          {item.label}
        </span>
      ))}
    </div>
  );
}
