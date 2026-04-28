import { Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "@tanstack/react-router";

const explore = [
  { label: "Events", to: "/events" as const },
  { label: "Merch", to: "/merch" as const },
  { label: "My tickets", to: "/tickets" as const },
  { label: "Login", to: "/login" as const },
];
const legal = [
  { label: "Terms", to: "/terms" as const },
  { label: "Refunds", to: "/refunds" as const },
  { label: "Privacy", to: "/privacy" as const },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <span className="font-display text-lg font-extrabold">P</span>
              </div>
              <span className="font-display text-2xl font-extrabold">Pulse</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Pulse is the home for live events. Sell tickets, launch merch drops,
              and own your audience — all in one place.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition hover:bg-brand hover:text-brand-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/80">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/80">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex overflow-hidden rounded-full border border-background/20"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-background/50 focus:outline-none"
              />
              <button className="bg-brand px-4 text-xs font-bold uppercase tracking-wider text-brand-foreground hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/60">
          <span>© {new Date().getFullYear()} Pulse. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/terms" className="hover:text-brand">Terms</Link>
            <Link to="/privacy" className="hover:text-brand">Privacy</Link>
            <Link to="/refunds" className="hover:text-brand">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
