"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = ["Living Room", "Bedroom", "Dining", "Kitchen", "Kid's Room", "SmartFit", "Institutional", "Door", "Interior", "Office"];
// Shown in the main row only on very wide screens; otherwise they move into "More".
const WIDE_ONLY = ["Door", "Interior"];
const MORE = ["Outdoor", "Lighting", "Decor", "Kitchen Accessories", "Inspiration"];

const Caret = ({ className = "" }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 8h16l-8 9z" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open || hovered;

  // HATIL-style link: semibold white over the photo, regular dark on white,
  // short underline that grows from the centre on hover.
  // One constant weight in both states, so words never change width or jump;
  // only colour and shadow animate, in step with the white background.
  const linkCls = `nav-link relative block whitespace-nowrap py-3 font-semibold tracking-[0.015em] transition-[color,text-shadow,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-8 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(.22,1,.36,1)] hover:after:scale-x-100 ${
    solid
      ? "text-charcoal/90 [text-shadow:none] hover:text-ink"
      : "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] hover:opacity-85"
  }`;

  return (
    <div
      className="fixed inset-x-0 top-0 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <header className="relative">
        {/* Soft dark fade over the hero so white text reads well */}
        <div
          className={`pointer-events-none absolute inset-0 h-[140%] bg-gradient-to-b from-black/50 via-black/20 to-transparent transition-opacity duration-500 ${
            solid ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* White background that slides & fades in on hover / scroll */}
        <div
          className={`pointer-events-none absolute inset-0 origin-top bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            solid ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        />

        <div
          className={`relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 px-4 transition-[height] duration-500 md:px-8 xl:grid-cols-[1fr_auto_1fr] ${
            scrolled ? "h-[72px]" : "h-[84px]"
          }`}
        >
          {/* Left: logo */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Menu"
              className={`transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] xl:hidden ${solid ? "text-ink" : "text-white"}`}
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
            <Link
              href="/"
              aria-label="Furniture home"
              className="shrink-0 bg-red px-3 pb-1 pt-1.5 text-[26px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-transform duration-300 hover:scale-[1.03] md:text-[32px]"
            >
              Furniture
            </Link>
          </div>

          {/* Center: categories */}
          <nav className="hidden justify-center xl:flex">
            <ul className="flex items-center gap-7 text-[15px] 2xl:gap-8 2xl:text-[16px]">
              {NAV.map((n) => (
                <li key={n} className={WIDE_ONLY.includes(n) ? "hidden 2xl:block" : ""}>
                  <a href="#" className={linkCls}>
                    {n}
                  </a>
                </li>
              ))}
              <li className="group/more relative">
                <button className={`${linkCls} flex items-center gap-1`}>
                  More
                  <Caret className="transition-transform duration-300 group-hover/more:rotate-180" />
                </button>
                <div className="invisible absolute right-0 top-full w-56 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover/more:visible group-hover/more:translate-y-0 group-hover/more:opacity-100">
                  <ul className="border-t-2 border-red bg-white py-2 text-[15px] text-ink shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]">
                    {[...WIDE_ONLY, ...MORE].map((m) => (
                      <li key={m} className={WIDE_ONLY.includes(m) ? "2xl:hidden" : ""}>
                        <a href="#" className="block px-5 py-2.5 transition-all duration-300 hover:bg-mist hover:pl-7 hover:text-red">
                          {m}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          {/* Right: search, cart, account */}
          <div
            className={`flex items-center justify-self-end gap-6 transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              solid ? "text-charcoal" : "text-white"
            }`}
          >
            {/* Search — thin outline */}
            <button aria-label="Search" className="transition-all duration-300 hover:scale-110 hover:text-red">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="10" cy="10" r="7" />
                <path d="M15.2 15.2L21 21" />
              </svg>
            </button>
            {/* Account — solid person */}
            <button aria-label="Account" className="hidden transition-all duration-300 hover:scale-110 hover:text-red sm:block">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="7" r="5" />
                <path d="M2.5 23c0-5.5 4.3-9.5 9.5-9.5s9.5 4 9.5 9.5z" />
              </svg>
            </button>
            {/* Bag — solid shopping bag with handle */}
            <button aria-label="Bag" className="transition-all duration-300 hover:scale-110 hover:text-red">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 8V6.5a4 4 0 018 0V8h-1.8V6.5a2.2 2.2 0 00-4.4 0V8z" />
                <path d="M4.2 8h15.6l1 15H3.2zM8.9 10.6a.9.9 0 100 1.8.9.9 0 000-1.8zm6.2 0a.9.9 0 100 1.8.9.9 0 000-1.8z" fillRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`relative overflow-hidden bg-white transition-[max-height] duration-500 xl:hidden ${
            open ? "max-h-[75vh] overflow-y-auto" : "max-h-0"
          }`}
        >
          <ul className="border-t border-line px-4 py-2">
            {[...NAV, ...MORE].map((n) => (
              <li key={n}>
                <a href="#" className="block border-b border-line py-4 text-lg font-medium text-ink transition-colors hover:text-red">
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}
