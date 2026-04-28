import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Pulse" },
      { name: "description", content: "The terms that govern your use of Pulse tickets and merch." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Legal</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: 28 April 2026</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
            <Section title="1. Who we are">
              Pulse is an online marketplace where event organizers sell tickets and official merchandise.
              Pulse provides the platform, payments and ticket delivery. The event organizer listed on each
              event page is the seller of the ticket and the merchandise and is responsible for the event
              itself, admission policies and product fulfillment.
            </Section>

            <Section title="2. Your account">
              You must be at least 18 years old (or the age of majority in your country) to create a Pulse
              account. Keep your password safe — you are responsible for any activity on your account.
              Don't share accounts, bots, or scripts, and don't attempt to scrape, resell or re-price
              tickets outside Pulse.
            </Section>

            <Section title="3. Buying tickets">
              Prices are shown in the currency displayed at checkout. A non-refundable service fee is added
              on top of the face value. A ticket is only valid once payment is fully captured and the QR code
              is issued to your email and your Pulse account. Each QR code scans once — the first valid scan
              admits one person.
            </Section>

            <Section title="4. Buying merch">
              Merchandise is shipped by the organizer. Estimated delivery is 3–14 working days depending on
              the destination. Sizes, colours and print placement are approximate. If an item arrives
              defective or the wrong size was shipped, contact us within 7 days of delivery.
            </Section>

            <Section title="5. Event changes & cancellations">
              If an event is postponed, rescheduled or moved to a new venue, your ticket remains valid for
              the new date unless we tell you otherwise. If an event is cancelled by the organizer, you are
              entitled to a refund of the ticket face value per our Refund Policy.
            </Section>

            <Section title="6. Your behaviour at events">
              Organizers and venues may refuse entry or eject anyone breaching venue rules, local law, or
              health & safety guidance. No refunds are due where entry is refused for this reason.
            </Section>

            <Section title="7. Intellectual property">
              All logos, artwork and merch designs on Pulse remain the property of their respective artists
              and organizers. You may not reproduce, resell or redistribute them without written permission.
            </Section>

            <Section title="8. Liability">
              To the maximum extent permitted by law, Pulse's liability for any claim related to a ticket or
              merch item is limited to the amount you paid for that item. Pulse is not responsible for the
              content, safety or conduct of an event, which is the responsibility of the organizer.
            </Section>

            <Section title="9. Changes to these terms">
              We may update these terms from time to time. If we make material changes we'll notify you by
              email or in-app. Continued use of Pulse after a change means you accept the updated terms.
            </Section>

            <Section title="10. Contact">
              Questions? Email <a className="font-bold underline" href="mailto:support@pulse.live">support@pulse.live</a>.
            </Section>
          </div>

          <div className="mt-12 flex gap-3">
            <Link to="/refunds" className="rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background">Refund policy</Link>
            <Link to="/privacy" className="rounded-full border-2 border-foreground px-5 py-3 text-sm font-bold">Privacy</Link>
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
