import { motion } from "framer-motion";
import { Search, CreditCard, QrCode, Smile } from "lucide-react";

const steps = [
  {
    icon: Search,
    n: "01",
    title: "Find the show",
    body: "Browse hand-picked concerts, theatre, sports and live drops happening near you.",
  },
  {
    icon: CreditCard,
    n: "02",
    title: "Pick your tier",
    body: "GA, VIP or a table for four — choose, pay, and you're in. Card, mobile money, all good.",
  },
  {
    icon: QrCode,
    n: "03",
    title: "Get your QR ticket",
    body: "Lands in your account instantly. Show it at the door — works offline, scans once.",
  },
  {
    icon: Smile,
    n: "04",
    title: "Keep the night",
    body: "Grab the official tee, hoodie or cap from the artist's drop. Same checkout, one bag.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Four taps from <span className="italic">discovery</span> to door.
          </h2>
        </motion.div>

        <div className="relative mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent lg:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-card transition group-hover:bg-accent">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Step {s.n}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
