import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import CatalogueForm from "../components/CatalogueForm";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Request a Catalogue — Furniture",
  description: "Pre-order our new Winter Catalogue and discover the season's collection in print or as a PDF.",
};

const INSIDE = [
  { t: "Living", n: "42 pages", i: "1555041469-a586c61ea9bc" },
  { t: "Bedroom", n: "36 pages", i: "1505693416388-ac5ce068fe85" },
  { t: "Dining", n: "28 pages", i: "1617806118233-18e1de247200" },
  { t: "Workspace", n: "20 pages", i: "1524758631624-e2822e304c36" },
];

export default function CataloguePage() {
  return (
    <>
      <Header solid />
      <main>
        {/* HERO with catalogue cover mock-up */}
        <section className="overflow-hidden bg-mist">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 pb-16 pt-32 md:grid-cols-2 md:gap-16 md:px-8 md:pb-24 md:pt-40">
            <div>
              <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-muted" style={{ "--delay": "50ms" } as React.CSSProperties}>
                <Link href="/" className="hover:text-red">Home</Link>
                <span>/</span>
                <span className="text-ink">Catalogue</span>
              </nav>
              <p className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.35em] text-red" style={{ "--delay": "150ms" } as React.CSSProperties}>
                New · Winter 2026
              </p>
              <h1 className="fade-up mt-4 text-[clamp(2.75rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-ink" style={{ "--delay": "250ms" } as React.CSSProperties}>
                The Winter <span className="text-red">Catalogue</span>
              </h1>
              <p className="fade-up mt-6 max-w-[480px] text-[17px] leading-relaxed text-muted" style={{ "--delay": "350ms" } as React.CSSProperties}>
                180 pages of new collections, room ideas and styling advice — delivered free to your door, or straight to your inbox.
              </p>
              <dl className="fade-up mt-10 flex flex-wrap gap-x-10 gap-y-5" style={{ "--delay": "450ms" } as React.CSSProperties}>
                {[["180", "Pages"], ["12", "Rooms"], ["350+", "New pieces"]].map(([v, l]) => (
                  <div key={l}>
                    <dd className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold text-ink">{v}</dd>
                    <dt className="text-[12px] uppercase tracking-[0.16em] text-muted">{l}</dt>
                  </div>
                ))}
              </dl>
              <a
                href="#request"
                className="fade-up group mt-10 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-red"
                style={{ "--delay": "550ms" } as React.CSSProperties}
              >
                Request yours <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>

            {/* book stack */}
            <div className="fade-up relative mx-auto aspect-[3/4] w-[78%] max-w-[440px] [perspective:1600px]" style={{ "--delay": "300ms" } as React.CSSProperties}>
              <div className="absolute inset-0 translate-x-6 translate-y-4 rotate-[6deg] bg-rose shadow-xl" />
              <div className="group absolute inset-0 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform:rotateY(-14deg)_rotateZ(-2deg)] hover:[transform:rotateY(-4deg)_rotateZ(0deg)]">
                <Image src={img("1586023492125-27b2c045efd7", 1000)} alt="Winter Catalogue 2026 cover" fill preload sizes="(min-width:768px) 440px, 78vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 p-7 text-white">
                  <p className="inline-block bg-red px-2.5 py-1 text-[13px] font-bold tracking-wide">FURNITURE</p>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-white/80">Collection</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <p className="text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-none">Winter</p>
                  <p className="text-[clamp(2rem,3.4vw,2.75rem)] font-light leading-none">2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PEEK INSIDE */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 text-center md:mb-14">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">A peek inside</h2>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {INSIDE.map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <figure className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                    <Image src={img(x.i, 700)} alt={x.t} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between">
                    <span className="text-[18px] font-medium text-ink">{x.t}</span>
                    <span className="text-[13px] text-muted">{x.n}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section id="request" className="scroll-mt-20 border-t border-line bg-mist">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:px-8 md:py-24">
            <Reveal>
              <span className="mb-6 block h-[3px] w-10 bg-red" />
              <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-tight text-ink">Request your free copy</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                Printed catalogues ship free anywhere in Bangladesh. Prefer to browse on screen? Choose the PDF and we&apos;ll email it to you instantly.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] text-charcoal">
                {["Free nationwide delivery", "No obligation to buy", "Exclusive in-catalogue offers"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-red text-[12px] text-white">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="bg-white p-6 shadow-sm md:p-10">
              <CatalogueForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
