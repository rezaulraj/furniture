"use client";

import { useSyncExternalStore } from "react";

// Demo account kept in the browser until there is a real backend.

export type User = { name: string; email: string; phone: string; since: number; news: boolean };
export type OrderLine = { name: string; img: string; qty: number; price: number; href: string };
export type OrderCustomer = { name: string; phone: string; email: string };
export type OrderShipTo = { line: string; area: string; district: string; notes?: string };
export type OrderPayment = { method: string; detail?: string; status: "Paid" | "Pay on delivery" };
export type Order = {
  no: string;
  placed: number;
  total: number;
  lines: OrderLine[];
  // Added by the checkout. Older orders saved before it existed won't have these.
  customer?: OrderCustomer;
  shipTo?: OrderShipTo;
  slot?: { date: string; time: string };
  payment?: OrderPayment;
  breakdown?: { subtotal: number; discount: number; delivery: number; promo?: string };
};
export type Address = { id: string; label: string; name: string; phone: string; line: string; district: string; isDefault: boolean };

/** Tiny localStorage-backed store shared by every component that reads it. */
function localStore<T>(key: string, empty: T) {
  let value = empty;
  let loaded = false;
  const listeners = new Set<() => void>();
  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) value = JSON.parse(raw);
    } catch {}
  };
  const subscribe = (cb: () => void) => {
    load();
    listeners.add(cb);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      loaded = false;
      load();
      cb();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  };
  const get = () => {
    load();
    return value;
  };
  const set = (next: T) => {
    value = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {}
    listeners.forEach((l) => l());
  };
  const use = () => useSyncExternalStore(subscribe, get, () => empty);
  return { get, set, use };
}

const userStore = localStore<User | null>("furniture:user", null);
const ordersStore = localStore<Order[]>("furniture:orders", []);
const addressStore = localStore<Address[]>("furniture:addresses", []);

export const useUser = userStore.use;
export const useOrders = ordersStore.use;
export const useAddresses = addressStore.use;

export function signIn(u: Omit<User, "since" | "news"> & Partial<Pick<User, "since" | "news">>) {
  const prev = userStore.get();
  userStore.set({ since: prev?.since ?? Date.now(), news: prev?.news ?? true, ...u });
}
export function updateUser(patch: Partial<User>) {
  const u = userStore.get();
  if (u) userStore.set({ ...u, ...patch });
}
export function signOut() {
  userStore.set(null);
}

export function addOrder(o: Order) {
  ordersStore.set([o, ...ordersStore.get()]);
}

export function saveAddress(a: Omit<Address, "id" | "isDefault"> & { id?: string }) {
  const list = addressStore.get();
  if (a.id) {
    addressStore.set(list.map((x) => (x.id === a.id ? { ...x, ...a, id: x.id } : x)));
  } else {
    addressStore.set([...list, { ...a, id: Math.random().toString(36).slice(2, 9), isDefault: list.length === 0 }]);
  }
}
export function removeAddress(id: string) {
  const list = addressStore.get().filter((x) => x.id !== id);
  if (list.length && !list.some((x) => x.isDefault)) list[0] = { ...list[0], isDefault: true };
  addressStore.set(list);
}
export function setDefaultAddress(id: string) {
  addressStore.set(addressStore.get().map((x) => ({ ...x, isDefault: x.id === id })));
}

/** Simulated delivery progress from the time since the order was placed. */
export const ORDER_STEPS = ["Placed", "Confirmed", "Shipped", "Delivered"] as const;
export function orderStep(placed: number, now: number) {
  const hours = (now - placed) / 36e5;
  if (hours < 0.05) return 0;
  if (hours < 24) return 1;
  if (hours < 24 * 4) return 2;
  return 3;
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("") || "?";
