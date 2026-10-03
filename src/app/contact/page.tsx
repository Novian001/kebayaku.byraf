import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Alamat atelier, WhatsApp, Instagram, dan jam buka ${site.name}. Kunjungi untuk fitting atau sekadar lihat koleksinya.`,
  alternates: { canonical: "/contact" },
};

const details = [
  {
    label: "Lokasi",
    value: site.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`,
    external: true,
  },
  {
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: `https://wa.me/${site.whatsapp}`,
    external: true,
  },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-base-300">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <SectionTitle
            eyebrow="Kontak"
            title="Mampir, fitting, atau sekadar tanya."
            description="Buka WhatsApp adalah cara tercepat. Kalau mau lihat kainnya langsung, mampir ke atelier; fitting selalu dijadwalkan dulu supaya tidak menunggu."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-20">
        <div>
          <h2 className="font-serif text-2xl text-primary">Kunjungi kami</h2>
          <div className="rule-gold my-6 w-14" />
          <ul className="space-y-6">
            {details.map((item) => (
              <li key={item.label}>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-secondary">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="mt-2 block text-base text-base-content/80 transition-colors duration-300 hover:text-primary"
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <WhatsAppButton label="Chat WhatsApp" className="w-full sm:w-auto" />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-primary">Jam buka</h2>
          <div className="rule-gold my-6 w-14" />
          <table className="w-full text-sm">
            <caption className="sr-only">Jam operasional {site.name}</caption>
            <tbody>
              {site.hours.map((row) => (
                <tr key={row.day} className="border-b border-base-300">
                  <th scope="row" className="py-4 text-left font-normal text-base-content/70">
                    {row.day}
                  </th>
                  <td className="py-4 text-right text-primary">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-12 border border-base-300 bg-base-200/50 p-8">
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-secondary">
              Catatan fitting
            </p>
            <p className="mt-4 text-sm leading-relaxed text-base-content/75">
              Fitting memerlukan waktu sekitar 30–45 menit. Datang dengan kaos dalam
              dan alas kaki yang biasanya Anda pakai, supaya ukurannya bisa kami
              sesuaikan dengan benar.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Sudah punya tanggal acaranya?"
        description="Kirim tanggalnya sekarang, supaya kami bisa menahan kebaya pilihan Anda sebelum keburu dipesan orang lain."
      />
    </>
  );
}
