import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

async function fingerprintAsset({ source, pattern, replacementPrefix }) {
  const filePath = path.join(distDir, source);
  const content = await fs.readFile(filePath);
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const parsed = path.parse(filePath);
  const hashedName = `${parsed.name}.${hash}${parsed.ext}`;
  const hashedPath = path.join(parsed.dir, hashedName);

  const entries = await fs.readdir(parsed.dir);
  await Promise.all(entries
    .filter((entry) => pattern.test(entry) && entry !== parsed.base)
    .map((entry) => fs.rm(path.join(parsed.dir, entry), { force: true })));

  await fs.rename(filePath, hashedPath);

  return {
    original: `./${source}`,
    hashed: `./${path.posix.join(replacementPrefix, hashedName)}`,
  };
}

const replacements = await Promise.all([
  fingerprintAsset({
    source: 'css/output.css',
    pattern: /^output\.[a-f0-9]{12}\.css$/,
    replacementPrefix: 'css',
  }),
  fingerprintAsset({
    source: 'js/main.js',
    pattern: /^main\.[a-f0-9]{12}\.js$/,
    replacementPrefix: 'js',
  }),
]);

const indexPath = path.join(distDir, 'index.html');
let indexHtml = await fs.readFile(indexPath, 'utf8');

for (const { original, hashed } of replacements) {
  indexHtml = indexHtml.replaceAll(original, hashed);
}

await fs.writeFile(indexPath, indexHtml);
