// Franchise formats and city tiers. Plain module so server pages and client components can share it.
// All figures are placeholders for illustration — replace with the real franchise terms.

export const FORMATS = [
  {
    name: "Studio",
    area: "1,500 sq ft",
    invest: 6500000,
    team: 5,
    basket: 45000,
    conversion: 0.05,
    margin: 0.16,
    perks: ["Curated best-sellers", "Fabric & finish library", "Online order kiosk"],
  },
  {
    name: "Showroom",
    area: "4,000 sq ft",
    invest: 15000000,
    team: 12,
    basket: 60000,
    conversion: 0.06,
    margin: 0.18,
    perks: ["Full room sets", "In-store design studio", "Local delivery hub"],
  },
  {
    name: "Flagship",
    area: "8,000+ sq ft",
    invest: 32000000,
    team: 25,
    basket: 75000,
    conversion: 0.065,
    margin: 0.2,
    perks: ["Every collection on display", "Interior projects desk", "Regional warehouse"],
  },
];

export const TIERS = [
  { name: "Major city", mult: 1 },
  { name: "Divisional town", mult: 0.8 },
  { name: "District town", mult: 0.65 },
];

/** ৳ in lakh, switching to crore from 100 lakh (e.g. ৳65 lakh, ৳1.5 crore). */
export const bdt = (n: number) =>
  n >= 10000000
    ? `৳${(n / 10000000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} crore`
    : `৳${(n / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh`;
