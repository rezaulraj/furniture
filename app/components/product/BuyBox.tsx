"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { img, taka, type Product } from "../catalog";

type Extra = { name: string; price: number; img: string; href: string };

export default function BuyBox({
  p,
  eyebrow,
  extras,
  notes,
  size,
}: {
  p: Product;
  eyebrow: { label: string; href: string }[];
  extras: Extra[];
  notes: string[];
  size: readonly (readonly [string, string])[];
}) {
  const [color, setColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [added, setAdded] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>("notes");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const add = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      setToast(`${qty} × ${p.name} (${color.name}) added to your basket`);
    }, 700);
  };

  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const emi = Math.ceil(p.price / 12 / 10) * 10;

  return (
    <div>
      {/* Eyebrow breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
        {eyebrow.map((e, i) => (
          <span key={e.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>›</span>}
            <Link href={e.href} className="transition-colors hover:text-red">{e.label}</Link>
          </span>
        ))}
      </nav>

      <h1 className="mt-3 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.01em] text-ink">{p.name}</h1>

      {/* Price + rating */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[26px] font-semibold text-ink">{taka(p.price)}</span>
        {p.oldPrice && (
          <>
            <span className="text-[16px] text-muted line-through">{taka(p.oldPrice)}</span>
            <span className="bg-red px-2 py-0.5 text-[12px] font-semibold text-white">-{off}%</span>
          </>
        )}
        <a href="#reviews" className="group flex items-center gap-2 text-[14px] text-muted">
          <Stars value={p.rating} />
          <span className="underline-offset-4 group-hover:text-ink group-hover:underline">({p.reviews})</span>
        </a>
      </div>

      <div className="mt-4 space-y-1.5 text-[14px] text-charcoal">
        <p className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2f8f4e] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2f8f4e]" />
          </span>
          In stock <span className="text-muted">· Code {p.model.toUpperCase()}</span>
        </p>
        <p className="text-muted">
          Estimated delivery: <span className="font-medium text-ink">3–5 working days</span>, or next day in Dhaka
        </p>
      </div>

      {/* Colour */}
      <div className="mt-7">
        <p className="text-[14px] text-charcoal">
          Colour: <span className="font-semibold text-ink">{color.name}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {p.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              aria-label={c.name}
              aria-pressed={c.name === color.name}
              className={`h-10 w-10 rounded-full border transition-all duration-300 hover:scale-110 ${
                c.name === color.name ? "border-ink ring-2 ring-ink ring-offset-2" : "border-black/10"
              }`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Qty + add + wishlist */}
      <div className="mt-7 flex items-stretch gap-3">
        <div className="flex items-center border border-[#d4d4d4]">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-full w-11 place-items-center text-[18px] text-ink transition-colors hover:bg-mist">−</button>
          <span key={qty} className="mega-in w-8 text-center text-[15px] font-medium tabular-nums">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="grid h-full w-11 place-items-center text-[18px] text-ink transition-colors hover:bg-mist">+</button>
        </div>
        <button
          onClick={add}
          disabled={adding}
          className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden bg-ink py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red disabled:cursor-wait"
        >
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-[400%]" />
          {adding ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Add to basket"}
        </button>
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={`grid w-14 place-items-center border transition-all duration-300 hover:border-ink ${wished ? "border-red text-red" : "border-[#d4d4d4] text-ink"}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" className={`transition-transform duration-300 ${wished ? "scale-110" : ""}`}>
            <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-[13px] text-muted">
        <span className="font-semibold text-ink">0% EMI</span> available from {taka(emi)}/month for 12 months
      </p>

      {/* Social proof */}
      {(p.tag === "Bestseller" || p.reviews > 60) && (
        <div className="mt-6 flex items-start gap-3 bg-[#f6efe9] px-5 py-4 text-[14px] text-charcoal">
          <span className="text-[18px] leading-none">★</span>
          <p>
            <span className="font-semibold text-ink">Best seller</span> — over {Math.max(50, p.reviews)} people bought this recently, and {20 + (p.reviews % 60)} have it in their basket.
          </p>
        </div>
      )}

      {/* Add a little extra */}
      {extras.length > 0 && (
        <div className="mt-9">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">Add a little extra</p>
          <div className="grid grid-cols-3 gap-3">
            {extras.map((x) => {
              const on = added.includes(x.name);
              return (
                <div key={x.name} className="group">
                  <Link href={x.href} className="relative block aspect-square overflow-hidden bg-mist">
                    <Image src={img(x.img, 300)} alt={x.name} fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <Link href={x.href} className="mt-2 line-clamp-2 block text-[13px] leading-snug text-ink hover:text-red">{x.name}</Link>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink">{taka(x.price)}</p>
                  <button
                    onClick={() => setAdded((a) => (on ? a.filter((n) => n !== x.name) : [...a, x.name]))}
                    className={`mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] underline-offset-4 transition-colors ${on ? "text-[#2f8f4e]" : "text-ink hover:text-red hover:underline"}`}
                  >
                    {on ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accordions */}
      <div className="mt-9 border-t border-line">
        <Accordion id="notes" title="Buyer's notes" open={open} setOpen={setOpen}>
          <div className="space-y-3 text-[15px] leading-relaxed text-charcoal">
            {notes.map((n) => <p key={n}>{n}</p>)}
          </div>
        </Accordion>
        <Accordion id="size" title="Size & info" open={open} setOpen={setOpen}>
          <dl className="grid grid-cols-2 gap-y-2.5 text-[14px]">
            {size.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
        <Accordion id="delivery" title="Delivery & returns" open={open} setOpen={setOpen}>
          <ul className="space-y-2 text-[14px] leading-relaxed text-charcoal">
            <li>• Free delivery inside Dhaka on orders over ৳20,000.</li>
            <li>• Nationwide delivery in 3–7 working days, with free installation.</li>
            <li>• Change your mind? Return unused items within 7 days.</li>
          </ul>
        </Accordion>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.2M12 17h.01" /></svg>
          Need help?
        </span>
        <a href="#" className="rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-red">
          Chat with us
        </a>
      </div>

      {/* Toast */}
      <div
        role="status"
        className={`fixed bottom-6 left-1/2 z-[80] flex w-[min(92vw,460px)] -translate-x-1/2 items-center gap-3 bg-ink px-5 py-4 text-[14px] text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2f8f4e]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
        </span>
        <span className="flex-1">{toast}</span>
        <a href="#" className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4">View</a>
      </div>
    </div>
  );
}

function Accordion({
  id,
  title,
  open,
  setOpen,
  children,
}: {
  id: string;
  title: string;
  open: string | null;
  setOpen: (v: string | null) => void;
  children: React.ReactNode;
}) {
  const on = open === id;
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(on ? null : id)}
        aria-expanded={on}
        className="flex w-full items-center justify-between py-5 text-left text-[13px] font-semibold uppercase tracking-[0.16em] text-ink"
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-500 ${on ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="relative inline-block leading-none tracking-[1px]" style={{ fontSize: size }} aria-label={`${value.toFixed(1)} out of 5`}>
      <span className="text-[#d9d9d9]">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap text-ink" style={{ width: `${(value / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
