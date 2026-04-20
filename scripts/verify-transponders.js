#!/usr/bin/env node
/**
 * verify-transponders.js
 * Compare les champs transponder + superChip de Autolock-pro
 * avec la mapping officielle xhorse (extraite de db.js de xhorse-pwa).
 */

const fs = require('fs');
const path = require('path');

// ── Mapping officielle xhorse : ID → super chip ───────────────────────────
// Source : xhorse-pwa/public/db.js → superChipFor()
const XHORSE_SUPERCHIP = {
  '11': 'XT27A',          // Temic 11, ID11
  '12': 'XT27A',
  '13': 'XT27A',          // Honda verre ID13
  '33': 'XT27A',          // Crypto1, ID33
  '42': 'XT27A', '44': 'XT27A',
  '40': 'XT27A / XT27B',
  '41': 'XT27A / XT27B',
  '45': 'XT27A / XT27B',
  '46': 'XT27A / XT27B',  // ID46 (PCF7936, Hitag2, PCF7946/7/61)
  '47': 'XT27A / XT27B',  // Hitag Pro
  '48': 'XT27B / XT57',   // Megamos 48
  '49': 'XT27A / XT27B',
  '4A': 'XT27B / XT57',   // Hitag AES
  '4C': 'XT27A / XT27B',
  '4D': 'XT27A / XT27B / XT57', // Toyota Texas 4D
  '60': 'XT27A / XT27B',
  '63': 'XT27A / XT27B',
  '68': 'XT27A / XT27B',
  '6A': 'XT27B / XT57',
  '70': 'XT27A / XT27B',  // Toyota H70
  '8A': 'XT27B / XT57',   // Toyota H128
  '8C': 'XT27A / XT27B',
  '8E': 'XT27B / XT57',
};

// ── Correspondance nom chip → ID xhorse ──────────────────────────────────
const CHIP_TO_ID = {
  // Philips/NXP
  'pcf7930': '33', 'pcf7931': '33',
  'pcf7935': '33',
  'pcf7936': '46', 'pcf7936a': '46',
  'pcf7937': '4c', 'pcf7937e': '4c',
  'pcf7938': '4c',
  'pcf7939': '4c',
  'pcf7941': '46',
  'pcf7943': '46',
  'pcf7944': '46',
  'pcf7945': '46',
  'pcf7946': '46',
  'pcf7947': '46',
  'pcf7952': '46',
  'pcf7961': '46',
  // IDs directs
  'id11': '11', 'id12': '12', 'id13': '13',
  'id33': '33', 'id40': '40', 'id41': '41',
  'id42': '42', 'id44': '44', 'id45': '45',
  'id46': '46', 'id47': '47', 'id48': '48',
  'id49': '49', 'id4a': '4A', 'id4c': '4C',
  'id4d': '4D', 'id60': '60', 'id63': '63',
  'id68': '68', 'id6a': '6A', 'id70': '70',
  'id8a': '8A', 'id8c': '8C', 'id8e': '8E',
  // Noms communs
  'temic 11': '11', 'temic11': '11',
  'crypto1': '33', 'id33 crypto1': '33',
  'crypto2': '46', 'id46 crypto2': '46',
  'hitag2': '46',
  'hitag pro': '47', 'hitag2/hitag pro': '46',
  'hitag aes': '4A', 'id4a': '4A',
  'megamos 48': '48',
  'texas 4d': '4D', 'tiris 4d': '4D',
  'toyota h': '70', 'h chip': '70', 'h128': '8A',
  '4d70': '70', '4d63': '63', '4d60': '60',
  '4d67': '68', '4d82': '82',
};

// ── Extraire tous les IDs transpondeur d'une chaîne ─────────────────────
function extractIds(transponderStr) {
  if (!transponderStr) return [];
  const str = transponderStr.toLowerCase();
  const ids = new Set();

  // IDs explicites style IDxx
  const explicit = str.match(/\bid([0-9a-f]{2})\b/g);
  if (explicit) explicit.forEach(m => ids.add(m.replace('id', '').toUpperCase()));

  // Hex codes 4D, 4A etc. hors préfixe ID
  const hex = str.match(/\b(4[a-d]|8[a-e])\b/gi);
  if (hex) hex.forEach(m => ids.add(m.toUpperCase()));

  // Noms de chips connus
  for (const [name, id] of Object.entries(CHIP_TO_ID)) {
    if (str.includes(name)) ids.add(id.toUpperCase());
  }

  return [...ids];
}

