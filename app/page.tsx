import Image from "next/image";
import Header from "./components/Header";
import Reveal from "./components/Reveal";
import Carousel from "./components/Carousel";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ---------------- data ---------------- */

const usps = [
  { t: "0% Easy EMI", s: "Up to 12 months", d: "M3 7h18v10H3zM3 11h18" },
  { t: "Fast Delivery", s: "Across Bangladesh", d: "M3 7h11v8H3zM14 10h4l3 3v2h-7M7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { t: "10 Year Guarantee", s: "On solid wood", d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" },
  { t: "Easy Returns", s: "Within 7 days", d: "M4 12a8 8 0 1014-5.3M18 3v4h-4" },
  { t: "Find a Showroom", s: "60+ nationwide", d: "M12 21s-6-5.3-6-11a6 6 0 0112 0c0 5.7-6 11-6 11zM12 12a2 2 0 100-4 2 2 0 000 4z" },
];

const categories = [
  { n: "Living Room", i: "1555041469-a586c61ea9bc" },
  { n: "Bedroom", i: "1505693416388-ac5ce068fe85" },
  { n: "Dining", i: "1617806118233-18e1de247200" },
  { n: "Lighting", i: "1507473885765-e6ed057f782c" },
  { n: "Storage", i: "1595428774223-ef52624120d2" },
];

const products = [
  { n: "Andaman Oak Counter Stool", p: "12,500", i: "1503602642458-232111445657", tag: "Bestseller" },
  { n: "Dahlia Lounge Armchair", p: "34,800", i: "1567538096630-e0c55bd6374c", tag: "New" },
  { n: "Linden Dining Chair", p: "9,900", i: "1592078615290-033ee584e267" },
  { n: "Marigold Accent Chair", p: "21,150", i: "1538688525198-9b88f6f53126", tag: "-20%" },
  { n: "Lucan 3-Seater Sofa", p: "89,199", i: "1493663284031-b7e3aefcae8e" },
  { n: "Anderson Table Lamp", p: "6,450", i: "1513506003901-1e6a229e2d15", tag: "New" },
  { n: "Walnut Round Dining Table", p: "65,000", i: "1532372320572-cda25653a26d" },
];

const rooms = [
  { n: "Bedroom", i: "1540518614846-7eded433c457" },
  { n: "Lounge", i: "1586023492125-27b2c045efd7" },
  { n: "Kitchen", i: "1556911220-bff31c812dba" },
  { n: "Office", i: "1524758631624-e2822e304c36" },
  { n: "Hallway", i: "1484101403633-562f891dc89a" },
];

const insta = [
  "1522708323590-d24dbb6b0267",
  "1560448204-e02f11c3d0e2",
  "1583847268964-b28dc8f51f92",
  "1600566753190-17f0baa2a6c3",
  "1615874959474-d609969a20ed",
  "1631679706909-1844bbd07221",
];

const videos = [
  { n: "Oak Counter Stool — Natural", i: "1598300042247-d088f8ab3a91" },
  { n: "Spring into Outdoors", i: "1586105251261-72a756497a11" },
  { n: "Rechargeable LED Lights", i: "1567016432779-094069958ea5" },
  { n: "Made to Order Sofas", i: "1544457070-4cd773b4d71e" },
  { n: "Styling the Bedroom", i: "1505693416388-ac5ce068fe85" },
];

const trio = [
  { t: "Request a Catalogue", d: "Pre-order our new Winter Catalogue and discover the season's collection in print.", i: "1558997519-83ea9252edf8" },
  { t: "Discover our Fabrics", d: "Order up to six free swatches and find the perfect upholstery for your sofa.", i: "1594026112284-02bb6f3352fe" },
  { t: "Interior Project Solution", d: "From homes to hotels — our design team delivers complete turnkey interiors.", i: "1551298370-9d3d53740c72" },
];

const footer = {
  Customers: ["Your Account", "Track Order", "Trade Customers", "Request a Catalogue", "Feedback", "Contact Us"],
  "Need Help?": ["FAQ", "Delivery", "Returns & Refunds", "EMI Options", "Showroom Locator", "Care Guide"],
  Company: ["About Us", "Careers", "Press", "Sustainability", "Franchise", "Terms & Privacy"],
  Inspiration: ["Style Notes Blog", "Online Catalogue", "Lookbooks", "Room Planner", "Our Shorts"],
};

/* ---------------- helpers ---------------- */

function SectionTitle({ plain, accent, link }: { plain: string; accent: string; link?: string }) {
  return (
    <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
      <div className="hidden w-32 md:block" />
      <h2 className="text-center text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink md:flex-1">
        {plain} <span className="font-semibold italic text-red">{accent}</span>
      </h2>
      {link ? (
        <a href="#" className="link-line w-32 shrink-0 text-right text-[12px] font-semibold uppercase tracking-[0.15em] text-ink hover:text-red">
          {link} →
        </a>
      ) : (
        <div className="hidden w-32 md:block" />
      )}
    </Reveal>
  );
}

