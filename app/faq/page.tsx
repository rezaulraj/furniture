import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FaqExplorer from "../components/FaqExplorer";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "FAQ — Furniture",
  description: "Answers about orders, delivery and installation, returns, warranty, EMI and caring for your furniture.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        <section className="relative isolate overflow-hidden bg-ink">
          <Image src={img("1618220179428-22790b461013", 2400)} alt="A calm, sunlit living room" fill preload sizes="100vw" className="kenburns -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-36 text-center text-white md:px-8 md:pb-32 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center justify-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </nav>
            <p className="fade-up mt-8 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Help centre
              <span className="h-px w-10 bg-red" />
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              How can we <span className="font-light italic">help?</span>
            </h1>
            <p className="fade-up mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Quick answers about orders, delivery, returns and caring for your furniture.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <FaqExplorer />
        </div>

        {/* Still need help */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <div className="relative overflow-hidden bg-ink px-6 py-14 text-center text-white md:px-16 md:py-20">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
            <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-red/15" />
            <div className="relative">
              <div className="mx-auto flex w-fit -space-x-3">
                {["1555041469-a586c61ea9bc", "1505693416388-ac5ce068fe85", "1586023492125-27b2c045efd7"].map((id) => (
                  <span key={id} className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-ink">
                    <Image src={img(id, 120)} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                ))}
              </div>
              <h2 className="mt-7 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-tight">Still need help?</h2>
              <p className="mx-auto mt-3 max-w-lg text-[16px] text-white/70">Our team is on hand every day from 10am to 9pm. Real people, quick answers.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="group relative overflow-hidden bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-dark">
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
                  Contact us
                </Link>
                <a href="tel:16XXX" className="border border-white/40 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink">
                  Call 16XXX
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
