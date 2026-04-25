import zanzibar from "@/assets/dest-zanzibar.jpg";
import capetown from "@/assets/dest-capetown.jpg";
import egypt from "@/assets/dest-egypt.jpg";

const posts = [
  {
    tag: "Travel tips",
    title: "Zambia & Zimbabwe: The dynamic duo of Southern Africa",
    excerpt:
      "Thunderous waterfalls, vast savannahs teeming with wildlife, and warm welcoming locals.",
    img: egypt,
  },
  {
    tag: "City guide",
    title: "Cape Town — The Mother City",
    excerpt:
      "Stunning beaches, towering mountains, and a vibrant culture that's got it all.",
    img: capetown,
  },
  {
    tag: "Karibu Kenya",
    title: "Nairobi: a bustling African metropolis",
    excerpt:
      "An eclectic blend of cosmopolitan culture, nature, and urbanization in one camp.",
    img: zanzibar,
  },
];

export function Insider() {
  return (
    <section className="bg-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              The Insider
            </p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Travel & events insider
            </h2>
          </div>
          <a href="#" className="text-sm font-bold hover:text-accent">
            More to explore →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex text-sm font-bold text-foreground hover:text-accent"
                >
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
