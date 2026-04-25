import { Calendar, MapPin } from "lucide-react";

const events = [
  { name: "Neon Bloom Festival", artist: "Aurora · Glass Animals · Honne", date: "Jul 18", city: "Berlin", price: "€49", tag: "Festival" },
  { name: "Midnight Set Vol. 4", artist: "Kaytranada b2b Channel Tres", date: "Aug 02", city: "London", price: "£32", tag: "Club" },
  { name: "Static Skies Tour", artist: "Phoebe Bridgers", date: "Sep 14", city: "New York", price: "$58", tag: "Arena" },
];

export function Events() {
  return (
    <section className="relative border-b border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-accent">On sale now</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Tonight's lineup.
            </h2>
          </div>
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            View all events →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {events.map((e) => (
            <a
              key={e.name}
              href="#"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-violet/40 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {e.tag}
                </span>
                <span className="font-display text-xl font-semibold text-gradient">{e.price}</span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold leading-tight">{e.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.artist}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {e.city}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
