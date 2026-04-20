#!/usr/bin/env node
/**
 * build-remotes.js
 * Extrait depuis remotes.db (xhorse-pwa) :
 *   - transpondeur (chip type)
 *   - lame (blade)
 *   - télécommande Xhorse (XK/XN/XE/XM38)
 *   - fréquence + modulation ASK/FSK
 *   - clonable (remote + chip)
 *
 * Usage : node scripts/build-remotes.js
 */

const path  = require('path');
const fs    = require('fs');
const { execSync } = require('child_process');

const DB_PATH    = path.resolve(__dirname, '../../xhorse-pwa/public/assets/remotes.db');
const LAMES_PATH = path.resolve(__dirname, '../../xhorse-pwa/public/assets/lames.db');
const OUT_PATH   = path.resolve(__dirname, '../remotes-data.js');

function sql(dbPath, query) {
  const escaped = query.replace(/\\/g, '\\\\').replace(/'/g, "'\\''");
  const out = execSync(`sqlite3 -json "${dbPath}" '${escaped}'`, {
    encoding: 'utf8', maxBuffer: 100 * 1024 * 1024,
  });
  if (!out.trim()) return [];
  return JSON.parse(out);
}

// ─── Marques ciblées ─────────────────────────────────────────────────────────
const MAKE_MAP = {
    4: 'Audi',
    6: 'BMW',
    7: 'Porsche',
   10: 'Mercedes',
   12: 'Honda',
   16: 'Peugeot',
   21: 'Volkswagen',
   24: 'Toyota',
   27: 'Ford',
   47: 'Chrysler',
   55: 'Suzuki',
   58: 'Land Rover',
   60: 'Mazda',
   61: 'Mini',
   64: 'Nissan',
   65: 'Opel',
   68: 'Kia',
   72: 'Mitsubishi',
   77: 'Subaru',
   78: 'Skoda',
   85: 'Volvo',
   88: 'Hyundai',
   91: 'Citroën',
  106: 'Fiat',
  107: 'Lancia',
  108: 'Renault',
  110: 'Seat',
  121: 'Alfa Romeo',
  252: 'Dacia',
};

// Codes Xhorse XK/XN/XE par marque
const BRAND_REMOTES = {
    4: { XK: ['XKAU01EN'], XN: ['XN008'],       XE: []           }, // Audi
    6: { XK: ['XKBM00EN'], XN: [],              XE: []           }, // BMW
    7: { XK: [],           XN: [],              XE: []           }, // Porsche
   10: { XK: ['XKME00EN'], XN: [],              XE: []           }, // Mercedes
   12: { XK: ['XKHO01EN'], XN: [],              XE: []           }, // Honda
   16: { XK: ['XKPU01EN'], XN: ['XN001'],       XE: ['XE0B0EN']  }, // Peugeot
   21: { XK: ['XKVW00EN'], XN: [],              XE: []           }, // Volkswagen
   24: { XK: ['XKTO00EN'], XN: [],              XE: []           }, // Toyota
   27: { XK: ['XKFO01EN'], XN: [],              XE: []           }, // Ford
   47: { XK: ['XKCU00EN'], XN: [],              XE: []           }, // Chrysler
   55: { XK: ['XKSU00EN'], XN: [],              XE: []           }, // Suzuki
   58: { XK: ['XKLR00EN'], XN: [],              XE: []           }, // Land Rover
   60: { XK: ['XKMA00EN'], XN: [],              XE: []           }, // Mazda
   61: { XK: ['XKBM00EN'], XN: [],              XE: []           }, // Mini
   64: { XK: ['XKNI00EN'], XN: [],              XE: []           }, // Nissan
   65: { XK: ['XKOP00EN'], XN: ['XN002'],       XE: []           }, // Opel
   68: { XK: ['XKHY01EN'], XN: [],              XE: []           }, // Kia
   72: { XK: ['XKMI00EN'], XN: [],              XE: []           }, // Mitsubishi
   77: { XK: ['XKSU01EN'], XN: [],              XE: []           }, // Subaru
   78: { XK: ['XKSK00EN'], XN: [],              XE: []           }, // Skoda
   85: { XK: ['XKVO00EN'], XN: [],              XE: []           }, // Volvo
   88: { XK: ['XKHY01EN'], XN: [],              XE: []           }, // Hyundai
   91: { XK: ['XKPU01EN'], XN: ['XN001'],       XE: ['XE0B0EN']  }, // Citroën
  106: { XK: ['XKFI00EN'], XN: ['XN005'],       XE: []           }, // Fiat
  107: { XK: ['XKFI00EN'], XN: ['XN005'],       XE: []           }, // Lancia
  108: { XK: ['XKRN00EN'], XN: ['XN004'],       XE: ['XEN001']   }, // Renault
  110: { XK: ['XKSE00EN'], XN: [],              XE: []           }, // Seat
  121: { XK: ['XKFI00EN'], XN: ['XN005'],       XE: []           }, // Alfa Romeo
  252: { XK: ['XKRN00EN'], XN: ['XN004'],       XE: ['XEN001']   }, // Dacia
};

// ─── Requête principale (véhicules) ──────────────────────────────────────────
const makeIds = Object.keys(MAKE_MAP).join(',');

console.log('⏳ Extraction des véhicules...');
const rows = sql(DB_PATH, `
  SELECT
    cma.make_id,
    lp_make.translate_value  AS brand,
    cmo.model_id,
    lp_model.translate_value AS model,
    vi.key_id,
    lp_veh.translate_value   AS vehicle_desc,
    lp_rdesc.translate_value AS remote_desc_v2
  FROM CarMakeInfo cma
  JOIN LanguagePack2 lp_make  ON lp_make.id  = cma.make_name
  JOIN CarModelInfo  cmo      ON cmo.make_id  = cma.make_id
  JOIN LanguagePack2 lp_model ON lp_model.id  = cmo.m_name
  JOIN VehicleInfo   vi       ON vi.model_id  = cmo.model_id
  JOIN LanguagePack2 lp_veh   ON lp_veh.id    = vi.vehicle
  LEFT JOIN LanguagePack2 lp_rdesc ON lp_rdesc.id = vi.remote_desc_v2
  WHERE cma.make_id IN (${makeIds})
  ORDER BY cma.make_id, cmo.model_id, vi.key_id
`);

// ─── Requête features par key_id ─────────────────────────────────────────────
console.log('⏳ Extraction des features (transpondeur, lame, freq, clonable)...');
const features = sql(DB_PATH, `
  SELECT vfv.key_id, cf.name AS feat, lp.translate_value AS val
  FROM VehicleFeatureValue vfv
  JOIN CfgFeature    cf  ON cf.id  = vfv.feature_id
  JOIN LanguagePack2 lp  ON lp.id  = vfv.value
  WHERE cf.name IN ('blank','freq','encode','type_name','known_as_id','cloneable_remote','cloneable_chip')
`);

const featMap = {};
for (const f of features) {
  if (!featMap[f.key_id]) featMap[f.key_id] = {};
  featMap[f.key_id][f.feat] = f.val;
}

// ─── Requête lames.db (lame par véhicule) ────────────────────────────────────
console.log('⏳ Extraction des lames depuis lames.db...');
let lamesRows = [];
try {
  lamesRows = sql(LAMES_PATH, `
    SELECT kb.n AS brand, km.n AS model, kv.n AS vehicle, kkb.n AS blade
    FROM kb_brand kb
    JOIN kb_model km ON km.bi = kb.bi
    JOIN kb_vehicle kv ON kv.mi = km.mi
    JOIN kb_vehicle_key_blank kvkb ON kvkb.vi = kv.vi
    JOIN kb_key_blank kkb ON kkb.i = kvkb.kbi
  `);
} catch(e) {
  console.warn('⚠️  lames.db non accessible:', e.message);
}

// Normalisation marque pour matching cross-db
const LAMES_BRAND_NORM = {
  'citroen':'citroën', 'vw':'volkswagen', 'mercedes-benz':'mercedes',
  'land-rover':'land rover', 'landrover':'land rover',
  'alfa-romeo':'alfa romeo', 'alfa romeo': 'alfa romeo',
};
function normBrand(s) {
  const l = (s||'').toLowerCase().trim();
  return LAMES_BRAND_NORM[l] || l;
}
function normModel(s) {
  return (s||'').toLowerCase().replace(/[^a-z0-9]/g,' ').replace(/\s+/g,' ').trim();
}

// Extrait plage d'années depuis nom de véhicule lames.db
// Ex: "A4(2004-2009)", "Clio I(Before 1995)", "2019-2024", "After 2015"
function parseLamesYears(vehicle) {
  const v = vehicle || '';
  const m1 = v.match(/\((\d{4})-(\d{4})\)|^(\d{4})-(\d{4})/);
  if (m1) return { ys: +(m1[1]||m1[3]), ye: +(m1[2]||m1[4]) };
  const mBefore = v.match(/[Bb]efore\s+(\d{4})/);
  if (mBefore) return { ys: null, ye: +mBefore[1] };
  const mAfter = v.match(/[Aa]fter\s+(\d{4})/);
  if (mAfter) return { ys: +mAfter[1], ye: null };
  const mSingle = v.match(/\b(19|20)(\d{2})\b/);
  if (mSingle) return { ys: +mSingle[0], ye: null };
  return { ys: null, ye: null };
}

// Index lames : brand_norm → model_norm → [{ys, ye, blade}]
const lamesIndex = {};
const bladesSeen = new Set();
for (const r of lamesRows) {
  if (!r.blade || /^#/.test(r.blade)) continue; // ignorer codes internes #xx
  const bk = normBrand(r.brand);
  const mk = normModel(r.model);
  if (!lamesIndex[bk]) lamesIndex[bk] = {};
  if (!lamesIndex[bk][mk]) lamesIndex[bk][mk] = [];
  const { ys, ye } = parseLamesYears(r.vehicle);
  const dupKey = `${bk}__${mk}__${ys}__${ye}__${r.blade}`;
  if (!bladesSeen.has(dupKey)) {
    bladesSeen.add(dupKey);
    lamesIndex[bk][mk].push({ ys, ye, blade: r.blade });
  }
}

// Cherche la lame pour (brand, model, yearStart, yearEnd)
function findBlade(brand, model, ys, ye) {
  const bk = normBrand(brand);
  const mk = normModel(model);
  const entries = (lamesIndex[bk] && lamesIndex[bk][mk]) || [];
  if (!entries.length) return null;

  // Filtre par chevauchement années
  const overlapping = entries.filter(e => {
    if (ys && e.ye && e.ye < ys) return false;
    if (ye && e.ys && e.ys > ye) return false;
    return true;
  });
  const pool = overlapping.length ? overlapping : entries;

  // Blade la plus fréquente dans le pool
  const freq = {};
  for (const e of pool) freq[e.blade] = (freq[e.blade]||0) + 1;
  return Object.entries(freq).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Parse le JSON remote_desc_v2 et retourne les séries + codes XM38
function parseRemoteDesc(json) {
  if (!json) return { series: [], xm38: [] };
  let parsed = [];
  try { parsed = JSON.parse(json); } catch { return { series: [], xm38: [] }; }
  const series = [];
  const xm38 = [];
  for (const item of parsed) {
    const t = item.text || '';
    if (t.startsWith('XM38')) {
      // Ex: "XM38-754J" → code Xhorse du smart remote
      xm38.push(t);
    } else if (t.startsWith('XK')) {
      series.push('XK');
    } else if (t.startsWith('XN')) {
      series.push('XN');
    } else if (t.startsWith('XE')) {
      series.push('XE');
    } else if (t.startsWith('XS') || t.includes('SmartKey')) {
      series.push('XS');
    }
  }
  return { series, xm38 };
}

// Extrait le transpondeur depuis la description quand feature 9 absent
function parseTransponderFromDesc(desc) {
  if (!desc) return null;
  const d = desc.toUpperCase();
  // Chip type numérique Xhorse (4D, 4A, 48, 46, 47, 49, 4C, 8A…)
  const m4D = d.match(/\b(4D(?:\([\w]+\))?[\w]*|4[A-C](?:\([^)]+\))?|4[E-F]|8A|8E|47G?|46|48|49|4A(?:\([^)]+\))?)\b/);
  if (m4D) return m4D[1];
  // PCF families
  if (/PCF7930|PCF7931/.test(d)) return 'PCF7930/31 (ID33)';
  if (/PCF7935/.test(d))         return 'PCF7935 (ID33)';
  if (/PCF7936/.test(d))         return 'PCF7936 (ID46)';
  if (/PCF7941/.test(d))         return 'PCF7941';
  if (/PCF7945/.test(d))         return 'PCF7945 (Megamos 8E)';
  if (/PCF7946/.test(d))         return 'PCF7946 (Megamos 8E)';
  if (/PCF7947/.test(d))         return 'PCF7947 (Megamos 8E)';
  if (/PCF7961/.test(d))         return 'PCF7961 (Hitag2)';
  if (/HITAG\s*AES|ID4A/.test(d)) return '4A (Hitag AES)';
  if (/HITAG\s*PRO/.test(d))     return 'Hitag Pro';
  if (/HITAG\s*2/.test(d))       return 'Hitag2';
  if (/ID46|CRYPTO2/.test(d))    return '46';
  if (/ID48|CRYPTO3/.test(d))    return '48';
  if (/ID47/.test(d))            return '47';
  if (/ID13/.test(d))            return '13';
  if (/ID33/.test(d))            return '33';
  return null;
}

// Parse la lame depuis feature 'blank': "XK31,31,HU66" → "HU66"
function parseBladeCode(raw) {
  if (!raw) return null;
  const parts = raw.split(',').map(s => s.trim());
  // Format: XKxx, altCode, standardCode
  // Prendre le dernier s'il n'est pas un nombre pur
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] && !/^\d+$/.test(parts[i])) {
      return parts[i];
    }
  }
  // Fallback: code XK
  return parts[0] || null;
}

