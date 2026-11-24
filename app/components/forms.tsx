"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

/* Shared building blocks for the request / enquiry forms. There is no backend yet,
   so submitting simply shows a confirmation after a short delay. */

export function useFakeSubmit() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1200);
  };
  return { status, submit, reset: () => setStatus("idle") };
}

const control =
  "w-full border border-line bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-ink";

export function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">
        {label}
        {!required && <span className="ml-1 font-normal normal-case tracking-normal text-muted">(optional)</span>}
      </span>
      {type === "textarea" ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} className={`${control} resize-none`} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={control} />
      )}
    </label>
  );
}

export function SelectField({ label, name, options, className = "" }: { label: string; name: string; options: string[]; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">{label}</span>
      <span className="relative block">
        <select name={name} required defaultValue="" className={`${control} appearance-none pr-10`}>
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}

// Pill-style radio group.
export function Choice({ name, options, defaultValue }: { name: string; options: { value: string; label: string; hint?: string }[]; defaultValue: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <label key={o.value} className="group relative cursor-pointer">
          <input type="radio" name={name} value={o.value} defaultChecked={o.value === defaultValue} className="peer sr-only" />
          <span className="block border border-line px-4 py-3.5 transition-all duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-red/40 group-hover:border-ink">
            <span className="block text-[15px] font-medium">{o.label}</span>
            {o.hint && <span className="mt-0.5 block text-[13px] opacity-70">{o.hint}</span>}
          </span>
        </label>
      ))}
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group inline-flex w-full items-center justify-center gap-3 bg-red px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-red-dark disabled:cursor-wait disabled:opacity-80 sm:w-auto"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Sending…
        </>
      ) : (
        <>
          {children}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </>
      )}
    </button>
  );
}

export function SuccessCard({ title, text, onReset, resetLabel }: { title: string; text: string; onReset: () => void; resetLabel: string }) {
  return (
    <div className="fade-up flex flex-col items-center px-4 py-12 text-center" role="status">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-red/10 text-red">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" className="auth-check" />
        </svg>
      </span>
      <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium text-ink">{title}</h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onReset} className="border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-red hover:bg-red hover:text-white">
          {resetLabel}
        </button>
        <Link href="/" className="px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-red">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export const DISTRICTS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Cumilla", "Gazipur", "Narayanganj"];
