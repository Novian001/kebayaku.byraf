import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { featuredProducts } from "@/data/products";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "Koleksi Pilihan",
    body: "Setiap model dijahit satu per satu, bukan diambil dari gudang yang sama.",
  },
  {
    title: "Banyak Ukuran",
    body: "S sampai XXL, dengan fitting khusus untuk setiap ukuran.",
  },
  {
    title: "Layanan Fitting",
    body: "Jadwal fitting pribadi supaya kebaya pas di badan, bukan pas di rak.",
  },
  {
    title: "Siap Hari Besar",
    body: "Datang bersih dan rapi, tinggal pakai di hari yang Anda tunggu.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <SectionTitle
              eyebrow="Tentang Kami"
              title="Warisan Jawa, dijahit untuk ukuran Anda."
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-base-content/75">
              <p>
                {site.name} tumbuh dari ketenangan keluarga yang mewariskan pola
                jahit koloses Jawa. Bukan produksi massal: setiap kebaya keluar dari
                satu meja potong dan satu penjahit yang perfecting detailnya.
              </p>
              <p>
                Kami melayani siraman, akad nikah, dan hajatan keluarga. Kain
                dipilih karena jatuhannya, bukan karena harganya murah. Ukuran tersedia
                S sampai XXL, dan fitting kami atur khusus untuk Anda.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-base-300 pt-8 sm:grid-cols-3">
              {[
                { value: "40+", label: "Koleksi aktif" },
                { value: "5", label: "Kategori" },
                { value: "S – XXL", label: "Ukuran" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-primary">{stat.value}</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.25em] uppercase text-base-content/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 self-center">
            <div className="relative aspect-3/4 overflow-hidden border border-base-300">
              <Image
                src="/kebaya/2.webp"
                alt="Kebaya kolos modern aksen lurik emas"
                fill
                sizes="(max-width: 1024px) 45vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-10 aspect-3/4 overflow-hidden border border-base-300">
              <Image
                src="/kebaya/3.webp"
                alt="Kebaya koloses motif melati sulam"
                fill
                sizes="(max-width: 1024px) 45vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-base-300 bg-base-200/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Koleksi Pilihan"
              title="Yang paling sering dipesan."
              description="Enam kebaya yang paling sering jadi pilihan untuk siraman dan akad nikah musim ini."
            />
            <Link
              href="/catalog"
              className="border-b border-secondary pb-1 text-[0.65rem] tracking-[0.25em] uppercase text-primary transition-colors duration-300 hover:border-primary"
            >
              Lihat semua koleksi
            </Link>
          </div>

          <div className="mt-14">
            <ProductGrid products={featuredProducts} priorityCount={4} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionTitle
          eyebrow={`Kenapa ${site.name}`}
          title="Empat hal yang kami jaga di setiap sewa."
          align="center"
        />
        <ul className="mt-14 grid gap-px border border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="bg-base-100 p-8">
              <p className="text-[0.6rem] tracking-[0.3em] text-secondary">
                0{i + 1}
              </p>
              <h3 className="mt-4 font-serif text-xl text-primary">{pillar.title}</h3>
              <div className="rule-gold my-5 w-10" />
              <p className="text-sm leading-relaxed text-base-content/70">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CTASection />
    </>
  );
}
