import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/events" });
            }}
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-bold text-background transition hover:opacity-90"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </button>

            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-wider text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-foreground py-3 text-sm font-bold text-foreground transition hover:bg-foreground hover:text-background"
            >
              Continue with Google
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
