/**
 * Single source of truth for brand + contact details, all from `.env.local`
 * via NEXT_PUBLIC_* — see `.env.example`. `url` still needs the real domain.
 */

/** Turbopack inlines only literal `process.env.NEXT_PUBLIC_*`, so reads must be
 * direct expressions — `process.env[key]` ships `undefined` to the client bundle. */
function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`${name} is not configured`);
  }
  return value.trim();
}

function toInternationalDigits(raw: string): string {
  // ponytail: Indonesian prefixes only; per-region handling when a non-Indonesian number lands here.
  const bare = raw.replace(/^\+/, "").replace(/^0+/, "");
  return bare.startsWith("62") ? bare : `62${bare}`;
}

function readWhatsApp(): string {
  const raw = requireEnv(
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  );
  if (!/^\d+$/.test(raw)) {
    throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER must contain digits only");
  }
  if (raw.length < 9 || raw.length > 20) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER has unreasonable length (expected 9–20 digits)",
    );
  }
  return toInternationalDigits(raw);
}

function deriveWhatsAppDisplay(digits: string): string {
  const rest = digits.replace(/^62/, "");
  return rest.length >= 6
    ? `+62 ${rest.slice(0, 3)}-${rest.slice(3, 6)}-${rest.slice(6)}`
    : `+62 ${rest}`;
}

// ponytail: lazy cached reads avoid import-time env throws in Next.js dev/bootstrap
let _whatsappDigits: string | undefined;
function getWhatsAppDigits(): string {
  if (_whatsappDigits === undefined) {
    _whatsappDigits = readWhatsApp();
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

let _tagline: string | undefined;
function getTagline(): string {
  if (_tagline === undefined) {
    _tagline = requireEnv(
      "NEXT_PUBLIC_BUSINESS_TAGLINE",
      process.env.NEXT_PUBLIC_BUSINESS_TAGLINE,
    );
  }
  return _tagline;
}

let _description: string | undefined;
function getDescription(): string {
  if (_description === undefined) {
    _description = requireEnv(
      "NEXT_PUBLIC_BUSINESS_DESCRIPTION",
      process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION,
    );
  }
  return _description;
}

let _location: string | undefined;
function getLocation(): string {
  if (_location === undefined) {
    _location = requireEnv(
      "NEXT_PUBLIC_BUSINESS_LOCATION",
      process.env.NEXT_PUBLIC_BUSINESS_LOCATION,
    );
  }
  return _location;
}

let _name: string | undefined;
function getName(): string {
  if (_name === undefined) {
    _name = requireEnv(
      "NEXT_PUBLIC_BUSINESS_NAME",
      process.env.NEXT_PUBLIC_BUSINESS_NAME,
    );
  }
  return _name;
}

let _instagramHandle: string | undefined;
function getInstagramHandle(): string {
  if (_instagramHandle === undefined) {
    _instagramHandle = requireEnv(
      "NEXT_PUBLIC_INSTAGRAM_HANDLE",
      process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE,
    );
  }
  return _instagramHandle;
}

let _instagramUrl: string | undefined;
function getInstagramUrl(): string {
  if (_instagramUrl === undefined) {
    const raw = requireEnv(
      "NEXT_PUBLIC_INSTAGRAM_URL",
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    );
    try {
      new URL(raw);
    } catch {
      throw new Error("NEXT_PUBLIC_INSTAGRAM_URL must be a valid absolute URL");
    }
    _instagramUrl = raw;
  }
  return _instagramUrl;
}

let _url: string | undefined;
function getUrl(): string {
  if (_url === undefined) {
    const raw = requireEnv(
      "NEXT_PUBLIC_SITE_URL",
      process.env.NEXT_PUBLIC_SITE_URL,
    );
    try {
      new URL(raw);
    } catch {
      throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL");
    }
    // metadataBase/sitemap want an origin, never a trailing-slash path.
    _url = raw.replace(/\/+$/, "");
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
  hours: [
    { day: "Senin – Jumat", time: "10.00 – 20.00 WIB" },
    { day: "Sabtu", time: "10.00 – 18.00 WIB" },
    { day: "Minggu", time: "Dengan janji temu" },
  ],
} as const;

export const inquiryMessage = (kebayaName: string) =>
  `Halo, saya tertarik dengan koleksi ${kebayaName}. Saya ingin menanyakan informasi sewa kebaya ini.`;

export const generalInquiryMessage = `Halo, saya ingin menanyakan informasi sewa kebaya.`;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;