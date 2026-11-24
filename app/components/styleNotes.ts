// Editorial "Style notes": short styling guides that link to real products.

import { findSub, productHref, productsFor } from "./catalog";
import { slugify } from "./menuData";

export type StyleNote = {
  slug: string;
  no: string;
  title: string;
  excerpt: string;
  lead: string;
  author: { name: string; role: string };
  date: string;
  minutes: number;
  hero: string;
  inset: string;
  tips: { title: string; text: string; img: string }[];
  quote: string;
  shop: [room: string, sub: string][];
  collection: string; // related collection slug
};

export const STYLE_NOTES: StyleNote[] = [
  {
    slug: "how-to-set-the-table",
    no: "01",
    title: "How to set the table",
    excerpt:
      "The dining table takes centre stage this season — discover our top tips for thoughtful styling, from layered linens to warm candlelight.",
    lead:
      "A beautifully set table doesn't need a special occasion. With a few considered layers — good linen, mixed textures and low, warm light — an ordinary dinner becomes the best part of the day.",
    author: { name: "Farhana Akter", role: "Interior Stylist" },
    date: "November 2026",
    minutes: 5,
    hero: "1617806118233-18e1de247200",
    inset: "1592078615290-033ee584e267",
    tips: [
      {
        title: "Start with a good foundation",
        text: "Let the table itself shine. A solid wood top needs little more than a simple linen runner down the centre to soften the look and protect the surface.",
        img: "1449247709967-d4461a6a6103",
      },
      {
        title: "Layer your textures",
        text: "Combine a woven placemat, a crisp cotton napkin and stoneware plates. Mixing matte and glossy finishes adds depth without adding clutter.",
        img: "1532372320572-cda25653a26d",
      },
      {
        title: "Mix, don't match",
        text: "Pair your dining chairs with an upholstered bench, or bring in two contrasting chairs at the ends of the table. A little contrast feels collected, not chaotic.",
        img: "1592078615290-033ee584e267",
      },
      {
        title: "Light it low",
        text: "Switch off the overhead light and group candles of different heights in the middle of the table. Keep them below eye level so conversation flows.",
        img: "1616486338812-3dadae4b4ace",
      },
      {
        title: "Finish with something living",
        text: "A low vase of seasonal stems or a few sprigs of greenery is the final touch. Keep arrangements loose and natural — no taller than a hand's width.",
        img: "1583847268964-b28dc8f51f92",
      },
    ],
    quote: "Set the table for the people, not the photo — the best tables look lived in.",
    shop: [
      ["Dining", "Round Dining Table"],
      ["Dining", "Wooden Dining Chair"],
      ["Decor", "Candles & Holders"],
      ["Decor", "Vases"],
    ],
    collection: "dining-out",
  },
];

export const noteHref = (slug: string) => `/style-notes/${slug}`;

export const findNote = (slug: string) => STYLE_NOTES.find((n) => n.slug === slug);

// The note's "Shop the look" products, resolved to real catalogue items.
export function noteProducts(n: StyleNote) {
  return n.shop.flatMap(([room, sub]) => {
    const info = findSub(room, slugify(sub));
    const p = info && productsFor(room, info)[0];
    return p ? [{ ...p, sub: info.name, href: productHref(room, info.name, p.id) }] : [];
  });
}
