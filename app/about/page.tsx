import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "About Us — Furniture",
  description: "Our story: furniture designed and made in Bangladesh, built to be lived with for generations.",
};

// Placeholder story content — replace with the real history and figures.
const STATS = [
  { to: 25, suffix: "+", t: "years of making" },
  { to: 120000, suffix: "+", t: "homes furnished" },
  { to: 18, suffix: "", t: "showrooms nationwide" },
  { to: 650, suffix: "+", t: "craftspeople" },
];

const TIMELINE = [
  { y: "2000", t: "A small workshop", s: "Three carpenters and one idea: honest furniture, built properly, at a fair price.", img: "1617806118233-18e1de247200" },
  { y: "2006", t: "Our first showroom", s: "We opened our doors in Dhaka so people could sit, touch and try before they buy.", img: "1586023492125-27b2c045efd7" },
  { y: "2013", t: "Free installation, always", s: "We built our own delivery crews, so every piece arrives and is set up with care.", img: "1600210492486-724fe5c67fb0" },
  { y: "2019", t: "Responsibly sourced", s: "We moved to certified timber and began planting a tree for every bed we sell.", img: "1505693416388-ac5ce068fe85" },
  { y: "Today", t: "Homes across the country", s: "Eighteen showrooms, online ordering and the same promise we started with.", img: "1618220179428-22790b461013" },
];

