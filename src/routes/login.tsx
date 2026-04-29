import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Login — Pulse" },
      { name: "description", content: "Sign in to Pulse to manage your tickets and orders." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: (redirect ?? "/tickets") as string });
  };

  return (
    <SiteLayout>
      <section className="bg-warm py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Welcome back</p>
            <h1 className="mt-2 font-display text-5xl font-extrabold leading-[0.95] text-balance lg:text-6xl">
              Your tickets. Your merch. All in one pocket.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              Log in to see your tickets, track your merch drops and get early access to shows before they sell out.
            </p>
            <div className="mt-10 rounded-3xl bg-foreground p-6 text-background shadow-lift">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">Next up</div>
              <div className="mt-2 font-display text-2xl font-bold">TTNT 6 — The Live Concert</div>
              <div className="mt-1 text-sm text-background/70">Sat, 1 Aug · Carnivore Grounds</div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="rounded-3xl bg-card p-8 shadow-card"
          >
            <h2 className="font-display text-3xl font-extrabold">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use your email and password.</p>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</span>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@pulse.live"
                    className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</span>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-bold text-background transition hover:opacity-90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to Pulse?{" "}
              <Link to="/signup" className="font-bold text-foreground underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </motion.form>
        </div>
      </section>
    </SiteLayout>
  );
}
