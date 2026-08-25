import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const quotes = [
  {
    body: "We sold out 2,400 tickets in nine hours and moved 300 hoodies from the same checkout. Payouts hit the next morning.",
    name: "Wanjiru Kamau",
    role: "Promoter · Nairobi Sessions",
  },
  {
    body: "Door scanning used to be our nightmare. Now three staff scan offline and the queue never stalls.",
    name: "Brian Otieno",
    role: "Ops lead · Kasarani Arena",
  },
  {
    body: "Fans get the tee with the ticket. Our merch revenue per show doubled without a separate store.",
    name: "Maitú",
    role: "Recording artist",
  },
];

export function Testimonials() {
  return (
    <section className="bg-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Proof</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Organizers who <span className="italic">stopped juggling tools.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <Quote className="h-6 w-6 text-accent" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">
                {q.body}
              </blockquote>
              <div className="mt-5 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-brand text-brand" />
                ))}
              </div>
              <figcaption className="mt-3 border-t border-border pt-4">
                <div className="font-display text-sm font-bold">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
