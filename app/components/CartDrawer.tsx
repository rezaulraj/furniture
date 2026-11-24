"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { img, taka } from "./catalog";
import { cartTotals, FREE_DELIVERY, MAX_QTY, onCartAdded, removeLine, setQty, useCart, type CartItem } from "./cart";
import { useHydrated } from "./wishlist";

export const BagIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 8V6.5a4 4 0 018 0V8h-1.8V6.5a2.2 2.2 0 00-4.4 0V8z" />
    <path d="M4.2 8h15.6l1 15H3.2zM8.9 10.6a.9.9 0 100 1.8.9.9 0 000-1.8zm6.2 0a.9.9 0 100 1.8.9.9 0 000-1.8z" fillRule="evenodd" />
  </svg>
);

export const CART_OPEN_EVENT = "cart:open";
export const openCart = () => window.dispatchEvent(new Event(CART_OPEN_EVENT));

/** − qty + control; the number slides when it changes. */
export function QtyStepper({ item, size = "md" }: { item: CartItem; size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-9" : "h-11";
  const w = size === "sm" ? "w-8" : "w-10";
  return (
    <div className={`inline-flex ${h} items-center border border-[#d4d4d4] bg-white`}>
      <button
        onClick={() => setQty(item.key, item.qty - 1)}
        aria-label={item.qty === 1 ? `Remove ${item.name}` : "Decrease quantity"}
        className={`grid h-full ${w} place-items-center text-ink transition-colors hover:bg-mist hover:text-red`}
      >
        {item.qty === 1 ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
        ) : (
          <span className="text-[17px] leading-none">−</span>
        )}
      </button>
      <span className="relative w-7 overflow-hidden text-center text-[14px] font-semibold tabular-nums text-ink">
        <span key={item.qty} className="qty-roll block">{item.qty}</span>
      </span>
      <button
        onClick={() => setQty(item.key, item.qty + 1)}
        disabled={item.qty >= MAX_QTY}
        aria-label="Increase quantity"
        className={`grid h-full ${w} place-items-center text-[17px] leading-none text-ink transition-colors hover:bg-mist hover:text-red disabled:cursor-not-allowed disabled:opacity-30`}
      >
        +
      </button>
    </div>
  );
}

/** "৳X away from free delivery" with a filling bar. */
export function DeliveryProgress({ subtotal }: { subtotal: number }) {
  const left = Math.max(0, FREE_DELIVERY - subtotal);
  const pct = Math.min(100, (subtotal / FREE_DELIVERY) * 100);
  return (
    <div>
      <p className="flex items-center gap-2 text-[13px] text-charcoal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={left ? "text-muted" : "text-[#2f8f4e]"}>
          <path d="M1.5 6h12v10h-12zM13.5 9.5h4.5l3.5 3.5v3h-8z" />
          <circle cx="6" cy="17.5" r="1.8" fill="white" />
          <circle cx="17" cy="17.5" r="1.8" fill="white" />
        </svg>
        {left ? (
          <span>
            You&apos;re <span className="font-semibold text-ink">{taka(left)}</span> away from free delivery
          </span>
        ) : (
          <span className="font-medium text-[#2f8f4e]">You&apos;ve unlocked free delivery &amp; installation</span>
        )}
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-mist">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${left ? "bg-red" : "bg-[#2f8f4e]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Header bag: live count, bounces on add, opens the mini cart. */
export default function CartButton() {
  const list = useCart();
  const mounted = useHydrated();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [fresh, setFresh] = useState<string | null>(null);
  const { count } = cartTotals(list);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => setOpen(true);
    window.addEventListener(CART_OPEN_EVENT, show);
    const off = onCartAdded((item) => {
      setBump((b) => b + 1);
      setFresh(item.key);
      // Let the bag bounce and the button show "Added" before the drawer slides in.
      clearTimeout(timer);
      timer = setTimeout(() => setOpen(true), 550);
    });
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CART_OPEN_EVENT, show);
      off();
    };
  }, []);

  return (
    <>
      <button data-cart-target aria-label={`Basket (${count} items)`} onClick={() => setOpen(true)} className="relative transition-all duration-300 hover:scale-110 hover:text-red">
        <span key={`icon-${bump}`} className={`block ${bump ? "wish-bump" : ""}`}>
          <BagIcon />
        </span>
        {mounted && count > 0 && (
          <span
            key={`count-${count}`}
            className="wish-badge absolute -right-2.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-red px-1 text-[10px] font-bold leading-none text-white shadow-[0_0_0_2px_white]"
          >
            {count}
          </span>
        )}
      </button>
      {mounted &&
        createPortal(
          <Drawer
            open={open}
            fresh={fresh}
            onClose={() => {
              setOpen(false);
              setFresh(null);
            }}
            list={list}
          />,
          document.body,
        )}
    </>
  );
}

