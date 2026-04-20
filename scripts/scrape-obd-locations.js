#!/usr/bin/env node
/**
 * scrape-obd-locations.js
 * Scrape les emplacements de prises OBD depuis outilsobdfacile.fr
 * pour toutes les marques du projet AutoLock Pro.
 *
 * Usage : node scripts/scrape-obd-locations.js
 */

const https   = require('https');
const fs      = require('fs');
const path    = require('path');
const { execSync } = require('child_process');

const OUT_PATH = path.resolve(__dirname, '../obd-locations.js');
const BASE     = 'https://www.outilsobdfacile.fr';

// ─── Liste exhaustive de toutes les URLs à scraper ───────────────────────────
const URLS = [
  // RENAULT
  'Renault-Clio-2','Renault-Clio-3','Renault-clio-4','Renault-clio-5',
  'Renault-Megane-1','Renault-Megane-2','Renault-Megane-3','Renault-megane-4','Renault-megane-4-2',
  'Renault-Scenic-2','Renault-Scenic-3','Renault-scenic-4',
  'Renault-captur','Renault-captur-ph2','Renault-captur-2',
  'Renault-kadjar','Renault-koleos-1','Renault-koleos-2-2',
  'Renault-Laguna','Renault-Laguna-2','Renault-Laguna-3',
  'Renault-kangoo-1-phase1','Renault-Kangoo-2','Renault-kangoo-3',
  'Renault-Trafic','Renault-trafic-3',
  'Renault-master-2','Renault-master-3','Renault-master-3-phase2','Renault-master-3-phase3',
  'Renault-Twingo-2','Renault-twingo-3',
  'Renault-zoe','Renault-zoe-phase2',
  'Renault-talisman','Renault-latitude','Renault-fluence-1',
  'Renault-duster-1','Renault-austral-1','Renault-arkana-1-phase2',
  'Renault-espace-3','Renault-Espace-4','Renault-espace-v',
  'Renault-Modus-1',

  // DACIA
  'Dacia-duster-1','Dacia-duster-2','Dacia-logan-1','Dacia-logan-2',
  'Dacia-sandero-1','Dacia-sandero-2','Dacia-sandero-3',
  'Dacia-lodgy','Dacia-dokker-1','Dacia-spring',

  // PEUGEOT
  'Peugeot-106','Peugeot-107','Peugeot-108',
  'Peugeot-206','Peugeot-207','Peugeot-208','Peugeot-208-2',
  'Peugeot-301','Peugeot-307','Peugeot-308','Peugeot-308-2','Peugeot-308-3',
  'Peugeot-2008','Peugeot-2008-2',
  'Peugeot-3008','Peugeot-3008-2',
  'Peugeot-4008','Peugeot-4007',
  'Peugeot-5008','Peugeot-5008-2',
  'Peugeot-406','Peugeot-407','Peugeot-408','Peugeot-508','Peugeot-508-2',
  'Peugeot-expert-2','Peugeot-expert-3','Peugeot-partner-2','Peugeot-partner-3',
  'Peugeot-rifter',

  // CITROEN
  'Citroen-C1','Citroen-C1-2','Citroen-c1-3',
  'Citroen-C2','Citroen-C3','Citroen-c3-2','Citroen-c3-3',
  'Citroen-C4','Citroen-c4-2','Citroen-C4-Picasso','Citroen-c4-picasso-2',
  'Citroen-C5','Citroen-c5-2',
  'Citroen-C3-Aircross','Citroen-C5-Aircross',
  'Citroen-berlingo-2','Citroen-berlingo-3',
  'Citroen-Jumpy-2','Citroen-jumpy-3',
  'Citroen-dispatch-3','Citroen-DS3','Citroen-DS4','Citroen-DS5',
  'Citroen-Saxo','Citroen-Xsara','Citroen-Xsara-Picasso','Citroen-Xantia',

  // VOLKSWAGEN
  'Volkswagen-Golf-4','Volkswagen-golf-5','Volkswagen-golf-6','Volkswagen-golf-7','Volkswagen-golf-8',
  'Volkswagen-Polo-5','Volkswagen-polo-6','Volkswagen-polo-4','Volkswagen-polo-9n',
  'Volkswagen-passat-b5','Volkswagen-passat-b5-5','Volkswagen-passat','Volkswagen-passat-b7','Volkswagen-passat-b8',
  'Volkswagen-tiguan-5n','Volkswagen-tiguan-2',
  'Volkswagen-t-roc-1','Volkswagen-t-cross-1',
  'Volkswagen-Touran','Volkswagen-touran-2','Volkswagen-touran-3',
  'Volkswagen-touareg-7l','Volkswagen-touareg-2',
  'Volkswagen-sharan-7m','Volkswagen-sharan-2-1',
  'Volkswagen-caddy-3',
  'Volkswagen-transporter-4','Volkswagen-trasnporter-5','Volkswagen-transporter-t6-phase2',
  'Volkswagen-up','Volkswagen-bora','Volkswagen-beetle',
  'Volkswagen-scirocco-3','Volkswagen-eos-1',

  // AUDI
  'Audi-A1','Audi-A1-2',
  'Audi-A3','Audi-a3-8p','Audi-a3-8v','Audi-a3-8y',
  'Audi-A4','Audi-a4-b7','Audi-a4-b8','Audi-a4-b9',
  'Audi-A5','Audi-a5-f5',
  'Audi-A6','Audi-a6-c7','Audi-a6-c8',
  'Audi-A8',
  'Audi-Q2','Audi-Q3','Audi-q3-2','Audi-Q5','Audi-q5-2','Audi-Q7','Audi-q8',
  'Audi-TT','Audi-tt-8j','Audi-tt-8s',
  'Audi-R8',

  // SKODA
  'Skoda-fabia-1','Skoda-fabia-2','Skoda-fabia-3',
  'Skoda-octavia-1','Skoda-octavia-2','Skoda-Octavia-3','Skoda-octavia-4',
  'Skoda-superb-1','Skoda-superb-2','Skoda-superb-3',
  'Skoda-yeti','Skoda-karoq','Skoda-kodiaq',
  'Skoda-scala','Skoda-kamiq',

  // SEAT
  'Seat-Ibiza','Seat-ibiza-4','Seat-ibiza-5',
  'Seat-leon','Seat-leon-2','Seat-leon-3','Seat-leon-4',
  'Seat-Toledo','Seat-Altea','Seat-altea-xl',
  'Seat-Arona','Seat-Ateca','Seat-Tarraco',
  'Seat-Alhambra',

  // BMW
  'BMW-serie-1-e87','BMW-serie-1-f20','BMW-serie-1-f40',
  'BMW-serie-3-e46','BMW-serie-3-e90','BMW-serie-3-f30','BMW-serie-3-g20',
  'BMW-serie-5-e60','BMW-serie-5-f10','BMW-serie-5-g30',
  'BMW-serie-7-e65','BMW-serie-7-f01','BMW-serie-7-g11',
  'BMW-X1-e84','BMW-x1-f48','BMW-x1-u11',
  'BMW-X3-e83','BMW-x3-f25','BMW-x3-g01',
  'BMW-X5-e53','BMW-X5-e70','BMW-x5-f15','BMW-x5-g05',
  'BMW-serie-2-f22','BMW-serie-4-f32',
  'BMW-mini-r56','BMW-mini-f55',

  // MERCEDES
  'Mercedes-Classe-A-W168','Mercedes-classe-a-w169','Mercedes-classe-a-w176','Mercedes-classe-a-w177',
  'Mercedes-Classe-B-W245','Mercedes-classe-b-w246','Mercedes-classe-b-w247',
  'Mercedes-Classe-C-W203','Mercedes-Classe-C-W204','Mercedes-classe-c-w205','Mercedes-classe-c-w206',
  'Mercedes-Classe-E-W211','Mercedes-Classe-E-W212','Mercedes-classe-e-w213',
  'Mercedes-Classe-S-W221','Mercedes-classe-s-w222',
  'Mercedes-GLA-X156','Mercedes-gla-h247',
  'Mercedes-GLC-X253','Mercedes-GLE-W166','Mercedes-GLS-X167',
  'Mercedes-Sprinter-W901','Mercedes-sprinter-w906','Mercedes-sprinter-w907',
  'Mercedes-Vito-W639','Mercedes-vito-w447',
  'Mercedes-CLA-C117',

  // FORD
  'Ford-Fiesta','Ford-fiesta-6','Ford-fiesta-7','Ford-fiesta-8',
  'Ford-Focus','Ford-focus-2','Ford-focus-3','Ford-focus-4',
  'Ford-C-Max','Ford-c-max-2',
  'Ford-Mondeo','Ford-mondeo-4','Ford-mondeo-5',
  'Ford-Kuga','Ford-kuga-2','Ford-kuga-3',
  'Ford-EcoSport','Ford-Puma-2',
  'Ford-Galaxy','Ford-Galaxy-2',
  'Ford-S-Max','Ford-s-max-2',
  'Ford-Transit','Ford-transit-custom',
  'Ford-Ranger-2',

  // TOYOTA
  'Toyota-Yaris','Toyota-yaris-2','Toyota-yaris-3',
  'Toyota-Auris','Toyota-auris-2',
  'Toyota-Corolla-E140','Toyota-corolla-11',
  'Toyota-C-HR-1',
  'Toyota-Prius-2','Toyota-prius-3',
  'Toyota-RAV4-3','Toyota-rav4-4',
  'Toyota-Avensis-2','Toyota-avensis-3',
  'Toyota-Aygo-1','Toyota-aygo-2-1',
  'Toyota-Hilux-7','Toyota-hilux-8',
  'Toyota-Land-Cruiser-10',
  'Toyota-Camry',

  // NISSAN
  'Nissan-Micra','Nissan-micra-4','Nissan-micra-5',
  'Nissan-Juke','Nissan-juke-2',
  'Nissan-Qashqai','Nissan-qashqai-2','Nissan-qashqai-3',
  'Nissan-Note','Nissan-Leaf',
  'Nissan-X-Trail','Nissan-x-trail-2','Nissan-x-trail-3',
  'Nissan-Navara',
  'Nissan-Almera','Nissan-Primera',
  'Nissan-Pulsar',

  // HONDA
  'Honda-Jazz','Honda-jazz-2','Honda-jazz-3','Honda-jazz-4',
  'Honda-Civic','Honda-civic-8','Honda-civic-9','Honda-civic-10',
  'Honda-CR-V','Honda-cr-v-4','Honda-cr-v-5',
  'Honda-HR-V','Honda-hr-v-2',
  'Honda-Accord',

  // HYUNDAI
  'Hyundai-i10','Hyundai-i20','Hyundai-i30','Hyundai-i40',
  'Hyundai-Tucson','Hyundai-tucson-3',
  'Hyundai-Santa-Fe','Hyundai-Kona',
  'Hyundai-Elantra','Hyundai-Getz',

  // KIA
  'Kia-Ceed','Kia-ceed-2','Kia-ceed-3',
  'Kia-Picanto','Kia-Rio','Kia-rio-3',
  'Kia-Sportage','Kia-sportage-4','Kia-sportage-5',
  'Kia-Sorento','Kia-Stonic','Kia-Niro',

  // OPEL
  'Opel-Corsa','Opel-corsa-d','Opel-corsa-e','Opel-corsa-f',
  'Opel-Astra','Opel-astra-h','Opel-Astra-J','Opel-astra-k',
  'Opel-Meriva','Opel-Zafira','Opel-zafira-c',
  'Opel-Insignia','Opel-insignia-b',
  'Opel-Mokka','Opel-mokka-b',
  'Opel-Crossland','Opel-Grandland',

  // FIAT
  'Fiat-500','Fiat-500x','Fiat-500l',
  'Fiat-Panda','Fiat-punto','Fiat-grande-punto','Fiat-punto-evo',
  'Fiat-Bravo','Fiat-Tipo',
  'Fiat-Ducato','Fiat-Doblo',
  'Fiat-Stilo',

  // ALFA ROMEO
  'Alfa-romeo-147','Alfa-romeo-156','Alfa-romeo-159',
  'Alfa-romeo-giulietta','Alfa-romeo-giulia',
  'Alfa-romeo-mito','Alfa-romeo-stelvio',

  // LANCIA
  'Lancia-Ypsilon','Lancia-Delta',

  // MINI
  'Mini-R50','Mini-r56','Mini-r60','Mini-f55','Mini-f56',

  // VOLVO
  'Volvo-C30','Volvo-S40','Volvo-V40',
  'Volvo-S60','Volvo-V60','Volvo-XC60',
  'Volvo-S80','Volvo-V70','Volvo-XC70','Volvo-XC90',

  // LAND ROVER
  'Land-Rover-Freelander','Land-Rover-freelander-2',
  'Land-Rover-Discovery','Land-Rover-discovery-4','Land-Rover-discovery-5',
  'Land-Rover-range-rover-evoque','Land-Rover-range-rover-sport',
  'Land-Rover-Defender','Land-Rover-range-rover-4',

  // PORSCHE
  'Porsche-911','Porsche-Boxster','Porsche-Cayenne','Porsche-Macan','Porsche-Panamera',

  // MAZDA
  'Mazda-2','Mazda-3','Mazda-6',
  'Mazda-CX-3','Mazda-cx-5','Mazda-cx-30',
  'Mazda-mx-5',

  // MITSUBISHI
  'Mitsubishi-Colt','Mitsubishi-outlander','Mitsubishi-asx',
  'Mitsubishi-Lancer','Mitsubishi-eclipse-cross',
  'Mitsubishi-Space-Star',

  // SUZUKI
  'Suzuki-Swift','Suzuki-Vitara','Suzuki-SX4','Suzuki-sx4-s-cross',
  'Suzuki-Jimny','Suzuki-Ignis','Suzuki-Baleno',

  // SUBARU
  'Subaru-Impreza','Subaru-Forester','Subaru-Outback','Subaru-Legacy',
  'Subaru-xv',

  // CHRYSLER / JEEP / DODGE
  'Jeep-Cherokee','Jeep-Grand-Cherokee','Jeep-Compass','Jeep-Renegade',
  'Chrysler-300C',
];

