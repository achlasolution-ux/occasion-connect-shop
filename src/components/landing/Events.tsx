import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          </motion.div>
          <Link
            to="/events"
            className="group inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((e, i) => (
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
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex flex-col items-center justify-center rounded-xl bg-background/95 px-3 py-2 text-center shadow-card backdrop-blur">
                    <div className="font-display text-2xl font-extrabold leading-none text-accent">
                      {e.dateLabel.d}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider">{e.dateLabel.m}</div>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background backdrop-blur">
                    {e.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-bold leading-tight">{e.title}</h3>
                  <p className="text-xs text-muted-foreground">{e.venue} · {e.city}</p>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        From
                      </div>
                      <div className="font-display text-lg font-bold">{formatMoney(e.tiers[0].price)}</div>
                    </div>
                    <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background transition group-hover:bg-accent">
                      Buy
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
