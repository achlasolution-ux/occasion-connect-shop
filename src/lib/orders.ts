import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/lib/cart";

export type DBOrder = {
  id: string;
  order_number: string;
  status: string;
  total_cents: number;
  subtotal_cents: number;
  currency: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  created_at: string;
};

export type DBTicket = {
  id: string;
  order_id: string;
  event_id: string;
  event_title: string;
  event_date: string | null;
  event_venue: string | null;
  tier_name: string;
  ticket_code: string;
  status: string;
  image_url: string | null;
  created_at: string;
};

export type DBOrderItem = {
  id: string;
  order_id: string;
  kind: string;
  ref_id: string;
  title: string;
  subtitle: string | null;
  unit_price_cents: number;
  quantity: number;
  image_url: string | null;
};

export async function createOrder(args: {
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  customer: { name: string; email: string; phone: string };
}) {
  const { userId, items, total, subtotal, customer } = args;

  // Insert order
  const { data: order, error: oErr } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_cents: Math.round(total * 100),
      subtotal_cents: Math.round(subtotal * 100),
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
    })
    .select()
    .single();
  if (oErr || !order) throw new Error(oErr?.message ?? "Could not create order");

  // Items
  const orderItems = items.map((i) => ({
    order_id: order.id,
    kind: i.kind,
    ref_id: i.kind === "ticket" ? `${i.eventId}:${i.tierId}` : i.productId ?? "",
    title: i.kind === "ticket" ? i.eventTitle ?? "" : i.productName ?? "",
    subtitle: i.kind === "ticket" ? i.tierName ?? "" : i.size ?? "",
    unit_price_cents: Math.round(i.price * 100),
    quantity: i.qty,
    image_url: i.kind === "merch" ? i.productImg ?? null : null,
  }));
  const { error: iErr } = await supabase.from("order_items").insert(orderItems);
  if (iErr) throw new Error(iErr.message);

  // Tickets — one row per attendee
  const ticketRows = items
    .filter((i) => i.kind === "ticket")
    .flatMap((i) =>
      Array.from({ length: i.qty }, () => ({
        order_id: order.id,
        user_id: userId,
        event_id: i.eventId ?? "",
        event_title: i.eventTitle ?? "",
        event_date: i.eventDate ?? null,
        event_venue: i.eventVenue ?? null,
        tier_name: i.tierName ?? "",
      }))
    );
  if (ticketRows.length > 0) {
    const { error: tErr } = await supabase.from("tickets").insert(ticketRows);
    if (tErr) throw new Error(tErr.message);
  }

  return order as DBOrder;
}

export async function getOrderByNumber(orderNumber: string) {
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (!order) return null;
  const [{ data: items }, { data: tickets }] = await Promise.all([
    supabase.from("order_items").select("*").eq("order_id", order.id),
    supabase.from("tickets").select("*").eq("order_id", order.id),
  ]);
  return {
    order: order as DBOrder,
    items: (items ?? []) as DBOrderItem[],
    tickets: (tickets ?? []) as DBTicket[],
  };
}

export async function listMyOrders() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return (orders ?? []) as DBOrder[];
}

export async function listMyTickets() {
  const { data } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as DBTicket[];
}
