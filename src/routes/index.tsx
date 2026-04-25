import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Events } from "@/components/landing/Events";
import { Merch } from "@/components/landing/Merch";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Ticketing and merch for live events" },
      {
        name: "description",
        content:
          "Sell tickets, ship merch, and own your audience. Pulse is the modern event platform for artists, promoters and venues.",
      },
      { property: "og:title", content: "Pulse — Ticketing and merch for live events" },
      {
        property: "og:description",
        content: "The ticketing platform artists actually love. Tickets, merch, fans — one fast platform.",
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
        <Features />
        <Events />
        <Merch />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
