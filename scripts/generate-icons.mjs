import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = join(root, "public/logo.jpg");

async function roundIcon(size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`,
  );

  return sharp(logo)
    .resize(size, size, { fit: "cover", position: "centre" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

const png48 = await roundIcon(48);
const png180 = await roundIcon(180);

writeFileSync(join(root, "public/favicon-48.png"), png48);
writeFileSync(join(root, "public/apple-touch-icon.png"), png180);
writeFileSync(join(root, "public/favicon.ico"), await toIco([png48]));

console.log("Wrote circular favicon-48.png, apple-touch-icon.png, favicon.ico");
