"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

const COPY = {
  login: {
    img: "1618220179428-22790b461013",
    quote: "“Our living room finally feels like us. The sofa is beautiful and the delivery team was wonderful.”",
    who: "Nusrat J. — Dhaka",
  },
  signup: {
    img: "1616486338812-3dadae4b4ace",
    quote: "“Creating an account made it so easy to save ideas and track our order from start to finish.”",
    who: "Rafiq & Mitu — Chattogram",
  },
};

const PERKS = ["Save favourites to your wishlist", "Track orders and deliveries", "Members-only offers & early sale access"];

export default function AuthAside() {
  const mode = usePathname()?.startsWith("/signup") ? "signup" : "login";

  return (
    <aside className="relative hidden overflow-hidden bg-charcoal lg:block">
      {/* Both photos stay mounted and crossfade when switching tabs */}
      {(["login", "signup"] as const).map((k) => (
        <div
          key={k}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            mode === k ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={img(COPY[k].img)} alt="" fill preload={k === "login"} sizes="55vw" className="kenburns object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
        <Link
          href="/"
          className="self-start bg-red px-3 pb-1 pt-1.5 text-[28px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Furniture
        </Link>

        <div key={mode} className="max-w-lg">
          <svg width="40" height="30" viewBox="0 0 40 30" fill="var(--red)" className="fade-up" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <path d="M0 30V17C0 7.6 5.2 1.9 15.6 0l1.6 4.4C11 6.3 8.2 9.6 8 14h8v16H0zm22.8 0V17c0-9.4 5.2-15.1 15.6-17L40 4.4c-6.2 1.9-9 5.2-9.2 9.6h8V30H22.8z" />
          </svg>
          <p
            className="fade-up mt-6 text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-snug"
            style={{ "--delay": "220ms" } as React.CSSProperties}
          >
            {COPY[mode].quote}
          </p>
          <p className="fade-up mt-4 text-[14px] text-white/70" style={{ "--delay": "340ms" } as React.CSSProperties}>
            {COPY[mode].who}
          </p>

          <ul className="mt-10 space-y-3 border-t border-white/20 pt-8">
            {PERKS.map((p, i) => (
              <li
                key={p}
                className="fade-up flex items-center gap-3 text-[15px] text-white/90"
                style={{ "--delay": `${460 + i * 110}ms` } as React.CSSProperties}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
