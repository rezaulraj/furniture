import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageSkeleton from "../../../components/PageSkeleton";
import Reveal from "../../../components/Reveal";
import ProductListing from "../../../components/ProductListing";
import { MEGA, ROOM_BY_SLUG, roomHref, slugify } from "../../../components/menuData";
import { findSub, img, pick, productsFor, subHref, subsOf, taka } from "../../../components/catalog";

/* ---------- routing ---------- */

export function generateStaticParams() {
  return Object.entries(ROOM_BY_SLUG).flatMap(([room, name]) =>
    subsOf(name).map((s) => ({ room, sub: slugify(s.name) })),
  );
}

export async function generateMetadata({ params }: PageProps<"/categories/[room]/[sub]">): Promise<Metadata> {
  const { room, sub } = await params;
  const name = ROOM_BY_SLUG[room];
  const info = name ? findSub(name, sub) : undefined;
  return info
    ? { title: `${info.name} — ${name} — Furniture`, description: `Shop ${info.name.toLowerCase()} in our ${name.toLowerCase()} collection.` }
    : { title: "Not found — Furniture" };
}

/* ---------- page ---------- */

// Reads the URL, so it renders inside <Suspense>; the header and footer stay in the shared shell.
async function SubcategoryContent({ params }: Pick<PageProps<"/categories/[room]/[sub]">, "params">) {
  const { room, sub } = await params;
  const roomName = ROOM_BY_SLUG[room];
  const info = roomName ? findSub(roomName, sub) : undefined;
  if (!roomName || !info) notFound();

  const products = productsFor(roomName, info);
  const prices = products.map((p) => p.price);
  const siblings = info.group.links.length ? info.group.links : [info.group.title];
  const related = MEGA[roomName].columns
    .flat()
    .filter((g) => g.title !== info.group.title)
    .map((g) => ({ title: g.title, href: subHref(roomName, g.links[0] ?? g.title), img: pick(roomName, g.title), count: g.links.length }))
    .slice(0, 4);
  const sameGroup = info.group.links.length > 0;

  return (
    <>

      <main>
        {/* HERO (compact) */}
        <section className="relative h-[46vh] min-h-[380px] overflow-hidden bg-charcoal">
          <Image src={img(pick(roomName, info.name), 2400)} alt={info.name} fill preload sizes="100vw" className="kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-10 text-white md:px-8 md:pb-14">
            <nav aria-label="Breadcrumb" className="fade-up flex flex-wrap items-center gap-x-2 text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/categories" className="transition-colors hover:text-white">All Categories</Link>
              <span>/</span>
              <Link href={roomHref(roomName)} className="transition-colors hover:text-white">{roomName}</Link>
              {sameGroup && (
                <>
                  <span>/</span>
                  <Link href={`${roomHref(roomName)}#${slugify(info.group.title)}`} className="transition-colors hover:text-white">{info.group.title}</Link>
                </>
              )}
            </nav>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h1
                className="fade-up text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.015em]"
                style={{ "--delay": "250ms" } as React.CSSProperties}
              >
                {info.name}
              </h1>
              <p className="fade-up text-[15px] text-white/85" style={{ "--delay": "400ms" } as React.CSSProperties}>
                {products.length} products · {taka(Math.min(...prices))} – {taka(Math.max(...prices))}
              </p>
            </div>
          </div>
        </section>

        {/* SIBLING SUB-CATEGORIES (thumbnail chips) */}
        {siblings.length > 1 && (
          <div className="border-b border-line">
            <div className="no-scrollbar mx-auto flex max-w-[1440px] gap-3 overflow-x-auto px-4 py-5 md:px-8">
              {siblings.map((s) => {
                const on = slugify(s) === sub;
                return (
                  <Link
                    key={s}
                    href={subHref(roomName, s)}
                    aria-current={on ? "page" : undefined}
                    className={`group flex shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 transition-all duration-300 ${
                      on ? "border-ink bg-ink text-white" : "border-line text-charcoal hover:border-ink"
                    }`}
                  >
                    <span className="relative h-9 w-9 overflow-hidden rounded-full bg-mist">
                      <Image src={img(pick(roomName, s), 120)} alt="" fill sizes="36px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="text-[14px] font-medium">{s}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* LISTING (filters, sort, grid) */}
        <ProductListing products={products} title={info.name} hrefBase={subHref(roomName, info.name)} />

        {/* TRUST STRIP */}
        <section className="border-y border-line bg-mist">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
            {[
              ["Free delivery", "Inside Dhaka over ৳20,000"],
              ["0% EMI", "Up to 12 months"],
              ["10-year guarantee", "On solid wood"],
              ["Easy returns", "Within 7 days"],
            ].map(([t, s]) => (
              <div key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red" />
                <div>
                  <p className="text-[15px] font-semibold text-ink">{t}</p>
                  <p className="text-[13px] text-muted">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED CATEGORIES */}
        {related.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
            <Reveal className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2vw,2rem)] font-medium text-ink">More in {roomName}</h2>
              <Link href={roomHref(roomName)} className="link-line shrink-0 text-[14px] font-medium text-charcoal hover:text-red">
                View {roomName}
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {related.map((r, i) => (
                <Reveal key={r.title} delay={i * 80}>
                  <Link href={r.href} className="group relative block aspect-[4/5] overflow-hidden bg-mist">
                    <Image src={img(r.img, 700)} alt={r.title} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.18em] text-white/70">{r.count ? `${r.count} types` : "Collection"}</p>
                        <h3 className="mt-1 text-[20px] font-semibold">{r.title}</h3>
                      </div>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

    </>
  );
}

export default function SubcategoryPage({ params }: PageProps<"/categories/[room]/[sub]">) {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <SubcategoryContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}
