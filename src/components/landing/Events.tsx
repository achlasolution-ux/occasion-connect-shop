import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { events, formatMoney } from "@/lib/data";

export function Events() {
  const top = events.slice(0, 4);
  return (
    <section id="events" className="bg-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Now on sale</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find your next night out.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Hand-picked shows happening near you. Pick a tier, pay, and your QR ticket lands instantly.
            </p>
          </motion.div>
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((e, i) => {
            const minPrice = Math.min(...e.tiers.map((t) => t.price));
            const totalRemaining = e.tiers.reduce((s, t) => s + t.remaining, 0);
            const lowStock = totalRemaining < 200;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to="/events/$id"
                  params={{ id: e.slug }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-foreground/10"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={e.img}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    {/* gradient veil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* date chip */}
                    <div className="absolute left-3 top-3 flex flex-col items-center justify-center rounded-2xl bg-background/95 px-3 py-2 text-center shadow-card backdrop-blur">
                      <div className="font-display text-2xl font-extrabold leading-none text-accent">
                        {e.dateLabel.d}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider">{e.dateLabel.m}</div>
                    </div>

                    {/* category + urgency */}
                    <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
                      <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                        {e.tag}
                      </span>
                      {lowStock && (
                        <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-card">
                          Almost gone
                        </span>
                      )}
                    </div>

                    {/* title on image */}
                    <div className="absolute inset-x-4 bottom-3">
                      <h3 className="font-display text-lg font-extrabold leading-tight text-white drop-shadow-md">
                        {e.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {e.venue}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {e.time}
                      </span>
                    </div>
                    <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          From
                        </div>
                        <div className="font-display text-xl font-extrabold">{formatMoney(minPrice)}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background transition group-hover:bg-accent group-hover:text-accent-foreground">
                        Get tickets
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
