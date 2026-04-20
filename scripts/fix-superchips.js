#!/usr/bin/env node
/**
 * fix-superchips.js
 * Corrige automatiquement tous les champs superChip de la DB dans index.html
 * selon la mapping officielle xhorse (superChipFor).
 * Les vehicles avec G chip Toyota (inconnu) sont laissés tels quels.
 */

const fs   = require('fs');
const path = require('path');

// ── Mapping officielle xhorse : ID → super chip ──────────────────────────
const XHORSE_SUPERCHIP = {
  '11': 'XT27A',
  '12': 'XT27A',
  '13': 'XT27A',
  '33': 'XT27A',
  '42': 'XT27A', '44': 'XT27A',
  '40': 'XT27A / XT27B',
  '41': 'XT27A / XT27B',
  '45': 'XT27A / XT27B',
  '46': 'XT27A / XT27B',
  '47': 'XT27A / XT27B',
  '48': 'XT27B / XT57',
  '49': 'XT27A / XT27B',
  '4A': 'XT27B / XT57',
  '4C': 'XT27A / XT27B',
  '4D': 'XT27A / XT27B / XT57',
  '60': 'XT27A / XT27B',
  '63': 'XT27A / XT27B',
  '68': 'XT27A / XT27B',
  '6A': 'XT27B / XT57',
  '70': 'XT27A / XT27B',
  '8A': 'XT27B / XT57',
  '8C': 'XT27A / XT27B',
  '8E': 'XT27B / XT57',
};

const CHIP_TO_ID = {
  'pcf7930': '33', 'pcf7931': '33', 'pcf7935': '33',
  'pcf7936': '46', 'pcf7936a': '46',
  'pcf7937': '4c', 'pcf7937e': '4c',
  'pcf7938': '4c', 'pcf7939': '4c',
  'pcf7941': '46', 'pcf7943': '46', 'pcf7944': '46',
  'pcf7945': '46', 'pcf7946': '46', 'pcf7947': '46',
  'pcf7952': '46', 'pcf7961': '46',
  'id11': '11', 'id12': '12', 'id13': '13',
  'id33': '33', 'id40': '40', 'id41': '41',
  'id42': '42', 'id44': '44', 'id45': '45',
  'id46': '46', 'id47': '47', 'id48': '48',
  'id49': '49', 'id4a': '4A', 'id4c': '4C',
  'id4d': '4D', 'id60': '60', 'id63': '63',
  'id68': '68', 'id6a': '6A', 'id70': '70',
  'id8a': '8A', 'id8c': '8C', 'id8e': '8E',
  'temic 11': '11', 'temic11': '11',
  'crypto1': '33', 'id33 crypto1': '33',
  'crypto2': '46', 'id46 crypto2': '46',
  'hitag2': '46',
  'hitag pro': '47', 'hitag2/hitag pro': '46',
  'hitag aes': '4A',
  'megamos 48': '48',
  'texas 4d': '4D', 'tiris 4d': '4D',
  'toyota h': '70', 'h chip': '70', 'h128': '8A',
  '4d70': '70', '4d63': '63', '4d60': '60',
  '4d67': '68', '4d82': '82',
};

// Cas spéciaux : IDs multiples → superChip combiné
// ex: ID48 + ID46 → XT27A / XT27B / XT57 (union)
const MULTI_EXCEPTIONS = {
  // BMW F10 : Hitag Pro (ID4A) + ID47 → XT27A / XT27B / XT57
  // Nissan Qashqai J11 : ID46 + ID47 → XT27A / XT27B / XT57
};

function extractIds(transponderStr) {
  if (!transponderStr) return [];
  const str = transponderStr.toLowerCase();
  const ids = new Set();

  const explicit = str.match(/\bid([0-9a-f]{2})\b/g);
  if (explicit) explicit.forEach(m => ids.add(m.replace('id', '').toUpperCase()));

  const hex = str.match(/\b(4[a-d]|8[a-e])\b/gi);
  if (hex) hex.forEach(m => ids.add(m.toUpperCase()));

  for (const [name, id] of Object.entries(CHIP_TO_ID)) {
    if (str.includes(name)) ids.add(id.toUpperCase());
  }

  return [...ids];
}

function normalizeSuperChip(sc) {
  if (!sc) return new Set();
  return new Set(
    sc.replace(/XT27A\d*/g, 'XT27A')
      .replace(/XT57B?/g, 'XT57')
      .split(/[\s\/,]+/)
      .filter(s => /^XT/.test(s))
  );
}

function expectedSuperChip(ids) {
  const chips = new Set();
  for (const id of ids) {
    const sc = XHORSE_SUPERCHIP[id];
    if (sc) normalizeSuperChip(sc).forEach(c => chips.add(c));
  }
  return chips;
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

// Ordre canonique pour affichage
function formatChips(chipSet) {
  const order = ['XT27A', 'XT27B', 'XT57'];
  const sorted = [...chipSet].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  return sorted.join(' / ');
}

// ── Lire le HTML ──────────────────────────────────────────────────────────
const htmlPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const m = html.match(/const DB = (\[[\s\S]*?\n\];)/);
if (!m) { console.error('DB non trouvé'); process.exit(1); }

let DB;
try { eval('DB = ' + m[1]); } catch(e) { console.error('Parse error:', e.message); process.exit(1); }

// ── Appliquer les corrections ─────────────────────────────────────────────
let fixCount = 0;
let skipCount = 0;
let unchanged = 0;

const correctedDB = DB.map(v => {
  const ids = extractIds(v.transponder);

  // Pas d'IDs connus → ne pas toucher (ex: G chip Toyota)
  if (!ids.length) {
    if (v.superChip) {
      console.log(`⚠️  SKIP (IDs inconnus) : ${v.brand} ${v.model} (${v.yearStart}-${v.yearEnd}) — superChip: ${v.superChip}`);
      skipCount++;
    }
    return v;
  }

  const expected = expectedSuperChip(ids);
  const actual   = normalizeSuperChip(v.superChip);

  if (setsEqual(expected, actual)) {
    unchanged++;
    return v;
  }

  // Cas particulier : si expected est vide (IDs non mappés), ne pas toucher
  if (!expected.size) {
    skipCount++;
    return v;
  }

  const newChip = formatChips(expected);
  console.log(`✅ FIX : ${v.brand} ${v.model} (${v.yearStart}-${v.yearEnd})`);
  console.log(`   "${v.superChip || '(vide)'}"  →  "${newChip}"`);
  fixCount++;

  return { ...v, superChip: newChip };
});

// ── Sérialiser et réécrire dans index.html ────────────────────────────────
// On reconstruit chaque entrée DB en gardant le format compact sur une ligne
function serializeEntry(v) {
  return JSON.stringify(v);
}

const newDbStr = '[\n' + correctedDB.map(v => '  ' + serializeEntry(v)).join(',\n') + '\n]';
const newHtml = html.replace(/const DB = \[[\s\S]*?\n\];/, 'const DB = ' + newDbStr + ';');

fs.writeFileSync(htmlPath, newHtml, 'utf8');

console.log(`\n${'═'.repeat(60)}`);
console.log(`✅ Corrections appliquées : ${fixCount}`);
console.log(`⚠️  Ignorés (IDs inconnus) : ${skipCount}`);
console.log(`   Inchangés (déjà corrects): ${unchanged}`);
console.log(`Total entrées DB : ${DB.length}`);
