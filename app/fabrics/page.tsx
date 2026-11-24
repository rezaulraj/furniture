import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import FabricPicker from "../components/FabricPicker";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Discover our Fabrics — Free Swatches — Furniture",
  description: "Order up to six free fabric swatches and find the perfect upholstery for your sofa.",
};

const STEPS = [
  { t: "Choose up to six", d: "Browse velvets, linens, bouclés, weaves and leathers, and add your favourites to your swatch box." },
  { t: "We post them free", d: "Your swatches arrive within 3–5 working days, anywhere in Bangladesh — no payment needed." },
  { t: "Live with them", d: "See each fabric in your own light, next to your floor and walls, before you choose." },
];

const CARE = [
  { t: "Velvet", d: "Brush gently with the pile. Rotate cushions regularly to keep the sheen even." },
  { t: "Linen & weave", d: "Vacuum weekly with a soft brush. Blot spills immediately with a damp, clean cloth." },
  { t: "Bouclé", d: "Avoid sharp objects that can snag loops. Lift any pulled loop back — never cut it." },
  { t: "Leather", d: "Dust with a dry cloth and condition twice a year. Keep out of direct sunlight." },
];

export default function FabricsPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-charcoal">
          <Image src={img("1594026112284-02bb6f3352fe", 2400)} alt="Upholstery fabrics" fill preload sizes="100vw" className="kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/35" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-12 text-white md:px-8 md:pb-20">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Fabrics</span>
            </nav>
            <p className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.4em] text-white/80" style={{ "--delay": "200ms" } as React.CSSProperties}>
              Free swatch service
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]" style={{ "--delay": "320ms" } as React.CSSProperties}>
              Discover our <span className="text-red">fabrics</span>
            </h1>
            <p className="fade-up mt-6 max-w-[540px] text-[17px] font-light leading-relaxed text-white/90 md:text-[19px]" style={{ "--delay": "440ms" } as React.CSSProperties}>
              Order up to six free swatches and find the perfect upholstery for your sofa — in your own home, in your own light.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1440px] gap-px bg-line md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 100} className="bg-white px-4 py-10 md:px-10 md:py-12">
                <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none text-red/20">0{i + 1}</span>
                <h2 className="mt-3 text-[20px] font-medium text-ink">{s.t}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LIBRARY */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 text-center">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">The fabric library</h2>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
            <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted">Tap a swatch to add it to your box. Choose up to six — they&apos;re free.</p>
          </Reveal>
          <FabricPicker />
        </section>

        {/* CARE */}
        <section className="bg-mist py-16 pb-32 md:py-24 md:pb-36">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:grid-cols-[1fr_2fr] md:gap-16 md:px-8">
            <Reveal>
              <span className="mb-6 block h-[3px] w-10 bg-red" />
              <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-tight text-ink">Caring for your upholstery</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">A little care keeps every fabric looking its best for years. Every sofa ships with a full care card.</p>
            </Reveal>
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {CARE.map((c, i) => (
                <Reveal key={c.t} delay={i * 80} className="bg-white p-6 md:p-8">
                  <h3 className="text-[18px] font-medium text-ink">{c.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
