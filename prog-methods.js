// BASE MÉTHODES DE PROGRAMMATION — AutoLock Pro
// Sources : OBDSTAR officiel, Autel officiel, retours terrain 2024-2025
// Légende : 'oui' = OBD direct | 'bench' = dépose nécessaire | 'partiel' = selon année/modèle | 'non' = non supporté

const PROG_METHODS = {

  // ─── RENAULT / DACIA ──────────────────────────────────────────────────────
  'Renault': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'OBDSTAR très fort sur Renault. Clio V/Mégane IV/Captur II 2019+ : OBDSTAR préféré (serveur UCH). Clio I-IV, Mégane I-III : OBD direct les deux outils.'
    },
    models: {
      'Clio':    { obd: 'oui', bench: 'non', meilleur: 'obdstar', note: 'Clio I-IV : OBD. Clio V (2019+) : OBDSTAR via serveur ou bench UCH.' },
      'Megane':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Mégane I-III : OBD. Mégane IV (2016+) : bench UCH ou serveur OBDSTAR.' },
      'Captur':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Captur I (2013-2019) : OBD. Captur II (2019+) : OBDSTAR serveur.' },
      'Kangoo':  { obd: 'oui', bench: 'non', meilleur: 'obdstar', note: 'OBD direct. Kangoo III (2021+) partiel.' },
      'Twingo':  { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'Twingo I-II : OBD facile. Twingo III : OBD ou bench.' },
      'Scenic':  { obd: 'oui', bench: 'non', meilleur: 'obdstar', note: 'OBD direct toutes générations.' },
      'Laguna':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Laguna II : OBD. Laguna III : bench carte ou OBD OBDSTAR.' },
      'Trafic':  { obd: 'oui', bench: 'non', meilleur: 'obdstar', note: 'OBD direct. Trafic III (2014+) : OBDSTAR recommandé.' },
      'Master':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Master III 2021+ : OBDSTAR ou bench UCH.' },
    }
  },
  'Dacia': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Plateforme Renault — mêmes règles. Duster/Logan/Sandero : OBD direct. Dacia Spring (électrique) : partiel.'
    }
  },

  // ─── PEUGEOT / CITROËN ────────────────────────────────────────────────────
  'Peugeot': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'PSA : OBD facile sur la plupart. 208/308/3008/5008 2019+ : BSI bench parfois nécessaire en cas de toutes clés perdues. Autel et OBDSTAR équivalents.'
    },
    models: {
      '206':   { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct ID46.' },
      '207':   { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      '208':   { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: '208 I (2012-2019) : OBD. 208 II (2019+) : OBD ou bench BSI.' },
      '307':   { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct ID46.' },
      '308':   { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: '308 I/II : OBD. 308 III (2021+) : bench BSI.' },
      '3008':  { obd: 'oui', bench: 'partiel', meilleur: 'autel', note: '3008 I : OBD. 3008 II (2017+) : OBD ou bench. Autel légèrement meilleur.' },
      '5008':  { obd: 'oui', bench: 'partiel', meilleur: 'autel', note: 'Similaire 3008.' },
      '508':   { obd: 'oui', bench: 'partiel', meilleur: 'autel', note: '508 II (2018+) : bench BSI ou OBD.' },
      '107':   { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct ID46.' },
      '2008':  { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: '2008 II (2019+) : OBD ou bench.' },
    }
  },
  'Citroën': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'Plateforme PSA — mêmes méthodes que Peugeot. C3/C4/C5 : OBD direct. Modèles 2019+ : parfois bench BSI.'
    },
    models: {
      'C1':    { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct ID46.' },
      'C2':    { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      'C3':    { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: 'C3 I-II : OBD. C3 III (2017+) : OBD ou bench.' },
      'C4':    { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: 'C4 I-II : OBD. C4 III (2020+) : bench BSI.' },
      'C5':    { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      'Berlingo': { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct. Berlingo III (2018+) : partiel.' },
      'Jumpy': { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
    }
  },

  // ─── VOLKSWAGEN / AUDI / SKODA / SEAT ────────────────────────────────────
  'Volkswagen': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'les deux',
      notes: 'VAG complexe selon génération IMMO. IMMO3 (Golf IV, Polo 9N) : OBD direct ID48. IMMO4 (Golf V/VI, NEC) : bench tableau de bord OBLIGATOIRE en cas toutes clés perdues. IMMO5/MQB (Golf VII+, 2013+) : bench ou OBD selon modèle. Les deux outils compétents, OBDSTAR légèrement plus rapide sur VW.'
    },
    models: {
      'Golf':    { obd: 'partiel', bench: 'oui', meilleur: 'obdstar', note: 'Golf IV : OBD ID48. Golf V/VI IMMO4 : BENCH NEC24C64. Golf VII MQB : bench ou OBD. Golf VIII : bench.' },
      'Polo':    { obd: 'partiel', bench: 'oui', meilleur: 'obdstar', note: 'Polo 9N/9N3 IMMO3 : OBD. Polo 6R/6C IMMO4 : bench. Polo AW MQB : bench.' },
      'Passat':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'Passat B6/B7 : bench IMMO4. Passat B8 MQB : bench.' },
      'Tiguan':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'Tiguan I IMMO4 : bench. Tiguan II MQB : bench.' },
      'T-Roc':   { obd: 'partiel', bench: 'oui', meilleur: 'autel',   note: 'MQB : bench, Autel meilleur.' },
      'Touareg': { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'Bench selon génération.' },
      'Sharan':  { obd: 'partiel', bench: 'oui', meilleur: 'obdstar', note: 'IMMO4 : bench.' },
      'Caddy':   { obd: 'partiel', bench: 'oui', meilleur: 'obdstar', note: 'IMMO4/5 selon année.' },
    }
  },
  'Audi': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'les deux',
      notes: 'Même logique VAG. A3/A4/A6 anciens (IMMO3) : OBD ID48. Modèles 2007+ IMMO4/5 : bench. Modèles 2018+ (MQB/MLB) : bench obligatoire. Les deux outils équivalents.'
    },
    models: {
      'A1':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'MQB : bench.' },
      'A3':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'A3 8L : OBD ID48. A3 8P IMMO4 : bench. A3 8V MQB : bench.' },
      'A4':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'A4 B5/B6 : OBD ID48. A4 B7/B8 : bench IMMO4/5.' },
      'A6':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'A6 C5 : OBD. A6 C6/C7/C8 : bench.' },
      'TT':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'MK1 : OBD. MK2/3 : bench.' },
      'Q3':  { obd: 'partiel', bench: 'oui', meilleur: 'autel',   note: 'MQB : bench, Autel recommandé.' },
      'Q5':  { obd: 'partiel', bench: 'oui', meilleur: 'les deux', note: 'Bench selon génération.' },
    }
  },
  'Skoda': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'obdstar',
      notes: 'Plateforme VAG. Octavia I/II IMMO3/4 : bench. Fabia/Rapid : bench IMMO4. Octavia III/Superb III MQB : bench. OBDSTAR légèrement plus couvert sur Skoda.'
    }
  },
  'Seat': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'obdstar',
      notes: 'Plateforme VAG. Ibiza/Leon : bench IMMO4 (2006+). Anciens modèles IMMO3 : OBD.'
    }
  },

  // ─── BMW / MINI ───────────────────────────────────────────────────────────
  'BMW': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'autel',
      notes: 'BMW : complexe selon module IMMO. CAS1/2/3 (série E, 2002-2013) : OBD ou bench, les deux outils. CAS4/4+ (série F, 2011-2018) : bench avec Autel+GBOX2 ou OBDSTAR. FEM/BDC (série F post-2013 / G) : bench obligatoire, Autel IM608+GBOX2 recommandé. G-série (2018+) : très restrictif, serveur requis. Autel légèrement supérieur sur BMW.'
    },
    models: {
      'Serie 3': { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'E46 CAS1 : OBD. E90 CAS3 : OBD/bench. F30 CAS4/FEM : bench.' },
      'Serie 5': { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'E60 CAS3 : OBD/bench. F10 CAS4/FEM : bench.' },
      'Serie 1': { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'F20 FEM : bench. E87 CAS3 : OBD/bench.' },
      'Serie 7': { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'E65 CAS2 : OBD. F01 CAS4 : bench.' },
      'X5':      { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'E70 CAS3 : OBD/bench. F15 CAS4 : bench.' },
      'MINI':    { obd: 'partiel', bench: 'oui', meilleur: 'autel', note: 'R56 CAS3 : OBD/bench. F56 CAS4/FEM : bench.' },
    }
  },
  'Mini': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'autel',
      notes: 'Même plateforme BMW. R-série (CAS3) : OBD ou bench. F-série (CAS4/FEM) : bench obligatoire, Autel recommandé.'
    }
  },

  // ─── MERCEDES ─────────────────────────────────────────────────────────────
  'Mercedes': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'autel',
      notes: 'Mercedes : FBS1/2 (pre-2015) via OBD avec Autel+GBOX2 ou OBDSTAR. FBS3 (2015-2018) : bench EIS/EZS, Autel+GBOX2 fortement recommandé (mode rapide). FBS4 (2019+) : très restrictif, serveur ou bench complexe. Autel est meilleur outil sur Mercedes grâce au GBOX2 intégré.'
    }
  },

  // ─── FORD ─────────────────────────────────────────────────────────────────
  'Ford': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'Ford PATS 4/5 (Fiesta/Focus/C-Max pre-2018) : OBD direct ID60/63 facile. Ford 2018+ (Mondeo V, Focus IV, Puma) : OBD ou bench selon. Les deux outils bons sur Ford.'
    },
    models: {
      'Fiesta':  { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'Fiesta VI/VII PATS : OBD direct 4D60/63.' },
      'Focus':   { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: 'Focus II/III : OBD. Focus IV (2018+) : OBD ou bench.' },
      'C-Max':   { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      'Mondeo':  { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: 'Mondeo IV : OBD. Mondeo V (2015+) : OBD ou bench.' },
      'Kuga':    { obd: 'oui', bench: 'partiel', meilleur: 'les deux', note: 'Kuga I/II : OBD. Kuga III (2020+) : bench partiel.' },
      'Transit': { obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      'EcoSport':{ obd: 'oui', bench: 'non', meilleur: 'les deux', note: 'OBD direct.' },
      'Puma':    { obd: 'oui', bench: 'partiel', meilleur: 'autel', note: '2020+ : OBD ou bench, Autel recommandé.' },
    }
  },

  // ─── TOYOTA / LEXUS ───────────────────────────────────────────────────────
  'Toyota': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Toyota : OBDSTAR reconnu comme très fort. Puce G/H/BA (pre-2018) : OBD direct, les deux outils. Puce 8A (2018-2022) : OBD via Autel ou OBDSTAR (PIN gratuit). Puce H chip Y3 (2020+) : OBDSTAR recommandé, bench parfois. Yaris/Corolla/C-HR : OBD facile. OBDSTAR couvre 90%+ des Toyota.'
    },
    models: {
      'Yaris':    { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Yaris I-III : OBD puce G. Yaris IV (2020+) puce 8A/H : OBD OBDSTAR ou Autel. GR Yaris : bench.' },
      'Corolla':  { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct puce G/H. 2019+ : OBD 8A.' },
      'Auris':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct.' },
      'C-HR':     { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD puce 8A. OBDSTAR recommandé.' },
      'Prius':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct.' },
      'RAV4':     { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'RAV4 (2019+) puce 8A/H : OBD OBDSTAR.' },
      'Aygo':     { obd: 'oui', bench: 'non',     meilleur: 'les deux', note: 'OBD direct puce G/46.' },
      'Camry':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct.' },
      'Hilux':    { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Hilux 2020+ H Y3 : OBDSTAR recommandé, bench possible.' },
    }
  },

  // ─── NISSAN / INFINITI ────────────────────────────────────────────────────
  'Nissan': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Nissan bien couvert. Micra/Juke/Qashqai/Note : OBD direct ID46/4D. Qashqai J12 (2021+), Juke II (2020+) : OBDSTAR serveur recommandé. 2022+ : bench parfois. OBDSTAR reconnu meilleur sur Nissan.'
    },
    models: {
      'Micra':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct K12/K13. Micra K14 (2017+) : OBD OBDSTAR.' },
      'Juke':     { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Juke I : OBD. Juke II (2020+) : OBDSTAR serveur.' },
      'Qashqai':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'J10/J11 : OBD. J12 (2021+) : OBDSTAR serveur.' },
      'Note':     { obd: 'oui', bench: 'non',     meilleur: 'les deux', note: 'OBD direct.' },
      'Leaf':     { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct (électrique).' },
      'Navara':   { obd: 'oui', bench: 'non',     meilleur: 'les deux', note: 'OBD direct.' },
    }
  },

  // ─── KIA / HYUNDAI ────────────────────────────────────────────────────────
  'Kia': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'OBDSTAR reconnu très fort sur Kia/Hyundai. Ceed/Sportage/Stonic pre-2020 : OBD direct ID46/47. 2020+ : OBDSTAR recommandé, Autel possible. 2022+ (nouvelles plateformes) : bench parfois nécessaire.'
    }
  },
  'Hyundai': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Même plateforme Kia. i10/i20/i30/Tucson/Santa Fe pre-2020 : OBD direct. 2020+ : OBDSTAR recommandé. Ioniq 5/6 (électrique 2022+) : très partiel.'
    }
  },

  // ─── HONDA ────────────────────────────────────────────────────────────────
  'Honda': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'OBDSTAR très fort sur Honda. Jazz/Civic/CR-V/HR-V pre-2019 : OBD direct ID46/47. 2019+ : OBD OBDSTAR recommandé. Certains Honda 2022+ : bench partiel. OBDSTAR préféré sur Honda par les serruriers.'
    },
    models: {
      'Jazz':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'Jazz I-III : OBD ID46/47. Jazz IV (2020+) : OBDSTAR.' },
      'Civic':   { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Civic pre-2017 : OBD. Civic X/XI (2017+) : OBDSTAR recommandé.' },
      'CR-V':    { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'CR-V IV : OBD. CR-V V (2017+) : OBDSTAR.' },
      'HR-V':    { obd: 'oui', bench: 'non',     meilleur: 'obdstar', note: 'OBD direct.' },
      'Accord':  { obd: 'oui', bench: 'partiel', meilleur: 'obdstar', note: 'Accord pre-2018 : OBD. 2018+ : bench parfois.' },
    }
  },

  // ─── OPEL / VAUXHALL ──────────────────────────────────────────────────────
  'Opel': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'Corsa/Astra/Meriva/Zafira pre-2015 : OBD direct ID46. Corsa E/F (2015+) : OBD les deux outils. Corsa F (2020+) plateforme PSA : OBD. Crossland/Grandland (PSA) : méthode PSA. Les deux outils équivalents.'
    }
  },

  // ─── FIAT / ALFA ROMEO / LANCIA ───────────────────────────────────────────
  'Fiat': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Punto/Panda/500/Stilo : OBD direct ID46/48. Fiat 500X/Tipo (2015+) : OBD ou bench BCM2. Ducato : OBD direct. FCA 2019+ : bench BCM2 parfois. OBDSTAR bien couvert FCA.'
    }
  },
  'Alfa Romeo': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Alfa 147/156/159 : OBD direct. Alfa Giulietta/MiTo : OBD ID46. Giulia/Stelvio (2016+) : bench BCM2, OBDSTAR recommandé.'
    }
  },
  'Lancia': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'non', bench_autel: 'non',
      meilleur: 'les deux',
      notes: 'Ypsilon/Delta : OBD direct ID46/48 (plateforme Fiat).'
    }
  },

  // ─── VOLVO ────────────────────────────────────────────────────────────────
  'Volvo': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'autel',
      notes: 'Volvo S60/V70/XC60/XC90 pre-2015 : OBD les deux. 2015-2022 : bench CEM ou OBD. 2022+ (OBDSTAR ajout récent) : OBDSTAR supporte depuis 2024. Autel recommandé pour Volvo moderne (meilleur historique).'
    }
  },

  // ─── LAND ROVER / JAGUAR ──────────────────────────────────────────────────
  'Land Rover': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'autel',
      notes: 'Freelander/Discovery/Range Rover pre-2016 : OBD. 2016-2018 : bench KVM. 2017-2019+ : bench, Autel IM608+GBOX2 recommandé. 2020+ : très restrictif. Autel supérieur sur Land Rover.'
    }
  },

  // ─── PORSCHE ──────────────────────────────────────────────────────────────
  'Porsche': {
    default: {
      obdstar: 'partiel', autel: 'partiel',
      bench_obdstar: 'oui', bench_autel: 'oui',
      meilleur: 'les deux',
      notes: 'Porsche 911/Cayenne/Boxster pre-2015 : OBD. 2015+ : bench ou OBD selon modèle. Cayenne (VW/Audi plateforme) : méthode VAG. Les deux outils équivalents.'
    }
  },

  // ─── MAZDA ────────────────────────────────────────────────────────────────
  'Mazda': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'Mazda 2/3/6/CX-3/CX-5 pre-2020 : OBD direct ID63. 2020+ : OBD ou bench selon. Les deux outils couvrent bien Mazda.'
    }
  },

  // ─── MITSUBISHI ───────────────────────────────────────────────────────────
  'Mitsubishi': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Outlander/ASX/Colt/Lancer : OBD direct ID46/4D. Outlander III (2012+) / Eclipse Cross (2017+) : OBD OBDSTAR recommandé. OBDSTAR couverture légèrement supérieure Mitsubishi.'
    }
  },

  // ─── SUZUKI ───────────────────────────────────────────────────────────────
  'Suzuki': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'obdstar',
      notes: 'Swift/Vitara/SX4 : OBD direct ID46/47. Vitara II (2015+) / Swift (2017+) : OBDSTAR recommandé. OBDSTAR légèrement meilleur sur Suzuki.'
    }
  },

  // ─── SUBARU ───────────────────────────────────────────────────────────────
  'Subaru': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'les deux',
      notes: 'Impreza/Forester/Outback : OBD direct ID46. 2018+ : OBD les deux outils. Couverture similaire.'
    }
  },

  // ─── CHRYSLER / JEEP / DODGE ─────────────────────────────────────────────
  'Chrysler': {
    default: {
      obdstar: 'oui', autel: 'oui',
      bench_obdstar: 'partiel', bench_autel: 'partiel',
      meilleur: 'autel',
      notes: 'FCA US. Cherokee/Grand Cherokee/Compass/300C : OBD direct. 2018+ Fiat/FCA chiffré : Autel nécessite abonnement AutoAuth pour Dodge/Jeep 2019+. Autel recommandé FCA US récent.'
    }
  },
};
