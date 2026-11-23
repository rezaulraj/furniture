"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "login" | "signup";
type Values = { name: string; email: string; phone: string; password: string };
type Errors = Partial<Record<keyof Values | "terms", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0–4
}
const STRENGTH = [
  { label: "Too short", color: "bg-[#d9d9d9]" },
  { label: "Weak", color: "bg-red" },
  { label: "Fair", color: "bg-[#e0a526]" },
  { label: "Good", color: "bg-[#6ca36c]" },
  { label: "Strong", color: "bg-[#2f8f4e]" },
];

export default function AuthForm({ mode }: { mode: Mode }) {
  const signup = mode === "signup";
  const [v, setV] = useState<Values>({ name: "", email: "", phone: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values | "terms", boolean>>>({});
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [terms, setTerms] = useState(false);
  const [news, setNews] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const errors: Errors = {};
  if (signup && v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(v.email)) errors.email = "Enter a valid email address.";
  if (signup && v.phone && !/^01[3-9]\d{8}$/.test(v.phone.replace(/\D/g, "").replace(/^880/, "0")))
    errors.phone = "Enter a valid Bangladeshi mobile number.";
  if (v.password.length < (signup ? 8 : 1)) errors.password = signup ? "Use at least 8 characters." : "Enter your password.";
  if (signup && !terms) errors.terms = "Please accept the terms to continue.";

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => setV((p) => ({ ...p, [k]: e.target.value }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k: keyof Errors) => (touched[k] ? errors[k] : undefined);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, password: true, terms: true });
    if (Object.keys(errors).length) return;
    setStatus("loading");
    // No backend yet — simulate a request.
    setTimeout(() => setStatus("done"), 1300);
  };

  const pw = strength(v.password);

  /* ---------- success ---------- */
  if (status === "done") {
    return (
      <div className="mega-in flex flex-col items-center py-10 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[#2f8f4e]/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2f8f4e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" className="auth-check" />
          </svg>
        </span>
        <h1 className="mt-6 text-[28px] font-semibold text-ink">{signup ? "Welcome to Furniture!" : "Welcome back!"}</h1>
        <p className="mt-2 max-w-xs text-[15px] text-muted">
          {signup
            ? `Your account is ready, ${v.name.split(" ")[0]}. Start saving your favourite pieces.`
            : "You're signed in. Pick up right where you left off."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red"
        >
          Continue shopping <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  /* ---------- form ---------- */
  return (
    <div key={mode} className="mega-in">
      <h1 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-tight text-ink">
        {signup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-[15px] text-muted">
        {signup ? "Join us for faster checkout, wishlists and members-only offers." : "Log in to manage your orders and wishlist."}
      </p>

      {/* Social */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <SocialButton label="Google">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
          </svg>
        </SocialButton>
        <SocialButton label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12a12 12 0 10-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0024 12z" />
          </svg>
        </SocialButton>
      </div>

      <div className="my-8 flex items-center gap-4 text-[12px] uppercase tracking-[0.18em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or with email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        {signup && (
          <Field label="Full name" value={v.name} onChange={set("name")} onBlur={blur("name")} error={show("name")} autoComplete="name" />
        )}
        <Field label="Email address" type="email" value={v.email} onChange={set("email")} onBlur={blur("email")} error={show("email")} autoComplete="email" />
        {signup && (
          <Field
            label="Mobile number (optional)"
            type="tel"
            value={v.phone}
            onChange={set("phone")}
            onBlur={blur("phone")}
            error={show("phone")}
            autoComplete="tel"
            prefix="+880"
          />
        )}
        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          value={v.password}
          onChange={set("password")}
          onBlur={blur("password")}
          error={show("password")}
          autoComplete={signup ? "new-password" : "current-password"}
          suffix={
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M4 20L20 4" className={`origin-center transition-all duration-300 ${showPw ? "opacity-100" : "opacity-0"}`} />
              </svg>
            </button>
          }
        />

        {/* Password strength (sign up) */}
        {signup && (
          <div className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${v.password ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <div className="-mt-2 flex items-center gap-3">
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="h-1 overflow-hidden rounded-full bg-line">
                      <span className={`block h-full rounded-full transition-all duration-500 ${pw >= i ? `w-full ${STRENGTH[pw].color}` : "w-0"}`} />
                    </span>
                  ))}
                </div>
                <span className="w-16 text-right text-[12px] font-medium text-muted">{STRENGTH[pw].label}</span>
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        {signup ? (
          <div className="space-y-3 pt-1">
            <Checkbox checked={terms} onChange={(c) => { setTerms(c); setTouched((t) => ({ ...t, terms: true })); }}>
              I agree to the <a href="#" className="font-medium text-ink underline underline-offset-2 hover:text-red">Terms</a> and{" "}
              <a href="#" className="font-medium text-ink underline underline-offset-2 hover:text-red">Privacy Policy</a>
            </Checkbox>
            <ErrorText msg={show("terms")} />
            <Checkbox checked={news} onChange={setNews}>Send me design tips and exclusive offers</Checkbox>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1">
            <Checkbox checked={remember} onChange={setRemember}>Remember me</Checkbox>
            <a href="#" className="link-line text-[14px] font-medium text-ink hover:text-red">Forgot password?</a>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden bg-ink py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red disabled:cursor-wait disabled:bg-charcoal"
        >
          {/* shine sweep on hover */}
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
          {status === "loading" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {signup ? "Creating account…" : "Logging in…"}
            </>
          ) : (
            <>
              {signup ? "Create account" : "Log in"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-[14px] text-muted">
        {signup ? "Already have an account? " : "New to Furniture? "}
        <Link href={signup ? "/login" : "/signup"} className="font-semibold text-ink underline-offset-4 hover:text-red hover:underline">
          {signup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}

/* ---------------- pieces ---------------- */

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2.5 border border-line py-3 text-[14px] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_10px_20px_-12px_rgba(0,0,0,0.3)]"
    >
      {children}
      {label}
    </button>
  );
}

function Field({
  label,
  error,
  prefix,
  suffix,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; prefix?: string; suffix?: React.ReactNode }) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div>
      <div
        className={`group relative flex items-center border bg-white transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(31,31,31,0.06)] ${
          error ? "border-red" : "border-[#d4d4d4] hover:border-[#9a9a9a] focus-within:border-ink"
        }`}
      >
        {prefix && <span className="pl-4 pt-4 text-[15px] text-muted">{prefix}</span>}
        <input
          id={id}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`peer h-[58px] w-full bg-transparent pb-2 pt-6 text-[15px] text-ink outline-none ${prefix ? "pl-2" : "pl-4"} ${suffix ? "pr-1" : "pr-4"}`}
          {...input}
        />
        {/* Floating label */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] peer-focus:top-[15px] peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.12em] peer-[:not(:placeholder-shown)]:top-[15px] peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em] ${
            error ? "text-red" : "text-muted peer-focus:text-ink"
          }`}
        >
          {label}
        </label>
        {suffix && <span className="pr-2">{suffix}</span>}
      </div>
      <ErrorText msg={error} id={`${id}-err`} />
    </div>
  );
}

function ErrorText({ msg, id }: { msg?: string; id?: string }) {
  return (
    <div className={`grid transition-all duration-300 ${msg ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <p id={id} role={msg ? "alert" : undefined} className="overflow-hidden text-[13px] text-red">
        <span className="block pt-1.5">{msg ?? " "}</span>
      </p>
    </div>
  );
}

function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (c: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="group flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-charcoal">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="mt-px grid h-[18px] w-[18px] shrink-0 place-items-center border border-[#bdbdbd] transition-all duration-300 group-hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-red peer-focus-visible:ring-offset-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className={`transition-transform duration-300 ${checked ? "scale-100" : "scale-0"}`}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}
