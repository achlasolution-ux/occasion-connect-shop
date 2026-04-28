import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { events, formatMoney } from "@/lib/data";
import { MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Browse events — Pulse" },
      { name: "description", content: "Concerts, theatre, sports and live shows. Find your next night out." },
    ],
  }),
  component: EventsPage,
});

const categories = ["All", "Concert", "Theatre", "Sports", "Live show"] as const;

function EventsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat === "All" ? events : events.filter((e) => e.category === cat);
  return (
    <SiteLayout>
      <section className="bg-brand py-16 text-brand-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">All events</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl">
            Every show. One tap away.
          </h1>
        </div>
      </section>

      <section className="bg-warm py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border-2 border-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  cat === c ? "bg-foreground text-background" : "hover:bg-foreground hover:text-background"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to="/events/$id"
                  params={{ id: e.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={e.img} alt={e.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute left-3 top-3 flex flex-col items-center rounded-xl bg-background/95 px-3 py-2 shadow-card backdrop-blur">
                      <div className="font-display text-2xl font-extrabold leading-none text-accent">{e.dateLabel.d}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider">{e.dateLabel.m}</div>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                      {e.tag}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-xl font-bold leading-tight">{e.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{e.time}</span>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">From</div>
                        <div className="font-display text-lg font-bold">{formatMoney(e.tiers[0].price)}</div>
                      </div>
                      <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background transition group-hover:bg-accent">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
