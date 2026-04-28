import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, cart, cartTotal } from "@/lib/cart";
import { formatMoney } from "@/lib/data";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your bag — Pulse" }],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const total = cartTotal(items);
  const subtotalFees = total * 0.05;
  const grandTotal = total + subtotalFees;

  if (items.length === 0) {
    return (
      <SiteLayout>
        <section className="bg-warm py-24">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold">Your bag is empty</h1>
            <p className="mt-2 text-muted-foreground">Find a show or a fresh drop.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/events" className="rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background">
                Browse events
              </Link>
              <Link to="/merch" className="rounded-full border-2 border-foreground px-5 py-3 text-sm font-bold">
                Shop merch
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold">Your bag</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.key} className="flex gap-4 rounded-2xl bg-card p-4 shadow-card sm:p-5">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                    {i.kind === "merch" && i.productImg ? (
                      <img src={i.productImg} alt={i.productName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-foreground text-background">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand">Ticket</span>
                        <span className="mt-1 font-display text-sm font-bold">{i.tierName}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-base font-bold">
                            {i.kind === "ticket" ? i.eventTitle : i.productName}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {i.kind === "ticket"
                              ? `${i.tierName} · ${i.eventDate} · ${i.eventVenue}`
                              : `Size ${i.size}`}
                          </p>
                        </div>
                        <div className="font-display text-lg font-bold">{formatMoney(i.price * i.qty)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border p-1">
                        <button
                          onClick={() => cart.setQty(i.key, i.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-5 text-center text-xs font-bold">{i.qty}</span>
                        <button
                          onClick={() => cart.setQty(i.key, i.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.remove(i.key)}
                        className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl bg-foreground p-6 text-background shadow-lift lg:sticky lg:top-24">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">Summary</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-background/80"><span>Subtotal</span><span>{formatMoney(total)}</span></div>
                <div className="flex justify-between text-background/80"><span>Service fee (5%)</span><span>{formatMoney(subtotalFees)}</span></div>
              </div>
              <div className="my-5 h-px bg-background/10" />
              <div className="flex items-end justify-between">
                <span className="text-xs uppercase tracking-wider text-background/60">Total</span>
                <span className="font-display text-3xl font-extrabold">{formatMoney(grandTotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-brand-foreground transition hover:opacity-90"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <button onClick={() => cart.clear()} className="mt-3 w-full text-xs text-background/60 hover:text-background">
                Clear bag
              </button>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
