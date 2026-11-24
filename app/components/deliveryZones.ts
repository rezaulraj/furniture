// Working days to deliver, by zone. Placeholder figures — match them to real logistics.
// Plain module (no "use client") so both server pages and client components can read it.
export const ZONES = [
  { id: "dhaka", label: "Inside Dhaka", days: [1, 3], districts: ["Dhaka"] },
  { id: "near", label: "Dhaka division & major cities", days: [3, 5], districts: ["Gazipur", "Narayanganj", "Chattogram", "Cumilla", "Mymensingh"] },
  { id: "rest", label: "Rest of Bangladesh", days: [5, 7], districts: ["Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Other district"] },
];
export const MADE_TO_ORDER = [14, 28];
