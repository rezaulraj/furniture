"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FEATURED, MEGA } from "./menuData";
import { subHref } from "./catalog";

const img = (id: string, w = 300) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const POPULAR = ["Sofa Set", "King Size Bed", "Dining Table", "Wardrobe", "Office Chair", "TV Cabinet", "Center Table", "Bunk Bed"];

// Flatten menu data once: every product preview and every category / sub-category.
const PRODUCTS = Object.entries(FEATURED).flatMap(([room, list]) => list.map((p) => ({ ...p, room })));
const CATEGORIES = Array.from(
  new Map(
    Object.entries(MEGA).flatMap(([room, m]) =>
      m.columns.flat().flatMap((g) => [
        [`${g.title}|${room}`, { name: g.title, room }] as const,
        ...g.links.map((l) => [`${l}|${room}`, { name: l, room }] as const),
      ]),
    ),
  ).values(),
);

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent font-semibold text-red">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  // Focus on open, Esc to close, lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const query = q.trim();
  const { cats, prods } = useMemo(() => {
    if (!query) return { cats: [], prods: PRODUCTS.slice(0, 4) };
    const k = query.toLowerCase();
    return {
      cats: CATEGORIES.filter((c) => c.name.toLowerCase().includes(k) || c.room.toLowerCase().includes(k)).slice(0, 8),
      prods: PRODUCTS.filter((p) => p.name.toLowerCase().includes(k) || p.room.toLowerCase().includes(k)).slice(0, 4),
    };
  }, [query]);

  const nothing = query && cats.length === 0 && prods.length === 0;

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <button
        aria-label="Close search"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-[6px] transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        className={`relative max-h-[92vh] overflow-y-auto bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="bg-red px-2.5 pb-0.5 pt-1 text-[20px] font-extrabold uppercase leading-none tracking-[0.04em] text-white">
              Furniture
            </span>
            <button
              onClick={onClose}
              aria-label="Close search"
              className="group flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              <span className="hidden sm:inline">Close</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-90 group-hover:border-ink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className={`group mt-8 flex items-center gap-4 border-b-2 border-line pb-4 transition-all delay-150 duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-within:border-ink md:mt-10 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 text-muted transition-colors group-focus-within:text-ink">
              <circle cx="10" cy="10" r="7" />
              <path d="M15.2 15.2L21 21" />
            </svg>
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="What are you looking for?"
              className="w-full bg-transparent text-[clamp(1.5rem,3vw,2.5rem)] font-light text-ink outline-none placeholder:text-[#b5b5b5] [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  input.current?.focus();
                }}
                className="shrink-0 text-[13px] font-medium text-muted transition-colors hover:text-red"
              >
                Clear
              </button>
            )}
          </form>

          {/* Results */}
          <div
            className={`mt-9 grid gap-10 transition-all delay-300 duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:grid-cols-[260px_1fr] md:gap-14 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {/* Left: popular searches or matching categories */}
            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-muted">
                {query ? "Categories" : "Popular searches"}
              </p>
              {!query ? (
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      onClick={() => setQ(p)}
                      className="rounded-full border border-line px-4 py-2 text-[14px] text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              ) : cats.length ? (
                <ul className="space-y-1">
                  {cats.map((c, i) => (
                    <li key={`${c.name}-${c.room}`} className="mega-in" style={{ "--delay": `${i * 30}ms` } as React.CSSProperties}>
                      <Link href={subHref(c.room, c.name)} onClick={onClose} className="group/c flex items-center justify-between gap-3 py-2 text-[15px] text-charcoal transition-colors hover:text-ink">
                        <span>
                          <Highlight text={c.name} q={query} />
                          <span className="ml-2 text-[12px] text-muted">in {c.room}</span>
                        </span>
                        <span className="-translate-x-1 text-red opacity-0 transition-all duration-300 group-hover/c:translate-x-0 group-hover/c:opacity-100">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[14px] text-muted">No matching categories.</p>
              )}
            </div>

            {/* Right: products */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-muted">
                  {query ? `Products for “${query}”` : "Trending now"}
                </p>
                {query && prods.length > 0 && (
                  <a href="#" className="link-line text-[13px] font-medium text-ink hover:text-red">
                    See all results
                  </a>
                )}
              </div>

              {nothing ? (
                <div className="flex flex-col items-start gap-3 py-6">
                  <p className="text-[22px] font-light text-ink">No results for “{query}”</p>
                  <p className="text-[14px] text-muted">Try a different word, or browse a popular search.</p>
                </div>
              ) : prods.length === 0 ? (
                <p className="py-6 text-[14px] text-muted">No matching products — see the categories on the left.</p>
              ) : (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                  {prods.map((p, i) => (
                    <a
                      key={`${p.name}-${query}`}
                      href="#"
                      className="mega-in group/p block"
                      style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
                    >
                      <div className="relative aspect-square overflow-hidden bg-mist">
                        <Image
                          src={img(p.img, 400)}
                          alt={p.name}
                          fill
                          sizes="(min-width:1024px) 220px, 45vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover/p:scale-[1.07]"
                        />
                        {p.tag && (
                          <span className="absolute left-2.5 top-2.5 bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-[15px] font-medium leading-snug text-ink transition-colors group-hover/p:text-red">
                        <Highlight text={p.name} q={query} />
                      </p>
                      <p className="mt-0.5 text-[13px] text-muted">
                        From <span className="font-semibold text-ink">৳{p.price}</span>
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
