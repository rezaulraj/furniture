"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type QA = { q: string; a: string; link?: { label: string; href: string } };
type Cat = { id: string; label: string; d: string; items: QA[] };

// Placeholder policy answers — review with the real terms before launch.
const CATS: Cat[] = [
  {
    id: "orders",
    label: "Orders",
    d: "M5 8h14l-1 13H6zM9 8V6a3 3 0 016 0v2",
    items: [
      { q: "How do I place an order?", a: "Add the pieces you love to your basket, then press Secure checkout. You'll get an order number by SMS and email, and our team will call to confirm the details and delivery date." },
      { q: "Can I change or cancel my order?", a: "Yes, free of charge until your order is packed (usually within 12 hours). After that, call us and we'll do our best to help before it's out for delivery." },
      { q: "How can I track my order?", a: "Enter your order number on our Track Order page to see every step, from our workshop to your door.", link: { label: "Track your order", href: "/track-order" } },
      { q: "Do I need an account to order?", a: "No, but an account lets you see all your orders, save addresses and collect reward points.", link: { label: "Your account", href: "/account" } },
    ],
  },
  {
    id: "delivery",
    label: "Delivery & installation",
    d: "M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
    items: [
      { q: "How long does delivery take?", a: "Most in-stock pieces arrive in 3–7 working days across Bangladesh. Made-to-order and custom-size items take 2–4 weeks; we'll confirm the date when we call you." },
      { q: "How much does delivery cost?", a: "Delivery is free on orders over ৳20,000. Below that, a flat ৳1,500 delivery fee applies." },
      { q: "Is installation included?", a: "Always. Our trained crew delivers, assembles and places every piece in your room, then takes all the packaging away, at no extra cost." },
      { q: "What if I'm not home on delivery day?", a: "We call the day before to confirm a time window. If something comes up, just let us know and we'll happily reschedule." },
    ],
  },
  {
    id: "returns",
    label: "Returns & warranty",
    d: "M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.7L3 8M3 3v5h5",
    items: [
      { q: "What is your return policy?", a: "Unused items in their original condition can be returned within 7 days of delivery. We'll collect them from your home and refund you once they're checked." },
      { q: "What does the warranty cover?", a: "Solid wood frames carry a 10-year warranty, and mechanisms, hardware and upholstery a 1-year warranty against manufacturing defects." },
      { q: "Something arrived damaged. What now?", a: "We're sorry! Take a photo and contact us within 48 hours. We'll repair or replace the piece as quickly as possible, free of charge.", link: { label: "Contact us", href: "/contact" } },
    ],
  },
  {
    id: "payment",
    label: "Payment & EMI",
    d: "M3 6h18v12H3zM3 10h18M7 15h3",
    items: [
      { q: "Which payment methods do you accept?", a: "bKash, Nagad, Visa, Mastercard, Amex, bank transfer, and cash on delivery for orders inside Dhaka." },
      { q: "How does 0% EMI work?", a: "Pay in equal monthly instalments over 3, 6, 9 or 12 months with no interest on most bank credit cards. You'll see the monthly amount on every product and at checkout." },
      { q: "Do you have promo codes?", a: "Sign up to our newsletter for a welcome offer, and look out for seasonal sales. Enter any code in your basket before checkout." },
    ],
  },
  {
    id: "products",
    label: "Products & care",
    d: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10",
    items: [
      { q: "Can I see a piece before I buy?", a: "Of course. Visit a showroom to sit on our sofas, feel the fabrics and get free advice from a stylist.", link: { label: "Find a showroom", href: "/contact" } },
      { q: "Can I order fabric swatches?", a: "Yes, choose up to six free fabric swatches and we'll post them to you.", link: { label: "Order swatches", href: "/fabrics" } },
      { q: "Do you make custom sizes?", a: "Many of our sofas, beds and dining tables can be made to your size or in a fabric of your choice. Ask in a showroom or send us a message." },
      { q: "How do I care for solid wood?", a: "Dust with a soft dry cloth, wipe spills straight away, and keep pieces out of direct sunlight and away from heaters. A little furniture wax twice a year keeps the finish rich." },
    ],
  },
  {
    id: "business",
    label: "Trade & business",
    d: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 10h.01M15 10h.01",
    items: [
      { q: "Do you offer trade discounts?", a: "Interior designers, architects and businesses can save up to 25% with a trade account.", link: { label: "Become a trade customer", href: "/trade" } },
      { q: "Can you furnish a whole office or hotel?", a: "Yes. Our interior projects team plans, supplies and installs complete spaces, from apartments to hotels and offices.", link: { label: "Interior project solutions", href: "/interior-projects" } },
    ],
  },
];

const total = CATS.reduce((s, c) => s + c.items.length, 0);

