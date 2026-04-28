import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ShieldCheck, Clock, XCircle, RefreshCw, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund policy — Pulse" },
      { name: "description", content: "How refunds work for Pulse tickets and merchandise." },
    ],
  }),
  component: RefundsPage,
});

function RefundsPage() {
  return (
    <SiteLayout>
      <section className="bg-warm py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Refund policy</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold">Fair, fast refunds.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We keep the process simple. Here's exactly when you're entitled to a refund and how long it takes.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Card icon={<CheckCircle2 className="h-5 w-5 text-accent" />} title="Event cancelled">
              Full refund of the ticket face value, automatically, within 7 working days.
            </Card>
            <Card icon={<Clock className="h-5 w-5 text-accent" />} title="Event rescheduled">
              Your ticket is valid for the new date. If you can't attend, request a refund within 14 days of the announcement.
            </Card>
            <Card icon={<RefreshCw className="h-5 w-5 text-accent" />} title="Merch return">
              Unused, unworn items can be returned within 14 days of delivery for a full refund minus return shipping.
            </Card>
            <Card icon={<XCircle className="h-5 w-5 text-accent" />} title="Non-refundable">
              Service fees and tickets to events that went ahead as scheduled are non-refundable.
            </Card>
          </div>

          <div className="mt-12 space-y-8 text-[15px] leading-relaxed">
            <Block title="How to request a refund">
              <ol className="ml-5 list-decimal space-y-2">
                <li>Open the order on <Link to="/tickets" className="font-bold underline">My tickets</Link>.</li>
                <li>Tap <b>Request refund</b> and choose a reason.</li>
                <li>We'll email you confirmation within 24 hours. Funds land back on the original payment method in 5–10 working days.</li>
              </ol>
            </Block>

            <Block title="When we issue a refund automatically">
              <ul className="ml-5 list-disc space-y-2">
                <li>The organizer cancels the event.</li>
                <li>We detect a duplicate charge on your card or M-Pesa.</li>
                <li>Your order was flagged by fraud review and could not be fulfilled.</li>
              </ul>
            </Block>

            <Block title="Service fees">
              The 5% service fee shown at checkout covers payment processing, ticket delivery and customer
              support. It is non-refundable, except where refund is required by law or where Pulse has made
              an error.
            </Block>

            <Block title="Chargebacks">
              Please contact us before filing a chargeback with your bank. We're almost always faster. If a
              chargeback is filed for a legitimate purchase we reserve the right to cancel the ticket and any
              future orders on your account.
            </Block>

            <Block title="Contact">
              Email <a className="font-bold underline" href="mailto:refunds@pulse.live">refunds@pulse.live</a>
              {" "}with your order ID and we'll jump on it.
            </Block>
          </div>

          <div className="mt-12 flex items-center gap-3 rounded-2xl bg-foreground p-5 text-background">
            <ShieldCheck className="h-8 w-8 text-brand" />
            <div className="text-sm">
              <div className="font-display text-lg font-bold">Pulse Buyer Protection</div>
              <div className="text-background/70">Every purchase is covered. If something goes wrong, we make it right.</div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
