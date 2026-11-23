"use client";

import Image from "next/image";
import Link from "next/link";
import { findSub, productHref, productsFor, taka } from "./catalog";
import { slugify } from "./menuData";
import { useCallback, useEffect, useState } from "react";

const img = (id: string, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Each slide features a real catalogue product, so its links open that product's page.
const SLIDES = [
  { room: "Living Room", sub: "3-Seater Sofa" },
  { room: "Bedroom", sub: "King Size Bed" },
  { room: "Dining", sub: "Dining Set" },
].map((s) => {
  const p = productsFor(s.room, findSub(s.room, slugify(s.sub))!)[0];
  return { ...s, img: p.img, product: p.name, price: taka(p.price), href: productHref(s.room, s.sub, p.id) };
});

const DURATION = 6500; // ms per slide

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, go]);

  const s = SLIDES[index];

  return (
    <section
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal"
      aria-roledescription="carousel"
    >
      {/* Slides — crossfade + slow zoom */}
      {SLIDES.map((sl, i) => (
        <div
          key={sl.img}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            // re-key on activation so the zoom restarts each time
            key={i === index ? `active-${index}` : "idle"}
            src={img(sl.img)}
            alt={sl.product}
            fill
            preload={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "kenburns" : ""}`}
          />
        </div>
      ))}

      {/* Light shading so the card and arrows stay readable */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-black/25" />

      {/* The whole slide opens its product */}
      <h1 className="sr-only">Furniture for every room</h1>
      <Link href={s.href} aria-label={`View ${s.product}`} className="absolute inset-0 z-20" />

      {/* Product card (bottom-left) */}
      <Link
        key={`card-${index}`}
        href={s.href}
        className="fade-up group absolute bottom-24 left-4 z-30 hidden items-center gap-4 bg-white/95 py-3 pl-3 pr-6 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 md:bottom-10 md:left-8 md:flex"
        style={{ "--delay": "850ms" } as React.CSSProperties}
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden">
          <Image src={img(s.img, 200)} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span>
          <span className="block text-[15px] font-medium text-ink">{s.product}</span>
          <span className="block text-[13px] text-muted">
            Starts from <span className="font-semibold text-red">{s.price}</span>
          </span>
        </span>
      </Link>

      {/* Controls (bottom-right): arrows */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-5 text-white md:bottom-10 md:left-auto md:right-8 md:translate-x-0">
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              aria-label={d < 0 ? "Previous slide" : "Next slide"}
              onClick={() => go(d)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/60 transition-all duration-300 hover:border-red hover:bg-red"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={d < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
