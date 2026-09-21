import type { EventItem, TicketTier } from "@/lib/data";

export type Seat = {
  id: string;
  label: string;
  row: string;
  num: number;
  x: number;
  y: number;
  tierId: string;
  taken: boolean;
};

export type SeatSection = {
  id: string;
  name: string;
  tierId: string;
  price: number;
  seats: Seat[];
  /** bounding box for the section label */
  labelX: number;
  labelY: number;
};

export type SeatMap = {
  sections: SeatSection[];
  width: number;
  height: number;
  stageLabel: string;
};

const ROW_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export const SEAT_SIZE = 16;
const PITCH = 22;
const ROW_PITCH = 24;
const AISLE = 34;

/** deterministic pseudo random in [0,1) from a string */
function hash01(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

/** How many rows / seats a tier gets on the map. */
function shapeFor(tier: TicketTier, index: number) {
  if (/table|family/i.test(tier.name)) return { rows: 3, perRow: 12 };
  if (/vip|premium|front/i.test(tier.name)) return { rows: 3, perRow: 14 };
  if (index === 0) return { rows: 6, perRow: 20 };
  return { rows: 5, perRow: 18 };
}

export function buildSeatMap(event: EventItem): SeatMap {
  const width = 900;
  let y = 150;
  const sections: SeatSection[] = [];

  event.tiers.forEach((tier, ti) => {
    const { rows, perRow } = shapeFor(tier, ti);
    const half = Math.ceil(perRow / 2);
    const rowWidth = perRow * PITCH + AISLE;
    const startX = (width - rowWidth) / 2 + SEAT_SIZE / 2;
    const seats: Seat[] = [];
    const sectionTop = y;

    // scarcity: fewer remaining seats => more taken on the map
    const takenPct = Math.min(0.55, Math.max(0.08, 1 - tier.remaining / (rows * perRow * 6)));

    for (let r = 0; r < rows; r++) {
      const rowLetter = ROW_LETTERS[(ti * 7 + r) % ROW_LETTERS.length]!;
      // gentle arc — outer seats sit slightly further from the stage
      for (let s = 0; s < perRow; s++) {
        const offsetFromCenter = s - (perRow - 1) / 2;
        const arc = (offsetFromCenter / perRow) ** 2 * 46;
        const x = startX + s * PITCH + (s >= half ? AISLE : 0);
        const seatY = y + r * ROW_PITCH + arc;
        const id = `${tier.id}-${rowLetter}${s + 1}`;
        seats.push({
          id,
          label: `${rowLetter}${s + 1}`,
          row: rowLetter,
          num: s + 1,
          x,
          y: seatY,
          tierId: tier.id,
          taken: hash01(event.id + id) < takenPct,
        });
      }
    }

    sections.push({
      id: tier.id,
      name: tier.name,
      tierId: tier.id,
      price: tier.price,
      seats,
      labelX: startX - 26,
      labelY: sectionTop + (rows * ROW_PITCH) / 2,
    });

    y += rows * ROW_PITCH + 62;
  });

  return {
    sections,
    width,
    height: y + 20,
    stageLabel: /sport/i.test(event.category) ? "PITCH" : "STAGE",
  };
}

export function findSeat(map: SeatMap, id: string) {
  for (const s of map.sections) {
    const seat = s.seats.find((x) => x.id === id);
    if (seat) return { seat, section: s };
  }
  return null;
}

export const MAX_SEATS = 10;
