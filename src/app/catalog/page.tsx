import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { CTASection } from "@/components/CTASection";
import { SectionTitle } from "@/components/SectionTitle";
import { categories, products } from "@/data/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Katalog Kebaya",
  description: `Koleksi kebaya rental dari ${site.name}: koloses Jawa, kolos modern, baju kurung, dan kelengkapan adat. Filter per kategori, tanya langsung lewat WhatsApp.`,
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <section className="border-b border-base-300">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionTitle
            eyebrow="Katalog"
            title="Semua kebaya, satu tempat."
            description="Ringkasan koleksi dan harga awal. Ceritakan acara Anda lewat WhatsApp, nanti kami bantu pilihkan yang paling pas."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <CatalogGrid products={products} categories={categories} />
      </section>

      <CTASection
        title="Belum yakin pilih yang mana?"
        description="Ceritakan acara dan tanggalnya, kami bantu pilihkan kebaya yang paling pas."
      />
    </>
  );
}
