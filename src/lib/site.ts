/**
 * Single source of truth for brand + contact details. Uses centralized defaults
 * with optional NEXT_PUBLIC_* overrides. Built-in Vercel envs are used for site
 * URL when no explicit override is set.
 */

const DEFAULT_SITE = {
  name: "Kebayaku by Raf",
  tagline: "SEWA KEBAYA JABODETABEK DAN BISA KIRIM KE LUAR KOTA/DAERAH",
  description:
    "Sewa kebaya Wisuda, Lamaran JABODETABEK dan bisa kirim ke LUAR KOTA/DAERAH",
  location: "Tanjung Duren, Jakarta Barat",
  whatsapp: "6282240404619",
  instagramHandle: "@kebayaku.byraf",
  instagramUrl: "https://www.instagram.com/kebayaku.byraf/",
} as const;

function withProtocol(value: string): string {
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

function normalizeUrl(raw: string): string {
  try {
    return withProtocol(raw).replace(/\/+$/, "");
  } catch {
    return withProtocol(raw).replace(/\/+$/, "");
  }
}

function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl && envUrl.length > 0) {
    return normalizeUrl(envUrl);
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd && vercelProd.length > 0) {
    return normalizeUrl(vercelProd);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl && vercelUrl.length > 0) {
    return normalizeUrl(vercelUrl);
  }

  return "http://localhost:3000";
}

function toInternationalDigits(raw: string): string {
  // ponytail: Indonesian prefixes only; per-region handling when a non-Indonesian number lands here.
  const bare = raw.replace(/^\+/, "").replace(/^0+/, "");
  return bare.startsWith("62") ? bare : `62${bare}`;
}

function validateResolvedUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error("site.url must be a valid absolute http/https URL");
  }
}

function validateInstagramUrl(url: string): void {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      throw new Error("site.instagram must use https");
    }
    if (!/instagram\.com$/i.test(parsed.hostname)) {
      throw new Error("site.instagram must be an instagram.com URL");
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("site.instagram")) {
      throw e;
    }
    throw new Error("site.instagram must be a valid absolute URL");
  }
}

function validateWhatsApp(digits: string): void {
  if (!/^\d+$/.test(digits)) {
    throw new Error("site.whatsapp must contain digits only");
  }
  if (digits.length < 9 || digits.length > 20) {
    throw new Error("site.whatsapp has unreasonable length (expected 9–20 digits)");
  }
}

function deriveWhatsAppDisplay(digits: string): string {
  const rest = digits.replace(/^62/, "");
  return rest.length >= 6
    ? `+62 ${rest.slice(0, 3)}-${rest.slice(3, 6)}-${rest.slice(6)}`
    : `+62 ${rest}`;
}

// ponytail: lazy cached reads avoid import-time env throws in Next.js dev/bootstrap
let _name: string | undefined;
function getName(): string {
  if (_name === undefined) {
    const env = process.env.NEXT_PUBLIC_BUSINESS_NAME?.trim();
    _name = env && env.length > 0 ? env : DEFAULT_SITE.name;
    if (!_name || _name.trim().length === 0) {
      throw new Error("site.name is invalid");
    }
  }
  return _name;
}

let _tagline: string | undefined;
function getTagline(): string {
  if (_tagline === undefined) {
    const env = process.env.NEXT_PUBLIC_BUSINESS_TAGLINE?.trim();
    _tagline = env && env.length > 0 ? env : DEFAULT_SITE.tagline;
    if (!_tagline || _tagline.trim().length === 0) {
      throw new Error("site.tagline is invalid");
    }
  }
  return _tagline;
}

let _description: string | undefined;
function getDescription(): string {
  if (_description === undefined) {
    const env = process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION?.trim();
    _description = env && env.length > 0 ? env : DEFAULT_SITE.description;
    if (!_description || _description.trim().length === 0) {
      throw new Error("site.description is invalid");
    }
  }
  return _description;
}

let _location: string | undefined;
function getLocation(): string {
  if (_location === undefined) {
    const env = process.env.NEXT_PUBLIC_BUSINESS_LOCATION?.trim();
    _location = env && env.length > 0 ? env : DEFAULT_SITE.location;
    if (!_location || _location.trim().length === 0) {
      throw new Error("site.location is invalid");
    }
  }
  return _location;
}

let _whatsappDigits: string | undefined;
function getWhatsAppDigits(): string {
  if (_whatsappDigits === undefined) {
    const env = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
    const raw = env && env.length > 0 ? env : DEFAULT_SITE.whatsapp;
    const digits = toInternationalDigits(raw);
    validateWhatsApp(digits);
    _whatsappDigits = digits;
  }
  return _whatsappDigits;
}

let _whatsappDisplay: string | undefined;
function getWhatsAppDisplay(): string {
  if (_whatsappDisplay === undefined) {
    _whatsappDisplay = deriveWhatsAppDisplay(getWhatsAppDigits());
  }
  return _whatsappDisplay;
}

let _instagramHandle: string | undefined;
function getInstagramHandle(): string {
  if (_instagramHandle === undefined) {
    const env = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim();
    _instagramHandle = env && env.length > 0 ? env : DEFAULT_SITE.instagramHandle;
    if (!_instagramHandle || _instagramHandle.trim().length === 0) {
      throw new Error("site.instagramHandle is invalid");
    }
  }
  return _instagramHandle;
}

let _instagramUrl: string | undefined;
function getInstagramUrl(): string {
  if (_instagramUrl === undefined) {
    const env = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
    _instagramUrl = env && env.length > 0 ? env : DEFAULT_SITE.instagramUrl;
    validateInstagramUrl(_instagramUrl);
  }
  return _instagramUrl;
}

let _url: string | undefined;
function getUrl(): string {
  if (_url === undefined) {
    _url = resolveSiteUrl();
    validateResolvedUrl(_url);
  }
  return _url;
}

export const site = {
  get name() {
    return getName();
  },
  get legalName() {
    return getName();
  },
  get url() {
    return getUrl();
  },
  get tagline() {
    return getTagline();
  },
  get description() {
    return getDescription();
  },
  get location() {
    return getLocation();
  },
  get whatsapp() {
    return getWhatsAppDigits();
  },
  get whatsappDisplay() {
    return getWhatsAppDisplay();
  },
  get instagram() {
    return getInstagramUrl();
  },
  get instagramHandle() {
    return getInstagramHandle();
  },
  get instagramUrl() {
    return getInstagramUrl();
  },
  waLink: (message: string) => {
    return `https://wa.me/${getWhatsAppDigits()}?text=${encodeURIComponent(
      message,
    )}`;
  },
  inquiryMessage: (name: string) =>
    `Halo, saya tertarik dengan kebaya "${name}". Bisa info ukuran dan harga sewa?`,
  generalInquiryMessage:
    "Halo, saya tertarik menyewa kebaya. Bisa bantu lihat koleksi dan jadwal fitting?",
};
