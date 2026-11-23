import Link from "next/link";
import AuthAside from "../components/auth/AuthAside";
import AuthTabs from "../components/auth/AuthTabs";

// Shared shell for /login and /signup. Because this layout persists between the two
// routes, the photo side stays put and only the form animates when switching.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[100svh] bg-white lg:grid-cols-[1.05fr_1fr]">
      <AuthAside />

      <main className="relative flex flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="bg-red px-2.5 pb-0.5 pt-1 text-[20px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-transform duration-300 hover:scale-[1.03] lg:invisible"
          >
            Furniture
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to shop
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[440px]">
            <AuthTabs />
            {children}
          </div>
        </div>

        <p className="text-center text-[12px] text-muted">
          © 2026 Furniture · <a href="#" className="hover:text-ink">Privacy</a> · <a href="#" className="hover:text-ink">Terms</a>
        </p>
      </main>
    </div>
  );
}
