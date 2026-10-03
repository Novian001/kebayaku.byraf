import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  /** Only the first row should load eagerly on the homepage. */
  priorityCount?: number;
};

export function ProductGrid({ products, priorityCount = 0 }: Props) {
  if (products.length === 0) {
    return (
      <p className="border border-base-300 px-6 py-16 text-center text-sm text-base-content/60">
        Belum ada kebaya di kategori ini.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
