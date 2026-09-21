import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

const faqs = [
  {
    q: "How do I receive my ticket?",
    a: "Your QR ticket lands in your Achla account the moment payment clears. Open it from My Tickets — it scans once at the door and works offline.",
  },
  {
    q: "Can I get a refund?",
    a: "Cancelled or rescheduled events are refunded in full automatically. Other cases follow our refund policy window and are reviewed within 5 working days.",
  },
  {
    q: "How does merch work?",
    a: "Organizers attach official tees, hoodies and caps to their event. You add them to the same bag as your ticket and pay once.",
  },
  {
    q: "What does it cost organizers?",
    a: "No setup fee. A flat service fee per paid ticket, and merch sales settle with your ticket payout on the next business day.",
  },
  {
    q: "Which payment methods are supported?",
    a: "M-Pesa, Visa and Mastercard, and Apple Pay. Every checkout runs over an encrypted, PCI-compliant connection.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">FAQ</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Questions, <span className="italic">answered.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Still unsure? Read the{" "}
            <Link to="/refunds" className="font-bold text-foreground underline underline-offset-4">
              refund policy
            </Link>{" "}
            or the{" "}
            <Link to="/terms" className="font-bold text-foreground underline underline-offset-4">
              full terms
            </Link>
            .
          </p>
        </motion.div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
