"use client";

import Image from "next/image";
import { useState } from "react";
import { img } from "../catalog";

// Large photo + thumbnail column (Cox & Cox style), with crossfade and hover zoom.
export default function Gallery({ images, alt, tag }: { images: string[]; alt: string; tag?: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const go = (d: number) => setActive((a) => (a + d + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      {/* Main photo */}
      <div className="relative flex-1">
        <div
          className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-mist"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
          }}
        >
          {images.map((id, i) => (
            <Image
              key={id}
              src={img(id, 1400)}
              alt={i === 0 ? alt : `${alt} — view ${i + 1}`}
              fill
              preload={i === 0}
              sizes="(min-width:1024px) 55vw, 100vw"
              style={{ transformOrigin: origin }}
              className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                i === active ? "opacity-100" : "opacity-0"
              } ${i === active && zoom ? "scale-[1.8]" : "scale-100"}`}
            />
          ))}

          {tag && (
            <span className="pointer-events-none absolute left-4 top-4 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
              {tag}
            </span>
          )}

          {/* Arrows */}
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous photo" : "Next photo"}
              className={`absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-md transition-all duration-300 hover:bg-ink hover:text-white group-hover:opacity-100 ${
                d < 0 ? "left-4" : "right-4"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={d < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          ))}

          {/* Counter */}
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium tabular-nums text-ink">
            {active + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails — row on phones, column on desktop */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto md:w-[92px] md:flex-col md:overflow-visible">
        {images.map((id, i) => (
          <button
            key={id}
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className={`relative aspect-square w-[72px] shrink-0 overflow-hidden bg-mist transition-all duration-300 md:w-full ${
              i === active ? "ring-2 ring-ink ring-offset-2" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={img(id, 200)} alt="" fill sizes="92px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
