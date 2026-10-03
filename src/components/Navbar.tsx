"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/catalog", label: "Katalog" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/85 backdrop-blur-md">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link href="/" className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-serif text-base tracking-[0.15em] text-primary uppercase sm:text-xl sm:tracking-[0.18em]">
            {site.name}
          </span>
          <span className="mt-1 truncate text-[0.5rem] tracking-[0.25em] uppercase text-base-content/50 sm:text-[0.55rem] sm:tracking-[0.35em]">
            {site.tagline}
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-primary underline decoration-secondary decoration-2 underline-offset-[6px]"
                    : "text-base-content/75 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 border border-primary px-5 py-2.5 text-[0.6rem] tracking-[0.2em] uppercase text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-content md:inline-flex"
        >
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-primary text-primary md:hidden"
        >
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-base-300 md:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {links.map((link) => (
              <li key={link.href} className="border-b border-base-300/60 last:border-0">
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block py-4 text-[0.7rem] tracking-[0.2em] uppercase text-base-content/80 transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
