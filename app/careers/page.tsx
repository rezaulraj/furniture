import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import CareersBoard from "../components/CareersBoard";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Careers — Furniture",
  description: "Join our makers, designers, stylists and crews. See open roles and apply online.",
};

// Placeholder figures and perks — replace with the real ones.
const STATS = [
  { to: 1200, suffix: "+", t: "people across Bangladesh" },
  { to: 18, suffix: "", t: "showrooms" },
  { to: 42, suffix: "%", t: "of leaders promoted from within" },
];

const PERKS = [
  { t: "Fair pay, on time", s: "Competitive salaries, two festival bonuses a year and a yearly review.", d: "M3 6h18v12H3zM3 10h18M7 15h3" },
  { t: "Health cover", s: "Medical insurance for you and your family from your first month.", d: "M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9zM12 10v5M9.5 12.5h5" },
  { t: "Learn your craft", s: "Apprenticeships, design workshops and a yearly learning budget.", d: "M3 8l9-4 9 4-9 4zM7 10v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5" },
  { t: "Grow with us", s: "Clear career paths, and most of our managers started on the shop floor.", d: "M4 20l6-6 4 4 6-8M14 10h6v6" },
  { t: "Staff discount", s: "30% off everything we make, to make your own home beautiful.", d: "M20 12l-8 8-9-9V3h8zM7.5 7.5h.01" },
  { t: "Lunch on us", s: "A hot meal every working day in our workshop and head office canteens.", d: "M4 11h16a8 8 0 01-16 0zM8 4c0 2 2 2 2 4M12 4c0 2 2 2 2 4" },
];

const PROCESS = [
  { t: "Apply", s: "Send your CV in a few minutes. No cover letter needed." },
  { t: "Chat", s: "A friendly 20-minute call with our people team." },
  { t: "Meet the team", s: "Visit us, meet your future manager, and for makers, a short skills test." },
  { t: "Welcome!", s: "An offer within a week, and a proper first-day welcome." },
];

const QUOTES = [
  { q: "I joined as an apprentice. Eight years later I lead the upholstery floor and train new makers myself.", r: "Upholstery Lead, Gazipur workshop", img: "1555041469-a586c61ea9bc" },
  { q: "Seeing a family's face when their home comes together is the best part of my week.", r: "Design Consultant, Gulshan", img: "1600210492486-724fe5c67fb0" },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1524758631624-e2822e304c36", 2400)} alt="Our bright, open studio" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-36 text-white md:px-8 md:pb-28 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Careers</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Careers
            </p>
            <h1 className="fade-up mt-4 max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Build homes. <span className="font-light italic">Build a career.</span>
            </h1>
            <p className="fade-up mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Makers, designers, stylists, drivers and developers, all working together to bring beautiful furniture into homes across Bangladesh.
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <a href="#roles" className="group relative overflow-hidden bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-dark">
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
                See open roles
              </a>
              <a href="#life" className="border border-white/40 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
                Life with us
              </a>
            </div>
            <div className="fade-up mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-8" style={{ "--delay": "550ms" } as React.CSSProperties}>
              {STATS.map((s) => (
                <div key={s.t}>
                  <p className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-none">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-white/60 md:text-[13px]">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIFE WITH US — photo mosaic */}
        <section id="life" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Life with us</p>
                <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Proud of what we make, and how we make it</h2>
              </div>
              <p className="max-w-sm text-[16px] leading-relaxed text-muted">From the workshop floor to the showroom, we&apos;re one team that takes care of each other.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {[
              { id: "1617806118233-18e1de247200", c: "md:col-span-2 md:row-span-2", t: "Our design studio" },
              { id: "1555041469-a586c61ea9bc", c: "", t: "The upholstery floor" },
              { id: "1505693416388-ac5ce068fe85", c: "md:row-span-2", t: "Photo shoot day" },
              { id: "1586023492125-27b2c045efd7", c: "", t: "Showroom styling" },
              { id: "1618220179428-22790b461013", c: "col-span-2 md:col-span-1", t: "Finished homes" },
              { id: "1600210492486-724fe5c67fb0", c: "col-span-2 md:col-span-2", t: "Installation crews" },
            ].map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className={`group relative overflow-hidden ${p.c}`}>
                <Image src={img(p.id, 1000)} alt={p.t} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-3 text-[15px] font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{p.t}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PERKS */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Why join us</p>
                <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">We look after our people</h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PERKS.map((p, i) => (
                <Reveal key={p.t} delay={(i % 3) * 100}>
                  <div className="group relative h-full overflow-hidden bg-[#f6f5f3] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-ink hover:shadow-[0_30px_60px_-35px_rgba(0,0,0,0.6)]">
                    <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white transition-all duration-700 group-hover:scale-[2.2] group-hover:bg-red/20" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-red shadow-sm transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-red group-hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={p.d} /></svg>
                    </span>
                    <h3 className="relative mt-8 text-[20px] font-semibold text-ink transition-colors duration-500 group-hover:text-white">{p.t}</h3>
                    <p className="relative mt-2 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">{p.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTES */}
        <section className="mx-auto grid max-w-[1440px] gap-6 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2">
          {QUOTES.map((q, i) => (
            <Reveal key={q.r} delay={i * 150}>
              <figure className="group relative flex h-full flex-col overflow-hidden bg-ink text-white sm:flex-row">
                <div className="relative h-56 shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
                  <Image src={img(q.img, 700)} alt="" fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <span className="text-[64px] font-semibold leading-[0.6] text-red">&ldquo;</span>
                  <blockquote className="mt-4 text-[18px] leading-relaxed text-white/90 md:text-[20px]">{q.q}</blockquote>
                  <figcaption className="mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">{q.r}</figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </section>

        {/* ROLES */}
        <section id="roles" className="scroll-mt-20 bg-[#efedea] py-20 md:py-28">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Open roles</p>
                <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Find your place</h2>
              </div>
            </Reveal>
            <CareersBoard />
          </div>
        </section>

        {/* PROCESS */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">How hiring works</p>
              <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-tight text-ink">Simple, quick and human</h2>
            </div>
          </Reveal>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-[2px] bg-[repeating-linear-gradient(to_right,#d4d4d4_0_6px,transparent_6px_12px)] md:block" />
            {PROCESS.map((p, i) => (
              <li key={p.t} className="relative">
                <Reveal delay={i * 120} className="group flex gap-5 md:flex-col md:items-center md:text-center">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-[18px] font-semibold ring-8 ring-[#f6f5f3] transition-all duration-500 group-hover:-translate-y-1 ${i === 3 ? "bg-red text-white" : "bg-white text-ink shadow-[0_15px_30px_-15px_rgba(0,0,0,0.35)] group-hover:bg-ink group-hover:text-white"}`}>
                    {i + 1}
                  </span>
                  <div className="md:mt-6">
                    <p className="text-[18px] font-semibold text-ink">{p.t}</p>
                    <p className="mt-1.5 max-w-[240px] text-[14px] leading-relaxed text-muted">{p.s}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
          <div className="relative overflow-hidden bg-red px-6 py-14 text-center text-white md:px-16 md:py-20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-black/10" />
            <div className="relative">
              <h2 className="text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-tight">Don&apos;t see the right role?</h2>
              <p className="mx-auto mt-3 max-w-lg text-[16px] text-white/85">We&apos;re always happy to meet talented people. Tell us what you do best.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#roles" className="bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-red transition-colors hover:bg-ink hover:text-white">Browse roles</a>
                <Link href="/about" className="border border-white/60 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10">Our story</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
