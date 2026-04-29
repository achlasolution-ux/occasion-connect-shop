import { useSyncExternalStore } from "react";

export type CartItem = {
  key: string;
  kind: "ticket" | "merch";
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventVenue?: string;
  tierId?: string;
  tierName?: string;
  productId?: string;
  productName?: string;
  productImg?: string;
  size?: string;
  price: number;
  qty: number;
};

const KEY = "pulse.cart.v1";
const isBrowser = typeof window !== "undefined";

let state: CartItem[] = [];
const listeners = new Set<() => void>();

function load(): CartItem[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}
function persist() {
  if (!isBrowser) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
function emit() {
  listeners.forEach((l) => l());
}

if (isBrowser) state = load();

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function getSnapshot() {
  return state;
}
const EMPTY: CartItem[] = [];
function getServerSnapshot() {
  return EMPTY;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const cart = {
  add(item: Omit<CartItem, "key"> & { key?: string }) {
    const key = item.key ?? `${item.kind}:${item.eventId ?? ""}:${item.tierId ?? ""}:${item.productId ?? ""}:${item.size ?? ""}`;
    const idx = state.findIndex((i) => i.key === key);
    if (idx >= 0) {
      state = state.map((i, n) => (n === idx ? { ...i, qty: i.qty + item.qty } : i));
    } else {
      state = [...state, { ...item, key }];
    }
    persist();
    emit();
  },
  remove(key: string) {
    state = state.filter((i) => i.key !== key);
    persist();
    emit();
  },
  setQty(key: string, qty: number) {
    if (qty <= 0) return cart.remove(key);
    state = state.map((i) => (i.key === key ? { ...i, qty } : i));
    persist();
    emit();
  },
  clear() {
    state = [];
    persist();
    emit();
  },
  get items() {
    return state;
  },
  total() {
    return state.reduce((s, i) => s + i.price * i.qty, 0);
  },
  count() {
    return state.reduce((s, i) => s + i.qty, 0);
  },
};

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}
export function cartCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}

export type TicketRecord = {
  orderId: string;
  createdAt: string;
  buyerName: string;
  buyerEmail: string;
  items: CartItem[];
  total: number;
};

const ORDERS_KEY = "pulse.orders.v1";

export const orders = {
  save(order: TicketRecord) {
    if (!isBrowser) return;
    const raw = localStorage.getItem(ORDERS_KEY);
    const list: TicketRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  },
  get(orderId: string): TicketRecord | null {
    if (!isBrowser) return null;
    const raw = localStorage.getItem(ORDERS_KEY);
    const list: TicketRecord[] = raw ? JSON.parse(raw) : [];
    return list.find((o) => o.orderId === orderId) ?? null;
  },
  list(): TicketRecord[] {
    if (!isBrowser) return [];
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  },
};
