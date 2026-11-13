// Subjects used across the conjugation tables and the Sentence Builder.

export type Person = 1 | 2 | 3;

export interface Subject {
  id: string;
  text: string;        // as written at the start of a sentence
  person: Person;
  plural: boolean;
  pronoun: string;     // pronoun used in short answers ("My mother" -> "she")
  objectForm: string;  // used after "by" in passive ("by me")
  isPronoun: boolean;
  note?: string;
}

export const SUBJECTS: Subject[] = [
  { id: "i", text: "I", person: 1, plural: false, pronoun: "I", objectForm: "me", isPronoun: true },
  { id: "you", text: "You", person: 2, plural: true, pronoun: "you", objectForm: "you", isPronoun: true, note: "Singular or plural — always takes plural verb forms." },
  { id: "we", text: "We", person: 1, plural: true, pronoun: "we", objectForm: "us", isPronoun: true },
  { id: "they", text: "They", person: 3, plural: true, pronoun: "they", objectForm: "them", isPronoun: true },
  { id: "he", text: "He", person: 3, plural: false, pronoun: "he", objectForm: "him", isPronoun: true },
  { id: "she", text: "She", person: 3, plural: false, pronoun: "she", objectForm: "her", isPronoun: true },
  { id: "it", text: "It", person: 3, plural: false, pronoun: "it", objectForm: "it", isPronoun: true, note: "Animals, things, machines — e.g. the cat, the robot vacuum." },
  { id: "mother", text: "My mother", person: 3, plural: false, pronoun: "she", objectForm: "my mother", isPronoun: false, note: "A singular noun behaves like he / she / it." },
  { id: "kids", text: "The kids", person: 3, plural: true, pronoun: "they", objectForm: "the kids", isPronoun: false, note: "A plural noun behaves like they." },
];

export const PRONOUN_SUBJECTS = SUBJECTS.filter((s) => s.isPronoun);

export function subjectById(id: string): Subject {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}

/** Third-person singular (he / she / it / singular noun). */
export function isThirdSingular(s: { person: Person; plural: boolean }): boolean {
  return s.person === 3 && !s.plural;
}
