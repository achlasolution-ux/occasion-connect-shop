import { ArrowUpRight } from "lucide-react";
import merchImg from "@/assets/merch.jpg";

export function Merch() {
  return (
    <section className="relative border-b border-border/60 py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-[image:var(--gradient-brand)] opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={merchImg}
              alt="Tour merchandise"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-accent">Merch storefront</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Sell the show.
            <br />
            <span className="text-muted-foreground">Then sell the shirt.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Bundle merch with tickets at checkout, or run a standalone storefront
            that matches your brand. We handle inventory, shipping labels, and
            tax — you keep the margin.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { k: "0%", v: "Listing fees" },
              { k: "48h", v: "Avg. ship time" },
              { k: "120+", v: "Print partners" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-card/50 p-4">
                <div className="font-display text-2xl font-semibold text-gradient">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent"
          >
            Open a storefront <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
