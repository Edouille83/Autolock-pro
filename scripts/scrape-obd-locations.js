#!/usr/bin/env node
/**
 * scrape-obd-locations.js
 * Découvre automatiquement tous les slugs OBD via l'API outilsobdfacile.fr
 * (list_modeles_connecteur.php) puis scrape chaque page pour location + photos.
 *
 * Usage : node scripts/scrape-obd-locations.js
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT_PATH = path.resolve(__dirname, '../obd-locations.js');
const BASE     = 'https://www.outilsobdfacile.fr';
const DELAY_MS = 200;

// Marques à scraper (nom exact utilisé par l'API list_marques_connecteur.php)
// + correspondance avec le nom utilisé dans notre DB AutoLock Pro
const BRANDS = [
  { api: 'Renault',    db: 'Renault'    },
  { api: 'Dacia',      db: 'Dacia'      },
  { api: 'Peugeot',    db: 'Peugeot'    },
  { api: 'Citroen',    db: 'Citroën'    },
  { api: 'DS',         db: 'DS'         },
  { api: 'Volkswagen', db: 'Volkswagen' },
  { api: 'Audi',       db: 'Audi'       },
  { api: 'Skoda',      db: 'Skoda'      },
  { api: 'Seat',       db: 'Seat'       },
  { api: 'BMW',        db: 'BMW'        },
  { api: 'Mini',       db: 'Mini'       },
  { api: 'Mercedes',   db: 'Mercedes'   },
  { api: 'Smart',      db: 'Smart'      },
  { api: 'Ford',       db: 'Ford'       },
  { api: 'Toyota',     db: 'Toyota'     },
  { api: 'Nissan',     db: 'Nissan'     },
  { api: 'Honda',      db: 'Honda'      },
  { api: 'Hyundai',    db: 'Hyundai'    },
  { api: 'Kia',        db: 'Kia'        },
  { api: 'Opel',       db: 'Opel'       },
  { api: 'Fiat',       db: 'Fiat'       },
  { api: 'Alfa Romeo', db: 'Alfa Romeo' },
  { api: 'Lancia',     db: 'Lancia'     },
  { api: 'Volvo',      db: 'Volvo'      },
  { api: 'Mazda',      db: 'Mazda'      },
  { api: 'Mitsubishi', db: 'Mitsubishi' },
  { api: 'Suzuki',     db: 'Suzuki'     },
  { api: 'Subaru',     db: 'Subaru'     },
  { api: 'Land Rover', db: 'Land Rover' },
  { api: 'Jaguar',     db: 'Jaguar'     },
  { api: 'Porsche',    db: 'Porsche'    },
];

// ─── HTTP helpers ─────────────────────────────────────────────────────────────
function fetchJson(url) {
  try {
    const raw = execSync(
      `curl -s --max-time 15 --compressed -A "Mozilla/5.0" "${url}"`,
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
    );
    return JSON.parse(raw.replace(/^\uFEFF/, ''));
  } catch { return null; }
}

function fetchHtml(brandApi, modelSlug) {
  const slug = `${brandApi}-${modelSlug}`;
  const url  = `${BASE}/emplacement-prise-connecteur-obd/${encodeURI(slug)}`;
  try {
    return execSync(
      `curl -s --max-time 12 --compressed -A "Mozilla/5.0" "${url}"`,
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
    );
  } catch { return ''; }
}

function sleep(ms) { execSync(`sleep ${(ms / 1000).toFixed(2)}`); }

// ─── Extraction HTML ──────────────────────────────────────────────────────────
function extractLocation(html) {
  if (!html || html.length < 500) return null;
  const captions = [];
  const re = /<figcaption>(.*?)<\/figcaption>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const txt = m[1]
      .replace(/&#0*39;/g, "'").replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/<[^>]+>/g, '').trim();
    if (txt && !txt.toLowerCase().includes('connecteur obd') && txt.length > 10)
      captions.push(txt);
  }
  if (captions.length >= 2) return captions[1];
  if (captions.length === 1) return captions[0];
  const fb = html.match(/prise[^.]*se\s+(?:situe|trouve|est)[^.]{5,100}\./i);
  return fb ? fb[0].replace(/<[^>]+>/g, '').trim() : null;
}

function extractImages(html) {
  if (!html || html.length < 500) return [];
  const imgs = [];
  const re = /<img[^>]+src='(\/base_connecteur\/[^']+)'[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) imgs.push(BASE + m[1]);
  return imgs;
}

// Parse "Clio III (2005 - 2014)" → { modelNorm: "Clio", yearStart: 2005, yearEnd: 2014 }
// Parse "Arkana (2021 - ...)"    → { modelNorm: "Arkana", yearStart: 2021, yearEnd: null }
function parseName(nameApi) {
  const yearsM = nameApi.match(/\((\d{4})\s*[-–]\s*(?:(\d{4})|[.…]+)\)/);
  const yearStart = yearsM ? +yearsM[1] : null;
  const yearEnd   = yearsM && yearsM[2] ? +yearsM[2] : null;
  const modelNorm = nameApi
    .replace(/\s*\(.*\)/, '')
    .replace(/\s+(I{1,3}V?|IV|VI{0,3}|[0-9]+)$/i, '')
    .trim();
  return { modelNorm, yearStart, yearEnd };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const results = {};
let totalSlugs = 0;

console.log('\n📡 Étape 1 — Découverte des slugs via API outilsobdfacile.fr\n');

// ÉTAPE 1 : Récupérer tous les modèles OBD via l'API
const slugQueue = []; // [{ brandApi, brandDb, modelSlug, nameApi }]

for (const { api, db } of BRANDS) {
  process.stdout.write(`  ${api.padEnd(15)}`);
  const encoded = encodeURIComponent(api);
  const models  = fetchJson(`${BASE}/include/ajax/list_modeles_connecteur.php?param=${encoded}`);
  if (!models) { console.log('⚠ erreur'); sleep(400); continue; }
  for (const m of models) {
    if (m.url) slugQueue.push({ brandApi: api, brandDb: db, modelSlug: m.url, nameApi: m.name });
  }
  console.log(`${models.length} slugs`);
  sleep(DELAY_MS);
}

totalSlugs = slugQueue.length;
console.log(`\n✅ ${totalSlugs} pages à scraper au total\n`);

// ÉTAPE 2 : Scraper chaque page OBD
console.log('⏳ Étape 2 — Scraping des pages emplacement OBD...\n');

let found = 0;

for (let i = 0; i < slugQueue.length; i++) {
  const { brandApi, brandDb, modelSlug, nameApi } = slugQueue[i];
  const pct = Math.round((i + 1) / totalSlugs * 100);
  process.stdout.write(`\r  [${pct}%] ${i+1}/${totalSlugs} — ${(brandApi+'-'+modelSlug).padEnd(55)}`);

  const html = fetchHtml(brandApi, modelSlug);
  if (!html || html.includes('<title>404') || html.length < 500) {
    sleep(DELAY_MS); continue;
  }

  const location = extractLocation(html);
  if (!location) { sleep(DELAY_MS); continue; }

  const images = extractImages(html);
  const { modelNorm, yearStart, yearEnd } = parseName(nameApi);

  if (!results[brandDb])             results[brandDb] = {};
  if (!results[brandDb][modelNorm])  results[brandDb][modelNorm] = [];

  results[brandDb][modelNorm].push({
    slug: `${brandApi}-${modelSlug}`,
    location,
    images,
    yearStart,
    yearEnd,
  });
  found++;
  sleep(DELAY_MS);
}

console.log(`\n\n✅ ${found} emplacements trouvés sur ${totalSlugs} pages.\n`);

// ÉTAPE 3 : Écriture du fichier JS
const stats = { brands: 0, models: 0, entries: 0 };
for (const b of Object.keys(results)) {
  stats.brands++;
  for (const m of Object.keys(results[b])) {
    stats.models++;
    stats.entries += results[b][m].length;
  }
}

const js = `// AUTO-GÉNÉRÉ par scripts/scrape-obd-locations.js — ${new Date().toISOString().slice(0, 10)}
// Source : outilsobdfacile.fr — API list_modeles_connecteur.php
// ${stats.entries} emplacements OBD · ${stats.models} modèles · ${stats.brands} marques
const OBD_LOCATIONS = ${JSON.stringify(results, null, 2)};
`;

fs.writeFileSync(OUT_PATH, js, 'utf8');
console.log(`📁 obd-locations.js : ${stats.entries} emplacements · ${stats.models} modèles · ${stats.brands} marques\n`);

for (const [b, mods] of Object.entries(results)) {
  const n = Object.values(mods).reduce((s, a) => s + a.length, 0);
  console.log(`  ${b.padEnd(18)} ${n} entrées`);
}
