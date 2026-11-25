"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { img, taka } from "./catalog";
import { useAddresses, useOrders, useUser, type Order } from "./account";
import { useHydrated } from "./wishlist";

// Delivery journey. `at` = hours after the order was placed when the step completes.
const STAGES = [
  { t: "Order placed", s: "We've received your order.", at: 0, d: "M5 8h14l-1 13H6zM9 8V6a3 3 0 016 0v2" },
  { t: "Confirmed", s: "Our team called you and confirmed the details.", at: 0.05, d: "M5 12.5l4.5 4.5L19 7.5" },
  { t: "Crafted & packed", s: "Quality-checked and wrapped at our Gazipur warehouse.", at: 12, d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" },
  { t: "Out for delivery", s: "On the van with our delivery & installation crew.", at: 48, d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { t: "Delivered & installed", s: "Set up in your room. Enjoy your new piece!", at: 96, d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
];

const stageOf = (placed: number, now: number) => {
  const h = (now - placed) / 36e5;
  let i = 0;
  STAGES.forEach((s, k) => h >= s.at && (i = k));
  return i;
};

const fmt = (t: number, withTime = true) =>
  new Date(t).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}) });

// Read "now" once on the client without calling Date.now() during render.
let nowCache = 0;
const useNow = () =>
  useSyncExternalStore(
    () => () => {},
    () => (nowCache ||= Date.now()),
    () => 0,
  );

