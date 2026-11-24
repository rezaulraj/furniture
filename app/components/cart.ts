"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "./catalog";

// One line in the basket. The same product in two colours is two lines.
export type CartItem = {
  key: string; // href + colour
  href: string;
  name: string;
  img: string;
  price: number;
  oldPrice?: number;
  material?: string;
  color?: { name: string; hex: string };
  qty: number;
};

export const MAX_QTY = 10;
export const FREE_DELIVERY = 20000;
export const DELIVERY_FEE = 1500;

const KEY = "furniture:cart";
const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();
const addListeners = new Set<(item: CartItem, qty: number) => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = EMPTY;
  }
}

function save(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return items;
};
const getServerSnapshot = () => EMPTY;

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function cartTotals(list: CartItem[]) {
  const count = list.reduce((s, i) => s + i.qty, 0);
  const subtotal = list.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = list.reduce((s, i) => s + (i.oldPrice ? (i.oldPrice - i.price) * i.qty : 0), 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  return { count, subtotal, savings, delivery };
}

/** Build a cart line from a product. `color` defaults to the first one. */
export function toCartItem(p: Product, href: string, color = p.colors[0]): Omit<CartItem, "qty"> {
  return {
    key: `${href}#${color?.name ?? ""}`,
    href,
    name: p.name,
    img: p.img,
    price: p.price,
    oldPrice: p.oldPrice,
    material: p.material,
    color,
  };
}

export function addToCart(item: Omit<CartItem, "qty">, qty = 1, { silent = false } = {}) {
  load();
  const existing = items.find((i) => i.key === item.key);
  const next = existing
    ? items.map((i) => (i.key === item.key ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
    : [{ ...item, qty: Math.min(MAX_QTY, qty) }, ...items];
  save(next);
  if (!silent) addListeners.forEach((l) => l({ ...item, qty }, qty));
}

export function setQty(key: string, qty: number) {
  load();
  if (qty < 1) return removeLine(key);
  save(items.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)));
}

export function removeLine(key: string) {
  load();
  save(items.filter((i) => i.key !== key));
}

export function inCart(key: string) {
  load();
  return items.some((i) => i.key === key);
}

export function clearCart() {
  save(EMPTY);
}

export function onCartAdded(cb: (item: CartItem, qty: number) => void) {
  addListeners.add(cb);
  return () => {
    addListeners.delete(cb);
  };
}
