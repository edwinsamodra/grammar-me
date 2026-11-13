import { ALL_TENSES, formula, tenseName } from "../engine/conjugate";
import { AUX_RULES } from "../content/structure";
import { tenseContent } from "../content/tenses";
import { FormulaBar } from "../components/Sentence";
import { Timeline } from "../components/Timeline";
import { TreeControls, TreeNode } from "../components/TreeNode";

export function CheatSheetPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="page-header">
        <h1>One-Page Cheat Sheet</h1>
        <p>
          Your fast reminder supplement: expand all 12 tenses at once (or print / save as PDF) to quickly check
          formulas, timelines, signal words, and the top mistake to avoid.
        </p>
      </header>

      <TreeControls>
        {({ expandAll, collapseAll }) => (
          <div>
            <div className="toolbar no-print">
              <button type="button" className="btn sm" onClick={expandAll}>Expand all</button>
              <button type="button" className="btn sm" onClick={collapseAll}>Collapse all</button>
              <button type="button" className="btn sm" onClick={() => window.print()}>Print / Save PDF</button>
            </div>

            <TreeNode defaultOpen title="Golden Rule: Auxiliary Chain" subtitle="What form comes right after each auxiliary">
              <div className="table-wrap">
                <table className="gram-table">
                  <thead>
                    <tr>
                      <th>Auxiliary</th>
                      <th>Next Verb</th>
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

            {ALL_TENSES.map((id) => {
              const info = tenseContent(id);
              const fPos = formula(id, "active", "positive");
              const fNeg = formula(id, "active", "negative");
              const fQ = formula(id, "active", "question");
              const fPass = formula(id, "passive", "positive");
              const topMistake = info?.mistakes[0];
              return (
                <TreeNode
                  key={id}
                  defaultOpen
                  title={tenseName(id)}
                  subtitle={info?.tagline}
                  right={<a href={`#/tenses/${id}`} className="btn sm no-print">Full page →</a>}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ flex: "1 1 280px", fontSize: 13.5 }}>{info?.core}</div>
                      {info && <Timeline marks={info.timeline} compact />}
                    </div>
                    <FormulaBar parts={fPos} label="(+)" />
                    <FormulaBar parts={fNeg} label="(−)" />
                    <FormulaBar parts={fQ} label="(?)" />
                    <FormulaBar parts={fPass} label="Pass" />
                    {info && (
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        <strong>Signals:</strong> {info.signalWords.slice(0, 7).join(" · ")}
                      </div>
                    )}
                    {topMistake && (
                      <div style={{ fontSize: 13 }}>
                        <span style={{ color: "var(--bad)" }}>✗ {topMistake.wrong}</span>
                        {" → "}
                        <span style={{ color: "var(--good)", fontWeight: 600 }}>✓ {topMistake.right}</span>
                        <span style={{ color: "var(--text-muted)" }}> ({topMistake.why})</span>
                      </div>
                    )}
                  </div>
                </TreeNode>
              );
            })}
          </div>
        )}
      </TreeControls>
    </div>
  );
}
