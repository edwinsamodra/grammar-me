import { ASPECTS, TIMES, formula, tenseName, type Aspect, type TenseId, type Time } from "../engine/conjugate";
import { tenseContent } from "../content/tenses";
import { Timeline } from "../components/Timeline";
import { TreeNode } from "../components/TreeNode";

const ASPECT_DESC: Record<Aspect, string> = {
  simple: "A fact, routine, or complete single action (V1 / V2 / will + V1).",
  continuous: "In progress at a point in time (be + V-ing).",
  perfect: "Completed before / connected to a reference time (have + V3).",
  "perfect-continuous": "Duration of an activity up to a reference time (have been + V-ing).",
};

export function TensesPage({
  mastered,
  onToggleMastered,
}: {
  mastered: string[];
  onToggleMastered: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <header className="page-header">
        <h1>The 12 English Tenses</h1>
        <p>
          Every English tense is simply <strong>Time</strong> (Past / Present / Future) × <strong>Aspect</strong>{" "}
          (Simple / Continuous / Perfect / Perfect Continuous). Click any tense to open its full diagram, formulas,
          and complete conjugation tables.
        </p>
      </header>

      <TreeNode title="How Time × Aspect works (the 2-axis shortcut)" subtitle="Learn 4 aspects once instead of memorizing 12 separate rules">
        <div className="grid-2">
          {ASPECTS.map((a) => (
            <div key={a} className="card" style={{ padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, textTransform: "capitalize" }}>{a.replace("-", " ")}</div>
              <div style={{ fontSize: 13.5, color: "var(--text-muted)" }}>{ASPECT_DESC[a]}</div>
            </div>
          ))}
        </div>
      </TreeNode>

      {/* 3x4 Matrix */}
      <div className="tense-matrix">
        <div />
        {ASPECTS.map((a) => (
          <div key={a} className="matrix-head">{a.replace("-", " ")}</div>
        ))}

        {TIMES.map((time: Time) => (
          <div key={time} style={{ display: "contents" }}>
            <div className="matrix-row-label">{time}</div>
            {ASPECTS.map((aspect: Aspect) => {
              const id = `${time}-${aspect}` as TenseId;
              const info = tenseContent(id);
              const f = formula(id, "active", "positive").map((p) => p.text).join(" + ");
              const done = mastered.includes(id);
              return (
                <a key={id} href={`#/tenses/${id}`} className="tense-card">
                  <div className="tense-card-title">
                    <span>{tenseName(id)}</span>
                    <button
                      type="button"
                      className={`btn sm ${done ? "good" : ""}`}
                      title={done ? "Reviewed — click to unmark" : "Mark as reviewed"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleMastered(id);
                      }}
                      style={{ padding: "2px 6px", fontSize: 11 }}
                    >
                      {done ? "✓" : "○"}
                    </button>
                  </div>
                  <div className="tense-card-formula">{f}</div>
                  {info && <Timeline marks={info.timeline} compact />}
                  <div className="tense-card-desc">{info?.tagline}</div>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
