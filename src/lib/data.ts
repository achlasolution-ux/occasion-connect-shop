import concert from "@/assets/event-concert.jpg";
import theatre from "@/assets/event-theatre.jpg";
import comedy from "@/assets/event-comedy.jpg";
import sports from "@/assets/event-sports.jpg";
import tee from "@/assets/merch-tee.jpg";
import hoodie from "@/assets/merch-hoodie.jpg";
import cap from "@/assets/merch-cap.jpg";
import tee2 from "@/assets/merch-tee2.jpg";

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  perks: string[];
  remaining: number;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  category: "Concert" | "Theatre" | "Sports" | "Live show";
  venue: string;
  city: string;
  dateISO: string;
  dateLabel: { d: string; m: string; full: string };
  time: string;
  img: string;
  about: string;
  tiers: TicketTier[];
  organizer: string;
};

export const events: EventItem[] = [
  {
    id: "ttnt-6",
    slug: "ttnt-6",
    title: "TTNT 6 — The Live Concert",
    tag: "Concert",
    category: "Concert",
    venue: "Carnivore Grounds",
    city: "Nairobi",
    dateISO: "2026-08-01",
    dateLabel: { d: "01", m: "Aug", full: "Sat, 1 Aug 2026" },
    time: "6:00 PM",
    img: concert,
    organizer: "Maitú Live Co.",
    about:
      "The sixth edition of TTNT returns with a bigger stage, new headliners and a rebuilt sound system. Expect three hours of uninterrupted live music across two stages, plus official merch drops printed on-site.",
    tiers: [
      { id: "ga", name: "General Admission", price: 29, perks: ["Standing area", "Re-entry allowed"], remaining: 420 },
      { id: "vip", name: "VIP", price: 79, perks: ["Front-stage pit", "Dedicated bar", "Exclusive tee"], remaining: 64 },
      { id: "table", name: "Table for 4", price: 320, perks: ["Reserved table", "Bottle service", "4 entries"], remaining: 12 },
    ],
  },
  {
    id: "seashell-hum",
    slug: "seashell-hum",
    title: "In the Seashell Hum",
    tag: "Theatre",
    category: "Theatre",
    venue: "Kenya National Theatre",
    city: "Nairobi",
    dateISO: "2026-05-16",
    dateLabel: { d: "16", m: "May", full: "Sat, 16 May 2026" },
    time: "7:30 PM",
    img: theatre,
    organizer: "KNT Productions",
    about:
      "A haunting two-act play about memory, coastline and the sounds we can't unhear. Runtime 95 minutes with a 15 minute interval.",
    tiers: [
      { id: "balcony", name: "Balcony", price: 14, perks: ["Upper tier seat"], remaining: 180 },
      { id: "stalls", name: "Stalls", price: 22, perks: ["Mid-tier seat"], remaining: 120 },
      { id: "prem", name: "Premium", price: 38, perks: ["Front row", "Programme booklet"], remaining: 32 },
    ],
  },
  {
    id: "the-call",
    slug: "the-call",
    title: "The Call — Old School Gospel",
    tag: "Live show",
    category: "Live show",
    venue: "Sarit Expo Centre",
    city: "Nairobi",
    dateISO: "2026-05-31",
    dateLabel: { d: "31", m: "May", full: "Sun, 31 May 2026" },
    time: "4:00 PM",
    img: comedy,
    organizer: "The Call Collective",
    about:
      "An afternoon of old school gospel classics performed by a 24-piece choir and live band. Family-friendly, all ages.",
    tiers: [
      { id: "ga", name: "General", price: 18, perks: ["Open seating"], remaining: 600 },
      { id: "family", name: "Family (4)", price: 60, perks: ["4 entries", "Reserved block"], remaining: 40 },
    ],
  },
  {
    id: "afc-vs-gor",
    slug: "afc-vs-gor",
    title: "AFC Leopards vs Gor Mahia",
    tag: "Sports",
    category: "Sports",
    venue: "Nyayo Stadium",
    city: "Nairobi",
    dateISO: "2026-04-26",
    dateLabel: { d: "26", m: "Apr", full: "Sun, 26 Apr 2026" },
    time: "3:00 PM",
    img: sports,
    organizer: "Premier League KE",
    about: "Mashemeji Derby. 90 minutes plus stoppage. Gates open two hours before kick-off.",
    tiers: [
      { id: "open", name: "Open Terrace", price: 8, perks: ["Standing"], remaining: 4800 },
      { id: "covered", name: "Covered Stand", price: 16, perks: ["Seated", "Covered"], remaining: 900 },
      { id: "vip", name: "VIP Box", price: 55, perks: ["Cushioned seat", "Snacks"], remaining: 60 },
    ],
  },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  artist: string;
  eventId: string;
  type: "T-Shirt" | "Hoodie" | "Cap";
  price: number;
  img: string;
  sizes: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "ttnt-tee",
    slug: "ttnt-tour-tee",
    name: "TTNT 6 Tour Tee",
    artist: "TTNT 6 · Official",
    eventId: "ttnt-6",
    type: "T-Shirt",
    price: 32,
    img: tee,
    sizes: ["S", "M", "L", "XL"],
    description: "Heavyweight 240gsm cotton tee. Front crest, full tour dates on the back. Printed in Nairobi.",
  },
  {
    id: "maitu-hoodie",
    slug: "maitu-cream-hoodie",
    name: "Maitú Cream Hoodie",
    artist: "Maitú · Drop 01",
    eventId: "ttnt-6",
    type: "Hoodie",
    price: 68,
    img: hoodie,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Heavy fleece hoodie with embroidered chest mark. Oversized fit — size down for regular.",
  },
  {
    id: "call-snap",
    slug: "the-call-snapback",
    name: "The Call Blackout Snapback",
    artist: "The Call · Crew",
    eventId: "the-call",
    type: "Cap",
    price: 24,
    img: cap,
    sizes: ["One size"],
    description: "Flat brim snapback with tonal logo. Adjustable strap.",
  },
  {
    id: "sarit-tee",
    slug: "sarit-live-orange-tee",
    name: "Sarit Live Orange Tee",
    artist: "Sarit Live · 2026",
    eventId: "the-call",
    type: "T-Shirt",
    price: 28,
    img: tee2,
    sizes: ["S", "M", "L", "XL"],
    description: "Bold orange tour print. Soft-hand screen print on a 100% cotton body.",
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatMoney = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
