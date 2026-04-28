import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEvent, formatMoney, type EventItem, type TicketTier } from "@/lib/data";
import { cart } from "@/lib/cart";
import { MapPin, Calendar, Clock, Minus, Plus, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/events/$id")({
  loader: ({ params }): { event: NonNullable<ReturnType<typeof getEvent>> } => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.event.title} — Pulse` },
          { name: "description", content: loaderData.event.about.slice(0, 150) },
          { property: "og:title", content: loaderData.event.title },
          { property: "og:image", content: loaderData.event.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-4xl font-extrabold">Event not found</h1>
        <Link to="/events" className="mt-4 inline-block text-sm font-bold underline">Browse events</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, number>>({});

  const qtyFor = (id: string) => selected[id] ?? 0;
  const setQty = (id: string, n: number) => setSelected((s) => ({ ...s, [id]: Math.max(0, n) }));

  const total = event.tiers.reduce((s, t) => s + t.price * qtyFor(t.id), 0);
  const totalQty = event.tiers.reduce((s, t) => s + qtyFor(t.id), 0);

  const handleCheckout = () => {
    event.tiers.forEach((t) => {
      const q = qtyFor(t.id);
      if (q > 0) {
        cart.add({
          kind: "ticket",
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.dateLabel.full,
          eventVenue: `${event.venue} · ${event.city}`,
          tierId: t.id,
          tierName: t.name,
          price: t.price,
          qty: q,
        });
      }
    });
    navigate({ to: "/checkout" });
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 opacity-40">
          <img src={event.img} alt="" className="h-full w-full object-cover blur-2xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift md:aspect-[3/4]"
          >
            <img src={event.img} alt={event.title} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <Link to="/events" className="text-xs font-bold uppercase tracking-[0.2em] text-brand hover:opacity-80">
              ← All events
            </Link>
            <span className="mt-3 inline-flex w-fit rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
              {event.tag}
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] text-balance sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-background/80">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" />{event.dateLabel.full}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" />{event.time}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" />{event.venue}, {event.city}</span>
            </div>
            <p className="mt-6 max-w-xl text-background/70">{event.about}</p>
            <p className="mt-4 text-xs text-background/50">Presented by {event.organizer}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-warm py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Choose your tickets</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tap + to add. You can edit everything at checkout.</p>

            <div className="mt-6 space-y-4">
              {event.tiers.map((t) => (
                <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-card">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold">{t.name}</h3>
                      {t.remaining < 50 && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                          Only {t.remaining} left
                        </span>
                      )}
                    </div>
                    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {t.perks.map((p) => (
                        <li key={p}>· {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-display text-xl font-bold">{formatMoney(t.price)}</div>
                    <div className="flex items-center gap-2 rounded-full border-2 border-foreground p-1">
                      <button
                        onClick={() => setQty(t.id, qtyFor(t.id) - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground hover:text-background disabled:opacity-40"
                        disabled={qtyFor(t.id) === 0}
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-5 text-center text-sm font-bold">{qtyFor(t.id)}</span>
                      <button
                        onClick={() => setQty(t.id, qtyFor(t.id) + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground hover:text-background"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-foreground p-6 text-background shadow-lift lg:sticky lg:top-24">
            <div className="text-xs font-bold uppercase tracking-wider text-brand">Order summary</div>
            <div className="mt-4 space-y-2 text-sm">
              {event.tiers.filter((t) => qtyFor(t.id) > 0).length === 0 ? (
                <p className="text-background/60">No tickets selected yet.</p>
              ) : (
                event.tiers
                  .filter((t) => qtyFor(t.id) > 0)
                  .map((t) => (
                    <div key={t.id} className="flex justify-between">
                      <span>{qtyFor(t.id)} × {t.name}</span>
                      <span>{formatMoney(t.price * qtyFor(t.id))}</span>
                    </div>
                  ))
              )}
            </div>
            <div className="my-5 h-px bg-background/10" />
            <div className="flex items-end justify-between">
              <div className="text-xs uppercase tracking-wider text-background/60">Total</div>
              <div className="font-display text-3xl font-extrabold">{formatMoney(total)}</div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={totalQty === 0}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-brand-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-background/60">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Secure checkout · M-Pesa, Card & Apple Pay
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
