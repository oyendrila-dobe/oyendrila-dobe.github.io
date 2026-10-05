import React, { useEffect, useMemo, useState } from "react";
import { Code2, FileText, Search } from "lucide-react";

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

function FilterRow({ label, children }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <span className="w-12 shrink-0 text-xs" style={{ fontFamily: MONO, color: MUTED }}>
        {label}
      </span>
      {children}
    </div>
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

function PaperEntry({ p, themes, types, expanded, onToggle }) {
  const shown = p.authors.slice(0, 5);
  const cats = p.categories && p.categories.length ? p.categories : [p.primary_category].filter(Boolean);
  const why = p.why || p.summary;
  return (
    <div className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:gap-4" style={{ borderColor: PEACH }}>
      {/* left: date + every arXiv category as a small chip */}
      <div className="shrink-0 sm:w-28" style={{ fontFamily: MONO, color: RUST, fontSize: "0.87rem" }}>
        {p.published}
        <div className="mt-1 flex flex-wrap gap-1">
          {cats.map((c) => (
            <span
              key={c}
              className="px-1 leading-snug"
              style={{ fontSize: "0.7rem", color: MUTED, border: `1px solid ${PEACH}` }}
            >
              {c}
            </span>
          ))}
        </div>
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

        {/* [type] [venue] [code] then topic tags */}
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {p.type && (
            <span
              className="px-1.5 py-0.5 text-xs font-semibold"
              style={{ fontFamily: MONO, color: RUST, border: `1px solid ${RUST}` }}
            >
              {types[p.type] || p.type}
            </span>
          )}
          {p.venue && (
            <span
              className="px-1.5 py-0.5 text-xs"
              title="Venue as stated by the authors in arXiv metadata"
              style={{ fontFamily: MONO, background: INK, color: PEACH }}
            >
              {p.venue}
            </span>
          )}
          {p.code && <LinkPill href={p.code} Icon={Code2} label="code" />}
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

        {why && (
          <p className="mt-2 text-[0.95rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            <span style={{ fontFamily: MONO, color: RUST, fontSize: "0.8rem" }}>why selected — </span>
            {why}
          </p>
        )}
        {expanded && (
          <p className="mt-2 border-l-2 pl-3 text-sm leading-relaxed" style={{ fontFamily: SERIF, color: MUTED, borderColor: PEACH }}>
            {p.abstract}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
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
  const [type, setType] = useState(null);
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

  useEffect(() => setVisible(PAGE), [query, theme, type, windowDays]);

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
      if (type && p.type !== type) return false;
      if (cutoff && p.published < cutoff) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        (p.why || p.summary || "").toLowerCase().includes(q) ||
        (p.venue || "").toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [data, query, theme, type, windowDays]);

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
  const types = data.types || {};
  // only offer type filters that at least one paper actually has
  const presentTypes = Object.keys(types).filter((k) => data.papers.some((p) => p.type === k));

  return (
    <div>
      <p className="mb-1 text-justify text-[1.03rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
        Reading radar: new arXiv papers are crawled daily and screened by Claude against my research interests, which
        are getting LLMs to reason beyond next-token prediction, formalizing natural language into something provable,
        and mining specifications to understand what systems actually do.
      </p>
      <p className="mb-5 text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        {data.papers.length} papers
        {data.generated && <> · updated {data.generated}</>} · selected automatically, so expect the occasional miss
        or misread
      </p>

      <div className="mb-3 flex items-center gap-2 border px-3 py-1.5" style={{ borderColor: INK, background: WHITE }}>
        <Search size={14} color={MUTED} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search title, abstract, authors, venue"
          className="w-full bg-transparent text-sm outline-none"
          style={{ fontFamily: MONO, color: INK }}
        />
      </div>

      <div className="mb-6">
        <FilterRow label="topic">
          <Chip active={theme === null} onClick={() => setTheme(null)}>
            all
          </Chip>
          {Object.entries(themes).map(([key, label]) => (
            <Chip key={key} active={theme === key} onClick={() => setTheme(theme === key ? null : key)}>
              {label}
            </Chip>
          ))}
        </FilterRow>
        {presentTypes.length > 0 && (
          <FilterRow label="type">
            <Chip active={type === null} onClick={() => setType(null)}>
              all
            </Chip>
            {presentTypes.map((key) => (
              <Chip key={key} active={type === key} onClick={() => setType(type === key ? null : key)}>
                {types[key]}
              </Chip>
            ))}
          </FilterRow>
        )}
        <FilterRow label="when">
          {WINDOWS.map((w) => (
            <Chip key={w.days} active={windowDays === w.days} onClick={() => setWindowDays(w.days)}>
              {w.label}
            </Chip>
          ))}
        </FilterRow>
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
          types={types}
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
