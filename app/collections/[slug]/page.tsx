import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageSkeleton from "../../components/PageSkeleton";
import Reveal from "../../components/Reveal";
import ProductListing from "../../components/ProductListing";
import { img, taka } from "../../components/catalog";
import {
  COLLECTIONS,
  collectionHref,
  collectionProducts,
  collectionSubs,
  findCollection,
} from "../../components/collections";

/* ---------- routing ---------- */

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const c = findCollection((await params).slug);
  return c
    ? { title: `${c.plain} ${c.accent} — ${c.eyebrow} — Furniture`, description: c.intro }
    : { title: "Not found — Furniture" };
}

/* ---------- page ---------- */

// Reads the URL, so it renders inside <Suspense>; the header and footer stay in the shared shell.
async function CollectionContent({ params }: Pick<PageProps<"/collections/[slug]">, "params">) {
  const c = findCollection((await params).slug);
  if (!c) notFound();

  const products = collectionProducts(c);
  const subs = collectionSubs(c);
  const prices = products.map((p) => p.price);
  const others = COLLECTIONS.filter((x) => x.slug !== c.slug);
  const title = `${c.plain} ${c.accent}`;
  const stats = [
    [String(products.length), "Pieces"],
    [String(subs.length), "Categories"],
    [taka(Math.min(...prices)), "Starting from"],
  ];

  return (
    <>

      <main>
        {/* HERO */}
        <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-charcoal">
          <Image src={img(c.hero, 2400)} alt={title} fill preload sizes="100vw" className="kenburns object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-12 text-white md:px-8 md:pb-20">
            <nav
              aria-label="Breadcrumb"
              className="fade-up flex items-center gap-2 text-[13px] text-white/75"
              style={{ "--delay": "100ms" } as React.CSSProperties}
            >
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span>Collections</span>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
            <p
              className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.4em] text-white/80"
              style={{ "--delay": "200ms" } as React.CSSProperties}
            >
              {c.eyebrow}
            </p>
            <h1
              className="fade-up mt-4 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              {c.plain} <span className="text-red">{c.accent}</span>
            </h1>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p
                className="fade-up max-w-[520px] text-[17px] font-light leading-relaxed text-white/90 md:text-[19px]"
                style={{ "--delay": "460ms" } as React.CSSProperties}
              >
                {c.intro}
              </p>
              <a
                href="#shop"
                className="fade-up group inline-flex shrink-0 items-center gap-3 self-start bg-red px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-red-dark md:self-auto"
                style={{ "--delay": "600ms" } as React.CSSProperties}
              >
                Shop {products.length} pieces
                <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* STORY + STATS */}
        <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:gap-20 md:px-8 md:py-24">
          <Reveal>
            <span className="mb-6 block h-[3px] w-10 bg-red" />
            <h2 className="text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
              {c.intro}
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end">
            {c.story.map((t) => (
              <p key={t} className="mb-5 text-[16px] leading-relaxed text-muted">{t}</p>
            ))}
            <dl className="mt-6 grid grid-cols-3 divide-x divide-line border-y border-line">
              {stats.map(([v, l]) => (
                <div key={l} className="px-4 py-5 first:pl-0">
                  <dt className="text-[12px] uppercase tracking-[0.16em] text-muted">{l}</dt>
                  <dd className="mt-1 text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* SHOP BY TYPE */}
        <section className="bg-mist py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal className="mb-8 text-center md:mb-12">
              <h2 className="text-[clamp(1.5rem,2.2vw,2.125rem)] font-medium text-ink">In this collection</h2>
              <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
              {subs.map((s, i) => (
                <Reveal key={s.name} delay={i * 70}>
                  <Link href={s.href} className="group block">
                    <span className="relative block aspect-square overflow-hidden rounded-full bg-white ring-1 ring-line transition-all duration-500 group-hover:ring-4 group-hover:ring-red/20">
                      <Image
                        src={img(s.img, 500)}
                        alt={s.name}
                        fill
                        sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                      />
                    </span>
                    <span className="mt-4 block text-center text-[15px] font-medium text-ink transition-colors group-hover:text-red">
                      {s.name}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* LOOKBOOK */}
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-5">
            {c.look.map((l, i) => (
              <Reveal key={l.img} delay={i * 100} className={i === 0 ? "md:row-span-2" : ""}>
                <figure className={`group relative overflow-hidden bg-mist ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[16/10]"}`}>
                  <Image
                    src={img(l.img, 1400)}
                    alt={l.caption}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 p-6 text-white md:p-8">
                    <span className="text-[12px] font-semibold tracking-[0.2em] text-white/70">0{i + 1}</span>
                    <p className="mt-1 text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium">{l.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <div id="shop" className="scroll-mt-20 border-t border-line">
          <ProductListing products={products} title={title} hrefBase={collectionHref(c.slug)} />
        </div>

        {/* OTHER COLLECTIONS */}
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal className="mb-8 text-center md:mb-12">
              <h2 className="text-[clamp(1.5rem,2.2vw,2.125rem)] font-medium text-ink">More collections</h2>
              <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 100}>
                  <Link href={collectionHref(o.slug)} className="group relative block aspect-[16/10] overflow-hidden bg-charcoal">
                    <Image
                      src={img(o.hero, 1400)}
                      alt={`${o.plain} ${o.accent}`}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white md:p-8">
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/75">{o.eyebrow}</p>
                        <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-none">
                          {o.plain} <span className="text-red">{o.accent}</span>
                        </h3>
                      </div>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/60 transition-all duration-300 group-hover:border-red group-hover:bg-red">
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

    </>
  );
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <CollectionContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}
