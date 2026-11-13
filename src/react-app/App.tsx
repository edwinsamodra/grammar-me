import { useEffect, useState } from "react";
import { loadPrefs, savePrefs, type AppPrefs } from "./lib/storage";
import { BuilderPage } from "./pages/BuilderPage";
import { CheatSheetPage } from "./pages/CheatSheetPage";
import { DetectivePage } from "./pages/DetectivePage";
import { HomePage } from "./pages/HomePage";
import { PosPage } from "./pages/PosPage";
import { PracticePage } from "./pages/PracticePage";
import { StructurePage } from "./pages/StructurePage";
import { TenseDetailPage } from "./pages/TenseDetailPage";
import { TensesPage } from "./pages/TensesPage";

interface Route {
  path: string;
  anchor?: string;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  // Support #/pos#verb
  const hashIdx = raw.indexOf("#");
  if (hashIdx >= 0) {
    return { path: raw.slice(0, hashIdx) || "/", anchor: raw.slice(hashIdx + 1) };
  }
  return { path: raw };
}

const NAV = [
  { href: "#/", label: "Map", match: (p: string) => p === "/" },
  { href: "#/structure", label: "Structure", match: (p: string) => p === "/structure" },
  { href: "#/pos", label: "Parts of Speech", match: (p: string) => p === "/pos" },
  { href: "#/tenses", label: "12 Tenses", match: (p: string) => p.startsWith("/tenses") },
  { href: "#/detective", label: "Detective", match: (p: string) => p === "/detective" },
  { href: "#/builder", label: "Builder", match: (p: string) => p === "/builder" },
  { href: "#/practice", label: "Practice", match: (p: string) => p === "/practice" },
  { href: "#/cheatsheet", label: "Cheat Sheet", match: (p: string) => p === "/cheatsheet" },
];

export function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [prefs, setPrefs] = useState<AppPrefs>(loadPrefs);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", prefs.theme);
    savePrefs(prefs);
  }, [prefs]);

  useEffect(() => {
    if (route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [route]);

  const toggleTheme = () =>
    setPrefs((p) => ({ ...p, theme: p.theme === "light" ? "dark" : "light" }));

  const toggleRoles = () =>
    setPrefs((p) => ({ ...p, showRoles: !p.showRoles }));

  const toggleMastered = (id: string) =>
    setPrefs((p) => ({
      ...p,
      mastered: p.mastered.includes(id)
        ? p.mastered.filter((m) => m !== id)
        : [...p.mastered, id],
    }));

  const recordQuizScore = (correct: number, total: number) =>
    setPrefs((p) => {
      const best = p.quizBest;
      const better = total > 0 && (correct > best.correct || (correct === best.correct && total < best.total));
      return better ? { ...p, quizBest: { correct, total } } : p;
    });

  const { path } = route;

  let page;
  if (path === "/") {
    page = <HomePage mastered={prefs.mastered} showTags={prefs.showRoles} />;
  } else if (path === "/structure") {
    page = <StructurePage showTags={prefs.showRoles} />;
  } else if (path === "/pos") {
    page = <PosPage showTags={prefs.showRoles} />;
  } else if (path === "/tenses") {
    page = <TensesPage mastered={prefs.mastered} onToggleMastered={toggleMastered} />;
  } else if (path.startsWith("/tenses/")) {
    const id = path.slice("/tenses/".length);
    page = (
      <TenseDetailPage
        tenseId={id}
        showTags={prefs.showRoles}
        mastered={prefs.mastered}
        onToggleMastered={toggleMastered}
      />
    );
  } else if (path === "/detective") {
    page = <DetectivePage />;
  } else if (path === "/builder") {
    page = <BuilderPage showTags={prefs.showRoles} />;
  } else if (path === "/practice") {
    page = <PracticePage quizBest={prefs.quizBest} onScore={recordQuizScore} />;
  } else if (path === "/cheatsheet") {
    page = <CheatSheetPage />;
  } else {
    page = <HomePage mastered={prefs.mastered} showTags={prefs.showRoles} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#/" className="brand">
            <span aria-hidden="true">🗺️</span>
            <span>Grammar Me</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${item.match(path) ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              type="button"
              className={`btn sm ${prefs.showRoles ? "active" : ""}`}
              onClick={toggleRoles}
              title="Show Part-of-Speech / Role labels below highlighted words"
            >
              POS Tags: {prefs.showRoles ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              className="btn sm"
              onClick={toggleTheme}
              title="Switch light / dark theme"
            >
              {prefs.theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">{page}</main>

      <footer className="footer">
        Grammar Me — Daily-life English grammar reference &amp; practice. Everything runs locally in your browser.
      </footer>
    </div>
  );
}
