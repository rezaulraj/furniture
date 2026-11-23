"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Login / Sign up switch with a sliding pill. Lives in the shared layout,
// so the pill animates instead of jumping when the route changes.
export default function AuthTabs() {
  const signup = usePathname()?.startsWith("/signup");

  return (
    <div className="relative mb-10 grid grid-cols-2 rounded-full bg-mist p-1">
      <span
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          signup ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {[
        { href: "/login", label: "Log in", on: !signup },
        { href: "/signup", label: "Sign up", on: !!signup },
      ].map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.on ? "page" : undefined}
          className={`relative z-10 py-2.5 text-center text-[14px] font-semibold transition-colors duration-500 ${
            t.on ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
