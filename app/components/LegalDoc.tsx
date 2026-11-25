"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { PRIVACY, TERMS, UPDATED, type LegalSection } from "./legalContent";

type Tab = "terms" | "privacy";

// Tab lives in the URL hash (#privacy), so links can open the right document.
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readTab = (): Tab => (window.location.hash.startsWith("#privacy") ? "privacy" : "terms");
const useTab = () => useSyncExternalStore(subscribeHash, readTab, () => "terms" as Tab);
const setTab = (t: Tab) => {
  history.replaceState(null, "", t === "terms" ? location.pathname : "#privacy");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.scrollTo({ top: (document.getElementById("doc")?.offsetTop ?? 0) - 90, behavior: "smooth" });
};

export default function LegalDoc() {
  const tab = useTab();
  const sections = tab === "terms" ? TERMS : PRIVACY;
  const [active, setActive] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);

  // Scroll-spy for the contents list, plus reading progress through the document.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(`${tab}-${s.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id.replace(`${tab}-`, ""));
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      const doc = document.getElementById("doc");
      if (!doc) return;
      const r = doc.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(100, ((-r.top + 120) / total) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [tab, sections]);

  const go = (id: string) => {
    const el = document.getElementById(`${tab}-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] print:hidden" aria-hidden>
        <div className="h-full bg-red transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Tabs */}
      <div className="relative z-10 mx-auto -mt-8 flex w-fit gap-1 rounded-full bg-white p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] print:hidden">
        {(
          [
            ["terms", "Terms of Use"],
            ["privacy", "Privacy Policy"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
            className={`rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-500 md:px-9 ${tab === id ? "bg-ink text-white shadow" : "text-charcoal hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="doc" className="mx-auto mt-14 grid max-w-[1200px] items-start gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* Contents */}
        <aside className="lg:sticky lg:top-28 print:hidden">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">On this page</p>
          <nav className="relative mt-4 border-l border-line">
            <ul className="-ml-px">
              {sections.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => go(s.id)}
                      className={`flex w-full items-baseline gap-3 border-l-2 py-2 pl-4 text-left text-[14px] transition-all duration-300 ${on ? "border-red font-semibold text-ink" : "border-transparent text-muted hover:text-ink"}`}
                    >
                      <span className={`w-5 shrink-0 text-[12px] tabular-nums ${on ? "text-red" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8 flex gap-2">
            <button onClick={() => window.print()} className="flex flex-1 items-center justify-center gap-2 border border-line bg-white py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" /></svg>
              Print
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="grid w-12 place-items-center border border-line bg-white text-ink transition-colors hover:border-ink">↑</button>
          </div>
        </aside>

        {/* Document */}
        <article key={tab} className="mega-in min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold text-ink">{tab === "terms" ? "Terms of Use" : "Privacy Policy"}</h2>
            <span className="rounded-full bg-white px-4 py-2 text-[13px] text-muted">Last updated {UPDATED}</span>
          </div>
          <div className="mt-4">
            {sections.map((s, i) => (
              <Section key={s.id} s={s} n={i + 1} tab={tab} />
            ))}
          </div>
          {tab === "privacy" && <CookieSettings />}
          <div className="mt-14 flex flex-col items-start justify-between gap-6 bg-ink p-8 text-white md:flex-row md:items-center md:p-10 print:hidden">
            <div>
              <p className="text-[20px] font-semibold">Still have a question?</p>
              <p className="mt-1 text-[15px] text-white/65">Our team will explain anything in plain language.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/faq" className="border border-white/40 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-white hover:bg-white hover:text-ink">FAQ</Link>
              <Link href="/contact" className="bg-red px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-red-dark">Contact us</Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

function Section({ s, n, tab }: { s: LegalSection; n: number; tab: Tab }) {
  return (
    <section id={`${tab}-${s.id}`} className="group scroll-mt-28 border-b border-line py-10 last:border-0">
      <h3 className="flex items-baseline gap-4 text-[22px] font-semibold text-ink md:text-[24px]">
        <span className="text-[14px] font-semibold tabular-nums text-red">{String(n).padStart(2, "0")}</span>
        {s.title}
      </h3>
      <div className="mt-5 flex gap-4 border-l-[3px] border-[#2f8f4e] bg-[#eef6f0] px-5 py-4">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2f8f4e]">In short</span>
        <p className="text-[15px] font-medium leading-relaxed text-ink">{s.short}</p>
      </div>
      <div className="mt-5 space-y-4 text-[16px] leading-[1.8] text-charcoal">
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

/* ---------- Cookie preferences (saved in this browser) ---------- */

const KEY = "furniture:cookies";
type Prefs = { analytics: boolean; marketing: boolean };
const DEFAULT: Prefs = { analytics: true, marketing: false };
let cache: Prefs | null = null;
const listeners = new Set<() => void>();
const readPrefs = (): Prefs => {
  if (cache) return cache;
  try {
    cache = { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    cache = DEFAULT;
  }
  return cache!;
};
const writePrefs = (p: Prefs) => {
  cache = p;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
  listeners.forEach((l) => l());
};
const subscribePrefs = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

function CookieSettings() {
  const prefs = useSyncExternalStore(subscribePrefs, readPrefs, () => DEFAULT);
  const [saved, setSaved] = useState(false);
  const flash = (p: Prefs) => {
    writePrefs(p);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };
  const rows: { k: keyof Prefs | "essential"; t: string; s: string }[] = [
    { k: "essential", t: "Essential", s: "Keep the site working: your basket, wishlist and sign-in. Always on." },
    { k: "analytics", t: "Analytics", s: "Help us understand which pages are useful so we can improve them." },
    { k: "marketing", t: "Marketing", s: "Show you relevant offers on other websites and social media." },
  ];
  return (
    <section id="cookie-settings" className="mt-10 bg-white p-6 shadow-[0_25px_50px_-35px_rgba(0,0,0,0.4)] md:p-8 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[20px] font-semibold text-ink">Your cookie settings</h3>
        <span className={`text-[13px] font-medium text-[#2f8f4e] transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}>✓ Saved</span>
      </div>
      <ul className="mt-5 divide-y divide-line">
        {rows.map((r) => {
          const fixed = r.k === "essential";
          const on = fixed ? true : prefs[r.k as keyof Prefs];
          return (
            <li key={r.k} className="flex items-center justify-between gap-6 py-5">
              <span>
                <span className="block text-[16px] font-semibold text-ink">{r.t}</span>
                <span className="mt-0.5 block text-[14px] leading-relaxed text-muted">{r.s}</span>
              </span>
              <button
                role="switch"
                aria-checked={on}
                aria-label={r.t}
                disabled={fixed}
                onClick={() => !fixed && flash({ ...prefs, [r.k]: !on })}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${on ? "bg-[#2f8f4e]" : "bg-[#cfcfcf]"}`}
              >
                <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${on ? "translate-x-5" : ""}`} />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => flash({ analytics: true, marketing: true })} className="bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red">Accept all</button>
        <button onClick={() => flash({ analytics: false, marketing: false })} className="border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">Essential only</button>
      </div>
    </section>
  );
}
