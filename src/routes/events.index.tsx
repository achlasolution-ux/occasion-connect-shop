import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { events, formatMoney } from "@/lib/data";
import { MapPin, Calendar, Search, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Browse events — Pulse" },
      { name: "description", content: "Concerts, theatre, sports and live shows. Find your next night out." },
    ],
  }),
  component: EventsPage,
});

const categories = ["All", "Concert", "Theatre", "Sports", "Live show"] as const;
const sorts = ["Soonest", "Price: low to high", "Price: high to low"] as const;

function EventsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>("All");
  const [priceMax, setPriceMax] = useState<number>(500);
  const [when, setWhen] = useState<"Any" | "This week" | "This month">("Any");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Soonest");
  const [showFilters, setShowFilters] = useState(false);

  const cities = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.city)))], []);

  const list = useMemo(() => {
    const now = new Date();
    const horizon =
      when === "This week"
        ? new Date(now.getTime() + 7 * 864e5)
        : when === "This month"
          ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          : null;

    let r = events.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (city !== "All" && e.city !== city) return false;
      if (q && !`${e.title} ${e.venue} ${e.city} ${e.organizer}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (e.tiers[0].price > priceMax) return false;
      if (horizon && new Date(e.dateISO) > horizon) return false;
      return true;
    });

    r = [...r].sort((a, b) => {
      if (sort === "Soonest") return a.dateISO.localeCompare(b.dateISO);
      if (sort === "Price: low to high") return a.tiers[0].price - b.tiers[0].price;
      return b.tiers[0].price - a.tiers[0].price;
    });
    return r;
  }, [cat, q, city, priceMax, when, sort]);

  const resetAll = () => {
    setCat("All"); setQ(""); setCity("All"); setPriceMax(500); setWhen("Any"); setSort("Soonest");
  };

  return (
    <SiteLayout>
      <section className="bg-brand py-14 text-brand-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">All events</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl">
            Every show. One tap away.
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-full bg-background px-4 py-3 shadow-card">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search events, artists, venues..."
                className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:opacity-90"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </section>

      <section className="bg-warm py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Category chips always visible */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border-2 border-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  cat === c ? "bg-foreground text-background" : "bg-background hover:bg-foreground hover:text-background"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Advanced filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 grid gap-4 rounded-2xl bg-card p-5 shadow-card md:grid-cols-4"
            >
              <FilterBlock label="City">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none"
                >
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </FilterBlock>
              <FilterBlock label="When">
                <div className="flex gap-2">
                  {(["Any", "This week", "This month"] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWhen(w)}
                      className={`flex-1 rounded-lg border px-2 py-2 text-xs font-bold transition ${
                        when === w ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </FilterBlock>
              <FilterBlock label={`Max price: ${formatMoney(priceMax)}`}>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-foreground"
                />
              </FilterBlock>
              <FilterBlock label="Sort by">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none"
                >
                  {sorts.map((s) => <option key={s}>{s}</option>)}
                </select>
              </FilterBlock>
              <div className="md:col-span-4 flex justify-end">
                <button onClick={resetAll} className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">
                  Reset filters
                </button>
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>{list.length} event{list.length === 1 ? "" : "s"}</span>
          </div>

          {list.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-card p-12 text-center shadow-card">
              <h3 className="font-display text-2xl font-bold">No events match those filters.</h3>
              <button onClick={resetAll} className="mt-3 text-sm font-bold underline">Reset and try again</button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue} · {e.city}</span>
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
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
