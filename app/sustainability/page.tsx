import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import ProgressRing from "../components/ProgressRing";
import { KitCard } from "../components/PressRoom";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Sustainability — Furniture",
  description: "Certified wood, a tree for every bed, low-VOC finishes and reusable packaging. Our promise to the planet, with progress you can see.",
};

// Placeholder figures and goals — replace with audited numbers.
const IMPACT = [
  { to: 100000, suffix: "+", t: "trees planted since 2021" },
  { to: 92, suffix: "%", t: "of our wood is certified" },
  { to: 340, suffix: " t", t: "of packaging reused last year" },
  { to: 15000, suffix: "+", t: "pieces repaired, not replaced" },
];

const GOALS = [
  { v: 92, t: "Certified wood", s: "100% certified or reclaimed timber by 2027." },
  { v: 68, t: "Renewable energy", s: "Our workshop fully solar powered by 2030." },
  { v: 81, t: "Reusable packaging", s: "Blankets and crates instead of single-use wrap." },
  { v: 45, t: "Recycled fabrics", s: "Half of all upholstery from recycled fibres by 2030." },
];

const JOURNEY = [
  { t: "Responsible forests", s: "Timber from certified forests and reclaimed sources, never from protected land.", img: "1618220179428-22790b461013" },
  { t: "Mindful making", s: "Off-cuts become smaller pieces; sawdust heats our kilns. Almost nothing is wasted.", img: "1617806118233-18e1de247200" },
  { t: "Delivered gently", s: "Blanket-wrapped in our own vans, with packaging taken back and reused.", img: "1600210492486-724fe5c67fb0" },
  { t: "A second life", s: "Repair, refresh or return. We take back old pieces and give them a new home.", img: "1586023492125-27b2c045efd7" },
];

