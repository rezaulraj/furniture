"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Field, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";
import { useHydrated } from "./wishlist";

type Role = {
  id: string;
  title: string;
  team: string;
  city: string;
  type: "Full-time" | "Part-time" | "Internship";
  isNew?: boolean;
  summary: string;
  do: string[];
  need: string[];
};

// Placeholder openings — replace with real roles.
const ROLES: Role[] = [
  { id: "sales-gulshan", title: "Showroom Design Consultant", team: "Retail", city: "Dhaka", type: "Full-time", isNew: true, summary: "Help customers find pieces they'll love, and plan rooms with them in our Gulshan flagship.", do: ["Welcome visitors and understand how they live", "Create room plans and quotes", "Follow up through to delivery"], need: ["An eye for interiors", "Warm, confident communication", "Retail or design experience is a plus"] },
  { id: "sales-ctg", title: "Store Supervisor", team: "Retail", city: "Chattogram", type: "Full-time", summary: "Lead a small, friendly team and keep our GEC Circle showroom looking its best.", do: ["Run daily showroom operations", "Coach and schedule the sales team", "Own visual merchandising"], need: ["2+ years leading a retail team", "Organised and hands-on", "Bangla and English"] },
  { id: "carpenter", title: "Senior Carpenter", team: "Workshop", city: "Gazipur", type: "Full-time", isNew: true, summary: "Build our solid wood pieces by hand, from frame to final finish.", do: ["Cut, join and assemble solid wood frames", "Read technical drawings", "Train apprentices"], need: ["5+ years of furniture joinery", "Pride in detail", "Safe workshop practice"] },
  { id: "upholsterer", title: "Upholsterer", team: "Workshop", city: "Gazipur", type: "Full-time", summary: "Bring our sofas and chairs to life with careful cutting, sewing and fitting.", do: ["Cut and fit fabric and leather", "Spring, web and pad frames", "Quality-check every seam"], need: ["Upholstery experience", "Steady hands and patience", "Team spirit"] },
  { id: "designer", title: "Product Designer, Furniture", team: "Design", city: "Dhaka", type: "Full-time", summary: "Design the next collection, from sketch to prototype, with our makers.", do: ["Research, sketch and model new pieces", "Work with the workshop on prototypes", "Choose materials and finishes"], need: ["Portfolio of furniture or product design", "Rhino, SketchUp or similar", "Love of craft"] },
  { id: "interior", title: "Interior Designer, Projects", team: "Design", city: "Dhaka", type: "Full-time", isNew: true, summary: "Plan complete homes, offices and hotels for our interior projects clients.", do: ["Meet clients and survey spaces", "Create layouts, mood boards and 3D views", "Coordinate installation"], need: ["Degree in interior design", "3+ years of project work", "AutoCAD and 3D tools"] },
  { id: "crew", title: "Delivery & Installation Crew", team: "Logistics", city: "Dhaka", type: "Full-time", summary: "Deliver and set up furniture in customers' homes, the friendly face of our brand.", do: ["Deliver, assemble and place furniture", "Protect homes while you work", "Take packaging away for recycling"], need: ["Physically fit and careful", "Good with tools", "Polite and punctual"] },
  { id: "frontend", title: "Frontend Developer", team: "Digital", city: "Dhaka", type: "Full-time", summary: "Build a beautiful, fast online store used by thousands of families.", do: ["Build features in React and Next.js", "Craft smooth, accessible UI", "Work closely with design"], need: ["Strong TypeScript and React", "An eye for detail and motion", "Care for performance"] },
  { id: "marketing-intern", title: "Marketing Intern", team: "Marketing", city: "Dhaka", type: "Internship", summary: "Help tell our story across social media, email and our style notes blog.", do: ["Plan and post social content", "Help with photo shoots", "Write for the blog"], need: ["Studying marketing, media or similar", "Creative and curious", "Good written English"] },
  { id: "cs", title: "Customer Care Associate", team: "Customer Care", city: "Dhaka", type: "Part-time", summary: "Answer calls and chats, track orders and make every customer feel looked after.", do: ["Reply on phone, WhatsApp and chat", "Arrange deliveries and returns", "Log feedback for the team"], need: ["Patient and kind", "Fluent Bangla, good English", "Comfortable with computers"] },
];

