import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { FEATURED, MEGA, ROOM_BY_SLUG, roomHref, slugify, type MenuGroup } from "../../components/menuData";
import { POOL, ROOM_IMAGES, img, pick, subHref } from "../../components/catalog";

const ROOM_COPY: Record<string, string> = {
  "Living Room": "Sofas, center tables, TV cabinets and more — everything to make your living room the heart of the home.",
  Bedroom: "Beds, wardrobes and dressing tables crafted for calm, restful nights.",
  Dining: "Tables, chairs and showcases that turn every meal into an occasion.",
  Kitchen: "Modular kitchens and storage designed around the way you cook.",
  "Kid's Room": "Playful, safe furniture that grows with your child.",
  SmartFit: "Clever, space-saving furniture for compact modern homes.",
  Institutional: "Durable furniture solutions for schools, hospitals, hotels and offices.",
  Door: "Solid wooden doors and frames, built to last a lifetime.",
  Interior: "Complete interior design — from concept to installation.",
  Office: "Desks, chairs and storage for productive, comfortable workspaces.",
};

/* ---------- routing ---------- */

export function generateStaticParams() {
  return Object.keys(ROOM_BY_SLUG).map((room) => ({ room }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[room]">): Promise<Metadata> {
  const { room } = await params;
  const name = ROOM_BY_SLUG[room];
  return name
    ? { title: `${name} Furniture — Furniture`, description: ROOM_COPY[name] }
    : { title: "Not found — Furniture" };
}

/* ---------- page ---------- */

export default async function RoomPage({ params }: PageProps<"/categories/[room]">) {
  const { room } = await params;
  const name = ROOM_BY_SLUG[room];
  if (!name) notFound();

  const groups = MEGA[name].columns.flat();
  const withLinks = groups.filter((g) => g.links.length > 0);
  const standalone = groups.filter((g) => g.links.length === 0);
  const total = groups.reduce((n, g) => n + Math.max(g.links.length, 1), 0);
  const heroImg = ROOM_IMAGES[name]?.[0] ?? POOL[0];
  const others = Object.keys(MEGA).filter((r) => r !== name);

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden bg-charcoal">
          <Image src={img(heroImg, 2400)} alt={name} fill preload sizes="100vw" className="kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/25" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-14 text-white md:px-8 md:pb-20">
            <nav aria-label="Breadcrumb" className="fade-up text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/categories" className="transition-colors hover:text-white">All Categories</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>
            <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h1
                  className="fade-up text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.015em]"
                  style={{ "--delay": "250ms" } as React.CSSProperties}
                >
                  {name}
                </h1>
                <p className="fade-up mt-4 text-lg font-light text-white/85" style={{ "--delay": "400ms" } as React.CSSProperties}>
                  {ROOM_COPY[name]}
                </p>
              </div>
              <dl className="fade-up flex gap-10" style={{ "--delay": "550ms" } as React.CSSProperties}>
                {[
                  [groups.length, "Categories"],
                  [total, "Furniture types"],
                  ["10 yr", "Guarantee"],
                ].map(([v, l]) => (
                  <div key={String(l)}>
                    <dt className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-none">{v}</dt>
                    <dd className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/70">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* STICKY CATEGORY CHIPS */}
        <div className="sticky top-[72px] z-30 border-b border-line bg-white/90 backdrop-blur-md">
          <div className="no-scrollbar mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-4 py-3 md:px-8">
            <span className="mr-2 shrink-0 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">Jump to</span>
            {groups.map((g) => (
              <a
                key={g.title}
                href={`#${slugify(g.title)}`}
                className="shrink-0 rounded-full border border-line px-4 py-2 text-[14px] font-medium text-charcoal transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                {g.title}
              </a>
            ))}
          </div>
        </div>

        {/* CATEGORY OVERVIEW — one big image card per category */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">Shop by category</p>
            <h2 className="mt-2 text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium text-ink">Everything for your {name.toLowerCase()}</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 70}>
                <a href={`#${slugify(g.title)}`} className="group relative block aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src={img(pick(name, g.title), 900)}
                    alt={g.title}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-white/70">
                      {g.links.length ? `${g.links.length} types` : "Collection"}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <h3 className="text-[20px] font-semibold leading-tight md:text-[22px]">{g.title}</h3>
                      <span className="grid h-9 w-9 shrink-0 translate-x-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:opacity-100">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EVERY SUB-CATEGORY, WITH IMAGES */}
        {withLinks.map((g, gi) => (
          <SubcategorySection key={g.title} room={name} group={g} index={gi} />
        ))}

        {/* STAND-ALONE CATEGORIES */}
        {standalone.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
            <Reveal className="mb-8">
              <h2 className="text-[clamp(1.5rem,2vw,2rem)] font-medium text-ink">More in {name}</h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {standalone.map((g, i) => (
                <Reveal key={g.title} delay={i * 80}>
                  <Link id={slugify(g.title)} href={subHref(name, g.title)} className="group flex scroll-mt-[150px] items-center gap-5 border border-line bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(0,0,0,0.3)]">
                    <span className="relative h-24 w-24 shrink-0 overflow-hidden bg-mist">
                      <Image src={img(pick(name, g.title), 300)} alt={g.title} fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[18px] font-semibold text-ink transition-colors group-hover:text-red">{g.title}</span>
                      <span className="mt-1 block text-[13px] text-muted">Shop the range →</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED PRODUCTS */}
        {FEATURED[name] && (
          <section className="bg-mist py-16 md:py-20">
            <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 md:grid-cols-[1fr_1.4fr] md:px-8 md:gap-16">
              <Reveal>
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">Featured</p>
                <h2 className="mt-2 text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight text-ink">
                  Customer favourites in {name.toLowerCase()}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                  Our best-loved pieces — handcrafted, delivered and installed by our own team.
                </p>
                <a href="#" className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red">
                  Shop all {name} <span aria-hidden>→</span>
                </a>
              </Reveal>
              <div className="grid grid-cols-2 gap-5">
                {FEATURED[name].map((f, i) => (
                  <Reveal key={f.name} delay={i * 120}>
                    <a href="#" className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-white">
                        <Image src={img(f.img, 900)} alt={f.name} fill sizes="(min-width:768px) 30vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                        {f.tag && (
                          <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">{f.tag}</span>
                        )}
                        <span className="absolute inset-x-3 bottom-3 translate-y-3 bg-white py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          Quick view
                        </span>
                      </div>
                      <p className="mt-4 text-[16px] font-medium text-ink transition-colors group-hover:text-red">{f.name}</p>
                      <p className="mt-0.5 text-[14px] text-muted">
                        Starts from <span className="font-semibold text-ink">৳{f.price}</span>
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OTHER ROOMS */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,2vw,2rem)] font-medium text-ink">Explore other rooms</h2>
            <Link href="/categories" className="link-line shrink-0 text-[14px] font-medium text-charcoal hover:text-red">
              All categories
            </Link>
          </Reveal>
          <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
            {others.map((r) => (
              <Link
                key={r}
                href={roomHref(r)}
                className="group relative block aspect-[3/4] w-[46%] shrink-0 snap-start overflow-hidden bg-mist sm:w-[30%] lg:w-[calc(20%-13px)]"
              >
                <Image src={img(ROOM_IMAGES[r]?.[0] ?? POOL[0], 600)} alt={r} fill sizes="(min-width:1024px) 20vw, 45vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[17px] font-semibold text-white">
                  {r}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------- one category with all its sub-categories ---------- */

function SubcategorySection({ room, group, index }: { room: string; group: MenuGroup; index: number }) {
  return (
    <section
      id={slugify(group.title)}
      className={`scroll-mt-[140px] py-14 md:py-20 ${index % 2 === 0 ? "bg-mist" : "bg-white"}`}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-red">
              {String(index + 1).padStart(2, "0")} · {group.links.length} types
            </p>
            <h2 className="mt-2 text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-tight text-ink">{group.title}</h2>
          </div>
          <Link href={subHref(room, group.links[0])} className="group inline-flex items-center gap-3 text-[14px] font-medium text-ink hover:text-red">
            <span className="link-line">View all {group.title}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-red group-hover:bg-red group-hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {group.links.map((l, i) => (
            <Reveal key={l} delay={(i % 5) * 60}>
              <Link href={subHref(room, l)} className="group block">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={img(pick(room, l), 700)}
                    alt={l}
                    fill
                    sizes="(min-width:1280px) 18vw, (min-width:1024px) 23vw, (min-width:640px) 31vw, 48vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-md transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-red md:text-[16px]">
                    {l}
                  </h3>
                </div>
                <span className="mt-1 block h-[2px] w-0 bg-red transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-10" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
