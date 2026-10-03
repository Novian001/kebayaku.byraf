// Guards the two "CMS" files: a non-developer edits these by hand, and a typo
// only shows up at runtime. Run: npx tsx scripts/check-data.mts
// ponytail: node:assert is the whole test framework here; add a runner only
// once there is more than one thing worth asserting.
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// No .ts suffix on these imports: tsx resolves them, and tsc only accepts a
// .ts extension when allowImportingTsExtensions is on, which it is not here.
import { categories, featuredProducts, getProduct, products } from "../src/data/products";
import { generalInquiryMessage, inquiryMessage, site, waLink } from "../src/lib/site";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fail: string[] = [];
const ok = (cond: unknown, msg: string) => {
  if (!cond) fail.push(msg);
};

// --- products.ts ---------------------------------------------------------
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
ok(products.every((p) => p.sizes.length > 0), "product with no sizes");
ok(products.every((p) => p.description.trim().length > 20), "description too thin to render well");
ok(products.every((p) => p.material.trim().length > 0), "material is required on the card");

// The card renders priceLabel verbatim, so a bare number or a formatted number
// would ship as "450000" to the page. Owner writes "Mulai Rp450.000".
ok(
  products.every((p) => /^(Mulai\s+)?Rp[\d.]+$/.test(p.priceLabel.trim())),
  `priceLabel must read like "Mulai Rp450.000", got ${products
    .filter((p) => !/^(Mulai\s+)?Rp[\d.]+$/.test(p.priceLabel.trim()))
    .map((p) => p.priceLabel)
    .join(" | ")}`,
);

// A missing file is a broken <img> the deploy will not catch. The leading
// slash has to go: resolve() would treat "/kebaya/x.svg" as an absolute path
// and silently drop the public/ prefix.
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

// --- site.ts -------------------------------------------------------------
ok(/^\d+$/.test(site.whatsapp), "whatsapp must be digits only (it is spliced into a URL)");
ok(site.whatsapp.length >= 9, "whatsapp number looks too short");

const msg = inquiryMessage("Kebaya Soraya");
ok(msg.includes("Kebaya Soraya"), "inquiryMessage must carry the product name");
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
