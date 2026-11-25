"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { img } from "./catalog";
import { useHydrated } from "./wishlist";

type Release = { id: string; date: string; tag: string; title: string; excerpt: string; body: string[]; img: string };

// Placeholder press releases — replace with real announcements.
const RELEASES: Release[] = [
  { id: "winter-26", date: "2026-11-02", tag: "Collection", title: "Winter 2026 collection brings warm woods and soft boucle home", excerpt: "Forty new pieces inspired by slow evenings, layered textures and the comfort of gathering.", img: "1555041469-a586c61ea9bc", body: ["Our Winter 2026 collection introduces forty new pieces designed for slow evenings at home, from deep boucle sofas to solid walnut dining tables.", "Every piece is made in our Gazipur workshop using certified timber and low-VOC finishes, and is delivered and installed free across the country.", "The collection is available in all showrooms and online from today."] },
  { id: "ctg-showroom", date: "2026-08-18", tag: "Showrooms", title: "New flagship showroom opens in Chattogram", excerpt: "A 20,000 sq ft space with room sets, a fabric library and a free design studio.", img: "1618220179428-22790b461013", body: ["We have opened our largest showroom outside Dhaka, at GEC Circle in Chattogram.", "The two-floor space features fully styled room sets, a fabric and finish library, and a design studio offering free consultations.", "The opening created 60 new local jobs across sales, design and delivery."] },
  { id: "trees", date: "2026-04-22", tag: "Sustainability", title: "100,000 trees planted through our One Bed, One Tree programme", excerpt: "A milestone for our reforestation partnership, five years after it began.", img: "1505693416388-ac5ce068fe85", body: ["Since 2021 we have planted a tree for every bed sold. This Earth Day we passed 100,000 trees.", "Working with local partners, the trees have been planted across community land in the north of the country.", "The programme now extends to every dining table sold as well."] },
  { id: "online", date: "2025-12-01", tag: "Company", title: "New online store with free installation nationwide", excerpt: "Shop every collection online, with live delivery tracking and 0% EMI.", img: "1586023492125-27b2c045efd7", body: ["Our new online store lets customers browse every collection, save a wishlist, and track deliveries live.", "Free installation is included for every order, wherever you are in the country.", "0% EMI for up to 12 months is available on most bank cards."] },
  { id: "award-25", date: "2025-06-10", tag: "Awards", title: "Named Furniture Brand of the Year for the third time", excerpt: "Recognised for design, craftsmanship and customer service.", img: "1617806118233-18e1de247200", body: ["We are proud to have been named Furniture Brand of the Year for the third time.", "Judges highlighted our in-house craftsmanship, our free installation service, and our commitment to responsibly sourced wood.", "Thank you to our 1,200 colleagues who make it happen every day."] },
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function PressReleases() {
  const years = useMemo(() => ["All", ...Array.from(new Set(RELEASES.map((r) => r.date.slice(0, 4))))], []);
  const [year, setYear] = useState("All");
  const [reading, setReading] = useState<Release | null>(null);
  const list = RELEASES.filter((r) => year === "All" || r.date.startsWith(year));
  const [featured, ...rest] = list;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Newsroom</p>
          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Latest news</h2>
        </div>
        <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={`rounded-full px-5 py-2 text-[14px] font-medium transition-all duration-300 ${year === y ? "bg-ink text-white" : "text-charcoal hover:text-ink"}`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div key={year} className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {featured && (
          <button onClick={() => setReading(featured)} className="mega-in group relative block min-h-[420px] overflow-hidden text-left lg:row-span-3">
            <Image src={img(featured.img, 1400)} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
              <span className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em]">
                <span className="bg-red px-2.5 py-1">{featured.tag}</span>
                <span className="text-white/70">{fmt(featured.date)}</span>
              </span>
              <span className="mt-4 block max-w-xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-tight">{featured.title}</span>
              <span className="mt-3 block max-w-lg text-[15px] leading-relaxed text-white/75">{featured.excerpt}</span>
              <span className="mt-6 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors group-hover:border-white">
                Read release <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </span>
          </button>
        )}
        {rest.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setReading(r)}
            className="mega-in group flex gap-5 bg-white p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.45)]"
            style={{ "--delay": `${(i + 1) * 80}ms` } as React.CSSProperties}
          >
            <span className="relative h-28 w-28 shrink-0 overflow-hidden md:h-32 md:w-36">
              <Image src={img(r.img, 400)} alt="" fill sizes="144px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span className="flex min-w-0 flex-col py-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red">
                {r.tag} <span className="text-muted">· {fmt(r.date)}</span>
              </span>
              <span className="mt-2 line-clamp-2 text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-red">{r.title}</span>
              <span className="mt-1.5 line-clamp-2 text-[14px] text-muted">{r.excerpt}</span>
            </span>
          </button>
        ))}
      </div>

      <ReleaseModal release={reading} onClose={() => setReading(null)} />
    </div>
  );
}

