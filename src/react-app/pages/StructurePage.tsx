import {
  AGREEMENT,
  AUX_RULES,
  PATTERNS,
  QUESTION_ORDER,
  SENTENCE_TYPES,
  STRUCTURE_MISTAKES,
  WORD_ORDER,
} from "../content/structure";
import { MarkedSentence, ROLE_META, RoleLegend } from "../components/Sentence";
import { TreeControls, TreeNode } from "../components/TreeNode";

export function StructurePage({ showTags }: { showTags: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="page-header">
        <h1>Sentence Structure</h1>
        <p>
          Before picking a tense, know where every piece sits. Expand any branch to see sentence patterns, word order,
          auxiliary chain rules, and subject–verb agreement.
        </p>
      </header>

      <RoleLegend />

      <TreeControls>
        {({ expandAll, collapseAll }) => (
          <div>
            <div className="toolbar">
              <button type="button" className="btn sm" onClick={expandAll}>Expand all</button>
              <button type="button" className="btn sm" onClick={collapseAll}>Collapse all</button>
            </div>

            <TreeNode defaultOpen title="1. The 6 Basic Sentence Patterns" subtitle="S + V · S + V + O · S + V + C · S + V + A · IO + DO · O + C">
              <div className="grid-2">
                {PATTERNS.map((p) => (
                  <div key={p.code} className="card">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span className="pill accent" style={{ fontFamily: "var(--font-mono)" }}>{p.code}</span>
                      <strong>{p.name}</strong>
                    </div>
                    <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "var(--text-muted)" }}>{p.detail}</p>
                    <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
                      {p.examples.map((ex, i) => (
                        <li key={i}><MarkedSentence text={ex} showTags={showTags} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TreeNode>

            <TreeNode defaultOpen title="2. Statement & Question Word Order" subtitle="Where each slot goes">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="card">
                  <h3 style={{ margin: "0 0 10px", fontSize: 15 }}>{WORD_ORDER.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {WORD_ORDER.slots.map((slot, i) => {
                      const meta = ROLE_META[slot.tag];
                      return (
                        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", background: "var(--surface-2)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{slot.label}</div>
                          <span className={`tok ${meta?.cls ?? ""}`} style={{ marginTop: 4 }}>{slot.example}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>{QUESTION_ORDER.title}</h3>
                  <p style={{ margin: "0 0 10px", fontSize: 13.5, color: "var(--text-muted)" }}>{QUESTION_ORDER.detail}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {QUESTION_ORDER.slots.map((slot, i) => {
                      const meta = ROLE_META[slot.tag];
                      return (
                        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", background: "var(--surface-2)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{slot.label}</div>
                          <span className={`tok ${meta?.cls ?? ""}`} style={{ marginTop: 4 }}>{slot.example}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TreeNode>

            <TreeNode defaultOpen title="3. The Auxiliary Chain Rule (how tenses never break)" subtitle="Only the FIRST verb shows tense & agreement">
              <p style={{ margin: "0 0 10px", fontSize: 13.5, color: "var(--text-muted)" }}>
                In English, each auxiliary forces the <em>very next</em> verb into one fixed shape. Once you memorize these
                8 pairs, you can spot almost any tense-form bug instantly:
              </p>
              <div className="table-wrap">
                <table className="gram-table">
                  <thead>
                    <tr>
                      <th>Auxiliary</th>
                      <th>Forces Next Verb Into</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AUX_RULES.map((r, i) => (
                      <tr key={i}>
                        <td className="subj-col">{r.aux}</td>
                        <td><strong>{r.next}</strong></td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>{r.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TreeNode>

            <TreeNode title="4. Subject–Verb Agreement Rules" subtitle="8 rules that catch most agreement errors">
              <div className="table-wrap">
                <table className="gram-table">
                  <thead>
                    <tr>
                      <th>Rule</th>
                      <th>Correct ✓</th>
                      <th>Wrong ✗</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AGREEMENT.map((a, i) => (
                      <tr key={i}>
                        <td>{a.rule}</td>
                        <td style={{ color: "var(--good)", fontWeight: 600 }}>{a.right}</td>
                        <td style={{ color: "var(--bad)" }}>{a.wrong}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TreeNode>

            <TreeNode title="5. Clause & Sentence Types" subtitle="Simple · Compound · Complex · Compound-complex">
              <div className="grid-2">
                {SENTENCE_TYPES.map((st) => (
                  <div key={st.name} className="card">
                    <div style={{ fontWeight: 700 }}>{st.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{st.detail}</div>
                    <MarkedSentence text={st.example} showTags={showTags} />
                  </div>
                ))}
              </div>
            </TreeNode>

            <TreeNode title="6. Common Structure Mistakes" subtitle="Classic traps to watch out for">
              {STRUCTURE_MISTAKES.map((m, i) => (
                <div key={i} className="mistake-row">
                  <div className="mistake-wrong">✗ {m.wrong}</div>
                  <div className="mistake-right">✓ {m.right}</div>
                  <div className="mistake-why">{m.why}</div>
                </div>
              ))}
            </TreeNode>
          </div>
        )}
      </TreeControls>
    </div>
  );
}
