"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { findSub, img, productHref, productsFor, taka } from "./catalog";
import { slugify } from "./menuData";
import Reveal from "./Reveal";

/* Customer posts. Each tags real catalogue products for "Shop this look". */
const POSTS = [
  {
    img: "1522708323590-d24dbb6b0267",
    user: "nusrat.homes",
    place: "Dhanmondi, Dhaka",
    caption: "Morning light and our new red armchair — the reading corner finally feels finished.",
    tags: ["#MyFurniture", "#ReadingNook"],
    likes: 1284,
    ago: "2 days ago",
    shop: [["Living Room", "Accent Chair"], ["Dining", "Round Dining Table"]],
  },
  {
    img: "1560448204-e02f11c3d0e2",
    user: "the.rahman.flat",
    place: "Gulshan, Dhaka",
    caption: "Big windows, soft sofas and a lot of Sunday afternoons ahead of us.",
    tags: ["#MyFurniture", "#LivingRoom"],
    likes: 2041,
    ago: "4 days ago",
    shop: [["Living Room", "Fabric Sofa"], ["Living Room", "Center Table With Wooden Top"]],
  },
  {
    img: "1583847268964-b28dc8f51f92",
    user: "minimal.nest",
    place: "Uttara, Dhaka",
    caption: "Grey, wood and a little greenery. Less really is more.",
    tags: ["#MyFurniture", "#Minimal"],
    likes: 976,
    ago: "1 week ago",
    shop: [["Living Room", "3-Seater Sofa"], ["Decor", "Throws"], ["Decor", "Wall Art"]],
  },
  {
    img: "1600566753190-17f0baa2a6c3",
    user: "arch.by.tanvir",
    place: "Bashundhara, Dhaka",
    caption: "Our new home from the outside — the garden set arrives next week!",
    tags: ["#MyFurniture", "#NewHome"],
    likes: 3310,
    ago: "1 week ago",
    shop: [["Outdoor", "Garden Sets"], ["Outdoor", "Outdoor Chairs"]],
  },
  {
    img: "1615874959474-d609969a20ed",
    user: "sleepy.sunday",
    place: "Mirpur, Dhaka",
    caption: "Layered cushions, warm pendant, zero plans. Perfect weekend.",
    tags: ["#MyFurniture", "#Bedroom"],
    likes: 1752,
    ago: "2 weeks ago",
    shop: [["Bedroom", "Queen Size Bed"], ["Lighting", "Pendant Lights"], ["Decor", "Cushions"]],
  },
  {
    img: "1631679706909-1844bbd07221",
    user: "boho.in.dhaka",
    place: "Banani, Dhaka",
    caption: "Rattan mirrors and a cosy two-seater — boho on a city budget.",
    tags: ["#MyFurniture", "#Boho"],
    likes: 2267,
    ago: "3 weeks ago",
    shop: [["Decor", "Mirrors"], ["Living Room", "2-Seater Sofa"]],
  },
].map((p) => ({
  ...p,
  shop: p.shop.flatMap(([room, sub]) => {
    const info = findSub(room, slugify(sub));
    const prod = info && productsFor(room, info)[0];
    return prod ? [{ name: prod.name, price: prod.price, img: prod.img, href: productHref(room, info.name, prod.id) }] : [];
  }),
}));

function InstaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.4 1.2 4.1 2.4h.6c.7-1.2 2-2.4 4.1-2.4 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z" />
    </svg>
  );
}

