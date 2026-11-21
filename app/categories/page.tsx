import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { FEATURED, MEGA, roomHref, slugify } from "../components/menuData";
import { subHref } from "../components/catalog";

export const metadata: Metadata = {
  title: "All Categories — Furniture",
  description: "Browse every furniture category: living room, bedroom, dining, kitchen, kids, office and more.",
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;


const ROOMS = Object.entries(MEGA).map(([name, m]) => {
  const groups = m.columns.flat();
  return {
    name,
    id: slugify(name),
    groups,
    count: groups.reduce((n, g) => n + Math.max(g.links.length, 1), 0),
    cover: FEATURED[name]?.[0]?.img ?? "1618220179428-22790b461013",
    side: FEATURED[name]?.[1]?.img ?? FEATURED[name]?.[0]?.img ?? "1618220179428-22790b461013",
  };
});

const TOTAL = ROOMS.reduce((n, r) => n + r.count, 0);

export default function CategoriesPage() {
  return (
    <>
      <Header />

      <main>
        {/* PAGE HERO */}
        <section className="relative h-[62vh] min-h-[460px] overflow-hidden bg-charcoal">
          <Image
            src={img("1600210492486-724fe5c67fb0", 2400)}
            alt="Beautifully furnished interior"
            fill
            preload
            sizes="100vw"
            className="kenburns object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative flex h-full flex-col items-center justify-center px-4 pt-20 text-center text-white">
            <nav aria-label="Breadcrumb" className="fade-up text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">All Categories</span>
            </nav>
            <h1
              className="fade-up mt-4 text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.01em]"
              style={{ "--delay": "250ms" } as React.CSSProperties}
            >
              All Categories
            </h1>
            <span className="fade-up mt-6 block h-[2px] w-16 bg-red" style={{ "--delay": "400ms" } as React.CSSProperties} />
            <p className="fade-up mt-5 max-w-xl text-lg font-light text-white/85" style={{ "--delay": "500ms" } as React.CSSProperties}>
              {ROOMS.length} collections · {TOTAL}+ furniture types, crafted for every corner of your home and workplace.
            </p>
          </div>
        </section>

        {/* STICKY ROOM CHIPS */}
        <div className="sticky top-[72px] z-30 border-b border-line bg-white/90 backdrop-blur-md">
          <div className="no-scrollbar mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 md:px-8">
            {ROOMS.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="shrink-0 rounded-full border border-line px-4 py-2 text-[14px] font-medium text-charcoal transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                {r.name}
              </a>
            ))}
          </div>
        </div>

        {/* OVERVIEW GRID — every room at a glance */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">Browse by room</p>
              <h2 className="mt-2 text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium text-ink">Find your collection</h2>
            </div>
            <p className="hidden max-w-sm text-right text-[15px] text-muted md:block">
              Choose a room to explore every type of furniture we make for it.
            </p>
          </Reveal>

          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-4 md:gap-5">
            {ROOMS.map((r, i) => (
              <Reveal
                key={r.id}
                delay={(i % 4) * 80}
                className={
                  // 10 tiles fill a 4-col grid (desktop) and 2-col grid (phone) with no gaps
                  i === 0
                    ? "col-span-2 row-span-2"
                    : i === 9
                      ? "col-span-2"
                      : i === 5 || i === 8
                        ? "md:col-span-2"
                        : ""
                }
              >
                <Link href={roomHref(r.name)} className="group relative block h-full overflow-hidden bg-mist">
                  <Image
                    src={img(r.cover, i === 0 ? 1400 : 800)}
                    alt={r.name}
                    fill
                    sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white md:p-6">
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/70">{r.count} types</p>
                      <h3 className={`mt-1 font-semibold leading-tight ${i === 0 ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[20px] md:text-[22px]"}`}>
                        {r.name}
                      </h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DETAILED SECTIONS — every sub-category */}
        <div className="border-t border-line">
          {ROOMS.map((r, ri) => (
            <section
              key={r.id}
              id={r.id}
              className={`scroll-mt-[140px] py-16 md:py-20 ${ri % 2 ? "bg-mist" : "bg-white"}`}
            >
              <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-8 lg:grid-cols-[340px_1fr] lg:gap-14">
                {/* Left: sticky room intro */}
                <Reveal className="lg:sticky lg:top-[150px] lg:self-start">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">
                    {String(ri + 1).padStart(2, "0")} — Collection
                  </p>
                  <h2 className="mt-3 text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight text-ink">{r.name}</h2>
                  <p className="mt-2 text-[15px] text-muted">
                    {r.groups.length} categories · {r.count} furniture types
                  </p>
                  <div className="group relative mt-6 hidden aspect-[4/5] overflow-hidden lg:block">
                    <Image
                      src={img(r.side, 800)}
                      alt={r.name}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <Link
                    href={roomHref(r.name)}
                    className="mt-6 inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red"
                  >
                    Shop all {r.name} <span aria-hidden>→</span>
                  </Link>
                </Reveal>

                {/* Right: category cards */}
                <div className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
                  {r.groups.map((g, gi) => (
                    <Reveal key={g.title} delay={(gi % 3) * 70}>
                      <div className="group h-full border border-line bg-white p-6 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]">
                        <Link href={`${roomHref(r.name)}#${slugify(g.title)}`} className="flex items-center justify-between gap-3">
                          <h3 className="text-[18px] font-semibold text-ink transition-colors duration-300 group-hover:text-red">
                            {g.title}
                          </h3>
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-red group-hover:bg-red group-hover:text-white">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </span>
                        </Link>
                        <p className="mt-1 text-[13px] text-muted">
                          {g.links.length ? `${g.links.length} types` : "Shop the range"}
                        </p>
                        {g.links.length > 0 && (
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {g.links.map((l) => (
                              <li key={l}>
                                <Link
                                  href={subHref(r.name, l)}
                                  className="inline-block rounded-full bg-mist px-3 py-1.5 text-[13px] text-charcoal transition-colors duration-300 hover:bg-ink hover:text-white"
                                >
                                  {l}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* HELP BAND */}
        <section className="px-4 pt-16 md:px-8 md:pt-24">
          <Reveal>
            <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 bg-charcoal px-8 py-12 text-white md:flex-row md:items-center md:px-14">
              <div>
                <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium">Can’t find what you need?</h2>
                <p className="mt-2 text-[15px] text-white/70">Our designers can make it to order — any size, fabric or finish.</p>
              </div>
              <a
                href="#"
                className="inline-flex shrink-0 items-center gap-3 bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red-dark"
              >
                Talk to a designer <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
