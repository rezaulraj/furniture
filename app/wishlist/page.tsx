import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WishlistGrid, { WishCount } from "../components/WishlistGrid";
import { img } from "../components/catalog";

export const metadata: Metadata = {
  title: "My Wishlist — Furniture",
  description: "The pieces you've saved, all in one place.",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="bg-[#fafafa]">
        {/* HERO: full-bleed room photo, slow zoom, floating "saved" collage */}
        <section className="relative isolate overflow-hidden bg-ink">
          <Image
            src={img("1618220179428-22790b461013", 2400)}
            alt="A calm, sunlit living room"
            fill
            preload
            sizes="100vw"
            className="kenburns -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="mx-auto grid min-h-[480px] max-w-[1440px] items-end gap-10 px-4 pb-14 pt-36 md:min-h-[560px] md:px-8 md:pb-20 lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="text-white">
              <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-white/70" style={{ "--delay": "50ms" } as React.CSSProperties}>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Wishlist</span>
              </nav>
              <p className="fade-up mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/85" style={{ "--delay": "150ms" } as React.CSSProperties}>
                <span className="h-px w-10 bg-red" />
                Saved for later
              </p>
              <h1 className="fade-up mt-4 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
                My <span className="italic font-light">Wishlist</span>
              </h1>
              <p className="fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]" style={{ "--delay": "350ms" } as React.CSSProperties}>
                Everything you&apos;ve fallen for, in one place. Compare, share with family, or bring it home when you&apos;re ready.
              </p>
              <div className="fade-up mt-8 flex flex-wrap items-center gap-4" style={{ "--delay": "450ms" } as React.CSSProperties}>
                <WishCount />
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white"
                >
                  Keep browsing
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Floating collage (desktop) */}
            <div className="relative hidden h-[380px] lg:block" aria-hidden>
              <div className="fade-up absolute right-0 top-0 w-[240px]" style={{ "--delay": "400ms" } as React.CSSProperties}>
                <div className="float-slow rotate-[4deg] bg-white p-2.5 pb-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={img("1555041469-a586c61ea9bc", 600)} alt="" fill sizes="240px" className="object-cover" />
                  </div>
                  <p className="mt-2.5 text-center text-[13px] font-medium text-ink">The sofa</p>
                </div>
              </div>
              <div className="fade-up absolute bottom-0 left-0 w-[210px]" style={{ "--delay": "550ms" } as React.CSSProperties}>
                <div className="float-slow rotate-[-5deg] bg-white p-2.5 pb-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] [animation-delay:-3s]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={img("1505693416388-ac5ce068fe85", 600)} alt="" fill sizes="210px" className="object-cover" />
                  </div>
                  <p className="mt-2.5 text-center text-[13px] font-medium text-ink">The bedroom</p>
                </div>
              </div>
              <span className="fade-up absolute left-[46%] top-[38%] z-10 grid h-16 w-16 place-items-center rounded-full bg-red text-white shadow-[0_15px_35px_-8px_rgba(200,16,46,0.8)]" style={{ "--delay": "750ms" } as React.CSSProperties}>
                <span className="heart-beat">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" /></svg>
                </span>
              </span>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
          <WishlistGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
