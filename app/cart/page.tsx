import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartView from "../components/CartView";

export const metadata: Metadata = {
  title: "Your Basket — Furniture",
  description: "Review your basket, apply a promo code and check out securely.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <Header solid />
      <main className="bg-[#fafafa]">
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-32 md:px-8 md:pb-12 md:pt-36">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-muted" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="hover:text-red">Home</Link>
              <span>/</span>
              <span className="text-ink">Basket</span>
            </nav>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <h1 className="fade-up text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.02em] text-ink" style={{ "--delay": "150ms" } as React.CSSProperties}>
                Your Basket
              </h1>
              <ol className="fade-up flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
                {["Basket", "Checkout", "Done"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    {i > 0 && <span className="h-px w-8 bg-line" />}
                    <span className={`flex items-center gap-2 ${i === 0 ? "text-ink" : "text-muted"}`}>
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${i === 0 ? "bg-red text-white" : "border border-line"}`}>{i + 1}</span>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
          <CartView />
        </section>
      </main>
      <Footer />
    </>
  );
}
