import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Events", href: "#events" },
  { label: "Xperiences", href: "#experiences" },
  { label: "Hotels", href: "#escapes" },
  { label: "Travel", href: "#destinations" },
  { label: "Streams", href: "#streams" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-brand text-brand-foreground shadow-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <span className="font-display text-lg font-black">P</span>
            </div>
            <span className="font-display text-2xl font-black tracking-tight">
              Pulse
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand-foreground/80 transition hover:bg-brand-foreground/10 hover:text-brand-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center rounded-full transition hover:bg-brand-foreground/10 sm:flex"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="#"
            className="hidden text-sm font-semibold text-brand-foreground/80 transition hover:text-brand-foreground sm:inline"
          >
            Contact
          </a>
          <a
            href="#"
            className="hidden rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background sm:inline-block"
          >
            Login
          </a>
          <a
            href="#"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90"
          >
            Sign up
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-brand-foreground/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-foreground/10 bg-brand px-4 py-3 lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-foreground/10"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
