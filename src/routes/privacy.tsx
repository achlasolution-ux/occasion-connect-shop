import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Pulse" },
      { name: "description", content: "How Pulse collects, uses and protects your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Legal</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: 28 April 2026</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed">
            <Section title="What we collect">
              Your name, email and phone number for ticket delivery; billing details for payment (processed by our
              PCI-compliant provider — we never store card numbers); and anonymous analytics to improve the product.
            </Section>
            <Section title="How we use it">
              To deliver tickets, ship merch, send order updates, prevent fraud, and — only if you opt in — send
              occasional event recommendations.
            </Section>
            <Section title="Who we share with">
              The event organizer of any event you buy a ticket to (so they can check you in), our payment
              processor, and our shipping partner for merch. Never sold to third-party advertisers.
            </Section>
            <Section title="Your rights">
              Access, correct or delete your data any time by emailing{" "}
              <a className="font-bold underline" href="mailto:privacy@pulse.live">privacy@pulse.live</a>.
            </Section>
            <Section title="Cookies">
              We use strictly necessary cookies to keep you signed in and your bag intact. Optional analytics
              cookies only fire if you accept them.
            </Section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
