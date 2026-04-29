import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { listMyOrders, type DBOrder } from "@/lib/orders";
import { Loader2, User as UserIcon, Mail, Phone, LogOut, Ticket, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Pulse" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ display_name: string | null; phone: string | null } | null>(null);
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [busy, setBusy] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: "/account" } });
      return;
    }
    (async () => {
      const [{ data: p }, list] = await Promise.all([
        supabase.from("profiles").select("display_name, phone").eq("user_id", user.id).maybeSingle(),
        listMyOrders(),
      ]);
      setProfile(p ?? { display_name: "", phone: "" });
      setOrders(list);
      setPageReady(true);
    })();
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
  if (!user) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: profile.display_name, phone: profile.phone })
      .eq("user_id", user.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  };

  return (
    <SiteLayout>
      <section className="bg-warm py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Your account</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Hi, {profile?.display_name || user.email?.split("@")[0]}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            </div>
            <button
              onClick={async () => { await signOut(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-4 py-2 text-sm font-bold transition hover:bg-foreground hover:text-background"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={save} className="rounded-3xl bg-card p-6 shadow-card">
              <h2 className="font-display text-xl font-extrabold">Profile</h2>
              <div className="mt-5 space-y-4">
                <Field icon={<UserIcon className="h-4 w-4" />} label="Display name">
                  <input
                    value={profile?.display_name ?? ""}
                    onChange={(e) => setProfile((p) => ({ ...(p ?? { display_name: "", phone: "" }), display_name: e.target.value }))}
                    placeholder="Jamie Doe"
                    className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  />
                </Field>
                <Field icon={<Mail className="h-4 w-4" />} label="Email">
                  <input value={user.email ?? ""} readOnly className="w-full bg-transparent py-3 text-sm text-muted-foreground focus:outline-none" />
                </Field>
                <Field icon={<Phone className="h-4 w-4" />} label="Phone">
                  <input
                    value={profile?.phone ?? ""}
                    onChange={(e) => setProfile((p) => ({ ...(p ?? { display_name: "", phone: "" }), phone: e.target.value }))}
                    placeholder="+254 712 345 678"
                    className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
              </button>
            </form>

            <div className="rounded-3xl bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold">Recent orders</h2>
                <Link to="/tickets" className="text-xs font-bold uppercase tracking-wider text-brand hover:opacity-80">View all →</Link>
              </div>
              {orders.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-muted p-6 text-center">
                  <Ticket className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No orders yet.</p>
                  <Link to="/events" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-foreground underline">
                    Browse events <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <ul className="mt-5 space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <li key={o.id}>
                      <Link
                        to="/tickets/$orderId"
                        params={{ orderId: o.order_number }}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 p-4 transition hover:bg-muted"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{o.order_number}</div>
                          <div className="mt-0.5 text-sm font-semibold">{new Date(o.created_at).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm font-bold">${(o.total_cents / 100).toFixed(2)}</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-accent">{o.status}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 text-muted-foreground">
        {icon}
        {children}
      </div>
    </label>
  );
}