const VALUES = [
  { t: "Made to last", s: "Solid joinery, kiln-dried timber and a 10-year frame warranty. Built for decades, not seasons.", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
  { t: "Designed for real life", s: "Comfortable, practical and beautiful, with sizes and fabrics chosen for local homes.", d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { t: "Kinder to the planet", s: "Certified wood, low-VOC finishes and packaging we take back and reuse.", d: "M5 21c0-9 5-15 15-16-1 10-7 15-15 16zM5 21l7-7" },
  { t: "Service with heart", s: "Free delivery and installation by our own people, and a team that picks up the phone.", d: "M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" },
];

const CRAFT = [
  { n: "01", t: "Select", s: "Seasoned, certified timber chosen board by board." },
  { n: "02", t: "Shape", s: "Cut and joined by hand with mortise-and-tenon joints." },
  { n: "03", t: "Finish", s: "Sanded smooth, then sealed with low-VOC oils." },
  { n: "04", t: "Check", s: "Every piece is inspected twice before it leaves us." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink">
          <Image src={img("1600210492486-724fe5c67fb0", 2400)} alt="A warm, lived-in living room" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-40 text-white md:px-8 md:pb-24">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Our story since 2000
            </p>
            <h1 className="fade-up mt-5 max-w-5xl text-[clamp(3rem,7.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.03em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Made for the way <span className="whitespace-nowrap font-light italic">you live</span>
            </h1>
            <div className="fade-up mt-10 flex flex-wrap items-end justify-between gap-8" style={{ "--delay": "400ms" } as React.CSSProperties}>
              <p className="max-w-lg text-[16px] leading-relaxed text-white/80 md:text-[18px]">
                For over twenty-five years we&apos;ve designed and built furniture in Bangladesh: honest, beautiful pieces made to be lived with for generations.
              </p>
              <a href="#story" className="group flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.2em]">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <span className="scroll-cue">↓</span>
                </span>
                Read our story
              </a>
            </div>
          </div>
        </section>

        {/* INTRO STATEMENT + COLLAGE */}
        <section id="story" className="mx-auto grid max-w-[1440px] scroll-mt-20 items-center gap-12 px-4 py-20 md:px-8 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Who we are</p>
            <p className="mt-6 text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
              We believe a home should feel <span className="text-red">calm, warm and completely yours</span>. So we make furniture the slow way, with real wood,{" "}
              <span className="italic text-muted">skilled hands</span> and designs that never go out of style.
            </p>
            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-16 bg-ink" />
              <p className="text-[14px] text-muted">The founders, Dhaka</p>
            </div>
          </Reveal>
          <div className="relative h-[460px] md:h-[560px]">
            <Reveal className="absolute left-0 top-0 h-[72%] w-[62%] overflow-hidden" delay={100}>
              <Image src={img("1617806118233-18e1de247200", 900)} alt="A dining room" fill sizes="(min-width:1024px) 28vw, 60vw" className="object-cover transition-transform duration-[1.5s] hover:scale-105" />
            </Reveal>
            <Reveal className="absolute bottom-0 right-0 h-[64%] w-[52%] overflow-hidden ring-[10px] ring-[#f6f5f3]" delay={250}>
              <Image src={img("1586023492125-27b2c045efd7", 800)} alt="An armchair in a bright room" fill sizes="(min-width:1024px) 24vw, 50vw" className="object-cover transition-transform duration-[1.5s] hover:scale-105" />
            </Reveal>
            <Reveal className="absolute bottom-[8%] left-[6%] z-10" delay={400}>
              <div className="float-slow grid h-32 w-32 place-items-center rounded-full bg-red text-center text-white shadow-[0_20px_40px_-15px_rgba(200,16,46,0.8)]">
                <span>
                  <span className="block text-[34px] font-semibold leading-none">25</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em]">years of<br />craft</span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.t} delay={i * 100} className={`px-2 lg:px-8 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
                <p className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.02em]">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[14px] uppercase tracking-[0.14em] text-white/60">{s.t}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-32">
          <Reveal>
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Our journey</p>
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">From one workshop to your home</h2>
            </div>
          </Reveal>
          <ol className="relative mx-auto mt-16 max-w-5xl">
            <span className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-line md:left-1/2 md:-translate-x-1/2" />
            {TIMELINE.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.y} className="relative pb-14 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  <span className="absolute left-0 top-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-red text-white ring-8 ring-[#f6f5f3] md:left-1/2 md:-translate-x-1/2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  <Reveal className={`${right ? "md:col-start-2" : "md:text-right"}`}>
                    <p className="text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.02em] text-ink/15">{m.y}</p>
                    <h3 className="mt-2 text-[22px] font-semibold text-ink">{m.t}</h3>
                    <p className={`mt-2 max-w-md text-[15px] leading-relaxed text-muted ${right ? "" : "md:ml-auto"}`}>{m.s}</p>
                  </Reveal>
                  <Reveal className={`mt-5 md:mt-0 ${right ? "md:col-start-1 md:row-start-1" : ""}`} delay={150}>
                    <div className="group relative aspect-[16/10] overflow-hidden">
                      <Image src={img(m.img, 900)} alt="" fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover grayscale-[35%] transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0" />
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* VALUES */}
        <section className="bg-white py-20 md:py-32">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">What we stand for</p>
                  <h2 className="mt-3 max-w-xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Four promises behind every piece</h2>
                </div>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden bg-line md:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.t} delay={i * 100} className="h-full">
                  <div className="group relative h-full overflow-hidden bg-white p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                    <span className="absolute right-6 top-6 text-[56px] font-semibold leading-none text-mist transition-colors duration-500 group-hover:text-white/10">0{i + 1}</span>
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#f6f5f3] text-red transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-red group-hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={v.d} /></svg>
                    </span>
                    <h3 className="relative mt-10 text-[21px] font-semibold text-ink transition-colors duration-500 group-hover:text-white">{v.t}</h3>
                    <p className="relative mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">{v.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CRAFT */}
        <section className="relative isolate overflow-hidden">
          <Image src={img("1555041469-a586c61ea9bc", 2400)} alt="" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/80" />
          <div className="mx-auto max-w-[1440px] px-4 py-20 text-white md:px-8 md:py-32">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/60">How we make it</p>
              <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight">
                Crafted in our workshop, <span className="font-light italic">by hand</span>
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CRAFT.map((c, i) => (
                <li key={c.t}>
                  <Reveal delay={i * 120} className="group h-full border-t-2 border-white/20 pt-6 transition-colors duration-500 hover:border-red">
                    <span className="text-[13px] font-semibold tracking-[0.2em] text-red">{c.n}</span>
                    <h3 className="mt-3 text-[26px] font-semibold">{c.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/70">{c.s}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="text-center">
              <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                Come and see it <span className="font-light italic text-red">for yourself</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[16px] text-muted">Visit a showroom, explore the collection, or build your career with us.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "Visit a showroom", s: "Sit, touch and get free styling advice.", h: "/contact", img: "1618220179428-22790b461013" },
              { t: "Shop the collection", s: "Every room, made to last.", h: "/categories", img: "1617806118233-18e1de247200" },
              { t: "Work with us", s: "Join our makers, stylists and crews.", h: "/careers", img: "1524758631624-e2822e304c36" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 100}>
                <Link href={c.h} className="group relative block aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                  <Image src={img(c.img, 900)} alt="" fill sizes="(min-width:768px) 32vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute inset-x-6 bottom-6 text-white">
                    <span className="flex items-center justify-between">
                      <span className="text-[24px] font-semibold">{c.t}</span>
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/50 transition-all duration-500 group-hover:border-red group-hover:bg-red">→</span>
                    </span>
                    <span className="mt-1 block text-[14px] text-white/75">{c.s}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
