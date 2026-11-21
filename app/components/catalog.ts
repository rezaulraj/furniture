// Catalogue helpers shared by room pages and sub-category pages:
// URL lookup, photo picking and (placeholder) product generation.

import { MEGA, slugify, type MenuGroup } from "./menuData";

/* ---------------- photos ---------------- */

export const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Room-relevant photos first; a shared pool fills the rest.
export const ROOM_IMAGES: Record<string, string[]> = {
  "Living Room": ["1555041469-a586c61ea9bc", "1493663284031-b7e3aefcae8e", "1567538096630-e0c55bd6374c", "1586023492125-27b2c045efd7", "1618220179428-22790b461013", "1484101403633-562f891dc89a", "1616486338812-3dadae4b4ace", "1532372320572-cda25653a26d"],
  Bedroom: ["1505693416388-ac5ce068fe85", "1540518614846-7eded433c457", "1631679706909-1844bbd07221", "1522708323590-d24dbb6b0267", "1595428774223-ef52624120d2"],
  Dining: ["1617806118233-18e1de247200", "1449247709967-d4461a6a6103", "1592078615290-033ee584e267", "1532372320572-cda25653a26d", "1550581190-9c1c48d21d6c"],
  Kitchen: ["1556911220-bff31c812dba", "1503602642458-232111445657", "1560448204-e02f11c3d0e2"],
  "Kid's Room": ["1522708323590-d24dbb6b0267", "1540518614846-7eded433c457", "1595428774223-ef52624120d2"],
  SmartFit: ["1493663284031-b7e3aefcae8e", "1586023492125-27b2c045efd7", "1583847268964-b28dc8f51f92"],
  Institutional: ["1600566753190-17f0baa2a6c3", "1524758631624-e2822e304c36"],
  Door: ["1484101403633-562f891dc89a", "1558997519-83ea9252edf8", "1600210492486-724fe5c67fb0"],
  Interior: ["1600210492486-724fe5c67fb0", "1618220179428-22790b461013", "1616486338812-3dadae4b4ace", "1615874959474-d609969a20ed"],
  Office: ["1524758631624-e2822e304c36", "1538688525198-9b88f6f53126", "1600566753190-17f0baa2a6c3"],
};

export const POOL = [
  "1586023492125-27b2c045efd7", "1616486338812-3dadae4b4ace", "1600210492486-724fe5c67fb0", "1618220179428-22790b461013",
  "1484101403633-562f891dc89a", "1522708323590-d24dbb6b0267", "1594026112284-02bb6f3352fe", "1558997519-83ea9252edf8",
  "1615874959474-d609969a20ed", "1631679706909-1844bbd07221", "1600566753190-17f0baa2a6c3", "1583847268964-b28dc8f51f92",
  "1560448204-e02f11c3d0e2", "1551298370-9d3d53740c72", "1519710164239-da123dc03ef4", "1598300042247-d088f8ab3a91",
];

const hash = (key: string) => {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};

// Deterministic pick so every item always gets the same photo.
export function pick(room: string, key: string) {
  const list = [...(ROOM_IMAGES[room] ?? []), ...POOL];
  return list[hash(key) % list.length];
}

/* ---------------- URLs ---------------- */

export const subHref = (room: string, sub: string) => `/categories/${slugify(room)}/${slugify(sub)}`;

export type SubInfo = { room: string; group: MenuGroup; name: string };

// Every page-worthy sub-category in a room: each link, plus stand-alone group titles.
export function subsOf(room: string): SubInfo[] {
  const seen = new Map<string, SubInfo>();
  for (const group of MEGA[room]?.columns.flat() ?? []) {
    const names = group.links.length ? group.links : [group.title];
    for (const name of names) {
      const key = slugify(name);
      if (!seen.has(key)) seen.set(key, { room, group, name });
    }
  }
  return [...seen.values()];
}

export function findSub(room: string, subSlug: string) {
  return subsOf(room).find((s) => slugify(s.name) === subSlug);
}

/* ---------------- placeholder products ---------------- */

export type Product = {
  id: string;
  name: string;
  model: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  material: string;
  colors: { name: string; hex: string }[];
  img: string;
  img2: string;
  tag?: "New" | "Bestseller" | "Sale";
  order: number; // "newest" ordering
};

const MODELS = ["Andaman", "Linden", "Dahlia", "Marigold", "Lucan", "Anderson", "Aria", "Nova", "Orchid", "Cedar", "Willow", "Maple", "Sierra", "Luna", "Oslo", "Kensington", "Verona", "Ember"];
const MATERIALS = ["Solid Wood", "Engineered Wood", "Fabric", "Leather", "Metal", "Rattan"];
const COLORS = [
  { name: "Walnut", hex: "#6b4a32" },
  { name: "Natural Oak", hex: "#c9a77c" },
  { name: "Charcoal", hex: "#3b3b3b" },
  { name: "Ivory", hex: "#eee7da" },
  { name: "Terracotta", hex: "#b5562f" },
  { name: "Sage", hex: "#8f9f86" },
  { name: "Dusty Rose", hex: "#c4918c" },
  { name: "Navy", hex: "#2f3c56" },
];

// Base price (BDT) by a keyword in the group / sub-category name.
function basePrice(text: string) {
  const t = text.toLowerCase();
  if (/(kitchen|wardrobe|bedroom set|interior|lobby|sofa set|modular)/.test(t)) return 65000;
  if (/(sofa|bed|dining table|door|almirah|showcase|workstation|conference)/.test(t)) return 38000;
  if (/(table|cabinet|desk|divan|dressing|shelf|shelves|rack)/.test(t)) return 16000;
  if (/(chair|stool|ottoman)/.test(t)) return 9000;
  return 4500;
}

export function productsFor(room: string, sub: SubInfo): Product[] {
  const seed = hash(`${room}/${sub.name}`);
  const count = 12 + (seed % 9); // 12–20 products
  const base = basePrice(`${sub.group.title} ${sub.name}`);
  const pool = [...(ROOM_IMAGES[room] ?? []), ...POOL];

  return Array.from({ length: count }, (_, i) => {
    const h = hash(`${seed}-${i}`);
    const model = MODELS[(seed + i * 7) % MODELS.length];
    const num = 100 + (h % 400);
    const price = Math.round((base * (0.7 + ((h >> 3) % 100) / 70)) / 50) * 50;
    const onSale = h % 5 === 0;
    const colorCount = 2 + (h % 3);
    const start = h % COLORS.length;
    return {
      id: `${slugify(sub.name)}-${i}`,
      name: `${model}-${num} ${sub.name}`,
      model: `${model}-${num}`,
      price,
      oldPrice: onSale ? Math.round((price * 1.2) / 50) * 50 : undefined,
      rating: 3.8 + ((h >> 5) % 13) / 10, // 3.8 – 5.0
      reviews: 4 + ((h >> 7) % 180),
      material: MATERIALS[(h >> 2) % MATERIALS.length],
      colors: Array.from({ length: colorCount }, (_, c) => COLORS[(start + c * 3) % COLORS.length]),
      img: pool[(seed + i) % pool.length],
      img2: pool[(seed + i + 3) % pool.length],
      tag: onSale ? "Sale" : i % 7 === 1 ? "New" : i % 6 === 0 ? "Bestseller" : undefined,
      order: (h >> 4) % 1000,
    };
  });
}

export const taka = (n: number) => `৳${n.toLocaleString("en-IN")}`;
