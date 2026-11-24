"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { img, taka } from "./catalog";
import { useOrders, type Order } from "./account";
import { useHydrated } from "./wishlist";

const REASONS = ["Changed my mind", "Doesn't fit the space", "Colour looks different", "Arrived damaged", "Not as described", "Other"];
const STEPS = ["Find order", "Items & reason", "Refund", "Done"];

let nowCache = 0;
const useNow = () =>
  useSyncExternalStore(
    () => () => {},
    () => (nowCache ||= Date.now()),
    () => 0,
  );

/** Next `n` pick-up days, skipping Fridays. */
function pickupDays(from: number, n: number) {
  const out: Date[] = [];
  const d = new Date(from);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 5) out.push(new Date(d));
  }
  return out;
}

export default function ReturnWizard() {
  const orders = useOrders();
  const hydrated = useHydrated();
  const now = useNow();
  const [step, setStep] = useState(0);
  const [no, setNo] = useState("");
  const [missing, setMissing] = useState(0);
  const [order, setOrder] = useState<Order | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [method, setMethod] = useState<"original" | "credit">("original");
  const [day, setDay] = useState(0);
  const [busy, setBusy] = useState(false);
  const [rma, setRma] = useState("");

  const find = (value: string) => {
    const key = value.trim().toUpperCase();
    const o = orders.find((x) => x.no === key || x.no === `FUR-${key}`);
    if (!o) return setMissing((n) => n + 1);
    setOrder(o);
    setPicked(o.lines.map((l) => l.href + l.name));
    setStep(1);
  };

  const lines = order?.lines.filter((l) => picked.includes(l.href + l.name)) ?? [];
  const refund = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const bonus = method === "credit" ? Math.round(refund * 0.05) : 0;
  const days = now ? pickupDays(now, 5) : [];

  const confirm = () => {
    setBusy(true);
    setTimeout(() => {
      setRma(`RET-${order!.no.slice(-6)}-${String(Date.now()).slice(-3)}`);
      setBusy(false);
      setStep(3);
    }, 1100);
  };

  const restart = () => {
    setStep(0);
    setOrder(null);
    setNo("");
    setReason("");
    setMethod("original");
    setDay(0);
  };

  return (
    <div className="overflow-hidden bg-white shadow-[0_40px_80px_-45px_rgba(0,0,0,0.5)]">
      {/* Progress */}
      <div className="border-b border-line px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Start a return</p>
            <h2 className="mt-2 text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold text-ink">{["Which order is it?", "What are you returning?", "How would you like your refund?", "Your return is booked"][step]}</h2>
          </div>
          <span className="hidden text-[13px] text-muted sm:block">Step {Math.min(step + 1, 4)} of 4</span>
        </div>
        <ol className="mt-6 grid grid-cols-4 gap-2 pb-0">
          {STEPS.map((s, i) => (
            <li key={s}>
              <span className="block h-1 overflow-hidden rounded-full bg-mist">
                <span className={`block h-full origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i <= step ? "scale-x-100" : "scale-x-0"} ${step === 3 ? "bg-[#2f8f4e]" : "bg-red"}`} />
              </span>
              <span className={`mt-2 mb-5 block text-[11px] font-semibold uppercase tracking-[0.12em] md:text-[12px] ${i <= step ? "text-ink" : "text-muted"}`}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div key={step} className="mega-in p-6 md:p-10">
        {/* STEP 1 */}
        {step === 0 && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                find(no);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                key={missing}
                required
                value={no}
                onChange={(e) => setNo(e.target.value)}
                placeholder="Order number, e.g. FUR-482913"
                className={`h-14 flex-1 border bg-white px-5 text-[15px] uppercase tracking-[0.04em] text-ink outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-muted focus:border-ink ${missing ? "swatch-shake border-red" : "border-[#d4d4d4]"}`}
              />
              <button className="h-14 bg-ink px-8 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red">Find order</button>
            </form>
            {missing > 0 && (
              <p className="fade-up mt-3 text-[14px] text-red">
                We couldn&apos;t find that order. Check your confirmation SMS, or <Link href="/contact" className="font-semibold underline underline-offset-2">contact us</Link> and we&apos;ll sort it out.
              </p>
            )}
            {hydrated && orders.length > 0 && (
              <div className="mt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Or pick a recent order</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {orders.slice(0, 4).map((o) => (
                    <button
                      key={o.no}
                      onClick={() => {
                        setNo(o.no);
                        find(o.no);
                      }}
                      className="group flex items-center gap-4 border border-line p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_15px_30px_-20px_rgba(0,0,0,0.4)]"
                    >
                      <span className="flex -space-x-3">
                        {o.lines.slice(0, 2).map((l) => (
                          <span key={l.href + l.name} className="relative h-12 w-12 overflow-hidden rounded-full bg-mist ring-2 ring-white">
                            <Image src={img(l.img, 100)} alt="" fill sizes="48px" className="object-cover" />
                          </span>
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold text-ink">{o.no}</span>
                        <span className="text-[13px] text-muted">{new Date(o.placed).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {taka(o.total)}</span>
                      </span>
                      <span aria-hidden className="text-muted transition-all group-hover:translate-x-1 group-hover:text-red">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && order && (
          <div>
            <p className="text-[14px] text-muted">Order <span className="font-semibold text-ink">{order.no}</span> · select the items to return</p>
            <ul className="mt-4 space-y-3">
              {order.lines.map((l) => {
                const id = l.href + l.name;
                const on = picked.includes(id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== id) : [...p, id]))}
                      aria-pressed={on}
                      className={`flex w-full items-center gap-4 border p-3 pr-5 text-left transition-all duration-300 ${on ? "border-ink bg-[#fafafa]" : "border-line opacity-60 hover:opacity-100"}`}
                    >
                      <span className={`grid h-6 w-6 shrink-0 place-items-center border-2 transition-colors ${on ? "border-red bg-red text-white" : "border-[#cfcfcf]"}`}>
                        {on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
                      </span>
                      <span className="relative h-16 w-14 shrink-0 overflow-hidden bg-mist">
                        <Image src={img(l.img, 160)} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-medium text-ink">{l.name}</span>
                        <span className="text-[13px] text-muted">Qty {l.qty}</span>
                      </span>
                      <span className="text-[15px] font-semibold text-ink">{taka(l.price * l.qty)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Reason for return</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  aria-pressed={reason === r}
                  className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${reason === r ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            {(reason === "Arrived damaged" || reason === "Not as described") && (
              <p className="fade-up mt-4 flex gap-3 border-l-[3px] border-red bg-rose/30 px-4 py-3 text-[14px] text-charcoal">
                We&apos;re sorry! Damaged or incorrect items are always collected free, and you can choose a replacement instead of a refund when we call.
              </p>
            )}

            <Nav back={() => setStep(0)} next={() => setStep(2)} disabled={!picked.length || !reason} label={picked.length ? `Continue with ${picked.length} ${picked.length === 1 ? "item" : "items"}` : "Select an item"} />
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && order && (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "original" as const, t: "Original payment", s: "Back to your card, bKash or bank in 3–7 working days." },
                  { id: "credit" as const, t: "Store credit + 5%", s: "Instant, with a 5% bonus to spend on anything." },
                ].map((m) => {
                  const on = method === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      aria-pressed={on}
                      className={`relative border p-5 text-left transition-all duration-300 ${on ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
                    >
                      {m.id === "credit" && <span className="absolute right-3 top-3 bg-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Bonus</span>}
                      <span className="block text-[16px] font-semibold">{m.t}</span>
                      <span className={`mt-1 block text-[13px] leading-relaxed ${on ? "text-white/70" : "text-muted"}`}>{m.s}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Free pick-up from your home</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {days.map((d, i) => {
                  const on = day === i;
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDay(i)}
                      aria-pressed={on}
                      className={`flex flex-col items-center border py-3 transition-all duration-300 ${on ? "border-red bg-red text-white shadow-[0_12px_25px_-12px_rgba(200,16,46,0.7)]" : "border-line text-ink hover:border-ink"}`}
                    >
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${on ? "text-white/80" : "text-muted"}`}>{d.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                      <span className="mt-0.5 text-[22px] font-semibold leading-none">{d.getDate()}</span>
                      <span className={`mt-0.5 text-[11px] ${on ? "text-white/80" : "text-muted"}`}>{d.toLocaleDateString("en-GB", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[13px] text-muted">Our crew comes between 10am and 6pm and does all the packing.</p>
            </div>

            <aside className="bg-[#f6f5f3] p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Return summary</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {lines.map((l) => (
                  <li key={l.href + l.name} className="flex justify-between gap-3">
                    <span className="truncate text-charcoal">{l.qty} × {l.name}</span>
                    <span className="shrink-0 text-ink">{taka(l.price * l.qty)}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t border-line pt-2 text-charcoal">
                  <span>Pick-up</span>
                  <span className="font-medium text-[#2f8f4e]">Free</span>
                </li>
                {bonus > 0 && (
                  <li className="fade-up flex justify-between text-charcoal">
                    <span>5% credit bonus</span>
                    <span className="font-medium text-red">+{taka(bonus)}</span>
                  </li>
                )}
              </ul>
              <div className="mt-4 flex items-end justify-between border-t border-ink pt-4">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">You get back</span>
                <span key={refund + bonus} className="mega-in text-[26px] font-semibold leading-none text-ink">{taka(refund + bonus)}</span>
              </div>
              <p className="mt-2 text-[12px] text-muted">Reason: {reason}</p>
            </aside>

            <div className="lg:col-span-2">
              <Nav back={() => setStep(1)} next={confirm} busy={busy} label="Confirm return" />
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#2f8f4e] text-white shadow-[0_18px_36px_-14px_rgba(47,143,78,0.75)]">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" className="auth-check" /></svg>
            </span>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-charcoal">
              We&apos;ll collect your {lines.length === 1 ? "item" : "items"} on{" "}
              <span className="font-semibold text-ink">{days[day]?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>. You&apos;ll get{" "}
              <span className="font-semibold text-ink">{taka(refund + bonus)}</span> {method === "credit" ? "as store credit straight after pick-up" : "back within 3–7 working days of pick-up"}.
            </p>
            <div className="mt-7 border border-dashed border-ink px-8 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Return number</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[0.06em] text-ink">{rma}</p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">Return something else</button>
              <Link href="/categories" className="bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red">Continue shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Nav({ back, next, disabled = false, busy = false, label }: { back: () => void; next: () => void; disabled?: boolean; busy?: boolean; label: string }) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
      <button onClick={back} className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted transition-colors hover:text-ink">
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> Back
      </button>
      <button
        onClick={next}
        disabled={disabled || busy}
        className="group relative flex min-w-[200px] items-center justify-center gap-2 overflow-hidden bg-red px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark disabled:cursor-not-allowed disabled:bg-[#cfcfcf]"
      >
        {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <>{label} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></>}
      </button>
    </div>
  );
}
