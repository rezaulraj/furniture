"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { img, taka } from "./catalog";
import { cartTotals, useCart } from "./cart";
import { DISTRICTS } from "./forms";
import { removeWish, useHydrated, useWishlist } from "./wishlist";
import { HeartIcon } from "./WishlistDrawer";
import {
  initials,
  ORDER_STEPS,
  orderStep,
  removeAddress,
  saveAddress,
  setDefaultAddress,
  signOut,
  updateUser,
  useAddresses,
  useOrders,
  useUser,
  type Address,
  type Order,
  type User,
} from "./account";

const TABS = [
  { id: "overview", label: "Overview", d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { id: "orders", label: "Orders", d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" },
  { id: "wishlist", label: "Wishlist", d: "M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" },
  { id: "addresses", label: "Addresses", d: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
  { id: "profile", label: "Profile", d: "M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM3.5 21c0-4.4 3.8-7.5 8.5-7.5s8.5 3.1 8.5 7.5" },
] as const;
type Tab = (typeof TABS)[number]["id"];

// Active tab lives in the URL hash (#orders), so footer links like "Track Order" can deep-link.
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = (): Tab => {
  const h = window.location.hash.slice(1);
  return (TABS.some((t) => t.id === h) ? h : "overview") as Tab;
};
const useTab = () => useSyncExternalStore(subscribeHash, readHash, () => "overview" as Tab);
const goTab = (t: Tab) => {
  history.replaceState(null, "", t === "overview" ? location.pathname : `#${t}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};

// "Now" for order progress, read once per render pass without calling Date.now() in render.
const subscribeNone = () => () => {};
let nowCache = 0;
const useNow = () =>
  useSyncExternalStore(
    subscribeNone,
    () => (nowCache ||= Date.now()),
    () => 0,
  );

const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function AccountDashboard() {
  const hydrated = useHydrated();
  const user = useUser();
  const tab = useTab();

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="h-80 animate-pulse bg-white" />
        <div className="space-y-6">
          <div className="h-40 animate-pulse bg-white" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => <div key={i} className="h-28 animate-pulse bg-white" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <SignedOut />;

  const index = TABS.findIndex((t) => t.id === tab);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
      {/* Sidebar */}
      <aside className="fade-up min-w-0 lg:sticky lg:top-28">
        <div className="bg-white p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-red to-red-dark text-[18px] font-semibold text-white shadow-[0_10px_25px_-10px_rgba(200,16,46,0.8)]">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[16px] font-semibold text-ink">{user.name}</p>
              <p className="truncate text-[13px] text-muted">{user.email}</p>
            </div>
          </div>
          <nav className="relative mt-6 border-t border-line pt-4" aria-label="Account sections">
            {/* Sliding highlight behind the active item (desktop) */}
            <span
              aria-hidden
              className="absolute left-0 right-0 hidden h-12 bg-mist transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:block"
              style={{ top: 16, transform: `translateY(${index * 48}px)` }}
            >
              <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-red" />
            </span>
            <ul className="relative -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:px-0 [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-0">
              {TABS.map((t) => {
                const on = t.id === tab;
                return (
                  <li key={t.id} className="shrink-0">
                    <button
                      onClick={() => goTab(t.id)}
                      aria-current={on ? "page" : undefined}
                      className={`flex h-12 w-full items-center gap-3 whitespace-nowrap px-4 text-[15px] transition-colors duration-300 max-lg:rounded-full max-lg:border ${
                        on ? "font-semibold text-ink max-lg:border-ink max-lg:bg-ink max-lg:text-white" : "text-charcoal hover:text-red max-lg:border-line"
                      }`}
                    >
                      <span className={on ? "text-red max-lg:text-white" : ""}>
                        <Icon d={t.d} />
                      </span>
                      {t.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            onClick={signOut}
            className="mt-4 flex w-full items-center gap-3 border-t border-line px-4 pt-5 text-[14px] text-muted transition-colors hover:text-red"
          >
            <Icon d="M15 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4M10 16l4-4-4-4M14 12H3" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Panel */}
      <div key={tab} className="mega-in min-w-0">
        {tab === "overview" && <Overview user={user} />}
        {tab === "orders" && <Orders />}
        {tab === "wishlist" && <WishlistTab />}
        {tab === "addresses" && <Addresses user={user} />}
        {tab === "profile" && <Profile user={user} />}
      </div>
    </div>
  );
}

/* ---------------- Overview ---------------- */

function Overview({ user }: { user: User }) {
  const orders = useOrders();
  const wish = useWishlist();
  const cart = useCart();
  const now = useNow();
  const spent = orders.reduce((s, o) => s + o.total, 0);
  const points = Math.floor(spent / 1000);
  const tier = points >= 500 ? "Gold" : points >= 100 ? "Silver" : "Member";
  const next = points >= 500 ? null : points >= 100 ? 500 : 100;
  const hour = now ? new Date(now).getHours() : 12;
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const since = new Date(user.since).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const stats = [
    { label: "Orders", value: String(orders.length), tab: "orders" as Tab, d: TABS[1].d },
    { label: "Wishlist", value: String(wish.length), tab: "wishlist" as Tab, d: TABS[2].d },
    { label: "In basket", value: String(cartTotals(cart).count), href: "/cart", d: "M5 8h14l-1 13H6zM9 8V6a3 3 0 016 0v2" },
    { label: "Reward points", value: points.toLocaleString("en-IN"), tab: "overview" as Tab, d: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome card */}
      <section className="relative overflow-hidden bg-ink p-7 text-white md:p-10">
        <Image src={img("1586023492125-27b2c045efd7", 1400)} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="relative flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/60">{greet}</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-tight">{user.name.split(" ")[0]}, welcome home.</h2>
            <p className="mt-2 text-[15px] text-white/70">Member since {since}</p>
          </div>
          <div className="w-full max-w-[300px] bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">{tier} tier</span>
              <span className="text-[13px] font-semibold">{points} pts</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gradient-to-r from-[#e0a526] to-[#f5d27a] transition-[width] duration-1000" style={{ width: `${next ? Math.min(100, (points / next) * 100) : 100}%` }} />
            </div>
            <p className="mt-2.5 text-[12px] text-white/70">
              {next ? <>Earn {next - points} more points to reach {next === 100 ? "Silver" : "Gold"}. ৳1,000 = 1 point.</> : "You're at our top tier. Thank you!"}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => {
          const inner = (
            <>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                <Icon d={s.d} />
              </span>
              <p className="mt-5 text-[28px] font-semibold leading-none text-ink">{s.value}</p>
              <p className="mt-1.5 text-[13px] text-muted">{s.label}</p>
            </>
          );
          const cls = "mega-in group block bg-white p-5 text-left shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.45)]";
          const style = { "--delay": `${80 + i * 70}ms` } as React.CSSProperties;
          return s.href ? (
            <Link key={s.label} href={s.href} className={cls} style={style}>{inner}</Link>
          ) : (
            <button key={s.label} onClick={() => goTab(s.tab!)} className={cls} style={style}>{inner}</button>
          );
        })}
      </div>

      {/* Latest order */}
      <section className="bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-ink">Latest order</h3>
          {orders.length > 0 && <button onClick={() => goTab("orders")} className="link-line text-[13px] font-medium text-ink">All orders</button>}
        </div>
        {orders[0] ? (
          <div className="mt-6">
            <OrderHead order={orders[0]} />
            <Tracker step={orderStep(orders[0].placed, now)} />
          </div>
        ) : (
          <EmptyLine text="No orders yet. When you place one, you can track it right here." cta="Start shopping" href="/categories" />
        )}
      </section>

      {/* Wishlist peek */}
      <section className="bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-ink">Saved for later</h3>
          {wish.length > 0 && <Link href="/wishlist" className="link-line text-[13px] font-medium text-ink">View wishlist</Link>}
        </div>
        {wish.length ? (
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {wish.slice(0, 6).map((w, i) => (
              <Link key={w.href} href={w.href} className="mega-in group w-[150px] shrink-0" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className="relative block aspect-[4/5] overflow-hidden bg-mist">
                  <Image src={img(w.img, 300)} alt={w.name} fill sizes="150px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-2 block truncate text-[13px] font-medium text-ink group-hover:text-red">{w.name}</span>
                <span className="text-[13px] text-muted">{taka(w.price)}</span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyLine text="Tap the heart on any piece to save it here." cta="Explore" href="/categories" />
        )}
      </section>
    </div>
  );
}

/* ---------------- Orders ---------------- */

function Orders() {
  const orders = useOrders();
  const now = useNow();
  const [open, setOpen] = useState<string | null>(orders[0]?.no ?? null);

  return (
    <section>
      <PanelTitle title="Your orders" sub={orders.length ? `${orders.length} ${orders.length === 1 ? "order" : "orders"} placed` : "Track and review everything you've bought."} />
      {orders.length === 0 ? (
        <div className="bg-white p-8">
          <EmptyLine text="You haven't placed any orders yet." cta="Start shopping" href="/categories" />
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o, i) => {
            const on = open === o.no;
            return (
              <li key={o.no} className="mega-in bg-white shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)]" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <button onClick={() => setOpen(on ? null : o.no)} aria-expanded={on} className="w-full p-6 text-left md:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                      {o.lines.slice(0, 3).map((l) => (
                        <span key={l.href + l.name} className="relative h-14 w-14 overflow-hidden rounded-full bg-mist ring-2 ring-white">
                          <Image src={img(l.img, 120)} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <OrderHead order={o} compact />
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 text-muted transition-transform duration-500 ${on ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-line px-6 pb-7 md:px-7">
                      <Tracker step={orderStep(o.placed, now)} />
                      <ul className="mt-8 divide-y divide-line border-y border-line">
                        {o.lines.map((l) => (
                          <li key={l.href + l.name} className="flex items-center gap-4 py-4">
                            <Link href={l.href} className="relative h-16 w-14 shrink-0 overflow-hidden bg-mist">
                              <Image src={img(l.img, 160)} alt={l.name} fill sizes="56px" className="object-cover" />
                            </Link>
                            <div className="min-w-0 flex-1">
                              <Link href={l.href} className="block truncate text-[15px] font-medium text-ink hover:text-red">{l.name}</Link>
                              <p className="text-[13px] text-muted">Qty {l.qty}</p>
                            </div>
                            <p className="text-[15px] font-semibold text-ink">{taka(l.price * l.qty)}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-[14px] text-muted">
                          Paid <span className="font-semibold text-ink">{taka(o.total)}</span> · Free delivery &amp; installation
                        </p>
                        <a href="#" className="border border-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">
                          Need help?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function OrderHead({ order, compact = false }: { order: Order; compact?: boolean }) {
  const date = new Date(order.placed).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const items = order.lines.reduce((s, l) => s + l.qty, 0);
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
      <div>
        <p className={`font-semibold text-ink ${compact ? "text-[15px]" : "text-[17px]"}`}>Order {order.no}</p>
        <p className="text-[13px] text-muted">
          {date} · {items} {items === 1 ? "item" : "items"}
        </p>
      </div>
      <p className={`font-semibold text-ink ${compact ? "text-[15px]" : "text-[20px]"}`}>{taka(order.total)}</p>
    </div>
  );
}

function Tracker({ step }: { step: number }) {
  return (
    <ol className="relative mt-7 grid grid-cols-4">
      <span className="absolute left-[12.5%] right-[12.5%] top-[15px] h-[3px] rounded-full bg-mist" />
      <span
        className="tracker-fill absolute left-[12.5%] top-[15px] h-[3px] rounded-full bg-[#2f8f4e]"
        style={{ width: `${(step / 3) * 75}%` }}
      />
      {ORDER_STEPS.map((s, i) => {
        const done = i <= step;
        return (
          <li key={s} className="relative flex flex-col items-center text-center">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-[12px] font-semibold transition-colors duration-500 ${
                done ? "bg-[#2f8f4e] text-white" : "bg-white text-muted ring-2 ring-mist"
              } ${i === step ? "shadow-[0_0_0_6px_rgba(47,143,78,0.15)]" : ""}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              ) : (
                i + 1
              )}
            </span>
            <span className={`mt-2.5 text-[12px] font-medium md:text-[13px] ${done ? "text-ink" : "text-muted"}`}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- Wishlist ---------------- */

function WishlistTab() {
  const wish = useWishlist();
  return (
    <section>
      <PanelTitle title="Your wishlist" sub={`${wish.length} saved ${wish.length === 1 ? "piece" : "pieces"}`} action={wish.length ? { label: "Open full wishlist", href: "/wishlist" } : undefined} />
      {wish.length === 0 ? (
        <div className="bg-white p-8">
          <EmptyLine text="Nothing saved yet. Tap the heart on any product." cta="Explore" href="/categories" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {wish.map((w, i) => (
            <article key={w.href} className="mega-in group bg-white p-3" style={{ "--delay": `${Math.min(i, 9) * 50}ms` } as React.CSSProperties}>
              <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                <Link href={w.href} className="absolute inset-0">
                  <Image src={img(w.img, 400)} alt={w.name} fill sizes="(min-width:768px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <button
                  onClick={() => removeWish(w.href)}
                  aria-label={`Remove ${w.name}`}
                  className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white text-red shadow-sm transition-transform hover:scale-110"
                >
                  <HeartIcon filled size={14} />
                </button>
              </div>
              <Link href={w.href} className="mt-3 block truncate text-[14px] font-medium text-ink hover:text-red">{w.name}</Link>
              <p className="text-[14px] font-semibold text-ink">{taka(w.price)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- Addresses ---------------- */

function Addresses({ user }: { user: User }) {
  const list = useAddresses();
  const [editing, setEditing] = useState<Address | "new" | null>(null);

  return (
    <section>
      <PanelTitle title="Saved addresses" sub="Where should we deliver your furniture?" />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((a, i) => (
          <div
            key={a.id}
            className={`mega-in relative bg-white p-6 transition-shadow ${a.isDefault ? "ring-2 ring-ink" : "ring-1 ring-line"}`}
            style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">{a.label}</span>
              {a.isDefault && <span className="bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Default</span>}
            </div>
            <p className="mt-4 text-[15px] font-medium text-ink">{a.name}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-charcoal">
              {a.line}
              <br />
              {a.district}
            </p>
            <p className="mt-1 text-[14px] text-muted">{a.phone}</p>
            <div className="mt-5 flex gap-5 border-t border-line pt-4 text-[13px]">
              <button onClick={() => setEditing(a)} className="font-medium text-ink hover:text-red">Edit</button>
              {!a.isDefault && <button onClick={() => setDefaultAddress(a.id)} className="text-muted hover:text-ink">Set as default</button>}
              <button onClick={() => removeAddress(a.id)} className="ml-auto text-muted hover:text-red">Remove</button>
            </div>
          </div>
        ))}
        {editing === null && (
          <button
            onClick={() => setEditing("new")}
            className="mega-in group flex min-h-[220px] flex-col items-center justify-center gap-3 border-2 border-dashed border-[#d4d4d4] bg-white/50 text-ink transition-colors hover:border-ink hover:bg-white"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-[24px] font-light transition-all duration-300 group-hover:rotate-90 group-hover:bg-red group-hover:text-white">+</span>
            <span className="text-[14px] font-semibold">Add a new address</span>
          </button>
        )}
      </div>
      {editing !== null && (
        <AddressForm
          key={editing === "new" ? "new" : editing.id}
          initial={editing === "new" ? { label: "Home", name: user.name, phone: user.phone, line: "", district: "Dhaka" } : editing}
          onDone={() => setEditing(null)}
        />
      )}
    </section>
  );
}

function AddressForm({ initial, onDone }: { initial: Omit<Address, "id" | "isDefault"> & { id?: string }; onDone: () => void }) {
  const [a, setA] = useState(initial);
  const set = (k: keyof typeof a) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setA((p) => ({ ...p, [k]: e.target.value }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveAddress(a);
        onDone();
      }}
      className="fade-up mt-6 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] md:p-8"
    >
      <h3 className="text-[18px] font-semibold text-ink">{initial.id ? "Edit address" : "New address"}</h3>
      <div className="mt-5 flex gap-2">
        {["Home", "Office", "Other"].map((l) => (
          <button
            type="button"
            key={l}
            onClick={() => setA((p) => ({ ...p, label: l }))}
            className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${a.label === l ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Input label="Full name" value={a.name} onChange={set("name")} />
        <Input label="Phone" type="tel" value={a.phone} onChange={set("phone")} />
        <div className="md:col-span-2">
          <Input label="House, road, area" value={a.line} onChange={set("line")} />
        </div>
        <label className="block">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">District</span>
          <select value={a.district} onChange={set("district")} className="h-12 w-full border border-[#d4d4d4] bg-white px-4 text-[15px] text-ink outline-none focus:border-ink">
            {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red">Save address</button>
        <button type="button" onClick={onDone} className="px-5 text-[14px] text-muted hover:text-ink">Cancel</button>
      </div>
    </form>
  );
}

/* ---------------- Profile ---------------- */

function Profile({ user }: { user: User }) {
  const [v, setV] = useState({ name: user.name, email: user.email, phone: user.phone });
  const [news, setNews] = useState(user.news);
  const [saved, setSaved] = useState(false);
  const dirty = v.name !== user.name || v.email !== user.email || v.phone !== user.phone || news !== user.news;

  return (
    <section>
      <PanelTitle title="Profile & preferences" sub="Keep your details up to date for smooth deliveries." />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser({ ...v, news });
          setSaved(true);
          setTimeout(() => setSaved(false), 2200);
        }}
        className="bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] md:p-8"
      >
        <div className="flex items-center gap-5 border-b border-line pb-6">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-red to-red-dark text-[26px] font-semibold text-white">{initials(v.name)}</span>
          <div>
            <p className="text-[18px] font-semibold text-ink">{v.name || "Your name"}</p>
            <p className="text-[14px] text-muted">{v.email}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Full name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
          <Input label="Phone" type="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} placeholder="01XXXXXXXXX" />
          <div className="md:col-span-2">
            <Input label="Email" type="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
          </div>
        </div>
        <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 bg-mist p-5">
          <span>
            <span className="block text-[15px] font-medium text-ink">News &amp; offers</span>
            <span className="text-[13px] text-muted">New collections, early sale access and style notes.</span>
          </span>
          <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} className="peer sr-only" />
          <span className="relative h-7 w-12 shrink-0 rounded-full bg-[#cfcfcf] transition-colors duration-300 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 peer-checked:bg-[#2f8f4e] peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-ink" />
        </label>
        <div className="mt-7 flex items-center gap-4">
          <button
            disabled={!dirty && !saved}
            className={`flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors ${saved ? "bg-[#2f8f4e]" : "bg-ink hover:bg-red disabled:cursor-not-allowed disabled:opacity-40"}`}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 7.5" className="auth-check" /></svg>
                Saved
              </>
            ) : (
              "Save changes"
            )}
          </button>
          {dirty && !saved && <span className="fade-up text-[13px] text-muted">You have unsaved changes</span>}
        </div>
      </form>
    </section>
  );
}

/* ---------------- Shared bits ---------------- */

function PanelTitle({ title, sub, action }: { title: string; sub: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold text-ink">{title}</h2>
        <p className="mt-1 text-[14px] text-muted">{sub}</p>
      </div>
      {action && <Link href={action.href} className="link-line text-[13px] font-medium text-ink">{action.label}</Link>}
    </div>
  );
}

function EmptyLine({ text, cta, href }: { text: string; cta: string; href: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-mist px-6 py-5">
      <p className="text-[14px] text-charcoal">{text}</p>
      <Link href={href} className="bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red">{cta}</Link>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">{label}</span>
      <input {...props} className="h-12 w-full border border-[#d4d4d4] bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted hover:border-[#bdbdbd] focus:border-ink" />
    </label>
  );
}

/* ---------------- Signed out ---------------- */

function SignedOut() {
  const perks = [
    { t: "Track every order", s: "Live delivery progress from placed to installed.", d: TABS[1].d },
    { t: "Wishlist everywhere", s: "Your saved pieces, on every device.", d: TABS[2].d },
    { t: "Faster checkout", s: "Saved addresses and details, ready to go.", d: TABS[3].d },
    { t: "Reward points", s: "Earn 1 point for every ৳1,000 you spend.", d: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" },
  ];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="fade-up flex flex-col justify-center bg-white p-8 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.5)] md:p-12">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-rose text-red">
          <Icon d={TABS[4].d} size={28} />
        </span>
        <h2 className="mt-7 text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight text-ink">Sign in to your account</h2>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">See your orders, saved addresses, wishlist and reward points, all in one place.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/login" className="group relative overflow-hidden bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red">
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-[400%]" />
            Log in
          </Link>
          <Link href="/signup" className="border border-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-white">
            Create account
          </Link>
        </div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {perks.map((p, i) => (
          <li key={p.t} className="mega-in group bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.45)]" style={{ "--delay": `${150 + i * 80}ms` } as React.CSSProperties}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-red group-hover:text-white">
              <Icon d={p.d} />
            </span>
            <p className="mt-5 text-[16px] font-semibold text-ink">{p.t}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.s}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
