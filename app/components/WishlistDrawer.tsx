"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { img, taka } from "./catalog";
import { clearWishlist, onWishAdded, removeWish, useHydrated, useWishlist, WISH_OPEN_EVENT, type WishItem } from "./wishlist";

export const HeartIcon = ({ filled = false, size = 20, stroke = 1.6, className = "" }: { filled?: boolean; size?: number; stroke?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" className={className}>
    <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
  </svg>
);

/** Header heart: live count badge, bounces when something is saved, opens the drawer. */
export default function WishlistButton() {
  const list = useWishlist();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<WishItem | null>(null);
  const mounted = useHydrated();

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(WISH_OPEN_EVENT, show);
    const off = onWishAdded((item) => {
      setBump((b) => b + 1);
      setToast(item);
    });
    return () => {
      window.removeEventListener(WISH_OPEN_EVENT, show);
      off();
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const count = list.length;

  return (
    <>
      <button
        aria-label={`Wishlist (${count} saved)`}
        onClick={() => setOpen(true)}
        className="relative transition-all duration-300 hover:scale-110 hover:text-red"
      >
        <span key={`icon-${bump}`} className={`block ${bump ? "wish-bump" : ""}`}>
          <HeartIcon filled={count > 0} size={21} stroke={1.6} />
        </span>
        {count > 0 && (
          <span
            key={`count-${count}`}
            className="wish-badge absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-white shadow-[0_0_0_2px_white]"
          >
            {count}
          </span>
        )}
      </button>
      {mounted &&
        createPortal(
          <>
            <Drawer open={open} onClose={() => setOpen(false)} list={list} />
            <Toast
              item={toast}
              onView={() => {
                setToast(null);
                setOpen(true);
              }}
              onClose={() => setToast(null)}
            />
          </>,
          document.body,
        )}
    </>
  );
}

function Drawer({ open, onClose, list }: { open: boolean; onClose: () => void; list: WishItem[] }) {
  const [leaving, setLeaving] = useState<string[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      setConfirmClear(false);
    };
  }, [open, onClose]);

  // Let the row fold away before it leaves the list.
  const remove = (href: string) => {
    setLeaving((l) => [...l, href]);
    setTimeout(() => {
      removeWish(href);
      setLeaving((l) => l.filter((h) => h !== href));
    }, 380);
  };

  const total = list.reduce((s, i) => s + i.price, 0);
  const saved = list.reduce((s, i) => s + (i.oldPrice ? i.oldPrice - i.price : 0), 0);

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your wishlist"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Head */}
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-rose text-red">
              <HeartIcon filled size={18} />
            </span>
            <div>
              <h2 className="text-[20px] font-semibold leading-none text-ink">Your wishlist</h2>
              <p className="mt-1 text-[13px] text-muted">
                {list.length} {list.length === 1 ? "piece" : "pieces"} saved
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close wishlist"
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-all duration-300 hover:rotate-90 hover:bg-mist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {list.length === 0 ? (
          <EmptyState onClose={onClose} play={open} />
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-6">
              {list.map((item, i) => (
                <li
                  key={item.href}
                  className={`grid transition-all duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    leaving.includes(item.href) ? "grid-rows-[0fr] translate-x-8 opacity-0" : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`${open ? "wish-row" : "opacity-0"} group flex gap-4 border-b border-line py-5`}
                      style={{ "--delay": `${120 + Math.min(i, 8) * 60}ms` } as React.CSSProperties}
                    >
                      <Link href={item.href} onClick={onClose} className="relative h-[112px] w-[92px] shrink-0 overflow-hidden bg-mist">
                        <Image src={img(item.img, 300)} alt={item.name} fill sizes="92px" className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" />
                        <Image src={img(item.img2, 300)} alt="" fill sizes="92px" className="scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
                        {item.oldPrice && (
                          <span className="absolute left-1.5 top-1.5 bg-red px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            -{Math.round((1 - item.price / item.oldPrice) * 100)}%
                          </span>
                        )}
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{item.material}</p>
                            <Link href={item.href} onClick={onClose} className="mt-1 block truncate text-[15px] font-medium text-ink transition-colors hover:text-red">
                              {item.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => remove(item.href)}
                            aria-label={`Remove ${item.name}`}
                            className="-mr-1.5 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-all duration-300 hover:bg-rose hover:text-red"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-1.5 flex items-baseline gap-2">
                          <span className="text-[15px] font-semibold text-ink">{taka(item.price)}</span>
                          {item.oldPrice && <span className="text-[12px] text-muted line-through">{taka(item.oldPrice)}</span>}
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <span className="flex gap-1.5">
                            {item.colors.slice(0, 4).map((c) => (
                              <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-black/10" style={{ background: c.hex }} />
                            ))}
                          </span>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group/b inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                          >
                            View product
                            <span aria-hidden className="transition-transform duration-300 group-hover/b:translate-x-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Foot */}
            <div className="border-t border-line bg-white px-6 pb-6 pt-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-muted">Wishlist value</p>
                  <p className="mt-1 text-[22px] font-semibold leading-none text-ink">{taka(total)}</p>
                </div>
                {saved > 0 && (
                  <span className="rounded-full bg-rose px-3 py-1.5 text-[12px] font-semibold text-red">You save {taka(saved)}</span>
                )}
              </div>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="group relative mt-5 flex items-center justify-center gap-2 overflow-hidden bg-ink py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-[400%]" />
                View full wishlist
              </Link>
              <div className="mt-3 flex items-center justify-between text-[13px]">
                <button onClick={onClose} className="link-line text-ink">
                  Continue shopping
                </button>
                {confirmClear ? (
                  <span className="fade-up flex items-center gap-3">
                    <span className="text-muted">Clear all?</span>
                    <button onClick={() => { clearWishlist(); setConfirmClear(false); }} className="font-semibold text-red">Yes</button>
                    <button onClick={() => setConfirmClear(false)} className="text-ink">No</button>
                  </span>
                ) : (
                  <button onClick={() => setConfirmClear(true)} className="text-muted transition-colors hover:text-red">
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function EmptyState({ onClose, play }: { onClose: () => void; play: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
      <div className="relative grid h-28 w-28 place-items-center rounded-full bg-rose">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" className="text-red">
          <path key={String(play)} pathLength={1} className={play ? "wish-draw" : ""} d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
        </svg>
        <span className="absolute inset-0 animate-ping rounded-full bg-rose opacity-40 [animation-duration:2.4s]" />
      </div>
      <h3 className="mt-7 text-[22px] font-semibold text-ink">Nothing saved yet</h3>
      <p className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-muted">
        Tap the heart on any piece you love and it will wait for you here.
      </p>
      <Link
        href="/categories"
        onClick={onClose}
        className="mt-8 bg-ink px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red"
      >
        Start exploring
      </Link>
    </div>
  );
}

function Toast({ item, onView, onClose }: { item: WishItem | null; onView: () => void; onClose: () => void }) {
  // Keep the last item so the toast can slide out with its content.
  const [last, setLast] = useState<WishItem | null>(item);
  if (item && item !== last) setLast(item);
  const shown = !!item;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-[65] w-[calc(100%-40px)] max-w-[360px] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {last && (
        <div className="flex items-center gap-4 bg-white p-3 pr-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
          <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-mist">
            <Image src={img(last.img, 200)} alt="" fill sizes="56px" className="object-cover" />
            <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-red text-white">
              <HeartIcon filled size={10} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-red">Saved to wishlist</p>
            <p className="mt-0.5 truncate text-[14px] font-medium text-ink">{last.name}</p>
          </div>
          <button onClick={onView} className="link-line shrink-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
            View
          </button>
          <button onClick={onClose} aria-label="Dismiss" className="shrink-0 text-muted hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
