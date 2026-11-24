import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageSkeleton from "../../components/PageSkeleton";
import Reveal from "../../components/Reveal";
import ReadingProgress from "../../components/ReadingProgress";
import { img, taka } from "../../components/catalog";
import { collectionHref, findCollection } from "../../components/collections";
import { STYLE_NOTES, findNote, noteProducts } from "../../components/styleNotes";

/* ---------- routing ---------- */

export function generateStaticParams() {
  return STYLE_NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/style-notes/[slug]">): Promise<Metadata> {
  const n = findNote((await params).slug);
  return n ? { title: `${n.title} — Style Note — Furniture`, description: n.excerpt } : { title: "Not found — Furniture" };
}

/* ---------- page ---------- */

// Reads the URL, so it renders inside <Suspense>; the header and footer stay in the shared shell.
async function NoteContent({ params }: Pick<PageProps<"/style-notes/[slug]">, "params">) {
  const n = findNote((await params).slug);
  if (!n) notFound();

  const products = noteProducts(n);
  const col = findCollection(n.collection);

  return (
    <main>
      <ReadingProgress />

      {/* HERO */}
      <section className="relative h-[82vh] min-h-[560px] overflow-hidden bg-charcoal">
        <Image src={img(n.hero, 2400)} alt={n.title} fill preload sizes="100vw" className="kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
        <div className="relative mx-auto flex h-full max-w-[1100px] flex-col items-center justify-end px-4 pb-14 text-center text-white md:pb-20">
          <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/75" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <span>Style notes</span>
          </nav>
          <p className="fade-up mt-8 text-[12px] font-semibold uppercase tracking-[0.4em] text-white/85" style={{ "--delay": "200ms" } as React.CSSProperties}>
            Style note · No. {n.no}
          </p>
          <h1 className="fade-up mt-4 text-[clamp(2.75rem,6.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.02em]" style={{ "--delay": "320ms" } as React.CSSProperties}>
            {n.title}
          </h1>
          <span className="fade-up mt-7 block h-[3px] w-14 bg-red" style={{ "--delay": "440ms" } as React.CSSProperties} />
          <div className="fade-up mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-white/85" style={{ "--delay": "540ms" } as React.CSSProperties}>
            <span className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[13px] font-semibold text-ink">{n.author.name[0]}</span>
              {n.author.name}, {n.author.role}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
            <span>{n.date}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
            <span>{n.minutes} min read</span>
          </div>
        </div>
      </section>

      {/* LEAD */}
      <section className="mx-auto max-w-[820px] px-4 py-16 md:py-24">
        <Reveal>
          <p className="text-[clamp(1.25rem,2vw,1.625rem)] font-light leading-[1.6] text-ink first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[4.5rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-red">
            {n.lead}
          </p>
        </Reveal>
        {/* tip index */}
        <Reveal delay={120}>
          <ol className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-5">
            {n.tips.map((t, i) => (
              <li key={t.title}>
                <a href={`#tip-${i + 1}`} className="group flex h-full flex-col bg-white p-4 transition-colors duration-300 hover:bg-mist">
                  <span className="text-[13px] font-semibold text-red">0{i + 1}</span>
                  <span className="mt-1 text-[14px] font-medium leading-snug text-ink group-hover:text-red">{t.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* TIPS */}
      <section className="mx-auto max-w-[1280px] space-y-20 px-4 pb-8 md:space-y-28 md:px-8">
        {n.tips.map((t, i) => (
          <article key={t.title} id={`tip-${i + 1}`} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-2 md:gap-16">
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <div className="group relative aspect-[4/5] overflow-hidden bg-mist">
                <Image
                  src={img(t.img, 1200)}
                  alt={t.title}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <span className="block text-[clamp(4.5rem,9vw,8rem)] font-semibold leading-none tracking-[-0.04em] text-red/15">0{i + 1}</span>
              <h2 className="-mt-6 text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-tight text-ink md:-mt-10">{t.title}</h2>
              <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-muted">{t.text}</p>
            </Reveal>
          </article>
        ))}
      </section>

      {/* PULL QUOTE */}
      <section className="mx-auto max-w-[960px] px-4 py-20 text-center md:py-28">
        <Reveal>
          <svg width="44" height="44" viewBox="0 0 24 24" className="mx-auto text-red" fill="currentColor" aria-hidden>
            <path d="M9.5 6C6.5 7.2 4.5 9.8 4.5 13v5h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.5 6zm9 0c-3 1.2-5 3.8-5 7v5h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.5 6z" />
          </svg>
          <blockquote className="mt-6 text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink">
            {n.quote}
          </blockquote>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.25em] text-muted">— {n.author.name}</p>
        </Reveal>
      </section>

      {/* SHOP THE LOOK */}
      {products.length > 0 && (
        <section className="bg-mist py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">
            <Reveal className="mb-10 text-center md:mb-14">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Shop the look</p>
              <h2 className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium text-ink">Everything on this table</h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {products.map((p, i) => (
                <Reveal key={p.href} delay={i * 90}>
                  <Link href={p.href} className="group block bg-white">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={img(p.img, 700)} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]" />
                      <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">{p.sub}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4 md:p-5">
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-medium text-ink transition-colors group-hover:text-red">{p.name}</p>
                        <p className="mt-1 text-[14px] font-semibold text-red">{taka(p.price)}</p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-red group-hover:bg-red group-hover:text-white">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED COLLECTION */}
      {col && (
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <Link href={collectionHref(col.slug)} className="group relative block h-[420px] overflow-hidden bg-charcoal md:h-[480px]">
              <Image src={img(col.hero, 2000)} alt={`${col.plain} ${col.accent}`} fill sizes="100vw" className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex max-w-[560px] flex-col justify-center p-8 text-white md:p-16">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/75">Continue to {col.eyebrow}</p>
                <h2 className="mt-3 text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-none">
                  {col.plain} <span className="text-red">{col.accent}</span>
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-white/85">{col.teaser}</p>
                <span className="mt-8 inline-flex items-center gap-3 self-start border border-white/80 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:border-red group-hover:bg-red">
                  Shop the collection <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}
    </main>
  );
}

export default function StyleNotePage({ params }: PageProps<"/style-notes/[slug]">) {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <NoteContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}
