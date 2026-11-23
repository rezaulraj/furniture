// Curated collections featured on the home page ("Shop the collection").
// Each pulls real catalogue products from a handful of sub-categories.

import { findSub, pick, productHref, productsFor, subHref, type Product } from "./catalog";
import { slugify } from "./menuData";

export type Collection = {
  slug: string;
  plain: string;
  accent: string;
  eyebrow: string;
  teaser: string; // short line used on the home page card
  intro: string;
  story: string[];
  hero: string;
  look: { img: string; caption: string }[];
  items: [room: string, sub: string][];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "find-the-one",
    plain: "Find the",
    accent: "one",
    eyebrow: "The Sofa Collection",
    teaser: "Discover our full range of handcrafted sofas, made to order in your choice of fabric.",
    intro: "Handcrafted sofas, made to order in your choice of fabric — the seat you'll come home to for years.",
    story: [
      "A great sofa is where the day slows down. Every frame in this collection is built from kiln-dried hardwood, then hand-upholstered by our craftspeople in Gazipur.",
      "Choose your size, your shape and your fabric — from easy-care weaves to soft leather — and we'll deliver and set it up for you.",
    ],
    hero: "1600210492486-724fe5c67fb0",
    look: [
      { img: "1555041469-a586c61ea9bc", caption: "Deep seats, soft cushions" },
      { img: "1493663284031-b7e3aefcae8e", caption: "Made in your fabric" },
      { img: "1567538096630-e0c55bd6374c", caption: "Chairs to complete the set" },
    ],
    items: [
      ["Living Room", "Fabric Sofa"],
      ["Living Room", "3-Seater Sofa"],
      ["Living Room", "L-Shaped Sofa"],
      ["Living Room", "Leather Sofa"],
      ["Living Room", "Sofa-Bed"],
      ["Living Room", "Accent Chair"],
    ],
  },
  {
    slug: "deck-the-halls",
    plain: "Deck the",
    accent: "halls",
    eyebrow: "The Festive Edit",
    teaser: "Everything you need to welcome the festive season in warm, modern style.",
    intro: "Warm light, soft textures and finishing touches to welcome the festive season in modern style.",
    story: [
      "The festive season is about gathering — and the small details that make a home feel ready for it. Glowing lamps, layered textiles and pieces that catch the eye.",
      "We've picked our favourite accents to bring warmth to every room, whether you're hosting a crowd or keeping it cosy.",
    ],
    hero: "1616486338812-3dadae4b4ace",
    look: [
      { img: "1513506003901-1e6a229e2d15", caption: "Light that sets the mood" },
      { img: "1583847268964-b28dc8f51f92", caption: "Accents with character" },
      { img: "1618220179428-22790b461013", caption: "Layered, warm, welcoming" },
    ],
    items: [
      ["Decor", "Candles & Holders"],
      ["Decor", "Cushions"],
      ["Decor", "Throws"],
      ["Decor", "Vases"],
      ["Lighting", "Table Lamps"],
      ["Decor", "Mirrors"],
    ],
  },
  {
    slug: "dining-out",
    plain: "Dining",
    accent: "out",
    eyebrow: "The Dining Collection",
    teaser: "Discover dining tables and chairs that turn every meal into a special occasion.",
    intro: "Tables and chairs that turn every meal — weekday dinners and festive feasts — into an occasion.",
    story: [
      "The dining table is where stories are shared. Ours are crafted in solid wood and marble to be gathered around for generations.",
      "Pair a table with chairs, benches and a showcase for your finest crockery — every piece designed to work together.",
    ],
    hero: "1449247709967-d4461a6a6103",
    look: [
      { img: "1617806118233-18e1de247200", caption: "Room for everyone" },
      { img: "1592078615290-033ee584e267", caption: "Chairs made to linger in" },
      { img: "1532372320572-cda25653a26d", caption: "Round tables, easy talk" },
    ],
    items: [
      ["Dining", "6 Seater Dining Table"],
      ["Dining", "Round Dining Table"],
      ["Dining", "Marble Top Dining Table"],
      ["Dining", "Wooden Dining Chair"],
      ["Dining", "Upholstered Dining Chair"],
      ["Dining", "Crockery Showcase"],
    ],
  },
];

export const collectionHref = (slug: string) => `/collections/${slug}`;

export const findCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

// The sub-categories in a collection, each with a cover photo and link.
export function collectionSubs(c: Collection) {
  return c.items.flatMap(([room, sub]) => {
    const info = findSub(room, slugify(sub));
    return info ? [{ room, name: info.name, href: subHref(room, info.name), img: productsFor(room, info)[0].img ?? pick(room, sub) }] : [];
  });
}

// Up to `per` products from each sub-category, interleaved so the grid mixes types.
export function collectionProducts(c: Collection, per = 4): Product[] {
  const lists = c.items.map(([room, sub]) => {
    const info = findSub(room, slugify(sub));
    return info
      ? productsFor(room, info)
          .slice(0, per)
          .map((p) => ({ ...p, id: `${slugify(sub)}-${p.id}`, href: productHref(room, info.name, p.id) }))
      : [];
  });
  return Array.from({ length: per }, (_, i) => lists.flatMap((l) => (l[i] ? [l[i]] : []))).flat();
}
