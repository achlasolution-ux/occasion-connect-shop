import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEvent, formatMoney, type EventItem } from "@/lib/data";
import { cart } from "@/lib/cart";
import { MapPin, Calendar, Clock, Minus, Plus, Share2, ShieldCheck, ChevronDown, Info, Heart } from "lucide-react";

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
  const { event } = Route.useLoaderData() as { event: EventItem };
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [openInfo, setOpenInfo] = useState<Record<string, boolean>>({});
  const [showFullAbout, setShowFullAbout] = useState(false);

  const qtyFor = (id: string) => selected[id] ?? 0;
  const setQty = (id: string, n: number) => setSelected((s) => ({ ...s, [id]: Math.max(0, Math.min(10, n)) }));

  const total = event.tiers.reduce((s, t) => s + t.price * qtyFor(t.id), 0);
  const totalQty = event.tiers.reduce((s, t) => s + qtyFor(t.id), 0);

  const addAllToCart = () => {
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
  };

  const handleAddToCart = () => {
    addAllToCart();
    navigate({ to: "/cart" });
  };

  const handleQuickBuy = () => {
    addAllToCart();
    navigate({ to: "/checkout" });
  };

  const aboutShort = event.about.length > 220 ? event.about.slice(0, 220) + "…" : event.about;

  return (
    <SiteLayout>
      <div className="bg-warm pb-32 lg:pb-16">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <nav className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/events" className="hover:text-foreground">Events</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{event.title}</span>
          </nav>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          {/* LEFT — poster + about */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card shadow-card"
            >
              <img src={event.img} alt={event.title} className="h-full w-full object-cover" />
              <button
                aria-label="Save"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-card backdrop-blur transition hover:scale-105"
              >
                <Heart className="h-4 w-4" />
              </button>
            </motion.div>

            <div className="mt-8">
              <div className="flex items-center gap-2 border-b-2 border-foreground/10 pb-2">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em]">About</h2>
                <span className="h-0.5 flex-1 bg-brand" />
              </div>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-foreground/80">
                {showFullAbout ? event.about : aboutShort}
              </p>
              {event.about.length > 220 && (
                <button
                  onClick={() => setShowFullAbout((v) => !v)}
                  className="mt-2 text-sm font-bold text-brand underline-offset-4 hover:underline"
                >
                  {showFullAbout ? "Show less" : "Read more"}
                </button>
              )}
              <p className="mt-6 text-xs text-muted-foreground">
                Presented by <span className="font-bold text-foreground">{event.organizer}</span>
              </p>
            </div>
          </div>

          {/* RIGHT — date badge + meta + tickets */}
          <div>
            <div className="flex items-start gap-5">
              {/* Date block */}
              <div className="flex w-20 shrink-0 flex-col items-center rounded-2xl border-2 border-foreground/10 bg-card py-3 text-center shadow-card">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{event.dateLabel.m}</span>
                <span className="font-display text-3xl font-extrabold leading-none">{event.dateLabel.d}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {new Date(event.dateISO).toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                  {event.tag}
                </span>
                <h1 className="mt-2 font-display text-3xl font-extrabold leading-[1.05] text-balance sm:text-4xl lg:text-[44px]">
                  {event.title}
                </h1>
                <div className="mt-4 space-y-2 text-sm text-foreground/70">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" />{event.venue}, {event.city}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" />{event.dateLabel.full}</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" />{event.time}</div>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 px-3 py-1.5 text-xs font-bold hover:border-foreground">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>

            {/* Tickets */}
            <div className="mt-8">
              <div className="flex items-center gap-2 border-b-2 border-foreground/10 pb-2">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em]">Tickets available</h2>
                <span className="h-0.5 flex-1 bg-brand" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {event.tiers.map((t) => {
                  const q = qtyFor(t.id);
                  const isOpen = !!openInfo[t.id];
                  return (
                    <div
                      key={t.id}
                      className={`rounded-2xl border-2 bg-card p-4 transition ${
                        q > 0 ? "border-brand shadow-lift" : "border-foreground/10 shadow-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-bold leading-tight">{t.name}</h3>
                          <div className="mt-1 text-sm font-bold text-foreground">{formatMoney(t.price)}</div>
                        </div>
                        <button
                          onClick={() => setQty(t.id, q + 1)}
                          aria-label="Add"
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground text-foreground transition hover:bg-foreground hover:text-background"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {t.remaining < 50 && (
                        <div className="mt-2 inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                          Only {t.remaining} left
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2">
                        <div className="text-xs text-muted-foreground">
                          <div>Valid from</div>
                          <div className="font-bold text-foreground">{event.dateLabel.full}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(t.id, q - 1)}
                            disabled={q === 0}
                            aria-label="Decrease"
                            className="grid h-7 w-7 place-items-center rounded-full bg-background text-foreground disabled:opacity-30"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-4 text-center text-sm font-bold">{q}</span>
                          <button
                            onClick={() => setQty(t.id, q + 1)}
                            aria-label="Increase"
                            className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-background"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setOpenInfo((s) => ({ ...s, [t.id]: !isOpen }))}
                        className="mt-3 flex items-center gap-1 text-xs font-bold text-brand underline-offset-4 hover:underline"
                      >
                        <Info className="h-3 w-3" />
                        {isOpen ? "Hide info" : "Show more info"}
                        <ChevronDown className={`h-3 w-3 transition ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {t.perks.map((p) => (
                            <li key={p}>· {p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subtotal + actions (desktop) */}
            <div className="mt-6 hidden rounded-2xl bg-foreground p-1 shadow-lift lg:block">
              <div className="flex items-center justify-between rounded-xl px-5 py-3 text-background">
                <span className="text-xs font-bold uppercase tracking-wider text-background/60">Subtotal</span>
                <span className="font-display text-2xl font-extrabold">{formatMoney(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={handleAddToCart}
                  disabled={totalQty === 0}
                  className="rounded-xl border-2 border-background bg-foreground py-3.5 text-sm font-bold uppercase tracking-wider text-background transition hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add to cart
                </button>
                <button
                  onClick={handleQuickBuy}
                  disabled={totalQty === 0}
                  className="rounded-xl bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-brand-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Quick buy
                </button>
              </div>
              <div className="px-5 py-2 text-[11px] text-background/50">
                <ShieldCheck className="mr-1 inline h-3 w-3 text-brand" />
                Secure checkout · M-Pesa, Card & Apple Pay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-background p-3 shadow-lift lg:hidden">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subtotal</span>
          <span className="font-display text-lg font-extrabold">{formatMoney(total)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={totalQty === 0}
            className="rounded-full border-2 border-foreground py-3 text-xs font-bold uppercase tracking-wider transition disabled:opacity-40"
          >
            Add to cart
          </button>
          <button
            onClick={handleQuickBuy}
            disabled={totalQty === 0}
            className="rounded-full bg-brand py-3 text-xs font-bold uppercase tracking-wider text-brand-foreground transition disabled:opacity-40"
          >
            Quick buy
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}