function ReleaseModal({ release, onClose }: { release: Release | null; onClose: () => void }) {
  const mounted = useHydrated();
  const [last, setLast] = useState(release);
  const closeRef = useRef<HTMLButtonElement>(null);
  if (release && release !== last) setLast(release);
  const open = !!release;
  const r = release ?? last;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !r) return null;
  return createPortal(
    <div className={`fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/55 backdrop-blur-[4px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <article
        role="dialog"
        aria-modal="true"
        aria-label={r.title}
        className={`relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.98] opacity-0"}`}
      >
        <div className="relative h-56 shrink-0 md:h-72">
          <Image src={img(r.img, 1400)} alt="" fill sizes="768px" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow transition-transform duration-300 hover:rotate-90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <span className="absolute bottom-4 left-6 bg-red px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:left-10">{r.tag}</span>
        </div>
        <div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          <p className="text-[13px] text-muted">Press release · {fmt(r.date)}</p>
          <h3 className="mt-3 text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight text-ink">{r.title}</h3>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-charcoal">
            {r.body.map((p, i) => (
              <p key={i} className={i === 0 ? "flow-root first-letter:float-left first-letter:mr-2 first-letter:text-[52px] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-red" : ""}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <CopyButton text={`${r.title}\n\n${r.body.join("\n\n")}`} label="Copy text" />
            <a href="#kit" onClick={onClose} className="border border-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">
              Get images
            </a>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
}

export function CopyButton({ text, label, dark = false }: { text: string; label: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
      className={`inline-flex items-center gap-2 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
        done ? "bg-[#2f8f4e] text-white" : dark ? "bg-white text-ink hover:bg-red hover:text-white" : "bg-ink text-white hover:bg-red"
      }`}
    >
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M16 8V5.5A1.5 1.5 0 0014.5 4h-9A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16H8" /></svg>
      )}
      {done ? "Copied" : label}
    </button>
  );
}

/** Press-kit download card: a short "preparing" state, then a tick. No real files yet. */
export function KitCard({ t, s, size, d, green = false }: { t: string; s: string; size: string; d: string; green?: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  return (
    <button
      onClick={() => {
        if (state !== "idle") return;
        setState("busy");
        setTimeout(() => setState("done"), 1100);
        setTimeout(() => setState("idle"), 3200);
      }}
      className="group flex h-full w-full flex-col bg-white p-7 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.45)]"
    >
      <span className={`grid h-14 w-14 place-items-center rounded-full bg-[#f6f5f3] transition-all duration-500 group-hover:text-white ${green ? "text-[#2f8f4e] group-hover:bg-[#2f8f4e]" : "text-red group-hover:bg-red"}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
      </span>
      <span className="mt-7 text-[19px] font-semibold text-ink">{t}</span>
      <span className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted">{s}</span>
      <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[13px]">
        <span className="text-muted">{size}</span>
        <span className={`flex items-center gap-2 font-semibold uppercase tracking-[0.12em] ${state === "done" ? "text-[#2f8f4e]" : green ? "text-ink group-hover:text-[#2f8f4e]" : "text-ink group-hover:text-red"}`}>
          {state === "busy" ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-line border-t-red" /> Preparing
            </>
          ) : state === "done" ? (
            "✓ Ready"
          ) : (
            <>
              Download
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-y-0.5"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>
            </>
          )}
        </span>
      </span>
    </button>
  );
}
