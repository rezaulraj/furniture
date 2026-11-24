"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "./catalog";

// One saved product. Keyed by its page URL, which is unique across rooms.
export type WishItem = {
  href: string;
  name: string;
  img: string;
  img2: string;
  price: number;
  oldPrice?: number;
  material: string;
  colors: { name: string; hex: string }[];
  addedAt: number;
};

const KEY = "furniture:wishlist";
const EMPTY: WishItem[] = [];
let items: WishItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();
// Fired when something is added, so the header heart can bounce and the toast can show.
const addListeners = new Set<(item: WishItem) => void>();

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

function save(next: WishItem[]) {
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

export function useWishlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// True once running in the browser (the saved list lives in localStorage).
const noop = () => () => {};
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

export function useIsWished(href: string) {
  return useWishlist().some((i) => i.href === href);
}

export function toWishItem(p: Product, href: string): WishItem {
  return {
    href,
    name: p.name,
    img: p.img,
    img2: p.img2,
    price: p.price,
    oldPrice: p.oldPrice,
    material: p.material,
    colors: p.colors,
    addedAt: Date.now(),
  };
}

export function toggleWish(item: WishItem) {
  load();
  if (items.some((i) => i.href === item.href)) {
    removeWish(item.href);
  } else {
    save([item, ...items]);
    addListeners.forEach((l) => l(item));
  }
}

export function removeWish(href: string) {
  load();
  save(items.filter((i) => i.href !== href));
}

export function clearWishlist() {
  save(EMPTY);
}

export function onWishAdded(cb: (item: WishItem) => void) {
  addListeners.add(cb);
  return () => {
    addListeners.delete(cb);
  };
}

// Open/close the wishlist drawer from anywhere (header, toast, product pages).
export const WISH_OPEN_EVENT = "wishlist:open";
export const openWishlist = () => window.dispatchEvent(new Event(WISH_OPEN_EVENT));