// ── Normaliser un superChip DB vers format comparable ───────────────────
function normalizeSuperChip(sc) {
  if (!sc) return new Set();
  return new Set(
    sc.replace(/XT27A\d*/g, 'XT27A')  // XT27A66 / XT27A01 → XT27A
      .replace(/XT57B?/g, 'XT57')
      .split(/[\s\/,]+/)
      .filter(s => /^XT/.test(s))
  );
}

// ── Calcul du super chip attendu d'après les IDs ─────────────────────────
function expectedSuperChip(ids) {
  const chips = new Set();
  for (const id of ids) {
    const sc = XHORSE_SUPERCHIP[id];
    if (sc) normalizeSuperChip(sc).forEach(c => chips.add(c));
  }
  return chips;
}

// ── Lire le DB de Autolock-pro ────────────────────────────────────────────
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const m = html.match(/const DB = (\[[\s\S]*?\n\];)/);
if (!m) { console.error('DB non trouvé'); process.exit(1); }

let DB;
try { eval('DB = ' + m[1]); } catch(e) { console.error('Parse error:', e.message); process.exit(1); }

// ── Vérification ─────────────────────────────────────────────────────────
const issues = [];
const ok     = [];

for (const v of DB) {
  const ids = extractIds(v.transponder);
  if (!ids.length) {
    // Pas de puce électronique connue
    if (v.superChip) {
      issues.push({ ...v, issue: 'SUPER CHIP SANS ID CONNU', ids: [], expected: new Set(), actual: normalizeSuperChip(v.superChip) });
    }
    continue;
  }

  const expected = expectedSuperChip(ids);
  const actual   = normalizeSuperChip(v.superChip);

  // Trouver ce qui manque et ce qui est en trop
  const missing = [...expected].filter(c => !actual.has(c));
  const extra   = [...actual].filter(c => !expected.has(c));

  if (missing.length || extra.length) {
    issues.push({ brand: v.brand, model: v.model, yearStart: v.yearStart, yearEnd: v.yearEnd,
      transponder: v.transponder, superChip: v.superChip, ids, expected, actual, missing, extra });
  } else {
    ok.push(v);
  }
}

// ── Rapport ───────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(70)}`);
console.log(`VÉRIFICATION TRANSPONDEURS — ${new Date().toLocaleDateString('fr-FR')}`);
console.log(`Source super chip : xhorse-pwa/public/db.js → superChipFor()`);
console.log('═'.repeat(70));
console.log(`✅ Corrects : ${ok.length}   ❌ À corriger : ${issues.length}\n`);

// Grouper par type d'erreur
const byMissing = {};
for (const iss of issues) {
  const key = `MANQUE:${iss.missing?.join('+')} / EN TROP:${iss.extra?.join('+')}`;
  if (!byMissing[key]) byMissing[key] = [];
  byMissing[key].push(iss);
}

for (const [errType, list] of Object.entries(byMissing)) {
  console.log(`\n── ${errType} (${list.length} véhicule${list.length>1?'s':''}) ──`);
  for (const v of list) {
    const exp = [...v.expected].sort().join(' / ') || '?';
    const act = [...v.actual].sort().join(' / ') || '(vide)';
    console.log(`  ${v.brand} ${v.model} (${v.yearStart}-${v.yearEnd})`);
    console.log(`    Transpondeur : ${v.transponder}`);
    console.log(`    IDs détectés : ${v.ids.join(', ')}`);
    console.log(`    Xhorse attend: ${exp}`);
    console.log(`    App a        : ${act}`);
  }
}

// ── Résumé des corrections à faire ───────────────────────────────────────
console.log(`\n${'═'.repeat(70)}`);
console.log('CORRECTIONS SUGGÉRÉES');
console.log('═'.repeat(70));

const corrections = {};
for (const v of issues) {
  if (!v.ids.length) continue;
  const correctChips = [...v.expected].sort().join(' / ');
  if (!corrections[correctChips]) corrections[correctChips] = [];
  corrections[correctChips].push(`${v.brand} ${v.model}`);
}
for (const [chips, models] of Object.entries(corrections)) {
  console.log(`\nsuperChip: "${chips}"`);
  models.forEach(m => console.log(`  - ${m}`));
}
