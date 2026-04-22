#!/usr/bin/env node
/*
  Generates PNG favicon fallbacks and Apple touch icon.
  Prefers src/assets/favicon.ico when present, falling back to favicon.svg.
  Requires: sharp (install with: npm i -D sharp)
*/
const fs = require('fs');
const path = require('path');

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function icoToSharpInput(buffer) {
  if (
    buffer.readUInt16LE(0) !== 0 ||
    buffer.readUInt16LE(2) !== 1 ||
    buffer.readUInt16LE(4) < 1
  ) {
    throw new Error('Invalid ICO file');
  }

  const count = buffer.readUInt16LE(4);
  const entries = [];
  for (let i = 0; i < count; i += 1) {
    const offset = 6 + i * 16;
    entries.push({
      width: buffer[offset] || 256,
      height: buffer[offset + 1] || 256,
      bitCount: buffer.readUInt16LE(offset + 6),
      bytes: buffer.readUInt32LE(offset + 8),
      imageOffset: buffer.readUInt32LE(offset + 12),
    });
  }

  const entry = entries.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
  const image = buffer.subarray(entry.imageOffset, entry.imageOffset + entry.bytes);

  // PNG-encoded ICO entries can be handed to sharp directly.
  if (image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return image;
  }

  const headerSize = image.readUInt32LE(0);
  const dibWidth = image.readInt32LE(4);
  const dibHeight = image.readInt32LE(8);
  const bitCount = image.readUInt16LE(14);
  const compression = image.readUInt32LE(16);

  if (headerSize < 40 || bitCount !== 32 || compression !== 0) {
    throw new Error(`Unsupported ICO bitmap: ${bitCount}bpp compression ${compression}`);
  }

  const width = Math.abs(dibWidth);
  const height = Math.abs(dibHeight) / 2;
  const pixelOffset = headerSize;
  const rgba = Buffer.alloc(width * height * 4);
  const bottomUp = dibHeight > 0;

  for (let y = 0; y < height; y += 1) {
    const sourceY = bottomUp ? height - 1 - y : y;
    for (let x = 0; x < width; x += 1) {
      const source = pixelOffset + ((sourceY * width + x) * 4);
      const target = (y * width + x) * 4;
      rgba[target] = image[source + 2];
      rgba[target + 1] = image[source + 1];
      rgba[target + 2] = image[source];
      rgba[target + 3] = image[source + 3];
    }
  }

  return {
    raw: rgba,
    options: {
      raw: {
        width,
        height,
        channels: 4,
      },
    },
  };
}

async function main() {
  const sharp = require('sharp');
  const root = process.cwd();
  const srcIco = path.join(root, 'src', 'assets', 'favicon.ico');
  const srcSvg = path.join(root, 'src', 'assets', 'favicon.svg');
  const outDir = path.join(root, 'src', 'assets');

  let iconInput;
  let iconOptions;

  try {
    await fs.promises.access(srcIco, fs.constants.R_OK);
    const icoBuffer = await fs.promises.readFile(srcIco);
    const parsed = icoToSharpInput(icoBuffer);
    if (Buffer.isBuffer(parsed)) {
      iconInput = parsed;
    } else {
      iconInput = parsed.raw;
      iconOptions = parsed.options;
    }
  } catch (e) {
    try {
      await fs.promises.access(srcSvg, fs.constants.R_OK);
      iconInput = await fs.promises.readFile(srcSvg);
      iconOptions = { density: 384 };
    } catch {
      console.error('[icons] Source icon not found:', srcIco, 'or', srcSvg);
      process.exit(0); // non-fatal in CI
    }
  }

  await ensureDir(outDir);

  const tasks = [
    { file: 'favicon-16x16.png', size: 16 },
    { file: 'favicon-32x32.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
  ];

  for (const t of tasks) {
    const outPath = path.join(outDir, t.file);
    await sharp(iconInput, iconOptions)
      .resize(t.size, t.size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath);
    console.log('[icons] Wrote', path.relative(root, outPath));
  }
}

main().catch((err) => {
  console.error('[icons] Error:', err);
  process.exit(1);
});
