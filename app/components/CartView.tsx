"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { img, taka } from "./catalog";
import { addToCart, cartTotals, clearCart, removeLine, useCart, type CartItem } from "./cart";
import { PROMOS, PROMO_KEY } from "./CheckoutView";
import { DeliveryProgress, QtyStepper } from "./CartDrawer";
import { removeWish, toggleWish, useHydrated, useWishlist, type WishItem } from "./wishlist";
import { HeartIcon } from "./WishlistDrawer";


const cartToWish = (item: CartItem): WishItem => ({
  href: item.href,
  name: item.name,
  img: item.img,
  img2: item.img,
  price: item.price,
  oldPrice: item.oldPrice,
  material: item.material ?? "",
  colors: item.color ? [item.color] : [],
  addedAt: Date.now(),
});

export default function CartView() {
  const list = useCart();
  const hydrated = useHydrated();
  const wishlist = useWishlist();
  const [leaving, setLeaving] = useState<string[]>([]);

  const remove = (key: string) => {
    setLeaving((l) => [...l, key]);
    setTimeout(() => {
      removeLine(key);
      setLeaving((l) => l.filter((k) => k !== key));
    }, 420);
  };

  const saveForLater = (item: CartItem) => {
    if (!wishlist.some((w) => w.href === item.href)) toggleWish(cartToWish(item));
    remove(item.key);
  };

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex animate-pulse gap-5 border-b border-line pb-6">
              <div className="h-36 w-28 bg-mist" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="h-4 w-1/2 bg-mist" />
                <div className="h-4 w-1/4 bg-mist" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-96 animate-pulse bg-mist" />
      </div>
    );
  }

  if (!list.length) return <EmptyCart />;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_400px] xl:gap-14">
      {/* Lines */}
      <div>
        <div className="hidden grid-cols-[1fr_120px_130px_120px] gap-4 border-b border-ink pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted md:grid">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-right">Total</span>
        </div>
        <ul>
          {list.map((item, i) => (
            <li
              key={item.key}
              className={`grid transition-all duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                leaving.includes(item.key) ? "grid-rows-[0fr] -translate-x-6 opacity-0" : "grid-rows-[1fr] opacity-100"
              }`}
            >
              <div className="overflow-hidden">
                <Line item={item} delay={Math.min(i, 8) * 70} onRemove={() => remove(item.key)} onSave={() => saveForLater(item)} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between text-[14px]">
          <Link href="/categories" className="group inline-flex items-center gap-2 font-medium text-ink hover:text-red">
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Continue shopping
          </Link>
          <ClearBasket />
        </div>

        <FromWishlist cart={list} />
      </div>

      {/* Summary */}
      <Summary list={list} />
    </div>
  );
}

function Line({ item, delay, onRemove, onSave }: { item: CartItem; delay: number; onRemove: () => void; onSave: () => void }) {
  return (
    <div
      className="mega-in group grid grid-cols-[96px_1fr] gap-x-5 gap-y-4 border-b border-line py-7 md:grid-cols-[1fr_120px_130px_120px] md:items-center md:gap-4"
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="contents md:flex md:items-center md:gap-5">
        <Link href={item.href} className="relative row-span-2 h-[120px] w-[96px] shrink-0 overflow-hidden bg-mist md:h-[140px] md:w-[112px]">
          <Image src={img(item.img, 300)} alt={item.name} fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          {item.oldPrice && (
            <span className="absolute left-1.5 top-1.5 bg-red px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              -{Math.round((1 - item.price / item.oldPrice) * 100)}%
            </span>
          )}
        </Link>
        <div className="min-w-0">
          {item.material && <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{item.material}</p>}
          <Link href={item.href} className="mt-1 block text-[16px] font-medium leading-snug text-ink transition-colors hover:text-red md:text-[17px]">
            {item.name}
          </Link>
          {item.color && (
            <p className="mt-1.5 flex items-center gap-2 text-[13px] text-muted">
              <span className="h-3 w-3 rounded-full border border-black/10" style={{ background: item.color.hex }} />
              {item.color.name}
            </p>
          )}
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#2f8f4e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f8f4e]" />
            In stock · ships in 3–7 days
          </p>
          <div className="mt-3 flex items-center gap-5 text-[13px]">
            <button onClick={onSave} className="flex items-center gap-1.5 text-muted transition-colors hover:text-red">
              <HeartIcon size={14} stroke={1.8} /> Save for later
            </button>
            <button onClick={onRemove} className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="col-start-2 flex items-center justify-between gap-4 md:contents">
        <div className="hidden md:block">
          <p className="text-[15px] text-ink">{taka(item.price)}</p>
          {item.oldPrice && <p className="text-[12px] text-muted line-through">{taka(item.oldPrice)}</p>}
        </div>
        <div>
          <QtyStepper item={item} />
        </div>
        <p key={item.qty} className="mega-in text-right text-[17px] font-semibold text-ink">{taka(item.price * item.qty)}</p>
      </div>
    </div>
  );
}

function Summary({ list }: { list: CartItem[] }) {
  const router = useRouter();
  const { count, subtotal, savings, delivery } = cartTotals(list);
  const [code, setCode] = useState("");
  // Keep the applied code for the checkout page.
  const [promo, setPromoState] = useState<string | null>(() => {
    try {
      const p = sessionStorage.getItem(PROMO_KEY);
      return p && PROMOS[p] ? p : null;
    } catch {
      return null;
    }
  });
  const setPromo = (p: string | null) => {
    setPromoState(p);
    try {
      if (p) sessionStorage.setItem(PROMO_KEY, p);
      else sessionStorage.removeItem(PROMO_KEY);
    } catch {}
  };
  const [promoError, setPromoError] = useState(0);
  const [placing, setPlacing] = useState(false);

  const discount = promo ? Math.round((subtotal * PROMOS[promo].pct) / 100) : 0;
  const total = subtotal - discount + delivery;
  const emi = Math.ceil(total / 12 / 10) * 10;

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (PROMOS[c]) {
      setPromo(c);
      setCode("");
    } else setPromoError((n) => n + 1);
  };

  const checkout = () => {
    setPlacing(true);
    router.push("/checkout");
  };

  return (
    <aside id="summary" className="fade-up scroll-mt-28 lg:sticky lg:top-28">
      <div className="border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)] md:p-8">
        <h2 className="text-[20px] font-semibold text-ink">Order summary</h2>
        <div className="mt-5">
          <DeliveryProgress subtotal={subtotal} />
        </div>

        <dl className="mt-6 space-y-3 border-t border-line pt-6 text-[15px]">
          <Row label={`Subtotal (${count} ${count === 1 ? "item" : "items"})`} value={taka(subtotal)} />
          {savings > 0 && <Row label="Sale savings" value={`−${taka(savings)}`} accent />}
          {promo && (
            <div className="fade-up flex items-center justify-between">
              <dt className="flex items-center gap-2 text-charcoal">
                <span className="bg-red px-2 py-0.5 text-[11px] font-bold tracking-[0.1em] text-white">{promo}</span>
                <button onClick={() => setPromo(null)} className="text-[12px] text-muted underline underline-offset-2 hover:text-ink">remove</button>
              </dt>
              <dd className="font-medium text-red">−{taka(discount)}</dd>
            </div>
          )}
          <Row label="Delivery" value={delivery ? taka(delivery) : "Free"} green={!delivery} />
          <Row label="Installation" value="Free" green />
        </dl>

        {/* Promo */}
        {!promo && (
          <form onSubmit={apply} className="mt-6">
            <label htmlFor="promo" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Promo code</label>
            <div key={promoError} className={`mt-2 flex ${promoError ? "swatch-shake" : ""}`}>
              <input
                id="promo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Try WELCOME10"
                className={`h-12 min-w-0 flex-1 border bg-white px-4 text-[14px] uppercase tracking-[0.08em] text-ink outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-muted focus:border-ink ${promoError ? "border-red" : "border-[#d4d4d4]"}`}
              />
              <button className="h-12 border border-l-0 border-ink bg-ink px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red hover:border-red">
                Apply
              </button>
            </div>
            {promoError > 0 && <p className="fade-up mt-2 text-[13px] text-red">That code isn&apos;t valid. Please check and try again.</p>}
          </form>
        )}

        <div className="mt-6 flex items-end justify-between border-t border-ink pt-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">Total</span>
          <span key={total} className="mega-in text-[30px] font-semibold leading-none text-ink">{taka(total)}</span>
        </div>
        <p className="mt-2 text-right text-[13px] text-muted">
          or <span className="font-semibold text-ink">{taka(emi)}/month</span> with 0% EMI
        </p>

        <button
          onClick={checkout}
          disabled={placing}
          className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden bg-red py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red-dark disabled:cursor-wait"
        >
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
          {placing ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Loading checkout…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="1.5" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
              Secure checkout
            </>
          )}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["bKash", "Nagad", "VISA", "Mastercard", "Cash on delivery"].map((m) => (
            <span key={m} className="border border-line px-2.5 py-1 text-[11px] font-semibold text-charcoal">{m}</span>
          ))}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-3 text-center text-[12px] leading-snug text-charcoal">
        {[
          { t: "Free installation", d: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" },
          { t: "7-day easy returns", d: "M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.7L3 8M3 3v5h5" },
          { t: "10-year warranty", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
        ].map((x) => (
          <li key={x.t} className="flex flex-col items-center gap-2 bg-mist px-2 py-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
              <path d={x.d} />
            </svg>
            {x.t}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Row({ label, value, accent = false, green = false }: { label: string; value: string; accent?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-charcoal">{label}</dt>
      <dd className={`font-medium ${accent ? "text-red" : green ? "text-[#2f8f4e]" : "text-ink"}`}>{value}</dd>
    </div>
  );
}

function ClearBasket() {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <span className="fade-up flex items-center gap-4">
      <span className="text-muted">Empty your basket?</span>
      <button onClick={clearCart} className="font-semibold text-red">Yes</button>
      <button onClick={() => setConfirm(false)} className="text-ink">Cancel</button>
    </span>
  ) : (
    <button onClick={() => setConfirm(true)} className="text-muted transition-colors hover:text-red">Clear basket</button>
  );
}

/** Wishlist items not yet in the basket, one click to move them over. */
function FromWishlist({ cart }: { cart: CartItem[] }) {
  const wish = useWishlist().filter((w) => !cart.some((c) => c.href === w.href));
  if (!wish.length) return null;

  const move = (w: WishItem) => {
    addToCart(
      { key: `${w.href}#${w.colors[0]?.name ?? ""}`, href: w.href, name: w.name, img: w.img, price: w.price, oldPrice: w.oldPrice, material: w.material, color: w.colors[0] },
      1,
      { silent: true },
    );
    removeWish(w.href);
  };

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-red">Don&apos;t forget</p>
          <h2 className="mt-2 text-[24px] font-semibold text-ink">From your wishlist</h2>
        </div>
        <Link href="/wishlist" className="link-line text-[13px] font-medium text-ink">View all</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {wish.slice(0, 3).map((w, i) => (
          <article key={w.href} className="mega-in group" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
            <Link href={w.href} className="relative block aspect-[4/5] overflow-hidden bg-mist">
              <Image src={img(w.img, 500)} alt={w.name} fill sizes="(min-width:640px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <Link href={w.href} className="mt-3 block truncate text-[14px] font-medium text-ink hover:text-red">{w.name}</Link>
            <p className="mt-0.5 text-[14px] font-semibold text-ink">{taka(w.price)}</p>
            <button
              onClick={() => move(w)}
              className="mt-3 w-full border border-ink py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              Move to basket
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function EmptyCart() {
  const ideas = [
    { t: "Living Room", h: "/categories/living-room", i: "1555041469-a586c61ea9bc" },
    { t: "Bedroom", h: "/categories/bedroom", i: "1505693416388-ac5ce068fe85" },
    { t: "Dining", h: "/categories/dining", i: "1617806118233-18e1de247200" },
  ];
  return (
    <div className="fade-up flex flex-col items-center py-6 text-center">
      <div className="grid h-32 w-32 place-items-center rounded-full bg-mist text-ink">
        <span className="cart-drop">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 8V6.5a4 4 0 018 0V8h-1.8V6.5a2.2 2.2 0 00-4.4 0V8z" />
            <path d="M4.2 8h15.6l1 15H3.2zM8.9 10.6a.9.9 0 100 1.8.9.9 0 000-1.8zm6.2 0a.9.9 0 100 1.8.9.9 0 000-1.8z" fillRule="evenodd" />
          </svg>
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold text-ink">Your basket is empty</h2>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">Looks like you haven&apos;t added anything yet. Let&apos;s find something beautiful for your home.</p>
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
