import { Quiz } from "../components/Quiz";

export function PracticePage({
  quizBest,
  onScore,
}: {
  quizBest: { correct: number; total: number };
  onScore: (correct: number, total: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="page-header">
        <h1>Practice</h1>
        <p>
          Sharpen both goals with daily-life sentences: pick the right tense, spot hidden errors, and transform
          positive sentences into negatives, questions, and passives.
        </p>
        {quizBest.total > 0 && (
          <div style={{ marginTop: 8 }}>
            <span className="pill good">Best recorded session: {quizBest.correct} / {quizBest.total}</span>
          </div>
        )}
      </header>

      <Quiz onScore={onScore} />
    </div>
  );
}
