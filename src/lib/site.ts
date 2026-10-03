/**
 * Single source of truth for brand + contact details.
 * ponytail: one config object beats a CMS for a brochure site; swap this file
 * for a CMS fetch when a non-developer needs to edit products.
 * `url` is a placeholder — set it to the real domain before deploying.
 */
const WHATSAPP_ENV = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

function assertWhatsAppEnv(v: string | undefined): asserts v is string {
  if (!v || v.trim().length === 0) {
    throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER is not configured");
  }
  // digits only
  if (!/^\d+$/.test(v)) {
    throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER must contain digits only");
  }
  if (v.length < 9 || v.length > 20) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER has unreasonable length (expected 9–20 digits)",
    );
  }
}

assertWhatsAppEnv(WHATSAPP_ENV);
const whatsappDigits = WHATSAPP_ENV;

function deriveWhatsAppDisplay(digits: string): string {
  // +62 812-3456-789
  if (digits.startsWith("628")) {
    const rest = digits.slice(3);
    if (rest.length >= 6) {
      return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 6)}-${rest.slice(6)}`;
    }
    return `+62 ${rest}`;
  }
  if (digits.startsWith("62")) {
    const rest = digits.slice(2);
    return rest.length >= 3 ? `+62 ${rest}` : `+62 ${rest}`;
  }
  if (digits.startsWith("0")) {
    const rest = digits.slice(1);
    return rest.length >= 3 ? `+62 ${rest}` : `+62 ${rest}`;
  }
  return `+${digits}`;
}

export const site = {
  name: "Ayu Selaras",
  legalName: "Ayu Selaras Atelier",
  tagline: "Atelier Kebaya Premium",
  description:
    "Rental kebaya premium untuk kolos, siraman, akad nikah, dan acara keluarga. Bahan pilihan, jahitan rapih, fitting konsisten.",
  // TODO: replace with the real production domain.
  url: "https://ayu-selaras.example.com",
  whatsapp: whatsappDigits,
  whatsappDisplay: deriveWhatsAppDisplay(whatsappDigits),
  instagram: "https://www.instagram.com/ayuselaras",
  instagramHandle: "@ayuselaras",
  address: {
    street: "Jl. Senopati No. 88, Kebayoran Baru",
    city: "Jakarta Selatan",
    region: "DKI Jakarta 12190",
    country: "ID",
  },
  hours: [
    { day: "Senin – Jumat", time: "10.00 – 20.00 WIB" },
    { day: "Sabtu", time: "10.00 – 18.00 WIB" },
    { day: "Minggu", time: "Dengan janji temu" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region}`;

/**
 * Message format fixed by the client brief. Availability, fitting and final
 * pricing are all agreed manually over WhatsApp, so the message only has to
 * carry the product name and open the conversation.
 */
export const inquiryMessage = (kebayaName: string) =>
  `Halo, saya tertarik dengan koleksi ${kebayaName}. Saya ingin menanyakan informasi rental untuk kebaya ini.`;

export const generalInquiryMessage = `Halo, saya ingin menanyakan informasi rental kebaya di ${site.name}.`;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
