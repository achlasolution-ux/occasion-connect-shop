import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Events", href: "#events" },
  { label: "Merch", href: "#merch" },
  { label: "Organizers", href: "#organizers" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-brand text-brand-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <span className="font-display text-lg font-extrabold">P</span>
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight">Pulse</span>
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
          <a href="#" className="hidden text-sm font-semibold text-brand-foreground/80 transition hover:text-brand-foreground sm:inline">
            Login
          </a>
          <a
            href="#"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90"
          >
            Get tickets
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-brand-foreground/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-foreground/10 bg-brand lg:hidden"
          >
            <div className="flex flex-col px-4 py-3">
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
