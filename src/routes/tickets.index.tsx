import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { orders } from "@/lib/cart";
import { useEffect, useState } from "react";
import { Ticket, ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/data";
import type { TicketRecord } from "@/lib/cart";

export const Route = createFileRoute("/tickets/")({
  head: () => ({ meta: [{ title: "My tickets — Pulse" }] }),
  component: TicketsPage,
});

function TicketsPage() {
  const [list, setList] = useState<TicketRecord[]>([]);
  useEffect(() => {
    setList(orders.list());
  }, []);

  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold">My tickets</h1>
          <p className="mt-1 text-sm text-muted-foreground">All your orders, ready at the gate.</p>

          {list.length === 0 ? (
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
            <ul className="mt-8 space-y-4">
              {list.map((o) => {
                const tickets = o.items.filter((i) => i.kind === "ticket");
                const merch = o.items.filter((i) => i.kind === "merch");
                return (
                  <li key={o.orderId}>
                    <Link
                      to="/tickets/$orderId"
                      params={{ orderId: o.orderId }}
                      className="group flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-accent">Order {o.orderId}</div>
                        <div className="mt-1 font-display text-lg font-bold truncate">
                          {tickets[0]?.eventTitle ?? merch[0]?.productName ?? "Order"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tickets.length} ticket{tickets.length === 1 ? "" : "s"} · {merch.length} merch item{merch.length === 1 ? "" : "s"} · {formatMoney(o.total)}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
