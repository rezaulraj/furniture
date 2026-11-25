"use client";

import Link from "next/link";
import { useState } from "react";
import { cartTotals, useCart } from "./cart";
import { taka } from "./catalog";
import { BANKS, MAX_PRICE, MIN_EMI, TENURES, monthly, totalPayable } from "./emiData";

const PRESETS = [
  { t: "Sofa", v: 85000 },
  { t: "Bed", v: 120000 },
  { t: "Dining set", v: 160000 },
  { t: "Full room", v: 350000 },
];

export function EmiCalculator() {
  const cart = cartTotals(useCart());
  const [price, setPrice] = useState(120000);
  const [months, setMonths] = useState(12);
  const [bank, setBank] = useState(-1);

  const b = bank >= 0 ? BANKS[bank] : null;
  const allowed = TENURES.filter((t) => t.m <= (b?.max ?? 24));
  // If the chosen bank doesn't offer this tenure, fall back to its longest one.
  const plan = allowed.find((t) => t.m === months) ?? allowed[allowed.length - 1];
  const tooLow = price < MIN_EMI;
  const emi = monthly(price, plan.m, plan.rate);
  const total = totalPayable(price, plan.m, plan.rate);
  const interest = Math.max(0, total - price);
  const fee = b?.fee ? Math.round((price * b.fee) / 100) : 0;
  const pct = (price / MAX_PRICE) * 100;

  return (
    <div className="grid overflow-hidden bg-white shadow-[0_40px_80px_-45px_rgba(0,0,0,0.5)] lg:grid-cols-[1.15fr_1fr]">
      <div className="p-6 md:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">EMI calculator</p>
        <h2 className="mt-3 text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold leading-tight text-ink">Plan your monthly payment</h2>

        {/* Price */}
        <label className="mt-8 block">
          <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            Purchase amount
            <span className="text-[20px] normal-case tracking-normal text-ink tabular-nums">{taka(price)}</span>
          </span>
          <input
            type="range"
            min={MIN_EMI}
            max={MAX_PRICE}
            step={1000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="range-red mt-4 w-full"
            style={{ "--fill": `${pct}%` } as React.CSSProperties}
          />
          <span className="mt-1 flex justify-between text-[12px] text-muted">
            <span>{taka(MIN_EMI)}</span>
            <span>{taka(MAX_PRICE)}</span>
          </span>
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {cart.subtotal > 0 && (
            <button
              onClick={() => setPrice(Math.min(MAX_PRICE, Math.max(MIN_EMI, cart.subtotal)))}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${price === cart.subtotal ? "border-red bg-red text-white" : "border-red/40 bg-rose text-red hover:border-red"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8h14l-1.5 12h-11zM9 8V6a3 3 0 016 0v2" /></svg>
              My basket · {taka(cart.subtotal)}
            </button>
          )}
          {PRESETS.map((p) => (
            <button
              key={p.t}
              onClick={() => setPrice(p.v)}
              className={`rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${price === p.v ? "border-ink bg-ink text-white" : "border-line text-charcoal hover:border-ink hover:text-ink"}`}
            >
              {p.t} · {taka(p.v)}
            </button>
          ))}
        </div>

        {/* Bank */}
        <label className="mt-8 block">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Your card&apos;s bank</span>
          <span className="relative mt-3 block">
            <select
              value={bank}
              onChange={(e) => setBank(Number(e.target.value))}
              className="w-full appearance-none border border-line bg-white px-4 py-3.5 pr-10 text-[15px] text-ink outline-none transition-colors focus:border-ink"
            >
              <option value={-1}>Any partner bank</option>
              {BANKS.map((x, i) => (
                <option key={x.name} value={i}>
                  {x.name} (up to {x.max} months)
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </label>

        {/* Tenure */}
        <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Pay over</p>
        <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6">
          {TENURES.map((t) => {
            const off = !allowed.includes(t);
            const on = plan.m === t.m;
            return (
              <button
                key={t.m}
                disabled={off}
                onClick={() => setMonths(t.m)}
                aria-pressed={on}
                className={`relative border px-2 py-3 text-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${on ? "border-ink bg-ink text-white" : "border-line text-ink enabled:hover:border-ink"}`}
              >
                <span className="block text-[18px] font-semibold leading-none">{t.m}</span>
                <span className={`mt-1 block text-[11px] ${on ? "text-white/65" : "text-muted"}`}>months</span>
                <span className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-px text-[10px] font-bold ${t.rate === 0 ? "bg-[#2f8f4e] text-white" : "bg-mist text-charcoal"}`}>
                  {t.rate === 0 ? "0%" : `${t.rate}%`}
                </span>
              </button>
            );
          })}
        </div>
        {b && b.max < 24 && <p className="mt-3 text-[13px] text-muted">{b.name} offers EMI for up to {b.max} months.</p>}
      </div>

      {/* Result */}
      <div className="relative overflow-hidden bg-ink p-6 text-white md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-red/15" />
        <div className="relative">
          {tooLow ? (
            <p className="text-[15px] text-white/70">EMI is available on purchases of {taka(MIN_EMI)} or more.</p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">Your monthly payment</p>
                {plan.rate === 0 ? (
                  <span className="rounded-full bg-[#2f8f4e] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]">0% interest</span>
                ) : (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]">{plan.rate}% p.a.</span>
                )}
              </div>
              <p key={`${emi}-${plan.m}`} className="mega-in mt-3 flex items-baseline gap-2">
                <span className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-semibold leading-none tabular-nums">{taka(emi)}</span>
                <span className="text-[16px] text-white/60">× {plan.m}</span>
              </p>

              {/* Instalment timeline */}
              <div key={plan.m} className="mt-7 flex gap-1" aria-hidden>
                {Array.from({ length: plan.m }, (_, i) => (
                  <span key={i} className="emi-seg h-2 flex-1 rounded-full bg-white/80" style={{ "--delay": `${i * 35}ms` } as React.CSSProperties} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-white/45">
                <span>Month 1</span>
                <span>Month {plan.m}</span>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-white/10">
                {[
                  { k: "Item price", v: taka(price) },
                  { k: "Total you pay", v: taka(total + fee) },
                  { k: "Interest", v: interest === 0 ? "৳0" : taka(interest) },
                  { k: "Processing fee", v: fee === 0 ? "Free" : taka(fee) },
                ].map((x) => (
                  <div key={x.k} className="bg-ink p-5">
                    <dt className="text-[12px] uppercase tracking-[0.14em] text-white/55">{x.k}</dt>
                    <dd key={x.v} className="mega-in mt-1.5 text-[19px] font-semibold tabular-nums">{x.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[12px] leading-relaxed text-white/50">
                Estimate only. Monthly amounts are rounded up to the nearest ৳10. Your bank confirms the final plan and may apply its own terms.
              </p>
            </>
          )}
          <Link href="/" className="group mt-7 inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-red hover:text-white">
            Start shopping
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Partner banks ---------- */

const FILTERS = [
  { t: "All banks", m: 0 },
  { t: "12+ months", m: 12 },
  { t: "18+ months", m: 18 },
  { t: "24 months", m: 24 },
];

export function BankFinder() {
  const [q, setQ] = useState("");
  const [min, setMin] = useState(0);
  const list = BANKS.filter((b) => b.max >= min && b.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.t}
              onClick={() => setMin(f.m)}
              aria-pressed={min === f.m}
              className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${min === f.m ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
            >
              {f.t}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find your bank"
            aria-label="Find your bank"
            className="w-full border border-line bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition-colors focus:border-ink"
          />
        </label>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 bg-white p-10 text-center text-[15px] text-muted">
          No partner bank matches &ldquo;{q}&rdquo;. You can still pay in full, or <Link href="/contact" className="font-semibold text-red underline-offset-4 hover:underline">ask us</Link> about other options.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((b, i) => (
            <li
              key={b.name}
              className="mega-in group bg-white p-5 shadow-[0_20px_40px_-35px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(0,0,0,0.45)]"
              style={{ "--delay": `${i * 40}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white transition-transform duration-500 group-hover:scale-110" style={{ background: b.color }}>
                  {b.short}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-ink">{b.name}</span>
                  <span className="text-[13px] text-muted">{b.fee === 0 ? "No processing fee" : `${b.fee}% processing fee`}</span>
                </span>
              </div>
              <div className="mt-5 flex gap-1" aria-hidden>
                {TENURES.map((t) => (
                  <span key={t.m} className={`h-1.5 flex-1 rounded-full ${t.m <= b.max ? (t.rate === 0 ? "bg-[#2f8f4e]" : "bg-ink") : "bg-line"}`} />
                ))}
              </div>
              <p className="mt-2 text-[13px] text-charcoal">
                Up to <span className="font-semibold text-ink">{b.max} months</span>
                {b.max > 12 ? " · 0% up to 12" : " · all at 0%"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
