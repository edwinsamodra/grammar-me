import { SentenceBuilder } from "../components/SentenceBuilder";

export function BuilderPage({ showTags }: { showTags: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header className="page-header">
        <h1>Sentence Builder</h1>
        <p>
          Build clean, daily-life sentences piece by piece. Watch how changing the subject, verb, tense, voice, or form
          changes the auxiliary chain — and read the step-by-step reasoning underneath.
        </p>
      </header>

      <SentenceBuilder showTags={showTags} />
    </div>
  );
}
