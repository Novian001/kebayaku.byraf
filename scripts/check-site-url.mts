// Prints the resolved site.url for whatever env the caller sets, so the
// NEXT_PUBLIC_SITE_URL > VERCEL_PROJECT_PRODUCTION_URL > VERCEL_URL > localhost
// chain can be checked one process per case:
//   npx tsx scripts/check-site-url.mts
import { site } from "../src/lib/site";

const expect = process.argv[2];
const actual = site.url;
if (expect && actual !== expect) {
  console.error(`site.url mismatch: expected ${expect}, got ${actual}`);
  process.exit(1);
}
console.log(actual);