import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getProduct, formatMoney, type Product } from "@/lib/data";
import { cart } from "@/lib/cart";
import { Minus, Plus, ShoppingBag, Truck, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/merch/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Pulse` },
          { name: "description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-4xl font-extrabold">Product not found</h1>
        <Link to="/merch" className="mt-4 inline-block text-sm font-bold underline">Shop merch</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  const addToCart = (goCheckout: boolean) => {
    cart.add({
      kind: "merch",
      productId: product.id,
      productName: product.name,
      productImg: product.img,
      size,
      price: product.price,
      qty,
    });
    if (goCheckout) navigate({ to: "/checkout" });
    else navigate({ to: "/cart" });
  };

  return (
    <SiteLayout>
      <section className="bg-warm py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link to="/merch" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← All merch
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-card shadow-card"
            >
              <img src={product.img} alt={product.name} className="aspect-square h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{product.type}</span>
              <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{product.artist}</p>

              <div className="mt-6 font-display text-3xl font-extrabold">{formatMoney(product.price)}</div>

              <p className="mt-6 text-muted-foreground">{product.description}</p>

              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-14 rounded-full border-2 border-foreground px-4 py-2 text-sm font-bold transition ${
                        size === s ? "bg-foreground text-background" : "hover:bg-foreground hover:text-background"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-foreground p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground hover:text-background"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground hover:text-background"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => addToCart(false)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 text-sm font-bold transition hover:bg-foreground hover:text-background"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to bag
                </button>
                <button
                  onClick={() => addToCart(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition hover:opacity-90"
                >
                  Buy now
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Ships in 3–5 days</div>
                <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-accent" /> 14-day returns</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
