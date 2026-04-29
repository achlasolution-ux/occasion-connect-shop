import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Pulse" },
      { name: "description", content: "Join Pulse to buy tickets and shop official event merch." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setBusy(true);
    const { error } = await signUp(form.email, form.password, form.name);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Account created — check your email to confirm, then sign in.");
    navigate({ to: "/login" });
  };

  return (
    <SiteLayout>
      <section className="bg-warm py-16 sm:py-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="rounded-3xl bg-card p-8 shadow-card"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Get started</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold">Create your Pulse account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tickets, merch and drops — all in one place.</p>

            <div className="mt-8 space-y-4">
              <Field icon={<User className="h-4 w-4 text-muted-foreground" />} label="Full name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  placeholder="Jamie Doe"
                />
              </Field>
              <Field icon={<Mail className="h-4 w-4 text-muted-foreground" />} label="Email">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  placeholder="you@pulse.live"
                />
              </Field>
              <Field icon={<Lock className="h-4 w-4 text-muted-foreground" />} label="Password">
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-transparent py-3 text-sm focus:outline-none"
                  placeholder="At least 8 characters"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-bold text-background transition hover:opacity-90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already a member?{" "}
              <Link to="/login" className="font-bold text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3">
        {icon}
        {children}
      </div>
    </label>
  );
}
