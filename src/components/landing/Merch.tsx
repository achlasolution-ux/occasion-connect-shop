import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { products, formatMoney } from "@/lib/data";

export function Merch() {
  return (
    <section id="merch" className="bg-foreground py-20 text-background sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Official drops</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Merch from the artists, <span className="italic text-brand">not resellers.</span>
            </h2>
            <p className="mt-3 max-w-xl text-background/70">
              Every event on Achla can launch a merch drop. Tees, hoodies, caps —
              shipped from the organizer, money goes straight to the artist.
            </p>
          </motion.div>
          <Link
            to="/merch"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:opacity-90"
          >
            Shop all
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to="/merch/$id" params={{ id: m.slug }} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-background/5 ring-1 ring-background/10">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground shadow-card">
                    {m.type}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                    {formatMoney(m.price)}
                  </div>
                  <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2.5 text-xs font-bold text-foreground shadow-lift">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Quick view
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-bold">{m.name}</h3>
                    <p className="truncate text-xs text-background/60">{m.artist}</p>
                  </div>
                  <span className="shrink-0 font-display text-base font-extrabold text-brand">
                    {formatMoney(m.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
