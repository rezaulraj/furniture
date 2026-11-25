import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { CopyButton, KitCard, PressReleases } from "../components/PressRoom";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Press — Furniture",
  description: "News, press releases, awards and our media kit.",
};

// Placeholder publication names, quotes and awards — fictional, replace with real coverage.
const OUTLETS = ["Dhaka Living", "Home & Habitat", "The Design Ledger", "Modern Nest", "City Interiors", "Weekend Style", "Craft Quarterly", "Bay Business Review"];

const QUOTES = [
  { q: "The rare local brand that gets both comfort and craftsmanship right.", o: "Home & Habitat" },
  { q: "Their free installation service sets the standard everyone else is chasing.", o: "Bay Business Review" },
  { q: "Warm, honest design that feels made for the way we actually live.", o: "Dhaka Living" },
];

const AWARDS = [
  { y: "2025", t: "Furniture Brand of the Year", by: "National Retail Awards" },
  { y: "2024", t: "Best Sustainable Practice", by: "Green Business Forum" },
  { y: "2023", t: "Design Excellence, Seating", by: "South Asia Design Week" },
  { y: "2022", t: "Customer Service Champion", by: "Consumer Choice Awards" },
];

const KIT = [
  { t: "Logo pack", s: "Primary and reversed logos in SVG and PNG.", size: "ZIP · 4 MB", d: "M4 4h16v16H4zM8 15l3-4 2 3 2-2 3 3" },
  { t: "Image library", s: "High-resolution room sets and product photography.", size: "ZIP · 180 MB", d: "M4 6h16v12H4zM4 15l4-4 4 4 3-3 5 5M15.5 9.5h.01" },
  { t: "Brand guidelines", s: "Colours, typography and how to use our name.", size: "PDF · 12 MB", d: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" },
  { t: "Company fact sheet", s: "Our story, key figures and leadership in one page.", size: "PDF · 1 MB", d: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
];

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1617806118233-18e1de247200", 2400)} alt="A styled dining room" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-36 text-white md:px-8 md:pb-32 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Press</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Press &amp; media
            </p>
            <h1 className="fade-up mt-4 max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              News from <span className="font-light italic">our world</span>
            </h1>
            <p className="fade-up mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Collection launches, new showrooms, awards and stories from our workshop. Journalists, find everything you need right here.
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <a href="#news" className="bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-dark">Latest news</a>
              <a href="#kit" className="border border-white/40 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink">Media kit</a>
            </div>
          </div>
        </section>

        {/* AS FEATURED IN */}
        <section className="border-b border-line bg-white py-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">As featured in</p>
          <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee flex w-max items-center gap-16 hover:[animation-play-state:paused]">
              {[...OUTLETS, ...OUTLETS].map((o, i) => (
                <span key={i} className={`whitespace-nowrap text-[22px] text-ink/35 transition-colors duration-300 hover:text-ink md:text-[26px] ${i % 3 === 0 ? "font-semibold italic" : i % 3 === 1 ? "font-light uppercase tracking-[0.2em]" : "font-bold tracking-tight"}`}>
                  {o}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section id="news" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <PressReleases />
          </Reveal>
        </section>

        {/* QUOTES */}
        <section className="bg-ink py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <p className="text-center text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">What they say</p>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden bg-white/10 md:grid-cols-3">
              {QUOTES.map((q, i) => (
                <Reveal key={q.o} delay={i * 120} className="h-full">
                  <figure className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-[#262626] md:p-10">
                    <span className="text-[72px] font-semibold leading-[0.5] text-red transition-transform duration-500 group-hover:-translate-y-1">&ldquo;</span>
                    <blockquote className="mt-6 flex-1 text-[20px] font-light leading-relaxed text-white/90 md:text-[22px]">{q.q}</blockquote>
                    <figcaption className="mt-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/60">
                      <span className="h-px w-8 bg-red" />
                      {q.o}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* AWARDS */}
        <section className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.5fr]">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Recognition</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Awards &amp; honours</h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted">Thank you to everyone who has trusted us with their homes. These belong to our whole team.</p>
          </Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {AWARDS.map((a, i) => (
              <li key={a.t}>
                <Reveal delay={i * 90} className="group flex items-center gap-6 py-7 transition-all duration-500 hover:pl-3">
                  <span className="text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-none text-ink/15 transition-colors duration-500 group-hover:text-red">{a.y}</span>
                  <span className="flex-1">
                    <span className="block text-[19px] font-semibold text-ink">{a.t}</span>
                    <span className="mt-1 block text-[14px] text-muted">{a.by}</span>
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-[#e0a526] transition-all duration-500 group-hover:rotate-12 group-hover:border-[#e0a526] group-hover:bg-[#e0a526] group-hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 13.8L7 22l5-3 5 3-1.5-8.2" /></svg>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* MEDIA KIT */}
        <section id="kit" className="scroll-mt-20 bg-[#efedea] py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Media kit</p>
                  <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Everything for your story</h2>
                </div>
                <p className="max-w-sm text-[15px] text-muted">Free to use for editorial coverage. Please credit &ldquo;Furniture&rdquo;.</p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {KIT.map((k, i) => (
                <Reveal key={k.t} delay={i * 90} className="h-full">
                  <KitCard {...k} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MEDIA CONTACT */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <div className="grid overflow-hidden bg-ink text-white lg:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-[280px]">
              <Image src={img("1524758631624-e2822e304c36", 1200)} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <Reveal className="p-8 md:p-14">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">Media enquiries</p>
              <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">Writing about us? Let&apos;s talk.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/75">For interviews, product loans, showroom shoots or anything else, our communications team usually replies within a day.</p>
              <dl className="mt-8 space-y-4 text-[15px]">
                <div className="flex gap-4 border-b border-white/10 pb-4">
                  <dt className="w-20 shrink-0 text-white/55">Email</dt>
                  <dd className="font-medium">press@furniture.example</dd>
                </div>
                <div className="flex gap-4 border-b border-white/10 pb-4">
                  <dt className="w-20 shrink-0 text-white/55">Phone</dt>
                  <dd className="font-medium">+880 2-XXXX-XXXX</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <CopyButton text="press@furniture.example" label="Copy email" dark />
                <a href="mailto:press@furniture.example" className="border border-white/40 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10">
                  Send an email
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
