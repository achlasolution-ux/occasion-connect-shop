import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-event.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none overflow-hidden whitespace-nowrap font-display text-[14vw] font-black leading-[0.9] text-foreground/[0.06]"
      >
        <div className="flex flex-col gap-4 pt-8">
          <span>10 YEARS · 10 YEARS · 10 YEARS · 10 YEARS</span>
          <span className="-translate-x-12">10 YEARS · 10 YEARS · 10 YEARS</span>
          <span>10 YEARS · 10 YEARS · 10 YEARS · 10 YEARS</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-4 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-foreground"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Special 10 Year Edition
          </div>
          <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Maitú <span className="italic">Múkabete</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/80">
            A decade of unforgettable nights. Get tickets, book the stay, and travel
            with us — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> September 5, 2026
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> KICC Tsavo Ballroom, Nairobi
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
            >
              Get tickets
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background"
            >
              Browse events
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[3/4]">
            <img
              src={heroImg}
              alt="Featured performer for the 10 year anniversary edition"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-background/95 p-4 backdrop-blur">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Headliner
                </div>
                <div className="font-display text-xl font-bold">Live in Nairobi</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">From</div>
                <div className="font-display text-xl font-bold">KES 1,500</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-foreground/10 bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {[
            { k: "1.2M+", v: "Tickets sold" },
            { k: "850+", v: "Events hosted" },
            { k: "120+", v: "Hotel partners" },
            { k: "25", v: "Destinations" },
          ].map((s) => (
            <div key={s.v} className="bg-foreground px-6 py-6 sm:py-8">
              <div className="font-display text-3xl font-black sm:text-4xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-background/60">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