function Tile({ n, i, delay }: { n: string; i: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <a href="#" className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <Image
            src={img(i, 700)}
            alt={n}
            fill
            sizes="(min-width:1024px) 20vw, 45vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-medium text-ink">{n}</span>
          <span className="translate-x-[-6px] text-red opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function Feature({
  i,
  plain,
  accent,
  text,
  side,
}: {
  i: string;
  plain: string;
  accent: string;
  text: string;
  side: "left" | "right";
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-8">
      <Reveal>
        <div className="group relative h-[480px] overflow-hidden md:h-[600px]">
          <Image
            src={img(i, 2000)}
            alt={`${plain} ${accent}`}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div
            className={`absolute inset-x-4 bottom-4 md:inset-x-auto md:bottom-auto md:top-1/2 md:w-[460px] md:-translate-y-1/2 ${
              side === "right" ? "md:right-16" : "md:left-16"
            }`}
          >
            <div className="bg-white/95 p-8 text-center backdrop-blur-sm md:p-14">
              <span className="mx-auto mb-5 block h-[3px] w-10 bg-red" />
              <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
                {plain} <span className="font-semibold italic">{accent}</span>
              </h3>
              <p className="mx-auto mt-4 max-w-[280px] text-[15px] leading-relaxed text-muted">{text}</p>
              <a
                href="#"
                className="mt-7 inline-block border border-ink px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-red hover:bg-red hover:text-white"
              >
                Shop the collection
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- page ---------------- */

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal">
          <Image
            src={img("1618220179428-22790b461013", 2400)}
            alt="A warm, modern living room"
            fill
            preload
            sizes="100vw"
            className="kenburns object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_65%)]" />
          <div className="relative flex h-full flex-col items-center justify-center px-4 pt-24 text-center text-white">
            <p
              className="fade-up text-[12px] font-semibold uppercase tracking-[0.45em] text-white/80 md:text-[13px]"
              style={{ "--delay": "200ms" } as React.CSSProperties}
            >
              New Collection 2026
            </p>
            <h1
              className="fade-up mt-5 text-[clamp(3rem,7.5vw,7rem)] font-light leading-[1] tracking-[-0.03em]"
              style={{ "--delay": "380ms" } as React.CSSProperties}
            >
              Complements your <span className="font-semibold italic">lifestyle</span>
            </h1>
            <span
              className="fade-up mt-8 block h-[2px] w-16 bg-red"
              style={{ "--delay": "560ms" } as React.CSSProperties}
            />
            <p
              className="fade-up mt-6 text-lg font-light tracking-[0.08em] text-white/85 md:text-xl"
              style={{ "--delay": "680ms" } as React.CSSProperties}
            >
              The expression of rest
            </p>
            <a
              href="#"
              className="fade-up group mt-10 inline-flex items-center gap-3 border border-white/80 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-[2px] transition-all duration-500 hover:border-red hover:bg-red"
              style={{ "--delay": "820ms" } as React.CSSProperties}
            >
              Explore now
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70 md:flex">
            Scroll
            <span className="h-10 w-px animate-pulse bg-white/60" />
          </div>
        </section>

        {/* USP STRIP */}
        <section className="border-b border-line">
          <div className="no-scrollbar mx-auto flex max-w-[1440px] justify-between gap-8 overflow-x-auto px-4 py-6 md:px-8">
            {usps.map((u, k) => (
              <Reveal key={u.t} delay={k * 80} className="flex shrink-0 items-center gap-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.4">
                  <path d={u.d} />
                </svg>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{u.t}</p>
                  <p className="text-[12px] text-muted">{u.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Shop by" accent="category" link="All categories" />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
              {categories.map((c, k) => (
                <Tile key={c.n} {...c} delay={k * 90} />
              ))}
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Best" accent="sellers" link="View all" />
            <Reveal>
              <Carousel>
                {products.map((p) => (
                  <a key={p.n} href="#" className="group w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-18px)]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                      <Image
                        src={img(p.i, 800)}
                        alt={p.n}
                        fill
                        sizes="(min-width:1024px) 25vw, 70vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                      />
                      {p.tag && (
                        <span className={`absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ${p.tag.startsWith("-") ? "bg-red" : "bg-charcoal"}`}>
                          {p.tag}
                        </span>
                      )}
                      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition duration-300 group-hover:opacity-100 hover:text-red">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
                        </svg>
                      </span>
                      <span className="absolute inset-x-3 bottom-3 translate-y-4 bg-white py-3 text-center text-[12px] font-semibold uppercase tracking-[0.15em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-red hover:text-white">
                        Quick add
                      </span>
                    </div>
                    <p className="mt-4 text-[15px] text-ink">{p.n}</p>
                    <p className="mt-1 text-[15px] font-semibold text-ink">
                      <span className="text-[12px] font-normal text-muted">From </span>৳{p.p}
                    </p>
                  </a>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* FEATURE 1 */}
        <Feature
          i="1600210492486-724fe5c67fb0"
          plain="Find the"
          accent="one"
          text="Discover our full range of handcrafted sofas, made to order in your choice of fabric."
          side="right"
        />

        {/* SHOP BY ROOM */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Shop by" accent="room" link="All rooms" />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
              {rooms.map((r, k) => (
                <Tile key={r.n} {...r} delay={k * 90} />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE 2 + 3 */}
        <div className="space-y-6 md:space-y-8">
          <Feature
            i="1616486338812-3dadae4b4ace"
            plain="Deck the"
            accent="halls"
            text="Everything you need to welcome the festive season in warm, modern style."
            side="right"
          />
          <Feature
            i="1449247709967-d4461a6a6103"
            plain="Dining"
            accent="out"
            text="Discover dining tables and chairs that turn every meal into a special occasion."
            side="left"
          />
        </div>

        {/* INSTAGRAM */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal className="mb-10 text-center">
              <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
                <span className="font-semibold text-red">@furniturehome</span> <span className="italic">in your home</span>
              </h2>
              <p className="mt-3 text-muted">Share your space with #MyFurniture for a chance to be featured.</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {insta.map((i, k) => (
                <Reveal key={i} delay={k * 70}>
                  <a href="#" className="group relative block aspect-square overflow-hidden">
                    <Image src={img(i, 600)} alt="Customer home" fill sizes="(min-width:1024px) 16vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center bg-red/0 text-white opacity-0 transition-all duration-500 group-hover:bg-red/60 group-hover:opacity-100">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO INSPIRATION */}
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Video" accent="inspiration" link="Watch more" />
            <Reveal>
              <Carousel>
                {videos.map((v) => (
                  <a key={v.n} href="#" className="group relative aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden sm:w-[42%] lg:w-[calc(25%-18px)]">
                    <Image src={img(v.i, 800)} alt={v.n} fill sizes="(min-width:1024px) 25vw, 70vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-red group-hover:bg-red">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    <p className="absolute inset-x-5 bottom-5 text-xl font-medium leading-snug text-white">{v.n}</p>
                  </a>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* STYLE NOTE */}
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 md:grid-cols-[1fr_2fr] md:gap-16 md:px-8">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">Style note</p>
              <h2 className="mt-4 text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
                How to set the <span className="font-semibold italic">table</span>
              </h2>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-muted">
                The dining table takes centre stage this season — discover our top tips for thoughtful styling, from layered linens to warm candlelight.
              </p>
              <a href="#" className="link-line mt-8 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-ink hover:text-red">
                Read more
              </a>
            </Reveal>
            <Reveal delay={150}>
              <div className="group relative aspect-[16/10] overflow-hidden">
                <Image src={img("1550581190-9c1c48d21d6c", 1600)} alt="A styled dining table" fill sizes="(min-width:768px) 66vw, 100vw" className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* TRIO */}
        <section className="border-t border-line py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-3 md:px-8">
            {trio.map((t, k) => (
              <Reveal key={t.t} delay={k * 120}>
                <a href="#" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image src={img(t.i, 900)} alt={t.t} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  </div>
                  <h3 className="mt-6 text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.01em] text-ink transition-colors group-hover:text-red">{t.t}</h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">{t.d}</p>
                  <span className="mt-5 inline-block border border-ink px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 group-hover:border-red group-hover:bg-red group-hover:text-white">
                    Learn more
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TRADE BAND */}
        <section className="px-4 md:px-8">
          <Reveal>
            <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-rose px-6 py-16 text-center text-white md:py-24">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
              <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-deep/40" />
              <div className="relative">
                <h2 className="text-[clamp(2.75rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.02em]">
                  Become a <span className="font-semibold italic">Trade</span> Customer
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/90">
                  We love working with professionals who share our passion for homeware. Interior designers, developers and architects enjoy generous discounts and a dedicated account manager.
                </p>
                <a href="#" className="mt-8 inline-block bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-charcoal hover:text-white">
                  Discover more
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 bg-mist md:mt-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:px-8 lg:grid-cols-[3fr_1.4fr]">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {Object.entries(footer).map(([h, links]) => (
              <div key={h}>
                <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink">{h}</h4>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] text-muted transition-colors hover:text-red">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-white p-8">
            <h4 className="text-3xl font-light tracking-[-0.01em] text-ink">
              News<span className="font-semibold italic text-red">letter</span>
            </h4>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Unlock the secret to beautiful living. Be first to hear about new collections, exclusive offers and design tips.
            </p>
            <form className="mt-6">
              <input type="email" placeholder="Your email address" className="w-full border border-line px-4 py-3 text-[14px] outline-none transition-colors focus:border-red" />
              <button type="submit" className="mt-3 w-full bg-charcoal py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red">
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-6 text-[12px] text-muted md:flex-row md:px-8">
            <span className="text-lg font-semibold uppercase tracking-[0.22em] text-ink">Furni<span className="text-red">ture</span></span>
            <div className="flex gap-3">
              {["bKash", "Nagad", "VISA", "Mastercard", "AMEX"].map((p) => (
                <span key={p} className="rounded border border-line bg-white px-2 py-1 font-semibold text-charcoal">{p}</span>
              ))}
            </div>
            <span>© 2026 Furniture. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
