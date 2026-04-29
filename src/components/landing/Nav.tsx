import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, ShoppingBag, User as UserIcon, LogOut, Ticket as TicketIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, cartCount } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { label: "Events", to: "/events" as const },
  { label: "Merch", to: "/merch" as const },
  { label: "Tickets", to: "/tickets" as const },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const items = useCart();
  const count = cartCount(items);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.user_metadata?.display_name || user?.email || "U")
    .toString()
    .split(/[\s@]/)[0]
    .slice(0, 2)
    .toUpperCase();

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
              <Link
                key={l.label}
                to={l.to}
                activeProps={{ className: "bg-foreground/10 text-brand-foreground" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand-foreground/80 transition hover:bg-brand-foreground/10 hover:text-brand-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {!user ? (
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-brand-foreground/80 transition hover:text-brand-foreground sm:inline"
            >
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden h-10 items-center gap-2 rounded-full bg-foreground/10 pl-1.5 pr-3 transition hover:bg-foreground/20 sm:flex">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background">
                    {initials}
                  </span>
                  <span className="text-sm font-semibold">{user.user_metadata?.display_name ?? "Account"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate text-xs text-muted-foreground">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/account" })}>
                  <UserIcon className="mr-2 h-4 w-4" /> Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/tickets" })}>
                  <TicketIcon className="mr-2 h-4 w-4" /> My tickets
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => { await signOut(); navigate({ to: "/" }); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 transition hover:bg-foreground/20"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/events"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90 sm:inline-flex"
          >
            Get tickets
          </Link>
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
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-foreground/10"
                >
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/account" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-foreground/10">Account</Link>
                  <button onClick={async () => { setOpen(false); await signOut(); navigate({ to: "/" }); }} className="rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-foreground/10">Sign out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-foreground/10">Login</Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
