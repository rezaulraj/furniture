import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LegalDoc from "../components/LegalDoc";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Terms & Privacy — Furniture",
  description: "Our terms of use and privacy policy, written in plain language.",
};

const PROMISES = [
  { t: "We never sell your data", d: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6zM9 12l2 2 4-4" },
  { t: "Secure, encrypted payments", d: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4" },
  { t: "Plain-language summaries", d: "M4 5h16v11H8l-4 4z" },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3] pb-8">
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1524758631624-e2822e304c36", 2400)} alt="" fill preload sizes="100vw" className="kenburns -z-10 object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-36 text-center text-white md:px-8 md:pb-28 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center justify-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Terms &amp; Privacy</span>
            </nav>
            <p className="fade-up mt-8 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Legal
              <span className="h-px w-10 bg-red" />
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Terms <span className="font-light italic">&amp;</span> Privacy
            </h1>
            <p className="fade-up mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              The fine print, made clear. Every section starts with a short, plain-language summary.
            </p>
            <ul className="fade-up mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
              {PROMISES.map((p) => (
                <li key={p.t} className="flex items-center gap-2.5 text-[14px] text-white/85">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-[#7fd49b]"><path d={p.d} /></svg>
                  {p.t}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <LegalDoc />
        </div>
      </main>
      <Footer />
    </>
  );
}
