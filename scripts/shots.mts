// Responsive screenshot capture. Uses the system Chrome in headless mode, so
// there is no Playwright/Puppeteer dependency in the project.
// Usage: npx tsx scripts/shots.mts [baseUrl]
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2] ?? "http://localhost:3000";
// Absolute Windows path: Chrome silently writes nowhere when given a relative one.
const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "shots");
mkdirSync(out, { recursive: true });

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 900 },
];

const pages = [
  { name: "home", path: "/" },
  { name: "catalog", path: "/catalog" },
  { name: "detail", path: "/catalog/kebaya-01" },
  { name: "contact", path: "/contact" },
];

for (const vp of viewports) {
  for (const p of pages) {
    const file = `${out}/${p.name}-${vp.name}.png`;
    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--window-size=${vp.width},${vp.height}`,
        `--screenshot=${file}`,
        // Full page: virtual-time-budget lets lazy images settle.
        "--virtual-time-budget=6000",
        "--run-all-compositor-stages-before-draw",
        base + p.path,
      ],
      { stdio: "ignore" },
    );
    console.log(`${file}  ${vp.width}x${vp.height}`);
  }
}
