export function CTA() {
  return (
    <section className="relative overflow-hidden bg-accent py-20 text-accent-foreground sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 select-none font-display text-[28vw] font-black leading-none text-accent-foreground/10"
      >
        PULSE
      </div>
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="font-display text-5xl font-black tracking-tight text-balance sm:text-6xl md:text-7xl">
          Run your event on Pulse.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-accent-foreground/85">
          Sell tickets, manage entry, host live streams, and partner hotels — all
          from one dashboard. Set up in under 10 minutes.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
          >
            Become an organizer
          </a>
          <a
            href="#"
            className="rounded-full border-2 border-accent-foreground px-6 py-3.5 text-sm font-bold transition hover:bg-accent-foreground hover:text-accent"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
