import { motion } from "framer-motion";
import { Ticket, ShoppingBag, BarChart3, ScanLine } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Sell tickets in minutes",
    body: "Set up tiers, comp codes, and capacity. We handle payouts.",
  },
  {
    icon: ShoppingBag,
    title: "Launch a merch drop",
    body: "Tees, hoodies, caps. Attached to your event. Same checkout.",
  },
  {
    icon: ScanLine,
    title: "Scan at the door",
    body: "Free organizer app. QR scan, offline-ready, multi-staff.",
  },
  {
    icon: BarChart3,
    title: "Know your fans",
    body: "Live sales, top items, revenue per show — all in one dash.",
  },
];

export function Organizers() {
  return (
    <section id="organizers" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">For organizers</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tickets and merch, <span className="italic">one dashboard.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for promoters, artists and venues who want to own the night —
            and the morning-after merch sales.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
