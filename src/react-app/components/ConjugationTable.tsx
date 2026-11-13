import { useState } from "react";
import {
  RARE_PASSIVE,
  availableWh,
  canPassive,
  conjugate,
  formula,
  type TenseId,
  type Voice,
} from "../engine/conjugate";
import { SUBJECTS, subjectById } from "../engine/subjects";
import { VERBS, verbById } from "../engine/verbs";
import { FormulaBar, TokenSentence } from "./Sentence";
import { TreeNode } from "./TreeNode";

export function ConjugationTable({
  tense,
  showTags = false,
  defaultVerbId = "wash",
}: {
  tense: TenseId;
  showTags?: boolean;
  defaultVerbId?: string;
}) {
  const [verbId, setVerbId] = useState(defaultVerbId);
  const [voice, setVoice] = useState<Voice>("active");
  const [contracted, setContracted] = useState(false);
  const [withTime, setWithTime] = useState(false);
  const [pluralObject, setPluralObject] = useState(false);
  const [receiverId, setReceiverId] = useState("i");
  const [whSubjectId, setWhSubjectId] = useState("she");

  const verb = verbById(verbId);
  const passiveAllowed = canPassive(verb);
  const activeVoice: Voice = voice === "passive" && !passiveAllowed ? "active" : voice;
  const receiver = subjectById(receiverId);
  const isRarePassive = activeVoice === "passive" && RARE_PASSIVE.includes(tense);
  const whWords = availableWh(verb, activeVoice);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Interactive controls */}
      <div className="toolbar" style={{ marginBottom: 2 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          <strong>Verb:</strong>
          <select
            value={verbId}
            onChange={(e) => {
              const next = verbById(e.target.value);
              setVerbId(next.id);
              if (!canPassive(next) && voice === "passive") setVoice("active");
            }}
            style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <optgroup label="Transitive (Active & Passive)">
              {VERBS.filter((v) => canPassive(v)).map((v) => (
                <option key={v.id} value={v.id}>{v.label} {v.irregular ? "(irreg.)" : ""}</option>
              ))}
            </optgroup>
            <optgroup label="Intransitive / Stative (Active only)">
              {VERBS.filter((v) => !canPassive(v)).map((v) => (
                <option key={v.id} value={v.id}>{v.label} {v.irregular ? "(irreg.)" : ""}</option>
              ))}
            </optgroup>
          </select>
        </label>

        <div style={{ display: "inline-flex", gap: 4 }}>
          <button
            type="button"
            className={`btn sm ${activeVoice === "active" ? "active" : ""}`}
            onClick={() => setVoice("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`btn sm ${activeVoice === "passive" ? "active" : ""}`}
            disabled={!passiveAllowed}
            title={passiveAllowed ? "Switch to passive voice" : `"${verb.label}" has no passive form (no object).`}
            onClick={() => setVoice("passive")}
            style={!passiveAllowed ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
          >
            Passive {!passiveAllowed && "(N/A)"}
          </button>
        </div>

        <button
          type="button"
          className={`btn sm ${contracted ? "active" : ""}`}
          onClick={() => setContracted((c) => !c)}
        >
          {contracted ? "Contractions: ON (don't)" : "Contractions: OFF (do not)"}
        </button>

        <button
          type="button"
          className={`btn sm ${withTime ? "active" : ""}`}
          onClick={() => setWithTime((w) => !w)}
        >
          {withTime ? "Time signal: ON" : "Time signal: OFF"}
        </button>

        {activeVoice === "passive" && verb.object && (
          <button
            type="button"
            className={`btn sm ${pluralObject ? "active" : ""}`}
            onClick={() => setPluralObject((p) => !p)}
          >
            Receiver: {pluralObject ? verb.object.pl + " (pl.)" : verb.object.sg + " (sg.)"}
          </button>
        )}

        {verb.personObject && (
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <span>Person object:</span>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              style={{ padding: "4px 7px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.text} ({s.objectForm})</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {isRarePassive && (
        <div className="callout warn">
          <strong>Rare / awkward in daily speech:</strong> Continuous passive forms with <em>being</em> after <em>been</em> or <em>will be</em> are grammatically possible, so they are included here for completeness — in real life, prefer the active voice or a simpler passive.
        </div>
      )}

      {/* Formulas for current voice */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <FormulaBar parts={formula(tense, activeVoice, "positive")} label="(+)" />
        <FormulaBar parts={formula(tense, activeVoice, "negative")} label="(−)" />
        <FormulaBar parts={formula(tense, activeVoice, "question")} label="(?)" />
      </div>

      {/* Main conjugation matrix */}
      <div className="table-wrap">
        <table className="gram-table">
          <thead>
            <tr>
              <th>{activeVoice === "active" ? "Subject" : "Doer (by…)"}</th>
              <th>Positive (+)</th>
              <th>Negative (−)</th>
              <th>Question (?)</th>
              <th>Short Answer</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((subject) => {
              const effectiveReceiver = verb.personObject && subject.id === receiver.id
                ? subjectById(subject.id === "i" ? "you" : "i")
                : receiver;
              const base = { subject, verb, tense, voice: activeVoice, contracted, pluralObject, receiver: effectiveReceiver, withTime };
              return (
                <tr key={subject.id}>
                  <td className="subj-col">
                    {activeVoice === "active" ? subject.text : `by ${subject.objectForm}`}
                    {subject.note && (
                      <div style={{ fontSize: 11, fontWeight: 400, color: "var(--text-faint)", whiteSpace: "normal", maxWidth: 140 }}>
                        {subject.note}
                      </div>
                    )}
                  </td>
                  <td><TokenSentence tokens={conjugate({ ...base, form: "positive" })} showTags={showTags} /></td>
                  <td><TokenSentence tokens={conjugate({ ...base, form: "negative" })} showTags={showTags} /></td>
                  <td><TokenSentence tokens={conjugate({ ...base, form: "question" })} showTags={showTags} /></td>
                  <td><TokenSentence tokens={conjugate({ ...base, form: "short" })} showTags={showTags} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* WH-Questions breakdown */}
      <TreeNode
        depth={2}
        title="WH-Questions (What / Who / When / Where / Why / How often)"
        subtitle={`Formula: WH + aux + S + verb`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <FormulaBar parts={formula(tense, activeVoice, "wh")} label="WH" />
            <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <span>Subject:</span>
              <select
                value={whSubjectId}
                onChange={(e) => setWhSubjectId(e.target.value)}
                style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.text}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="table-wrap">
            <table className="gram-table">
              <thead>
                <tr>
                  <th style={{ width: 110 }}>WH-Word</th>
                  <th>Question</th>
                </tr>
              </thead>
              <tbody>
                {whWords.map((wh) => {
                  const subj = subjectById(whSubjectId);
                  const effReceiver = verb.personObject && subj.id === receiver.id
                    ? subjectById(subj.id === "i" ? "you" : "i")
                    : receiver;
                  return (
                    <tr key={wh}>
                      <td className="subj-col">{wh}</td>
                      <td>
                        <TokenSentence
                          tokens={conjugate({
                            subject: subj,
                            verb,
                            tense,
                            voice: activeVoice,
                            form: "wh",
                            wh,
                            contracted,
                            pluralObject,
                            receiver: effReceiver,
                            withTime,
                          })}
                          showTags={showTags}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </TreeNode>
    </div>
  );
}
