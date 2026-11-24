"use client";

import { useEffect, useState } from "react";
import { DISTRICTS, Field, SelectField, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";

/* ---------------- fabric library ---------------- */

type Family = "Velvet" | "Linen" | "Bouclé" | "Weave" | "Leather";

const FAMILY_INFO: Record<Family, { note: string; texture: (hex: string) => string }> = {
  Velvet: {
    note: "Soft pile with a rich sheen",
    texture: (c) => `radial-gradient(120% 90% at 25% 15%, rgba(255,255,255,.32), transparent 55%), radial-gradient(90% 70% at 85% 95%, rgba(0,0,0,.28), transparent 60%), ${c}`,
  },
  Linen: {
    note: "Breathable, relaxed and natural",
    texture: (c) => `repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 1px, transparent 1px 4px), ${c}`,
  },
  Bouclé: {
    note: "Looped yarn with a cosy texture",
    texture: (c) => `radial-gradient(circle at 30% 30%, rgba(255,255,255,.35) 0 1.6px, transparent 2.2px) 0 0/7px 7px, radial-gradient(circle at 70% 70%, rgba(0,0,0,.12) 0 1.6px, transparent 2.2px) 0 0/9px 9px, ${c}`,
  },
  Weave: {
    note: "Hard-wearing, easy-care cotton blend",
    texture: (c) => `repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,.10) 0 2px, transparent 2px 6px), ${c}`,
  },
  Leather: {
    note: "Full-grain, ages beautifully",
    texture: (c) => `radial-gradient(140% 100% at 20% 10%, rgba(255,255,255,.22), transparent 50%), radial-gradient(circle at 50% 50%, rgba(0,0,0,.06) 0 1px, transparent 1.5px) 0 0/5px 5px, ${c}`,
  },
};

const FABRICS: { name: string; family: Family; hex: string; tags: string[] }[] = [
  { name: "Emerald", family: "Velvet", hex: "#1f5a48", tags: ["Bestseller"] },
  { name: "Rosewood", family: "Velvet", hex: "#9c5b5b", tags: [] },
  { name: "Midnight", family: "Velvet", hex: "#24304d", tags: [] },
  { name: "Ochre", family: "Velvet", hex: "#c08a2e", tags: ["New"] },
  { name: "Blush", family: "Velvet", hex: "#d7a9a1", tags: [] },
  { name: "Oat", family: "Linen", hex: "#d9cdb8", tags: ["Bestseller"] },
  { name: "Sage", family: "Linen", hex: "#9aa58c", tags: [] },
  { name: "Clay", family: "Linen", hex: "#b77a5c", tags: ["New"] },
  { name: "Stone", family: "Linen", hex: "#a39e95", tags: [] },
  { name: "Chalk", family: "Bouclé", hex: "#eee9df", tags: ["Bestseller"] },
  { name: "Biscuit", family: "Bouclé", hex: "#cdb193", tags: [] },
  { name: "Pebble", family: "Bouclé", hex: "#9d978f", tags: ["New"] },
  { name: "Charcoal", family: "Weave", hex: "#3d3d3f", tags: ["Pet-friendly"] },
  { name: "Denim", family: "Weave", hex: "#41577a", tags: ["Pet-friendly"] },
  { name: "Moss", family: "Weave", hex: "#6c7448", tags: [] },
  { name: "Terracotta", family: "Weave", hex: "#b5562f", tags: ["New"] },
  { name: "Sand", family: "Weave", hex: "#c9b48f", tags: ["Pet-friendly"] },
  { name: "Cognac", family: "Leather", hex: "#8a4b26", tags: ["Bestseller"] },
  { name: "Espresso", family: "Leather", hex: "#3e2a20", tags: [] },
  { name: "Tan", family: "Leather", hex: "#b0804f", tags: [] },
];

const MAX = 6;
const swatchBg = (f: (typeof FABRICS)[number]) => FAMILY_INFO[f.family].texture(f.hex);

/* ---------------- component ---------------- */

export default function FabricPicker() {
  const [family, setFamily] = useState<Family | "All">("All");
  const [picked, setPicked] = useState<string[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [shake, setShake] = useState(0);
  const { status, submit, reset } = useFakeSubmit();

  const list = family === "All" ? FABRICS : FABRICS.filter((f) => f.family === family);
  const full = picked.length >= MAX;
  const byName = (n: string) => FABRICS.find((f) => f.name === n)!;

  const toggle = (name: string) => {
    if (picked.includes(name)) setPicked((p) => p.filter((x) => x !== name));
    else if (full) setShake((s) => s + 1);
    else setPicked((p) => [...p, name]);
  };

  // Esc closes the order drawer; lock page scroll while it's open.
  useEffect(() => {
    if (!checkout) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCheckout(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [checkout]);

  const finish = () => {
    reset();
    setPicked([]);
    setCheckout(false);
  };

  return (
    <>
      {/* family filter */}
      <div className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 md:mx-0 md:justify-center md:px-0">
        {(["All", ...Object.keys(FAMILY_INFO)] as (Family | "All")[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFamily(f)}
            aria-pressed={family === f}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
              family === f ? "border-ink bg-ink text-white" : "border-line text-charcoal hover:border-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {family !== "All" && (
        <p key={family} className="fade-up -mt-4 mb-10 text-center text-[15px] text-muted">
          <span className="font-semibold text-ink">{family}</span> — {FAMILY_INFO[family].note}
        </p>
      )}
  
      {/* swatch grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {list.map((f, i) => {
          const on = picked.includes(f.name);
          return (
            <button
              key={`${family}-${f.name}`}
              type="button"
              onClick={() => toggle(f.name)}
              aria-pressed={on}
              className="mega-in group text-left"
              style={{ "--delay": `${i * 35}ms` } as React.CSSProperties}
            >
              <span
                className={`relative block aspect-square overflow-hidden rounded-sm shadow-sm ring-offset-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-hover:shadow-xl ${on ? "ring-2 ring-red" : ""}`}
                style={{ background: swatchBg(f) }}
              >
                {/* pinked edge */}
                <span className="absolute inset-x-0 bottom-0 h-2 bg-[linear-gradient(135deg,transparent_50%,white_50%),linear-gradient(225deg,transparent_50%,white_50%)] bg-[length:8px_8px] bg-repeat-x" />
                {f.tags[0] && (
                  <span className="absolute left-2.5 top-2.5 bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">{f.tags[0]}</span>
                )}
                <span
                  className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full text-[16px] shadow transition-all duration-300 ${
                    on ? "scale-100 bg-red text-white" : "scale-90 bg-white/90 text-ink opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }`}
                >
                  {on ? "✓" : "+"}
                </span>
              </span>
              <span className="mt-3 block text-[15px] font-medium text-ink">{f.name}</span>
              <span className="block text-[13px] text-muted">{f.family}</span>
            </button>
          );
        })}
      </div>

      {/* swatch box tray */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-[0_-10px_30px_rgba(0,0,0,.08)] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          picked.length ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-4 px-4 py-4 md:flex-nowrap md:px-8">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">Your swatch box</p>
            <p key={shake} className={`text-[13px] ${full ? "text-red" : "text-muted"} ${shake ? "swatch-shake" : ""}`}>
              {picked.length} of {MAX} free swatches{full ? " — box full" : ""}
            </p>
          </div>
          <ul className="flex flex-1 gap-2">
            {Array.from({ length: MAX }, (_, i) => {
              const name = picked[i];
              const f = name && byName(name);
              return (
                <li key={i}>
                  {f ? (
                    <button
                      type="button"
                      onClick={() => toggle(f.name)}
                      title={`Remove ${f.name}`}
                      aria-label={`Remove ${f.name}`}
                      className="mega-in group relative block h-11 w-11 rounded-sm shadow-sm md:h-12 md:w-12"
                      style={{ background: swatchBg(f) }}
                    >
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">×</span>
                    </button>
                  ) : (
                    <span className="block h-11 w-11 rounded-sm border border-dashed border-line md:h-12 md:w-12" />
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => setCheckout(true)}
            className="group inline-flex w-full items-center justify-center gap-3 bg-red px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-red-dark md:w-auto"
          >
            Order free swatches <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* order drawer */}
      {checkout && (
        <div className="insta-fade fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => setCheckout(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Order free swatches"
            onClick={(e) => e.stopPropagation()}
            className="drawer-in flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-white"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-[20px] font-medium text-ink">Your free swatches</h2>
              <button type="button" onClick={() => setCheckout(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full transition-all hover:rotate-90 hover:bg-mist hover:text-red">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            {status === "done" ? (
              <SuccessCard
                title="Swatches on their way"
                text={`We'll post your ${picked.length} swatch${picked.length === 1 ? "" : "es"} within 3–5 working days. Feel them, live with them, then choose with confidence.`}
                onReset={finish}
                resetLabel="Browse more fabrics"
              />
            ) : (
              <div className="p-6">
                <ul className="mb-8 grid grid-cols-3 gap-3">
                  {picked.map((n) => {
                    const f = byName(n);
                    return (
                      <li key={n}>
                        <span className="block aspect-square rounded-sm shadow-sm" style={{ background: swatchBg(f) }} />
                        <span className="mt-1.5 block text-[13px] font-medium text-ink">{f.name}</span>
                        <span className="block text-[12px] text-muted">{f.family}</span>
                      </li>
                    );
                  })}
                </ul>
                <form onSubmit={submit} className="space-y-5">
                  <Field label="Full name" name="name" placeholder="Your name" />
                  <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
                  <Field label="Address" name="address" placeholder="House, road, area" />
                  <SelectField label="District" name="district" options={DISTRICTS} />
                  <p className="text-[13px] text-muted">Swatches are free, with free delivery. No payment needed.</p>
                  <SubmitButton loading={status === "loading"}>Send my swatches</SubmitButton>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
