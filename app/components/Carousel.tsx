"use client";

import { useRef, type ReactNode } from "react";

export default function Carousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={track}
        className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {children}
      </div>
      {[-1, 1].map((dir) => (
        <button
          key={dir}
          aria-label={dir === -1 ? "Previous" : "Next"}
          onClick={() => scroll(dir as 1 | -1)}
          className={`absolute top-[40%] -translate-y-1/2 ${
            dir === -1 ? "-left-4" : "-right-4"
          } hidden md:grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg opacity-0 transition duration-300 group-hover/carousel:opacity-100 hover:bg-red hover:text-white`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={dir === -1 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
          </svg>
        </button>
      ))}
    </div>
  );
}
