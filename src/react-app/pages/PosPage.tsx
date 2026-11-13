import { POS } from "../content/pos";
import { MarkedSentence, RoleLegend } from "../components/Sentence";
import { TreeControls, TreeNode } from "../components/TreeNode";

export function PosPage({ showTags }: { showTags: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="page-header">
        <h1>Parts of Speech & Tense Dependencies</h1>
        <p>
          Tenses don't work in isolation — they depend on which word class fills each slot. Every node below shows how
          that Part of Speech shapes verbs, agreement, word order, and meaning.
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

            {POS.map((p, idx) => (
              <TreeNode
                key={p.id}
                id={p.id}
                defaultOpen={idx === 2} // Verb open by default as the heart of tenses
                title={`${p.emoji} ${p.name}`}
                subtitle={p.question}
                badge={<span className="pill">{p.types.length} subtypes</span>}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ margin: 0 }}>{p.definition}</p>

                  <div className="callout">
                    <strong>How it connects to tenses:</strong> {p.tenseLink}
                  </div>

                  <TreeNode depth={1} defaultOpen title="Subtypes & examples">
                    <div className="grid-2">
                      {p.types.map((t) => (
                        <div key={t.name} className="card" style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                          {t.detail && <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>{t.detail}</div>}
                          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
                            {t.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </TreeNode>

                  <TreeNode depth={1} title="Position in a sentence">
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {p.position.map((pos, i) => <li key={i}>{pos}</li>)}
                    </ul>
                  </TreeNode>

                  <TreeNode depth={1} defaultOpen title="Daily-life examples (color-coded)">
                    <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                      {p.examples.map((ex, i) => (
                        <li key={i}><MarkedSentence text={ex} showTags={showTags} /></li>
                      ))}
                    </ul>
                  </TreeNode>

                  <TreeNode depth={1} title="Common mistakes (❌ → ✅)">
                    {p.mistakes.map((m, i) => (
                      <div key={i} className="mistake-row">
                        <div className="mistake-wrong">✗ {m.wrong}</div>
                        <div className="mistake-right">✓ {m.right}</div>
                        <div className="mistake-why">{m.why}</div>
                      </div>
                    ))}
                  </TreeNode>

                  <TreeNode depth={1} title="Quick detective check">
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {p.detect.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </TreeNode>
                </div>
              </TreeNode>
            ))}
          </div>
        )}
      </TreeControls>
    </div>
  );
}
