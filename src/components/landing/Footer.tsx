import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <span className="font-display text-lg font-black">P</span>
              </div>
              <span className="font-display text-2xl font-black">Pulse</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Pulse is an event and travel platform offering seamless solutions to
              create & manage events, sell tickets, book flights and accommodation
              with ease.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition hover:bg-brand hover:text-brand-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Quick links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-background/80">
              {["Events", "Hotels", "Travel", "Streams", "Blog", "Press"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-brand">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +254 115 555 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@pulse.events
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" /> 4th Floor, Kalson Towers, Nairobi
              </li>
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
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/60">
          <span>© {new Date().getFullYear()} Pulse. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand">Terms</a>
            <a href="#" className="hover:text-brand">Privacy</a>
            <a href="#" className="hover:text-brand">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
