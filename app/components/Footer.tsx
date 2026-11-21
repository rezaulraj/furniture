const footer = {
  Customers: ["Your Account", "Track Order", "Trade Customers", "Request a Catalogue", "Feedback", "Contact Us"],
  "Need Help?": ["FAQ", "Delivery", "Returns & Refunds", "EMI Options", "Showroom Locator", "Care Guide"],
  Company: ["About Us", "Careers", "Press", "Sustainability", "Franchise", "Terms & Privacy"],
  Inspiration: ["Style Notes Blog", "Online Catalogue", "Lookbooks", "Room Planner", "Our Shorts"],
};

export default function Footer() {
  return (
    <footer className="mt-16 bg-mist md:mt-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:px-8 lg:grid-cols-[3fr_1.4fr]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {Object.entries(footer).map(([h, links]) => (
            <div key={h}>
              <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink">{h}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-muted transition-colors hover:text-red">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white p-8">
          <h4 className="text-2xl font-medium text-ink">
            Newsletter
          </h4>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Unlock the secret to beautiful living. Be first to hear about new collections, exclusive offers and design tips.
          </p>
          <form className="mt-6">
            <input type="email" placeholder="Your email address" className="w-full border border-line px-4 py-3 text-[14px] outline-none transition-colors focus:border-red" />
            <button type="submit" className="mt-3 w-full bg-charcoal py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red">
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-6 text-[12px] text-muted md:flex-row md:px-8">
          <span className="text-lg font-semibold uppercase tracking-[0.22em] text-ink">Furni<span className="text-red">ture</span></span>
          <div className="flex gap-3">
            {["bKash", "Nagad", "VISA", "Mastercard", "AMEX"].map((p) => (
              <span key={p} className="rounded border border-line bg-white px-2 py-1 font-semibold text-charcoal">{p}</span>
            ))}
          </div>
          <span>© 2026 Furniture. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
