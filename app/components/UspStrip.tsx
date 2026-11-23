"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Line-art icons. `.draw` strokes are drawn on by GSAP; `.accent` uses the brand red. */

const scallops = Array.from({ length: 8 }, () => "q3.5 5 7 0").join("");

const icons: Record<string, ReactNode> = {
  emi: (
    <svg viewBox="0 0 64 56" className="h-12 w-auto md:h-14">
      <ellipse className="draw accent" cx="18" cy="26" rx="12" ry="18" />
      <circle className="draw" cx="40" cy="12" r="4" />
      <path className="draw" d="M51 6L35 30" />
      <circle className="draw" cx="47" cy="24" r="4" />
      <text className="fade" x="35" y="47" fontSize="9" letterSpacing="1" fill="currentColor" stroke="none">
        EMI
      </text>
    </svg>
  ),
  van: (
    <svg viewBox="0 0 112 56" className="h-12 w-auto md:h-14">
      <g className="van">
        <path className="draw accent speed" d="M2 18h9M0 26h12M4 34h7" />
        <path className="draw" d="M16 6h56v34H16z" />
        <path className="draw" d="M72 16h18l12 12v12H72z" />
        <path className="draw" d="M76 20h12l7 8H76z" />
        <path className="draw" d="M16 40h86M98 34h4" />
        {/* little sofa on the side panel */}
        <path className="draw accent" d="M32 30v-8h24v8M28 24v8h32v-8M32 32v2M56 32v2" />
        {[32, 86].map((cx) => (
          <g key={cx} className="wheel" data-origin={`${cx} 44`}>
            <circle className="draw" cx={cx} cy="44" r="6" fill="var(--white)" />
            <circle className="draw" cx={cx} cy="44" r="1.6" />
            <path className="draw" d={`M${cx - 6} 44h12M${cx} 38v12`} strokeWidth="0.8" />
          </g>
        ))}
      </g>
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 56 56" className="h-12 w-auto md:h-14">
      <g className="badge">
        <circle className="draw" cx="28" cy="28" r="25" />
        <circle className="draw" cx="28" cy="28" r="20.5" />
        <path className="draw accent" d="M19 22l4-3v18" />
        <ellipse className="draw accent" cx="33" cy="28" rx="5.5" ry="9" />
      </g>
    </svg>
  ),
  box: (
    <svg viewBox="0 0 56 56" className="h-12 w-auto md:h-14">
      <g className="box">
        <path className="draw" d="M28 6l22 10-22 10L6 16z" />
        <path className="draw" d="M6 16v22l22 10V26" />
        <path className="draw" d="M50 16v22L28 48" />
        <path className="draw" d="M17 11l22 10v6" />
        <path className="draw accent" d="M24 39c-5-1-9-4-11-8M13 31l.5 4.5M13 31l4.3.5" />
      </g>
    </svg>
  ),
  store: (
    <svg viewBox="0 0 64 56" className="h-12 w-auto md:h-14">
      <path className="draw" d="M2 50h60" />
      <path className="draw" d="M8 24v26h48V24" />
      <path className="draw" d="M22 2h20v8H22z" />
      <g className="awning">
        <path className="draw accent" d={`M4 24l4-12h48l4 12`} />
        <path className="draw accent" d={`M4 24${scallops}`} />
      </g>
      <path className="draw" d="M26 50V35h12v15" />
      <path className="draw" d="M12 30h10v9H12zM42 30h10v9H42z" />
    </svg>
  ),
};

const usps = [
  { icon: "emi", t: "0% Easy EMI", s: "Up to 12 months" },
  { icon: "van", t: "Fast Delivery", s: "Across Bangladesh" },
  { icon: "badge", t: "10 Year Guarantee", s: "On solid wood" },
  { icon: "box", t: "Easy Returns", s: "Within 7 days" },
  { icon: "store", t: "Find a Showroom", s: "60+ nationwide" },
];

/* Small "signature" motion per icon, used on entry and replayed on hover. */
function flourish(item: Element, kind: string) {
  const q = gsap.utils.selector(item);
  const tl = gsap.timeline();
  switch (kind) {
    case "van":
      tl.fromTo(q(".van"), { x: -14 }, { x: 0, duration: 1, ease: "power3.out" }, 0)
        .fromTo(q(".speed"), { opacity: 1, x: 0 }, { opacity: 0.25, x: -4, duration: 0.6, yoyo: true, repeat: 1 }, 0);
      // Each wheel spins about its own hub.
      item.querySelectorAll<SVGGElement>(".wheel").forEach((w) =>
        tl.fromTo(w, { rotation: 0, svgOrigin: w.dataset.origin }, { rotation: 540, svgOrigin: w.dataset.origin, duration: 1, ease: "power3.out" }, 0),
      );
      break;
    case "badge":
      tl.fromTo(q(".badge"), { rotation: -120, scale: 0.85, svgOrigin: "28 28" }, { rotation: 0, scale: 1, svgOrigin: "28 28", duration: 1, ease: "back.out(1.6)" });
      break;
    case "box":
      tl.to(q(".box"), { y: -6, duration: 0.25, ease: "power2.out" })
        .to(q(".box"), { y: 0, duration: 0.6, ease: "bounce.out" });
      break;
    case "store":
      tl.fromTo(q(".awning"), { scaleY: 0.6, svgOrigin: "32 12" }, { scaleY: 1, svgOrigin: "32 12", duration: 0.9, ease: "elastic.out(1, 0.4)" });
      break;
    case "emi":
      tl.fromTo(q("ellipse"), { scaleX: 0.7, svgOrigin: "18 26" }, { scaleX: 1, svgOrigin: "18 26", duration: 0.9, ease: "elastic.out(1, 0.45)" });
      break;
  }
  return tl;
}

export default function UspStrip() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".usp");

      // Hide every stroke up front so it can be "drawn" in.
      el.querySelectorAll<SVGGeometryElement>(".draw").forEach((p) => {
        const len = p.getTotalLength() + 1;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(el.querySelectorAll(".fade, .usp-text"), { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      items.forEach((item, i) => {
        const at = i * 0.18;
        tl.to(item.querySelectorAll(".draw"), { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.07 }, at)
          .to(item.querySelectorAll(".fade, .usp-text"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, at + 0.5)
          .add(flourish(item, item.dataset.icon!), at + 0.3);

        let hover: gsap.core.Timeline | undefined;
        // ctx.add keeps hover tweens inside the context so revert() undoes them too.
        const onEnter = () =>
          ctx.add(() => {
            if (hover?.isActive() || tl.isActive()) return;
            hover = flourish(item, item.dataset.icon!);
          });
        item.addEventListener("mouseenter", onEnter);
        cleanups.push(() => item.removeEventListener("mouseenter", onEnter));
      });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="border-b border-line bg-white">
      <div className="no-scrollbar mx-auto flex max-w-[1440px] items-center justify-between gap-10 overflow-x-auto px-4 py-8 md:px-8 md:py-10">
        {usps.map((u) => (
          <div
            key={u.t}
            data-icon={u.icon}
            className="usp group flex shrink-0 cursor-default items-center gap-4 text-charcoal"
          >
            <span
              className="[&_.accent]:stroke-red [&_svg]:overflow-visible [&_svg]:fill-none [&_svg]:stroke-current"
              style={{ strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }}
              aria-hidden
            >
              {icons[u.icon]}
            </span>
            <div className="usp-text">
              <p className="text-[15px] font-semibold tracking-wide text-ink transition-colors group-hover:text-red md:text-[16px]">
                {u.t}
              </p>
              <p className="mt-0.5 text-[13px] text-muted">{u.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