// Extrait une plage d'années
function parseYears(desc) {
  const m1 = desc.match(/\((\d{4})[-–](\d{4})\)/);
  if (m1) return { yearStart: +m1[1], yearEnd: +m1[2] };
  const m2 = desc.match(/\b(\d{2})-(\d{2})\b/);
  if (m2) {
    const s = +m2[1] < 50 ? 2000 + +m2[1] : 1900 + +m2[1];
    const e = +m2[2] < 50 ? 2000 + +m2[2] : 1900 + +m2[2];
    return { yearStart: s, yearEnd: e };
  }
  const m3 = desc.match(/\b(19|20)(\d{2})\b/);
  if (m3) return { yearStart: +m3[0], yearEnd: null };
  return { yearStart: null, yearEnd: null };
}

// Nettoie la description véhicule
function cleanVersion(desc) {
  return desc
    .replace(/\([^)]*\d{4}[-–]\d{4}[^)]*\)/g, '')
    .replace(/\b\d{2}-\d{2}\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim() || null;
}

// ─── Agrégation par (make_id, model_id, vehicle_desc) ────────────────────────
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
      xm38Codes:    new Set(),
      key_ids:      [],
      freq:         null,
      encode:       null,
      transponder:  null,
      blade:        null,
      cloneable:    false,
    });
  }

  const entry = vehicleMap.get(key);
  entry.key_ids.push(row.key_id);

  const { series, xm38 } = parseRemoteDesc(row.remote_desc_v2);
  series.forEach(s => entry.series.add(s));
  xm38.forEach(c => entry.xm38Codes.add(c));

  const f = featMap[row.key_id] || {};

  // Premier key_id ayant les données gagne
  if (!entry.freq && f.freq)         entry.freq        = f.freq;
  if (!entry.encode && f.encode)     entry.encode      = f.encode;
  if (!entry.transponder && f.known_as_id)   entry.transponder = f.known_as_id;
  if (!entry.transponder)                    entry.transponder = parseTransponderFromDesc(row.vehicle_desc);
  if (!entry.blade && f.blank)       entry.blade       = parseBladeCode(f.blank);
  if (f.cloneable_remote === '1' || f.cloneable_chip === '1') entry.cloneable = true;
}

