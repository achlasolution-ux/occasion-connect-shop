import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { products, formatMoney } from "@/lib/data";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [
      { title: "Shop merch — Pulse" },
      { name: "description", content: "Official event merch — tees, hoodies and caps from the artists." },
    ],
  }),
  component: MerchPage,
});

function MerchPage() {
  return (
    <SiteLayout>
      <section className="bg-foreground py-16 text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Official drops</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl">
            Merch from the artists, <span className="italic text-brand">not resellers.</span>
          </h1>
          <p className="mt-4 max-w-xl text-background/70">
            Every tee, hoodie and cap is shipped by the event organizer. Proceeds go straight to the artist.
          </p>
        </div>
      </section>

      <section className="bg-warm py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to="/merch/$id" params={{ id: p.slug }} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card shadow-card">
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute right-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {p.type}
                    </div>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.artist}</p>
                    </div>
                    <span className="font-display text-base font-bold">{formatMoney(p.price)}</span>
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
