import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-base-300 bg-base-200/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg tracking-[0.18em] text-primary uppercase">
            {site.name}
          </p>
          <p className="mt-1 text-[0.55rem] tracking-[0.35em] uppercase text-base-content/70">
            {site.tagline}
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-base-content/70">
            {site.description}
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-base-content/70">
            Halaman
          </p>
          <ul className="mt-5 space-y-3">
            {[
              { href: "/", label: "Beranda" },
              { href: "/catalog", label: "Katalog" },
              { href: "/contact", label: "Kontak" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-base-content/75 transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-base-content/70">
            Kunjungi
          </p>
          <p className="mt-5 text-sm leading-relaxed text-base-content/75">
            {site.location}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/75 transition-colors duration-300 hover:text-primary"
              >
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/75 transition-colors duration-300 hover:text-primary"
              >
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-base-300/60">
        <p className="mx-auto max-w-7xl px-5 py-6 text-[0.65rem] tracking-[0.15em] text-base-content/70 uppercase sm:px-8">
          © {new Date().getFullYear()} {site.legalName}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
