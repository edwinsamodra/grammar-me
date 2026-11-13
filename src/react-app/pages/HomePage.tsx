import { MarkedSentence, RoleLegend } from "../components/Sentence";
import { TreeControls, TreeNode } from "../components/TreeNode";
import { STEPS } from "../content/detective";
import { POS } from "../content/pos";
import { PATTERNS } from "../content/structure";
import { tenseContent } from "../content/tenses";
import { ALL_TENSES, formula, tenseName } from "../engine/conjugate";

export function HomePage({
  mastered,
  showTags,
}: {
  mastered: string[];
  showTags: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <header className="page-header">
        <h1>Grammar Me</h1>
        <p>
          An expandable map of English grammar for daily life — built so you can <strong>spot mistakes</strong> in
          what you read and <strong>produce clean sentences</strong> yourself. Open any branch below like a diagram,
          or jump straight into a section.
        </p>
      </header>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Goal 1 — Detect errors</div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, color: "var(--text-muted)" }}>
            Use the 9-step <a href="#/detective">Grammar Detective</a> checklist, signal words, and common mistake traps to verify any sentence or paragraph.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="#/detective" className="btn sm primary">Open Detective →</a>
            <a href="#/practice" className="btn sm">Spot the Error Quiz</a>
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Goal 2 — Produce accurate sentences</div>
          <p style={{ margin: "0 0 10px", fontSize: 13.5, color: "var(--text-muted)" }}>
            Use the <a href="#/builder">Sentence Builder</a> and <a href="#/tenses">12-Tense Map</a> to see exact formulas, word order, and every subject × active/passive form.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="#/builder" className="btn sm primary">Open Builder →</a>
            <a href="#/cheatsheet" className="btn sm">Quick Cheat Sheet</a>
          </div>
        </div>
      </div>

      <RoleLegend />

      <TreeControls>
        {({ expandAll, collapseAll }) => (
          <div>
            <div className="toolbar">
              <button type="button" className="btn sm" onClick={expandAll}>Expand all branches</button>
              <button type="button" className="btn sm" onClick={collapseAll}>Collapse all</button>
              <span className="pill good" style={{ marginLeft: "auto" }}>
                Tenses reviewed: {mastered.filter((m) => ALL_TENSES.includes(m as never)).length} / 12
              </span>
            </div>

            <TreeNode
              defaultOpen
              title="1. Sentence Structure — the skeleton of a clause"
              subtitle="Word order, patterns, auxiliary rules, agreement"
              right={<a href="#/structure" className="btn sm">Full guide →</a>}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)" }}>
                  Every English clause follows predictable slots: <strong>Subject → Auxiliary → Verb → Object / Complement → Manner → Place → Time</strong>.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PATTERNS.map((p) => (
                    <span key={p.code} className="pill">{p.code}</span>
                  ))}
                </div>
                <div className="card" style={{ padding: "10px 14px" }}>
                  <MarkedSentence
                    text="{s|My mother} {a|has} {adv|always} {v|cooked} {o|dinner} {prep|in the kitchen} {t|at 6 p.m.}"
                    showTags={showTags}
                  />
                </div>
              </div>
            </TreeNode>

            <TreeNode
              title="2. Parts of Speech — the building blocks & how they feed tenses"
              subtitle="9 word classes with color-coded roles"
              right={<a href="#/pos" className="btn sm">Explore all 9 →</a>}
            >
              <div className="grid-3">
                {POS.map((p) => (
                  <a key={p.id} href={`#/pos#${p.id}`} className="card" style={{ padding: "10px 12px", textDecoration: "none", color: "inherit" }}>
                    <div style={{ fontWeight: 700 }}>{p.emoji} {p.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{p.question}</div>
                    <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 4 }}>{p.definition}</div>
                  </a>
                ))}
              </div>
            </TreeNode>

            <TreeNode
              defaultOpen
              title="3. The 12 Tenses — Time (Past / Present / Future) × Aspect"
              subtitle="Formulas, all subjects, active/passive, positive/negative/question"
              right={<a href="#/tenses" className="btn sm">3×4 Matrix →</a>}
            >
              {(["present", "past", "future"] as const).map((time) => (
                <TreeNode
                  key={time}
                  depth={1}
                  defaultOpen={time === "present"}
                  title={time.charAt(0).toUpperCase() + time.slice(1) + " Tenses (4)"}
                  subtitle={`Simple · Continuous · Perfect · Perfect Continuous`}
                >
                  <div className="grid-2">
                    {ALL_TENSES.filter((t) => t.startsWith(time + "-")).map((t) => {
                      const info = tenseContent(t);
                      const f = formula(t, "active", "positive").map((p) => p.text).join(" + ");
                      const isDone = mastered.includes(t);
                      return (
                        <a key={t} href={`#/tenses/${t}`} className="tense-card">
                          <div className="tense-card-title">
                            <span>{tenseName(t)}</span>
                            {isDone && <span className="pill good">✓ Reviewed</span>}
                          </div>
                          <div className="tense-card-formula">{f}</div>
                          <div className="tense-card-desc">{info?.tagline}</div>
                        </a>
                      );
                    })}
                  </div>
                </TreeNode>
              ))}
            </TreeNode>

            <TreeNode
              title="4. Grammar Detective — 9-step error-checking workflow"
              subtitle="How to verify any sentence or paragraph by hand"
              right={<a href="#/detective" className="btn sm">Full checklist & examples →</a>}
            >
              <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {STEPS.map((s) => (
                  <li key={s.n} style={{ fontSize: 13.5 }}>
                    <strong>{s.title}</strong> — <span style={{ color: "var(--text-muted)" }}>{s.ask}</span>
                  </li>
                ))}
              </ol>
            </TreeNode>

            <TreeNode
              title="5. Practice & Review Tools"
              subtitle="Sentence Builder, Cheat Sheet, Spot-the-Error & Transform quizzes"
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href="#/builder" className="btn">🛠️ Sentence Builder</a>
                <a href="#/practice" className="btn">✍️ Practice Quizzes</a>
                <a href="#/cheatsheet" className="btn">📋 One-Page Cheat Sheet</a>
              </div>
            </TreeNode>
          </div>
        )}
      </TreeControls>
    </div>
  );
}
