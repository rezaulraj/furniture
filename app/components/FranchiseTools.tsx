"use client";

import { useState } from "react";
import { taka } from "./catalog";
import { Choice, DISTRICTS, Field, SelectField, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";
import { bdt as lakh, FORMATS, TIERS } from "./franchiseData";


/** Illustrative earnings estimate. All figures are placeholders. */
export function FranchiseCalculator() {
  const [fmt, setFmt] = useState(1);
  const [tier, setTier] = useState(0);
  const [footfall, setFootfall] = useState(60);

  const f = FORMATS[fmt];
  const t = TIERS[tier];
  const monthly = Math.round((footfall * 30 * f.conversion * f.basket * t.mult) / 10000) * 10000;
  const profit = Math.round((monthly * f.margin) / 1000) * 1000;
  const payback = Math.max(8, Math.round((f.invest * t.mult) / profit));
  const pct = ((footfall - 20) / 180) * 100;

  return (
    <div className="grid overflow-hidden bg-white shadow-[0_40px_80px_-45px_rgba(0,0,0,0.5)] lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 md:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Earnings estimator</p>
        <h2 className="mt-3 text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold leading-tight text-ink">What could your store earn?</h2>

        <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Store format</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {FORMATS.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setFmt(i)}
              aria-pressed={fmt === i}
              className={`border px-3 py-4 text-left transition-all duration-300 ${fmt === i ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
            >
              <span className="block text-[15px] font-semibold">{x.name}</span>
              <span className={`text-[12px] ${fmt === i ? "text-white/65" : "text-muted"}`}>{x.area}</span>
            </button>
          ))}
        </div>

        <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">City size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIERS.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setTier(i)}
              aria-pressed={tier === i}
              className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${tier === i ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
            >
              {x.name}
            </button>
          ))}
        </div>

        <label className="mt-7 block">
          <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            Daily visitors
            <span className="text-[16px] normal-case tracking-normal text-ink">{footfall}</span>
          </span>
          <input
            type="range"
            min={20}
            max={200}
            step={5}
            value={footfall}
            onChange={(e) => setFootfall(Number(e.target.value))}
            className="range-red mt-3 w-full"
            style={{ "--fill": `${pct}%` } as React.CSSProperties}
          />
          <span className="mt-1 flex justify-between text-[12px] text-muted">
            <span>20</span>
            <span>200</span>
          </span>
        </label>
      </div>

      <div className="relative overflow-hidden bg-ink p-6 text-white md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-red/15" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">Estimated monthly sales</p>
          <p key={monthly} className="mega-in mt-3 text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none">{lakh(monthly)}</p>
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden bg-white/10">
            {[
              { k: "Monthly profit", v: lakh(profit) },
              { k: "Payback period", v: `${payback} months` },
              { k: "Investment", v: lakh(f.invest * t.mult) },
              { k: "Team size", v: `${f.team} people` },
            ].map((x) => (
              <div key={x.k} className="bg-ink p-5">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/55">{x.k}</dt>
                <dd key={x.v} className="mega-in mt-1.5 text-[20px] font-semibold">{x.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[12px] leading-relaxed text-white/50">
            Illustrative only, based on average {taka(f.basket)} orders and {Math.round(f.conversion * 100)}% of visitors buying. Real results vary; we&apos;ll share a detailed business plan for your location.
          </p>
          <a href="#apply" className="group mt-7 inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-red hover:text-white">
            Start my application
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function FranchiseForm() {
  const { status, submit, reset } = useFakeSubmit();
  if (status === "done") {
    return (
      <SuccessCard
        title="Thank you for your interest!"
        text="Our franchise team will call you within 3 working days to talk through your plans and share our information pack."
        onReset={reset}
        resetLabel="Send another enquiry"
      />
    );
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Format you&apos;re interested in</span>
        <Choice
          name="format"
          defaultValue="Showroom"
          options={FORMATS.map((f) => ({ value: f.name, label: f.name, hint: f.area }))}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Preferred city" name="city" options={DISTRICTS} />
        <SelectField label="Available investment" name="budget" options={["৳50 lakh – 1 crore", "৳1 – 2 crore", "৳2 – 4 crore", "Above ৳4 crore"]} />
      </div>
      <SelectField label="Do you have a property?" name="property" options={["Yes, I own a suitable space", "I'm renting / looking", "Not yet"]} />
      <Field label="Tell us about your business experience" name="about" type="textarea" required={false} placeholder="Retail, furniture, interiors, or something else…" />
      <SubmitButton loading={status === "loading"}>Send my enquiry</SubmitButton>
    </form>
  );
}
