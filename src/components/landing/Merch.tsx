import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import tee from "@/assets/merch-tee.jpg";
import hoodie from "@/assets/merch-hoodie.jpg";
import cap from "@/assets/merch-cap.jpg";
import tee2 from "@/assets/merch-tee2.jpg";

type Item = {
  name: string;
  artist: string;
  price: string;
  type: string;
  img: string;
};

const items: Item[] = [
  { name: "Band Tour Tee", artist: "TTNT 6 · Official", price: "$32", type: "T-Shirt", img: tee },
  { name: "Cream Embroidered Hoodie", artist: "Maitú · Drop 01", price: "$68", type: "Hoodie", img: hoodie },
  { name: "Blackout Snapback", artist: "The Call · Crew", price: "$24", type: "Cap", img: cap },
  { name: "Tour Print Orange Tee", artist: "Sarit Live · 2026", price: "$28", type: "T-Shirt", img: tee2 },
];

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
              Every event on Pulse can launch a merch drop. Tees, hoodies, caps —
              shipped from the organizer, money goes straight to the artist.
            </p>
          </motion.div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:opacity-90"
          >
            Shop all
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((m, i) => (
            <motion.a
              key={m.name}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-background/5">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {m.type}
                </div>
                <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-brand px-4 py-2.5 text-center text-xs font-bold text-brand-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  Add to bag · {m.price}
                </div>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-base font-bold">{m.name}</h3>
                  <p className="text-xs text-background/60">{m.artist}</p>
                </div>
                <span className="font-display text-base font-bold text-brand">{m.price}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
