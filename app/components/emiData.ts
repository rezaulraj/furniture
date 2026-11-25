// EMI plans and partner banks. Plain module so server pages and client components can share it.
// PLACEHOLDERS: bank names, tenures, rates and fees are illustrative — replace with your real bank agreements.

export const MIN_EMI = 5000;
export const MAX_PRICE = 500000;

/** Tenures in months. Up to 12 months is 0%; longer plans carry the bank's interest. */
export const TENURES = [
  { m: 3, rate: 0 },
  { m: 6, rate: 0 },
  { m: 9, rate: 0 },
  { m: 12, rate: 0 },
  { m: 18, rate: 9 },
  { m: 24, rate: 11 },
];

export type Bank = { name: string; short: string; color: string; max: number; fee: number };

export const BANKS: Bank[] = [
  { name: "Riverside Bank", short: "RB", color: "#0f4c81", max: 24, fee: 0 },
  { name: "Delta Trust Bank", short: "DT", color: "#1e7a4f", max: 24, fee: 0 },
  { name: "Greenline Bank", short: "GL", color: "#2f8f4e", max: 18, fee: 0 },
  { name: "Northstar Bank", short: "NS", color: "#5b3fa0", max: 12, fee: 0 },
  { name: "Harbor Bank", short: "HB", color: "#00838f", max: 12, fee: 1 },
  { name: "Lotus Bank", short: "LB", color: "#c2185b", max: 12, fee: 0 },
  { name: "Crescent Bank", short: "CB", color: "#b26a00", max: 24, fee: 1 },
  { name: "Summit Bank", short: "SB", color: "#37474f", max: 9, fee: 0 },
  { name: "Bayview Bank", short: "BV", color: "#1565c0", max: 6, fee: 0 },
  { name: "Meridian Bank", short: "MB", color: "#8e2430", max: 18, fee: 0 },
  { name: "Silverleaf Bank", short: "SL", color: "#546e7a", max: 6, fee: 0 },
  { name: "Unity Bank", short: "UB", color: "#e65100", max: 12, fee: 0 },
];

/** Monthly instalment, rounded up to the nearest ৳10. Standard reducing-balance formula when rate > 0. */
export function monthly(price: number, months: number, annualRate: number) {
  if (annualRate === 0) return Math.ceil(price / months / 10) * 10;
  const r = annualRate / 100 / 12;
  return Math.ceil((price * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) / 10) * 10;
}

/** Total paid. At 0% it's exactly the price (the last instalment absorbs the rounding). */
export const totalPayable = (price: number, months: number, annualRate: number) =>
  annualRate === 0 ? price : monthly(price, months, annualRate) * months;
