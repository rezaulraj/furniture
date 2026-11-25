import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import { FranchiseCalculator, FranchiseForm } from "../components/FranchiseTools";
import { bdt, FORMATS } from "../components/franchiseData";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Franchise — Furniture",
  description: "Open a Furniture store in your city. Proven formats, full training and support from a brand people already love.",
};

// Placeholder figures and terms — replace with the real franchise programme.
const STATS = [
  { to: 25, suffix: "+", t: "years of brand trust" },
  { to: 18, suffix: "", t: "stores and growing" },
  { to: 90, suffix: "", t: "days from signing to opening" },
];

const WHY = [
  { t: "A brand people love", s: "Recognised name, loyal customers and a growing online audience sending shoppers your way.", d: "M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" },
  { t: "Products made by us", s: "Our own workshop supplies every piece, so quality, stock and margins are dependable.", d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" },
  { t: "Delivery handled", s: "Our crews deliver and install, so you can focus on customers and your team.", d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { t: "Training & tools", s: "Sales and design training, a store system, and marketing campaigns ready to run.", d: "M3 8l9-4 9 4-9 4zM7 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5" },
];

const STEPS = [
  { d: "Week 1", t: "Discovery call", s: "We get to know you and share our information pack." },
  { d: "Week 2–4", t: "Site & business plan", s: "We visit your location and build a plan together." },
  { d: "Week 5", t: "Agreement", s: "Sign your franchise agreement and secure your territory." },
  { d: "Week 6–11", t: "Fit-out & training", s: "We design your store while your team trains with us." },
  { d: "Day 90", t: "Grand opening", s: "Launch day, with a marketing campaign to bring the crowds." },
];

const CITIES: { c: string; s: "Available" | "Limited" | "Taken" }[] = [
  { c: "Sylhet", s: "Available" }, { c: "Rajshahi", s: "Available" }, { c: "Khulna", s: "Limited" }, { c: "Barishal", s: "Available" },
  { c: "Rangpur", s: "Available" }, { c: "Mymensingh", s: "Limited" }, { c: "Cumilla", s: "Available" }, { c: "Bogura", s: "Available" },
  { c: "Cox's Bazar", s: "Limited" }, { c: "Jessore", s: "Available" }, { c: "Dhaka", s: "Taken" }, { c: "Chattogram", s: "Taken" },
];

export default function FranchisePage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1586023492125-27b2c045efd7", 2400)} alt="A styled showroom" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="mx-auto grid max-w-[1440px] items-end gap-12 px-4 pb-20 pt-36 text-white md:px-8 md:pb-28 md:pt-44 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Franchise</span>
              </nav>
              <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
                <span className="h-px w-10 bg-red" />
                Franchise opportunities
              </p>
              <h1 className="fade-up mt-4 text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
                Bring us to <span className="font-light italic">your city</span>
              </h1>
              <p className="fade-up mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
                Open a Furniture store with a proven format, products from our own workshop, and a team behind you every step of the way.
              </p>
              <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
                <a href="#apply" className="group relative overflow-hidden bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-dark">
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
                  Apply now
                </a>
                <a href="#estimate" className="border border-white/40 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
                  Estimate earnings
                </a>
              </div>
            </div>
            <div className="fade-up grid grid-cols-3 gap-px overflow-hidden bg-white/15 backdrop-blur-md lg:grid-cols-1" style={{ "--delay": "550ms" } as React.CSSProperties}>
              {STATS.map((s) => (
                <div key={s.t} className="bg-black/25 p-5 md:p-6">
                  <p className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-none">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-white/65 md:text-[13px]">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Why partner with us</p>
                <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Your business, with our backing</h2>
              </div>
              <p className="max-w-sm text-[16px] leading-relaxed text-muted">You run the store. We bring the brand, the products and decades of know-how.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden bg-line md:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 100} className="h-full">
                <div className="group h-full bg-white p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f6f5f3] text-red transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-red group-hover:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={w.d} /></svg>
                  </span>
                  <h3 className="mt-10 text-[20px] font-semibold text-ink transition-colors duration-500 group-hover:text-white">{w.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">{w.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FORMATS */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Store formats</p>
                <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Choose the right size for you</h2>
              </div>
            </Reveal>
            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
              {FORMATS.map((f, i) => {
                const hot = i === 1;
                return (
                  <Reveal key={f.name} delay={i * 120} className="h-full">
                    <div className={`group relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 ${hot ? "bg-ink text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] lg:-my-4" : "bg-[#f6f5f3]"}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image src={img(["1586023492125-27b2c045efd7", "1600210492486-724fe5c67fb0", "1618220179428-22790b461013"][i], 900)} alt="" fill sizes="(min-width:1024px) 32vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                        {hot && <span className="absolute right-4 top-4 bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Most popular</span>}
                      </div>
                      <div className="flex flex-1 flex-col p-8">
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-[26px] font-semibold">{f.name}</h3>
                          <span className={`text-[14px] ${hot ? "text-white/60" : "text-muted"}`}>{f.area}</span>
                        </div>
                        <p className={`mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] ${hot ? "text-white/55" : "text-muted"}`}>Investment from</p>
                        <p className="mt-1 text-[34px] font-semibold leading-none">{bdt(f.invest)}</p>
                        <ul className={`mt-7 flex-1 space-y-3 border-t pt-6 text-[15px] ${hot ? "border-white/15 text-white/85" : "border-line text-charcoal"}`}>
                          {[...f.perks, `Team of about ${f.team}`].map((p) => (
                            <li key={p} className="flex items-center gap-3">
                              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${hot ? "bg-red" : "bg-ink"} text-white`}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                        <a href="#apply" className={`mt-8 block py-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${hot ? "bg-red text-white hover:bg-red-dark" : "border border-ink text-ink hover:bg-ink hover:text-white"}`}>
                          Enquire about {f.name}
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ESTIMATOR */}
        <section id="estimate" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <FranchiseCalculator />
          </Reveal>
        </section>

        {/* 90-DAY PATH */}
        <section className="bg-ink py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">Your path to opening</p>
              <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight">
                From first call to grand opening in <span className="font-light italic text-red">90 days</span>
              </h2>
            </Reveal>
            <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
              <span className="absolute left-[10%] right-[10%] top-6 hidden h-[2px] bg-gradient-to-r from-white/15 via-white/30 to-red md:block" />
              {STEPS.map((s, i) => (
                <li key={s.t} className="relative">
                  <Reveal delay={i * 120} className="group flex gap-5 md:flex-col">
                    <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-semibold ring-8 ring-ink transition-transform duration-500 group-hover:scale-110 ${i === STEPS.length - 1 ? "bg-red text-white" : "bg-white text-ink"}`}>
                      {i + 1}
                    </span>
                    <div className="md:mt-6">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-red">{s.d}</p>
                      <p className="mt-1.5 text-[19px] font-semibold">{s.t}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{s.s}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TERRITORIES */}
        <section className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Open territories</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Is your city available?</h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted">Each partner gets a protected territory. Popular cities go quickly, so get in touch early.</p>
            <div className="mt-8 flex flex-wrap gap-5 text-[13px] text-charcoal">
              {[
                ["bg-[#2f8f4e]", "Available"],
                ["bg-[#e0a526]", "Limited"],
                ["bg-[#cfcfcf]", "Taken"],
              ].map(([c, l]) => (
                <span key={l} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${c}`} />
                  {l}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CITIES.map((c, i) => {
              const color = c.s === "Available" ? "bg-[#2f8f4e]" : c.s === "Limited" ? "bg-[#e0a526]" : "bg-[#cfcfcf]";
              const taken = c.s === "Taken";
              return (
                <Reveal key={c.c} delay={(i % 6) * 60}>
                  <div className={`group flex items-center justify-between bg-white px-5 py-4 transition-all duration-300 ${taken ? "opacity-55" : "hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-20px_rgba(0,0,0,0.4)]"}`}>
                    <span>
                      <span className={`block text-[16px] font-semibold ${taken ? "text-muted line-through" : "text-ink"}`}>{c.c}</span>
                      <span className="text-[12px] text-muted">{c.s}</span>
                    </span>
                    <span className="relative flex h-3 w-3">
                      {c.s === "Available" && <span className="absolute inset-0 animate-ping rounded-full bg-[#2f8f4e] opacity-50" />}
                      <span className={`relative h-3 w-3 rounded-full ${color}`} />
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* APPLY */}
        <section id="apply" className="scroll-mt-20 bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Apply</p>
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Let&apos;s build something together</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">Tell us a little about yourself and where you&apos;d like to open. No commitment, just a conversation.</p>
              <figure className="mt-10 border-l-[3px] border-red bg-[#f6f5f3] p-7">
                <blockquote className="text-[17px] leading-relaxed text-ink">
                  &ldquo;The training and support meant we were profitable in our first year. Customers already knew and trusted the name.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">Franchise partner, Khulna</figcaption>
              </figure>
              <ul className="mt-8 space-y-3 text-[15px] text-charcoal">
                {["Reply within 3 working days", "Free information pack and business plan", "Your details stay private"].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="text-[#2f8f4e]"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <div className="bg-[#f6f5f3] p-6 md:p-10">
                <FranchiseForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