/** Wrap matches of `term` in <mark>. */
function Hi({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>;
  const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === term.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-[#ffe4a8] px-0.5 text-ink">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function FaqExplorer() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(`${CATS[0].id}-0`);
  const term = query.trim();

  const groups = useMemo(() => {
    const t = term.toLowerCase();
    return CATS.filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({ ...c, items: c.items.map((qa, i) => ({ ...qa, key: `${c.id}-${i}` })).filter((qa) => !t || (qa.q + " " + qa.a).toLowerCase().includes(t)) }))
      .filter((c) => c.items.length);
  }, [cat, term]);

  const shown = groups.reduce((s, g) => s + g.items.length, 0);

  return (
    <div>
      {/* Search — overlaps the hero */}
      <div className="relative z-10 mx-auto -mt-9 max-w-2xl">
        <label className="group relative block">
          <span className="sr-only">Search questions</span>
          <svg className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-red" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5L21 21" />
          </svg>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(null);
            }}
            placeholder="Search e.g. delivery, EMI, warranty…"
            className="h-[72px] w-full rounded-full bg-white pl-16 pr-32 text-[17px] text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] outline-none ring-1 ring-black/5 transition-shadow placeholder:text-muted focus:ring-2 focus:ring-ink"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-mist px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-white">
              Clear
            </button>
          ) : (
            <span className="absolute right-7 top-1/2 -translate-y-1/2 text-[13px] text-muted">{total} answers</span>
          )}
        </label>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[13px]">
          <span className="text-muted">Popular:</span>
          {["delivery", "EMI", "return", "warranty", "custom"].map((w) => (
            <button key={w} onClick={() => { setQuery(w); setCat("all"); setOpen(null); }} className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-red hover:decoration-red">
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[72px] z-20 -mx-4 mt-12 border-y border-line bg-[#f6f5f3]/90 px-4 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center">
          {[{ id: "all", label: "All topics", d: "M4 6h16M4 12h16M4 18h10", items: [] as QA[] }, ...CATS].map((c) => {
            const on = cat === c.id;
            const count = c.id === "all" ? total : c.items.length;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCat(c.id);
                  setOpen(null);
                }}
                aria-pressed={on}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[14px] transition-all duration-300 ${
                  on ? "bg-ink text-white shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]" : "text-charcoal hover:bg-white hover:text-ink"
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={on ? "" : "text-red"}>
                  <path d={c.d} />
                </svg>
                {c.label}
                <span className={`rounded-full px-1.5 text-[11px] font-semibold ${on ? "bg-white/20" : "bg-mist text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto mt-12 max-w-4xl">
        {term && (
          <p className="fade-up mb-8 text-center text-[14px] text-muted">
            {shown ? (
              <>
                <span className="font-semibold text-ink">{shown}</span> {shown === 1 ? "answer" : "answers"} for “{term}”
              </>
            ) : null}
          </p>
        )}

        {groups.length === 0 ? (
          <div className="fade-up bg-white px-8 py-14 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mist text-[28px]">?</span>
            <h3 className="mt-5 text-[22px] font-semibold text-ink">No answers for “{term}”</h3>
            <p className="mt-2 text-[15px] text-muted">Try a different word, or ask us directly. We reply within one working day.</p>
            <div className="mt-7 flex justify-center gap-3">
              <button onClick={() => setQuery("")} className="border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-white">
                Clear search
              </button>
              <Link href="/contact" className="bg-red px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-dark">
                Ask us
              </Link>
            </div>
          </div>
        ) : (
          <div key={cat + "|" + term} className="space-y-12">
            {groups.map((g, gi) => (
              <section key={g.id} className="mega-in" style={{ "--delay": `${gi * 80}ms` } as React.CSSProperties}>
                <h2 className="mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-ink">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-red shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={g.d} /></svg>
                  </span>
                  {g.label}
                </h2>
                <ul className="space-y-3">
                  {g.items.map((qa) => {
                    // A narrow search (≤3 hits) opens its answers until the user toggles one.
                    const isOpen = open === qa.key || (!!term && open === null && shown <= 3);
                    return <Item key={qa.key} qa={qa} term={term} open={isOpen} onToggle={() => setOpen(isOpen ? "" : qa.key)} />;
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Item({ qa, term, open, onToggle }: { qa: QA; term: string; open: boolean; onToggle: () => void }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  return (
    <li className={`bg-white transition-shadow duration-500 ${open ? "shadow-[0_25px_50px_-30px_rgba(0,0,0,0.4)]" : "hover:shadow-[0_15px_35px_-30px_rgba(0,0,0,0.4)]"}`}>
      <button onClick={onToggle} aria-expanded={open} className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6">
        <span className={`text-[16px] font-medium transition-colors md:text-[17px] ${open ? "text-red" : "text-ink group-hover:text-red"}`}>
          <Hi text={qa.q} term={term} />
        </span>
        <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${open ? "rotate-180 bg-red text-white" : "bg-mist text-ink group-hover:bg-ink group-hover:text-white"}`}>
          <span className="absolute h-[1.5px] w-3.5 bg-current" />
          <span className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 ${open ? "scale-y-0" : ""}`} />
        </span>
      </button>
      <div inert={!open} className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="mx-6 border-t border-line pb-6 pt-5 md:mx-8">
            <p className="max-w-3xl text-[15px] leading-relaxed text-charcoal md:text-[16px]">
              <Hi text={qa.a} term={term} />
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              {qa.link ? (
                <Link href={qa.link.href} className="group/l inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-red">
                  {qa.link.label}
                  <span aria-hidden className="transition-transform duration-300 group-hover/l:translate-x-1">→</span>
                </Link>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2 text-[13px] text-muted">
                {vote ? (
                  <span className="fade-up text-[#2f8f4e]">Thanks for your feedback!</span>
                ) : (
                  <>
                    Was this helpful?
                    {(["up", "down"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setVote(v)}
                        aria-label={v === "up" ? "Yes" : "No"}
                        className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-all hover:-translate-y-0.5 hover:border-ink"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={v === "down" ? "rotate-180" : ""}>
                          <path d="M7 10v11H3V10zM7 10l4-7a2.5 2.5 0 012.5 3L13 10h6a2 2 0 012 2.3l-1.3 7A2 2 0 0117.7 21H7" />
                        </svg>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
