import Image from "next/image";
import Header from "./components/Header";
import Reveal from "./components/Reveal";
import Carousel from "./components/Carousel";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import UspStrip from "./components/UspStrip";
import { collectionHref, findCollection } from "./components/collections";
import Link from "next/link";
import { roomHref, slugify } from "./components/menuData";
import { findSub, productHref, productsFor, taka } from "./components/catalog";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ---------------- data ---------------- */

const categories = [
  { n: "Living Room", i: "1555041469-a586c61ea9bc", href: roomHref("Living Room") },
  { n: "Bedroom", i: "1505693416388-ac5ce068fe85", href: roomHref("Bedroom") },
  { n: "Dining", i: "1617806118233-18e1de247200", href: roomHref("Dining") },
  { n: "Lighting", i: "1507473885765-e6ed057f782c", href: roomHref("Lighting") },
  { n: "Storage", i: "1595428774223-ef52624120d2", href: roomHref("Storage") },
];

// Best Sellers: real catalogue products, so each card opens its product page.
const BEST: [room: string, sub: string][] = [
  ["Kitchen", "Counter Stool"],
  ["Living Room", "Easy Chair"],
  ["Dining", "Wooden Dining Chair"],
  ["Living Room", "Accent Chair"],
  ["Living Room", "Fabric Sofa"],
  ["Lighting", "Table Lamps"],
  ["Dining", "Round Dining Table"],
];
const products = BEST.flatMap(([room, sub]) => {
  const info = findSub(room, slugify(sub));
  if (!info) return [];
  const p = productsFor(room, info)[0];
  return [{ p, href: productHref(room, sub, p.id) }];
});

const rooms = [
  { n: "Bedroom", i: "1540518614846-7eded433c457", href: roomHref("Bedroom") },
  { n: "Lounge", i: "1586023492125-27b2c045efd7", href: roomHref("Living Room") },
  { n: "Kitchen", i: "1556911220-bff31c812dba", href: roomHref("Kitchen") },
  { n: "Office", i: "1524758631624-e2822e304c36", href: roomHref("Office") },
  { n: "Hallway", i: "1484101403633-562f891dc89a", href: `${roomHref("Living Room")}#shoe-rack` },
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



/* ---------------- helpers ---------------- */

function SectionTitle({
  plain,
  accent,
  link,
  href = "#",
}: {
  plain: string;
  accent: string;
  link?: string;
  href?: string;
}) {
  const title = `${plain} ${accent.charAt(0).toUpperCase()}${accent.slice(1)}`;
  return (
    // Title centred; optional link sits on the right (below the title on phones).
    <Reveal className="mb-8 flex flex-col items-center gap-3 md:mb-12 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
      <span aria-hidden className="hidden md:block" />
      <Link href={href} className="group flex flex-col items-center text-center">
        <h2 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight tracking-[-0.005em] text-ink transition-colors duration-300 group-hover:text-red">
          {title}
        </h2>
        <span className="mt-3 block h-[2px] w-10 bg-red transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-16" />
      </Link>
      {link ? (
        <Link
          href={href}
          className="link-line shrink-0 text-[14px] font-medium text-charcoal hover:text-red md:justify-self-end"
        >
          {link}
        </Link>
      ) : (
        <span aria-hidden className="hidden md:block" />
      )}
    </Reveal>
  );
}

function Tile({ n, i, href, delay }: { n: string; i: string; href: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={href} className="group block">
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
      </Link>
    </Reveal>
  );
}

function Feature({ slug, side }: { slug: string; side: "left" | "right" }) {
  const { hero: i, plain, accent, teaser: text } = findCollection(slug)!;
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
              <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight text-ink">
                {plain} {accent}
              </h3>
              <p className="mx-auto mt-4 max-w-[280px] text-[15px] leading-relaxed text-muted">{text}</p>
              <Link
                href={collectionHref(slug)}
                className="mt-7 inline-block border border-ink px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-red hover:bg-red hover:text-white"
              >
                Shop the collection
              </Link>
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
        {/* HERO SLIDER */}
        <HeroSlider />

        {/* USP STRIP */}
        <UspStrip />

        {/* SHOP BY CATEGORY */}
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Shop by" accent="category" link="All categories" href="/categories" />
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
                {products.map(({ p, href }) => (
                  <Link key={href} href={href} className="group w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-18px)]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                      <Image
                        src={img(p.img, 800)}
                        alt={p.name}
                        fill
                        sizes="(min-width:1024px) 25vw, 70vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                      />
                      {p.tag && (
                        <span className={`absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ${p.tag === "Sale" ? "bg-red" : "bg-charcoal"}`}>
                          {p.tag === "Sale" && p.oldPrice ? `-${Math.round((1 - p.price / p.oldPrice) * 100)}%` : p.tag}
                        </span>
                      )}
                      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition duration-300 group-hover:opacity-100 hover:text-red">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
                        </svg>
                      </span>
                      <span className="absolute inset-x-3 bottom-3 translate-y-4 bg-white py-3 text-center text-[12px] font-semibold uppercase tracking-[0.15em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-red hover:text-white">
                        View product
                      </span>
                    </div>
                    <p className="mt-4 text-[15px] text-ink transition-colors group-hover:text-red">{p.name}</p>
                    <p className="mt-1 flex items-baseline gap-2 text-[15px] font-semibold text-ink">
                      <span className="text-[12px] font-normal text-muted">From</span>
                      {taka(p.price)}
                      {p.oldPrice && <span className="text-[13px] font-normal text-muted line-through">{taka(p.oldPrice)}</span>}
                    </p>
                  </Link>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* FEATURE 1 */}
        <Feature slug="find-the-one" side="right" />

        {/* SHOP BY ROOM */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <SectionTitle plain="Shop by" accent="room" link="All rooms" href="/categories" />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
              {rooms.map((r, k) => (
                <Tile key={r.n} {...r} delay={k * 90} />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE 2 + 3 */}
        <div className="space-y-6 md:space-y-8">
          <Feature slug="deck-the-halls" side="right" />
          <Feature slug="dining-out" side="left" />
        </div>

        {/* INSTAGRAM */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal className="mb-10 text-center">
              <h2 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight text-ink">
                <span className="text-red">@furniturehome</span> in your home
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
        <section id="inspiration" className="scroll-mt-20 bg-mist py-16 md:py-24">
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
              <h2 className="mt-4 text-[clamp(2rem,3vw,2.75rem)] font-medium leading-tight text-ink">
                How to set the table
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
                  <h3 className="mt-6 text-[clamp(1.375rem,1.8vw,1.625rem)] font-medium leading-tight text-ink transition-colors group-hover:text-red">{t.t}</h3>
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
                <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-medium leading-tight">
                  Become a Trade Customer
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

      <Footer />
    </>
  );
}
