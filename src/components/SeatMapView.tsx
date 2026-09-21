import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { buildSeatMap, SEAT_SIZE, type Seat, type SeatMap } from "@/lib/seating";
import type { EventItem } from "@/lib/data";
import { formatMoney } from "@/lib/data";

type Props = {
  event: EventItem;
  selected: string[];
  onToggle: (seat: Seat, sectionName: string, price: number) => void;
};

const MIN_ZOOM = 0.45;
const MAX_ZOOM = 3.5;

export function SeatMapView({ event, selected, onToggle }: Props) {
  const map: SeatMap = useMemo(() => buildSeatMap(event), [event]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<{ seat: Seat; price: number; name: string } | null>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const reset = useCallback(() => {
    setZoom(0.8);
    setOffset({ x: 0, y: 0 });
  }, []);

  const view = useRef({ zoom: 0.8, x: 0, y: 0 });
  view.current = { zoom, x: offset.x, y: offset.y };

  const zoomAt = useCallback((factor: (z: number) => number, px: number, py: number) => {
    const { zoom: z, x, y } = view.current;
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, factor(z)));
    const k = next / z;
    setZoom(next);
    setOffset({ x: px - (px - x) * k, y: py - (py - y) * k });
  }, []);

  const wheelRef = useRef<(e: WheelEvent) => void>(() => {});
  wheelRef.current = (e: WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
    zoomAt((z) => z * Math.exp(-dy * 0.0018), px, py);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelRef.current(e);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const stepZoom = (dir: 1 | -1) => {
    const el = containerRef.current;
    const rect = el?.getBoundingClientRect();
    zoomAt((z) => z * (dir === 1 ? 1.25 : 1 / 1.25), (rect?.width ?? 600) / 2, (rect?.height ?? 400) / 2);
  };

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-foreground/10 bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Legend className="bg-brand/70" label="Available" />
          <Legend className="bg-accent" label="Selected" />
          <Legend className="bg-foreground/20" label="Taken" />
        </div>
        <div className="flex items-center gap-1">
          <IconBtn onClick={() => stepZoom(-1)} label="Zoom out"><Minus className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn onClick={() => stepZoom(1)} label="Zoom in"><Plus className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn onClick={reset} label="Reset view"><RotateCcw className="h-3.5 w-3.5" /></IconBtn>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[420px] cursor-grab touch-none bg-[radial-gradient(circle_at_50%_0%,hsl(var(--muted))_0%,transparent_70%)] active:cursor-grabbing sm:h-[520px]"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setOffset({
            x: drag.current.ox + (e.clientX - drag.current.x),
            y: drag.current.oy + (e.clientY - drag.current.y),
          });
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => {
          drag.current = null;
          setHover(null);
        }}
      >
        <svg
          className="h-full w-full select-none"
          viewBox={`0 0 ${map.width} ${map.height}`}
          preserveAspectRatio="xMidYMin meet"
        >
          <g transform={`translate(${offset.x} ${offset.y}) scale(${zoom})`} style={{ transformOrigin: "0 0" }}>
            {/* stage */}
            <path
              d={`M 210 92 Q 450 20 690 92 L 690 104 Q 450 34 210 104 Z`}
              className="fill-foreground"
            />
            <text
              x={450}
              y={78}
              textAnchor="middle"
              className="fill-foreground font-display"
              style={{ fontSize: 26, fontWeight: 800, letterSpacing: 6 }}
            >
              {map.stageLabel}
            </text>

            {map.sections.map((section) => (
              <g key={section.id}>
                <text
                  x={section.labelX}
                  y={section.labelY}
                  textAnchor="middle"
                  transform={`rotate(-90 ${section.labelX} ${section.labelY})`}
                  className="fill-muted-foreground"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}
                >
                  {section.name} · {formatMoney(section.price)}
                </text>
                {section.seats.map((seat) => {
                  const isSelected = selectedSet.has(seat.id);
                  const fill = seat.taken
                    ? "fill-foreground/20"
                    : isSelected
                      ? "fill-accent"
                      : "fill-brand/70 hover:fill-brand";
                  return (
                    <rect
                      key={seat.id}
                      x={seat.x - SEAT_SIZE / 2}
                      y={seat.y - SEAT_SIZE / 2}
                      width={SEAT_SIZE}
                      height={SEAT_SIZE}
                      rx={4}
                      className={`${fill} ${seat.taken ? "cursor-not-allowed" : "cursor-pointer"} transition-colors`}
                      stroke={isSelected ? "currentColor" : "none"}
                      strokeWidth={isSelected ? 2 : 0}
                      onMouseEnter={() => !seat.taken && setHover({ seat, price: section.price, name: section.name })}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => {
                        if (seat.taken) return;
                        onToggle(seat, section.name, section.price);
                      }}
                    />
                  );
                })}
              </g>
            ))}
          </g>
        </svg>

        {hover && (
          <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background shadow-lift">
            {hover.name} · Row {hover.seat.row} Seat {hover.seat.num} · {formatMoney(hover.price)}
          </div>
        )}

        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur">
          Drag to pan · scroll to zoom
        </div>
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded-[3px] ${className}`} />
      {label}
    </span>
  );
}

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-8 w-8 place-items-center rounded-full border-2 border-foreground/15 text-foreground transition hover:border-foreground"
    >
      {children}
    </button>
  );
}