// ─── Construction des entrées finales ────────────────────────────────────────
const output = [];

for (const entry of vehicleMap.values()) {
  const { yearStart, yearEnd } = parseYears(entry.vehicle_desc);
  const version = cleanVersion(entry.vehicle_desc);

  // Remotes : XM38 en premier, puis XK/XN/XE selon série
  const remotes = [...entry.xm38Codes];
  const brandCodes = BRAND_REMOTES[entry.make_id] || {};
  for (const serie of ['XK', 'XN', 'XE', 'XS']) {
    if (entry.series.has(serie) && brandCodes[serie]?.length) {
      remotes.push(...brandCodes[serie]);
    }
  }

  // Fréquence formatée "433.92 MHz ASK"
  let freq = null;
  if (entry.freq && entry.encode) {
    freq = `${entry.freq} MHz ${entry.encode}`;
  } else if (entry.freq) {
    freq = `${entry.freq} MHz`;
  }

  // Lame : feature 1 en priorité, sinon lames.db par brand+model+années
  let blade = entry.blade;
  if (!blade) {
    blade = findBlade(entry.brand, entry.model, yearStart, yearEnd);
  }

  output.push({
    brand:       entry.brand,
    model:       entry.model,
    yearStart,
    yearEnd,
    version,
    remotes:     [...new Set(remotes)],
    freq,
    transponder: entry.transponder,
    blade,
    clonable:    entry.cloneable,
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
// Source : xhorse-pwa/public/assets/remotes.db + lames.db
// ${output.length} entrées véhicules pour ${Object.keys(MAKE_MAP).length} marques
const REMOTES_DB = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync(OUT_PATH, js, 'utf8');

// ─── Stats ────────────────────────────────────────────────────────────────────
const withTransponder = output.filter(e => e.transponder).length;
const withBlade       = output.filter(e => e.blade).length;
const withFreq        = output.filter(e => e.freq).length;
const withClonable    = output.filter(e => e.clonable).length;
const withRemotes     = output.filter(e => e.remotes.length).length;

console.log(`\n✅ ${output.length} véhicules extraits → ${OUT_PATH}`);
console.log(`\n📊 Couverture des données :`);
console.log(`   Transpondeur  : ${withTransponder} / ${output.length} (${Math.round(withTransponder/output.length*100)}%)`);
console.log(`   Lame          : ${withBlade} / ${output.length} (${Math.round(withBlade/output.length*100)}%)`);
console.log(`   Fréquence     : ${withFreq} / ${output.length} (${Math.round(withFreq/output.length*100)}%)`);
console.log(`   Télécommande  : ${withRemotes} / ${output.length} (${Math.round(withRemotes/output.length*100)}%)`);
console.log(`   Clonable      : ${withClonable} / ${output.length} (${Math.round(withClonable/output.length*100)}%)`);

console.log('\nMarques :');
const brands = [...new Set(output.map(e => e.brand))].sort();
brands.forEach(b => {
  const entries = output.filter(e => e.brand === b);
  const t = entries.filter(e => e.transponder).length;
  const bl = entries.filter(e => e.blade).length;
  const cl = entries.filter(e => e.clonable).length;
  console.log(`  ${b.padEnd(14)} ${String(entries.length).padStart(4)} entrées  |  transpo: ${t}  lame: ${bl}  clonable: ${cl}`);
});

console.log('\nExemple Audi A4 :');
const ex = output.find(e => e.brand === 'Audi' && e.model === 'A4' && e.transponder);
if (ex) console.log(JSON.stringify(ex, null, 2));
