import { useMemo, useState } from "react";
import { CHOOSE, ERRORS, TRANSFORMS, normalize, type ChooseQ, type ErrorQ, type TransformQ } from "../content/practice";

type Mode = "choose" | "error" | "transform";
type TopicFilter = "all" | "present" | "past" | "future" | "structure";

function matchTopic(topic: string, filter: TopicFilter): boolean {
  if (filter === "all") return true;
  if (filter === "structure") return !topic.startsWith("present") && !topic.startsWith("past") && !topic.startsWith("future");
  return topic.startsWith(filter);
}

export function Quiz({
  onScore,
}: {
  onScore?: (correct: number, total: number) => void;
}) {
  const [mode, setMode] = useState<Mode>("choose");
  const [filter, setFilter] = useState<TopicFilter>("all");
  const [index, setIndex] = useState(0);

  // Per-question answer state
  const [pickedOption, setPickedOption] = useState<number | null>(null);
  const [pickedWord, setPickedWord] = useState<string | null>(null); // "__NONE__" for "No error"
  const [typed, setTyped] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [session, setSession] = useState({ correct: 0, total: 0 });

  const pool = useMemo(() => {
    if (mode === "choose") return CHOOSE.filter((q) => matchTopic(q.topic, filter));
    if (mode === "error") return ERRORS.filter((q) => matchTopic(q.topic, filter));
    return TRANSFORMS.filter((q) => matchTopic(q.topic, filter));
  }, [mode, filter]);

  const safeIdx = pool.length ? index % pool.length : 0;
  const current = pool[safeIdx];

  const resetQuestion = () => {
    setPickedOption(null);
    setPickedWord(null);
    setTyped("");
    setSubmitted(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setIndex(0);
    resetQuestion();
  };

  const switchFilter = (f: TopicFilter) => {
    setFilter(f);
    setIndex(0);
    resetQuestion();
  };

  const record = (ok: boolean) => {
    const next = { correct: session.correct + (ok ? 1 : 0), total: session.total + 1 };
    setSession(next);
    onScore?.(next.correct, next.total);
  };

  const nextQuestion = () => {
    setIndex((i) => i + 1);
    resetQuestion();
  };

  if (!current) {
    return (
      <div className="card">
        <p style={{ margin: 0 }}>No questions match that filter in this mode. Try switching filter to <strong>All</strong>.</p>
        <button type="button" className="btn sm" style={{ marginTop: 10 }} onClick={() => switchFilter("all")}>Show all</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="toolbar" style={{ marginBottom: 0, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button type="button" className={`btn sm ${mode === "choose" ? "active" : ""}`} onClick={() => switchMode("choose")}>
            1. Choose Tense / Form
          </button>
          <button type="button" className={`btn sm ${mode === "error" ? "active" : ""}`} onClick={() => switchMode("error")}>
            2. Spot the Error
          </button>
          <button type="button" className={`btn sm ${mode === "transform" ? "active" : ""}`} onClick={() => switchMode("transform")}>
            3. Transform & Produce
          </button>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span className="pill">Session: {session.correct} / {session.total}</span>
          <select
            value={filter}
            onChange={(e) => switchFilter(e.target.value as TopicFilter)}
            aria-label="Filter topic"
            style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 12.5 }}
          >
            <option value="all">All topics</option>
            <option value="present">Present tenses</option>
            <option value="past">Past tenses</option>
            <option value="future">Future tenses</option>
            <option value="structure">POS & Structure</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, color: "var(--text-muted)" }}>
          <span>Question {safeIdx + 1} of {pool.length}</span>
          <span className="pill accent">{current.topic}</span>
        </div>

        {current.kind === "choose" && (
          <ChooseView
            q={current}
            picked={pickedOption}
            submitted={submitted}
            onPick={(idx) => {
              if (submitted) return;
              setPickedOption(idx);
              setSubmitted(true);
              record(idx === current.answer);
            }}
          />
        )}

        {current.kind === "error" && (
          <ErrorView
            q={current}
            picked={pickedWord}
            submitted={submitted}
            onPick={(w) => {
              if (submitted) return;
              setPickedWord(w);
              setSubmitted(true);
              const ok = current.bad === null ? w === "__NONE__" : cleanWord(w) === cleanWord(current.bad);
              record(ok);
            }}
          />
        )}

        {current.kind === "transform" && (
          <TransformView
            q={current}
            typed={typed}
            setTyped={setTyped}
            submitted={submitted}
            onSubmit={() => {
              if (submitted || !typed.trim()) return;
              setSubmitted(true);
              const norm = normalize(typed);
              const ok = current.answers.some((a) => normalize(a) === norm);
              record(ok);
            }}
          />
        )}

        {submitted && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="btn primary" onClick={nextQuestion}>
              Next question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ChooseView({
  q,
  picked,
  submitted,
  onPick,
}: {
  q: ChooseQ;
  picked: number | null;
  submitted: boolean;
  onPick: (idx: number) => void;
}) {
  return (
    <>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{q.q}</div>
      <div className="grid-2">
        {q.options.map((opt, idx) => {
          let cls = "btn";
          if (submitted) {
            if (idx === q.answer) cls += " good";
            else if (idx === picked) cls += " active";
          }
          return (
            <button
              key={idx}
              type="button"
              className={cls}
              style={{
                justifyContent: "flex-start",
                padding: "10px 14px",
                fontSize: 15,
                ...(submitted && idx === picked && idx !== q.answer
                  ? { background: "var(--bad-soft)", borderColor: "var(--bad)", color: "var(--bad)" }
                  : {}),
              }}
              onClick={() => onPick(idx)}
            >
              <span style={{ opacity: 0.6, marginRight: 6 }}>{String.fromCharCode(65 + idx)}.</span> {opt}
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className={`callout ${picked === q.answer ? "good" : "bad"}`}>
          <strong>{picked === q.answer ? "Correct!" : `Not quite — answer: "${q.options[q.answer]}"`}</strong>
          <div style={{ marginTop: 4 }}>{q.why}</div>
        </div>
      )}
    </>
  );
}

function cleanWord(w: string): string {
  return w.replace(/^[("'“]+|[.,?!)"'”]+$/g, "");
}

function ErrorView({
  q,
  picked,
  submitted,
  onPick,
}: {
  q: ErrorQ;
  picked: string | null;
  submitted: boolean;
  onPick: (w: string) => void;
}) {
  const words = q.q.split(" ");
  const isCorrect = submitted && (q.bad === null ? picked === "__NONE__" : picked !== null && cleanWord(picked) === cleanWord(q.bad));

  return (
    <>
      <div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
        Click the word that contains a grammar mistake — or choose <strong>No error</strong> if the sentence is already correct.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, fontSize: 18, padding: "8px 0" }}>
        {words.map((w, i) => {
          const clean = cleanWord(w);
          const isBadTarget = q.bad !== null && clean === cleanWord(q.bad);
          const isPicked = picked === w;
          let extra = "";
          if (submitted) {
            if (isBadTarget) extra = "picked-good";
            else if (isPicked) extra = "picked-bad";
          }
          return (
            <button key={i} type="button" className={`quiz-word ${extra}`} onClick={() => onPick(w)}>
              {w}
            </button>
          );
        })}
      </div>
      <div>
        <button
          type="button"
          className={`btn sm ${submitted && q.bad === null ? "good" : ""}`}
          onClick={() => onPick("__NONE__")}
        >
          ✓ No error — sentence is correct
        </button>
      </div>
      {submitted && (
        <div className={`callout ${isCorrect ? "good" : "bad"}`}>
          <strong>
            {isCorrect ? "Spot on!" : q.bad === null ? "Actually, this sentence is correct!" : `The error is "${q.bad}" → ${q.fix}`}
          </strong>
          {q.bad !== null && <span style={{ marginLeft: 8 }}>({q.bad} → <strong>{q.fix}</strong>)</span>}
          <div style={{ marginTop: 4 }}>{q.why}</div>
        </div>
      )}
    </>
  );
}

function TransformView({
  q,
  typed,
  setTyped,
  submitted,
  onSubmit,
}: {
  q: TransformQ;
  typed: string;
  setTyped: (v: string) => void;
  submitted: boolean;
  onSubmit: () => void;
}) {
  const ok = submitted && q.answers.some((a) => normalize(a) === normalize(typed));
  return (
    <>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{q.q}</div>
        <div style={{ marginTop: 4, color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>Task: {q.task}</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <input
          type="text"
          value={typed}
          disabled={submitted}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Type the transformed sentence..."
          style={{
            flex: 1,
            minWidth: 240,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        />
        <button type="submit" className="btn primary" disabled={submitted || !typed.trim()}>
          Check
        </button>
      </form>
      {submitted && (
        <div className={`callout ${ok ? "good" : "bad"}`}>
          <strong>{ok ? "Great!" : `Expected: ${q.answers[0]}`}</strong>
          {!ok && q.answers.length > 1 && <div style={{ fontSize: 13 }}>Also accepted: {q.answers.slice(1).join(" / ")}</div>}
          <div style={{ marginTop: 4 }}>{q.why}</div>
        </div>
      )}
    </>
  );
}