const MATERIALS = [
  { t: "Certified solid wood", s: "Kiln-dried mango, acacia and teak from managed forests.", d: "M12 3l5 7h-3l4 6h-4l2 5H8l2-5H6l4-6H7z" },
  { t: "Low-VOC finishes", s: "Water-based lacquers and natural oils that keep indoor air clean.", d: "M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" },
  { t: "Recycled fabrics", s: "Upholstery woven from recycled bottles and post-industrial fibre.", d: "M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 2M12 3v6M6 14l-2-3 5-3M18 14l2-3-5-3" },
  { t: "Built to be repaired", s: "Screws, not glue, where it matters, so parts can be replaced.", d: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.8-.7-.7-2.8z" },
];

const LEAF = "M5 21c0-9 5-15 15-16-1 10-7 15-15 16zM5 21l7-7";

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f4f5f0]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-[#13231a]">
          <Image src={img("1618220179428-22790b461013", 2400)} alt="A living room full of plants and natural materials" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f1f15]/90 via-[#13281b]/60 to-[#13281b]/10" />
          {/* drifting leaves */}
          {[
            { l: "62%", t: "22%", s: 34, d: "0s" },
            { l: "78%", t: "48%", s: 26, d: "-3s" },
            { l: "70%", t: "70%", s: 40, d: "-6s" },
            { l: "88%", t: "28%", s: 22, d: "-1.5s" },
          ].map((f, i) => (
            <svg key={i} aria-hidden width={f.s} height={f.s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="leaf-drift absolute hidden text-[#b9e4a8]/70 md:block" style={{ left: f.l, top: f.t, animationDelay: f.d }}>
              <path d={LEAF} />
            </svg>
          ))}
          <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-36 text-white md:px-8 md:pb-32 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Sustainability</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b9e4a8]" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-[#b9e4a8]" />
              Sustainability
            </p>
            <h1 className="fade-up mt-4 max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Made to last. <span className="font-light italic text-[#b9e4a8]">Kind to the planet.</span>
            </h1>
            <p className="fade-up mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              The most sustainable sofa is the one you never have to replace. So we build for decades, source responsibly, and take care of what happens next.
            </p>
            <a href="#goals" className="fade-up group mt-9 inline-flex items-center gap-3 bg-[#b9e4a8] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#13231a] transition-colors hover:bg-white" style={{ "--delay": "450ms" } as React.CSSProperties}>
              See our progress
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </section>

        {/* IMPACT NUMBERS */}
        <section className="relative z-10 mx-auto -mt-14 max-w-[1440px] px-4 md:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-[#dfe5d8] shadow-[0_30px_60px_-40px_rgba(19,35,26,0.6)] lg:grid-cols-4">
            {IMPACT.map((s, i) => (
              <Reveal key={s.t} delay={i * 90} className="bg-white p-6 md:p-8">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-[#2f8f4e]"><path d={LEAF} /></svg>
                <p className="mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-none text-[#13231a]">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[14px] text-muted">{s.t}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATEMENT */}
        <section className="mx-auto max-w-[1100px] px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <p className="text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.3] tracking-[-0.01em] text-[#13231a]">
              We plant <span className="text-[#2f8f4e]">a tree for every bed</span> we sell, build with <span className="text-[#2f8f4e]">certified wood</span>, and design every piece to be <span className="italic text-muted">repaired, not replaced</span>.
            </p>
          </Reveal>
        </section>

        {/* GOALS */}
        <section id="goals" className="scroll-mt-20 bg-[#13231a] py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#b9e4a8]">Our 2030 goals</p>
                  <h2 className="mt-3 max-w-xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight">Progress you can measure</h2>
                </div>
                <p className="max-w-sm text-[15px] text-white/65">Updated every year in our impact report, checked by an independent auditor.</p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GOALS.map((g, i) => (
                <Reveal key={g.t} delay={i * 110} className="h-full">
                  <div className="group flex h-full flex-col items-center bg-white/[0.04] p-8 text-center ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07]">
                    <ProgressRing value={g.v} />
                    <h3 className="mt-7 text-[19px] font-semibold">{g.t}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/65">{g.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#2f8f4e]">The life of a piece</p>
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-[#13231a]">From forest to forever</h2>
            </div>
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <li key={j.t}>
                <Reveal delay={i * 120} className="group h-full">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={img(j.img, 800)} alt="" fill sizes="(min-width:1024px) 23vw, (min-width:768px) 45vw, 90vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#13231a]/90 via-[#13231a]/20 to-transparent" />
                    <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[#b9e4a8] text-[15px] font-bold text-[#13231a]">{i + 1}</span>
                    <span className="absolute inset-x-5 bottom-5 text-white">
                      <span className="block text-[21px] font-semibold">{j.t}</span>
                      <span className="mt-2 block text-[14px] leading-relaxed text-white/75 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100">{j.s}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* MATERIALS */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#2f8f4e]">Better materials</p>
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-[#13231a]">What goes into every piece</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">We choose materials that are good for your home and gentle on the world, then make them strong enough to last a lifetime.</p>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image src={img("1555041469-a586c61ea9bc", 1000)} alt="A sofa in recycled fabric" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 px-4 py-2.5 text-[13px] font-medium text-[#13231a] backdrop-blur">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#2f8f4e]"><path d={LEAF} /></svg>
                  Upholstered in recycled fabric
                </span>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.t} delay={i * 100} className="h-full">
                  <div className="group h-full bg-[#f4f5f0] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-[#13231a]">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#2f8f4e] transition-all duration-500 group-hover:rotate-[-10deg] group-hover:bg-[#b9e4a8] group-hover:text-[#13231a]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
                    </span>
                    <h3 className="mt-8 text-[20px] font-semibold text-[#13231a] transition-colors duration-500 group-hover:text-white">{m.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">{m.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TAKE-BACK */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <div className="relative overflow-hidden bg-[#b9e4a8] px-6 py-14 md:px-16 md:py-20">
            <svg aria-hidden width="420" height="420" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.4" className="pointer-events-none absolute -right-20 -top-16 text-[#13231a]/10">
              <path d={LEAF} />
            </svg>
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#13231a]/70">Take-back programme</p>
                <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-[#13231a]">Give your old furniture a second life</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#13231a]/75">
                  When we deliver your new piece, we&apos;ll collect the old one for free. We repair and donate what we can, and responsibly recycle the rest. You&apos;ll get ৳1,000 off your order too.
                </p>
              </Reveal>
              <Reveal className="flex flex-wrap gap-3 lg:justify-end" delay={150}>
                <Link href="/contact" className="bg-[#13231a] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ink">Book a collection</Link>
                <Link href="/faq" className="border border-[#13231a]/40 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#13231a] transition-colors hover:border-[#13231a] hover:bg-white/40">How it works</Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* REPORTS */}
        <section className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#2f8f4e]">Transparency</p>
                <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight text-[#13231a]">Read the full picture</h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { t: "Impact report 2025", s: "Our progress, numbers and what we'll do better.", size: "PDF · 8 MB", d: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" },
              { t: "Sourcing policy", s: "How we choose and check every supplier.", size: "PDF · 2 MB", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
              { t: "Wood certificates", s: "Chain-of-custody certificates for our timber.", size: "ZIP · 6 MB", d: "M12 3l5 7h-3l4 6h-4l2 5H8l2-5H6l4-6H7z" },
            ].map((k, i) => (
              <Reveal key={k.t} delay={i * 90} className="h-full">
                <KitCard {...k} green />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
