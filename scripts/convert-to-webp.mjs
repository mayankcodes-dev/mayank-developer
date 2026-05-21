/**
 * Convert all non-WebP images in public/images to WebP.
 * Skips files that already have a .webp counterpart.
 * Originals are kept untouched.
 */
import { createRequire } from "module";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const IMAGES_DIR = new URL("../public/images", import.meta.url).pathname
  .replace(/^\/([A-Z]:)/, "$1"); // fix Windows path

const SUPPORTED = new Set([".jpg", ".jpeg", ".png"]);

const files = readdirSync(IMAGES_DIR);

let converted = 0;
let skipped = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) { skipped++; continue; }

  const webpName = basename(file, ext) + ".webp";
  const webpPath = join(IMAGES_DIR, webpName);

  if (existsSync(webpPath)) {
    console.log(`⏭  Skipped  ${file}  → ${webpName} already exists`);
    skipped++;
    continue;
  }

  const inputPath = join(IMAGES_DIR, file);
  await sharp(inputPath)
    .webp({ quality: 82, effort: 5 })
    .toFile(webpPath);

  const orig = (await import("fs")).statSync(inputPath).size;
  const out  = (await import("fs")).statSync(webpPath).size;
  const saving = Math.round((1 - out / orig) * 100);
  console.log(`✅  Converted ${file}  →  ${webpName}  (saved ${saving}%)`);
  converted++;
}

console.log(`\nDone! ${converted} converted, ${skipped} skipped.`);