// ─── Fetch avec curl ──────────────────────────────────────────────────────────
function fetchPage(slug) {
  const url = `${BASE}/emplacement-prise-connecteur-obd/${slug}`;
  try {
    const html = execSync(
      `curl -s --max-time 10 --compressed -A "Mozilla/5.0" "${url}"`,
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
    );
    return html;
  } catch {
    return '';
  }
}

// Extrait la description OBD depuis le HTML
function extractLocation(html) {
  if (!html || html.length < 500) return null;
  // Extraire les figcaptions
  const captions = [];
  const re = /<figcaption>(.*?)<\/figcaption>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const txt = m[1].replace(/&#0*39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]+>/g,'').trim();
    if (txt && !txt.toLowerCase().includes('connecteur obd') && txt.length > 10) {
      captions.push(txt);
    }
  }
  // Prendre la 2e légende si dispo (plus précise), sinon la 1ère
  if (captions.length >= 2) return captions[1];
  if (captions.length === 1) return captions[0];

  // Fallback: chercher dans le texte autour de "prise"
  const fallback = html.match(/prise[^.]*se\s+(?:situe|trouve|est)[^.]{5,100}\./i);
  return fallback ? fallback[0].replace(/<[^>]+>/g,'').trim() : null;
}

// Extrait marque + modèle + années depuis le titre
function extractMeta(html, slug) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  // "Prise OBD2 dans les Renault Clio 3 (2005 - 2014)"
  const yearsMatch = title.match(/\((\d{4})\s*-\s*(\d{4})\)/);
  const yearStart = yearsMatch ? +yearsMatch[1] : null;
  const yearEnd   = yearsMatch ? +yearsMatch[2] : null;

  // Marque depuis le slug
  const parts = slug.split('-');
  const brand = parts[0];
  const model = parts.slice(1).join(' ').replace(/\s+\d+$/, '').trim();

  return { brand, model, yearStart, yearEnd, slug };
}

