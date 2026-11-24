"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { taka } from "./catalog";
import { cartTotals, DELIVERY_FEE, FREE_DELIVERY, useCart } from "./cart";
import { MADE_TO_ORDER, ZONES } from "./deliveryZones";

const ALL = ZONES.flatMap((z) => z.districts);

let nowCache = 0;
const useNow = () =>
  useSyncExternalStore(
    () => () => {},
    () => (nowCache ||= Date.now()),
    () => 0,
  );

/** Add working days (Friday is the weekly holiday). */
function addWorkingDays(from: number, days: number) {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 5) left--;
  }
  return d;
}
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

export default function DeliveryEstimator() {
  const cart = useCart();
  const now = useNow();
  const basket = cartTotals(cart).subtotal;
  const [district, setDistrict] = useState("Dhaka");
  const [stock, setStock] = useState<"stock" | "made">("stock");
  const [value, setValue] = useState<number | null>(null);
  const amount = value ?? (basket || 35000);

  const zone = ZONES.find((z) => z.districts.includes(district))!;
  const [a, b] = stock === "made" ? MADE_TO_ORDER : zone.days;
  const free = amount >= FREE_DELIVERY;
  const fee = free ? 0 : DELIVERY_FEE;
  const pct = Math.min(100, (amount / FREE_DELIVERY) * 100);

  return (
    <div className="grid overflow-hidden bg-white shadow-[0_40px_80px_-45px_rgba(0,0,0,0.5)] lg:grid-cols-[1.15fr_1fr]">
      {/* Inputs */}
      <div className="p-6 md:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Delivery estimator</p>
        <h2 className="mt-3 text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold leading-tight text-ink">When will it arrive?</h2>

        <label className="mt-8 block">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Deliver to</span>
          <span className="relative block">
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /></svg>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="h-14 w-full cursor-pointer appearance-none border border-[#d4d4d4] bg-white pl-12 pr-10 text-[16px] text-ink outline-none transition-colors hover:border-ink focus:border-ink"
            >
              {ALL.map((d) => <option key={d}>{d}</option>)}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </label>

        <div className="mt-6">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Item type</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "stock" as const, t: "In stock", s: "Ready to ship" },
              { id: "made" as const, t: "Made to order", s: "Custom size or fabric" },
            ].map((o) => {
              const on = stock === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setStock(o.id)}
                  aria-pressed={on}
                  className={`border p-4 text-left transition-all duration-300 ${on ? "border-ink bg-ink text-white" : "border-[#d4d4d4] text-ink hover:border-ink"}`}
                >
                  <span className="block text-[15px] font-semibold">{o.t}</span>
                  <span className={`text-[13px] ${on ? "text-white/70" : "text-muted"}`}>{o.s}</span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="mt-6 block">
          <span className="mb-2 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            Order value
            <span className="text-[16px] normal-case tracking-normal text-ink">{taka(amount)}</span>
          </span>
          <input
            type="range"
            min={2000}
            max={200000}
            step={1000}
            value={Math.min(200000, amount)}
            onChange={(e) => setValue(Number(e.target.value))}
            className="range-red w-full"
            style={{ "--fill": `${((Math.min(200000, amount) - 2000) / 198000) * 100}%` } as React.CSSProperties}
          />
          <span className="mt-1 flex justify-between text-[12px] text-muted">
            <span>৳2,000</span>
            {basket > 0 && value === null ? <span className="text-ink">From your basket</span> : <span />}
            <span>৳2,00,000</span>
          </span>
        </label>
      </div>

      {/* Result */}
      <div className="relative overflow-hidden bg-ink p-6 text-white md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-red/15" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">Estimated arrival</p>
          <p key={`${district}${stock}`} className="mega-in mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight">
            {now ? (
              <>
                {fmt(addWorkingDays(now, a))}
                <span className="font-light text-white/50"> – </span>
                {fmt(addWorkingDays(now, b))}
              </>
            ) : (
              <span className="inline-block h-9 w-64 animate-pulse rounded bg-white/15" />
            )}
          </p>
          <p className="mt-2 text-[14px] text-white/60">
            {a}–{b} working days · {stock === "made" ? "made for you, then delivered" : zone.label}
          </p>

          <dl className="mt-8 space-y-4 border-t border-white/10 pt-6 text-[15px]">
            <div className="flex items-center justify-between">
              <dt className="text-white/70">Delivery</dt>
              <dd key={String(free)} className={`mega-in font-semibold ${free ? "text-[#7fd49b]" : ""}`}>{free ? "Free" : taka(fee)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/70">Installation</dt>
              <dd className="font-semibold text-[#7fd49b]">Free</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/70">Packaging removal</dt>
              <dd className="font-semibold text-[#7fd49b]">Free</dd>
            </div>
          </dl>

          <div className="mt-7">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className={`h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${free ? "bg-[#4cc477]" : "bg-red"}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2.5 text-[13px] text-white/70">
              {free ? "Your order qualifies for free delivery." : <>Add <span className="font-semibold text-white">{taka(FREE_DELIVERY - amount)}</span> more for free delivery.</>}
            </p>
          </div>

          <Link
            href={basket > 0 ? "/cart" : "/categories"}
            className="group mt-8 inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-red hover:text-white"
          >
            {basket > 0 ? "Go to basket" : "Start shopping"}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
