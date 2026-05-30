/**
 * Generates dist/seminario.html — identical to dist/index.html but with
 * seminar-specific OG meta tags so social media link previews work correctly.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');

const base = readFileSync(resolve(distDir, 'index.html'), 'utf8');

const seminarHtml = base
  .replace(
    /<title>.*?<\/title>/,
    '<title>Seminário Tainan Dalpra · BLACKBOX. JIU-JITSU — 14 Jun 2025</title>'
  )
  .replace(
    /<meta name="description"[^>]*>/,
    '<meta name="description" content="Seminário com Tainan Dalpra na BLACKBOX. JIU-JITSU em Cajamar, SP. 14 de Junho de 2025, 18h00 às 20h00. R$259 por participante. Vagas limitadas." />'
  )
  .replace(
    /<meta property="og:title"[^>]*>/,
    '<meta property="og:title" content="Seminário Tainan Dalpra · BLACKBOX. JIU-JITSU" />'
  )
  .replace(
    /<meta property="og:description"[^>]*>/,
    '<meta property="og:description" content="14 Jun · 18h–20h · Cajamar, SP · R$259 · Vagas limitadas. Garanta sua vaga!" />'
  )
  .replace(
    /<meta property="og:image"[^>]*>/,
    '<meta property="og:image" content="/og-seminario.jpg" />'
  )
  .replace(
    /<meta name="twitter:image"[^>]*>/,
    '<meta name="twitter:image" content="/og-seminario.jpg" />'
  );

writeFileSync(resolve(distDir, 'seminario.html'), seminarHtml, 'utf8');
console.log('✓ dist/seminario.html generated with seminar OG tags');
