import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import TradeForm from "../components/TradeForm";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Trade Programme — Furniture",
  description: "Interior designers, architects and developers enjoy generous discounts and a dedicated account manager.",
};

const BENEFITS = [
  { t: "Up to 25% off", d: "Generous trade pricing across our full range, including made-to-order pieces.", icon: "M7 17L17 7M8.5 8.5h.01M15.5 15.5h.01M9 8.5a.5.5 0 11-1 0 .5.5 0 011 0zM16 15.5a.5.5 0 11-1 0 .5.5 0 011 0z" },
  { t: "Account manager", d: "One dedicated contact for quotes, samples, orders and after-sales.", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" },
  { t: "Free samples", d: "Fabric, wood and finish samples delivered free to your studio.", icon: "M4 7l8-4 8 4-8 4-8-4zM4 7v10l8 4 8-4V7M12 11v10" },
  { t: "Custom sizing", d: "Bespoke dimensions, finishes and upholstery for your projects.", icon: "M3 7h18M3 7v10h18V7M7 7v4M11 7v6M15 7v4M19 7v6" },
  { t: "Priority delivery", d: "Scheduled site deliveries and white-glove installation.", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7M7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { t: "Flexible credit", d: "30-day credit terms for approved trade accounts.", icon: "M3 7h18v10H3zM3 11h18M7 15h3" },
];

const TIERS = [
  { name: "Studio", spend: "Up to ৳5 lakh / year", off: "10%", perks: ["Trade pricing", "Free samples", "Account manager"] },
  { name: "Partner", spend: "৳5–20 lakh / year", off: "18%", perks: ["Everything in Studio", "Custom sizing", "Priority delivery"], featured: true },
  { name: "Elite", spend: "Above ৳20 lakh / year", off: "25%", perks: ["Everything in Partner", "30-day credit", "Showroom events"] },
];

const WHO = [
  { t: "Interior designers", i: "1616486338812-3dadae4b4ace" },
  { t: "Architects", i: "1600210492486-724fe5c67fb0" },
  { t: "Developers", i: "1600566753190-17f0baa2a6c3" },
  { t: "Hospitality", i: "1582719478250-c89cae4dc85b" },
];

export default function TradePage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-rose text-white">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-rose-deep/40" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-4 pb-16 pt-32 md:grid-cols-[1.1fr_1fr] md:px-8 md:pb-24 md:pt-40">
            <div>
              <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/80" style={{ "--delay": "50ms" } as React.CSSProperties}>
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span>Trade</span>
              </nav>
              <p className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.4em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
                Trade programme
              </p>
              <h1 className="fade-up mt-4 text-[clamp(2.75rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
                Become a Trade Customer
              </h1>
              <p className="fade-up mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/90 md:text-[18px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
                We love working with professionals who share our passion for homeware. Interior designers, developers and architects enjoy generous discounts and a dedicated account manager.
              </p>
              <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
                <a href="#apply" className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-charcoal hover:text-white">
                  Apply now <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
                <a href="#tiers" className="inline-flex items-center border border-white/80 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-white hover:text-ink">
                  See trade tiers
                </a>
              </div>
            </div>
            {/* photo collage */}
            <div className="fade-up relative mx-auto h-[420px] w-full max-w-[520px] md:h-[500px]" style={{ "--delay": "300ms" } as React.CSSProperties}>
              <div className="absolute right-0 top-0 h-[78%] w-[72%] overflow-hidden shadow-2xl">
                <Image src={img("1618220179428-22790b461013", 1000)} alt="Designer living room" fill preload sizes="(min-width:768px) 380px, 72vw" className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 h-[52%] w-[52%] overflow-hidden border-[8px] border-rose shadow-2xl">
                <Image src={img("1594026112284-02bb6f3352fe", 700)} alt="Fabric samples" fill sizes="(min-width:768px) 270px, 52vw" className="object-cover" />
              </div>
              <div className="absolute bottom-[12%] right-[6%] bg-white px-5 py-4 text-ink shadow-xl">
                <p className="text-[34px] font-semibold leading-none text-red">25%</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">Trade discount</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 text-center md:mb-14">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">Why go trade</h2>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
          </Reveal>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={i * 70} className="group bg-white p-8 transition-colors duration-500 hover:bg-mist md:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-rose/15 text-rose-deep transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-red group-hover:text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.icon} />
                  </svg>
                </span>
                <h3 className="mt-6 text-[20px] font-medium text-ink">{b.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TIERS */}
        <section id="tiers" className="scroll-mt-20 bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <Reveal className="mb-10 text-center md:mb-14">
              <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">Trade tiers</h2>
              <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
              <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted">Your tier grows with you — reviewed every year based on your total spend.</p>
            </Reveal>
            <div className="grid items-stretch gap-5 md:grid-cols-3">
              {TIERS.map((t, i) => (
                <Reveal key={t.name} delay={i * 100}>
                  <div
                    className={`relative flex h-full flex-col p-8 transition-transform duration-500 hover:-translate-y-2 md:p-10 ${
                      t.featured ? "bg-ink text-white shadow-2xl md:-my-4 md:py-14" : "bg-white text-ink"
                    }`}
                  >
                    {t.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Most popular</span>
                    )}
                    <p className={`text-[13px] font-semibold uppercase tracking-[0.22em] ${t.featured ? "text-white/70" : "text-muted"}`}>{t.name}</p>
                    <p className="mt-4 text-[clamp(3rem,5vw,4rem)] font-semibold leading-none">
                      {t.off}
                      <span className={`ml-2 text-[15px] font-medium ${t.featured ? "text-white/70" : "text-muted"}`}>off</span>
                    </p>
                    <p className={`mt-2 text-[14px] ${t.featured ? "text-white/70" : "text-muted"}`}>{t.spend}</p>
                    <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 text-[15px] ${t.featured ? "border-white/15" : "border-line"}`}>
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-center gap-3">
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] ${t.featured ? "bg-red text-white" : "bg-rose/20 text-rose-deep"}`}>✓</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#apply"
                      className={`mt-8 block py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                        t.featured ? "bg-red text-white hover:bg-red-dark" : "border border-ink hover:border-red hover:bg-red hover:text-white"
                      }`}
                    >
                      Apply
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mb-10 text-center md:mb-14">
            <h2 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">Who it&apos;s for</h2>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {WHO.map((w, i) => (
              <Reveal key={w.t} delay={i * 80}>
                <div className="group relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <Image src={img(w.i, 700)} alt={w.t} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-5 text-[20px] font-medium text-white md:p-6 md:text-[22px]">{w.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* APPLY */}
        <section id="apply" className="scroll-mt-20 bg-mist">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:px-8 md:py-24">
            <Reveal>
              <span className="mb-6 block h-[3px] w-10 bg-red" />
              <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-tight text-ink">Apply in three minutes</h2>
              <ol className="mt-8 space-y-6">
                {[
                  ["Apply", "Tell us about you and your business."],
                  ["Get verified", "We review applications within two working days."],
                  ["Start saving", "Your account manager sets up your trade pricing."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-semibold text-white">{i + 1}</span>
                    <div>
                      <p className="text-[17px] font-medium text-ink">{t}</p>
                      <p className="text-[15px] text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120} className="bg-white p-6 shadow-sm md:p-10">
              <TradeForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
