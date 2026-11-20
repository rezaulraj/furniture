import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furniture — Complements your lifestyle",
  description:
    "Timeless furniture for every room: living, bedroom, dining, kitchen and office.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
