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
  Lighting: ["1507473885765-e6ed057f782c", "1513506003901-1e6a229e2d15", "1616486338812-3dadae4b4ace"],
  Storage: ["1595428774223-ef52624120d2", "1558997519-83ea9252edf8", "1484101403633-562f891dc89a"],
  Outdoor: ["1600210492486-724fe5c67fb0", "1615874959474-d609969a20ed", "1586105251261-72a756497a11"],
  Decor: ["1616486338812-3dadae4b4ace", "1583847268964-b28dc8f51f92", "1618220179428-22790b461013", "1513506003901-1e6a229e2d15"],
  "Kitchen Accessories": ["1556911220-bff31c812dba", "1617806118233-18e1de247200", "1560448204-e02f11c3d0e2"],
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

// Hand-picked photo for the first product of these sub-categories (used by Best Sellers).
const COVER: Record<string, string> = {
  "Kitchen/Counter Stool": "1503602642458-232111445657",
  "Living Room/Easy Chair": "1567538096630-e0c55bd6374c",
  "Dining/Wooden Dining Chair": "1592078615290-033ee584e267",
  "Living Room/Accent Chair": "1538688525198-9b88f6f53126",
  "Living Room/Fabric Sofa": "1493663284031-b7e3aefcae8e",
  "Lighting/Table Lamps": "1513506003901-1e6a229e2d15",
  "Dining/Round Dining Table": "1532372320572-cda25653a26d",
};

export function productsFor(room: string, sub: SubInfo): Product[] {
  const seed = hash(`${room}/${sub.name}`);
  const count = 12 + (seed % 9); // 12–20 products
  const base = basePrice(`${sub.group.title} ${sub.name}`);
  const pool = [...(ROOM_IMAGES[room] ?? []), ...POOL];

  const used = new Set<string>();
  return Array.from({ length: count }, (_, i): Product => {
    const h = hash(`${seed}-${i}`);
    const model = MODELS[(seed + i * 7) % MODELS.length];
    const num = 100 + (h % 400);
    const price = Math.round((base * (0.7 + ((h >>> 3) % 100) / 70)) / 50) * 50;
    const onSale = h % 5 === 0;
    const colorCount = 2 + (h % 3);
    const start = h % COLORS.length;
    return {
      id: `${slugify(model)}-${num}`,
      name: `${model}-${num} ${sub.name}`,
      model: `${model}-${num}`,
      price,
      oldPrice: onSale ? Math.round((price * 1.2) / 50) * 50 : undefined,
      rating: 3.8 + ((h >>> 5) % 13) / 10, // 3.8 – 5.0
      reviews: 4 + ((h >>> 7) % 180),
      material: MATERIALS[(h >>> 2) % MATERIALS.length],
      colors: Array.from({ length: colorCount }, (_, c) => COLORS[(start + c * 3) % COLORS.length]),
      img: pool[(seed + i) % pool.length],
      img2: pool[(seed + i + 3) % pool.length],
      tag: onSale ? "Sale" : i % 7 === 1 ? "New" : i % 6 === 0 ? "Bestseller" : undefined,
      order: (h >>> 4) % 1000,
    };
  }).map((p) => {
    // keep ids unique within a sub-category
    let id = p.id;
    for (let n = 2; used.has(id); n++) id = `${p.id}-${n}`;
    used.add(id);
    return { ...p, id };
  }).map((p, i) => (i === 0 && COVER[`${room}/${sub.name}`] ? { ...p, img: COVER[`${room}/${sub.name}`] } : p));
}

export const taka = (n: number) => `৳${n.toLocaleString("en-IN")}`;

/* ---------------- product detail helpers ---------------- */

export const productHref = (room: string, sub: string, id: string) => `${subHref(room, sub)}/${id}`;

export function findProduct(room: string, sub: SubInfo, id: string) {
  return productsFor(room, sub).find((p) => p.id === id);
}

// Six gallery photos: the two card photos plus four more from the room pool.
export function galleryFor(room: string, p: Product) {
  const pool = [...(ROOM_IMAGES[room] ?? []), ...POOL];
  const start = hash(p.id) % pool.length;
  const extra = Array.from({ length: 8 }, (_, i) => pool[(start + i * 3) % pool.length]);
  return [...new Set([p.img, p.img2, ...extra])].slice(0, 6);
}

export function sizeFor(p: Product) {
  const h = hash(p.id);
  const w = 40 + (h % 180);
  const d = 35 + ((h >>> 3) % 60);
  const ht = 45 + ((h >>> 6) % 70);
  return [
    ["Width", `${w} cm`],
    ["Depth", `${d} cm`],
    ["Height", `${ht} cm`],
    ["Weight", `${Math.round((w * d * ht) / 9000)} kg`],
    ["Material", p.material],
    ["Assembly", h % 2 ? "Free assembly included" : "Delivered fully assembled"],
  ] as const;
}

export type Review = {
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  reply?: string;
};

const NAMES = ["Nusrat Jahan", "Rafiq Ahmed", "Tasnim Rahman", "Mahmud Hasan", "Farzana Akter", "Imran Hossain", "Sadia Islam", "Arif Chowdhury", "Lamia Khan", "Shuvo Das", "Mitu Begum", "Tanvir Alam"];
const REVIEW_BANK: { r: number; t: string; b: string }[] = [
  { r: 5, t: "Beautiful and so well made", b: "Exactly as pictured — the finish is gorgeous and it feels really solid. Delivery team were careful and on time. Very happy." },
  { r: 5, t: "Worth every taka", b: "We compared a lot of options before choosing this one. The quality of the wood and the stitching is excellent. It instantly lifted the whole room." },
  { r: 4, t: "Lovely, slightly lighter than expected", b: "Great quality and comfortable. The colour is a touch lighter in real life than in the photos, but it still works beautifully with our decor." },
  { r: 5, t: "Perfect fit for our flat", b: "The size is just right for a compact space and it looks far more expensive than it is. Assembly was quick and painless." },
  { r: 4, t: "Great piece, delivery took a while", b: "Really pleased with the product itself. Delivery took a few extra days, but customer service kept us updated throughout." },
  { r: 5, t: "Guests always ask where it's from", b: "Stylish, sturdy and easy to clean. Our guests always comment on it. Would definitely buy from here again." },
  { r: 3, t: "Good, but check the measurements", b: "Nice quality overall. It was a little bigger than I imagined, so double-check the dimensions before ordering." },
  { r: 5, t: "Excellent craftsmanship", b: "You can feel the quality as soon as you touch it. Smooth edges, solid joints and a lovely natural grain." },
];

export function reviewsFor(p: Product): Review[] {
  const h = hash(p.id);
  const n = Math.min(14, 6 + (h % 9));
  return Array.from({ length: n }, (_, i) => {
    const k = hash(`${p.id}-r${i}`);
    const r = REVIEW_BANK[k % REVIEW_BANK.length];
    const day = 1 + (k % 28);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][(k >>> 4) % 11];
    return {
      name: NAMES[(k >>> 2) % NAMES.length],
      date: `${day} ${month} 2026`,
      rating: r.r,
      title: r.t,
      body: r.b,
      verified: k % 4 !== 0,
      helpful: (k >>> 6) % 24,
      reply:
        r.r <= 4 || i === 0
          ? "Thank you so much for taking the time to share your feedback — we're delighted you're enjoying your new piece, and we've passed your comments on to our team."
          : undefined,
    };
  });
}
