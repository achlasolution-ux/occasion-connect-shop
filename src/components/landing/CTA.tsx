import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-32">
      <div className="absolute inset-0 [background:var(--gradient-glow)] opacity-80" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
          Your next show
          <br />
          <span className="text-gradient">starts here.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
          Set up an event in under three minutes. No contracts, no minimums,
          no surprise per-ticket fees.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Create your first event
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-card"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
