import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const sourceCssPath = resolve(projectRoot, 'src', 'marquee-content.css');
const outputCssPath = resolve(projectRoot, 'dist', 'marquee-content.css');

await mkdir(resolve(projectRoot, 'dist'), { recursive: true });
await copyFile(sourceCssPath, outputCssPath);
