"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { img, taka, type Product } from "./catalog";

const PRICE_BANDS = [
  { id: "u20", label: "Under ৳20,000", min: 0, max: 20000 },
  { id: "20-50", label: "৳20,000 – ৳50,000", min: 20000, max: 50000 },
  { id: "50-100", label: "৳50,000 – ৳1,00,000", min: 50000, max: 100000 },
  { id: "100+", label: "Above ৳1,00,000", min: 100000, max: Infinity },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

const PAGE = 12;

export default function ProductListing({ products, title }: { products: Product[]; title: string }) {
  const [bands, setBands] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [cols, setCols] = useState<3 | 4>(4);
  const [drawer, setDrawer] = useState(false);
  const [wish, setWish] = useState<string[]>([]);

  // Options available in this sub-category
  const allMaterials = useMemo(() => [...new Set(products.map((p) => p.material))].sort(), [products]);
  const allColors = useMemo(() => {
    const m = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => m.set(c.name, c.hex)));
    return [...m.entries()];
  }, [products]);

  const list = useMemo(() => {
    const out = products.filter(
      (p) =>
        (!bands.length || bands.some((b) => {
          const band = PRICE_BANDS.find((x) => x.id === b)!;
          return p.price >= band.min && p.price < band.max;
        })) &&
        (!materials.length || materials.includes(p.material)) &&
        (!colors.length || p.colors.some((c) => colors.includes(c.name))) &&
        (!saleOnly || !!p.oldPrice),
    );
    const sorted = [...out];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "new") sorted.sort((a, b) => b.order - a.order);
    return sorted;
  }, [products, bands, materials, colors, saleOnly, sort]);

  // Paging resets automatically whenever the filters/sort change.
  const filterKey = `${bands}|${materials}|${colors}|${saleOnly}|${sort}`;
  const [paging, setPaging] = useState({ key: filterKey, n: PAGE });
  const shown = paging.key === filterKey ? paging.n : PAGE;

  // Lock scroll while the mobile filter drawer is open
  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawer]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const active = [
    ...bands.map((b) => ({ label: PRICE_BANDS.find((x) => x.id === b)!.label, clear: () => toggle(bands, setBands, b) })),
    ...materials.map((m) => ({ label: m, clear: () => toggle(materials, setMaterials, m) })),
    ...colors.map((c) => ({ label: c, clear: () => toggle(colors, setColors, c) })),
    ...(saleOnly ? [{ label: "On sale", clear: () => setSaleOnly(false) }] : []),
  ];
  const clearAll = () => {
    setBands([]);
    setMaterials([]);
    setColors([]);
    setSaleOnly(false);
  };

  const Filters = (
    <div className="space-y-8">
      <FilterBlock title="Price">
        {PRICE_BANDS.map((b) => (
          <Check key={b.id} checked={bands.includes(b.id)} onChange={() => toggle(bands, setBands, b.id)} label={b.label} />
        ))}
      </FilterBlock>
      <FilterBlock title="Material">
        {allMaterials.map((m) => (
          <Check
            key={m}
            checked={materials.includes(m)}
            onChange={() => toggle(materials, setMaterials, m)}
            label={m}
            count={products.filter((p) => p.material === m).length}
          />
        ))}
      </FilterBlock>
      <FilterBlock title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {allColors.map(([name, hex]) => {
            const on = colors.includes(name);
            return (
              <button
                key={name}
                title={name}
                aria-label={name}
                aria-pressed={on}
                onClick={() => toggle(colors, setColors, name)}
                className={`h-8 w-8 rounded-full border transition-all duration-300 hover:scale-110 ${
                  on ? "border-ink ring-2 ring-ink ring-offset-2" : "border-black/10"
                }`}
                style={{ background: hex }}
              />
            );
          })}
        </div>
      </FilterBlock>
      <FilterBlock title="Offers">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-[15px] text-charcoal">
          On sale only
          <span className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${saleOnly ? "bg-red" : "bg-[#d9d9d9]"}`}>
            <input type="checkbox" className="peer sr-only" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} />
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${saleOnly ? "left-[22px]" : "left-0.5"}`} />
          </span>
        </label>
      </FilterBlock>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
      {/* Toolbar */}
      <div className="sticky top-[72px] z-20 -mx-4 mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawer(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-ink lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
            Filters {active.length > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-red text-[11px] text-white">{active.length}</span>}
          </button>
          <p className="text-[14px] text-muted">
            <span className="font-semibold text-ink">{list.length}</span> {list.length === 1 ? "product" : "products"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-10 text-[14px] font-medium text-ink outline-none transition-colors hover:border-ink focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h16l-8 9z" /></svg>
          </label>
          <div className="hidden overflow-hidden rounded-full border border-line xl:flex">
            {([3, 4] as const).map((c) => (
              <button
                key={c}
                aria-label={`${c} per row`}
                onClick={() => setCols(c)}
                className={`grid h-9 w-11 place-items-center transition-colors duration-300 ${cols === c ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
              >
                <span className={`grid gap-[2px] ${c === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                  {Array.from({ length: c * 2 }).map((_, i) => (
                    <span key={i} className="h-[5px] w-[5px] rounded-[1px] bg-current" />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:gap-14">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[150px]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-ink">Filter</h2>
              {active.length > 0 && (
                <button onClick={clearAll} className="link-line text-[13px] font-medium text-red">Clear all</button>
              )}
            </div>
            {Filters}
          </div>
        </aside>

        <div>
          {/* Active filter chips */}
          {active.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {active.map((a) => (
                <button
                  key={a.label}
                  onClick={a.clear}
                  className="mega-in inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[13px] text-white transition-colors hover:bg-red"
                >
                  {a.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              ))}
              <button onClick={clearAll} className="ml-1 text-[13px] font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
                Clear all
              </button>
            </div>
          )}

          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-line px-6 py-24 text-center">
              <p className="text-[22px] font-light text-ink">No {title.toLowerCase()} match these filters</p>
              <p className="mt-2 text-[14px] text-muted">Try removing a filter to see more products.</p>
              <button onClick={clearAll} className="mt-6 bg-ink px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div
                key={filterKey}
                className={`grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 ${cols === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}
              >
                {list.slice(0, shown).map((p, i) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    delay={(i % PAGE) * 40}
                    wished={wish.includes(p.id)}
                    onWish={() => toggle(wish, setWish, p.id)}
                  />
                ))}
              </div>

              {/* Load more + progress */}
              <div className="mt-14 flex flex-col items-center gap-4">
                <p className="text-[13px] text-muted">
                  Showing {Math.min(shown, list.length)} of {list.length}
                </p>
                <span className="h-[3px] w-56 overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-ink transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ width: `${(Math.min(shown, list.length) / list.length) * 100}%` }}
                  />
                </span>
                {shown < list.length && (
                  <button
                    onClick={() => setPaging({ key: filterKey, n: shown + 8 })}
                    className="mt-2 border border-ink px-10 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-ink hover:text-white"
                  >
                    Load more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-[70] lg:hidden ${drawer ? "visible" : "invisible"}`}>
        <button
          aria-label="Close filters"
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 h-full w-full bg-black/40 backdrop-blur-[3px] transition-opacity duration-500 ${drawer ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            drawer ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-[18px] font-semibold text-ink">Filter</h2>
            <button onClick={() => setDrawer(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">{Filters}</div>
          <div className="flex gap-3 border-t border-line p-4">
            <button onClick={clearAll} className="flex-1 border border-line py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">Clear</button>
            <button onClick={() => setDrawer(false)} className="flex-[2] bg-ink py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
              Show {list.length} products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- pieces ---------------- */

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-line pb-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-[13px] font-semibold uppercase tracking-[0.18em] text-ink">
        {title}
        <span className={`text-lg font-light transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="space-y-3 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function Check({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[15px] text-charcoal">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-[#bdbdbd] transition-all duration-300 group-hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-red">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className={`transition-transform duration-300 ${checked ? "scale-100" : "scale-0"}`}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
      <span className="flex-1 transition-colors group-hover:text-ink">{label}</span>
      {count !== undefined && <span className="text-[13px] text-muted">{count}</span>}
    </label>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="relative inline-block text-[13px] leading-none tracking-[1px]" aria-label={`${value.toFixed(1)} out of 5`}>
      <span className="text-[#d9d9d9]">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-[#e0a526]" style={{ width: `${(value / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

function ProductCard({ p, delay, wished, onWish }: { p: Product; delay: number; wished: boolean; onWish: () => void }) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return (
    <article className="mega-in group" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <a href="#" aria-label={p.name} className="absolute inset-0">
          {/* Primary + hover photo (crossfade & zoom) */}
          <Image
            src={img(p.img, 700)}
            alt={p.name}
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 48vw"
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={img(p.img2, 700)}
            alt=""
            fill
            sizes="(min-width:1280px) 22vw, (min-width:768px) 30vw, 48vw"
            className="scale-105 object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        </a>

        {p.tag && (
          <span
            className={`pointer-events-none absolute left-3 top-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              p.tag === "Sale" ? "bg-red text-white" : p.tag === "New" ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            {p.tag === "Sale" ? `-${off}%` : p.tag}
          </span>
        )}

        <button
          onClick={onWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition-all duration-300 hover:scale-110 ${
            wished ? "text-red opacity-100" : "text-ink opacity-100 md:opacity-0 md:group-hover:opacity-100"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className={`transition-transform duration-300 ${wished ? "scale-110" : ""}`}>
            <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0112 6a5.4 5.4 0 019.3 6c-2.3 4.6-9.3 9-9.3 9z" />
          </svg>
        </button>

        <button className="absolute inset-x-3 bottom-3 translate-y-4 bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink opacity-0 shadow-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-ink hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
          Add to cart
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] uppercase tracking-[0.12em] text-muted">{p.material}</span>
          <span className="flex items-center gap-1.5">
            <Stars value={p.rating} />
            <span className="text-[12px] text-muted">({p.reviews})</span>
          </span>
        </div>
        <a href="#" className="mt-1.5 block text-[15px] font-medium leading-snug text-ink transition-colors duration-300 hover:text-red md:text-[16px]">
          {p.name}
        </a>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[16px] font-semibold text-ink">{taka(p.price)}</span>
          {p.oldPrice && <span className="text-[13px] text-muted line-through">{taka(p.oldPrice)}</span>}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {p.colors.map((c) => (
            <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c.hex }} />
          ))}
          <span className="ml-1 text-[12px] text-muted">{p.colors.length} colours</span>
        </div>
      </div>
    </article>
  );
}
