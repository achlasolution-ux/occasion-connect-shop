import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Events } from "@/components/landing/Events";
import { Merch } from "@/components/landing/Merch";
import { Organizers } from "@/components/landing/Organizers";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Tickets and merch for live events" },
      {
        name: "description",
        content:
          "Buy tickets to live events and shop official merch from the artists. Pulse is the all-in-one platform for tickets and tour merch.",
      },
      { property: "og:title", content: "Pulse — Tickets and merch for live events" },
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
        <Events />
        <Merch />
        <Organizers />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
