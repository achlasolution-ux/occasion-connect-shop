import { motion } from "framer-motion";

const partners = [
  "Carnivore Grounds",
  "KICC Live",
  "Sarit Expo",
  "Alliance Française",
  "Ngong Racecourse",
  "Kasarani Arena",
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by venues and promoters
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="font-display text-lg font-bold tracking-tight text-foreground/45 transition hover:text-foreground"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
