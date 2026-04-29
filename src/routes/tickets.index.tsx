import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { listMyOrders, listMyTickets, type DBOrder, type DBTicket } from "@/lib/orders";
import { useEffect, useState } from "react";
import { Ticket, ArrowRight, Calendar, MapPin, Loader2 } from "lucide-react";

export const Route = createFileRoute("/tickets/")({
  head: () => ({ meta: [{ title: "My tickets — Pulse" }] }),
  component: TicketsPage,
});

function TicketsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [tickets, setTickets] = useState<DBTicket[]>([]);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: "/tickets" } });
      return;
    }
    Promise.all([listMyOrders(), listMyTickets()]).then(([o, t]) => {
      setOrders(o);
      setTickets(t);
      setPageReady(true);
    });
  }, [user, loading, navigate]);

  if (loading || !pageReady) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </SiteLayout>
    );
  }

  const upcoming = tickets;

  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">My tickets</h1>
          <p className="mt-1 text-sm text-muted-foreground">All your orders, ready at the gate.</p>

          {upcoming.length === 0 && orders.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-card p-10 text-center shadow-card">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                <Ticket className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold">No tickets yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your purchases will appear here.</p>
              <Link
                to="/events"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background"
              >
                Browse events <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Tickets</h2>
                  <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                    {upcoming.map((t) => {
                      const orderNumber = orders.find((o) => o.id === t.order_id)?.order_number;
                      return (
                        <li key={t.id}>
                          <Link
                            to="/tickets/$orderId"
                            params={{ orderId: orderNumber ?? "" }}
                            className="group block rounded-2xl bg-foreground p-5 text-background shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-xs font-bold uppercase tracking-wider text-brand">{t.tier_name}</div>
                              <div className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">{t.status}</div>
                            </div>
                            <div className="mt-2 font-display text-xl font-extrabold leading-tight">{t.event_title}</div>
                            <div className="mt-3 flex flex-wrap gap-3 text-xs text-background/70">
                              {t.event_date && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{t.event_date}</span>}
                              {t.event_venue && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{t.event_venue}</span>}
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-background/10 pt-3">
                              <span className="font-mono text-[11px] text-background/60">{t.ticket_code}</span>
                              <span className="text-xs font-bold text-brand group-hover:translate-x-1 transition">View →</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="mt-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">All orders</h2>
                <ul className="mt-3 space-y-3">
                  {orders.map((o) => (
                    <li key={o.id}>
                      <Link
                        to="/tickets/$orderId"
                        params={{ orderId: o.order_number }}
                        className="group flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold uppercase tracking-wider text-accent">{o.order_number}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold">${(o.total_cents / 100).toFixed(2)}</span>
                          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
