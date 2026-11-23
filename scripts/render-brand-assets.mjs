// Renderiza las imágenes de marca a PNG con Chrome headless (sin dependencias extra).
// Uso: npm run brand-assets   ·   Chrome: CHROME_PATH o la instalación por defecto de Windows.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templates = join(root, 'scripts', 'brand-assets');

const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => p && existsSync(p));

if (!chrome) {
  console.error('No se encontró Chrome. Define CHROME_PATH con la ruta del ejecutable.');
  process.exit(1);
}

const assets = [
  { template: 'og.html', out: 'og.png', width: 1200, height: 630 },
  { template: 'icon.html', out: 'apple-touch-icon.png', width: 180, height: 180 },
  { template: 'icon.html', out: 'favicon-32.png', width: 32, height: 32 },
];

for (const { template, out, width, height } of assets) {
  const target = join(root, 'public', out);
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=2000',
    `--window-size=${width},${height}`,
    `--screenshot=${target}`,
    `${pathToFileURL(join(templates, template)).href}#${width}`,
  ], { stdio: 'ignore' });
  console.log(`public/${out} (${width}×${height})`);
}
