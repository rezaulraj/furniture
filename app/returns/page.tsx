import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import ReturnWizard from "../components/ReturnWizard";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Returns & Refunds — Furniture",
  description: "7-day returns with free home pick-up. Start a return online and get your refund in 3–7 working days.",
};

// Placeholder policy figures — review against the real terms before launch.
const PROMISES = [
  { big: "7 days", t: "to change your mind", d: "M4 5h16v15H4zM4 9h16M8 3v4M16 3v4" },
  { big: "Free", t: "pick-up from your home", d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { big: "3–7", t: "working days to refund", d: "M3 6h18v12H3zM3 10h18M7 15h3" },
  { big: "10 yrs", t: "frame warranty", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
];

const REFUND_TIMES = [
  { m: "Store credit", t: "Instantly", note: "+5% bonus", w: 8 },
  { m: "bKash / Nagad", t: "1–3 working days", w: 35 },
  { m: "Cash on delivery", t: "3–5 working days", note: "by bank transfer", w: 60 },
  { m: "Credit / debit card", t: "5–7 working days", w: 100 },
];

const CAN = ["Unused furniture in its original condition", "Items with all parts, fittings and manuals", "Lighting, rugs and decor in original packaging", "Damaged or faulty items, at any time under warranty"];
const CANNOT = ["Made-to-order or custom-size pieces", "Mattresses and bedding once unwrapped", "Items assembled, altered or used for more than 7 days", "Clearance items marked 'final sale'"];

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1505693416388-ac5ce068fe85", 2400)} alt="A calm bedroom" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="mx-auto max-w-[1440px] px-4 pb-36 pt-36 text-white md:px-8 md:pb-44 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Returns &amp; Refunds</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Returns &amp; refunds
            </p>
            <h1 className="fade-up mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Changed your mind? <span className="font-light italic">No problem.</span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Return unused pieces within 7 days. We&apos;ll collect them from your home for free and refund you fast.
            </p>
            <a
              href="#start"
              className="fade-up group mt-8 inline-flex items-center gap-3 bg-white px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-red hover:text-white"
              style={{ "--delay": "450ms" } as React.CSSProperties}
            >
              Start a return
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </section>

        {/* PROMISES */}
        <section className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-4 md:-mt-28 md:px-8">
          <ul className="grid grid-cols-2 gap-px overflow-hidden bg-line shadow-[0_30px_60px_-40px_rgba(0,0,0,0.55)] lg:grid-cols-4">
            {PROMISES.map((p, i) => (
              <li key={p.t} className="fade-up group bg-white p-6 transition-colors duration-500 hover:bg-ink md:p-8" style={{ "--delay": `${450 + i * 90}ms` } as React.CSSProperties}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red transition-transform duration-500 group-hover:-translate-y-1">
                  <path d={p.d} />
                </svg>
                <p className="mt-6 text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-none text-ink transition-colors duration-500 group-hover:text-white">{p.big}</p>
                <p className="mt-2 text-[14px] text-muted transition-colors duration-500 group-hover:text-white/70">{p.t}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* WIZARD */}
        <section id="start" className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-16 md:px-8 md:pt-24">
          <Reveal>
            <ReturnWizard />
          </Reveal>
        </section>

        {/* REFUND TIMES */}
        <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Refund times</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">Your money, back quickly</h2>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">Refunds start as soon as our crew collects your item. How fast it lands depends on how you paid.</p>
          </Reveal>
          <Reveal>
            <ul className="space-y-3">
              {REFUND_TIMES.map((r) => (
                <li key={r.m} className="group bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.45)] md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[16px] font-semibold text-ink">
                      {r.m}
                      {r.note && <span className="ml-2 text-[12px] font-medium text-red">{r.note}</span>}
                    </span>
                    <span className="text-[15px] text-charcoal">{r.t}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
                    <div className="tracker-fill h-full rounded-full bg-gradient-to-r from-[#2f8f4e] to-[#7fd49b]" style={{ width: `${r.w}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* CAN / CANNOT */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">What can be returned</p>
                <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">The simple rules</h2>
              </div>
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {[
                { t: "Happy to take back", list: CAN, ok: true },
                { t: "Sorry, we can't accept", list: CANNOT, ok: false },
              ].map((c, ci) => (
                <Reveal key={c.t} delay={ci * 120}>
                  <div className={`h-full p-7 md:p-9 ${c.ok ? "bg-[#eef6f0]" : "bg-[#f6f5f3]"}`}>
                    <h3 className="flex items-center gap-3 text-[19px] font-semibold text-ink">
                      <span className={`grid h-9 w-9 place-items-center rounded-full text-white ${c.ok ? "bg-[#2f8f4e]" : "bg-ink"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d={c.ok ? "M5 12.5l4.5 4.5L19 7.5" : "M6 6l12 12M18 6L6 18"} /></svg>
                      </span>
                      {c.t}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {c.list.map((x) => (
                        <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-charcoal">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.ok ? "bg-[#2f8f4e]" : "bg-muted"}`} />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DAMAGED / WARRANTY */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid overflow-hidden bg-ink text-white lg:grid-cols-2">
            <div className="relative min-h-[300px]">
              <Image src={img("1555041469-a586c61ea9bc", 1200)} alt="A sofa being cared for" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <Reveal className="p-8 md:p-14">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/60">Damaged or faulty?</p>
              <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">We&apos;ll put it right, free</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/75">
                If something arrives damaged, tell us within 48 hours with a photo. For faults later on, our warranty has you covered: 10 years on solid wood frames, 1 year on mechanisms and upholstery.
              </p>
              <ol className="mt-8 space-y-4">
                {["Send a photo and your order number", "We confirm a repair or replacement", "Our technician visits, at no cost to you"].map((s, i) => (
                  <li key={s} className="flex items-center gap-4 text-[15px]">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-[13px] font-semibold">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="bg-red px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark">Report a problem</Link>
                <Link href="/faq" className="border border-white/40 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink">Read the FAQ</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
