import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import DeliveryEstimator from "../components/DeliveryEstimator";
import { ZONES } from "../components/deliveryZones";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Delivery & Installation — Furniture",
  description: "Free delivery on orders over ৳20,000, free installation on every order, and nationwide delivery in 3–7 working days.",
};

const PROMISES = [
  { big: "Free", t: "delivery over ৳20,000", d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { big: "3–7", t: "working days, nationwide", d: "M4 5h16v15H4zM4 9h16M8 3v4M16 3v4" },
  { big: "Free", t: "assembly & installation", d: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.8-.7-.7-2.8z" },
  { big: "64", t: "districts we deliver to", d: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
];

const JOURNEY = [
  { t: "We confirm", s: "Our team calls within a few hours to confirm your order and address.", d: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" },
  { t: "Checked & packed", s: "Every piece is quality-checked and wrapped at our warehouse.", d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" },
  { t: "Time slot booked", s: "We call the day before to agree a delivery window that suits you.", d: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2" },
  { t: "Delivered", s: "Our own two-person crew carries it to the room of your choice.", d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { t: "Installed", s: "We assemble, place and level it, then take all the packaging away.", d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
];

const PREP = [
  "Measure doorways, stairs and lifts, and compare them with the product size.",
  "Clear a path from the entrance to the room it's going in.",
  "Let building security know a delivery crew is coming.",
  "Keep pets and little ones in another room while we work.",
  "Choose the spot. Our crew will place and level it for you.",
];

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1600210492486-724fe5c67fb0", 2400)} alt="A newly furnished living room" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/15" />
          <div className="mx-auto max-w-[1440px] px-4 pb-36 pt-36 text-white md:px-8 md:pb-44 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Delivery</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Delivery &amp; installation
            </p>
            <h1 className="fade-up mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Delivered, built <span className="font-light italic">&amp; placed</span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Our own crew brings every piece to your room, assembles it and takes the packaging away. You just sit back and enjoy it.
            </p>
            {/* driving van */}
            <div className="fade-up mt-10 max-w-md" style={{ "--delay": "500ms" } as React.CSSProperties} aria-hidden>
              <div className="relative h-10 overflow-hidden">
                <span className="absolute inset-x-0 bottom-1 h-[2px] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.45)_0_14px,transparent_14px_26px)] road-move" />
                <span className="van-cross absolute bottom-2">
                  <span className="van-bob block">
                    <svg width="54" height="32" viewBox="0 0 30 20" fill="none">
                      <path d="M1 3h17v11H1z" fill="#E1251B" />
                      <path d="M18 6h6l4.5 4.5V14H18z" fill="#fff" />
                      <path d="M20 7.5h3.5l3 3H20z" fill="#9fc6e0" />
                      <circle cx="6" cy="15.5" r="2.6" fill="#111" stroke="#fff" strokeWidth="1.2" />
                      <circle cx="23" cy="15.5" r="2.6" fill="#111" stroke="#fff" strokeWidth="1.2" />
                    </svg>
                  </span>
                </span>
              </div>
            </div>
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
                <p className="mt-6 text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-none text-ink transition-colors duration-500 group-hover:text-white">{p.big}</p>
                <p className="mt-2 text-[14px] text-muted transition-colors duration-500 group-hover:text-white/70">{p.t}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ESTIMATOR */}
        <section className="mx-auto max-w-[1440px] px-4 pt-16 md:px-8 md:pt-24">
          <Reveal>
            <DeliveryEstimator />
          </Reveal>
        </section>

        {/* JOURNEY */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">How it works</p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">From our warehouse to your room</h2>
            </div>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
            <span className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] bg-[repeating-linear-gradient(to_right,#d4d4d4_0_6px,transparent_6px_12px)] md:block" />
            {JOURNEY.map((j, i) => (
              <li key={j.t} className="relative">
                <Reveal delay={i * 120} className="group relative flex gap-5 md:flex-col md:items-center md:text-center">
                  <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_15px_30px_-15px_rgba(0,0,0,0.35)] ring-8 ring-[#f6f5f3] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-red group-hover:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={j.d} /></svg>
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">{i + 1}</span>
                  </span>
                  <div className="md:mt-6">
                    <p className="text-[17px] font-semibold text-ink">{j.t}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{j.s}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* ZONES */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Delivery times</p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">Wherever home is</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[...ZONES.map((z) => ({ t: z.label, days: `${z.days[0]}–${z.days[1]}`, unit: "working days", s: z.districts.filter((d) => d !== "Other district").join(", ") + (z.id === "rest" ? " & all other districts" : "") })), { t: "Made to order", days: "2–4", unit: "weeks", s: "Custom sizes, fabrics and finishes, crafted just for you." }].map((z, i) => (
                <Reveal key={z.t} delay={i * 90}>
                  <div className={`group relative h-full overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 ${i === 3 ? "bg-ink text-white" : "bg-[#f6f5f3]"}`}>
                    <span className={`absolute -bottom-10 -right-10 h-28 w-28 rounded-full transition-transform duration-700 group-hover:scale-[1.6] ${i === 3 ? "bg-red/25" : "bg-white/70"}`} />
                    <p className={`relative text-[13px] font-semibold uppercase tracking-[0.16em] ${i === 3 ? "text-white/70" : "text-muted"}`}>{z.t}</p>
                    <p className="relative mt-6 text-[48px] font-semibold leading-none">{z.days}</p>
                    <p className={`relative mt-1 text-[14px] ${i === 3 ? "text-white/70" : "text-muted"}`}>{z.unit}</p>
                    <p className={`relative mt-6 border-t pt-4 text-[14px] leading-relaxed ${i === 3 ? "border-white/15 text-white/80" : "border-line text-charcoal"}`}>{z.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PREP CHECKLIST */}
        <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:aspect-[4/5]">
              <Image src={img("1586023492125-27b2c045efd7", 1200)} alt="An armchair placed in a bright room" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 bg-white/95 p-5 backdrop-blur md:bottom-8 md:left-8 md:right-auto md:max-w-xs">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2f8f4e] text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </span>
                <p className="text-[14px] leading-snug text-charcoal"><span className="font-semibold text-ink">98% on time</span> across 12,000+ deliveries last year</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Getting ready</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">Before we arrive</h2>
            <p className="mt-3 max-w-md text-[16px] text-muted">A few minutes of preparation makes delivery day quick and easy.</p>
            <ul className="mt-8 space-y-4">
              {PREP.map((p, i) => (
                <li key={p} className="group flex items-start gap-4 bg-white p-5 transition-all duration-300 hover:translate-x-1 hover:shadow-[0_15px_35px_-25px_rgba(0,0,0,0.4)]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-red text-[13px] font-bold text-red transition-colors duration-300 group-hover:bg-red group-hover:text-white">{i + 1}</span>
                  <span className="pt-1 text-[15px] leading-relaxed text-charcoal">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
          <div className="grid gap-px overflow-hidden bg-line md:grid-cols-3">
            {[
              { t: "Track an order", s: "See exactly where your delivery is.", h: "/track-order" },
              { t: "Delivery questions", s: "Answers on timing, costs and installation.", h: "/faq" },
              { t: "Talk to us", s: "Need to reschedule? We're here every day.", h: "/contact" },
            ].map((c) => (
              <Link key={c.t} href={c.h} className="group flex items-center justify-between gap-6 bg-white p-7 transition-colors duration-500 hover:bg-ink md:p-9">
                <span>
                  <span className="block text-[19px] font-semibold text-ink transition-colors duration-500 group-hover:text-white">{c.t}</span>
                  <span className="mt-1 block text-[14px] text-muted transition-colors duration-500 group-hover:text-white/70">{c.s}</span>
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:border-red group-hover:bg-red group-hover:text-white">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
