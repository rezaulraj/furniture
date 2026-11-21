"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FEATURED, MEGA, roomHref, slugify } from "./menuData";
import { subHref } from "./catalog";
import SearchOverlay from "./SearchOverlay";

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;


const NAV = ["Living Room", "Bedroom", "Dining", "Kitchen", "Kid's Room", "SmartFit", "Institutional", "Door", "Interior", "Office"];
// Shown in the main row only on very wide screens; otherwise they move into "More".
const WIDE_ONLY: string[] = [];
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
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  // Mega menu: which item is shown, and whether the panel is open.
  // `menuName` is kept while closing so the content fades out instead of vanishing.
  const [menuName, setMenuName] = useState<string>(NAV[0]);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileItem, setMobileItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuName(name);
    setMegaOpen(true);
  };
  // Small delay so moving the mouse diagonally into the panel doesn't close it.
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

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
  const linkCls = `nav-link relative block whitespace-nowrap py-3 font-medium tracking-[0.015em] transition-[color,text-shadow,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] after:absolute after:left-1/2 after:bottom-1 after:h-[2px] after:w-8 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(.22,1,.36,1)] hover:after:scale-x-100 ${
    solid
      ? "text-charcoal/90 [text-shadow:none] hover:text-ink"
      : "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] hover:opacity-85"
  }`;

  return (
    <>
    <div
      className="fixed inset-x-0 top-0 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        closeMega();
      }}
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
          className={`relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 px-4 transition-[height] duration-500 md:px-8 xl:grid-cols-[auto_1fr_auto] 2xl:grid-cols-[1fr_auto_1fr] ${
            scrolled ? "h-[72px]" : "h-[84px]"
          }`}
        >
          {/* Left: logo */}
          <div className="flex items-center gap-4" onMouseEnter={closeMega}>
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
              className="shrink-0 bg-red px-3 pb-1 pt-1.5 text-[26px] font-extrabold uppercase leading-none tracking-[0.04em] text-white transition-transform duration-300 hover:scale-[1.03] md:text-[28px] 2xl:text-[32px]"
            >
              Furniture
            </Link>
          </div>

          {/* Center: categories */}
          <nav className="hidden justify-center xl:flex">
            <ul className="flex items-center gap-[18px] text-[16px] 2xl:gap-8">
              {NAV.map((n) => (
                <li
                  key={n}
                  className={WIDE_ONLY.includes(n) ? "hidden 2xl:block" : ""}
                  onMouseEnter={() => (MEGA[n] ? openMega(n) : closeMega())}
                >
                  <Link
                    href={MEGA[n] ? roomHref(n) : "#"}
                    onClick={() => setMegaOpen(false)}
                    className={`${linkCls} ${megaOpen && menuName === n ? "after:scale-x-100 !text-ink" : ""}`}
                  >
                    {n}
                  </Link>
                </li>
              ))}
              <li className="group/more relative" onMouseEnter={closeMega}>
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
            onMouseEnter={closeMega}
            className={`flex items-center justify-self-end gap-6 transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              solid ? "text-charcoal" : "text-white"
            }`}
          >
            {/* Search — thin outline */}
            <button
              aria-label="Search"
              onClick={() => {
                setSearchOpen(true);
                setMegaOpen(false);
              }}
              className="transition-all duration-300 hover:scale-110 hover:text-red"
            >
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

        {/* Desktop mega menu (HATIL style) */}
        <div
          onMouseEnter={() => openMega(menuName)}
          className={`absolute inset-x-0 top-full hidden origin-top border-t border-line bg-white shadow-[0_24px_40px_-20px_rgba(0,0,0,0.25)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] xl:block ${
            megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
          }`}
        >
          {MEGA[menuName] && (
            <div
              key={menuName}
              className="mx-auto grid max-h-[calc(100vh-90px)] max-w-[1600px] grid-cols-[minmax(0,1fr)_420px] gap-10 overflow-y-auto px-8 pb-9 pt-7 2xl:grid-cols-[minmax(0,1fr)_560px] 2xl:gap-16"
            >
              {/* Left: sub-category columns (compact) */}
              <div className="grid grid-cols-4 gap-x-8 self-start">
              {MEGA[menuName].columns.map((col, ci) => (
                <div
                  key={ci}
                  className="mega-in space-y-5"
                  style={{ "--delay": `${ci * 50}ms` } as React.CSSProperties}
                >
                  {col.map((grp) => (
                    <div key={grp.title}>
                      <Link
                        href={grp.links.length ? `${roomHref(menuName)}#${slugify(grp.title)}` : subHref(menuName, grp.title)}
                        onClick={() => setMegaOpen(false)}
                        className="group/t inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:text-red"
                      >
                        {grp.title}
                        {grp.links.length > 0 && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            className="transition-transform duration-300 group-hover/t:translate-x-1"
                          >
                            <path d="M4 12h15M13 6l6 6-6 6" />
                          </svg>
                        )}
                      </Link>
                      {grp.links.length > 0 && (
                        <ul className="mt-2 space-y-[9px]">
                          {grp.links.map((l) => (
                            <li key={l}>
                              <Link
                                href={subHref(menuName, l)}
                                onClick={() => setMegaOpen(false)}
                                className="inline-block text-[15px] text-[#555] transition-all duration-300 ease-out hover:translate-x-1 hover:text-red"
                              >
                                {l}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              </div>

              {/* Right: product previews */}
              {FEATURED[menuName] && (
                <div
                  className="mega-in border-l border-line pl-8 2xl:pl-14"
                  style={{ "--delay": "160ms" } as React.CSSProperties}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Featured in {menuName}
                    </p>
                    <Link
                      href={roomHref(menuName)}
                      onClick={() => setMegaOpen(false)}
                      className="link-line text-[13px] font-medium text-ink hover:text-red"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {FEATURED[menuName].map((f) => (
                      <a key={f.name} href="#" className="group/p block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                          <Image
                            src={img(f.img)}
                            alt={f.name}
                            fill
                            sizes="280px"
                            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover/p:scale-[1.07]"
                          />
                          {f.tag && (
                            <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
                              {f.tag}
                            </span>
                          )}
                          <span className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 bg-white py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/p:translate-y-0 group-hover/p:opacity-100">
                            Shop now <span aria-hidden>→</span>
                          </span>
                        </div>
                        <p className="mt-3 text-[15px] font-medium text-ink transition-colors duration-300 group-hover/p:text-red">
                          {f.name}
                        </p>
                        <p className="mt-0.5 text-[13px] text-muted">
                          Starts from <span className="font-semibold text-ink">৳{f.price}</span>
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu (accordion with sub-categories) */}
        <div
          className={`relative overflow-hidden bg-white transition-[max-height] duration-500 xl:hidden ${
            open ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
          }`}
        >
          <ul className="border-t border-line px-4 py-2">
            {[...NAV, ...MORE].map((n) => {
              const m = MEGA[n];
              const isOpen = mobileItem === n;
              return (
                <li key={n} className="border-b border-line">
                  {m ? (
                    <button
                      onClick={() => setMobileItem(isOpen ? null : n)}
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-ink"
                    >
                      {n}
                      <span className={`text-2xl font-light text-red transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                  ) : (
                    <a href="#" className="block py-4 text-lg font-medium text-ink transition-colors hover:text-red">
                      {n}
                    </a>
                  )}
                  {m && (
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                        isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-x-5 gap-y-6 overflow-hidden">
                        {m.columns.flat().map((g) => (
                          <div key={g.title}>
                            <p className="mb-2 border-b border-line pb-2 text-[15px] font-medium text-charcoal">{g.title}</p>
                            <ul className="space-y-2">
                              {g.links.map((l) => (
                                <li key={l}>
                                  <Link href={subHref(n, l)} onClick={() => setOpen(false)} className="text-[14px] text-muted hover:text-red">{l}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
    <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
