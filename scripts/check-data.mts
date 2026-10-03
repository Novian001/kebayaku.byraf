// Guards the two hand-edited data files, where a typo only shows up at runtime.
// Run: npx tsx --env-file=.env.local scripts/check-data.mts
// ponytail: node:assert is the whole framework here; add a runner when a second
// suite is worth it.
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// No .ts suffix: tsx resolves them, tsc only allows it when
// allowImportingTsExtensions is on.
import { categories, featuredProducts, getProduct, products } from "../src/data/products";
import { generalInquiryMessage, inquiryMessage, site, waLink } from "../src/lib/site";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fail: string[] = [];
const ok = (cond: unknown, msg: string) => {
  if (!cond) fail.push(msg);
};

// products.ts
ok(products.length > 0, "no products");
ok(products.length === new Set(products.map((p) => p.id)).size, "duplicate product id");
ok(
  products.every((p) => p.id === p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
  "id must be the slug of name (keeps /catalog/[slug] and the og:url honest)",
);
ok(
  products.every((p) => categories.includes(p.category)),
  "category outside the categories[] list",
);
ok(
  products.every((p) => p.sizes === undefined || (Array.isArray(p.sizes) && p.sizes.length > 0)),
  "product with no sizes",
);
ok(products.every((p) => p.description && p.description.trim().length > 20), "description too thin to render well");
ok(products.every((p) => p.material === undefined || p.material.trim().length > 0), "material is required on the card");

// Card shows priceLabel verbatim: a bare number ships as "450000".
ok(
  products.every((p) => p.priceLabel === undefined || /^(Mulai\s+)?Rp[\d.]+$/.test(p.priceLabel.trim())),
  `priceLabel must read like "Mulai Rp450.000", got ${products
    .filter((p) => p.priceLabel && !/^(Mulai\s+)?Rp[\d.]+$/.test(p.priceLabel.trim()))
    .map((p) => p.priceLabel)
    .join(" | ")}`,
);

// A missing file is a broken <img> the deploy will not catch. The leading slash
// has to go: resolve() reads it as absolute and drops public/.
for (const p of products) {
  for (const img of p.images) {
    ok(img.startsWith("/"), `image path must be absolute: ${img}`);
    ok(existsSync(resolve(root, "public", img.slice(1))), `missing image file: ${img}`);
  }
}

// featuredProducts feeds the homepage; an empty slice renders an empty section.
ok(featuredProducts.length > 0, "featuredProducts is empty -> homepage section renders nothing");
ok(
  featuredProducts.every((p) => products.includes(p)),
  "featuredProducts contains a product not in products[]",
);
ok(getProduct(products[0].id) === products[0], "getProduct does not resolve an existing id");
ok(getProduct("tidak-ada") === undefined, "getProduct must return undefined for unknown id");

// site.ts
ok(/^\d+$/.test(site.whatsapp), "whatsapp must be digits only (it is spliced into a URL)");
ok(site.whatsapp.length >= 9, "whatsapp number looks too short");
ok(site.whatsapp.startsWith("62"), "whatsapp must be international format (62...)");
for (const key of ["name", "tagline", "description", "location", "instagramHandle"] as const) {
  ok(site[key].trim().length > 0, `site.${key} is empty`);
}
const instagram = new URL(site.instagram);
ok(
  instagram.protocol === "https:" &&
    /^(www\.)?instagram\.com$/.test(instagram.hostname),
  "site.instagram must be an https://instagram.com profile URL",
);
ok(
  new URL(site.url).protocol === "http:" || new URL(site.url).protocol === "https:",
  "site.url must be an absolute http(s) URL",
);

ok(products.length === 6, "exactly 6 products expected");
ok(
  products.every((p) => p.images.length >= 1 && p.images.every((img) => img.endsWith(".webp"))),
  "every product must have at least 1 .webp image",
);
ok(
  products.every((p) => p.images.every((img) => !img.endsWith(".svg"))),
  "product images must not reference .svg",
);
ok(
  products.every((p) => p.images.every((img) => existsSync(resolve(root, "public", img.slice(1))))),
  "missing product webp file",
);
ok(categories.length === 1 && categories[0] === "Kebaya", "categories simplified to Kebaya only");
ok(products.every((p) => p.category === "Kebaya"), "all products must be category Kebaya");
ok(featuredProducts.length === 4, "featuredProducts must be exactly 4");

const msg = inquiryMessage("Kebaya 01");
ok(msg.includes("Kebaya 01"), "inquiryMessage must carry the product name");
ok(
  !/ketersediaan|tersedia|booking|pemesanan/i.test(msg),
  "inquiryMessage must not reference availability — the owner confirms that by hand",
);
ok(!/https?:\/\//.test(generalInquiryMessage), "generalInquiryMessage must be plain text");
ok(
  waLink(msg).startsWith(`https://wa.me/${site.whatsapp}?text=`),
  "waLink built the wrong URL",
);
ok(
  !waLink(msg).slice(`https://wa.me/${site.whatsapp}?text=`.length).includes(" "),
  "waLink message is not URL-encoded",
);
ok(
  decodeURIComponent(waLink(msg).split("?text=")[1]) === msg,
  "waLink does not round-trip the message",
);

if (fail.length) {
  console.error(`\n${fail.length} data check(s) failed:\n` + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`data ok — ${products.length} products, ${featuredProducts.length} featured, contact config valid`);
