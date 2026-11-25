"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { img, taka } from "./catalog";
import { cartTotals, clearCart, useCart, type CartItem } from "./cart";
import { addOrder, saveAddress, useAddresses, useUser, type Order } from "./account";
import { BANKS, MIN_EMI, TENURES, monthly } from "./emiData";
import { DISTRICTS } from "./forms";
import { useHydrated } from "./wishlist";

// Same demo codes as the basket.
export const PROMOS: Record<string, { pct: number; label: string }> = {
  WELCOME10: { pct: 10, label: "10% welcome discount" },
  HOME5: { pct: 5, label: "5% off your home" },
};
export const PROMO_KEY = "furniture:promo";

type Pay = "cod" | "bkash" | "nagad" | "card" | "emi";
const PAYMENTS: { id: Pay; t: string; s: string }[] = [
  { id: "cod", t: "Cash on delivery", s: "Pay our crew when your furniture arrives" },
  { id: "bkash", t: "bKash", s: "Pay from your bKash wallet" },
  { id: "nagad", t: "Nagad", s: "Pay from your Nagad wallet" },
  { id: "card", t: "Credit / debit card", s: "Visa, Mastercard, Amex" },
  { id: "emi", t: "0% EMI", s: "Monthly instalments on partner-bank cards" },
];
const TIMES = [
  { t: "Morning", s: "9am – 12pm" },
  { t: "Afternoon", s: "12pm – 4pm" },
  { t: "Evening", s: "4pm – 8pm" },
];

/** Next delivery days, starting 3 days out. Fridays are shown but unavailable. */
function upcomingDays() {
  const out: { key: string; dow: string; day: string; mon: string; off: boolean }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 3);
  for (let i = 0; i < 7; i++) {
    out.push({
      key: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      dow: d.toLocaleDateString("en-GB", { weekday: "short" }),
      day: String(d.getDate()),
      mon: d.toLocaleDateString("en-GB", { month: "short" }),
      off: d.getDay() === 5,
    });
    d.setDate(d.getDate() + 1);
  }
  return out;
}
const readPromo = () => {
  try {
    const p = sessionStorage.getItem(PROMO_KEY);
    return p && PROMOS[p] ? p : null;
  } catch {
    return null;
  }
};
const newOrderNo = () => `FUR-${String(Date.now()).slice(-6)}`;

const digits = (s: string) => s.replace(/\D/g, "");
const normPhone = (s: string) => digits(s).replace(/^880/, "0").replace(/^88/, "");
const isPhone = (s: string) => /^01[3-9]\d{8}$/.test(normPhone(s));
const cardBrand = (n: string) => (/^4/.test(n) ? "VISA" : /^(5[1-5]|2[2-7])/.test(n) ? "Mastercard" : /^3[47]/.test(n) ? "AMEX" : "");

export default function CheckoutView() {
  const hydrated = useHydrated();
  const list = useCart();
  const [placed, setPlaced] = useState<Order | null>(null);

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-64 animate-pulse bg-white" />
          ))}
        </div>
        <div className="h-[480px] animate-pulse bg-white" />
      </div>
    );
  }
  if (placed) return <OrderConfirmed order={placed} />;
  if (!list.length) {
    return (
      <div className="fade-up mx-auto max-w-md py-16 text-center">
        <h2 className="text-[28px] font-semibold text-ink">Your basket is empty</h2>
        <p className="mt-3 text-[16px] text-muted">Add something you love, then come back to check out.</p>
        <Link href="/categories" className="mt-8 inline-block bg-ink px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red">
          Start shopping
        </Link>
      </div>
    );
  }
  return <CheckoutForm list={list} onPlaced={setPlaced} />;
}

/* ---------------- Form ---------------- */

type Values = {
  name: string;
  phone: string;
  email: string;
  line: string;
  area: string;
  district: string;
  notes: string;
  wallet: string;
  cardNo: string;
  cardExp: string;
  cardCvc: string;
  cardName: string;
};

