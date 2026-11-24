import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrackOrder from "../components/TrackOrder";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Track Your Order — Furniture",
  description: "Follow your furniture from our workshop to your door, step by step.",
};

export default function TrackOrderPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3] pb-8">
        <section className="relative isolate overflow-hidden bg-ink">
          <Image
            src={img("1586023492125-27b2c045efd7", 2400)}
            alt="A freshly furnished living room"
            fill
            preload
            sizes="100vw"
            className="kenburns -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
          <div className="mx-auto max-w-[1440px] px-4 pb-40 pt-36 text-center text-white md:px-8 md:pb-48 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center justify-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Track Order</span>
            </nav>
            <p className="fade-up mt-8 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              From our workshop to your door
              <span className="h-px w-10 bg-red" />
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Track your <span className="font-light italic">order</span>
            </h1>
            <p className="fade-up mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Free delivery and installation, followed every step of the way.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <TrackOrder />
        </div>
      </main>
      <Footer />
    </>
  );
}
