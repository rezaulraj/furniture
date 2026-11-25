import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutView from "../components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout — Furniture",
  description: "Enter your details, choose a delivery slot and pay securely.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header solid />
      <main className="group/co bg-[#f6f5f3]">
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-32 md:px-8 md:pb-12 md:pt-36">
            <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-[13px] text-muted" style={{ "--delay": "50ms" } as React.CSSProperties}>
              <Link href="/" className="hover:text-red">Home</Link>
              <span>/</span>
              <Link href="/cart" className="hover:text-red">Basket</Link>
              <span>/</span>
              <span className="text-ink">Checkout</span>
            </nav>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <h1 className="fade-up text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.02em] text-ink" style={{ "--delay": "150ms" } as React.CSSProperties}>
                Checkout
              </h1>
              <ol className="fade-up flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ "--delay": "250ms" } as React.CSSProperties}>
                {/* Steps flip to "Done" once the confirmation (data-order-done) is on screen. */}
                <li className="flex items-center gap-2 text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2f8f4e] text-[11px] text-white">✓</span>
                  Basket
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-px w-8 bg-ink" />
                  <span className="flex items-center gap-2 text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-red text-[11px] text-white transition-colors duration-500 group-has-[[data-order-done]]/co:bg-[#2f8f4e]">
                      <span className="group-has-[[data-order-done]]/co:hidden">2</span>
                      <span className="hidden group-has-[[data-order-done]]/co:inline">✓</span>
                    </span>
                    Checkout
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-px w-8 bg-line transition-colors duration-500 group-has-[[data-order-done]]/co:bg-ink" />
                  <span className="flex items-center gap-2 text-muted transition-colors duration-500 group-has-[[data-order-done]]/co:text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-line text-[11px] transition-colors duration-500 group-has-[[data-order-done]]/co:border-red group-has-[[data-order-done]]/co:bg-red group-has-[[data-order-done]]/co:text-white">3</span>
                    Done
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
          <CheckoutView />
        </section>
      </main>
      <Footer />
    </>
  );
}
