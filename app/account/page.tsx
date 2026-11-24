import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountDashboard from "../components/AccountDashboard";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "Your Account — Furniture",
  description: "Track orders, manage addresses and see your wishlist and reward points.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f6f5f3]">
        <section className="relative isolate overflow-hidden bg-ink">
          <Image
            src={img("1600210492486-724fe5c67fb0", 2400)}
            alt="A bright, welcoming living room"
            fill
            preload
            sizes="100vw"
            className="kenburns -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
          <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-36 text-white md:px-8 md:pb-24 md:pt-44">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Your Account</span>
            </nav>
            <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-red" />
              Members area
            </p>
            <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
              Your <span className="font-light italic">Account</span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
              Orders, deliveries, saved pieces and rewards. Everything about your home with us, in one calm place.
            </p>
          </div>
        </section>
        <section className="relative mx-auto max-w-[1440px] px-4 pb-8 pt-10 md:px-8 md:pt-14">
          <AccountDashboard />
        </section>
      </main>
      <Footer />
    </>
  );
}