export default function InstaGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [burst, setBurst] = useState(0); // re-keys the big heart on double-click
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + POSTS.length) % POSTS.length)), []);

  // Keyboard, scroll lock and initial focus while the modal is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const post = open === null ? null : POSTS[open];
  const isLiked = open !== null && !!liked[open];
  const like = (force?: boolean) =>
    open !== null && setLiked((l) => ({ ...l, [open]: force ?? !l[open] }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {POSTS.map((p, k) => (
          <Reveal key={p.img} delay={k * 70}>
          <button
            type="button"
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setOpen(k);
            }}
            aria-label={`View post by @${p.user}`}
            className="group relative block aspect-square w-full overflow-hidden"
          >
            <Image src={img(p.img, 600)} alt={`Customer home by @${p.user}`} fill sizes="(min-width:1024px) 16vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red/0 text-white opacity-0 transition-all duration-500 group-hover:bg-red/60 group-hover:opacity-100">
              <InstaIcon size={28} />
              <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.4 1.2 4.1 2.4h.6c.7-1.2 2-2.4 4.1-2.4 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z" /></svg>
                {p.likes.toLocaleString("en-IN")}
              </span>
            </span>
          </button>
          </Reveal>
        ))}
      </div>

      {post && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Post by @${post.user}`}
          className="insta-fade fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-8"
          onClick={close}
        >
          {/* prev / next (desktop: outside the card) */}
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d < 0 ? "Previous post" : "Next post"}
              onClick={(e) => {
                e.stopPropagation();
                step(d);
              }}
              className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-red md:grid ${d < 0 ? "left-4 lg:left-8" : "right-4 lg:right-8"}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={d < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          ))}

          <div
            key={open}
            onClick={(e) => e.stopPropagation()}
            className="insta-pop relative grid max-h-[92vh] w-full max-w-[1040px] overflow-y-auto rounded-2xl md:overflow-hidden bg-white shadow-2xl md:grid-cols-[1.2fr_1fr]"
          >
            {/* photo */}
            <div
              className="relative aspect-square bg-mist md:aspect-auto md:min-h-[560px]"
              onDoubleClick={() => {
                like(true);
                setBurst((b) => b + 1);
              }}
            >
              <Image src={img(post.img, 1400)} alt={`Customer home by @${post.user}`} fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
              {burst > 0 && (
                <span key={burst} className="insta-burst pointer-events-none absolute inset-0 grid place-items-center text-white drop-shadow-lg">
                  <svg width="96" height="96" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2.1 0 3.4 1.2 4.1 2.4h.6c.7-1.2 2-2.4 4.1-2.4 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z" /></svg>
                </span>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink shadow md:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[12px] font-medium tabular-nums text-white backdrop-blur">
                {open + 1} / {POSTS.length}
              </span>
              {/* prev / next (mobile: on the photo) */}
              <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between md:hidden">
                {[-1, 1].map((d) => (
                  <button key={d} type="button" aria-label={d < 0 ? "Previous post" : "Next post"} onClick={() => step(d)} className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink shadow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} /></svg>
                  </button>
                ))}
              </div>
            </div>

            {/* details */}
            <div className="flex flex-col md:min-h-0 md:overflow-y-auto">
              <header className="flex items-center gap-3 border-b border-line px-5 py-4">
                <span className="rounded-full bg-[conic-gradient(from_200deg,#f9ce34,#ee2a7b,#6228d7,#f9ce34)] p-[2px]">
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-mist text-[14px] font-semibold uppercase text-ink">
                    {post.user[0]}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">@{post.user}</p>
                  <p className="flex items-center gap-1 text-[12px] text-muted">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-6-5.3-6-11a6 6 0 0112 0c0 5.7-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></svg>
                    {post.place}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="grid h-10 w-10 place-items-center rounded-full text-charcoal transition-all duration-300 hover:rotate-90 hover:bg-mist hover:text-red"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </header>

              <div className="px-5 py-5">
                <p className="text-[15px] leading-relaxed text-charcoal">
                  <span className="mr-1.5 font-semibold text-ink">@{post.user}</span>
                  {post.caption}
                </p>
                <p className="mt-2 text-[14px] font-medium text-red">{post.tags.join(" ")}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-muted">{post.ago}</p>
              </div>

              {post.shop.length > 0 && (
                <div className="border-t border-line px-5 py-5">
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink">Shop this look</p>
                  <ul className="space-y-2">
                    {post.shop.map((s, i) => (
                      <li key={s.href} className="insta-item" style={{ "--delay": `${120 + i * 80}ms` } as React.CSSProperties}>
                        <Link href={s.href} className="group flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-mist">
                          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist">
                            <Image src={img(s.img, 200)} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-medium text-ink group-hover:text-red">{s.name}</span>
                            <span className="block text-[13px] font-semibold text-red">{taka(s.price)}</span>
                          </span>
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-charcoal transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-red group-hover:bg-red group-hover:text-white">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <footer className="mt-auto flex items-center gap-4 border-t border-line px-5 py-4">
                <button
                  type="button"
                  onClick={() => like()}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Unlike" : "Like"}
                  className={`transition-transform duration-300 active:scale-75 ${isLiked ? "text-red" : "text-ink hover:text-red"}`}
                >
                  <Heart filled={isLiked} />
                </button>
                <p className="text-[14px] text-ink">
                  <span className="font-semibold tabular-nums">{(post.likes + (isLiked ? 1 : 0)).toLocaleString("en-IN")}</span> likes
                </p>
                <span className="ml-auto flex items-center gap-1.5 text-[12px] text-muted">
                  <InstaIcon size={14} /> #MyFurniture
                </span>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
