"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import type { Category, Product } from "@/data/products";

type Props = {
  products: Product[];
  categories: Category[];
};

export function CatalogGrid({ products, categories }: Props) {
  const [active, setActive] = useState<Category | "Semua">("Semua");

  const counts = useMemo(() => {
    const map = new Map<Category | "Semua", number>([["Semua", products.length]]);
    for (const c of categories) {
      map.set(c, products.filter((p) => p.category === c).length);
    }
    return map;
  }, [products, categories]);

  const visible = useMemo(
    () =>
      active === "Semua" ? products : products.filter((p) => p.category === active),
    [products, active],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori"
        className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-base-300 py-5"
      >
        {(["Semua", ...categories] as const).map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className={`text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                isActive
                  ? "text-primary underline decoration-secondary decoration-2 underline-offset-[6px]"
                  : "text-base-content/70 hover:text-primary"
              }`}
            >
              {c}
              <span className="ml-2 text-[0.55rem] text-base-content/70">
                {counts.get(c) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Menampilkan {visible.length} kebaya
      </p>

      <div className="mt-12">
        <ProductGrid products={visible} priorityCount={4} />
      </div>
    </div>
  );
}