function CheckoutForm({ list, onPlaced }: { list: CartItem[]; onPlaced: (o: Order) => void }) {
  const user = useUser();
  const addresses = useAddresses();
  const def = addresses.find((a) => a.isDefault) ?? addresses[0];

  const [v, setV] = useState<Values>(() => ({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    line: "",
    area: "",
    district: "",
    notes: "",
    wallet: user?.phone ?? "",
    cardNo: "",
    cardExp: "",
    cardCvc: "",
    cardName: user?.name ?? "",
  }));
  const [addrId, setAddrId] = useState<string>(def?.id ?? "new");
  const [saveAddr, setSaveAddr] = useState(true);
  const [days] = useState(upcomingDays);
  const [day, setDay] = useState(() => days.find((d) => !d.off)!.key);
  const [time, setTime] = useState(TIMES[0].t);
  const [pay, setPay] = useState<Pay>("cod");
  const [bank, setBank] = useState(0);
  const [months, setMonths] = useState(12);
  const [agree, setAgree] = useState(false);
  const [promo] = useState(readPromo);
  const [tried, setTried] = useState(false);
  const [placing, setPlacing] = useState(false);

  // Pre-fill payment details from the contact section the first time they're needed.
  const choosePay = (id: Pay) => {
    setPay(id);
    setV((x) => ({
      ...x,
      cardName: (id === "card" || id === "emi") && !x.cardName ? x.name : x.cardName,
      wallet: (id === "bkash" || id === "nagad") && !x.wallet ? x.phone : x.wallet,
    }));
  };
  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((p) => ({ ...p, [k]: e.target.value }));

  const { count, subtotal, savings, delivery } = cartTotals(list);
  const discount = promo ? Math.round((subtotal * PROMOS[promo].pct) / 100) : 0;
  const total = subtotal - discount + delivery;

  const saved = addrId === "new" ? null : addresses.find((a) => a.id === addrId) ?? null;
  const b = BANKS[bank];
  const emiPlans = TENURES.filter((t) => t.m <= b.max);
  const plan = emiPlans.find((t) => t.m === months) ?? emiPlans[emiPlans.length - 1];
  const emiOk = total >= MIN_EMI;
  const cardDigits = digits(v.cardNo);

  // Validation: one message per field.
  const err: Partial<Record<keyof Values | "agree" | "emi", string>> = {};
  if (v.name.trim().length < 2) err.name = "Please enter your full name.";
  if (!isPhone(v.phone)) err.phone = "Enter an 11-digit mobile number, e.g. 01712345678.";
  if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) err.email = "That email doesn't look right.";
  if (!saved) {
    if (v.line.trim().length < 6) err.line = "Please enter your house, road and flat.";
    if (v.area.trim().length < 2) err.area = "Please enter your area or thana.";
    if (!v.district) err.district = "Please choose your district.";
  }
  if ((pay === "bkash" || pay === "nagad") && !isPhone(v.wallet)) err.wallet = "Enter the 11-digit wallet number.";
  if (pay === "card" || pay === "emi") {
    if (cardDigits.length < 15 || cardDigits.length > 16) err.cardNo = "Enter the full card number.";
    const [mm, yy] = v.cardExp.split("/").map(Number);
    if (!mm || mm > 12 || !yy || 2000 + yy < new Date().getFullYear()) err.cardExp = "Use MM/YY.";
    if (!/^\d{3,4}$/.test(v.cardCvc)) err.cardCvc = "3 or 4 digits.";
    if (v.cardName.trim().length < 2) err.cardName = "Name as shown on the card.";
  }
  if (pay === "emi" && !emiOk) err.emi = `EMI needs an order of ${taka(MIN_EMI)} or more.`;
  if (!agree) err.agree = "Please accept the terms to continue.";
  const show = (k: keyof typeof err) => (tried ? err[k] : undefined);

  const contactOk = !err.name && !err.phone && !err.email;
  const addressOk = !err.line && !err.area && !err.district;
  const payOk = !err.wallet && !err.cardNo && !err.cardExp && !err.cardCvc && !err.cardName && !err.emi;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (Object.keys(err).length) {
      // Bring the first problem into view after the messages render.
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>("[aria-invalid='true']");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    setPlacing(true);
    const shipTo = saved
      ? { line: saved.line, area: saved.label, district: saved.district, notes: v.notes.trim() || undefined }
      : { line: v.line.trim(), area: v.area.trim(), district: v.district, notes: v.notes.trim() || undefined };
    const payment =
      pay === "cod"
        ? { method: "Cash on delivery", status: "Pay on delivery" as const }
        : pay === "card"
          ? { method: `${cardBrand(cardDigits) || "Card"} •••• ${cardDigits.slice(-4)}`, status: "Paid" as const }
          : pay === "emi"
            ? { method: `0% EMI · ${b.name}`, detail: `${taka(monthly(total, plan.m, plan.rate))} × ${plan.m} months`, status: "Paid" as const }
            : { method: pay === "bkash" ? "bKash" : "Nagad", detail: normPhone(v.wallet).replace(/(\d{3})\d{5}(\d{3})/, "$1•••••$2"), status: "Paid" as const };

    setTimeout(() => {
      const order: Order = {
        no: newOrderNo(),
        placed: Date.now(),
        total,
        lines: list.map((i) => ({ name: i.name, img: i.img, qty: i.qty, price: i.price, href: i.href })),
        customer: { name: v.name.trim(), phone: normPhone(v.phone), email: v.email.trim() },
        shipTo,
        slot: { date: day, time: `${time} (${TIMES.find((x) => x.t === time)!.s})` },
        payment,
        breakdown: { subtotal, discount, delivery, promo: promo ?? undefined },
      };
      addOrder(order);
      if (!saved && user && saveAddr) {
        saveAddress({ label: v.area.trim(), name: v.name.trim(), phone: normPhone(v.phone), line: v.line.trim(), district: v.district });
      }
      try {
        sessionStorage.removeItem(PROMO_KEY);
      } catch {}
      clearCart();
      onPlaced(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1600);
  };

  return (
    <form id="checkout-form" onSubmit={submit} noValidate className="grid items-start gap-8 lg:grid-cols-[1fr_420px] xl:gap-12">
      <div className="min-w-0 space-y-6">
        {/* Mobile summary */}
        <details className="group bg-white shadow-[0_20px_40px_-35px_rgba(0,0,0,0.5)] lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between p-5 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
              Order summary · {count} {count === 1 ? "item" : "items"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-open:rotate-180"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="text-[18px] font-semibold text-ink">{taka(total)}</span>
          </summary>
          <div className="border-t border-line p-5">
            <Lines list={list} />
          </div>
        </details>

        {/* 1. Contact */}
        <Step n={1} title="Contact details" done={contactOk} delay={0}
          aside={!user && <Link href="/login" className="text-[13px] font-medium text-ink underline-offset-4 hover:text-red hover:underline">Sign in for faster checkout</Link>}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Full name" value={v.name} onChange={set("name")} error={show("name")} autoComplete="name" placeholder="e.g. Ayesha Rahman" className="sm:col-span-2" />
            <Input label="Mobile number" value={v.phone} onChange={set("phone")} error={show("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" hint="We'll call to confirm delivery" />
            <Input label="Email" value={v.email} onChange={set("email")} error={show("email")} type="email" autoComplete="email" placeholder="you@example.com" optional hint="For your receipt" />
          </div>
        </Step>

        {/* 2. Address */}
        <Step n={2} title="Delivery address" done={!!saved || addressOk} delay={80}>
          {addresses.length > 0 && (
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {addresses.map((a) => (
                <RadioCard key={a.id} name="addr" checked={addrId === a.id} onChange={() => setAddrId(a.id)}>
                  <span className="flex items-center gap-2 text-[15px] font-semibold">
                    {a.label}
                    {a.isDefault && <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-charcoal">Default</span>}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed opacity-75">
                    {a.name} · {a.phone}
                    <br />
                    {a.line}, {a.district}
                  </span>
                </RadioCard>
              ))}
              <RadioCard name="addr" checked={addrId === "new"} onChange={() => setAddrId("new")}>
                <span className="flex h-full items-center gap-2 text-[15px] font-semibold">
                  <span className="text-[20px] leading-none">+</span> Deliver somewhere new
                </span>
              </RadioCard>
            </div>
          )}
          {!saved && (
            <div key="new" className="mega-in grid gap-5 sm:grid-cols-2">
              <Input label="House, road & flat" value={v.line} onChange={set("line")} error={show("line")} autoComplete="street-address" placeholder="House 12, Road 5, Flat 4B" className="sm:col-span-2" />
              <Input label="Area / thana" value={v.area} onChange={set("area")} error={show("area")} autoComplete="address-level3" placeholder="e.g. Dhanmondi" />
              <label className="block">
                <Label>District</Label>
                <span className="relative block">
                  <select value={v.district} onChange={set("district")} aria-invalid={!!show("district")} autoComplete="address-level2" className={`${ctl(!!show("district"))} appearance-none pr-10`}>
                    <option value="" disabled>Choose district…</option>
                    {DISTRICTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
                <ErrorText msg={show("district")} />
              </label>
              {user && (
                <Check checked={saveAddr} onChange={setSaveAddr} className="sm:col-span-2">
                  Save this address to my account
                </Check>
              )}
            </div>
          )}
          <Input label="Delivery notes" value={v.notes} onChange={set("notes")} type="textarea" optional placeholder="Landmark, lift access, best time to call…" className="mt-5" />
        </Step>

        {/* 3. Slot */}
        <Step n={3} title="Delivery day & time" done delay={160}>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {days.map((d) => (
              <button
                type="button"
                key={d.key}
                disabled={d.off}
                onClick={() => setDay(d.key)}
                aria-pressed={day === d.key}
                className={`w-[78px] shrink-0 border py-3 text-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${day === d.key ? "border-ink bg-ink text-white" : "border-line text-ink enabled:hover:border-ink"}`}
              >
                <span className={`block text-[11px] font-semibold uppercase tracking-[0.12em] ${day === d.key ? "text-white/70" : "text-muted"}`}>{d.dow}</span>
                <span className="mt-1 block text-[22px] font-semibold leading-none">{d.day}</span>
                <span className={`mt-1 block text-[12px] ${day === d.key ? "text-white/70" : "text-muted"}`}>{d.off ? "Closed" : d.mon}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {TIMES.map((t) => (
              <button
                type="button"
                key={t.t}
                onClick={() => setTime(t.t)}
                aria-pressed={time === t.t}
                className={`border px-3 py-3 text-left transition-all duration-300 ${time === t.t ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
              >
                <span className="block text-[14px] font-semibold">{t.t}</span>
                <span className={`text-[12px] ${time === t.t ? "text-white/70" : "text-muted"}`}>{t.s}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-[13px] text-[#2f8f4e]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5 9-10" /></svg>
            Free assembly &amp; installation included. We&apos;ll call the day before.
          </p>
        </Step>

        {/* 4. Payment */}
        <Step n={4} title="Payment" done={payOk} delay={240}
          aside={<span className="flex items-center gap-1.5 text-[12px] text-muted"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="1.5" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>Secure &amp; encrypted</span>}>
          <div className="space-y-3">
            {PAYMENTS.map((p) => {
              const on = pay === p.id;
              return (
                <div key={p.id} className={`border transition-colors duration-300 ${on ? "border-ink" : "border-line hover:border-[#bbb]"}`}>
                  <label className="flex cursor-pointer items-center gap-4 px-5 py-4">
                    <input type="radio" name="pay" checked={on} onChange={() => choosePay(p.id)} className="peer sr-only" />
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-red/40 ${on ? "border-red" : "border-[#c8c8c8]"}`}>
                      <span className={`h-2.5 w-2.5 rounded-full bg-red transition-transform duration-300 ${on ? "scale-100" : "scale-0"}`} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-semibold text-ink">{p.t}</span>
                      <span className="block text-[13px] text-muted">{p.s}</span>
                    </span>
                    <PayMark id={p.id} />
                  </label>
                  <div className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} inert={!on}>
                    <div className="overflow-hidden">
                      {on && (
                      <div className="border-t border-line bg-[#fafafa] px-5 py-5">
                        {p.id === "cod" && <p className="text-[14px] leading-relaxed text-charcoal">Pay in cash or by card machine when we deliver. Please have the exact amount, <span className="font-semibold text-ink">{taka(total)}</span>, ready.</p>}
                        {(p.id === "bkash" || p.id === "nagad") && (
                          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
                            <Input label={`${p.t} wallet number`} value={v.wallet} onChange={set("wallet")} error={show("wallet")} type="tel" inputMode="tel" placeholder="01XXXXXXXXX" />
                            <p className="pb-3.5 text-[13px] text-muted sm:max-w-[200px]">You&apos;ll approve {taka(total)} on your phone.</p>
                          </div>
                        )}
                        {(p.id === "card" || p.id === "emi") && (
                          <div className="space-y-5">
                            {p.id === "emi" && (
                              <div className="space-y-4">
                                {!emiOk && <p className="text-[14px] font-medium text-red">{err.emi}</p>}
                                <label className="block">
                                  <Label>Card&apos;s bank</Label>
                                  <span className="relative block">
                                    <select value={bank} onChange={(e) => setBank(Number(e.target.value))} className={`${ctl(false)} appearance-none pr-10`}>
                                      {BANKS.map((x, i) => (
                                        <option key={x.name} value={i}>{x.name}</option>
                                      ))}
                                    </select>
                                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                                  </span>
                                </label>
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                                  {emiPlans.map((t) => (
                                    <button type="button" key={t.m} onClick={() => setMonths(t.m)} aria-pressed={plan.m === t.m}
                                      className={`border py-2.5 text-center transition-all duration-300 ${plan.m === t.m ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}>
                                      <span className="block text-[15px] font-semibold">{t.m} mo</span>
                                      <span className={`block text-[11px] ${plan.m === t.m ? "text-white/70" : t.rate ? "text-muted" : "text-[#2f8f4e]"}`}>{t.rate ? `${t.rate}%` : "0%"}</span>
                                    </button>
                                  ))}
                                </div>
                                {emiOk && (
                                  <p className="text-[14px] text-charcoal">
                                    <span key={`${plan.m}-${bank}`} className="mega-in inline-block text-[20px] font-semibold text-ink">{taka(monthly(total, plan.m, plan.rate))}</span>
                                    <span className="text-muted"> /month for {plan.m} months{plan.rate === 0 ? ", no interest" : ` at ${plan.rate}% p.a.`}</span>
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr_0.8fr]">
                              <Input
                                label="Card number"
                                value={v.cardNo}
                                onChange={(e) => setV((x) => ({ ...x, cardNo: digits(e.target.value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") }))}
                                error={show("cardNo")}
                                inputMode="numeric"
                                autoComplete="cc-number"
                                placeholder="1234 5678 9012 3456"
                                badge={cardBrand(cardDigits)}
                              />
                              <Input
                                label="Expiry"
                                value={v.cardExp}
                                onChange={(e) => {
                                  const d = digits(e.target.value).slice(0, 4);
                                  setV((x) => ({ ...x, cardExp: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }));
                                }}
                                error={show("cardExp")}
                                inputMode="numeric"
                                autoComplete="cc-exp"
                                placeholder="MM/YY"
                              />
                              <Input label="CVC" value={v.cardCvc} onChange={(e) => setV((x) => ({ ...x, cardCvc: digits(e.target.value).slice(0, 4) }))} error={show("cardCvc")} inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
                            </div>
                            <Input label="Name on card" value={v.cardName} onChange={set("cardName")} error={show("cardName")} autoComplete="cc-name" />
                            <p className="text-[12px] text-muted">Demo checkout: no real payment is taken and card details are never saved.</p>
                          </div>
                        )}
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Step>

        {/* Agree + submit (mobile shows the button here; desktop uses the summary button) */}
        <div className="fade-up bg-white p-6 md:p-8" style={{ "--delay": "320ms" } as React.CSSProperties}>
          <Check checked={agree} onChange={setAgree} invalid={!!show("agree")}>
            I agree to the <Link href="/legal" target="_blank" className="font-semibold text-ink underline underline-offset-2 hover:text-red">Terms of Use</Link> and{" "}
            <Link href="/legal#privacy" target="_blank" className="font-semibold text-ink underline underline-offset-2 hover:text-red">Privacy Policy</Link>.
          </Check>
          <ErrorText msg={show("agree")} />
          {tried && Object.keys(err).length > 0 && (
            <p className="fade-up mt-4 flex items-center gap-2 bg-red/[0.07] px-4 py-3 text-[14px] text-red" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
              Please check the {Object.keys(err).length === 1 ? "highlighted field" : `${Object.keys(err).length} highlighted fields`}.
            </p>
          )}
          <div className="mt-6 lg:hidden">
            <PlaceButton placing={placing} total={total} />
          </div>
        </div>
      </div>

      {/* Desktop summary */}
      <aside className="fade-up hidden lg:sticky lg:top-28 lg:block" style={{ "--delay": "150ms" } as React.CSSProperties}>
        <div className="bg-white p-7 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-ink">Order summary</h2>
            <Link href="/cart" className="text-[13px] text-muted underline-offset-4 hover:text-ink hover:underline">Edit basket</Link>
          </div>
          <div className="mt-3 max-h-[310px] overflow-y-auto pr-3 pt-3">
            <Lines list={list} />
          </div>
          <Totals count={count} subtotal={subtotal} savings={savings} promo={promo} discount={discount} delivery={delivery} total={total} />
          <div className="mt-6">
            <PlaceButton placing={placing} total={total} />
          </div>
          <p className="mt-4 text-center text-[12px] text-muted">You won&apos;t be charged until our team confirms your order.</p>
        </div>
      </aside>
    </form>
  );
}

/* ---------------- Building blocks ---------------- */

const ctl = (bad: boolean) =>
  `w-full border bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-muted/70 ${bad ? "border-red focus:border-red" : "border-line focus:border-ink"}`;

function Label({ children, optional = false }: { children: ReactNode; optional?: boolean }) {
  return (
    <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
      {children}
      {optional && <span className="ml-1 font-normal normal-case tracking-normal text-muted">(optional)</span>}
    </span>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="fade-up mt-1.5 block text-[13px] text-red">{msg}</span>;
}

function Input({
  label,
  error,
  hint,
  optional = false,
  badge,
  type = "text",
  className = "",
  ...rest
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  badge?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className={`block ${className}`}>
      <Label optional={optional}>{label}</Label>
      <span className="relative block">
        {type === "textarea" ? (
          <textarea {...rest} rows={2} aria-invalid={!!error} className={`${ctl(!!error)} resize-none`} />
        ) : (
          <input {...rest} type={type} aria-invalid={!!error} className={`${ctl(!!error)} ${badge ? "pr-28" : ""}`} />
        )}
        {badge && <span className="mega-in absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line bg-white px-2 py-0.5 text-[11px] font-bold text-ink">{badge}</span>}
      </span>
      {error ? <ErrorText msg={error} /> : hint && <span className="mt-1.5 block text-[12px] text-muted">{hint}</span>}
    </label>
  );
}

function Check({ checked, onChange, children, invalid = false, className = "" }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; invalid?: boolean; className?: string }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-charcoal ${className}`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={invalid} className="peer sr-only" />
      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-red/40 ${checked ? "border-ink bg-ink text-white" : invalid ? "border-red" : "border-[#c8c8c8]"}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className={`transition-transform duration-200 ${checked ? "scale-100" : "scale-0"}`}><path d="M5 12l5 5 9-10" /></svg>
      </span>
      <span>{children}</span>
    </label>
  );
}

function RadioCard({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className={`block h-full border px-4 py-3.5 transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-red/40 ${checked ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}>{children}</span>
    </label>
  );
}

function Step({ n, title, done, delay, aside, children }: { n: number; title: string; done: boolean; delay: number; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="fade-up bg-white p-6 shadow-[0_20px_40px_-38px_rgba(0,0,0,0.5)] md:p-8" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-[20px] font-semibold text-ink">
          <span className={`grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold transition-colors duration-500 ${done ? "bg-[#2f8f4e] text-white" : "bg-ink text-white"}`}>
            {done ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>
            ) : (
              n
            )}
          </span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function PayMark({ id }: { id: Pay }) {
  const marks: Record<Pay, ReactNode> = {
    cod: <span className="text-[20px]">৳</span>,
    bkash: <span className="rounded bg-[#e2136e] px-2 py-1 text-[11px] font-bold text-white">bKash</span>,
    nagad: <span className="rounded bg-[#f6921e] px-2 py-1 text-[11px] font-bold text-white">Nagad</span>,
    card: (
      <span className="flex gap-1">
        {["VISA", "MC", "AMEX"].map((c) => (
          <span key={c} className="rounded border border-line px-1.5 py-0.5 text-[10px] font-bold text-charcoal">{c}</span>
        ))}
      </span>
    ),
    emi: <span className="rounded-full bg-[#2f8f4e] px-2.5 py-1 text-[11px] font-bold text-white">0%</span>,
  };
  return <span className="hidden shrink-0 text-ink sm:block">{marks[id]}</span>;
}

function PlaceButton({ placing, total }: { placing: boolean; total: number }) {
  return (
    <button
      type="submit"
      form="checkout-form"
      disabled={placing}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-red py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red-dark disabled:cursor-wait"
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
      {placing ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Placing your order…
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="1.5" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
          Place order · {taka(total)}
        </>
      )}
    </button>
  );
}

function Lines({ list }: { list: { name: string; img: string; qty: number; price: number; href: string; color?: { name: string } }[] }) {
  return (
    <ul className="space-y-4">
      {list.map((i) => (
        <li key={i.href + i.name + (i.color?.name ?? "")} className="flex items-center gap-4">
          <span className="relative h-[72px] w-16 shrink-0 bg-mist">
            <Image src={img(i.img, 160)} alt={i.name} fill sizes="64px" className="object-cover" />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-white">{i.qty}</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-medium text-ink">{i.name}</span>
            {i.color && <span className="text-[12px] text-muted">{i.color.name}</span>}
          </span>
          <span className="text-[14px] font-semibold text-ink">{taka(i.price * i.qty)}</span>
        </li>
      ))}
    </ul>
  );
}

function Totals({ count, subtotal, savings = 0, promo, discount, delivery, total, paidLabel = "Total" }: { count: number; subtotal: number; savings?: number; promo?: string | null; discount: number; delivery: number; total: number; paidLabel?: string }) {
  return (
    <>
      <dl className="mt-6 space-y-3 border-t border-line pt-6 text-[15px]">
        <TRow k={`Subtotal (${count} ${count === 1 ? "item" : "items"})`} v={taka(subtotal)} />
        {savings > 0 && <TRow k="Sale savings" v={`−${taka(savings)}`} tone="text-red" />}
        {promo && <TRow k={`Promo ${promo}`} v={`−${taka(discount)}`} tone="text-red" />}
        <TRow k="Delivery" v={delivery ? taka(delivery) : "Free"} tone={delivery ? undefined : "text-[#2f8f4e]"} />
        <TRow k="Installation" v="Free" tone="text-[#2f8f4e]" />
      </dl>
      <div className="mt-6 flex items-end justify-between border-t border-ink pt-6">
        <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">{paidLabel}</span>
        <span className="text-[28px] font-semibold leading-none text-ink">{taka(total)}</span>
      </div>
    </>
  );
}

function TRow({ k, v, tone }: { k: string; v: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-charcoal">{k}</dt>
      <dd className={`font-medium ${tone ?? "text-ink"}`}>{v}</dd>
    </div>
  );
}

/* ---------------- Confirmation ---------------- */

function OrderConfirmed({ order }: { order: Order }) {
  const c = order.customer!;
  const s = order.shipTo!;
  const count = order.lines.reduce((n, l) => n + l.qty, 0);
  const b = order.breakdown!;
  const first = c.name.split(/\s+/)[0];

  const cards = [
    {
      t: "Contact",
      d: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
      body: (
        <>
          <span className="font-medium text-ink">{c.name}</span>
          <br />
          {c.phone}
          {c.email && (
            <>
              <br />
              {c.email}
            </>
          )}
        </>
      ),
    },
    {
      t: "Delivering to",
      d: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
      body: (
        <>
          {s.line}
          <br />
          {s.area}, {s.district}
          {s.notes && (
            <>
              <br />
              <span className="text-muted">Note: {s.notes}</span>
            </>
          )}
        </>
      ),
    },
    {
      t: "Delivery slot",
      d: "M4 5h16v15H4zM4 9h16M8 3v4M16 3v4",
      body: (
        <>
          <span className="font-medium text-ink">{order.slot!.date}</span>
          <br />
          {order.slot!.time}
          <br />
          <span className="text-[#2f8f4e]">Free installation</span>
        </>
      ),
    },
    {
      t: "Payment",
      d: "M3 6h18v12H3zM3 10h18M7 15h4",
      body: (
        <>
          <span className="font-medium text-ink">{order.payment!.method}</span>
          {order.payment!.detail && (
            <>
              <br />
              {order.payment!.detail}
            </>
          )}
          <br />
          <span className={order.payment!.status === "Paid" ? "text-[#2f8f4e]" : "text-charcoal"}>{order.payment!.status}</span>
        </>
      ),
    },
  ];

  return (
    <div data-order-done className="mx-auto max-w-5xl">
      <div className="fade-up text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#2f8f4e] text-white shadow-[0_20px_40px_-15px_rgba(47,143,78,0.7)]">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" className="auth-check" />
          </svg>
        </div>
        <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Order {order.no}</p>
        <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold text-ink">Thank you, {first}!</h2>
        <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-muted">
          Your order is placed. We&apos;ll call <span className="font-semibold text-ink">{c.phone}</span> within a few hours to confirm
          {c.email ? <>, and a receipt is on its way to <span className="font-semibold text-ink">{c.email}</span></> : null}.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((x, i) => (
          <div key={x.t} className="mega-in bg-white p-6 shadow-[0_20px_40px_-38px_rgba(0,0,0,0.5)]" style={{ "--delay": `${300 + i * 80}ms` } as React.CSSProperties}>
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-red"><path d={x.d} /></svg>
              {x.t}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-charcoal">{x.body}</p>
          </div>
        ))}
      </div>

      <div className="mega-in mt-6 bg-white p-6 shadow-[0_20px_40px_-38px_rgba(0,0,0,0.5)] md:p-8" style={{ "--delay": "650ms" } as React.CSSProperties}>
        <h3 className="text-[18px] font-semibold text-ink">Items</h3>
        <div className="mt-5">
          <Lines list={order.lines} />
        </div>
        <Totals count={count} subtotal={b.subtotal} promo={b.promo} discount={b.discount} delivery={b.delivery} total={order.total} paidLabel={order.payment!.status === "Paid" ? "Total paid" : "To pay on delivery"} />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 print:hidden">
        <Link href="/track-order" className="bg-ink px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red">
          Track order
        </Link>
        <button type="button" onClick={() => window.print()} className="border border-ink px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white">
          Print receipt
        </button>
        <Link href="/categories" className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-red">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
