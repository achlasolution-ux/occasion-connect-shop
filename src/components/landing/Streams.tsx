import { Play } from "lucide-react";
import theatre from "@/assets/event-theatre.jpg";

export function Streams() {
  return (
    <section id="streams" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-lift">
              <img
                src={theatre}
                alt="Live stream preview"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <button
                aria-label="Play preview"
                className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-background text-foreground shadow-lift transition hover:scale-105"
              >
                <Play className="h-7 w-7 translate-x-0.5 fill-current" />
              </button>
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase tracking-wider text-destructive-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive-foreground" />
                Live
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Live stream events
            </p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
              The shows you can't miss — wherever you are.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Can't make it to the venue? Buy a stream pass and watch live in HD,
              from any device. Re-watch for 48 hours after the show.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "HD multi-camera production",
                "Pay once, watch on 2 devices",
                "48-hour replay window",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    ✓
                  </span>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
            >
              Buy to watch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
