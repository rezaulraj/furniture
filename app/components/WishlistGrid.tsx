"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { img, taka } from "./catalog";
import { addToCart } from "./cart";
import { clearWishlist, removeWish, useHydrated, useWishlist, type WishItem } from "./wishlist";
import { HeartIcon } from "./WishlistDrawer";

const SORTS = [
  { id: "recent", label: "Recently saved" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "name", label: "Name A–Z" },
];

const wishToCart = (w: WishItem) => ({
  key: `${w.href}#${w.colors[0]?.name ?? ""}`,
  href: w.href,
  name: w.name,
  img: w.img,
  price: w.price,
  oldPrice: w.oldPrice,
  material: w.material,
  color: w.colors[0],
});

/** Live "N pieces saved" chip for the hero. */
export function WishCount() {
  const n = useWishlist().length;
  const hydrated = useHydrated();
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-white/15 px-4 py-2 text-[14px] text-white ring-1 ring-white/25 backdrop-blur-md">
      <HeartIcon filled size={15} className="text-red" />
      {hydrated ? (
        <span key={n} className="mega-in">
          <span className="font-semibold">{n}</span> {n === 1 ? "piece" : "pieces"} saved
        </span>
      ) : (
        <span className="inline-block h-3 w-24 animate-pulse rounded bg-white/30" />
      )}
    </span>
  );
}

