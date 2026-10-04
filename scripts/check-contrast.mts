// WCAG contrast check for every text/background pair the theme can produce.
// Run: npx tsx scripts/check-contrast.mts
// A failing throw here is the same failure Lighthouse calls color-contrast, so
// this catches a regression without needing a browser.

type RGB = [number, number, number];

const hex = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const over = (fg: RGB, alpha: number, bg: RGB): RGB =>
  fg.map((c, i) => Math.round(alpha * c + (1 - alpha) * bg[i])) as RGB;

const lum = ([r, g, b]: RGB): number => {
  const ch = ([r, g, b] as RGB).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as RGB;
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
};

const ratio = (a: RGB, b: RGB): number => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// daisyUI theme in src/app/globals.css
const BASE_100 = hex("#faf8f5");
const BASE_200 = hex("#f3efe8");
const CONTENT = hex("#1f2421");
const PRIMARY = hex("#0d3b32");
const SECONDARY = hex("#d4af37");

// Real page backgrounds: solid base-100, plus the two alpha'd section shades.
const BACKDROPS: [string, RGB][] = [
  ["base-100", BASE_100],
  ["base-200/40 (footer, collections)", over(BASE_200, 0.4, BASE_100)],
  ["base-200/50 (CTA, contact card)", over(BASE_200, 0.5, BASE_100)],
];

// Every foreground the site uses for text, as (label, colour, opacity).
const FOREGROUNDS: [string, RGB, number][] = [
  ["text-base-content/40", CONTENT, 0.4],
  ["text-base-content/45", CONTENT, 0.45],
  ["text-base-content/50", CONTENT, 0.5],
  ["text-base-content/55", CONTENT, 0.55],
  ["text-base-content/60", CONTENT, 0.6],
  ["text-base-content/65", CONTENT, 0.65],
  ["text-base-content/70", CONTENT, 0.7],
  ["text-base-content/75", CONTENT, 0.75],
  ["text-base-content/80", CONTENT, 0.8],
  ["text-base-content", CONTENT, 1],
  ["text-primary", PRIMARY, 1],
  ["text-primary/70", PRIMARY, 0.7],
  ["text-secondary", SECONDARY, 1],
];

// Small text needs 4.5:1 (WCAG AA). These are all <18.66px non-bold.
const AA = 4.5;

let fail = 0;
console.log("ratio = contrast vs background, AA small-text floor = 4.5\n");
for (const [fgName, fg, alpha] of FOREGROUNDS) {
  const text = alpha === 1 ? fg : over(fg, alpha, BASE_100);
  const cells = BACKDROPS.map(([bgName, bg]) => {
    const r = ratio(text, bg);
    const pass = r >= AA;
    if (!pass) fail++;
    return `${bgName}=${r.toFixed(2)}${pass ? "" : " FAIL"}`;
  });
  const worst = Math.min(
    ...BACKDROPS.map(([, bg]) => ratio(text, bg)),
  );
  const flag = worst >= AA ? "PASS" : "FAIL";
  console.log(
    `${flag.padEnd(4)} ${fgName.padEnd(26)} ${cells.join("  ")}`,
  );
}

console.log("");
if (fail > 0) {
  console.error(`${fail} foreground/background pair(s) below AA 4.5:1`);
  process.exit(1);
}
console.log("every foreground clears 4.5:1 on every background");