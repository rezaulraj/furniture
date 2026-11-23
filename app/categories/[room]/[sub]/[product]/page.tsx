import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Reveal from "../../../../components/Reveal";
import Carousel from "../../../../components/Carousel";
import Gallery from "../../../../components/product/Gallery";
import BuyBox from "../../../../components/product/BuyBox";
import Reviews from "../../../../components/product/Reviews";
import { ROOM_BY_SLUG, roomHref, slugify } from "../../../../components/menuData";
import {
  findProduct,
  findSub,
  galleryFor,
  img,
  productHref,
  productsFor,
  reviewsFor,
  sizeFor,
  subHref,
  subsOf,
  taka,
  type Product,
} from "../../../../components/catalog";

/* ---------- routing ---------- */

// Prerender the first product of the first two sub-categories in each room;
// every other product renders on its first visit and is then cached.
export function generateStaticParams() {
  return Object.entries(ROOM_BY_SLUG).flatMap(([room, name]) =>
    subsOf(name)
      .slice(0, 2)
      .map((s) => ({ room, sub: slugify(s.name), product: productsFor(name, s)[0].id })),
  );
}

async function load(params: PageProps<"/categories/[room]/[sub]/[product]">["params"]) {
  const { room, sub, product } = await params;
  const roomName = ROOM_BY_SLUG[room];
  const info = roomName ? findSub(roomName, sub) : undefined;
  const p = roomName && info ? findProduct(roomName, info, product) : undefined;
  return roomName && info && p ? { roomName, info, p } : null;
}

export async function generateMetadata({ params }: PageProps<"/categories/[room]/[sub]/[product]">): Promise<Metadata> {
  const d = await load(params);
  return d
    ? { title: `${d.p.name} — Furniture`, description: `${d.p.name} in ${d.p.material.toLowerCase()}, from ${taka(d.p.price)}.` }
    : { title: "Not found — Furniture" };
}

/* ---------- page ---------- */

export default async function ProductPage({ params }: PageProps<"/categories/[room]/[sub]/[product]">) {
  const d = await load(params);
  if (!d) notFound();
  const { roomName, info, p } = d;

  const siblings = productsFor(roomName, info);
  const similar = siblings.filter((x) => x.id !== p.id).slice(0, 8);
  const otherSubs = subsOf(roomName).filter((s) => s.name !== info.name);
  const lookItems = otherSubs.slice(0, 8).map((s) => ({ p: productsFor(roomName, s)[0], sub: s.name }));
  const extras = [...lookItems]
    .sort((a, b) => a.p.price - b.p.price)
    .slice(0, 3)
    .map((x) => ({ name: x.p.name, price: x.p.price, img: x.p.img, href: productHref(roomName, x.sub, x.p.id) }));

  const notes = [
    `The ${p.model} brings together considered design and everyday practicality — a ${info.name.toLowerCase()} made to be lived with and loved for years.`,
    `Crafted in ${p.material.toLowerCase()} with a hand-finished surface, every piece has its own subtle character. Clean lines and softly rounded edges make it easy to pair with both modern and traditional interiors.`,
    `Available in ${p.colors.map((c) => c.name).join(", ")}. Delivered and installed by our own team, and backed by our 10-year guarantee.`,
  ];

  const eyebrow = [
    { label: roomName, href: roomHref(roomName) },
    ...(info.group.links.length ? [{ label: info.group.title, href: `${roomHref(roomName)}#${slugify(info.group.title)}` }] : []),
    { label: info.name, href: subHref(roomName, info.name) },
  ];

  return (
    <>
      <Header solid />

      <main className="pt-[84px]">
        {/* Thin breadcrumb bar under the solid header */}
        <div className="border-b border-line bg-white">
          <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 px-4 py-3 text-[13px] text-muted md:px-8">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href={roomHref(roomName)} className="hover:text-ink">{roomName}</Link>
            <span>/</span>
            <Link href={subHref(roomName, info.name)} className="hover:text-ink">{info.name}</Link>
            <span>/</span>
            <span className="text-ink">{p.model}</span>
          </nav>
        </div>

        {/* GALLERY + BUY BOX */}
        <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-8 md:px-8 md:py-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <Gallery images={galleryFor(roomName, p)} alt={p.name} tag={p.tag} />
          </div>
          <div className="fade-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
            <BuyBox p={p} eyebrow={eyebrow} extras={extras} notes={notes} size={sizeFor(p)} />
          </div>
        </section>

        {/* SIMILAR ITEMS */}
        <ProductRow title="Similar Items" items={similar.map((x) => ({ p: x, sub: info.name }))} room={roomName} />

        {/* COMPLETE THE LOOK */}
        <div className="bg-mist">
          <ProductRow title="Complete the Look" items={lookItems} room={roomName} />
        </div>

        {/* REVIEWS */}
        <Reviews reviews={reviewsFor(p)} total={p.reviews} average={p.rating} />
      </main>

      <Footer />
    </>
  );
}

/* ---------- product row (carousel) ---------- */

function ProductRow({ title, items, room }: { title: string; items: { p: Product; sub: string }[]; room: string }) {
  if (!items.length) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal className="mb-10 text-center">
          <h2 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium text-ink">{title}</h2>
          <span className="mx-auto mt-3 block h-[2px] w-10 bg-red" />
        </Reveal>
        <Reveal>
          <Carousel>
            {items.map(({ p, sub }) => (
              <Link
                key={`${sub}-${p.id}`}
                href={productHref(room, sub, p.id)}
                className="group w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-18px)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={img(p.img, 700)}
                    alt={p.name}
                    fill
                    sizes="(min-width:1024px) 25vw, 70vw"
                    className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-0"
                  />
                  <Image
                    src={img(p.img2, 700)}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 25vw, 70vw"
                    className="scale-105 object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
                  />
                  {p.tag && (
                    <span className={`absolute left-3 top-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${p.tag === "Sale" ? "bg-red text-white" : "bg-white text-ink"}`}>
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[15px] text-ink transition-colors group-hover:text-red">{p.name}</p>
                <p className="mt-1 flex items-baseline gap-2 text-[15px] font-semibold text-ink">
                  {taka(p.price)}
                  {p.oldPrice && <span className="text-[13px] font-normal text-muted line-through">{taka(p.oldPrice)}</span>}
                </p>
              </Link>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
