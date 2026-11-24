import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import ProjectEnquiryForm from "../components/ProjectEnquiryForm";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Interior Project Solution — Furniture",
  description: "From homes to hotels — our design team delivers complete turnkey interiors.",
};

const STATS = [["1,200+", "Projects delivered"], ["18", "Years of experience"], ["60+", "Designers & engineers"], ["64", "Districts served"]];

const SERVICES = [
  { t: "Residential", d: "Complete homes and single rooms — layouts, joinery, furniture and styling.", i: "1618220179428-22790b461013" },
  { t: "Hospitality", d: "Hotels, restaurants and lobbies designed to welcome guests and last.", i: "1600566753190-17f0baa2a6c3" },
  { t: "Workplace", d: "Offices and co-working spaces that help teams do their best work.", i: "1524758631624-e2822e304c36" },
  { t: "Institutional", d: "Durable, compliant fit-outs for schools, clinics and hospitals.", i: "1551298370-9d3d53740c72" },
];

const PROCESS = [
  { t: "Consultation", d: "A free visit to understand your space, needs and budget." },
  { t: "Concept & 3D", d: "Mood boards, layouts and photo-real 3D renders for approval." },
  { t: "Detailed design", d: "Technical drawings, materials and a fixed, transparent quote." },
  { t: "Build & install", d: "Our own factory and site teams manufacture and install everything." },
  { t: "Handover", d: "A final walk-through, styling touches and our 10-year guarantee." },
];

const WORK = [
  { t: "Lakeside Residence", tag: "Residential · Gulshan", i: "1600210492486-724fe5c67fb0", big: true },
  { t: "Studio Café", tag: "Hospitality · Banani", i: "1554118811-1e0d58224f24" },
  { t: "Tech Hub HQ", tag: "Workplace · Tejgaon", i: "1497366216548-37526070297c" },
  { t: "Family Duplex", tag: "Residential · Uttara", i: "1616486338812-3dadae4b4ace" },
  { t: "Boutique Hotel", tag: "Hospitality · Cox's Bazar", i: "1582719478250-c89cae4dc85b" },
];

export default function InteriorProjectsPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative h-[86vh] min-h-[560px] overflow-hidden bg-charcoal">
          <Image src={img("1551298370-9d3d53740c72", 2400)} alt="Interior project" fill preload sizes="100vw" className="kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-4 pt-16 text-white md:px-8">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Interior Projects</span>
            </nav>
            <p className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.4em] text-white/80" style={{ "--delay": "200ms" } as React.CSSProperties}>
              Turnkey interior solutions
            </p>
            <h1 className="fade-up mt-4 max-w-[820px] text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]" style={{ "--delay": "320ms" } as React.CSSProperties}>
              From homes to <span className="text-red">hotels</span>
            </h1>
            <p className="fade-up mt-6 max-w-[520px] text-[17px] font-light leading-relaxed text-white/90 md:text-[19px]" style={{ "--delay": "440ms" } as React.CSSProperties}>
              One team for design, manufacturing and installation — so your space is delivered on time, on budget and exactly as imagined.
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ "--delay": "560ms" } as React.CSSProperties}>
              <a href="#enquire" className="group inline-flex items-center gap-3 bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-red-dark">
                Book a free consultation <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
              <a href="#work" className="inline-flex items-center border border-white/70 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-white hover:bg-white hover:text-ink">
                See our work
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b border-line">
          <dl className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
            {STATS.map(([v, l], i) => (
              <Reveal key={l} delay={i * 80} className="border-line px-4 py-10 text-center md:border-r md:last:border-r-0">
                <dd className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-none text-ink">{v}</dd>
                <dt className="mt-2 text-[12px] uppercase tracking-[0.16em] text-muted">{l}</dt>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 text-center md:mb-14">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">What we design</h2>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-charcoal">
                  <Image src={img(s.i, 800)} alt={s.t} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-colors duration-500 group-hover:from-red/90" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="text-[12px] font-semibold tracking-[0.2em] text-white/70">0{i + 1}</span>
                    <h3 className="mt-1 text-[24px] font-semibold">{s.t}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-[14px] leading-relaxed text-white/90 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-ink py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal className="mb-12 md:mb-16">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">How it works</p>
              <h2 className="mt-3 text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium">Five steps to your finished space</h2>
            </Reveal>
            <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
              {PROCESS.map((p, i) => (
                <Reveal key={p.t} delay={i * 100}>
                  <li className="relative">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 text-[15px] font-semibold transition-colors hover:border-red hover:bg-red">
                        0{i + 1}
                      </span>
                      {i < PROCESS.length - 1 && <span className="hidden h-px flex-1 bg-white/20 md:block" />}
                    </div>
                    <h3 className="mt-5 text-[18px] font-medium">{p.t}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/65">{p.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 flex items-end justify-between gap-4 md:mb-14">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">Recent projects</h2>
            <a href="#enquire" className="link-line shrink-0 text-[14px] font-medium text-charcoal hover:text-red">Start yours</a>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
            {WORK.map((w, i) => (
              <Reveal key={w.t} delay={i * 80} className={w.big ? "md:col-span-2 md:row-span-2" : ""}>
                <figure className={`group relative h-full overflow-hidden bg-mist ${w.big ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}>
                  <Image src={img(w.i, w.big ? 1600 : 800)} alt={w.t} fill sizes={w.big ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 100vw"} className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 p-5 text-white md:p-7">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">{w.tag}</p>
                    <p className={`mt-1 font-medium ${w.big ? "text-[clamp(1.5rem,2.4vw,2.25rem)]" : "text-[20px]"}`}>{w.t}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="bg-mist py-16 md:py-24">
          <Reveal className="mx-auto max-w-[900px] px-4 text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" className="mx-auto text-red" fill="currentColor" aria-hidden>
              <path d="M9.5 6C6.5 7.2 4.5 9.8 4.5 13v5h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.5 6zm9 0c-3 1.2-5 3.8-5 7v5h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.5 6z" />
            </svg>
            <blockquote className="mt-6 text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.3] text-ink">
              They handled everything — design, furniture, lighting and installation. We moved into a finished home, two weeks ahead of schedule.
            </blockquote>
            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-muted">Homeowner · Lakeside Residence</p>
          </Reveal>
        </section>

        {/* ENQUIRY */}
        <section id="enquire" className="scroll-mt-20">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:px-8 md:py-24">
            <Reveal>
              <span className="mb-6 block h-[3px] w-10 bg-red" />
              <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-tight text-ink">Tell us about your space</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                Share a few details and our design team will call you to arrange a free, no-obligation consultation.
              </p>
              <div className="mt-8 space-y-4 text-[15px] text-charcoal">
                <p className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-red/10 text-red">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
                  </span>
                  Call our design desk, Sat–Thu 10am–8pm
                </p>
                <p className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-red/10 text-red">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-6-5.3-6-11a6 6 0 0112 0c0 5.7-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></svg>
                  </span>
                  Or visit any of our 60+ showrooms
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="border border-line bg-white p-6 md:p-10">
              <ProjectEnquiryForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
