// BASE MÉTHODES DE PROGRAMMATION — AutoLock Pro
// Sources : OBDSTAR G3 officiel, Autel IM608 Pro II officiel, Xhorse VVDI Key Tool Max Pro officiel, retours terrain 2024-2025
// Légende valeurs : 'oui' = OBD direct facile | 'partiel' = selon année/modèle | 'non' = non supporté
// KTMP = Xhorse VVDI Key Tool Max Pro (intègre Mini OBD Tool V2)
// Note KTMP : son point fort = génération remotes + clonage transpondeur. OBD IMMO en bonus, moins puissant que G3/IM608.

const PROG_METHODS = {

  // ─── RENAULT / DACIA ──────────────────────────────────────────────────────
  'Renault': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'OBDSTAR G3 très fort Renault. Clio I-IV, Mégane I-III, Scenic, Kangoo : OBD direct G3 ou IM608. Clio V/Mégane IV/Captur II 2019+ : OBDSTAR G3 via serveur UCH. KTMP : OBD basique sur Clio I-III/Mégane I-II, insuffisant sur modèles récents.'
    },
    models: {
      'Clio':   { obd:'oui',     bench:'non',     ktmp:'partiel', note:'Clio I-III : OBD les 3 outils. Clio IV : G3/IM608. Clio V (2019+) : G3 serveur uniquement.' },
      'Megane': { obd:'oui',     bench:'partiel', ktmp:'partiel', note:'Mégane I-II : OBD. Mégane III : G3/IM608. Mégane IV (2016+) : bench UCH ou serveur G3.' },
      'Captur': { obd:'oui',     bench:'partiel', ktmp:'partiel', note:'Captur I : OBD G3/IM608. Captur II (2019+) : G3 serveur.' },
      'Kangoo': { obd:'oui',     bench:'non',     ktmp:'oui',     note:'Kangoo I-II : OBD direct les 3 outils. Kangoo III (2021+) : G3 recommandé.' },
      'Twingo': { obd:'oui',     bench:'non',     ktmp:'oui',     note:'Twingo I-II : OBD direct les 3 outils. Twingo III : G3/IM608.' },
      'Scenic': { obd:'oui',     bench:'non',     ktmp:'oui',     note:'OBD direct toutes générations.' },
      'Laguna': { obd:'oui',     bench:'partiel', ktmp:'non',     note:'Laguna II : OBD G3/IM608. Laguna III carte : bench G3.' },
      'Trafic': { obd:'oui',     bench:'non',     ktmp:'partiel', note:'Trafic II-III : G3/IM608 OBD. KTMP limité.' },
      'Master': { obd:'oui',     bench:'partiel', ktmp:'non',     note:'Master III 2021+ : G3 ou bench UCH.' },
    }
  },
  'Dacia': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Plateforme Renault. Duster/Logan/Sandero : OBD direct G3 ou IM608. KTMP : basique sur anciens modèles. Dacia Spring électrique : partiel G3.'
    }
  },

  // ─── PEUGEOT / CITROËN ────────────────────────────────────────────────────
  'Peugeot': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'G3 et IM608 équivalents sur PSA. OBD direct sur la plupart. 208/308/3008 2019+ : bench BSI parfois nécessaire en toutes clés perdues. KTMP : OBD possible sur 206/207/307/C3 anciens, insuffisant sur 2015+.'
    },
    models: {
      '206':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct ID46, les 3 outils.' },
      '207':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      '208':  { obd:'oui', bench:'partiel', ktmp:'partiel', note:'208 I (2012-2019) : OBD les 3. 208 II (2019+) : G3/IM608, bench BSI.' },
      '307':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct ID46.' },
      '308':  { obd:'oui', bench:'partiel', ktmp:'partiel', note:'308 I/II : OBD. 308 III (2021+) : bench BSI, G3/IM608.' },
      '3008': { obd:'oui', bench:'partiel', ktmp:'non',     note:'3008 II (2017+) : OBD ou bench. KTMP insuffisant.' },
      '5008': { obd:'oui', bench:'partiel', ktmp:'non',     note:'Similaire 3008.' },
      '508':  { obd:'oui', bench:'partiel', ktmp:'non',     note:'508 II (2018+) : bench BSI ou OBD G3/IM608.' },
      '107':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct ID46.' },
      '2008': { obd:'oui', bench:'partiel', ktmp:'non',     note:'2008 II (2019+) : G3/IM608.' },
    }
  },
  'Citroën': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Plateforme PSA — mêmes règles que Peugeot. C3/C4 anciens : OBD direct. 2019+ : bench BSI partiel. KTMP : basique sur anciens modèles PSA.'
    },
    models: {
      'C1':      { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct ID46.' },
      'C2':      { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'C3':      { obd:'oui', bench:'partiel', ktmp:'partiel', note:'C3 I-II : OBD. C3 III (2017+) : G3/IM608.' },
      'C4':      { obd:'oui', bench:'partiel', ktmp:'non',     note:'C4 III (2020+) : bench BSI G3/IM608.' },
      'C5':      { obd:'oui', bench:'non',     ktmp:'partiel', note:'OBD direct.' },
      'Berlingo':{ obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct. Berlingo III (2018+) : G3/IM608.' },
    }
  },

  // ─── VOLKSWAGEN / AUDI / SKODA / SEAT ────────────────────────────────────
  'Volkswagen': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'VAG selon génération IMMO. IMMO3 (Golf IV, puce 48) : OBD les 3 outils. IMMO4 (Golf V/VI, NEC24C64) : BENCH OBLIGATOIRE en toutes clés perdues — G3 ou IM608. IMMO5/MQB (Golf VII+, 2013+) : bench ou OBD selon. KTMP : OBD sur IMMO3 uniquement, inutilisable sur IMMO4/5/MQB.'
    },
    models: {
      'Golf':   { obd:'partiel', bench:'oui', ktmp:'partiel', note:'Golf IV IMMO3 : OBD les 3. Golf V/VI IMMO4 : BENCH G3/IM608. Golf VII/VIII MQB : bench.' },
      'Polo':   { obd:'partiel', bench:'oui', ktmp:'partiel', note:'Polo 9N IMMO3 : OBD. Polo 6R IMMO4 : bench. Polo AW MQB : bench.' },
      'Passat': { obd:'partiel', bench:'oui', ktmp:'non',     note:'B6/B7 IMMO4 : bench. B8 MQB : bench G3/IM608.' },
      'Tiguan': { obd:'partiel', bench:'oui', ktmp:'non',     note:'IMMO4/MQB : bench G3/IM608.' },
      'T-Roc':  { obd:'partiel', bench:'oui', ktmp:'non',     note:'MQB : bench, IM608 recommandé.' },
    }
  },
  'Audi': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'A3 8L/A4 B5-B6 IMMO3 (puce 48) : OBD les 3. A3 8P/A4 B7-B8+ IMMO4/5 : BENCH G3 ou IM608. MQB/MLB 2018+ : bench. KTMP : OBD sur IMMO3 uniquement.'
    },
    models: {
      'A3':  { obd:'partiel', bench:'oui', ktmp:'partiel', note:'A3 8L : OBD. A3 8P IMMO4 : bench. A3 8V MQB : bench.' },
      'A4':  { obd:'partiel', bench:'oui', ktmp:'partiel', note:'A4 B5/B6 : OBD. A4 B7/B8 : bench.' },
      'A6':  { obd:'partiel', bench:'oui', ktmp:'non',     note:'A6 C5 : OBD. C6/C7/C8 : bench.' },
      'TT':  { obd:'partiel', bench:'oui', ktmp:'partiel', note:'MK1 : OBD. MK2/3 : bench.' },
    }
  },
  'Skoda': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Plateforme VAG. Octavia I IMMO3 : OBD. Octavia II/III IMMO4/MQB : bench G3 ou IM608. KTMP : IMMO3 seulement.'
    }
  },
  'Seat': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Plateforme VAG. Ibiza/Leon anciens IMMO3 : OBD. IMMO4 (2006+) : bench. KTMP : IMMO3 basique seulement.'
    }
  },

  // ─── BMW / MINI ───────────────────────────────────────────────────────────
  'BMW': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'CAS1/2/3/3+ (série E, 2002-2013) : OBD ou bench — G3, IM608 ET KTMP ✓. CAS4/4+ (série F, 2011-2018) : bench G3 ou IM608 uniquement. FEM/BDC (F post-2013 / G) : bench IM608+GBOX2 recommandé. G-série 2018+ : très restrictif. KTMP LIMITÉ à CAS1/2/3/3+ uniquement, pas CAS4/FEM.'
    },
    models: {
      'Serie 3': { obd:'partiel', bench:'oui', ktmp:'partiel', note:'E46 CAS1/E90 CAS3 : OBD les 3. F30 CAS4/FEM : bench G3/IM608 uniquement.' },
      'Serie 5': { obd:'partiel', bench:'oui', ktmp:'partiel', note:'E60 CAS3 : OBD les 3. F10 CAS4/FEM : bench G3/IM608.' },
      'Serie 1': { obd:'partiel', bench:'oui', ktmp:'partiel', note:'E87 CAS3 : OBD les 3. F20 FEM : bench G3/IM608.' },
      'Serie 7': { obd:'partiel', bench:'oui', ktmp:'partiel', note:'E65 CAS2 : OBD les 3. F01 CAS4 : bench G3/IM608.' },
      'X5':      { obd:'partiel', bench:'oui', ktmp:'partiel', note:'E70 CAS3 : OBD les 3. F15 CAS4 : bench.' },
    }
  },
  'Mini': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'R-série CAS3 : OBD G3/IM608/KTMP. F-série CAS4/FEM : bench G3 ou IM608. KTMP limité R-série.'
    }
  },

  // ─── MERCEDES ─────────────────────────────────────────────────────────────
  'Mercedes': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'non',     bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'FBS1/2 (pre-2015) : OBD G3 ou IM608+GBOX2. FBS3 (2015-2018) : bench EIS/EZS, IM608+GBOX2 recommandé (mode rapide). FBS4 (2019+) : très restrictif. KTMP NON SUPPORTÉ sur Mercedes IMMO.'
    }
  },

  // ─── FORD ─────────────────────────────────────────────────────────────────
  'Ford': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Ford PATS 4/5 (Fiesta/Focus/C-Max pre-2018) : OBD direct ID60/63 les 3 outils. Ford 2018+ : G3 ou IM608. KTMP : OBD sur PATS anciens (Fiesta VI, Focus II/III), insuffisant sur Ford 2016+.'
    },
    models: {
      'Fiesta':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'Fiesta VI/VII PATS 4D60/63 : OBD les 3 outils.' },
      'Focus':   { obd:'oui', bench:'partiel', ktmp:'partiel', note:'Focus II/III : OBD les 3. Focus IV (2018+) : G3/IM608.' },
      'C-Max':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'Mondeo':  { obd:'oui', bench:'partiel', ktmp:'partiel', note:'Mondeo IV : OBD. Mondeo V : G3/IM608.' },
      'Kuga':    { obd:'oui', bench:'partiel', ktmp:'non',     note:'Kuga III (2020+) : G3/IM608.' },
      'Transit': { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'Puma':    { obd:'oui', bench:'partiel', ktmp:'non',     note:'2020+ : G3/IM608.' },
    }
  },

  // ─── TOYOTA ───────────────────────────────────────────────────────────────
  'Toyota': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'oui',     bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'OBDSTAR G3 très fort Toyota. Puce G/BA (pre-2018) : OBD direct les 3 outils. Puce 8A (2018-2022) : OBD G3/IM608/KTMP. KTMP supporte Corolla/Camry/RAV4/Highlander/Yaris 8A add key + AKL. Puce H/Y3 (2020+) : G3 recommandé, KTMP limité. Note KTMP : 8A-A9 type AKL et 4A/8A-AA NON supportés.'
    },
    models: {
      'Yaris':   { obd:'oui', bench:'partiel', ktmp:'oui',     note:'Yaris I-III puce G : OBD les 3. Yaris IV 8A : G3/IM608/KTMP. GR Yaris : bench G3.' },
      'Corolla': { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct puce G/8A, les 3 outils.' },
      'Auris':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct puce G.' },
      'C-HR':    { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD puce 8A — G3/IM608/KTMP.' },
      'Prius':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'RAV4':    { obd:'oui', bench:'partiel', ktmp:'oui',     note:'RAV4 2019+ puce 8A : OBD les 3.' },
      'Aygo':    { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct puce G/46.' },
      'Camry':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct puce 8A/G.' },
      'Hilux':   { obd:'oui', bench:'partiel', ktmp:'partiel', note:'Hilux 2020+ H Y3 : G3 recommandé. KTMP partiel.' },
    }
  },

  // ─── NISSAN ───────────────────────────────────────────────────────────────
  'Nissan': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Micra/Juke/Qashqai/Note pre-2020 : OBD direct ID46/4D. G3/IM608. KTMP : OBD sur Micra/Note/Juke I/Qashqai J10-J11. Qashqai J12 (2021+), Juke II : G3 serveur.'
    },
    models: {
      'Micra':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'K12/K13 : OBD les 3. K14 (2017+) : G3/IM608.' },
      'Juke':    { obd:'oui', bench:'partiel', ktmp:'partiel', note:'Juke I : OBD les 3. Juke II (2020+) : G3 serveur.' },
      'Qashqai': { obd:'oui', bench:'partiel', ktmp:'partiel', note:'J10/J11 : OBD les 3. J12 (2021+) : G3 serveur.' },
      'Note':    { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'Navara':  { obd:'oui', bench:'non',     ktmp:'oui',     note:'OBD direct.' },
      'Leaf':    { obd:'oui', bench:'non',     ktmp:'non',     note:'G3/IM608. KTMP non adapté électrique.' },
    }
  },

  // ─── KIA / HYUNDAI ────────────────────────────────────────────────────────
  'Kia': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'G3 très fort Kia. Ceed/Sportage pre-2020 : OBD direct ID46/47. KTMP : OBD sur modèles pre-2018 (Ceed I/II, Sportage III). 2020+ : G3 recommandé, KTMP insuffisant.'
    }
  },
  'Hyundai': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Même plateforme Kia. i10/i20/i30/Tucson pre-2020 : OBD direct. KTMP : OBD sur modèles anciens. 2020+ : G3 recommandé.'
    }
  },

  // ─── HONDA ────────────────────────────────────────────────────────────────
  'Honda': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'G3 très fort Honda. Jazz/Civic/CR-V/HR-V pre-2019 : OBD direct ID46/47. KTMP : OBD sur Jazz I-III, Civic pre-2017, HR-V I. 2019+ : G3 recommandé, KTMP insuffisant.'
    },
    models: {
      'Jazz':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'Jazz I-III : OBD les 3. Jazz IV (2020+) : G3.' },
      'Civic':  { obd:'oui', bench:'partiel', ktmp:'partiel', note:'Civic pre-2017 : OBD les 3. Civic X/XI : G3.' },
      'CR-V':   { obd:'oui', bench:'partiel', ktmp:'partiel', note:'CR-V IV : OBD. CR-V V (2017+) : G3.' },
      'HR-V':   { obd:'oui', bench:'non',     ktmp:'oui',     note:'HR-V I : OBD les 3.' },
    }
  },

  // ─── OPEL ─────────────────────────────────────────────────────────────────
  'Opel': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Corsa/Astra/Zafira pre-2015 : OBD direct ID46. KTMP : OBD sur Corsa C/D, Astra H/J. Corsa E/F (2015+) : G3/IM608. Crossland/Grandland (PSA) : méthode PSA, KTMP non.'
    }
  },

  // ─── FIAT / ALFA / LANCIA ─────────────────────────────────────────────────
  'Fiat': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Punto/Panda/500/Stilo : OBD direct ID46/48. KTMP supporte Fiat Viaggio/Ottimo (smart key 3 boutons) + Jeep Renegade. Fiat 500X/Tipo (2015+) : G3/IM608, KTMP insuffisant. Ducato : OBD G3/IM608.'
    }
  },
  'Alfa Romeo': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'non',     bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Alfa 147/156/159/Giulietta : OBD G3/IM608. Giulia/Stelvio (2016+) : bench BCM2, G3 recommandé. KTMP non supporté Alfa.'
    }
  },
  'Lancia': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'non',
      autel:   'oui',     bench_autel:   'non',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Ypsilon/Delta : OBD direct ID46/48 (plateforme Fiat).'
    }
  },

  // ─── VOLVO ────────────────────────────────────────────────────────────────
  'Volvo': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'non',     bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'S60/V70/XC60 pre-2015 : OBD G3/IM608. 2015+ : bench CEM. OBDSTAR G3 ajout support Volvo 2022 depuis 2024. KTMP NON supporté Volvo.'
    }
  },

  // ─── LAND ROVER ───────────────────────────────────────────────────────────
  'Land Rover': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'non',     bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'Freelander/Discovery pre-2016 : OBD G3/IM608. 2016+ : bench KVM — IM608+GBOX2 recommandé. 2020+ très restrictif. KTMP NON supporté Land Rover IMMO.'
    }
  },

  // ─── PORSCHE ──────────────────────────────────────────────────────────────
  'Porsche': {
    default: {
      obdstar: 'partiel', bench_obdstar: 'oui',
      autel:   'partiel', bench_autel:   'oui',
      ktmp:    'non',     bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Porsche 911/Cayenne pre-2015 : OBD G3/IM608. 2015+ : bench ou OBD. Cayenne (plateforme VW) : méthode VAG. KTMP NON supporté Porsche IMMO.'
    }
  },

  // ─── MAZDA ────────────────────────────────────────────────────────────────
  'Mazda': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Mazda 2/3/6/CX-3/CX-5 pre-2020 : OBD direct ID63. KTMP : OBD sur modèles pre-2018. 2020+ : G3/IM608.'
    }
  },

  // ─── MITSUBISHI ───────────────────────────────────────────────────────────
  'Mitsubishi': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Outlander/ASX/Colt pre-2015 : OBD direct ID46/4D. KTMP : OBD sur modèles anciens. 2015+ : G3 recommandé.'
    }
  },

  // ─── SUZUKI ───────────────────────────────────────────────────────────────
  'Suzuki': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'obdstar',
      notes: 'Swift/Vitara/SX4 : OBD direct ID46/47. KTMP : OBD sur anciens modèles. Vitara II (2015+) / Swift (2017+) : G3 recommandé.'
    }
  },

  // ─── SUBARU ───────────────────────────────────────────────────────────────
  'Subaru': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'les deux',
      notes: 'Impreza/Forester/Outback : OBD direct ID46. 2018+ : G3/IM608. KTMP : OBD sur modèles anciens.'
    }
  },

  // ─── CHRYSLER ─────────────────────────────────────────────────────────────
  'Chrysler': {
    default: {
      obdstar: 'oui',     bench_obdstar: 'partiel',
      autel:   'oui',     bench_autel:   'partiel',
      ktmp:    'partiel', bench_ktmp:    'non',
      meilleur: 'autel',
      notes: 'FCA : Cherokee/Compass pre-2018 OBD G3/IM608/KTMP. 2019+ chiffré : IM608 avec AutoAuth. KTMP : Jeep Renegade supporté spécifiquement. Autres Chrysler/Dodge 2019+ : IM608.'
    }
  },
};