function Drawer({ open, fresh, onClose, list }: { open: boolean; fresh: string | null; onClose: () => void; list: CartItem[] }) {
  const [leaving, setLeaving] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { count, subtotal, savings } = cartTotals(list);

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
    };
  }, [open, onClose]);

  const remove = (key: string) => {
    setLeaving((l) => [...l, key]);
    setTimeout(() => {
      removeLine(key);
      setLeaving((l) => l.filter((k) => k !== key));
    }, 380);
  };

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your basket"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-white shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Head */}
        <div className="border-b border-line px-6 pb-5 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
                <BagIcon size={17} />
              </span>
              <div>
                <h2 className="text-[20px] font-semibold leading-none text-ink">Your basket</h2>
                <p className="mt-1 text-[13px] text-muted">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close basket"
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-all duration-300 hover:rotate-90 hover:bg-mist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          {list.length > 0 && (
            <div className="mt-5">
              <DeliveryProgress subtotal={subtotal} />
            </div>
          )}
        </div>

        {list.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-mist text-ink">
              <span className={open ? "cart-drop" : ""}>
                <BagIcon size={44} />
              </span>
            </div>
            <h3 className="mt-7 text-[22px] font-semibold text-ink">Your basket is empty</h3>
            <p className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-muted">Find something you love and it will appear here, ready to bring home.</p>
            <Link
              href="/categories"
              onClick={onClose}
              className="mt-8 bg-ink px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-6">
              {list.map((item, i) => (
                <li
                  key={item.key}
                  className={`grid transition-all duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    leaving.includes(item.key) ? "grid-rows-[0fr] translate-x-8 opacity-0" : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`${open ? "wish-row" : "opacity-0"} ${fresh === item.key && open ? "cart-flash" : ""} group -mx-3 flex gap-4 border-b border-line px-3 py-5`}
                      style={{ "--delay": `${120 + Math.min(i, 8) * 60}ms` } as React.CSSProperties}
                    >
                      <Link href={item.href} onClick={onClose} className="relative h-[104px] w-[88px] shrink-0 overflow-hidden bg-mist">
                        <Image src={img(item.img, 300)} alt={item.name} fill sizes="88px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={item.href} onClick={onClose} className="block truncate text-[15px] font-medium text-ink transition-colors hover:text-red">
                              {item.name}
                            </Link>
                            {item.color && (
                              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                                <span className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ background: item.color.hex }} />
                                {item.color.name}
                                {item.material && <> · {item.material}</>}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="-mr-1.5 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-all duration-300 hover:bg-rose hover:text-red"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
                          </button>
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                          <QtyStepper item={item} size="sm" />
                          <div className="text-right">
                            {item.oldPrice && <p className="text-[12px] text-muted line-through">{taka(item.oldPrice * item.qty)}</p>}
                            <p key={item.qty} className="mega-in text-[15px] font-semibold text-ink">{taka(item.price * item.qty)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line bg-white px-6 pb-6 pt-5">
              {savings > 0 && (
                <div className="mb-2 flex justify-between text-[14px]">
                  <span className="text-muted">You save</span>
                  <span className="font-semibold text-red">−{taka(savings)}</span>
                </div>
              )}
              <div className="flex items-end justify-between">
                <span className="text-[12px] uppercase tracking-[0.14em] text-muted">Subtotal</span>
                <span key={subtotal} className="mega-in text-[24px] font-semibold leading-none text-ink">{taka(subtotal)}</span>
              </div>
              <p className="mt-1.5 text-[12px] text-muted">Delivery and any promo codes are worked out on the next step.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center border border-ink py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
                >
                  View basket
                </Link>
                <Link
                  href="/cart#summary"
                  onClick={onClose}
                  className="group relative flex items-center justify-center overflow-hidden bg-red py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-red-dark"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[400%]" />
                  Checkout
                </Link>
              </div>
              <button onClick={onClose} className="mx-auto mt-4 block text-[13px] text-muted transition-colors hover:text-ink">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
