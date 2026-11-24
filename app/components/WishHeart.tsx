"use client";

import { useState } from "react";
import type { Product } from "./catalog";
import { toggleWish, toWishItem, useIsWished } from "./wishlist";
import { HeartIcon } from "./WishlistDrawer";

/** Heart toggle bound to the shared wishlist. Pops with a ring when saved.
 *  `className` must set a position (absolute/relative) — the ring is placed inside it. */
export default function WishHeart({
  p,
  href,
  className = "",
  idleClassName = "",
  size = 16,
  ring = true,
}: {
  p: Product;
  href: string;
  className?: string;
  idleClassName?: string;
  size?: number;
  ring?: boolean;
}) {
  const wished = useIsWished(href);
  const [pop, setPop] = useState(0);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!wished) setPop((n) => n + 1);
        toggleWish(toWishItem(p, href));
      }}
      aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
      aria-pressed={wished}
      className={`${className} ${wished ? "text-red" : idleClassName}`}
    >
      {ring && pop > 0 && wished && <span key={pop} className="wish-ring pointer-events-none absolute inset-0 rounded-full border-2 border-red" />}
      <span key={`h${pop}`} className={`block ${pop > 0 && wished ? "wish-pop" : ""}`}>
        <HeartIcon filled={wished} size={size} stroke={1.8} className="transition-[fill] duration-300" />
      </span>
    </button>
  );
}
