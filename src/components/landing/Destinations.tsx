import { ArrowUpRight } from "lucide-react";
import zanzibar from "@/assets/dest-zanzibar.jpg";
import capetown from "@/assets/dest-capetown.jpg";
import greece from "@/assets/dest-greece.jpg";
import egypt from "@/assets/dest-egypt.jpg";
import malaysia from "@/assets/dest-malaysia.jpg";

const destinations = [
  { name: "Zanzibar", days: "5 Days", price: "USD 560", img: zanzibar },
  { name: "Cape Town", days: "6 Days", price: "USD 970", img: capetown },
  { name: "Santorini", days: "5 Days", price: "USD 1,899", img: greece },
  { name: "Egypt", days: "7 Days", price: "USD 1,565", img: egypt },
  { name: "Malaysia", days: "5 Days", price: "USD 470", img: malaysia },
];

export function Destinations() {
  return (
    <section id="destinations" className="bg-foreground py-20 text-background sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Top destinations
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-5xl">
              Pick a vibe. Pack a bag. <span className="italic text-brand">Go.</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground transition hover:opacity-90"
          >
            Explore all
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {destinations.map((d, i) => (
            <a
              key={d.name}
              href="#"
              className={`group relative block overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`${i === 0 ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-[3/4]"} overflow-hidden`}>
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand">
                  {d.days}
                </div>
                <div className="font-display text-xl font-bold sm:text-2xl">
                  {d.name}
                </div>
                <div className="mt-1 text-sm text-background/80">From {d.price}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