export default function WishlistGrid() {
  const list = useWishlist();
  const hydrated = useHydrated();
  const [sort, setSort] = useState("recent");
  const [leaving, setLeaving] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [basket, setBasket] = useState<"idle" | "loading" | "done">("idle");

  const sorted = useMemo(() => {
    const out = [...list];
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "recent") out.sort((a, b) => b.addedAt - a.addedAt);
    return out;
  }, [list, sort]);

  const remove = (href: string) => {
    setLeaving((l) => [...l, href]);
    setTimeout(() => {
      removeWish(href);
      setLeaving((l) => l.filter((h) => h !== href));
    }, 420);
  };

  const share = async () => {
    const text = `My wishlist:\n${list.map((i) => `• ${i.name} — ${taka(i.price)}\n  ${location.origin}${i.href}`).join("\n")}`;
    try {
      if (navigator.share) await navigator.share({ title: "My wishlist", text });
      else await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const addAll = () => {
    setBasket("loading");
    list.forEach((w) => addToCart(wishToCart(w), 1, { silent: true }));
    setTimeout(() => setBasket("done"), 900);
    setTimeout(() => setBasket("idle"), 3200);
  };

  const total = list.reduce((s, i) => s + i.price, 0);
  const saved = list.reduce((s, i) => s + (i.oldPrice ? i.oldPrice - i.price : 0), 0);

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-mist" />
            <div className="mt-4 h-4 w-2/3 bg-mist" />
            <div className="mt-2 h-4 w-1/3 bg-mist" />
          </div>
        ))}
      </div>
    );
  }

  if (!list.length) return <Empty />;

  return (
    <>
      {/* Summary bar */}
      <div className="fade-up mb-10 flex flex-col gap-5 border border-line bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Stat label="Saved pieces" value={String(list.length)} />
          <span className="hidden h-10 w-px bg-line md:block" />
          <Stat label="Wishlist value" value={taka(total)} />
          {saved > 0 && (
            <>
              <span className="hidden h-10 w-px bg-line md:block" />
              <Stat label="On sale, you save" value={taka(saved)} accent />
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative">
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 cursor-pointer appearance-none border border-[#d4d4d4] bg-white pl-4 pr-10 text-[14px] text-ink outline-none transition-colors hover:border-ink focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </label>
          <button
            onClick={share}
            className="flex h-12 items-center gap-2 border border-[#d4d4d4] px-5 text-[13px] font-medium text-ink transition-colors hover:border-ink"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-red"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                Copied
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></svg>
                Share
              </>
            )}
          </button>
          <button
            onClick={addAll}
            disabled={basket !== "idle"}
            className="group relative flex h-12 min-w-[190px] items-center justify-center gap-2 overflow-hidden bg-ink px-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red disabled:cursor-default"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-[400%]" />
            {basket === "loading" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : basket === "done" ? (
              <span className="fade-up">Added to basket ✓</span>
            ) : (
              "Add all to basket"
            )}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div key={sort} className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {sorted.map((item, i) => (
          <Card key={item.href} item={item} delay={Math.min(i, 12) * 50} leaving={leaving.includes(item.href)} onRemove={() => remove(item.href)} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[14px] sm:flex-row">
        <Link href="/categories" className="group inline-flex items-center gap-2 font-medium text-ink hover:text-red">
          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Continue shopping
        </Link>
        <ClearAll />
      </div>
    </>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p key={value} className={`mega-in mt-1 text-[22px] font-semibold leading-none ${accent ? "text-red" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function Card({ item, delay, leaving, onRemove }: { item: WishItem; delay: number; leaving: boolean; onRemove: () => void }) {
  const off = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;
  const [added, setAdded] = useState(false);
  return (
    <article
      className={`mega-in group transition-all duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] ${leaving ? "scale-90 opacity-0 blur-[2px]" : ""}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Link href={item.href} aria-label={item.name} className="absolute inset-0">
          <Image
            src={img(item.img, 700)}
            alt={item.name}
            fill
            loading={delay < 200 ? "eager" : undefined}
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 48vw"
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={img(item.img2, 700)}
            alt=""
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 48vw"
            className="scale-105 object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>
        {off > 0 && (
          <span className="pointer-events-none absolute left-3 top-3 bg-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">-{off}%</span>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${item.name} from wishlist`}
          className="group/x absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-red shadow-sm transition-all duration-300 hover:scale-110"
        >
          <span className="transition-all duration-300 group-hover/x:scale-0 group-hover/x:opacity-0">
            <HeartIcon filled size={16} />
          </span>
          <svg className="absolute scale-0 text-ink opacity-0 transition-all duration-300 group-hover/x:scale-100 group-hover/x:opacity-100" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <button
          onClick={() => {
            addToCart(wishToCart(item), 1, { silent: true });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`absolute inset-x-3 bottom-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
            added ? "bg-ink text-white md:translate-y-0 md:opacity-100" : "bg-white text-ink hover:bg-ink hover:text-white"
          }`}
        >
          {added ? "Added ✓" : "Add to basket"}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-[12px] uppercase tracking-[0.12em] text-muted">{item.material}</p>
        <Link href={item.href} className="mt-1.5 block text-[15px] font-medium leading-snug text-ink transition-colors duration-300 hover:text-red md:text-[16px]">
          {item.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[16px] font-semibold text-ink">{taka(item.price)}</span>
          {item.oldPrice && <span className="text-[13px] text-muted line-through">{taka(item.oldPrice)}</span>}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {item.colors.map((c) => (
            <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c.hex }} />
          ))}
        </div>
      </div>
    </article>
  );
}

function ClearAll() {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <span className="fade-up flex items-center gap-4">
      <span className="text-muted">Remove every saved piece?</span>
      <button onClick={clearWishlist} className="font-semibold text-red">Yes, clear</button>
      <button onClick={() => setConfirm(false)} className="text-ink">Cancel</button>
    </span>
  ) : (
    <button onClick={() => setConfirm(true)} className="text-muted transition-colors hover:text-red">
      Clear wishlist
    </button>
  );
}

function Empty() {
  const ideas = [
    { t: "Living Room", h: "/categories/living-room", i: "1555041469-a586c61ea9bc" },
    { t: "Bedroom", h: "/categories/bedroom", i: "1505693416388-ac5ce068fe85" },
    { t: "Dining", h: "/categories/dining", i: "1617806118233-18e1de247200" },
  ];
  return (
    <div className="fade-up flex flex-col items-center py-10 text-center">
      <div className="relative grid h-32 w-32 place-items-center rounded-full bg-rose">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className="text-red">
          <path pathLength={1} className="wish-draw" d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
        </svg>
        <span className="absolute inset-0 animate-ping rounded-full bg-rose opacity-40 [animation-duration:2.4s]" />
      </div>
      <h2 className="mt-8 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold text-ink">Your wishlist is empty</h2>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">
        Tap the heart on any piece you love. We&apos;ll keep it safe here so you can come back, compare and decide.
      </p>
      <div className="mt-12 grid w-full max-w-4xl gap-5 sm:grid-cols-3">
        {ideas.map((x, i) => (
          <Link key={x.t} href={x.h} className="mega-in group relative block aspect-[4/5] overflow-hidden bg-mist" style={{ "--delay": `${200 + i * 90}ms` } as React.CSSProperties}>
            <Image src={img(x.i, 600)} alt={x.t} fill sizes="(min-width:640px) 30vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
            <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
              <span className="text-[20px] font-semibold">{x.t}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
