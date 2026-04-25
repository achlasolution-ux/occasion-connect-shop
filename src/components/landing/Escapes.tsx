import { Bed, ArrowUpRight } from "lucide-react";
import mtKenya from "@/assets/hotel-mtkenya.jpg";
import naivasha from "@/assets/hotel-naivasha.jpg";
import nanyuki from "@/assets/hotel-nanyuki.jpg";

const hotels = [
  {
    name: "Fairmont Mount Kenya",
    location: "Nanyuki",
    guests: "2 Guests · 1 Bed",
    price: "KES 24,500",
    img: mtKenya,
  },
  {
    name: "Sarova Maiyan",
    location: "Nanyuki",
    guests: "1 Guest · 1 Bed",
    price: "KES 1,080",
    img: nanyuki,
  },
  {
    name: "Enashipai Resort & Spa",
    location: "Naivasha",
    guests: "1 Guest · 1 Bed",
    price: "KES 81,000",
    img: naivasha,
  },
];

export function Escapes() {
  return (
    <section id="escapes" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Stay & play
            </p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Pulse Escapes
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Hand-picked hotels and lodges to round out your event weekend.
              Book the show, then book the stay.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground px-5 py-2.5 text-sm font-bold transition hover:bg-foreground hover:text-background"
          >
            More to explore
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {hotels.map((h) => (
            <a
              key={h.name}
              href="#"
              className="group overflow-hidden rounded-3xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">{h.name}</h3>
                    <p className="text-sm text-muted-foreground">{h.location}</p>
                  </div>
                  <Bed className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{h.guests}</span>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      From
                    </div>
                    <div className="font-display text-lg font-bold">{h.price}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
