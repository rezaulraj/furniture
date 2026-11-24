"use client";

import { useState, useSyncExternalStore } from "react";
import { Field, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";

const TOPICS = [
  { id: "order", label: "Order & delivery", d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" },
  { id: "product", label: "Product question", d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10" },
  { id: "returns", label: "Returns & repairs", d: "M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.7L3 8M3 3v5h5" },
  { id: "design", label: "Design advice", d: "M12 3a9 9 0 100 18c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 005-5c0-4.4-4-8-9-8zM7.5 12a1 1 0 100-2 1 1 0 000 2zM10.5 8a1 1 0 100-2 1 1 0 000 2zM15 8a1 1 0 100-2 1 1 0 000 2z" },
  { id: "other", label: "Something else", d: "M4 5h16v11H8l-4 4z" },
];

const MAX = 600;

export default function ContactForm() {
  const { status, submit, reset } = useFakeSubmit();
  const [topic, setTopic] = useState("order");
  const [msg, setMsg] = useState("");

  if (status === "done") {
    return (
      <SuccessCard
        title="Message sent — thank you!"
        text="We reply to every message within one working day, usually much sooner. Keep an eye on your inbox and phone."
        onReset={() => {
          setMsg("");
          reset();
        }}
        resetLabel="Send another message"
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">What can we help with?</legend>
        <input type="hidden" name="topic" value={topic} />
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const on = topic === t.id;
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => setTopic(t.id)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${
                  on ? "border-ink bg-ink text-white shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]" : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={on ? "text-white" : "text-red"}>
                  <path d={t.d} />
                </svg>
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      {(topic === "order" || topic === "returns") && (
        <div className="fade-up">
          <Field label="Order number" name="order" required={false} placeholder="FUR-XXXXXX" />
        </div>
      )}

      <label className="block">
        <span className="mb-2 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
          Message
          <span className={`font-normal normal-case tracking-normal ${msg.length > MAX * 0.9 ? "text-red" : "text-muted"}`}>
            {msg.length}/{MAX}
          </span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={MAX}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Tell us a little about what you need…"
          className="w-full resize-none border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-ink"
        />
      </label>

      <SubmitButton loading={status === "loading"}>Send message</SubmitButton>
      <p className="text-center text-[13px] text-muted">We&apos;ll only use your details to reply to this message.</p>
    </form>
  );
}

/* ---------- Live "Open now" badge (Sat–Thu 10:00–21:00, Friday 15:00–21:00, Dhaka time) ---------- */

const dhakaNow = () => {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: get("weekday"), mins: Number(get("hour")) * 60 + Number(get("minute")) };
};

const statusText = () => {
  const { day, mins } = dhakaNow();
  const open = day === "Fri" ? 15 * 60 : 10 * 60;
  const close = 21 * 60;
  if (mins >= open && mins < close) return close - mins <= 60 ? "open:Closing soon" : "open:Open now";
  return mins < open ? `closed:Opens ${day === "Fri" ? "3pm" : "10am"} today` : `closed:Opens ${day === "Thu" ? "3pm" : "10am"} tomorrow`;
};

// Re-check every minute.
const subscribeMinute = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};

export function OpenNow() {
  const s = useSyncExternalStore(subscribeMinute, statusText, () => "");
  if (!s) return <span className="inline-block h-7 w-28 animate-pulse rounded-full bg-white/20" />;
  const [kind, text] = s.split(":");
  const open = kind === "open";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${open ? "bg-[#2f8f4e]/15 text-[#7fd49b]" : "bg-white/10 text-white/80"}`}>
      <span className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-[#4cc477] opacity-70" />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${open ? "bg-[#4cc477]" : "bg-white/50"}`} />
      </span>
      {text}
    </span>
  );
}
