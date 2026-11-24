import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import ContactForm, { OpenNow } from "../components/ContactForm";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Contact Us — Furniture",
  description: "Call, chat, email or visit a showroom. We reply to every message within one working day.",
};

// Placeholder contact details — replace with the real ones.
const METHODS = [
  { t: "Call us", v: "16XXX", s: "Every day, 10am – 9pm", href: "tel:16XXX", d: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" },
  { t: "WhatsApp", v: "+880 1XXX-XXXXXX", s: "Replies in minutes", href: "#", d: "M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z" },
  { t: "Email", v: "hello@furniture.example", s: "Answered within 1 working day", href: "mailto:hello@furniture.example", d: "M4 5h16v14H4zM4 6l8 7 8-7" },
  { t: "Live chat", v: "Chat with a stylist", s: "Product & design advice", href: "#", d: "M4 5h16v11H8l-4 4z" },
];

const SHOWROOMS = [
  { city: "Dhaka", name: "Gulshan Flagship", addr: "House 12, Road 45, Gulshan 2, Dhaka 1212", phone: "+880 2-XXXX-XXXX", img: "1600210492486-724fe5c67fb0", tag: "Flagship" },
  { city: "Dhaka", name: "Dhanmondi Studio", addr: "Plot 7, Road 27, Dhanmondi, Dhaka 1209", phone: "+880 2-XXXX-XXXX", img: "1586023492125-27b2c045efd7" },
  { city: "Chattogram", name: "GEC Circle", addr: "1/A CDA Avenue, GEC Circle, Chattogram 4000", phone: "+880 31-XXX-XXXX", img: "1618220179428-22790b461013" },
];

const FAQ = [
  { q: "How long does delivery take?", a: "Most pieces arrive in 3–7 working days. Made-to-order items take 2–4 weeks, and we'll confirm the date when we call you." },
  { q: "Is installation really free?", a: "Yes. Our crew delivers, assembles and places every piece in your room, then takes the packaging away, at no extra cost." },
  { q: "Can I return something?", a: "Unused items can be returned within 7 days. Call us or send a message above with your order number and we'll arrange a pick-up." },
  { q: "Do you offer EMI?", a: "0% EMI is available for 3 to 12 months on most bank cards. You'll see the monthly amount on every product page and at checkout." },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1524758631624-e2822e304c36", 2400)} alt="Our design studio" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="mx-auto max-w-[1440px] px-4 pb-36 pt-36 text-white md:px-8 md:pb-44 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Contact Us</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              We&apos;re here to help
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Let&apos;s <span className="font-light italic">talk</span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              A question about an order, a piece you love, or the room you&apos;re dreaming of. Real people, quick answers.
            </p>
            <div className="fade-up mt-7" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <OpenNow />
            </div>
          </div>
        </section>

        {/* CONTACT METHODS — overlap the hero */}
        <section className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-4 md:-mt-28 md:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METHODS.map((m, i) => (
              <li key={m.t} className="fade-up" style={{ "--delay": `${450 + i * 90}ms` } as React.CSSProperties}>
                <a
                  href={m.href}
                  className="group relative flex h-full flex-col overflow-hidden bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_35px_60px_-30px_rgba(0,0,0,0.5)] md:p-7"
                >
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-ink transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-red group-hover:text-white">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
                  </span>
                  <span className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{m.t}</span>
                  <span className="mt-1.5 break-all text-[18px] font-semibold text-ink transition-colors group-hover:text-red">{m.v}</span>
                  <span className="mt-1 text-[14px] text-muted">{m.s}</span>
                  <span aria-hidden className="absolute right-6 top-7 text-[18px] text-muted opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red group-hover:opacity-100">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* FORM + SIDEBAR */}
        <section className="mx-auto grid max-w-[1440px] items-start gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.35fr_1fr] xl:gap-16">
          <Reveal>
            <div className="bg-white p-6 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.5)] md:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Send a message</p>
              <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight text-ink">How can we help?</h2>
              <p className="mt-2 text-[15px] text-muted">Pick a topic so the right person picks it up first.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Hours */}
            <Reveal>
              <div className="relative overflow-hidden bg-ink p-7 text-white md:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.05]" />
                <div className="relative flex items-center justify-between gap-4">
                  <h3 className="text-[20px] font-semibold">Opening hours</h3>
                  <OpenNow />
                </div>
                <dl className="relative mt-6 space-y-3 text-[15px]">
                  {[
                    ["Saturday – Thursday", "10am – 9pm"],
                    ["Friday", "3pm – 9pm"],
                    ["Hotline & WhatsApp", "Every day, 10am – 9pm"],
                  ].map(([d, h]) => (
                    <div key={d} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <dt className="text-white/70">{d}</dt>
                      <dd className="font-medium">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Quick links */}
            <Reveal>
              <div className="bg-white p-7 md:p-8">
                <h3 className="text-[18px] font-semibold text-ink">Quick answers</h3>
                <ul className="mt-4 divide-y divide-line">
                  {[
                    { t: "Track your order", h: "/track-order" },
                    { t: "Your account & orders", h: "/account" },
                    { t: "Trade & business enquiries", h: "/trade" },
                    { t: "Book an interior consultation", h: "/interior-projects" },
                  ].map((l) => (
                    <li key={l.t}>
                      <Link href={l.h} className="group flex items-center justify-between py-3.5 text-[15px] text-ink transition-colors hover:text-red">
                        {l.t}
                        <span aria-hidden className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-red">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Social */}
            <Reveal>
              <div className="flex items-center justify-between gap-4 bg-white p-7 md:p-8">
                <p className="text-[15px] font-medium text-ink">Follow our homes</p>
                <div className="flex gap-2">
                  {[
                    { n: "Facebook", d: "M14 8h2.5V4.5H14A3.5 3.5 0 0010.5 8v2H8v3.5h2.5V21H14v-7.5h2.5L17 10h-3V8.5c0-.3.2-.5.5-.5z" },
                    { n: "Instagram", d: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 16a4 4 0 100-8 4 4 0 000 8zM17.5 6.5h.01" },
                    { n: "YouTube", d: "M3 8.5A3 3 0 015.8 5.6C7.6 5.4 9.8 5.3 12 5.3s4.4.1 6.2.3A3 3 0 0121 8.5v7a3 3 0 01-2.8 2.9c-1.8.2-4 .3-6.2.3s-4.4-.1-6.2-.3A3 3 0 013 15.5zM10 9.5v5l4.5-2.5z" },
                  ].map((s) => (
                    <a key={s.n} href="#" aria-label={s.n} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-red hover:bg-red hover:text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.d} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SHOWROOMS */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Visit us</p>
                  <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">Sit on it before you buy it</h2>
                  <p className="mt-3 max-w-xl text-[16px] text-muted">Feel the fabrics, test the sofas and get free advice from our stylists at a showroom near you.</p>
                </div>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {SHOWROOMS.map((s, i) => (
                <Reveal key={s.name} delay={i * 100}>
                  <article className="group h-full bg-[#f6f5f3]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={img(s.img, 900)} alt={`${s.name} showroom`} fill sizes="(min-width:768px) 32vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                      <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{s.city}</span>
                      {s.tag && <span className="absolute right-4 top-4 bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">{s.tag}</span>}
                    </div>
                    <div className="p-6 md:p-7">
                      <h3 className="text-[20px] font-semibold text-ink">{s.name}</h3>
                      <p className="mt-3 flex gap-3 text-[14px] leading-relaxed text-charcoal">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-0.5 shrink-0 text-red"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /></svg>
                        {s.addr}
                      </p>
                      <p className="mt-2 flex gap-3 text-[14px] text-charcoal">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-0.5 shrink-0 text-red"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
                        {s.phone}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.addr)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-red hover:text-red"
                      >
                        Get directions <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-red">Before you write</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight text-ink">Frequently asked</h2>
            <p className="mt-3 max-w-sm text-[16px] text-muted">The answers people look for most. Can&apos;t find yours? Send us a message above.</p>
            <Link href="/faq" className="group mt-6 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-red hover:text-red">
              See all FAQs <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <Reveal>
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map((f) => (
                <details key={f.q} className="faq group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink transition-colors hover:text-red [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 group-open:border-red group-open:bg-red group-open:text-white">
                      <span className="text-[20px] font-light leading-none">+</span>
                    </span>
                  </summary>
                  <p className="faq-body pb-6 pr-14 text-[15px] leading-relaxed text-charcoal">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
