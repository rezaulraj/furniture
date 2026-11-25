import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { BankFinder, EmiCalculator } from "../components/EmiTools";
import { BANKS, MIN_EMI, TENURES, monthly, totalPayable } from "../components/emiData";
import { img, taka } from "../components/catalog";

export const metadata: Metadata = {
  title: "EMI Options — Furniture",
  description: "0% EMI for up to 12 months on partner bank cards. Calculate your monthly payment and find your bank.",
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const STEPS = [
  { t: "Choose your furniture", s: "Shop online or in any showroom. EMI works on orders of ৳5,000 or more.", d: "M5 8h14l-1.5 12h-11zM9 8V6a3 3 0 016 0v2" },
  { t: "Pick EMI at checkout", s: "Select your bank and how many months you'd like to pay over.", d: "M3 6h18v12H3zM3 10h18M7 15h4" },
  { t: "Pay with your card", s: "Use your partner-bank credit card. The full amount is converted to EMI.", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
  { t: "Enjoy it at home", s: "We deliver and install as usual. Pay the bank in easy monthly amounts.", d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
];

const NEED = [
  "A credit card from one of our partner banks",
  `An order of ${taka(MIN_EMI)} or more`,
  "Enough available limit on your card for the full amount",
  "That's it. No extra paperwork from us",
];

const QA = [
  { q: "Is 0% EMI really interest-free?", a: "Yes. On plans of up to 12 months we cover the interest, so you pay exactly the item price split into equal monthly amounts. Longer plans of 18 or 24 months carry the bank's interest rate." },
  { q: "Can I use EMI on sale items?", a: "Yes. EMI works on sale prices and with promo codes, as long as the order total is at least ৳5,000." },
  { q: "Can I convert to EMI after paying?", a: "Many banks let you convert a card purchase to EMI within a few days by calling them. The terms are set by your bank." },
  { q: "What happens if I return an item?", a: "We refund the full amount to your card and your bank cancels the remaining instalments. Some banks may charge a small cancellation fee." },
  { q: "Can I use EMI in the showroom?", a: "Yes. Every showroom accepts EMI on partner-bank cards. Just tell our team at the counter." },
];

const EXAMPLE = 120000;

export default function EmiPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1555041469-a586c61ea9bc", 2400)} alt="A bright living room with a grey sofa" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 pb-40 pt-36 text-white md:px-8 md:pb-48 md:pt-44 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={delay(50)}>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">EMI Options</span>
              </nav>
              <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={delay(150)}>
                <span className="h-px w-10 bg-red" />
                0% Easy EMI
              </p>
              <h1 className="fade-up mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={delay(250)}>
                Love it now, <span className="font-light italic">pay over time</span>
              </h1>
              <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={delay(350)}>
                Split your purchase into equal monthly payments with no interest for up to 12 months, on cards from {BANKS.length} partner banks.
              </p>
              <ul className="fade-up mt-9 flex flex-wrap gap-x-10 gap-y-5" style={delay(450)}>
                {[
                  ["0%", "interest up to 12 months"],
                  [String(BANKS.length), "partner banks"],
                  ["৳0", "extra paperwork"],
                ].map(([b, t]) => (
                  <li key={t}>
                    <span className="block text-[32px] font-semibold leading-none">{b}</span>
                    <span className="mt-1.5 block text-[13px] text-white/65">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating card */}
            <div className="fade-up hidden justify-center lg:flex" style={delay(500)} aria-hidden>
              <div className="card-tilt relative">
                <div className="absolute -inset-6 rounded-[32px] bg-red/25 blur-3xl" />
                <div className="relative h-[230px] w-[370px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#3a0d0a] p-7 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
                  <span className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-red/30" />
                  <span className="absolute -bottom-20 right-16 h-40 w-40 rounded-full bg-white/[0.06]" />
                  <div className="relative flex items-start justify-between">
                    <span className="text-[15px] font-semibold uppercase tracking-[0.22em]">Furni<span className="text-red">ture</span></span>
                    <span className="rounded-full bg-[#2f8f4e] px-3 py-1 text-[11px] font-bold">0% EMI</span>
                  </div>
                  <span className="relative mt-6 block h-8 w-11 rounded-md bg-gradient-to-br from-[#e8d6a0] to-[#b9974f]" />
                  <div className="relative mt-5 flex items-end justify-between">
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-white/55">Sofa · {taka(EXAMPLE)}</span>
                      <span className="mt-1 block text-[28px] font-semibold leading-none">{taka(monthly(EXAMPLE, 12, 0))}<span className="text-[14px] font-normal text-white/60"> /month</span></span>
                    </span>
                    <span className="text-[12px] text-white/55">12 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="relative z-10 mx-auto -mt-24 max-w-[1240px] px-4 md:-mt-28 md:px-8">
          <div className="fade-up" style={delay(600)}>
            <EmiCalculator />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-[1440px] px-4 py-24 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">How it works</p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-tight text-ink">Four simple steps</h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <span className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-[repeating-linear-gradient(to_right,#d8d8d8_0_8px,transparent_8px_16px)] md:block" aria-hidden />
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <Reveal delay={i * 120} className="group relative text-center">
                  <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-ink shadow-[0_15px_30px_-15px_rgba(0,0,0,0.35)] ring-8 ring-[#f6f5f3] transition-all duration-500 group-hover:bg-red group-hover:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.d} /></svg>
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">{i + 1}</span>
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold text-ink">{s.t}</h3>
                  <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-relaxed text-muted">{s.s}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* EXAMPLE TABLE */}
        <section className="bg-white py-24 md:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">An example</p>
              <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-tight text-ink">A {taka(EXAMPLE)} sofa, your way</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-charcoal">
                Up to 12 months you pay exactly the price, nothing more. Choose a longer plan if a smaller monthly amount suits you better.
              </p>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden">
                <Image src={img("1493663284031-b7e3aefcae8e", 1200)} alt="A modern sofa in a calm living room" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1.5s] hover:scale-105" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden border border-line">
                <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-ink px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  <span>Plan</span>
                  <span className="text-right">Monthly</span>
                  <span className="text-right">Total</span>
                </div>
                {TENURES.map((t) => {
                  const m = monthly(EXAMPLE, t.m, t.rate);
                  const free = t.rate === 0;
                  return (
                    <div key={t.m} className="grid grid-cols-[1fr_1.2fr_1.2fr] items-center border-t border-line px-5 py-5 transition-colors duration-300 first:border-0 hover:bg-[#f6f5f3]">
                      <span>
                        <span className="block text-[16px] font-semibold text-ink">{t.m} months</span>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${free ? "bg-[#e3f2e8] text-[#2f8f4e]" : "bg-mist text-charcoal"}`}>{free ? "0% interest" : `${t.rate}% p.a.`}</span>
                      </span>
                      <span className="text-right text-[20px] font-semibold tabular-nums text-ink">{taka(m)}</span>
                      <span className={`text-right text-[15px] tabular-nums ${free ? "text-charcoal" : "text-muted"}`}>{taka(totalPayable(EXAMPLE, t.m, t.rate))}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-[13px] text-muted">Illustrative. Rounded up to the nearest ৳10; your bank confirms the final amounts.</p>
            </Reveal>
          </div>
        </section>

        {/* BANKS */}
        <section id="banks" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-24 md:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Partner banks</p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-tight text-ink">Is your card eligible?</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-charcoal">
              Credit cards from these banks can be used for EMI. The bar shows the plans each bank offers: <span className="font-semibold text-[#2f8f4e]">green</span> is 0% interest.
            </p>
          </Reveal>
          <div className="mt-10">
            <BankFinder />
          </div>
        </section>

        {/* NEED + FAQ */}
        <section className="mx-auto grid max-w-[1440px] gap-6 px-4 pb-24 md:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden bg-ink p-8 text-white md:p-10">
              <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red/20" />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.3em] text-white/60">What you need</p>
              <h2 className="relative mt-3 text-[28px] font-semibold leading-tight">Ready in a minute</h2>
              <ul className="relative mt-8 space-y-5">
                {NEED.map((n) => (
                  <li key={n} className="flex items-start gap-4 text-[16px] text-white/85">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2f8f4e]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="relative mt-10 border-t border-white/15 pt-6 text-[14px] leading-relaxed text-white/60">
                No credit card? You can still pay by bKash, Nagad, bank transfer or cash on delivery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-white p-8 md:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Good to know</p>
              <h2 className="mt-3 text-[28px] font-semibold leading-tight text-ink">EMI questions</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {QA.map((x) => (
                  <details key={x.q} className="faq group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold text-ink transition-colors hover:text-red [&::-webkit-details-marker]:hidden">
                      {x.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 group-open:border-red group-open:bg-red group-open:text-white">+</span>
                    </summary>
                    <p className="faq-body pb-5 pr-12 text-[15px] leading-relaxed text-charcoal">{x.a}</p>
                  </details>
                ))}
              </div>
              <p className="mt-6 text-[14px] text-muted">
                More answers in our <Link href="/faq" className="font-semibold text-ink underline-offset-4 hover:text-red hover:underline">FAQ</Link>, or <Link href="/contact" className="font-semibold text-ink underline-offset-4 hover:text-red hover:underline">talk to us</Link>.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
