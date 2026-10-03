import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/catalog/${product.id}`}
        className="block overflow-hidden border border-base-300 bg-base-200"
      >
        <div className="relative aspect-3/4 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={`${product.name} — kebaya ${product.category.toLowerCase()}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 pt-5">
        <h3 className="font-serif text-lg leading-snug text-primary">
          <Link href={`/catalog/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        <p className="text-[0.65rem] tracking-[0.25em] uppercase text-base-content/50">
          {product.category}
        </p>

        <p className="text-sm leading-relaxed text-base-content/75">
          {product.description}
        </p>

        <p className="text-sm text-base-content/80">{product.material}</p>

        <p className="mt-1 font-serif text-base text-primary">
          {product.priceLabel}
        </p>

        <div className="mt-auto pt-2">
          <WhatsAppButton
            name={product.name}
            variant="ghost"
            className="w-full px-4 py-2.5"
          />
        </div>
      </div>
    </article>
  );
}
