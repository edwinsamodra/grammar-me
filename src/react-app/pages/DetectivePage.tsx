import { useState } from "react";
import { STEPS, WORKED } from "../content/detective";
import { TreeControls, TreeNode } from "../components/TreeNode";

export function DetectivePage() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({ 0: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <header className="page-header">
        <h1>Grammar Detective</h1>
        <p>
          A 9-step routine to inspect any sentence or paragraph and decide whether it is grammatically correct — without
          needing an automatic grammar checker.
        </p>
      </header>

      <TreeControls>
        {({ expandAll, collapseAll }) => (
          <div>
            <div className="toolbar">
              <button type="button" className="btn sm" onClick={expandAll}>Expand all steps</button>
              <button type="button" className="btn sm" onClick={collapseAll}>Collapse all</button>
            </div>

            {STEPS.map((s) => (
              <TreeNode
                key={s.n}
                defaultOpen={s.n <= 5}
                title={`Step ${s.n}: ${s.title}`}
                subtitle={s.ask}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {s.checks.map((c, i) => <li key={i} style={{ fontSize: 14 }}>{c}</li>)}
                  </ul>
                  {s.redFlags.map((rf, i) => (
                    <div key={i} className="mistake-row" style={{ marginBottom: 0 }}>
                      <div className="mistake-wrong">✗ {rf.wrong}</div>
                      <div className="mistake-right">✓ {rf.right}</div>
                    </div>
                  ))}
                </div>
              </TreeNode>
            ))}
          </div>
        )}
      </TreeControls>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: "6px 0 0", fontSize: 20 }}>Worked Examples — Try spotting the bugs first</h2>
        {WORKED.map((w, idx) => {
          const isOpen = !!revealed[idx];
          return (
            <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 16.5, fontWeight: 600 }}>“{w.sentence}”</div>
              <div>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setRevealed((r) => ({ ...r, [idx]: !r[idx] }))}
                >
                  {isOpen ? "Hide inspection" : "Reveal step-by-step inspection"}
                </button>
              </div>
              {isOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
                    {w.findings.map((f, j) => (
                      <li key={j} style={{ fontSize: 13.5, color: f.ok ? "var(--text-muted)" : "var(--bad)" }}>
                        <strong>Step {f.step}:</strong> {f.note}
                      </li>
                    ))}
                  </ul>
                  <div className="callout good">
                    <strong>Corrected:</strong> {w.corrected}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
