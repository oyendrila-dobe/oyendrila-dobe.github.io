import React, { useState } from "react";
import {
  Star,
  Github,
  Linkedin,
  GraduationCap,
  FileText,
  FlaskConical,
  History,
  NotebookPen,
  Home as HomeIcon,
  ExternalLink,
  Briefcase,
  Handshake,
  Mic,
  Presentation,
  Youtube,
  Quote,
} from "lucide-react";
import { updates } from "./data/updates.js";
import { movies } from "./data/marginalia/movies.js";
import { music } from "./data/marginalia/music.js";
import { books } from "./data/marginalia/books.js";
import { marginaliaBlogPosts } from "./data/marginalia/marginaliaBlogPosts.js";
import { publications } from "./data/research/publications.js";
import { researchBlogPosts } from "./data/research/researchBlogPosts.js";
import PapersFeed from "./PapersFeed.jsx";

// ---- palette (coolors.co/588b8b-ffffff-ffd5c2-f28f3b-c8553d) ----
const TEAL = "#2E7D52";
const WHITE = "#FFFFFF";
const PEACH = "#F4E285";
const ORANGE = "#F4A259";
const RUST = "#BC4B51";
const INK = "#232B1E";
const BACKDROP = "#EFD8D6";
const MUTED = "#5B8E7D";
const SERIF = "'Lora', 'Georgia', serif";
const MONO = "'IBM Plex Mono', monospace";

// ---------------- content ----------------
// updates / movies / music / books now live in src/data/ — edit the
// data there, not here. socials stays here since it's tightly coupled
// to the lucide icon components imported above.

const socials = [
  { label: "GitHub", href: "https://github.com/oyendrila-dobe", Icon: Github },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=1AZzkbMAAAAJ&hl=en&oi=ao", Icon: GraduationCap },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/oyendrila-dobe/", Icon: Linkedin },
];

// ---------------- small building blocks ----------------

function Rating({ n }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} strokeWidth={1.5} fill={i < n ? ORANGE : "none"} color={i < n ? ORANGE : MUTED} />
      ))}
    </span>
  );
}

function SectionHeading({ n, children }) {
  return (
    <h2 className="mb-3 mt-2 text-xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
      {n && <span style={{ color: TEAL, fontFamily: MONO, fontSize: "0.95rem", marginRight: "0.5rem" }}>{n}</span>}
      {children}
    </h2>
  );
}

// Groups consecutive entries that share the same date, so a shared
// "Oct 2022" (etc.) only shows once with both notes listed under it.
// Parses lightweight [label](url) markdown-link syntax inside a plain
// text string (used for update descriptions) and returns an array of
// strings and <a> elements React can render directly. Anything not
// matching the pattern stays as plain text.
function linkify(text, color) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, url] = match;
    return (
      <a key={i} href={url} target="_blank" rel="noreferrer" className="underline" style={{ color }}>
        {label}
      </a>
    );
  });
}

function groupByDate(list) {
  const groups = [];
  for (const item of list) {
    const last = groups[groups.length - 1];
    if (last && last.date === item.date) {
      last.items.push(item);
    } else {
      groups.push({ date: item.date, items: [item] });
    }
  }
  return groups;
}

// Small labeled icon button used for publication links (DOI/Cite, PDF, Slides, Talk, Tool)
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

