import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Events } from "@/components/landing/Events";
import { Escapes } from "@/components/landing/Escapes";
import { Destinations } from "@/components/landing/Destinations";
import { Streams } from "@/components/landing/Streams";
import { Insider } from "@/components/landing/Insider";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Events, tickets, hotels & travel in one place" },
      {
        name: "description",
        content:
          "Buy tickets to live events, book hotels, plan travel, and stream shows live. Pulse is the all-in-one event & travel platform.",
      },
      { property: "og:title", content: "Pulse — Events, tickets, hotels & travel" },
      {
        property: "og:description",
        content: "Tickets, stays, streams and travel — all in one platform.",
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
        <Escapes />
        <Destinations />
        <Streams />
        <Insider />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
