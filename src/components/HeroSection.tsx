import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-base-300">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="animate-fade-rise order-2 lg:order-1">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-secondary">
            {site.tagline}
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
            Kebaya yang terasa
            <span className="block italic text-primary/70">warisan, bukan kostum.</span>
          </h1>
          <div className="rule-gold my-8 w-24" />
          <p className="max-w-lg text-base leading-relaxed text-base-content/75">
            {site.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 text-[0.65rem] tracking-[0.25em] uppercase text-primary-content transition-colors duration-300 hover:bg-transparent hover:text-primary"
            >
              Lihat Koleksi
            </Link>
            <WhatsAppButton
              variant="outline"
              label="Chat WhatsApp"
              className="px-8 py-4"
            />
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-base-300 pt-8">
            {[
              { label: "Koleksi", value: "40+" },
              { label: "Ukuran", value: "S – XXL" },
              { label: "Area", value: "Jabodetabek" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.6rem] tracking-[0.25em] uppercase text-base-content/50">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-serif text-xl text-primary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-4/5 overflow-hidden border border-base-300 shadow-[0_24px_60px_-30px_rgba(13,59,50,0.45)]">
            <Image
              src="/kebaya/1.webp"
              alt={`Kebaya koloses emas dengan bordir sekaten, silhouette ready-to-wear oleh ${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          {/* Gold rule offset behind the frame — editorial detail, no gradient. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 -z-10 h-full w-full border border-secondary/60"
          />
        </div>
      </div>
    </section>
  );
}
