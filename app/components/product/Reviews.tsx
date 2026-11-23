"use client";

import { useMemo, useState } from "react";
import type { Review } from "../catalog";
import { Stars } from "./BuyBox";

const PER_PAGE = 4;

export default function Reviews({ reviews, total, average }: { reviews: Review[]; total: number; average: number }) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<number | null>(null);
  const [helped, setHelped] = useState<number[]>([]);

  // Scale sample reviews up to the product's real review count for the breakdown bars.
  const breakdown = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((s) => reviews.filter((r) => r.rating === s).length);
    const sum = counts.reduce((a, b) => a + b, 0) || 1;
    return [5, 4, 3, 2, 1].map((s, i) => ({ star: s, n: Math.round((counts[i] / sum) * total) }));
  }, [reviews, total]);

  const list = filter ? reviews.filter((r) => r.rating === filter) : reviews;
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const shown = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const max = Math.max(...breakdown.map((b) => b.n), 1);

  return (
    <section id="reviews" className="scroll-mt-[100px] bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <h2 className="text-center text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium text-ink">
          Customer Reviews <span className="text-muted">({total})</span>
        </h2>
        <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />

        {/* Summary */}
        <div className="mt-12 grid items-center gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          <div className="text-center">
            <p className="text-[64px] font-light leading-none text-ink">{average.toFixed(1)}</p>
            <div className="mt-3"><Stars value={average} size={24} /></div>
            <p className="mt-2 text-[13px] text-muted">Based on {total} ratings</p>
          </div>
          <div className="space-y-2.5">
            {breakdown.map((b) => (
              <button
                key={b.star}
                onClick={() => {
                  setFilter(filter === b.star ? null : b.star);
                  setPage(0);
                }}
                className={`group flex w-full items-center gap-4 text-[14px] transition-opacity ${filter && filter !== b.star ? "opacity-40" : ""}`}
              >
                <span className="w-10 shrink-0 text-left text-charcoal">{b.star} ★</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                  <span
                    className="block h-full rounded-full bg-ink transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-red"
                    style={{ width: `${(b.n / max) * 100}%` }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-muted">{b.n}</span>
              </button>
            ))}
            {filter && (
              <button onClick={() => setFilter(null)} className="text-[13px] font-medium text-red underline-offset-4 hover:underline">
                Showing {filter}★ reviews · Clear
              </button>
            )}
          </div>
        </div>

        {/* Summary box */}
        <div className="mt-12 border-l-4 border-red bg-mist px-6 py-5">
          <p className="text-[15px] font-semibold text-ink">What our customers say</p>
          <p className="mt-2 text-[15px] leading-relaxed text-charcoal">
            Customers love the quality of the finish, the sturdy build and how comfortable it is to use every day. Many mention it looks
            even better in person. A few note the colour can appear slightly different from photos, so we recommend ordering a swatch if
            you&apos;re matching existing furniture.
          </p>
          <p className="mt-3 text-[12px] text-muted">Summary of {total} customer reviews</p>
        </div>

        {/* List */}
        <div key={`${filter}-${page}`} className="mt-10 divide-y divide-line border-y border-line">
          {shown.map((r, i) => {
            const idx = reviews.indexOf(r);
            const helpedThis = helped.includes(idx);
            return (
              <article key={idx} className="mega-in py-8" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-semibold text-white">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{r.name}</p>
                      <p className="text-[12px] text-muted">
                        {r.date}
                        {r.verified && <span className="ml-2 text-[#2f8f4e]">✓ Verified buyer</span>}
                      </p>
                    </div>
                  </div>
                  <Stars value={r.rating} size={15} />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-charcoal">{r.body}</p>

                {r.reply && (
                  <div className="mt-5 border-l-2 border-line bg-[#fafafa] px-5 py-4">
                    <p className="text-[13px] font-semibold text-ink">
                      Furniture <span className="ml-1 font-normal text-muted">replied</span>
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-charcoal">{r.reply}</p>
                  </div>
                )}

                <button
                  onClick={() => setHelped((h) => (helpedThis ? h.filter((x) => x !== idx) : [...h, idx]))}
                  className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ${
                    helpedThis ? "border-ink bg-ink text-white" : "border-line text-charcoal hover:border-ink"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 11v9H4v-9h3zm0 0l4-8a2 2 0 012 2v4h5.5a2 2 0 012 2.3l-1.2 6A2 2 0 0117.3 19H7" />
                  </svg>
                  Helpful ({r.helpful + (helpedThis ? 1 : 0)})
                </button>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i);
                  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-current={i === page}
                className={`grid h-10 w-10 place-items-center text-[14px] font-medium transition-all duration-300 ${
                  i === page ? "bg-ink text-white" : "border border-line text-ink hover:border-ink"
                }`}
              >
                {i + 1}
              </button>
            ))}
            {page < pages - 1 && (
              <button onClick={() => setPage(page + 1)} aria-label="Next page" className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors hover:border-ink">
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
