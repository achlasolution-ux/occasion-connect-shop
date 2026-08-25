import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Events } from "@/components/landing/Events";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Merch } from "@/components/landing/Merch";
import { Organizers } from "@/components/landing/Organizers";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gateflow — Tickets and merch for live events" },
      {
        name: "description",
        content:
          "Buy tickets to live events and shop official merch from the artists. Gateflow is the all-in-one platform for tickets and tour merch.",
      },
      { property: "og:title", content: "Gateflow — Tickets and merch for live events" },
      {
        property: "og:description",
        content: "Tickets, tees, hoodies — straight from the artist.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Events />
        <HowItWorks />
        <Merch />
        <Organizers />
        <Testimonials />
        <FAQ />
        <CTA />

      </main>
      <Footer />
    </div>
  );
}
