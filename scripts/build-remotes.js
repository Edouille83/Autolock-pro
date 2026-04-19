#!/usr/bin/env node
/**
 * build-remotes.js
 * Extrait les données télécommandes Xhorse depuis remotes.db (xhorse-pwa)
 * et génère remotes-data.js pour Autolock-pro.
 *
 * Usage : node scripts/build-remotes.js
 * Requires : better-sqlite3 (dans xhorse-pwa/node_modules)
 */

const path  = require('path');
const fs    = require('fs');
const { execSync } = require('child_process');

const DB_PATH  = path.resolve(__dirname, '../../xhorse-pwa/public/assets/remotes.db');
const OUT_PATH = path.resolve(__dirname, '../remotes-data.js');

function sql(query) {
  const escaped = query.replace(/'/g, "'\\''");
  const out = execSync(`sqlite3 -json "${DB_PATH}" '${escaped}'`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  if (!out.trim()) return [];
  return JSON.parse(out);
}

// ─── Mapping : make_id → nom normalisé Autolock-pro ──────────────────────────
const MAKE_MAP = {
  108: 'Renault',
   16: 'Peugeot',
   91: 'Citroën',
   21: 'Volkswagen',
   10: 'Mercedes',
    6: 'BMW',
    4: 'Audi',
   27: 'Ford',
   65: 'Opel',
  106: 'Fiat',
   24: 'Toyota',
   64: 'Nissan',
   78: 'Skoda',
  110: 'Seat',
   68: 'Kia',
   88: 'Hyundai',
   12: 'Honda',
   85: 'Volvo',
   58: 'Land Rover',
   72: 'Mitsubishi',
   60: 'Mazda',
   55: 'Suzuki',
   77: 'Subaru',
  121: 'Alfa Romeo',
  107: 'Lancia',
   61: 'Mini',
    7: 'Porsche',
  252: 'Dacia',
   47: 'Chrysler',
};

// ─── Mapping : (make_id, série_xhorse) → codes produits Xhorse ───────────────
// Série : 'XK' | 'XN' | 'XE' | 'XS'
const REMOTE_CODES = {
  108: { XK: ['XKRN00EN'],          XN: ['XN004'],         XE: ['XEN001']                    }, // Renault
   16: { XK: ['XKPU01EN'],          XN: ['XN001'],         XE: ['XE0B0EN','XE0B1EN']         }, // Peugeot
   91: { XK: ['XKPU01EN'],          XN: ['XN001'],         XE: ['XE0B0EN','XE0B1EN']         }, // Citroën
   21: { XK: ['XKVW00EN','XKVW01EN'], XN: [],              XE: []                            }, // VW
   10: { XK: ['XKME00EN'],          XN: [],                XE: []                            }, // Mercedes
    6: { XK: ['XKBM00EN','XKBM01EN'], XN: [],              XE: []                            }, // BMW
    4: { XK: ['XKAU01EN'],          XN: [],                XE: []                            }, // Audi
   27: { XK: ['XKFO01EN'],          XN: [],                XE: []                            }, // Ford
   65: { XK: ['XKOP00EN'],          XN: ['XN002'],         XE: []                            }, // Opel
  106: { XK: ['XKFI00EN'],          XN: ['XN005'],         XE: []                            }, // Fiat
   24: { XK: ['XKTO00EN'],          XN: [],                XE: []                            }, // Toyota
   64: { XK: ['XKNI00EN'],          XN: [],                XE: []                            }, // Nissan
   78: { XK: ['XKSK00EN'],          XN: [],                XE: []                            }, // Skoda
  110: { XK: ['XKSE00EN'],          XN: [],                XE: []                            }, // Seat
   68: { XK: ['XKHY01EN'],          XN: [],                XE: []                            }, // Kia
   88: { XK: ['XKHY01EN'],          XN: [],                XE: []                            }, // Hyundai
   12: { XK: ['XKHO01EN'],          XN: [],                XE: []                            }, // Honda
   85: { XK: ['XKVO00EN'],          XN: [],                XE: []                            }, // Volvo
   58: { XK: ['XKLR00EN'],          XN: [],                XE: []                            }, // Land Rover
   72: { XK: ['XKMI00EN'],          XN: [],                XE: []                            }, // Mitsubishi
   60: { XK: ['XKMA00EN'],          XN: [],                XE: []                            }, // Mazda
   55: { XK: ['XKSU00EN'],          XN: [],                XE: []                            }, // Suzuki
   77: { XK: ['XKSU01EN'],          XN: [],                XE: []                            }, // Subaru
  121: { XK: ['XKFI00EN'],          XN: ['XN005'],         XE: []                            }, // Alfa Romeo
  107: { XK: ['XKFI00EN'],          XN: ['XN005'],         XE: []                            }, // Lancia
   61: { XK: ['XKBM00EN'],          XN: [],                XE: []                            }, // Mini
    7: { XK: [],                    XN: [],                XE: []                            }, // Porsche
  252: { XK: ['XKRN00EN'],          XN: ['XN004'],         XE: ['XEN001']                    }, // Dacia (plateforme Renault)
   47: { XK: ['XKCU00EN'],          XN: [],                XE: []                            }, // Chrysler
};

// ─── Requête principale ───────────────────────────────────────────────────────
const makeIds = Object.keys(MAKE_MAP).join(',');

const rows = sql(`
  SELECT
    cmi.make_id,
    lp_make.translate_value   AS brand,
    cm.model_id,
    lp_model.translate_value  AS model,
    vi.key_id,
    lp_veh.translate_value    AS vehicle_desc,
    lp_rdesc.translate_value  AS remote_series_json
  FROM CarMakeInfo cmi
  JOIN LanguagePack2 lp_make  ON lp_make.id  = cmi.make_name
  JOIN CarModelInfo  cm       ON cm.make_id  = cmi.make_id
  JOIN LanguagePack2 lp_model ON lp_model.id = cm.m_name
  JOIN VehicleInfo   vi       ON vi.model_id = cm.model_id
  JOIN LanguagePack2 lp_veh   ON lp_veh.id   = vi.vehicle
  LEFT JOIN LanguagePack2 lp_rdesc ON lp_rdesc.id = vi.remote_desc_v2
  WHERE cmi.make_id IN (${makeIds})
  ORDER BY cmi.make_id, cm.model_id, vi.key_id
`);

// ─── Requête features (freq, encode, chip) par key_id ────────────────────────
const features = sql(`
  SELECT vfv.key_id, cf.name AS feat, lp.translate_value AS val
  FROM VehicleFeatureValue vfv
  JOIN CfgFeature     cf  ON cf.id  = vfv.feature_id
  JOIN LanguagePack2  lp  ON lp.id  = vfv.value
  WHERE cf.name IN ('freq','encode','type_name')
`);

const featMap = {};
for (const f of features) {
  if (!featMap[f.key_id]) featMap[f.key_id] = {};
  featMap[f.key_id][f.feat] = f.val;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseSeries(json) {
  if (!json) return [];
  try {
    return JSON.parse(json).map(s => s.text); // ["XK-Wire","XN-Wireless",...]
  } catch { return []; }
}

function seriesCode(text) {
  if (text.startsWith('XK')) return 'XK';
  if (text.startsWith('XN')) return 'XN';
  if (text.startsWith('XE')) return 'XE';
  if (text.startsWith('XS') || text.includes('SmartKey') || text.includes('NXP')) return 'XS';
  return null;
}

// Extrait une plage d'années depuis la description (ex: "Clio III(2006-2010)PCF7946")
function parseYears(desc) {
  const m = desc.match(/\((\d{4})[-–](\d{4})\)/);
  if (m) return { yearStart: +m[1], yearEnd: +m[2] };
  const m2 = desc.match(/\((\d{4})[+\-]\)/);
  if (m2) return { yearStart: +m2[1], yearEnd: null };
  const m3 = desc.match(/\b(19|20)\d{2}\b/);
  if (m3) return { yearStart: +m3[0], yearEnd: null };
  return { yearStart: null, yearEnd: null };
}

// Extrait le chip transponder depuis la description
function parseChip(desc) {
  // Ex: PCF7946, PCF7947, PCF7961, Hitag AES, ID4A, ID46
  const chips = [];
  const pcf = desc.match(/PCF\d+[A-Z]*/gi);
  if (pcf) chips.push(...pcf.map(c => c.toUpperCase()));
  if (/Hitag AES/i.test(desc))  chips.push('Hitag AES');
  if (/Hitag Pro/i.test(desc))  chips.push('Hitag Pro');
  if (/ID4A/i.test(desc))       chips.push('ID4A (Hitag AES)');
  if (/ID46/i.test(desc) && !chips.some(c => /ID46/.test(c))) chips.push('ID46');
  if (/ID48/i.test(desc))       chips.push('ID48');
  if (/ID33/i.test(desc))       chips.push('ID33 (Crypto1)');
  return chips.length ? chips.join(' / ') : null;
}

// Nettoie la description pour obtenir version lisible (sans chip ni années)
function cleanDesc(desc, model) {
  let s = desc
    .replace(/（[^）]*）/g, '')             // parenthèses chinoises
    .replace(/\([^)]*PCF[^)]*\)/gi, '')    // (PCF7946...)
    .replace(/\([^)]*Hitag[^)]*\)/gi, '')
    .replace(/PCF\d+[A-Za-z]*/gi, '')      // PCF7946 hors parenthèses
    .replace(/Hitag\s*(AES|Pro)?/gi, '')
    .replace(/ID4[0-9A-F]/gi, '')
    .replace(/ID\d{2}/gi, '')
    .replace(/\([^)]*refer[^)]*\)/gi, '')  // (Please refer...)
    .replace(/\(\d{4}[-–]\d{4}\)/g, '')   // (2006-2010)
    .replace(/\(\d{4}[+]\)/g, '')
    .replace(/\(\d{4}-\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  // Supprimer le nom du modèle si présent en début
  if (model && s.toLowerCase().startsWith(model.toLowerCase())) {
    s = s.slice(model.length).trim();
  }
  return s || null;
}

// ─── Agrégation par (make_id, model_id, vehicle_desc) ─────────────────────────
// Plusieurs key_id pour le même véhicule → union des séries
const vehicleMap = new Map();

for (const row of rows) {
  const key = `${row.make_id}__${row.model_id}__${row.vehicle_desc}`;
  if (!vehicleMap.has(key)) {
    vehicleMap.set(key, {
      make_id:      row.make_id,
      brand:        MAKE_MAP[row.make_id] || row.brand,
      model:        row.model,
      vehicle_desc: row.vehicle_desc,
      series:       new Set(),
      key_ids:      [],
      freq:         null,
      encode:       null,
      type_name:    null,
    });
  }
  const entry = vehicleMap.get(key);
  entry.key_ids.push(row.key_id);

  const seriesList = parseSeries(row.remote_series_json);
  for (const s of seriesList) {
    const code = seriesCode(s);
    if (code) entry.series.add(code);
  }

  // Features du premier key_id disponible
  if (!entry.freq && featMap[row.key_id]) {
    entry.freq     = featMap[row.key_id].freq     || null;
    entry.encode   = featMap[row.key_id].encode   || null;
    entry.type_name = featMap[row.key_id].type_name || null;
  }
}

// ─── Génération des entrées finales ──────────────────────────────────────────
const output = [];

for (const entry of vehicleMap.values()) {
  const { yearStart, yearEnd } = parseYears(entry.vehicle_desc);
  const version     = cleanDesc(entry.vehicle_desc, entry.model);
  const transponder = parseChip(entry.vehicle_desc);

  // Construire la liste de codes Xhorse
  const remoteCodes = [];
  const brandCodes  = REMOTE_CODES[entry.make_id] || {};

  for (const serie of ['XK', 'XN', 'XE', 'XS']) {
    if (entry.series.has(serie) && brandCodes[serie]?.length) {
      remoteCodes.push(...brandCodes[serie]);
    }
  }

  // Fréquence formatée
  let freqStr = null;
  if (entry.freq && entry.encode) {
    freqStr = `${entry.freq} MHz ${entry.encode}`;
  }

  output.push({
    brand:      entry.brand,
    model:      entry.model,
    yearStart,
    yearEnd,
    version,
    remotes:     remoteCodes,
    freq:        freqStr,
    transponder,
    blade:       null,
    protocol:    null,
    method:      [],
    diff:        null,
    nbKeys:      null,
    obdPos:      null,
    notes:       null,
  });
}

// ─── Écriture ─────────────────────────────────────────────────────────────────
const js = `// AUTO-GÉNÉRÉ par scripts/build-remotes.js — ${new Date().toISOString().slice(0,10)}
// Source : xhorse-pwa/public/assets/remotes.db
// ${output.length} entrées véhicules pour ${Object.keys(MAKE_MAP).length} marques
const REMOTES_DB = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync(OUT_PATH, js, 'utf8');

// ─── Stats ────────────────────────────────────────────────────────────────────
const brands = [...new Set(output.map(e => e.brand))].sort();
console.log(`\n✅ ${output.length} véhicules extraits → ${OUT_PATH}`);
console.log(`\nMarques (${brands.length}) :`);
brands.forEach(b => {
  const n = output.filter(e => e.brand === b).length;
  console.log(`  ${b.padEnd(20)} ${n} entrées`);
});

console.log('\nExemple Renault Clio III :');
const ex = output.find(e => e.brand === 'Renault' && /clio iii/i.test(e.model + e.version));
if (ex) console.log(JSON.stringify(ex, null, 2));

