import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, Search } from "lucide-react";

// Same palette/fonts as the rest of the site (kept local so this file is
// self-contained; if you ever export these from one module, import them here).
const TEAL = "#2E7D52";
const WHITE = "#FFFFFF";
const PEACH = "#F4E285";
const RUST = "#BC4B51";
const INK = "#232B1E";
const MUTED = "#5B8E7D";
const SERIF = "'Lora', 'Georgia', serif";
const MONO = "'IBM Plex Mono', monospace";

const PAGE = 20;
const WINDOWS = [
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
  { days: 365, label: "1 year" },
  { days: 0, label: "all" },
];

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm transition-colors"
      style={{
        fontFamily: MONO,
        background: active ? RUST : "transparent",
        color: active ? WHITE : RUST,
        border: `1px solid ${RUST}`,
      }}
    >
      {children}
    </button>
  );
}

function LinkPill({ href, Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 px-2 py-0.5 text-sm transition-colors hover:opacity-80"
      style={{ fontFamily: MONO, border: `1px solid ${TEAL}`, color: TEAL }}
    >
      <Icon size={11} /> {label}
    </a>
  );
}

function PaperEntry({ p, themes, expanded, onToggle }) {
  const shown = p.authors.slice(0, 5);
  return (
    <div className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:gap-4" style={{ borderColor: PEACH }}>
      <div className="shrink-0 sm:w-28" style={{ fontFamily: MONO, color: RUST, fontSize: "0.87rem" }}>
        {p.published}
        <div style={{ color: MUTED }}>{p.primary_category}</div>
      </div>
      <div className="flex-1">
        <a
          href={p.abs_url}
          target="_blank"
          rel="noreferrer"
          className="text-lg underline"
          style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}
        >
          {p.title}
        </a>
        <p className="mt-1 text-sm" style={{ fontFamily: SERIF, color: MUTED }}>
          {shown.join(", ")}
          {p.authors.length > shown.length && " et al."}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 text-xs"
              style={{ fontFamily: MONO, background: PEACH, color: RUST }}
            >
              {themes[t] || t}
            </span>
          ))}
        </div>
        {p.summary && (
          <p className="mt-2 text-[0.95rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            {p.summary}
          </p>
        )}
        {expanded && (
          <p className="mt-2 border-l-2 pl-3 text-sm leading-relaxed" style={{ fontFamily: SERIF, color: MUTED, borderColor: PEACH }}>
            {p.abstract}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <LinkPill href={p.abs_url} Icon={ExternalLink} label="arXiv" />
          <LinkPill href={p.pdf_url} Icon={FileText} label="PDF" />
          <button
            onClick={onToggle}
            className="px-2 py-0.5 text-sm underline"
            style={{ fontFamily: MONO, color: TEAL }}
          >
            {expanded ? "hide abstract" : "abstract"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PapersFeed() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(null);
  const [windowDays, setWindowDays] = useState(0);
  const [visible, setVisible] = useState(PAGE);
  const [open, setOpen] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/papers.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  useEffect(() => setVisible(PAGE), [query, theme, windowDays]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    let cutoff = null;
    if (windowDays) {
      const d = new Date();
      d.setDate(d.getDate() - windowDays);
      cutoff = d.toISOString().slice(0, 10);
    }
    return data.papers.filter((p) => {
      if (theme && !p.tags.includes(theme)) return false;
      if (cutoff && p.published < cutoff) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        (p.summary || "").toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [data, query, theme, windowDays]);

  if (error) {
    return (
      <p className="text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        Could not load the papers feed ({error}).
      </p>
    );
  }
  if (!data) {
    return (
      <p className="text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        loading…
      </p>
    );
  }

  const themes = data.themes || {};

  return (
    <div>
      <div className="mb-5 border px-4 py-2.5" style={{ borderColor: PEACH, background: "#FFF9F5" }}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
          <span style={{ fontFamily: MONO, color: RUST, fontWeight: 600 }}>Credit —</span> this page is an adaptation
          of the idea behind{" "}
          <a href="https://github.com/soonhokong/paperswithlean" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
            Papers with Lean
          </a>{" "}
          by{" "}
          <a href="https://soonhokong.github.io/" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
            Soonho Kong
          </a>
          , a daily-updated, LLM-screened index of arXiv papers. It's reworked here for different topics.
        </p>
      </div>

      <p className="mb-1 text-justify text-[1.03rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
        A running reading list of new arXiv papers on getting LLMs to reason beyond next-token prediction, formalizing
        natural language into something provable, and mining specifications to understand what systems actually do.
      </p>
      <p className="mb-5 text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        {data.papers.length} papers
        {data.generated && <> · updated {data.generated}</>} · screened and summarized automatically by Claude, so
        expect the occasional miss or misread
      </p>

      <div className="mb-3 flex items-center gap-2 border px-3 py-1.5" style={{ borderColor: INK, background: WHITE }}>
        <Search size={14} color={MUTED} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search title, abstract, authors"
          className="w-full bg-transparent text-sm outline-none"
          style={{ fontFamily: MONO, color: INK }}
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <Chip active={theme === null} onClick={() => setTheme(null)}>
          all topics
        </Chip>
        {Object.entries(themes).map(([key, label]) => (
          <Chip key={key} active={theme === key} onClick={() => setTheme(theme === key ? null : key)}>
            {label}
          </Chip>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {WINDOWS.map((w) => (
          <Chip key={w.days} active={windowDays === w.days} onClick={() => setWindowDays(w.days)}>
            {w.label}
          </Chip>
        ))}
      </div>

      {data.papers.length === 0 && (
        <p className="text-sm" style={{ fontFamily: MONO, color: MUTED }}>
          No papers yet — the first scheduled update will populate this list.
        </p>
      )}
      {data.papers.length > 0 && filtered.length === 0 && (
        <p className="text-sm" style={{ fontFamily: MONO, color: MUTED }}>
          No papers match these filters.
        </p>
      )}

      {filtered.slice(0, visible).map((p) => (
        <PaperEntry
          key={p.id}
          p={p}
          themes={themes}
          expanded={!!open[p.id]}
          onToggle={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
        />
      ))}

      {filtered.length > visible && (
        <div className="mt-5 text-center">
          <Chip active={false} onClick={() => setVisible((v) => v + PAGE)}>
            show more ({filtered.length - visible} left)
          </Chip>
        </div>
      )}
    </div>
  );
}