// ─── Mapping slug → (brand, model) normalisé pour l'app ─────────────────────
// Le slug "Volkswagen-golf-7" → brand="Volkswagen", model="Golf"
function normalizeBrand(raw) {
  const map = {
    'Volkswagen':'Volkswagen','VW':'Volkswagen',
    'Citroen':'Citroën','BMW':'BMW','Mercedes':'Mercedes',
    'Land':'Land Rover','Alfa':'Alfa Romeo',
    'Jeep':'Chrysler',
  };
  return map[raw] || raw;
}
function normalizeModel(raw) {
  // Retire les suffixes numériques et générations : "golf-7" → "Golf"
  return raw.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ')
    .replace(/\s+\d+$/,'').replace(/\s+(Phase\d*|Rhd|Ze)$/i,'').trim();
}

// ─── Scraping ────────────────────────────────────────────────────────────────
const results = {};
const total = URLS.length;

console.log(`\n⏳ Scraping ${total} pages depuis outilsobdfacile.fr...\n`);

for (let i = 0; i < URLS.length; i++) {
  const slug = URLS[i];
  const pct = Math.round((i+1)/total*100);
  process.stdout.write(`\r  [${pct}%] ${i+1}/${total} — ${slug.padEnd(50)}`);

  const html = fetchPage(slug);
  if (!html || html.includes('<title>404') || html.includes('Page not found')) {
    continue;
  }

  const location = extractLocation(html);
  if (!location) continue;

  const { brand, yearStart, yearEnd } = extractMeta(html, slug);
  const brandNorm = normalizeBrand(slug.split('-')[0]);

  // Clé : slug complet (pour lookup précis)
  const key = slug.toLowerCase();

  if (!results[brandNorm]) results[brandNorm] = {};

  // Modèle normalisé (sans numéro de génération)
  const modelRaw = slug.split('-').slice(1).join('-').toLowerCase();
  const modelNorm = modelRaw
    .replace(/-[0-9]+$/,'').replace(/-phase\d+$/i,'').replace(/-rhd$/i,'')
    .replace(/-ze$/i,'').replace(/-ph\d+$/i,'')
    .split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ').trim();

  if (!results[brandNorm][modelNorm]) results[brandNorm][modelNorm] = [];
  results[brandNorm][modelNorm].push({ slug, location, yearStart, yearEnd });
}

console.log('\n\n✅ Scraping terminé.\n');

// ─── Génération du fichier JS ─────────────────────────────────────────────────
// Format final : par marque → modèle → [{location, yearStart, yearEnd}]
const stats = { brands:0, models:0, entries:0 };
for (const b of Object.keys(results)) {
  stats.brands++;
  for (const m of Object.keys(results[b])) {
    stats.models++;
    stats.entries += results[b][m].length;
  }
}

const js = `// AUTO-GÉNÉRÉ par scripts/scrape-obd-locations.js — ${new Date().toISOString().slice(0,10)}
// Source : outilsobdfacile.fr (klavkarr)
// ${stats.entries} emplacements OBD pour ${stats.models} modèles / ${stats.brands} marques
const OBD_LOCATIONS = ${JSON.stringify(results, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../obd-locations.js'), js, 'utf8');
console.log(`📁 obd-locations.js écrit : ${stats.entries} emplacements, ${stats.models} modèles, ${stats.brands} marques`);

// Stats par marque
for (const [b, models] of Object.entries(results)) {
  const n = Object.values(models).reduce((a,v)=>a+v.length,0);
  console.log(`  ${b.padEnd(16)} ${n} entrées`);
}
