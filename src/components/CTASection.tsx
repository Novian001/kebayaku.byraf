import { SectionTitle } from "./SectionTitle";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  description?: string;
};

/** Closing conversion block. Reused on every page footer-adjacent. */
export function CTASection({
  title = "Tinggal chat, kami yang carikan yang cocok.",
  description = `Sebutkan acara dan tanggalnya. ${site.name} akan bantu pilihkan kebaya yang paling pas, lalu kita atur fitting-nya.`,
}: Props) {
  return (
    <section className="border-y border-base-300 bg-base-200/50">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <SectionTitle title={title} description={description} align="center" />
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppButton label="Chat WhatsApp" className="w-full sm:w-auto" />
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-content sm:w-auto"
          >
            Lihat Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
