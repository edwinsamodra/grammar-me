import { ConjugationTable } from "../components/ConjugationTable";
import { FormulaBar, MarkedSentence, RoleLegend } from "../components/Sentence";
import { Timeline } from "../components/Timeline";
import { TreeControls, TreeNode } from "../components/TreeNode";
import { tenseContent } from "../content/tenses";
import { ALL_TENSES, RARE_PASSIVE, formula, tenseName, type TenseId } from "../engine/conjugate";

export function TenseDetailPage({
  tenseId,
  showTags,
  mastered,
  onToggleMastered,
}: {
  tenseId: string;
  showTags: boolean;
  mastered: string[];
  onToggleMastered: (id: string) => void;
}) {
  const info = tenseContent(tenseId);
  if (!info) {
    return (
      <div className="card">
        <h2>Tense not found</h2>
        <p>Choose one of the 12 tenses from the <a href="#/tenses">Tenses Map</a>.</p>
      </div>
    );
  }

  const idx = ALL_TENSES.indexOf(info.id);
  const prev = idx > 0 ? ALL_TENSES[idx - 1] : null;
  const next = idx < ALL_TENSES.length - 1 ? ALL_TENSES[idx + 1] : null;
  const isDone = mastered.includes(info.id);
  const isRarePassive = RARE_PASSIVE.includes(info.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top breadcrumb + reviewed toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          <a href="#/">Grammar Me</a> / <a href="#/tenses">Tenses</a> / <strong>{tenseName(info.id)}</strong>
        </div>
        <button
          type="button"
          className={`btn sm ${isDone ? "good" : ""}`}
          onClick={() => onToggleMastered(info.id)}
        >
          {isDone ? "✓ Marked as reviewed" : "○ Mark as reviewed"}
        </button>
      </div>

      <header className="page-header" style={{ marginBottom: 4 }}>
        <h1>{tenseName(info.id)}</h1>
        <p>{info.tagline}</p>
      </header>

      {/* Core meaning & Timeline card */}
      <div className="card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", letterSpacing: "0.04em" }}>
            Core Idea
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{info.core}</div>
        </div>
        <Timeline marks={info.timeline} />
      </div>

      <RoleLegend />

      <TreeControls>
        {({ expandAll, collapseAll }) => (
          <div>
            <div className="toolbar">
              <button type="button" className="btn sm" onClick={expandAll}>Expand all sections</button>
              <button type="button" className="btn sm" onClick={collapseAll}>Collapse all</button>
            </div>

            {/* 1. Formulas */}
            <TreeNode defaultOpen title="1. Formulas (Active & Passive)" subtitle="Positive · Negative · Yes/No Question · WH-Question · Short Answer">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <TreeNode depth={1} defaultOpen title="Active voice formulas">
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <FormulaBar parts={formula(info.id, "active", "positive")} label="(+)" />
                    <FormulaBar parts={formula(info.id, "active", "negative")} label="(−)" />
                    <FormulaBar parts={formula(info.id, "active", "question")} label="(?)" />
                    <FormulaBar parts={formula(info.id, "active", "wh")} label="(WH)" />
                    <FormulaBar parts={formula(info.id, "active", "short")} label="(Ans)" />
                  </div>
                </TreeNode>

                <TreeNode
                  depth={1}
                  title="Passive voice formulas"
                  badge={isRarePassive ? <span className="pill warn">rare / awkward</span> : undefined}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <FormulaBar parts={formula(info.id, "passive", "positive")} label="(+)" />
                    <FormulaBar parts={formula(info.id, "passive", "negative")} label="(−)" />
                    <FormulaBar parts={formula(info.id, "passive", "question")} label="(?)" />
                    <FormulaBar parts={formula(info.id, "passive", "wh")} label="(WH)" />
                    <FormulaBar parts={formula(info.id, "passive", "short")} label="(Ans)" />
                  </div>
                </TreeNode>
              </div>
            </TreeNode>

            {/* 2. Full Conjugation Table */}
            <TreeNode
              defaultOpen
              title="2. Complete Conjugation Table (All Subjects × Active / Passive)"
              subtitle="Switch verb, voice, contractions, and time signals live"
            >
              <ConjugationTable tense={info.id} showTags={showTags} />
            </TreeNode>

            {/* 3. Uses & Daily-life Examples */}
            <TreeNode defaultOpen title="3. When to Use It (with daily-life examples)" subtitle={`${info.uses.length} core situations`}>
              <div className="grid-2">
                {info.uses.map((u, i) => (
                  <div key={i} className="card">
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{u.title}</div>
                    {u.detail && <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "var(--text-muted)" }}>{u.detail}</p>}
                    <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                      {u.examples.map((ex, j) => (
                        <li key={j}><MarkedSentence text={ex} showTags={showTags} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TreeNode>

            {/* 4. Signal Words & Notes */}
            <TreeNode title="4. Signal Words & Grammar / Spelling Notes" subtitle={`${info.signalWords.length} clue words`}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {info.signalWords.map((w) => (
                    <span key={w} className="pill accent">{w}</span>
                  ))}
                </div>
                {info.notes?.map((n, i) => (
                  <div key={i} className="card">
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{n.title}</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {n.items.map((item, j) => <li key={j} style={{ fontSize: 13.5 }}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </TreeNode>

            {/* 5. Passive Voice Focus */}
            <TreeNode
              title="5. Passive Voice Notes & Examples"
              badge={isRarePassive ? <span className="pill warn">rare in daily life</span> : undefined}
            >
              <div className="card">
                <p style={{ margin: "0 0 10px" }}>{info.passive.note}</p>
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                  {info.passive.examples.map((ex, i) => (
                    <li key={i}><MarkedSentence text={ex} showTags={showTags} /></li>
                  ))}
                </ul>
              </div>
            </TreeNode>

            {/* 6. Common Mistakes */}
            <TreeNode defaultOpen title="6. Common Mistakes (❌ → ✅)" subtitle={`${info.mistakes.length} frequent errors`}>
              {info.mistakes.map((m, i) => (
                <div key={i} className="mistake-row">
                  <div className="mistake-wrong">✗ {m.wrong}</div>
                  <div className="mistake-right">✓ {m.right}</div>
                  <div className="mistake-why">{m.why}</div>
                </div>
              ))}
            </TreeNode>

            {/* 7. Compare With */}
            {info.compare.length > 0 && (
              <TreeNode title="7. Compare With Related Tenses" subtitle="When to pick which">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {info.compare.map((c, i) => (
                    <div key={i} className="card">
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>
                        {tenseName(info.id)} vs <a href={`#/tenses/${c.with}`}>{tenseName(c.with as TenseId)}</a>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "var(--text-muted)" }}>{c.difference}</p>
                      <div className="grid-2">
                        <div className="callout">{c.a}</div>
                        <div className="callout">{c.b}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TreeNode>
            )}

            {/* 8. Detective Checklist & Mini Story */}
            <TreeNode title="8. Grammar Detective & Daily-Life Paragraph" subtitle="Spot-check list + connected context">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="card">
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Checklist when checking this tense</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {info.detect.map((d, i) => <li key={i} style={{ fontSize: 14 }}>{d}</li>)}
                  </ul>
                </div>
                <div className="card">
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Mini daily-life paragraph (hover words for POS / role)</div>
                  <div style={{ fontSize: 16, lineHeight: 1.9 }}>
                    <MarkedSentence text={info.story} showTags={showTags} />
                  </div>
                </div>
              </div>
            </TreeNode>
          </div>
        )}
      </TreeControls>

      {/* Prev / Next tense */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border)" }}>
        {prev ? <a href={`#/tenses/${prev}`} className="btn">← {tenseName(prev)}</a> : <span />}
        {next ? <a href={`#/tenses/${next}`} className="btn">{tenseName(next)} →</a> : <span />}
      </div>
    </div>
  );
}
