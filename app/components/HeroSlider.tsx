"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const img = (id: string, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const SLIDES = [
  {
    img: "1618220179428-22790b461013",
    label: "Living Room",
    title: "Complements your lifestyle",
    tagline: "The expression of rest",
    product: "Andaman-184 Sofa",
    price: "34,800",
  },
  {
    img: "1505693416388-ac5ce068fe85",
    label: "Bedroom",
    title: "Designed for deeper rest",
    tagline: "Calm, crafted, made to last",
    product: "Linden-361 King Bed",
    price: "58,500",
  },
  {
    img: "1617806118233-18e1de247200",
    label: "Dining",
    title: "Gather around timeless design",
    tagline: "Where every meal feels special",
    product: "Marigold-113 Dining Set",
    price: "72,900",
  },
];

const DURATION = 6500; // ms per slide

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const s = SLIDES[index];

  return (
    <section
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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

      {/* Shading for legibility */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_65%)]" />

      {/* Text — re-keyed per slide so it animates in each time */}
      <div
        key={index}
        className="relative z-30 flex h-full flex-col items-center justify-center px-4 pt-24 text-center text-white"
      >
        <p
          className="fade-up text-[12px] font-semibold uppercase tracking-[0.45em] text-white/80 md:text-[13px]"
          style={{ "--delay": "150ms" } as React.CSSProperties}
        >
          {s.label}
        </p>
        <h1
          className="fade-up mt-5 text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.01em]"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          {s.title}
        </h1>
        <span
          className="fade-up mt-7 block h-[2px] w-16 bg-red"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        />
        <p
          className="fade-up mt-5 text-lg font-light tracking-[0.08em] text-white/85 md:text-xl"
          style={{ "--delay": "550ms" } as React.CSSProperties}
        >
          {s.tagline}
        </p>
        <a
          href="#"
          className="fade-up group mt-9 inline-flex items-center gap-3 border border-white/80 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-[2px] transition-colors duration-500 hover:border-red hover:bg-red"
          style={{ "--delay": "700ms" } as React.CSSProperties}
        >
          Explore now
          <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
        </a>
      </div>

      {/* Product card (bottom-left) */}
      <a
        key={`card-${index}`}
        href="#"
        className="fade-up group absolute bottom-24 left-4 z-30 hidden items-center gap-4 bg-white/95 py-3 pl-3 pr-6 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 md:bottom-10 md:left-8 md:flex"
        style={{ "--delay": "850ms" } as React.CSSProperties}
      >
        <span className="relative h-14 w-14 shrink-0 overflow-hidden">
          <Image src={img(s.img, 200)} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span>
          <span className="block text-[15px] font-medium text-ink">{s.product}</span>
          <span className="block text-[13px] text-muted">
            Starts from <span className="font-semibold text-red">৳{s.price}</span>
          </span>
        </span>
      </a>

      {/* Controls (bottom-right): counter, progress bars, arrows */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-5 text-white md:bottom-10 md:left-auto md:right-8 md:translate-x-0">
        <span className="text-[13px] font-medium tabular-nums tracking-[0.1em]">
          0{index + 1} <span className="text-white/50">/ 0{SLIDES.length}</span>
        </span>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="relative h-[3px] w-10 overflow-hidden bg-white/30 md:w-14"
            >
              {i === index && (
                <span
                  key={`bar-${index}`}
                  className="hero-progress absolute inset-y-0 left-0 bg-white"
                  style={{
                    animationDuration: `${DURATION}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-white/80" />}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 md:flex">
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
