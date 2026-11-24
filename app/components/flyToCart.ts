"use client";

/**
 * Fly a thumbnail of the product from `from` (the card photo or the button)
 * into the header bag, then resolve. The bag bounces when the item lands.
 * Skipped (resolves at once) for reduced motion or when the bag isn't on screen.
 */
export function flyToCart(from: Element | null, src: string): Promise<void> {
  const target = document.querySelector("[data-cart-target]");
  if (!from || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const size = Math.min(140, Math.max(72, a.width * 0.45));
  const startX = a.left + a.width / 2 - size / 2;
  const startY = a.top + a.height / 2 - size / 2;
  const dx = b.left + b.width / 2 - (startX + size / 2);
  const dy = b.top + b.height / 2 - (startY + size / 2);

  // Prefer the photo already loaded on screen so the ghost is never blank.
  const shown = from instanceof HTMLImageElement && from.complete && from.currentSrc ? from.currentSrc : src;
  const ghost = document.createElement("div");
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: "90",
    pointerEvents: "none",
    borderRadius: "9999px",
    backgroundImage: `url("${shown}")`,
    backgroundColor: "#f3f3f3",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 18px 40px -10px rgba(0,0,0,0.45), 0 0 0 4px #fff",
  });
  document.body.appendChild(ghost);

  // Curved path: rise a little first, then swoop into the bag.
  const anim = ghost.animate(
    [
      { transform: "translate(0,0) scale(0.6)", opacity: 0 },
      { transform: "translate(0,-24px) scale(1)", opacity: 1, offset: 0.18 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.35 - 70}px) scale(0.6)`, opacity: 1, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.6 },
    ],
    { duration: 850, easing: "cubic-bezier(.5,0,.3,1)" },
  );

  return anim.finished
    .catch(() => {})
    .then(() => {
      ghost.remove();
    });
}
