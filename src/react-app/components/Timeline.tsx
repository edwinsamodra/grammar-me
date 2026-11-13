import type { TimelineMark } from "../content/types";

export function Timeline({ marks, compact = false }: { marks: TimelineMark[]; compact?: boolean }) {
  const h = compact ? 52 : 70;
  const lineY = compact ? 28 : 36;
  return (
    <svg
      viewBox={`0 0 320 ${h}`}
      style={{ width: "100%", maxWidth: compact ? 260 : 420, height: h, display: "block" }}
      role="img"
      aria-label="Tense timeline diagram"
    >
      {/* Base axis: Past — Now — Future */}
      <line x1={16} y1={lineY} x2={304} y2={lineY} stroke="var(--border-strong)" strokeWidth={2} />
      <polygon points={`12,${lineY} 20,${lineY - 4} 20,${lineY + 4}`} fill="var(--border-strong)" />
      <polygon points={`308,${lineY} 300,${lineY - 4} 300,${lineY + 4}`} fill="var(--border-strong)" />

      {/* NOW marker */}
      <line x1={160} y1={lineY - 14} x2={160} y2={lineY + 14} stroke="var(--text-faint)" strokeWidth={1.5} strokeDasharray="3 2" />
      {!compact && (
        <>
          <text x={24} y={lineY + 24} fontSize={9.5} fill="var(--text-faint)" fontWeight={600}>PAST</text>
          <text x={160} y={lineY + 24} fontSize={9.5} fill="var(--text-muted)" textAnchor="middle" fontWeight={700}>NOW</text>
          <text x={296} y={lineY + 24} fontSize={9.5} fill="var(--text-faint)" textAnchor="end" fontWeight={600}>FUTURE</text>
        </>
      )}

      {marks.map((m, idx) => {
        const px = (x = 50) => 16 + (x / 100) * 288;
        if (m.type === "range") {
          const x1 = px(m.from ?? 20);
          const x2 = px(m.to ?? 50);
          return (
            <g key={idx}>
              <line
                x1={x1}
                y1={lineY}
                x2={x2}
                y2={lineY}
                stroke="var(--accent)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={m.dashed ? "5 4" : undefined}
              />
              {m.open && (
                <polygon points={`${x2 + 6},${lineY} ${x2 - 2},${lineY - 5} ${x2 - 2},${lineY + 5}`} fill="var(--accent)" />
              )}
              {!compact && m.label && (
                <text x={(x1 + x2) / 2} y={lineY - 12} fontSize={10} fill="var(--accent)" textAnchor="middle" fontWeight={600}>
                  {m.label}
                </text>
              )}
            </g>
          );
        }

        if (m.type === "repeat") {
          const x1 = px(m.from ?? 10);
          const x2 = px(m.to ?? 90);
          const dots = 7;
          return (
            <g key={idx}>
              {Array.from({ length: dots }).map((_, i) => {
                const cx = x1 + ((x2 - x1) * i) / (dots - 1);
                return <circle key={i} cx={cx} cy={lineY} r={3.5} fill="var(--accent)" />;
              })}
              {!compact && m.label && (
                <text x={(x1 + x2) / 2} y={lineY - 12} fontSize={10} fill="var(--accent)" textAnchor="middle" fontWeight={600}>
                  {m.label}
                </text>
              )}
            </g>
          );
        }

        if (m.type === "cross") {
          const cx = px(m.x ?? 30);
          return (
            <g key={idx}>
              <line x1={cx - 5} y1={lineY - 5} x2={cx + 5} y2={lineY + 5} stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" />
              <line x1={cx + 5} y1={lineY - 5} x2={cx - 5} y2={lineY + 5} stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" />
              {!compact && m.label && (
                <text x={cx} y={lineY - 12} fontSize={10} fill="var(--accent)" textAnchor="middle" fontWeight={600}>
                  {m.label}
                </text>
              )}
            </g>
          );
        }

        // point (now)
        const cx = px(m.x ?? 50);
        return (
          <g key={idx}>
            <circle cx={cx} cy={lineY} r={4.5} fill="var(--surface)" stroke="var(--text)" strokeWidth={2} />
          </g>
        );
      })}
    </svg>
  );
}
