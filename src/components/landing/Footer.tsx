import { Ticket } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "Product", links: ["Tickets", "Merch", "Analytics", "API"] },
    { title: "Organizers", links: ["Pricing", "Onboarding", "Resources", "Status"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ];
  return (
    <footer className="py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-brand)]">
              <Ticket className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-semibold">Pulse</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Ticketing and merch built for the next generation of artists,
            promoters and venues.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-border px-6 pt-8 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Pulse Tickets, Inc.</span>
        <span>Made for fans.</span>
      </div>
    </footer>
  );
}