const TEAMS = ["All", ...Array.from(new Set(ROLES.map((r) => r.team)))];
const CITIES = ["All cities", ...Array.from(new Set(ROLES.map((r) => r.city)))];

export default function CareersBoard() {
  const [team, setTeam] = useState("All");
  const [city, setCity] = useState("All cities");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [applying, setApplying] = useState<Role | null>(null);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ROLES.filter((r) => (team === "All" || r.team === team) && (city === "All cities" || r.city === city) && (!t || `${r.title} ${r.team} ${r.summary}`.toLowerCase().includes(t)));
  }, [team, city, q]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
          {TEAMS.map((t) => {
            const on = team === t;
            const n = t === "All" ? ROLES.length : ROLES.filter((r) => r.team === t).length;
            return (
              <button
                key={t}
                onClick={() => setTeam(t)}
                aria-pressed={on}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
              >
                {t}
                <span className={`text-[11px] font-semibold ${on ? "text-white/60" : "text-muted"}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <label className="relative flex-1 lg:w-64 lg:flex-none">
            <span className="sr-only">Search roles</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles" className="h-12 w-full border border-line bg-white pl-11 pr-4 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink" />
          </label>
          <label className="relative">
            <span className="sr-only">City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="h-12 cursor-pointer appearance-none border border-line bg-white pl-4 pr-10 text-[14px] text-ink outline-none transition-colors hover:border-ink focus:border-ink">
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
          </label>
        </div>
      </div>

      <p className="mt-6 text-[14px] text-muted">
        <span className="font-semibold text-ink">{list.length}</span> open {list.length === 1 ? "role" : "roles"}
      </p>

      {/* Roles */}
      {list.length === 0 ? (
        <div className="fade-up mt-6 bg-white px-8 py-14 text-center">
          <h3 className="text-[20px] font-semibold text-ink">No roles match right now</h3>
          <p className="mt-2 text-[15px] text-muted">Send us your CV anyway. We&apos;ll keep it on file and get in touch when something fits.</p>
          <button
            onClick={() => setApplying({ id: "open", title: "Open application", team: "Any team", city: "Any city", type: "Full-time", summary: "", do: [], need: [] })}
            className="mt-6 bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red"
          >
            Send an open application
          </button>
        </div>
      ) : (
        <ul key={team + city + q} className="mt-4 space-y-3">
          {list.map((r, i) => {
            const on = open === r.id;
            return (
              <li
                key={r.id}
                className={`mega-in bg-white transition-shadow duration-500 ${on ? "shadow-[0_30px_60px_-35px_rgba(0,0,0,0.45)]" : "hover:shadow-[0_18px_40px_-32px_rgba(0,0,0,0.45)]"}`}
                style={{ "--delay": `${Math.min(i, 8) * 50}ms` } as React.CSSProperties}
              >
                <button onClick={() => setOpen(on ? null : r.id)} aria-expanded={on} className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 text-left md:grid-cols-[1.6fr_1fr_1fr_auto] md:px-8 md:py-6">
                  <span>
                    <span className={`flex items-center gap-3 text-[17px] font-semibold transition-colors md:text-[18px] ${on ? "text-red" : "text-ink group-hover:text-red"}`}>
                      {r.title}
                      {r.isNew && <span className="bg-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">New</span>}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted md:hidden">
                      {r.team} · {r.city} · {r.type}
                    </span>
                  </span>
                  <span className="hidden text-[14px] text-charcoal md:block">{r.team}</span>
                  <span className="hidden items-center gap-2 text-[14px] text-charcoal md:flex">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /></svg>
                    {r.city} · {r.type}
                  </span>
                  <span className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-500 ${on ? "rotate-180 bg-red text-white" : "bg-mist text-ink group-hover:bg-ink group-hover:text-white"}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>
                <div inert={!on} className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="mx-6 border-t border-line pb-7 pt-6 md:mx-8">
                      <p className="max-w-3xl text-[16px] leading-relaxed text-charcoal">{r.summary}</p>
                      <div className="mt-6 grid gap-8 md:grid-cols-2">
                        {[
                          { h: "What you'll do", list: r.do },
                          { h: "What you'll bring", list: r.need },
                        ].map((b) => (
                          <div key={b.h}>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">{b.h}</p>
                            <ul className="mt-3 space-y-2.5">
                              {b.list.map((x) => (
                                <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-charcoal">
                                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                                  {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => setApplying(r)}
                          className="group/b relative overflow-hidden bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-dark"
                        >
                          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover/b:translate-x-[400%]" />
                          Apply for this role
                        </button>
                        <span className="text-[13px] text-muted">Takes about 3 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ApplyDrawer role={applying} onClose={() => setApplying(null)} />
    </div>
  );
}

function ApplyDrawer({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const mounted = useHydrated();
  const { status, submit, reset } = useFakeSubmit();
  const [file, setFile] = useState<string>("");
  const [drag, setDrag] = useState(false);
  const [last, setLast] = useState<Role | null>(role);
  const closeRef = useRef<HTMLButtonElement>(null);
  if (role && role !== last) {
    setLast(role);
    setFile("");
    reset();
  }
  const open = !!role;
  const r = role ?? last;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;
  return createPortal(
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Apply"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col bg-white shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-6 md:px-8">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-red">Apply</p>
            <h2 className="mt-1.5 text-[22px] font-semibold leading-tight text-ink">{r?.title}</h2>
            <p className="mt-1 text-[13px] text-muted">{r && `${r.team} · ${r.city} · ${r.type}`}</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition-all duration-300 hover:rotate-90 hover:bg-mist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7 md:px-8">
          {status === "done" ? (
            <SuccessCard title="Application sent!" text={`Thank you for applying to be our ${r?.title ?? "new teammate"}. Our people team reads every application and will reply within 5 working days.`} onReset={onClose} resetLabel="Back to roles" />
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Your name" />
                <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
              </div>
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              <Field label="Portfolio or LinkedIn" name="link" type="url" required={false} placeholder="https://" />

              <div>
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">CV / Résumé</span>
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    const f = e.dataTransfer.files[0];
                    if (f) setFile(f.name);
                  }}
                  className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${
                    file ? "border-[#2f8f4e] bg-[#eef6f0]" : drag ? "scale-[1.01] border-red bg-rose/30" : "border-[#d4d4d4] hover:border-ink"
                  }`}
                >
                  <input type="file" name="cv" accept=".pdf,.doc,.docx" required={!file} className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
                  {file ? (
                    <>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2f8f4e] text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      </span>
                      <span className="mt-3 max-w-full truncate text-[14px] font-medium text-ink">{file}</span>
                      <span className="mt-1 text-[12px] text-muted">Click to choose a different file</span>
                    </>
                  ) : (
                    <>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-ink">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg>
                      </span>
                      <span className="mt-3 text-[14px] text-ink"><span className="font-semibold underline underline-offset-2">Upload a file</span> or drag it here</span>
                      <span className="mt-1 text-[12px] text-muted">PDF or Word, up to 5 MB</span>
                    </>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">Why you? <span className="font-normal normal-case tracking-normal text-muted">(optional)</span></span>
                <textarea name="why" rows={4} placeholder="Tell us a little about yourself and why this role excites you…" className="w-full resize-none border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink" />
              </label>

              <SubmitButton loading={status === "loading"}>Send application</SubmitButton>
            </form>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
}
