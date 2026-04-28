import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { orders, type TicketRecord } from "@/lib/cart";
import { formatMoney } from "@/lib/data";
import { CheckCircle2, Download, Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";

export const Route = createFileRoute("/tickets/$orderId")({
  head: () => ({ meta: [{ title: "Your ticket — Pulse" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<TicketRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrder(orders.get(orderId));
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center text-sm text-muted-foreground">Loading...</div>
      </SiteLayout>
    );
  }
  if (!order) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl py-32 text-center">
          <h1 className="font-display text-4xl font-extrabold">Order not found</h1>
          <Link to="/tickets" className="mt-4 inline-block text-sm font-bold underline">My tickets</Link>
        </div>
      </SiteLayout>
    );
  }

  const tickets = order.items.filter((i) => i.kind === "ticket");
  const merch = order.items.filter((i) => i.kind === "merch");

  return (
    <SiteLayout>
      <section className="bg-warm py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl bg-card p-5 shadow-card"
          >
            <CheckCircle2 className="h-6 w-6 text-accent" />
            <div>
              <h1 className="font-display text-xl font-bold">Payment successful</h1>
              <p className="text-xs text-muted-foreground">Order {order.orderId} · {formatMoney(order.total)}</p>
            </div>
          </motion.div>

          {tickets.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * (i + 1) }}
              className="mt-6 overflow-hidden rounded-3xl bg-foreground text-background shadow-lift"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-background/10 px-6 py-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                  <TicketIcon className="h-4 w-4" /> Pulse ticket
                </div>
                <div className="text-xs text-background/60">{t.qty} × {t.tierName}</div>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h2 className="font-display text-3xl font-extrabold leading-tight">{t.eventTitle}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-background/80">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" />{t.eventDate}</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" />{t.eventVenue}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                    <InfoBox label="Tier" value={t.tierName ?? ""} />
                    <InfoBox label="Qty" value={String(t.qty)} />
                    <InfoBox label="Paid" value={formatMoney(t.price * t.qty)} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-2xl bg-background p-3">
                    <QRBlock seed={`${order.orderId}-${t.key}`} />
                  </div>
                  <div className="font-mono text-[10px] text-background/60">
                    {order.orderId}-{t.tierId?.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-background/10 bg-background/5 px-6 py-4">
                <p className="text-xs text-background/60">Show this QR at the gate. Screenshots accepted.</p>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-foreground"
                >
                  <Download className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            </motion.div>
          ))}

          {merch.length > 0 && (
            <div className="mt-8 rounded-2xl bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold">Merch in this order</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {merch.map((m) => (
                  <li key={m.key} className="flex items-center gap-3">
                    {m.productImg && <img src={m.productImg} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                    <div className="flex-1">
                      <div className="font-semibold">{m.productName}</div>
                      <div className="text-xs text-muted-foreground">Size {m.size} · Qty {m.qty}</div>
                    </div>
                    <div className="font-mono text-sm">{formatMoney(m.price * m.qty)}</div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">Ships in 3–5 working days to the address on file.</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/tickets" className="rounded-full border-2 border-foreground px-5 py-3 text-sm font-bold">All my tickets</Link>
            <Link to="/events" className="rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background">Find another show</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/5 p-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-background/50">{label}</div>
      <div className="mt-0.5 truncate text-sm font-bold">{value}</div>
    </div>
  );
}

function QRBlock({ seed }: { seed: string }) {
  // Deterministic faux-QR pattern from seed — purely visual
  const size = 17;
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  // Fixed finder corners
  const isFinder = (x: number, y: number) => {
    const c = (cx: number, cy: number) =>
      x >= cx && x < cx + 7 && y >= cy && y < cy + 7 &&
      (x === cx || x === cx + 6 || y === cy || y === cy + 6 ||
        (x >= cx + 2 && x <= cx + 4 && y >= cy + 2 && y <= cy + 4));
    return c(0, 0) || c(size - 7, 0) || c(0, size - 7);
  };
  const inFinderBox = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${size}, 6px)`, gap: 0 }}
      aria-label="Ticket QR code"
    >
      {Array.from({ length: size * size }, (_, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        const on = inFinderBox(x, y) ? isFinder(x, y) : cells[i];
        return <div key={i} style={{ width: 6, height: 6, background: on ? "#111" : "transparent" }} />;
      })}
    </div>
  );
}
