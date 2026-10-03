// One-off generator for the placeholder kebaya art. Run: npx tsx scripts/gen-placeholders.mts
// Delete the public/kebaya folder and drop in real 3:4 photos when they exist.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "kebaya");
mkdirSync(out, { recursive: true });

const art = (
  name: string,
  hue: number,
  variant: "front" | "alt" = "front",
) => {
  const bg = variant === "front" ? `hsl(${hue} 20% 91%)` : `hsl(${hue} 16% 86%)`;
  const detail = variant === "front"
    ? `<path d="M450 300 C 330 430 300 630 360 840 L 540 840 C 600 630 570 430 450 300 Z"/>
       <path d="M360 470 L 450 560 L 540 470"/>
       <path d="M332 900 L 568 900"/>
       <path d="M450 300 L 450 200"/>`
    : `<path d="M340 320 L 560 320 L 620 880 L 280 880 Z"/>
       <path d="M340 320 L 450 430 L 560 320"/>
       <path d="M300 520 L 600 520"/>
       <path d="M300 660 L 600 660"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200" role="img" aria-label="Placeholder foto kebaya ${name}">
  <rect width="900" height="1200" fill="${bg}"/>
  <rect x="40" y="40" width="820" height="1120" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  <g fill="none" stroke="#0D3B32" stroke-width="3" opacity="0.75" stroke-linejoin="round">
    ${detail}
  </g>
  <text x="450" y="1055" font-family="Georgia, 'Times New Roman', serif" font-size="42"
        fill="#0D3B32" text-anchor="middle" letter-spacing="8">${name}</text>
  <text x="450" y="1105" font-family="Helvetica, Arial, sans-serif" font-size="20"
        fill="#0D3B32" opacity="0.6" text-anchor="middle" letter-spacing="4">PLACEHOLDER FOTO</text>
</svg>
`;
};

const files: [string, number][] = [
  ["soraya", 150],
  ["anindya", 340],
  ["larasati", 25],
  ["melati", 40],
  ["wardhani", 168],
  ["cendana", 155],
  ["pesona", 20],
  ["blangkon", 30],
];

const label: Record<string, string> = {
  soraya: "SORAYA",
  anindya: "ANINDYA",
  larasati: "LARASATI",
  melati: "MELATI",
  wardhani: "WARDHANI",
  cendana: "CENDANA",
  pesona: "PESONA",
  blangkon: "JATI",
};

for (const [slug, hue] of files) {
  writeFileSync(resolve(out, `${slug}.svg`), art(label[slug], hue, "front"));
  if (slug === "soraya" || slug === "anindya") {
    writeFileSync(resolve(out, `${slug}-alt.svg`), art(label[slug], hue, "alt"));
  }
}
console.log(`wrote ${files.length + 2} placeholders to ${out}`);
