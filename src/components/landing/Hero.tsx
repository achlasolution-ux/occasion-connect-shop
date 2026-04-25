import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-event.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      {/* Marquee texture */}
      <motion.div
        aria-hidden
        initial={{ x: 0 }}
        animate={{ x: "-25%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 select-none whitespace-nowrap font-display text-[14vw] font-extrabold leading-[0.9] text-foreground/[0.07]"
      >
        <div className="flex flex-col gap-4 pt-8">
          <span>LIVE · LOUD · LIVE · LOUD · LIVE · LOUD · LIVE · LOUD</span>
          <span className="-translate-x-12">TICKETS · MERCH · TICKETS · MERCH · TICKETS</span>
          <span>LIVE · LOUD · LIVE · LOUD · LIVE · LOUD · LIVE · LOUD</span>
        </div>
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-4 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-foreground"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
            </span>
            Tickets on sale now
          </motion.div>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Live shows.
            <br />
            <span className="italic">Real merch.</span>
            <br />
            One ticket.
          </h1>

          <p className="mt-6 max-w-md text-lg text-foreground/80">
            Pulse is the home for live events. Buy tickets in seconds, then grab
            the official tee, hoodie or cap from the artist's drop.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>120+ shows this month</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>14 cities</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#events"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
            >
              Browse events
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#merch"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background"
            >
              Shop merch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[3/4]"
          >
            <img
              src={heroImg}
              alt="Featured headlining artist"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-background/95 p-4 backdrop-blur">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Headlining
                </div>
                <div className="font-display text-xl font-bold">Maitú · Live</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">From</div>
                <div className="font-display text-xl font-bold">$29</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stat strip */}
      <div className="relative border-t border-foreground/10 bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {[
            { k: "1.2M+", v: "Tickets sold" },
            { k: "850+", v: "Live events" },
            { k: "320+", v: "Merch drops" },
            { k: "98%", v: "5-star organizers" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-foreground px-6 py-6 sm:py-8"
            >
              <div className="font-display text-3xl font-extrabold sm:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-background/60">
                {s.v}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
