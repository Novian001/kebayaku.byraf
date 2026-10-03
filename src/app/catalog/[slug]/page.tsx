import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProduct, products } from "@/data/products";
import { site } from "@/lib/site";

type Params = { slug: string };

/** Pre-renders one page per product; unknown slugs 404. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Kebaya tidak ditemukan" };

  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.description} ${product.priceLabel}.`,
    alternates: { canonical: `/catalog/${product.id}` },
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.description,
      images: [{ url: product.images[0], width: 900, height: 1200, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-base-content/50">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/catalog" className="transition-colors hover:text-primary">
                Katalog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-primary">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <article className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
        <div className={product.images.length > 1 ? "grid grid-cols-2 gap-4" : ""}>
          {product.images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-3/4 overflow-hidden border border-base-300"
            >
              <Image
                src={src}
                alt={`${product.name} — tampilan ${i + 1}`}
                fill
                priority={i === 0}
                sizes={product.images.length > 1 ? "(max-width: 1024px) 45vw, 25vw" : "(max-width: 1024px) 90vw, 50vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:py-4">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-secondary">
            {product.category}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-primary sm:text-5xl">
            {product.name}
          </h1>
          <div className="rule-gold my-7 w-20" />

          <p className="text-base leading-relaxed text-base-content/75">
            {product.description}
          </p>

          <dl className="mt-10 space-y-5 border-t border-base-300 pt-8 text-sm">
            {product.material ? (
              <div className="flex justify-between gap-6">
                <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-base-content/50">
                  Bahan
                </dt>
                <dd className="text-right text-base-content/80">{product.material}</dd>
              </div>
            ) : null}
            {product.sizes?.length ? (
              <div className="flex justify-between gap-6">
                <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-base-content/50">
                  Ukuran
                </dt>
                <dd className="flex flex-wrap justify-end gap-2">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="border border-base-300 px-3 py-1 text-xs text-base-content/80"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-10 border-t border-base-300 pt-8">
            {product.priceLabel ? (
              <>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-base-content/50">
                  Perkiraan harga sewa
                </p>
                <p className="mt-2 font-serif text-3xl text-primary">
                  {product.priceLabel}
                </p>
              </>
            ) : null}

            <WhatsAppButton name={product.name} className="mt-8 w-full" />
            <p className="mt-4 text-center text-xs text-base-content/50">
              Harga final, ketersediaan, dan fitting kami konfirmasi lewat chat.
            </p>
          </div>
        </div>
      </article>

      <CTASection
        title="Mau lihat pilihan lain?"
        description="Katalog kami punya beberapa versi warna dan ukuran untuk model yang sama."
      />
    </>
  );
}