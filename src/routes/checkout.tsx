import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, cart, cartTotal } from "@/lib/cart";
import { formatMoney } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { createOrder } from "@/lib/orders";
import { ShieldCheck, Smartphone, CreditCard, Apple, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Pulse" }] }),
  component: CheckoutPage,
});

type PayMethod = "mpesa" | "card" | "apple";

function CheckoutPage() {
  const items = useCart();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [method, setMethod] = useState<PayMethod>("mpesa");
  const [form, setForm] = useState({ name: "", email: "", phone: "", card: "", exp: "", cvc: "" });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login", search: { redirect: "/checkout" } });
    }
    if (user) {
      setForm((f) => ({
        ...f,
        email: f.email || user.email || "",
        name: f.name || (user.user_metadata?.display_name as string) || "",
      }));
    }
  }, [user, loading, navigate]);

  const subtotal = cartTotal(items);
  const fees = subtotal * 0.05;
  const total = subtotal + fees;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !user) return;
    setProcessing(true);
    try {
      const order = await createOrder({
        userId: user.id,
        items,
        total,
        subtotal,
        customer: { name: form.name, email: form.email, phone: form.phone },
      });
      cart.clear();
      toast.success("Payment successful");
      navigate({ to: "/tickets/$orderId", params: { orderId: order.order_number } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not complete checkout";
      toast.error(msg);
      setProcessing(false);
    }
  };

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md py-24 text-center">
          <h1 className="font-display text-3xl font-extrabold">Your bag is empty</h1>
          <Link to="/events" className="mt-4 inline-block text-sm font-bold underline">Browse events</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-warm py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Link to="/cart" className="text-xs font-bold uppercase tracking-[0.2em] text-brand hover:opacity-80">
                ← Back to cart
              </Link>
              <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Checkout</h1>
              <p className="mt-1 text-sm text-muted-foreground">Almost there. Review and pay.</p>
            </div>
            <ol className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider sm:flex">
              <li className="flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-background">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-foreground">1</span> Contact
              </li>
              <span className="h-px w-6 bg-foreground/30" />
              <li className="flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-background">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-foreground">2</span> Delivery
              </li>
              <span className="h-px w-6 bg-foreground/30" />
              <li className="flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-background">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-foreground">3</span> Pay
              </li>
            </ol>
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="space-y-8">
              <section className="rounded-2xl bg-card p-6 shadow-card">
                <Step n={1} label="Contact" />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>
              </section>

              <section className="rounded-2xl bg-card p-6 shadow-card">
                <Step n={2} label="Delivery" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Tickets are delivered as QR codes by email and SMS. Merch ships to the address below.
                </p>
                <div className="mt-4">
                  <Input label="Phone (for SMS)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+254 712 345 678" />
                </div>
              </section>

              <section className="rounded-2xl bg-card p-6 shadow-card">
                <Step n={3} label="Payment" />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MethodCard active={method === "mpesa"} onClick={() => setMethod("mpesa")} icon={<Smartphone className="h-5 w-5" />} name="M-Pesa" sub="Instant" />
                  <MethodCard active={method === "card"} onClick={() => setMethod("card")} icon={<CreditCard className="h-5 w-5" />} name="Card" sub="Visa / Mastercard" />
                  <MethodCard active={method === "apple"} onClick={() => setMethod("apple")} icon={<Apple className="h-5 w-5" />} name="Apple Pay" sub="Touch ID" />
                </div>

                <motion.div
                  key={method}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {method === "mpesa" && (
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">
                        You'll receive an STK push on the phone number above to approve payment of <b>{formatMoney(total)}</b>.
                      </p>
                    </div>
                  )}
                  {method === "card" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Input label="Card number" value={form.card} onChange={(v) => setForm({ ...form, card: v })} placeholder="1234 1234 1234 1234" />
                      </div>
                      <Input label="Expiry" value={form.exp} onChange={(v) => setForm({ ...form, exp: v })} placeholder="MM / YY" />
                      <Input label="CVC" value={form.cvc} onChange={(v) => setForm({ ...form, cvc: v })} placeholder="123" />
                    </div>
                  )}
                  {method === "apple" && (
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">Confirm payment with Touch ID or Face ID on the next step.</p>
                    </div>
                  )}
                </motion.div>
                <p className="mt-3 text-[11px] text-muted-foreground">Demo mode — no real charge will be made.</p>
              </section>
            </div>

            <aside className="h-fit rounded-2xl bg-foreground p-6 text-background shadow-lift lg:sticky lg:top-24">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">Order</div>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((i) => (
                  <li key={i.key} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{i.kind === "ticket" ? i.eventTitle : i.productName}</div>
                      <div className="truncate text-xs text-background/60">
                        {i.qty} × {i.kind === "ticket" ? i.tierName : `Size ${i.size}`}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono">{formatMoney(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="my-5 h-px bg-background/10" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-background/80"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                <div className="flex justify-between text-background/80"><span>Service fee</span><span>{formatMoney(fees)}</span></div>
              </div>
              <div className="my-5 h-px bg-background/10" />
              <div className="flex items-end justify-between">
                <span className="text-xs uppercase tracking-wider text-background/60">Total</span>
                <span className="font-display text-3xl font-extrabold">{formatMoney(total)}</span>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-brand-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing</> : <>Pay {formatMoney(total)} <ArrowRight className="h-4 w-4" /></>}
              </button>
              <div className="mt-4 flex items-center gap-2 text-xs text-background/60">
                <ShieldCheck className="h-4 w-4 text-brand" />
                Secured by 256-bit TLS · PCI compliant
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-background/60">
                <Lock className="h-4 w-4 text-brand" />
                Your details are never stored on our servers
              </div>
            </aside>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">{n}</div>
      <h2 className="font-display text-xl font-extrabold">{label}</h2>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm focus:border-foreground focus:outline-none"
      />
    </label>
  );
}

function MethodCard({
  active, onClick, icon, name, sub,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; name: string; sub: string; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${
        active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
      }`}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${active ? "bg-brand text-brand-foreground" : "bg-muted"}`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[11px] opacity-70">{sub}</div>
      </div>
    </button>
  );
}