export default function TrackOrder() {
  const orders = useOrders();
  const user = useUser();
  const hydrated = useHydrated();
  const [no, setNo] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "missing">("idle");
  const [found, setFound] = useState<Order | null>(null);
  const [shake, setShake] = useState(0);

  const lookup = (orderNo: string) => {
    const key = orderNo.trim().toUpperCase().replace(/^#/, "");
    setState("loading");
    setFound(null);
    setTimeout(() => {
      const o = orders.find((x) => x.no === key || x.no === `FUR-${key}`);
      if (o) {
        setFound(o);
        setState("idle");
      } else {
        setState("missing");
        setShake((n) => n + 1);
      }
    }, 900);
  };

  return (
    <div className="space-y-10">
      {/* Look-up card */}
      <section className="fade-up relative z-10 mx-auto -mt-24 max-w-3xl bg-white p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] md:-mt-28 md:p-10">
        <h2 className="text-[22px] font-semibold text-ink md:text-[26px]">Where&apos;s my order?</h2>
        <p className="mt-1.5 text-[15px] text-muted">Enter the order number from your confirmation, and the phone or email you used.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lookup(no);
          }}
          className="mt-6 grid gap-3 md:grid-cols-[1.1fr_1fr_auto]"
        >
          <label className="relative block">
            <span className="sr-only">Order number</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" /></svg>
            <input
              key={shake}
              required
              value={no}
              onChange={(e) => setNo(e.target.value)}
              placeholder="Order no. e.g. FUR-482913"
              className={`h-14 w-full border bg-white pl-12 pr-4 text-[15px] uppercase tracking-[0.04em] text-ink outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-muted focus:border-ink ${state === "missing" ? "swatch-shake border-red" : "border-[#d4d4d4]"}`}
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Phone or email</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5h16v14H4zM4 6l8 7 8-7" /></svg>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone or email"
              className="h-14 w-full border border-[#d4d4d4] bg-white pl-12 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
            />
          </label>
          <button
            disabled={state === "loading"}
            className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden bg-red px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-dark disabled:cursor-wait"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
            {state === "loading" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Track"}
          </button>
        </form>

        {hydrated && orders.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="text-muted">Your recent orders:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.no}
                onClick={() => {
                  setNo(o.no);
                  if (user) setContact(user.phone || user.email);
                  lookup(o.no);
                }}
                className={`rounded-full border px-3.5 py-1.5 font-medium transition-colors ${found?.no === o.no ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
              >
                {o.no}
              </button>
            ))}
          </div>
        )}

        {state === "missing" && (
          <div className="fade-up mt-6 flex gap-4 border-l-[3px] border-red bg-rose/40 px-5 py-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 shrink-0 text-red"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></svg>
            <div className="text-[14px] leading-relaxed text-charcoal">
              <p className="font-semibold text-ink">We couldn&apos;t find that order.</p>
              <p>Check the number in your confirmation SMS or email (it starts with <span className="font-semibold">FUR-</span>). Still stuck? Call us on <a href="tel:16XXX" className="font-semibold text-ink underline underline-offset-2">16XXX</a>.</p>
            </div>
          </div>
        )}
      </section>

      {state === "loading" && <LoadingRoute />}
      {found && state === "idle" && <Result key={found.no} order={found} />}
      {!found && state !== "loading" && <HowItWorks />}
    </div>
  );
}

function LoadingRoute() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-4">
      <div className="h-56 bg-white" />
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="h-80 bg-white" />
        <div className="h-80 bg-white" />
      </div>
    </div>
  );
}

function Result({ order }: { order: Order }) {
  const now = useNow();
  const addresses = useAddresses();
  const user = useUser();
  const step = stageOf(order.placed, now);
  const done = step === STAGES.length - 1;
  const pct = (step / (STAGES.length - 1)) * 100;
  const eta = order.placed + STAGES[STAGES.length - 1].at * 36e5;
  const address = addresses.find((a) => a.isDefault) ?? addresses[0];
  const items = order.lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Status hero */}
      <section className="mega-in relative overflow-hidden bg-ink p-7 text-white md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-red/10" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/55">Order {order.no}</p>
            <h3 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-tight">{STAGES[step].t}</h3>
            <p className="mt-2 max-w-md text-[15px] text-white/70">{STAGES[step].s}</p>
          </div>
          <div className="bg-white/10 px-6 py-4 text-right ring-1 ring-white/15 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{done ? "Delivered on" : "Estimated delivery"}</p>
            <p className="mt-1 text-[22px] font-semibold">{fmt(eta, false)}</p>
            <p className="text-[13px] text-white/60">{done ? "Installed by our crew" : "Between 10am and 6pm"}</p>
          </div>
        </div>

        {/* Route with moving van */}
        <div className="relative mt-12 pb-2">
          <div className="relative h-[3px] rounded-full bg-white/15">
            <div className="tracker-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red to-[#ff6b6b]" style={{ width: `${pct}%` }} />
            {STAGES.map((s, i) => (
              <span
                key={s.t}
                className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-ink transition-colors duration-500 ${i <= step ? "bg-red" : "bg-white/30"}`}
                style={{ left: `${(i / (STAGES.length - 1)) * 100}%`, transitionDelay: `${300 + i * 150}ms` }}
              />
            ))}
            <span className="van-drive absolute -top-[42px] -translate-x-1/2" style={{ left: `${pct}%` }}>
              <span className="van-bob block rounded-md bg-white px-2.5 py-1.5 text-ink shadow-[0_10px_25px_-8px_rgba(0,0,0,0.6)]">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                  <path d="M1 3h17v11H1z" fill="#E1251B" />
                  <path d="M18 6h6l4.5 4.5V14H18z" fill="#1f1f1f" />
                  <path d="M20 7.5h3.5l3 3H20z" fill="#cfe3f1" />
                  <circle cx="6" cy="15.5" r="2.6" fill="#1f1f1f" stroke="#fff" strokeWidth="1.2" />
                  <circle cx="23" cy="15.5" r="2.6" fill="#1f1f1f" stroke="#fff" strokeWidth="1.2" />
                </svg>
              </span>
            </span>
          </div>
          <div className="mt-4 flex justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-white/55">
            <span>Warehouse</span>
            <span>{address ? address.district : "Your home"}</span>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 md:grid-cols-[1.4fr_1fr]">
        {/* Timeline */}
        <section className="mega-in bg-white p-6 md:p-8" style={{ "--delay": "120ms" } as React.CSSProperties}>
          <h4 className="text-[18px] font-semibold text-ink">Delivery timeline</h4>
          <ol className="mt-7">
            {STAGES.map((s, i) => {
              const reached = i <= step;
              const current = i === step && !done;
              const when = order.placed + s.at * 36e5;
              return (
                <li key={s.t} className="mega-in relative flex gap-5 pb-8 last:pb-0" style={{ "--delay": `${200 + i * 110}ms` } as React.CSSProperties}>
                  {i < STAGES.length - 1 && (
                    <span className={`absolute left-[19px] top-10 bottom-0 w-[2px] ${i < step ? "bg-[#2f8f4e]" : "bg-[repeating-linear-gradient(to_bottom,#d9d9d9_0_4px,transparent_4px_8px)]"}`} />
                  )}
                  <span className="relative shrink-0">
                    {current && <span className="absolute inset-0 animate-ping rounded-full bg-red/30" />}
                    <span
                      className={`relative grid h-10 w-10 place-items-center rounded-full ${
                        current ? "bg-red text-white" : reached ? "bg-[#2f8f4e] text-white" : "bg-mist text-muted"
                      }`}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={reached && !current ? "M5 12.5l4.5 4.5L19 7.5" : s.d} />
                      </svg>
                    </span>
                  </span>
                  <div className="pt-1.5">
                    <p className={`text-[15px] font-semibold ${reached ? "text-ink" : "text-muted"}`}>
                      {s.t}
                      {current && <span className="ml-2 bg-red px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-[0.12em] text-white">Now</span>}
                    </p>
                    <p className={`mt-0.5 text-[14px] leading-relaxed ${reached ? "text-charcoal" : "text-muted/80"}`}>{s.s}</p>
                    <p className="mt-1 text-[12px] text-muted">{reached ? fmt(when) : `Expected ${fmt(when, false)}`}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="space-y-6">
          {/* Items */}
          <section className="mega-in bg-white p-6 md:p-7" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <div className="flex items-center justify-between">
              <h4 className="text-[18px] font-semibold text-ink">In this order</h4>
              <span className="text-[13px] text-muted">{items} {items === 1 ? "item" : "items"}</span>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {order.lines.map((l) => (
                <li key={l.href + l.name} className="group flex items-center gap-4 py-3.5">
                  <Link href={l.href} className="relative h-16 w-14 shrink-0 overflow-hidden bg-mist">
                    <Image src={img(l.img, 160)} alt={l.name} fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={l.href} className="block truncate text-[14px] font-medium text-ink hover:text-red">{l.name}</Link>
                    <p className="text-[12px] text-muted">Qty {l.qty}</p>
                  </div>
                  <p className="text-[14px] font-semibold text-ink">{taka(l.price * l.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-ink pt-4 text-[15px]">
              <span className="font-semibold text-ink">{order.payment?.status === "Pay on delivery" ? "To pay on delivery" : "Total paid"}</span>
              <span className="font-semibold text-ink">{taka(order.total)}</span>
            </div>
          </section>

          {/* Address */}
          <section className="mega-in bg-white p-6 md:p-7" style={{ "--delay": "280ms" } as React.CSSProperties}>
            <h4 className="text-[18px] font-semibold text-ink">Delivering to</h4>
            {order.shipTo && order.customer ? (
              <div className="mt-3 space-y-4 text-[14px] leading-relaxed text-charcoal">
                <p>
                  <span className="font-medium text-ink">{order.customer.name}</span>
                  <br />
                  {order.shipTo.line}
                  <br />
                  {order.shipTo.area}, {order.shipTo.district}
                  <br />
                  <span className="text-muted">{order.customer.phone}</span>
                </p>
                {order.slot && (
                  <p className="border-t border-line pt-4">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Delivery slot</span>
                    <span className="font-medium text-ink">{order.slot.date}</span> · {order.slot.time}
                  </p>
                )}
                {order.payment && (
                  <p className="border-t border-line pt-4">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Payment</span>
                    <span className="font-medium text-ink">{order.payment.method}</span>
                    {order.payment.detail && <> · {order.payment.detail}</>}
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${order.payment.status === "Paid" ? "bg-[#e3f2e8] text-[#2f8f4e]" : "bg-mist text-charcoal"}`}>{order.payment.status}</span>
                  </p>
                )}
              </div>
            ) : address ? (
              <p className="mt-3 text-[14px] leading-relaxed text-charcoal">
                <span className="font-medium text-ink">{address.name}</span>
                <br />
                {address.line}, {address.district}
                <br />
                <span className="text-muted">{address.phone}</span>
              </p>
            ) : (
              <p className="mt-3 text-[14px] leading-relaxed text-charcoal">
                {user ? <span className="font-medium text-ink">{user.name}</span> : "The address you gave at checkout."}
                <br />
                <Link href="/account#addresses" className="text-[13px] text-muted underline underline-offset-2 hover:text-ink">Add a saved address</Link>
              </p>
            )}
          </section>

          {/* Help */}
          <section className="mega-in bg-mist p-6 md:p-7" style={{ "--delay": "360ms" } as React.CSSProperties}>
            <h4 className="text-[16px] font-semibold text-ink">Need to change something?</h4>
            <p className="mt-1.5 text-[14px] text-muted">Reschedule, update your address or ask about installation.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href="tel:16XXX" className="flex items-center justify-center gap-2 bg-ink py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
                Call us
              </a>
              <a href="#" className="flex items-center justify-center gap-2 border border-ink py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v11H8l-4 4z" /></svg>
                Chat
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { t: "Find your order number", s: "It's in your confirmation SMS and email, and starts with FUR-.", d: "M4 5h16v14H4zM4 6l8 7 8-7" },
    { t: "Follow every step", s: "From our workshop to your door, updated as your order moves.", d: STAGES[3].d },
    { t: "We build it in place", s: "Our crew delivers, assembles and takes the packaging away.", d: STAGES[4].d },
  ];
  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((x, i) => (
          <div key={x.t} className="mega-in group bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(0,0,0,0.45)]" style={{ "--delay": `${250 + i * 100}ms` } as React.CSSProperties}>
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={x.d} /></svg>
              </span>
              <span className="text-[40px] font-semibold leading-none text-mist">0{i + 1}</span>
            </div>
            <p className="mt-6 text-[17px] font-semibold text-ink">{x.t}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{x.s}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[14px] text-muted">
        Signed in? See all your orders in{" "}
        <Link href="/account#orders" className="font-medium text-ink underline underline-offset-4 hover:text-red">your account</Link>.
      </p>
    </section>
  );
}
