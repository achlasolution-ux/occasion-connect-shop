import { Link } from "@tanstack/react-router";
import { Ticket } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-brand)]">
            <Ticket className="h-4 w-4 text-background" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold">Pulse</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {["Events", "Merch", "Organizers", "Pricing"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get tickets
          </a>
        </div>
      </div>
    </header>
  );
}
