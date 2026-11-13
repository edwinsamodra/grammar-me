import { useState } from "react";
import {
  ALL_TENSES,
  RARE_PASSIVE,
  availableWh,
  canPassive,
  conjugate,
  explain,
  formula,
  tenseName,
  type Form,
  type TenseId,
  type Voice,
  type WhWord,
} from "../engine/conjugate";
import { SUBJECTS, subjectById } from "../engine/subjects";
import { VERBS, verbById } from "../engine/verbs";
import { FormulaBar, RoleLegend, TokenSentence } from "./Sentence";

const FORMS: Array<{ id: Form; label: string }> = [
  { id: "positive", label: "Positive (+)" },
  { id: "negative", label: "Negative (−)" },
  { id: "question", label: "Yes/No Question (?)" },
  { id: "wh", label: "WH-Question" },
  { id: "short", label: "Short Answer" },
];

export function SentenceBuilder({ showTags }: { showTags: boolean }) {
  const [subjectId, setSubjectId] = useState("she");
  const [verbId, setVerbId] = useState("cook");
  const [tense, setTense] = useState<TenseId>("present-simple");
  const [voice, setVoice] = useState<Voice>("active");
  const [form, setForm] = useState<Form>("positive");
  const [wh, setWh] = useState<WhWord>("what");
  const [contracted, setContracted] = useState(false);
  const [withTime, setWithTime] = useState(true);
  const [pluralObject, setPluralObject] = useState(false);
  const [receiverId, setReceiverId] = useState("i");
  const [localTags, setLocalTags] = useState(true);

  const subject = subjectById(subjectId);
  const verb = verbById(verbId);
  const passiveOk = canPassive(verb);
  const activeVoice: Voice = voice === "passive" && !passiveOk ? "active" : voice;
  const whList = availableWh(verb, activeVoice);
  const activeWh: WhWord = whList.includes(wh) ? wh : whList[0];

  const receiver = verb.personObject
    ? subjectById(receiverId === subjectId ? (subjectId === "i" ? "you" : "i") : receiverId)
    : undefined;

  const opts = {
    subject,
    verb,
    tense,
    voice: activeVoice,
    form,
    wh: activeWh,
    contracted,
    withTime,
    pluralObject,
    receiver,
  };

  const tokens = conjugate(opts);
  const steps = explain(opts);
  const currentFormula = formula(tense, activeVoice, form);

  const randomize = () => {
    const s = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const v = VERBS[Math.floor(Math.random() * VERBS.length)];
    const t = ALL_TENSES[Math.floor(Math.random() * ALL_TENSES.length)];
    const vo: Voice = canPassive(v) && Math.random() < 0.3 && !RARE_PASSIVE.includes(t) ? "passive" : "active";
    const f = FORMS[Math.floor(Math.random() * 4)].id; // skip short for variety
    setSubjectId(s.id);
    setVerbId(v.id);
    setTense(t);
    setVoice(vo);
    setForm(f);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Quick presets */}
      <div className="toolbar" style={{ marginBottom: 0 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-muted)" }}>Quick presets:</span>
        <button type="button" className="btn sm" onClick={() => { setSubjectId("he"); setVerbId("wash"); setTense("present-simple"); setVoice("active"); setForm("negative"); setWithTime(true); }}>
          Does + V1 trap
        </button>
        <button type="button" className="btn sm" onClick={() => { setSubjectId("i"); setVerbId("go"); setTense("past-simple"); setVoice("active"); setForm("question"); setWithTime(true); }}>
          Did + V1 question
        </button>
        <button type="button" className="btn sm" onClick={() => { setSubjectId("mother"); setVerbId("cook"); setTense("present-perfect"); setVoice("passive"); setForm("positive"); setWithTime(false); }}>
          Passive result
        </button>
        <button type="button" className="btn sm" onClick={() => { setSubjectId("mother"); setVerbId("pick-up"); setTense("past-simple"); setVoice("passive"); setReceiverId("i"); setForm("positive"); setWithTime(true); }}>
          Person passive
        </button>
        <button type="button" className="btn sm primary" onClick={randomize}>
          Random daily sentence
        </button>
      </div>

      {/* Control panel */}
      <div className="card">
        <div className="control-grid">
          <div className="field">
            <label htmlFor="sb-subj">Subject (Doer)</label>
            <select id="sb-subj" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.text}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="sb-verb">Daily-life Verb</label>
            <select
              id="sb-verb"
              value={verbId}
              onChange={(e) => {
                const next = verbById(e.target.value);
                setVerbId(next.id);
                if (!canPassive(next) && voice === "passive") setVoice("active");
              }}
            >
              {VERBS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} ({v.base}/{v.past}/{v.pp})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="sb-tense">Tense</label>
            <select id="sb-tense" value={tense} onChange={(e) => setTense(e.target.value as TenseId)}>
              <optgroup label="Present">
                {ALL_TENSES.filter((t) => t.startsWith("present-")).map((t) => (
                  <option key={t} value={t}>{tenseName(t)}</option>
                ))}
              </optgroup>
              <optgroup label="Past">
                {ALL_TENSES.filter((t) => t.startsWith("past-")).map((t) => (
                  <option key={t} value={t}>{tenseName(t)}</option>
                ))}
              </optgroup>
              <optgroup label="Future">
                {ALL_TENSES.filter((t) => t.startsWith("future-")).map((t) => (
                  <option key={t} value={t}>{tenseName(t)}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="field">
            <label htmlFor="sb-voice">Voice</label>
            <select
              id="sb-voice"
              value={activeVoice}
              onChange={(e) => setVoice(e.target.value as Voice)}
            >
              <option value="active">Active (subject does it)</option>
              <option value="passive" disabled={!passiveOk}>
                Passive {passiveOk ? "(subject receives it)" : "(N/A — no object)"}
              </option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="sb-form">Form</label>
            <select id="sb-form" value={form} onChange={(e) => setForm(e.target.value as Form)}>
              {FORMS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          {form === "wh" && (
            <div className="field">
              <label htmlFor="sb-wh">WH-Word</label>
              <select id="sb-wh" value={activeWh} onChange={(e) => setWh(e.target.value as WhWord)}>
                {whList.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          )}

          {verb.personObject && (
            <div className="field">
              <label htmlFor="sb-rec">Receiver (Person)</label>
              <select id="sb-rec" value={receiverId} onChange={(e) => setReceiverId(e.target.value)}>
                {SUBJECTS.filter((s) => s.id !== subjectId).map((s) => (
                  <option key={s.id} value={s.id}>{s.text} / {s.objectForm}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="toolbar" style={{ marginTop: 12, marginBottom: 0 }}>
          <button type="button" className={`btn sm ${contracted ? "active" : ""}`} onClick={() => setContracted((c) => !c)}>
            Contractions: {contracted ? "ON" : "OFF"}
          </button>
          <button type="button" className={`btn sm ${withTime ? "active" : ""}`} onClick={() => setWithTime((w) => !w)}>
            Time expression: {withTime ? "ON" : "OFF"}
          </button>
          {verb.object && (
            <button type="button" className={`btn sm ${pluralObject ? "active" : ""}`} onClick={() => setPluralObject((p) => !p)}>
              Object: {pluralObject ? `${verb.object.pl} (plural)` : `${verb.object.sg} (singular)`}
            </button>
          )}
          <button type="button" className={`btn sm ${localTags ? "active" : ""}`} onClick={() => setLocalTags((t) => !t)}>
            Role labels below words: {localTags ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Constructed sentence stage */}
      <div className="builder-stage">
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>
          Constructed Sentence — {tenseName(tense)} ({activeVoice})
        </div>
        <TokenSentence tokens={tokens} showTags={showTags && localTags} />
      </div>

      <FormulaBar parts={currentFormula} label="Formula:" />
      <RoleLegend />

      {/* Step-by-step construction logic */}
      <div className="card">
        <h3 style={{ margin: "0 0 10px", fontSize: 15 }}>Why is it built like this?</h3>
        <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
          {steps.map((step, i) => (
            <li key={i} style={{ fontSize: 14 }}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