function PublicationEntry({ pub }) {
  return (
    <div className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:gap-4" style={{ borderColor: PEACH }}>
      <div className="shrink-0 sm:w-24" style={{ fontFamily: MONO, color: RUST, fontSize: "0.87rem" }}>
        {pub.venue.short}
        <div style={{ color: MUTED }}>{pub.year}</div>
      </div>
      <div className="flex-1">
        <a
          href={pub.doi || pub.venue.link}
          target="_blank"
          rel="noreferrer"
          className="text-lg underline"
          style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}
        >
          {pub.title}
        </a>
        <p className="mt-1 text-sm" style={{ fontFamily: SERIF, color: MUTED }}>
          {pub.authors.map((a, i) => (
            <React.Fragment key={a.name}>
              {i > 0 && ", "}
              {a.self ? (
                <strong style={{ color: INK }}>{a.name}</strong>
              ) : a.href ? (
                <a href={a.href} target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
                  {a.name}
                </a>
              ) : (
                a.name
              )}
            </React.Fragment>
          ))}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pub.doi && <LinkPill href={pub.doi} Icon={Quote} label="DOI" />}
          {pub.pdf && <LinkPill href={pub.pdf} Icon={FileText} label="PDF" />}
          {pub.slides && <LinkPill href={pub.slides} Icon={Presentation} label="Slides" />}
          {pub.talk && <LinkPill href={pub.talk} Icon={Youtube} label="Talk" />}
          {pub.tool && <LinkPill href={pub.tool} Icon={ExternalLink} label="Tool" />}
          {pub.links && pub.links.map((l) => (
            <LinkPill key={l.label} href={l.href} Icon={ExternalLink} label={l.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicationGroup({ title, items }) {
  if (items.length === 0) return null;
  const sorted = items.slice().sort((a, b) => b.year - a.year || b.month - a.month);
  return (
    <div className="mb-8">
      <SectionHeading>{title}</SectionHeading>
      <div>
        {sorted.map((pub) => (
          <PublicationEntry key={pub.id} pub={pub} />
        ))}
      </div>
    </div>
  );
}

function BlogSection({ posts }) {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const selected = posts.find((p) => p.slug === selectedSlug);

  if (posts.length === 0) {
    return (
      <p className="text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        No posts yet — copy src/data/blog/_template.js to add the first one.
      </p>
    );
  }

  if (selected) {
    const paragraphs = selected.content.trim().split(/\n\s*\n/);
    return (
      <div>
        <button
          onClick={() => setSelectedSlug(null)}
          className="mb-4 text-sm underline"
          style={{ fontFamily: MONO, color: TEAL }}
        >
          ← back to all posts
        </button>
        <h2 className="mb-1 text-xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
          {selected.title}
        </h2>
        <p className="mb-4 text-sm" style={{ fontFamily: MONO, color: RUST }}>
          {selected.date}
          {selected.tags && selected.tags.length > 0 && (
            <span style={{ color: MUTED }}> · {selected.tags.join(", ")}</span>
          )}
        </p>
        {paragraphs.map((para, i) => (
          <p key={i} className="mb-3 text-[1.01rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            {linkify(para.trim(), TEAL)}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug} className="border-b py-4" style={{ borderColor: PEACH }}>
          <button
            onClick={() => setSelectedSlug(post.slug)}
            className="text-left text-lg underline"
            style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}
          >
            {post.title}
          </button>
          <p className="mt-0.5 text-sm" style={{ fontFamily: MONO, color: RUST }}>
            {post.date}
            {post.tags && post.tags.length > 0 && (
              <span style={{ color: MUTED }}> · {post.tags.join(", ")}</span>
            )}
          </p>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED, fontFamily: SERIF }}>
            {post.summary}
          </p>
        </div>
      ))}
    </div>
  );
}

function TableTitle({ n, children }) {
  return (
    <p className="mb-2 text-center text-sm uppercase tracking-wide" style={{ fontFamily: MONO, color: RUST }}>
      Table {n}. {children}
    </p>
  );
}

function ArxivBar({ tag }) {
  return (
    <div
      className="mb-8 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-sm"
      style={{ fontFamily: MONO, background: INK, color: PEACH }}
    >
      <span>last updated:{tag} [cs.FM]</span>
      <span>preprint · not peer reviewed</span>
    </div>
  );
}

function PaperShell({ children }) {
  return (
    <div className="relative mx-auto max-w-[1280px]" style={{ padding: "10px" }}>
      {/* corner ticks on the outer frame */}
      <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2" style={{ borderColor: RUST }} />
      <div className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2" style={{ borderColor: RUST }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2" style={{ borderColor: RUST }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2" style={{ borderColor: RUST }} />
      <div
        className="px-8 py-12 sm:px-16"
        style={{
          background: WHITE,
          backgroundImage: `linear-gradient(${PEACH}35 1px, transparent 1px), linear-gradient(90deg, ${PEACH}35 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          border: `1.5px solid ${INK}`,
          boxShadow: "0 1px 3px rgba(34,31,29,0.08), 0 12px 32px rgba(34,31,29,0.10)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Reusable pill toggle for top-level sub-views within a page
function Toggle({ options, active, onChange }) {
  return (
    <div className="mb-8 flex justify-center gap-2">
      {options.map((opt) => {
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="px-4 py-1.5 text-base transition-colors"
            style={{
              fontFamily: MONO,
              fontSize: "0.87rem",
              background: isActive ? RUST : "transparent",
              color: isActive ? WHITE : RUST,
              border: `1px solid ${RUST}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// Syllable pairs: English respelling <-> Bengali script, keyed so hovering
// either one highlights both together.
const NAME_SYLLABLES = [
  { key: "syl1", en: "Oy", bn: "ঐ" },
  { key: "syl2", en: "en", bn: "ন্" },
  { key: "syl3", en: "dri", bn: "দ্রী" },
  { key: "syl4", en: "la", bn: "লা" },
  { key: "syl5", en: "Doo", bn: "দু" },
  { key: "syl6", en: "bay", bn: "বে" },
];

function NamePronunciation() {
  const [hovered, setHovered] = useState(null);

  const Syl = ({ syl, text, gap }) => (
    <span
      onMouseEnter={() => setHovered(syl.key)}
      onMouseLeave={() => setHovered(null)}
      style={{
        cursor: "default",
        color: hovered === syl.key ? RUST : INK,
        fontWeight: hovered === syl.key ? 700 : 400,
        transition: "color 0.1s, font-weight 0.1s",
        marginRight: gap ? "0.35em" : 0,
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="flex flex-wrap items-start gap-x-10 gap-y-3">
      <div>
        <p className="text-lg" style={{ fontFamily: SERIF }}>
          {NAME_SYLLABLES.map((syl, i) => (
            <React.Fragment key={syl.key}>
              <Syl syl={syl} text={syl.en} gap={i === 3} />
              {i < NAME_SYLLABLES.length - 1 && i !== 3 && <span style={{ color: MUTED }}>-</span>}
            </React.Fragment>
          ))}
        </p>
        <p className="mt-0.5 text-sm italic" style={{ fontFamily: SERIF, color: MUTED }}>
          (approximate{" "}
          <a href="https://en.wikipedia.org/wiki/Pronunciation_respelling_for_English" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
            respelling
          </a>
          )
        </p>
      </div>

      <div>
        <p className="text-lg" style={{ fontFamily: SERIF }}>
          {NAME_SYLLABLES.map((syl, i) => (
            <Syl key={syl.key} syl={syl} text={syl.bn} gap={i === 3} />
          ))}
        </p>
        <p className="mt-0.5 text-sm italic" style={{ fontFamily: SERIF, color: MUTED }}>
          (
          <a href="https://en.wikipedia.org/wiki/Bengali%E2%80%93Assamese_script" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
            Bengali
          </a>{" "}
          script)
        </p>
      </div>
    </div>
  );
}

// ---------------- pages ----------------

function HomePage({ onNavigate }) {
  return (
    <PaperShell>
      <ArxivBar tag="2026.08" />

      {/* Two explicit columns: left = name/abstract/contact, right = headshot/updates.
          Right column is wider (1.15fr vs 0.85fr) to give the headshot+contact
          block more room. Below 700px this collapses to one column, stacking
          left-block then right-block, in that order. */}
      <div
        className="home-two-col grid gap-10 sm:gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        <style>{`
          @media (min-width: 700px) {
            .home-two-col { grid-template-columns: 0.85fr 1.15fr !important; }
          }
        `}</style>
        {/* LEFT: Name + Abstract + Contact info */}
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-4xl sm:text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
              Oyendrila Dobe
            </h1>
            <p className="text-base" style={{ fontFamily: SERIF, fontStyle: "italic", color: MUTED }}>
              Applied Scientist · Amazon Web Services
            </p>
          </div>

          <div className="border px-5 py-4" style={{ borderColor: PEACH, background: "#FFF9F5" }}>
            <p className="mb-2 text-sm uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: RUST, fontWeight: 600 }}>
              Abstract
            </p>
            <p className="text-[0.8rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
              I am part of the <a href="https://www.amazon.science/research-areas/automated-reasoning" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
                ARG@AWS
              </a>{" "}. My current focus in on building <a href="https://en.wikipedia.org/wiki/Neuro-symbolic_AI" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
                neurosymbolic
              </a>{" "} solutions. These can we used to detect and restrict unwanted agent behaviour.
            More broadly, I am interested in understanding how to express system behaviours as specifications.
            This includes:
            </p>
              <ul className="list-disc pl-5 text-[0.8rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
                <li>Designing of specification languages</li>
                <li>Autoformalization of natural language specs to a formal form</li>
              </ul>

            <blockquote className="my-3 border-l-2 pl-3 text-[0.8rem] italic" style={{ borderColor: ORANGE, color: MUTED, fontFamily: SERIF }}>
              "Who builds a house without drawing blueprints!" — Leslie Lamport
            </blockquote>
            <p className="text-[0.8rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
              I received my Ph.D. from Michigan State University (Go Green!). 
              My thesis focused on model checking of probabilistic hyperproperties 
              under the supervision of <a href="https://www.cse.msu.edu/tart/profile/borzoo" target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
                Prof. Borzoo Bonakdarpour.
              </a>{" "} 
            </p>  
            <p className="text-[0.8rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}> 
              Outside CS, I love watching and playing racquet sports (badminton: 10+ years, 
              tennis: recently started), a used-book collector, and a national park buff.
            </p>
            <p className="mt-3 text-[0.8rem]" style={{ fontFamily: MONO, color: MUTED }}>
              <span style={{ color: RUST }}>Keywords —</span> formal verification, agentic-AI, neurosymbolic, hyperproperties
            </p>
          </div>

        </div>

        {/* RIGHT: Headshot + Contact (side by side) + Recent Updates */}
        <div>
          <div className="mb-8 flex items-start gap-5">
            <img
              src="/assets/img/oyendrila.jpeg"
              alt="Oyendrila Dobe"
              className="shrink-0 object-cover"
              style={{ border: `1px solid ${INK}`, width: "176px", height: "176px", background: PEACH }}
              onError={(e) => {
                // graceful fallback if the real photo hasn't been added to
                // public/assets/img/ yet, so layout doesn't break
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='176' height='176'><rect width='176' height='176' fill='${PEACH}'/><text x='88' y='96' font-family='monospace' font-size='18' fill='${RUST}' text-anchor='middle'>OD</text></svg>`
                  );
              }}
            />
            <div style={{ marginTop: "-6px" }}>
              <h2
                className="mb-3 text-3xl"
                style={{ fontFamily: SERIF, fontWeight: 700, color: INK, marginTop: 0, lineHeight: 1 }}
              >
                Contact
              </h2>
              <ul className="mb-4 space-y-1 text-base" style={{ fontFamily: MONO, color: TEAL }}>
                <li>
                  <span style={{ color: RUST }}>Personal —</span>{" "}
                  <a href="mailto:oyendrila.dobe@gmail.com" className="underline hover:opacity-80" style={{ color: TEAL }}>
                      oyendrila.dobe@gmail.com
                  </a>
                </li>
                <li>
                  <span style={{ color: RUST }}>Work —</span>{" "}
                  <a href="mailto:dobeoyen@amazon.com" className="underline hover:opacity-80" style={{ color: TEAL }}>
                            dobeoyen@amazon.com
                  </a>
                </li>
                <li>
                  <span style={{ color: RUST }}>Location —</span> Boston, MA
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2 py-1 text-sm transition-colors hover:opacity-80"
                    style={{ fontFamily: MONO, border: `1px solid ${TEAL}`, color: TEAL }}
                  >
                    <Icon size={11} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <h2
            className="mb-2 text-xl"
            style={{ fontFamily: SERIF, fontWeight: 700, color: INK, marginTop: 0 }}
          >
            Recent Updates <span style={{ color: MUTED }}> </span>{" "}
            <span className="text-base font-normal" style={{ color: MUTED }}>
              (
              <button
                onClick={() => onNavigate("updates")}
                className="underline"
                style={{ fontFamily: SERIF, color: TEAL }}
              >
                Details
              </button>
              )
            </span>
          </h2>
          <table className="w-full border-collapse text-[0.8rem]" style={{ fontFamily: SERIF, color: INK }}>
            <thead>
              <tr style={{ borderTop: `1.5px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
                <th className="py-1.5 pr-2 text-left font-semibold" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>DATE</th>
                <th className="py-1.5 text-left font-semibold" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NOTE</th>
              </tr>
            </thead>
            <tbody>
              {groupByDate(updates.slice(0, 4)).map((g, gi, groups) => {
                const isLastGroup = gi === groups.length - 1;
                return g.items.map((u, ui) => {
                  const isLastItemInGroup = ui === g.items.length - 1;
                  return (
                    <tr
                      key={`${gi}-${ui}`}
                      style={{
                        borderBottom: isLastItemInGroup ? `1.5px solid ${INK}` : `1px solid ${PEACH}`,
                      }}
                    >
                      {ui === 0 && (
                        <td
                          rowSpan={g.items.length}
                          className="py-2 pr-2 align-top whitespace-nowrap"
                          style={{ color: TEAL, fontFamily: MONO, fontSize: "0.87rem", borderRight: `1px solid ${PEACH}` }}
                        >
                          {g.date}
                        </td>
                      )}
                      <td className="py-2 pl-3 align-top">
                        {u.href ? (
                          <a href={u.href} target="_blank" rel="noreferrer" className="underline" style={{ color: RUST }}>
                            {u.text}
                          </a>
                        ) : (
                          u.text
                        )}
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>

          <div className="mt-8">
            <p className="mb-2 text-sm font-semibold" style={{ fontFamily: MONO, color: RUST }}>
              Pronouncing My Name
            </p>
            <NamePronunciation />
          </div>
        </div>
      </div>
    </PaperShell>
  );
}

const UPDATE_CATEGORIES = [
  { id: "position", label: "positions", Icon: Briefcase },
  { id: "publication", label: "publications", Icon: FileText },
  { id: "service", label: "service", Icon: Handshake },
  { id: "talk", label: "talks", Icon: Mic },
];

function UpdatesPage() {
  const [activeCat, setActiveCat] = useState(null);
  const filtered = activeCat ? updates.filter((u) => u.type === activeCat) : updates;

  return (
    <PaperShell>
      <ArxivBar tag="2026.08" />
      <h1 className="mb-1 text-center text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
        Updates: A Timeline
      </h1>
      <p className="mb-6 text-center text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        recent milestones, most recent first — click a category to filter
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {UPDATE_CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = activeCat === id;
          return (
            <button
              key={id}
              onClick={() => setActiveCat(isActive ? null : id)}
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors"
              style={{
                fontFamily: MONO,
                background: isActive ? RUST : "transparent",
                color: isActive ? WHITE : RUST,
                border: `1px solid ${RUST}`,
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      <TableTitle n="I">Chronological Log of Notable Events</TableTitle>
      {filtered.length === 0 ? (
        <p className="text-center text-sm" style={{ fontFamily: MONO, color: MUTED }}>
          No entries in this category yet.
        </p>
      ) : (
        <table className="w-full border-collapse text-[1.01rem]" style={{ fontFamily: SERIF, color: INK }}>
          <thead>
            <tr style={{ borderTop: `1.5px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
              <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>DATE</th>
              <th className="py-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NOTE</th>
            </tr>
          </thead>
          <tbody>
            {groupByDate(filtered).map((g, gi) =>
              g.items.map((u, ui) => {
                const isLastItemInGroup = ui === g.items.length - 1;
                return (
                  <tr key={`${gi}-${ui}`} style={{ borderBottom: isLastItemInGroup ? `1.5px solid ${INK}` : `1px solid ${PEACH}` }}>
                    {ui === 0 && (
                      <td
                        rowSpan={g.items.length}
                        className="py-2.5 pr-2 align-top whitespace-nowrap"
                        style={{ color: TEAL, fontFamily: MONO, fontSize: "0.9rem", borderRight: `1px solid ${PEACH}` }}
                      >
                        {g.date}
                      </td>
                    )}
                    <td className="py-2.5 pl-3 align-top">
                      {u.images && u.images.length > 0 && (
                        <div className="float-right ml-3 mb-1 flex shrink-0 flex-wrap gap-1.5">
                          {u.images.map((src, imgI) => (
                            <a
                              key={imgI}
                              href={src}
                              target="_blank"
                              rel="noreferrer"
                              className="block"
                              style={{ border: `1px solid ${INK}` }}
                            >
                              <img src={src} alt="" className="block h-24 w-48 object-cover" style={{ background: PEACH }} />
                            </a>
                          ))}
                        </div>
                      )}
                      {u.href ? (
                        <a href={u.href} target="_blank" rel="noreferrer" className="underline" style={{ color: RUST }}>
                          {u.text}
                        </a>
                      ) : (
                        u.text
                      )}
                      {u.description && (
                        <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>
                          {linkify(u.description, RUST)}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </PaperShell>
  );
}

function ResearchPage() {
  const [view, setView] = useState("topic");
  return (
    <PaperShell>
      <ArxivBar tag="2026.08" />
      <h1 className="mb-1 text-center text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
        Research
      </h1>

      <Toggle
         options={[
          { id: "topic", label: "Topics" },
          { id: "publications", label: "Publications" },
          { id: "fetched_papers", label: "Reading Radar" },
          { id: "blog", label: "Blog" },
        ]}
        active={view}
        onChange={setView}
      />

      {view === "topic" && (
        <>
        <div>
          <SectionHeading>Specifications · AR@AWS</SectionHeading>
          <p className="mb-4 text-justify text-[1.03rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            When formally verifying a system, the two main inputs are:
            <ul className="list-disc pl-5  leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
                <li>The model: This can either be the system itself in its truest form or an abstracted version of the system to help focus on the specific module of interest</li>
                <li>The specification: This refers to the property you want to verify/ensure holds in the system</li>
            </ul>
          </p>
        
          <svg viewBox="0 0 680 266" style={{ width: "70%", height: "auto", display: "block", margin: "0 auto" }} role="img">  <title>Software development pipeline with focus shift overlay</title>
            <desc>
              Four-stage flow — write spec, write code, review, deploy — with bars above showing
              traditional-era effort concentrated on code writing, and bars below showing agentic-era
              effort concentrated on spec and review.
            </desc>
            <defs>
              <marker id="pipeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            <text x="40" y="75" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Before</text>
            <rect x="142.5" y="90" width="60" height="10" rx="3" fill={PEACH} opacity="0.75" stroke={ORANGE} strokeWidth="0.5" />
            <rect x="277.5" y="57.5" width="60" height="42.5" rx="3" fill={RUST} opacity="0.55" stroke={RUST} strokeWidth="0.5" />
            <rect x="412.5" y="87.5" width="60" height="12.5" rx="3" fill={TEAL} opacity="0.55" stroke={TEAL} strokeWidth="0.5" />
            <rect x="547.5" y="92.5" width="60" height="7.5" rx="3" fill={MUTED} opacity="0.4" stroke={MUTED} strokeWidth="0.5" />

            <rect x="115" y="110" width="115" height="56" rx="8" fill={WHITE} stroke={ORANGE} strokeWidth="0.5" />
            <text x="172.5" y="128" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "14px", fill: INK }}>Write spec</text>
            <text x="172.5" y="146" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Define scope</text>

            <line x1="230" y1="138" x2="250" y2="138" stroke={INK} strokeWidth="0.5" markerEnd="url(#pipeArrow)" />

            <rect x="250" y="110" width="115" height="56" rx="8" fill={WHITE} stroke={RUST} strokeWidth="0.5" />
            <text x="307.5" y="128" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "14px", fill: INK }}>Write code</text>
            <text x="307.5" y="146" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Implement spec</text>

            <line x1="365" y1="138" x2="385" y2="138" stroke={INK} strokeWidth="0.5" markerEnd="url(#pipeArrow)" />

            <rect x="385" y="110" width="115" height="56" rx="8" fill={WHITE} stroke={TEAL} strokeWidth="0.5" />
            <text x="442.5" y="128" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "14px", fill: INK }}>Review</text>
            <text x="442.5" y="146" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Peer + QA check</text>

            <line x1="500" y1="138" x2="520" y2="138" stroke={INK} strokeWidth="0.5" markerEnd="url(#pipeArrow)" />

            <rect x="520" y="110" width="115" height="56" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="0.5" />
            <text x="577.5" y="128" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "14px", fill: INK }}>Deploy</text>
            <text x="577.5" y="146" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Ship to prod</text>

            <text x="40" y="201" dominantBaseline="central" style={{ fontFamily: MONO, fontSize: "12px", fill: MUTED }}>Now</text>
            <rect x="142.5" y="176" width="60" height="37.5" rx="3" fill={PEACH} opacity="0.75" stroke={ORANGE} strokeWidth="0.5" />
            <rect x="277.5" y="176" width="60" height="12.5" rx="3" fill={RUST} opacity="0.55" stroke={RUST} strokeWidth="0.5" />
            <rect x="412.5" y="176" width="60" height="35" rx="3" fill={TEAL} opacity="0.55" stroke={TEAL} strokeWidth="0.5" />
            <rect x="547.5" y="176" width="60" height="10" rx="3" fill={MUTED} opacity="0.4" stroke={MUTED} strokeWidth="0.5" />
          </svg>
        </div>
        <p className="mb-2 text-center text-sm" style={{ fontFamily: MONO, color: MUTED }}>
            The pipeline, with effort concentration overlaid above and below
          </p>
          <p className="mb-4 text-justify text-[1.03rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            In this modern era of agentic software engineering, where the models are becoming increasingly capable of accomplishing coding tasks, the responsibility as a developer has shifted to either sides of the pipeline. 
            <ul className="list-disc pl-5  leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
                <li>On the left, its specification generation: Being able to generate unambiguous and consistent specs, would prevent the model from making silent assumptions or choices during code generation. A clear specification can help prevent roundtrips </li>
                <li>On the right, its code review: This isn't a new problem. However, the higher pace of code production is surfacing this existing problem and making it the new pipeline bottleneck.</li>
            </ul>
          However, it is not a totally hopeless world. The strength these models can now be harnessed to identify specifications from existing code or annotate code to help reduce the barrier to formal verification. 
          </p>

          
        <div>
          <SectionHeading>Formal Verification of Hyperproperties</SectionHeading>
          <p className="mb-4 text-justify text-[1.03rem] leading-relaxed" style={{ fontFamily: SERIF, color: INK }}>
            My doctoral research focused on formally verifying
            probabilistic systems against hyperproperties — specifications
            that relate multiple execution traces at once, such as
            information-flow security and fairness. The work spans model
            checking algorithms, lightweight runtime verification
            techniques, and their application to safety-critical systems. 
          </p>

          <a href="https://www.proquest.com/openview/7268bab79d2f1e572108c0d616bd443e/1?pq-origsite=gscholar&cbl=18750&diss=y"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm"
            style={{ fontFamily: MONO, background: RUST, color: WHITE }}
          >
            Thesis <ExternalLink size={13} />
          </a>
        </div>
        </>
      )}

      {view === "publications" && (
        <div>
          <PublicationGroup title="Blog Posts" items={publications.filter((p) => p.type === "blogpost")} />
          <PublicationGroup title="Conference Papers" items={publications.filter((p) => p.type === "conference")} />
          <PublicationGroup title="Journal Papers" items={publications.filter((p) => p.type === "journal")} />
          <PublicationGroup title="Undergraduate Research" items={publications.filter((p) => p.type === "undergraduate")} />
        </div>
      )}


      {view === "blog" && (
        <div>
          <BlogSection posts={researchBlogPosts} />
        </div>
      )}

      {view === "fetched_papers" && <PapersFeed />}
      
    </PaperShell>
  );
}

function ResumeCvPage() {
  const [view, setView] = useState("cv");
  const doc = view === "resume"
    ? { label: "Resume", href: "/assets/pdf/Resume.pdf" }
    : { label: "CV", href: "/assets/pdf/CV.pdf" };

  return (
    <PaperShell>
      <ArxivBar tag="2026.08" />
      <h1 className="mb-1 text-center text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
        Resume / CV
      </h1>
     
      <Toggle
        options={[
          { id: "cv", label: "CV" },
          { id: "resume", label: "Resume" },
        ]}
        active={view}
        onChange={setView}
      />

      <div className="flex items-center justify-between border-x border-t px-4 py-2" style={{ borderColor: PEACH, background: "#FFF9F5" }}>
        <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: MONO, color: RUST }}>
          <FileText size={14} /> {doc.label}.pdf
        </span>
        <a
          href={doc.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm underline"
          style={{ fontFamily: MONO, color: TEAL }}
        >
          Open in new tab <ExternalLink size={11} />
        </a>
      </div>
      <object
        data={doc.href}
        type="application/pdf"
        width="100%"
        height="800"
        style={{ border: `1px solid ${INK}`, display: "block" }}
      >
        <p className="p-6 text-center text-sm" style={{ fontFamily: SERIF, color: MUTED }}>
          Your browser does not support inline PDF viewing. Please{" "}
          <a href={doc.href} target="_blank" rel="noreferrer" className="underline" style={{ color: TEAL }}>
            download the PDF
          </a>{" "}
          instead.
        </p>
      </object>
    </PaperShell>
  );
}

function MarginaliaPage() {
  const [view, setView] = useState("movies");
  return (
    <PaperShell>
      <ArxivBar tag="2026.08" />
      <h1 className="mb-1 text-center text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>
        Marginalia
      </h1>
      <p className="mb-6 text-center text-sm" style={{ fontFamily: MONO, color: MUTED }}>
        Nook for all my non-academic things
      </p>
      <Toggle
        options={[
          { id: "movies", label: "Movies" },
          { id: "music", label: "Music" },
          { id: "books", label: "Books" },
          { id: "blog", label: "Blog" },
        ]}
        active={view}
        onChange={setView}
      />

      {view === "movies" && (
        <>
          <TableTitle n="I">Selected Movies, Ratings, and Remarks</TableTitle>
          <table className="w-full border-collapse text-[0.99rem]" style={{ fontFamily: SERIF, color: INK }}>
            <thead>
              <tr style={{ borderTop: `1.5px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NO.</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>TITLE</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>YEAR</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>RATING</th>
                <th className="py-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NOTES</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m, i) => (
                <tr key={m.title} style={{ borderBottom: i === movies.length - 1 ? `1.5px solid ${INK}` : `1px solid ${PEACH}` }}>
                  <td className="py-2 pr-2 align-top" style={{ fontFamily: MONO, fontSize: "0.87rem", color: TEAL }}>{i + 1}</td>
                  <td className="py-2 pr-2 align-top font-semibold">{m.title}</td>
                  <td className="py-2 pr-2 align-top" style={{ color: MUTED }}>{m.year}</td>
                  <td className="py-2 pr-2 align-top"><Rating n={m.rating} /></td>
                  <td className="py-2 align-top" style={{ color: MUTED }}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === "music" && (
        <>
          <TableTitle n="II">Albums and Artists, with Remarks</TableTitle>
          <table className="w-full border-collapse text-[0.99rem]" style={{ fontFamily: SERIF, color: INK }}>
            <thead>
              <tr style={{ borderTop: `1.5px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NO.</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>TITLE</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>ARTIST</th>
                <th className="py-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NOTES</th>
              </tr>
            </thead>
            <tbody>
              {music.map((m, i) => (
                <tr key={m.title} style={{ borderBottom: i === music.length - 1 ? `1.5px solid ${INK}` : `1px solid ${PEACH}` }}>
                  <td className="py-2 pr-2 align-top" style={{ fontFamily: MONO, fontSize: "0.87rem", color: TEAL }}>{i + 1}</td>
                  <td className="py-2 pr-2 align-top font-semibold">{m.title}</td>
                  <td className="py-2 pr-2 align-top" style={{ color: MUTED }}>{m.artist}</td>
                  <td className="py-2 align-top" style={{ color: MUTED }}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === "books" && (
        <>
          <TableTitle n="III">Books, Authors, and Reading Status</TableTitle>
          <table className="w-full border-collapse text-[0.99rem]" style={{ fontFamily: SERIF, color: INK }}>
            <thead>
              <tr style={{ borderTop: `1.5px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NO.</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>TITLE</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>AUTHOR</th>
                <th className="py-2 pr-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>STATUS</th>
                <th className="py-2 text-left" style={{ fontFamily: MONO, fontSize: "0.81rem", color: RUST }}>NOTES</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.title} style={{ borderBottom: i === books.length - 1 ? `1.5px solid ${INK}` : `1px solid ${PEACH}` }}>
                  <td className="py-2 pr-2 align-top" style={{ fontFamily: MONO, fontSize: "0.87rem", color: TEAL }}>{i + 1}</td>
                  <td className="py-2 pr-2 align-top font-semibold">{b.title}</td>
                  <td className="py-2 pr-2 align-top" style={{ color: MUTED }}>{b.author}</td>
                  <td className="py-2 pr-2 align-top">
                    <span className="px-1.5 py-0.5 text-sm" style={{ fontFamily: MONO, background: PEACH, color: RUST }}>{b.status}</span>
                  </td>
                  <td className="py-2 align-top" style={{ color: MUTED }}>{b.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === "blog" && (
        <div>
          <BlogSection posts={marginaliaBlogPosts} />
        </div>
      )}
    </PaperShell>
  );
}

// ---------------- top-level nav + shell ----------------

const SHOW_MARGINALIA = false;

const ALL_TABS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "updates", label: "Updates", Icon: History },
  { id: "research", label: "Research", Icon: FlaskConical },
  { id: "resumecv", label: "Resume/CV", Icon: FileText },
  { id: "marginalia", label: "Marginalia", Icon: NotebookPen },
];

const TABS = ALL_TABS.filter((t) => t.id !== "marginalia" || SHOW_MARGINALIA);

export default function PersonalSite() {
  const [page, setPage] = useState("home");

  return (
    <div className="w-full" style={{ background: BACKDROP, fontFamily: SERIF }}>
      <div className="mx-auto max-w-[1320px] px-4 py-4 sm:px-8">
        <nav className="mb-[6px] flex flex-wrap justify-center gap-1 text-base">
          {TABS.map((t) => {
            const active = page === t.id;
            const { Icon } = t;
            return (
              <button
                key={t.id}
                onClick={() => setPage(t.id)}
                className="flex items-center gap-1.5 px-4 py-1.5 transition-colors"
                style={{
                  fontFamily: MONO,
                  fontSize: "0.9rem",
                  background: active ? INK : "transparent",
                  color: active ? PEACH : INK,
                  border: `1px solid ${INK}`,
                }}
              >
                <Icon size={13} /> {t.label}
              </button>
            );
          })}
        </nav>

        {page === "home" && <HomePage onNavigate={setPage} />}
        {page === "updates" && <UpdatesPage />}
        {page === "research" && <ResearchPage />}
        {page === "resumecv" && <ResumeCvPage />}
        {page === "marginalia" && SHOW_MARGINALIA && <MarginaliaPage />}
        
        <p className="mt-3 text-center text-sm" style={{ fontFamily: MONO, color: INK, opacity: 0.6 }}>
          created with ♥ by Oyendrila and Claude
        </p>
      </div>
    </div>
  );
}
