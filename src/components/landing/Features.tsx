import { Ticket, ShoppingBag, BarChart3, Zap, ShieldCheck, Globe2 } from "lucide-react";

const features = [
  { icon: Ticket, title: "Smart ticketing", desc: "Tiered pricing, presales, waitlists, and seat maps. Refunds and transfers in one click." },
  { icon: ShoppingBag, title: "Built-in merch", desc: "Sell shirts, vinyl and bundles next to tickets. Inventory and fulfillment included." },
  { icon: BarChart3, title: "Live analytics", desc: "Watch sales by source, city and tier. Real-time dashboards your team will actually open." },
  { icon: Zap, title: "Instant checkout", desc: "Apple Pay, Google Pay, and saved cards. Sub-second checkout converts more fans." },
  { icon: ShieldCheck, title: "Fraud protection", desc: "Bot defense, scalper detection, and ID-verified resale built in. Keep tickets with real fans." },
  { icon: Globe2, title: "Global from day one", desc: "150+ currencies, local payment methods, and tax handled automatically." },
];

export function Features() {
  return (
    <section className="relative border-b border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Everything you need</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            One platform.
            <br />
            <span className="text-muted-foreground">Tickets, merch, fans.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-background p-8 transition-colors hover:bg-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-accent ring-1 ring-border transition-all group-hover:text-foreground group-hover:ring-accent/40">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
