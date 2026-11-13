// Local persistence (theme, POS color labels, mastered topics, quiz stats).

const KEY = "grammar-me:v1";

export interface AppPrefs {
  theme: "light" | "dark";
  showRoles: boolean;
  mastered: string[];
  quizBest: { correct: number; total: number };
}

const DEFAULT_PREFS: AppPrefs = {
  theme: "light",
  showRoles: true,
  mastered: [],
  quizBest: { correct: 0, total: 0 },
};

export function loadPrefs(): AppPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(prefs: AppPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage quota errors
  }
}
