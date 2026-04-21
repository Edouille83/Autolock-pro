// AUTO-GÉRÉ — proc-data.js
// Procédures d'apprentissage clé + emplacement boîtier IMMO
// Structure : "Marque|Modèle" : { immoBox, tool, pin, steps[] }
const PROC_DATA = {

  // ═══════════════════════════════════════════════════
  //  RENAULT
  // ═══════════════════════════════════════════════════
  "Renault|Clio II": {
    immoBox: "UCH (Unité de Contrôle Habitacle) Sagem/Siemens — sous le tableau de bord côté conducteur, fixé sur la planche de bord derrière le combiné d'instruments",
    tool: "VVDI KeyTool / VVDI2 / KeyTool Max",
    pin: "Calculable depuis le VIN (logiciel Renault Calc / VVDI)",
    steps: [
      "Calculer le PIN depuis le VIN ou lire via OBD",
      "Brancher l'outil VVDI sur la prise OBD",
      "Sélectionner : Renault → Clio II → Apprentissage clé (ID33/ID46)",
      "Entrer le PIN — mettre contacteur sur ON",
      "Insérer clé vierge PCF7930 (Ph1) ou PCF7936 (Ph2) dans le contacteur",
      "Confirmer l'apprentissage — max 4 clés au total",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Clio III": {
    immoBox: "UCH (Valeo/Sagem) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (VVDI2 → Renault → Clio III → Lire PIN)",
    steps: [
      "Lire le PIN via OBD",
      "Sélectionner Renault → Clio III → Apprentissage clé",
      "Entrer le PIN récupéré",
      "Insérer clé vierge PCF7936 dans le contacteur",
      "Confirmer l'apprentissage — max 3 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Clio IV": {
    immoBox: "UCM/BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel IM508",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire le PIN via OBD",
      "Sélectionner Renault → Clio IV → Apprentissage clé",
      "Insérer clé vierge Hitag AES / PCF7953",
      "Confirmer — max 3 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Mégane II": {
    immoBox: "UCH (Valeo/Sagem) — sous le tableau de bord côté conducteur, fixé sur la planche de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (VVDI2 → Renault → Mégane II → Lire PIN IMMO4)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Mégane II → Apprentissage clé",
      "Entrer le PIN — insérer clé vierge PCF7936",
      "Confirmer l'apprentissage",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Mégane III": {
    immoBox: "UCM/BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Mégane III → Apprentissage clé",
      "Insérer clé vierge PCF7952 / Hitag2",
      "Confirmer — max 3 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Scénic II": {
    immoBox: "UCH (Valeo/Sagem) — sous le tableau de bord côté conducteur (même plateforme Mégane II)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique Mégane II)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Mégane II / Scénic II → Apprentissage clé",
      "Insérer clé vierge PCF7936 — confirmer",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Scénic III": {
    immoBox: "UCM/BCM (Valeo) — sous le tableau de bord côté conducteur (même plateforme Mégane III)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique Mégane III)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Mégane III / Scénic III → Apprentissage clé",
      "Insérer clé vierge PCF7952 — confirmer",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Laguna II": {
    immoBox: "UCH (Valeo) — derrière le tableau de bord côté conducteur, accessible en déposant le cache sous volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD. Carte de proximité PCF7947 (pas de clé mécanique classique)",
    steps: [
      "⚠ Laguna II = carte de proximité sans contacteur mécanique",
      "Lire PIN via OBD",
      "Sélectionner Renault → Laguna II → Apprentissage carte de proximité",
      "Approcher la carte vierge PCF7947 du lecteur au tableau de bord",
      "Valider l'apprentissage — max 3 cartes",
      "Tester démarrage"
    ]
  },
  "Renault|Laguna III": {
    immoBox: "UCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD. Carte de proximité Hitag2/PCF7952",
    steps: [
      "⚠ Laguna III = clé de proximité mains libres",
      "Lire PIN via OBD",
      "Apprentissage carte Laguna III",
      "Approcher la carte vierge du lecteur",
      "Tester"
    ]
  },
  "Renault|Kangoo II": {
    immoBox: "UCH (Sagem/Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI KeyTool / VVDI2",
    pin: "Calculable (similaire Clio II Ph2) ou lecture OBD selon année",
    steps: [
      "Calculer PIN ou lire via OBD",
      "Sélectionner Renault → Kangoo II → Apprentissage clé",
      "Insérer clé vierge PCF7936",
      "Confirmer — max 4 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Renault|Trafic II": {
    immoBox: "UCH — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Trafic II → Apprentissage clé",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Renault|Trafic III": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Trafic III → Apprentissage clé",
      "Hitag AES / PCF7953",
      "Tester"
    ]
  },
  "Renault|Twingo II": {
    immoBox: "UCH (Sagem) — sous le tableau de bord côté conducteur",
    tool: "VVDI KeyTool / VVDI2",
    pin: "Calculable (similaire Clio II / Twingo)",
    steps: [
      "Calculer PIN ou lire via OBD selon version",
      "Sélectionner Renault → Twingo II → Apprentissage clé",
      "Insérer clé vierge PCF7936",
      "Tester démarrage"
    ]
  },
  "Renault|Captur I": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur (même plateforme Clio IV)",
    tool: "VVDI2 / KeyTool Max / Autel IM508",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Captur / Clio IV → Apprentissage clé",
      "Insérer clé vierge Hitag AES / PCF7953",
      "Tester"
    ]
  },
  "Renault|Duster I": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (plateforme Dacia/Renault)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault/Dacia → Duster → Apprentissage clé",
      "PCF7936 / PCF7952 selon année",
      "Tester"
    ]
  },
  "Renault|Master III": {
    immoBox: "UCH/BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Renault → Master III → Apprentissage clé",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  DACIA
  // ═══════════════════════════════════════════════════
  "Dacia|Logan I": {
    immoBox: "UCH (Valeo/Sagem) — sous le tableau de bord côté conducteur (plateforme Renault Clio II)",
    tool: "VVDI KeyTool / VVDI2",
    pin: "Calculable (similaire Clio II Phase 2) ou lecture OBD",
    steps: [
      "Calculer PIN ou lire via OBD",
      "Sélectionner Renault/Dacia → Logan I → Apprentissage clé",
      "Insérer clé vierge PCF7936",
      "Confirmer — max 4 clés",
      "Tester"
    ]
  },
  "Dacia|Sandero I": {
    immoBox: "UCH (Valeo) — sous le tableau de bord côté conducteur (plateforme Renault Clio III)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Dacia → Sandero I → Apprentissage clé",
      "PCF7936",
      "Tester"
    ]
  },
  "Dacia|Sandero II": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Dacia → Sandero II → Apprentissage clé",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Dacia|Duster I": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Dacia → Duster I → Apprentissage clé",
      "PCF7936 / PCF7952 selon année",
      "Tester"
    ]
  },
  "Dacia|Lodgy": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Dacia → Lodgy → Apprentissage clé",
      "PCF7952",
      "Tester"
    ]
  },
  "Dacia|Dokker": {
    immoBox: "BCM (Valeo) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Dacia → Dokker → Apprentissage clé",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  PEUGEOT
  // ═══════════════════════════════════════════════════
  "Peugeot|106": {
    immoBox: "Boîtier IMMO Valeo — sous le tableau de bord côté conducteur (certains 106 sont sans antidémarrage)",
    tool: "VVDI KeyTool / VVDI2",
    pin: "Calculable ou procédure ignition selon version",
    steps: [
      "Vérifier présence antidémarrage (certains 106 n'ont pas de transpondeur)",
      "Calculer PIN ou procédure ignition",
      "Sélectionner Peugeot → 106",
      "Insérer clé vierge TMS37126 / PCF7930",
      "Tester"
    ]
  },
  "Peugeot|206": {
    immoBox: "BSI (Boîtier de Servitude Intelligent) Sagem/Magneti Marelli — sous la planche de bord côté conducteur, fixé derrière le bloc instruments",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD via BSI (VVDI2 → Peugeot → 206 → Lire PIN BSI)",
    steps: [
      "Lire PIN via OBD (lecture BSI)",
      "Sélectionner Peugeot → 206 → Apprentissage clé",
      "Entrer PIN — insérer clé vierge PCF7936",
      "Allumage ON/OFF selon invite de l'outil",
      "Confirmer — max 8 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Peugeot|207": {
    immoBox: "BSI (Continental/Bosch) — sous la planche de bord côté conducteur ou derrière la boîte à gants selon version",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 207 → Apprentissage clé",
      "Insérer clé vierge PCF7936 / PCF7941",
      "Confirmer l'apprentissage",
      "Tester démarrage + télécommande"
    ]
  },
  "Peugeot|2008 Gen1": {
    immoBox: "BSI (Continental) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 2008 → Apprentissage clé",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Peugeot|307": {
    immoBox: "BSI (Bosch/Sagem) — sous la planche de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 307 → Apprentissage clé",
      "Insérer clé vierge PCF7936",
      "Confirmer — max 8 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Peugeot|307 CC": {
    immoBox: "BSI (Bosch/Sagem) — sous la planche de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique 307)",
    steps: [
      "Lire PIN via OBD",
      "Apprentissage clé 307 CC (identique 307 berline)",
      "PCF7936",
      "Tester"
    ]
  },
  "Peugeot|308 Gen1": {
    immoBox: "BSI (Continental/Bosch) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 308 Gen1 → Apprentissage clé",
      "PCF7941 / PCF7952",
      "Tester démarrage + télécommande"
    ]
  },
  "Peugeot|308 Gen2": {
    immoBox: "BSI (Continental) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 308 Gen2 → Apprentissage clé",
      "Hitag2 / PCF7953",
      "Tester"
    ]
  },
  "Peugeot|406": {
    immoBox: "BSI (Siemens/Sagem) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 406 → Apprentissage clé",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Peugeot|407": {
    immoBox: "BSI (Bosch) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 407 → Apprentissage clé",
      "PCF7941 / PCF7936",
      "Tester"
    ]
  },
  "Peugeot|508": {
    immoBox: "BSI (Continental) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 508 → Apprentissage clé",
      "Hitag2 / PCF7953",
      "Tester"
    ]
  },
  "Peugeot|3008 Gen1": {
    immoBox: "BSI (Continental) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → 3008 → Apprentissage clé",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Peugeot|Partner II": {
    immoBox: "BSI — sous le tableau de bord côté conducteur (similaire 207/308 selon génération)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → Partner II → Apprentissage clé",
      "PCF7936 / PCF7941 selon année",
      "Tester"
    ]
  },
  "Peugeot|Expert II": {
    immoBox: "BSI — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → Expert II",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Peugeot|Boxer III": {
    immoBox: "BSI / ECU Magneti Marelli — sous tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot → Boxer III (ou Fiat Ducato même plateforme)",
      "PCF7941 / ID46",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  CITROËN
  // ═══════════════════════════════════════════════════
  "Citroën|Saxo": {
    immoBox: "Boîtier IMMO Valeo — sous tableau de bord (certains sans antidémarrage)",
    tool: "VVDI KeyTool / VVDI2",
    pin: "Calculable ou procédure ignition",
    steps: [
      "Vérifier présence antidémarrage",
      "Calculer PIN ou procédure ignition",
      "PCF7930 / TMS37126",
      "Tester"
    ]
  },
  "Citroën|C1": {
    immoBox: "BSI / ECU — sous tableau de bord (plateforme Toyota Aygo / Peugeot 107)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën C1 ou Peugeot 107 (même plateforme Toyota)",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Citroën|C2": {
    immoBox: "BSI (Sagem/Bosch) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C2 → Apprentissage clé",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Citroën|C3 Gen1": {
    immoBox: "BSI (Sagem/Bosch) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C3 Gen1 → Apprentissage clé",
      "PCF7936",
      "Tester démarrage + télécommande"
    ]
  },
  "Citroën|C3 Gen2": {
    immoBox: "BSI (Continental) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C3 Gen2 → Apprentissage clé",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Citroën|C3 Aircross": {
    immoBox: "BSI (Continental) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C3 Aircross",
      "Hitag2 / PCF7953",
      "Tester"
    ]
  },
  "Citroën|C4 Gen1": {
    immoBox: "BSI (Continental/Bosch) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C4 Gen1 → Apprentissage clé",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Citroën|C4 Picasso": {
    immoBox: "BSI (Continental) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C4 Picasso → Apprentissage clé",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Citroën|Grand C4 Picasso": {
    immoBox: "BSI (Continental) — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique C4 Picasso)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → Grand C4 Picasso",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Citroën|C5 Gen2": {
    immoBox: "BSI (Bosch/Continental) — sous tableau de bord côté conducteur ou derrière boîte à gants",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C5 Gen2 → Apprentissage clé",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Citroën|C8": {
    immoBox: "BSI — sous tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → C8",
      "PCF7941",
      "Tester"
    ]
  },
  "Citroën|Berlingo II": {
    immoBox: "BSI (Bosch/Continental) — sous tableau de bord côté conducteur (similaire 308/C4 selon année)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → Berlingo II → Apprentissage clé",
      "PCF7936 / PCF7941 selon année",
      "Tester"
    ]
  },
  "Citroën|Dispatch II": {
    immoBox: "BSI — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën → Dispatch II / Jumpy II (même véhicule)",
      "PCF7941",
      "Tester"
    ]
  },
  "Citroën|Jumpy II": {
    immoBox: "BSI — sous tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique Dispatch II / Expert II)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Peugeot Expert II / Citroën Jumpy II (même plateforme)",
      "PCF7941",
      "Tester"
    ]
  },
  "Citroën|Jumper": {
    immoBox: "BSI / ECU Magneti Marelli — sous tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — lecture OBD (identique Peugeot Boxer / Fiat Ducato)",
    steps: [
      "Lire PIN via OBD",
      "Sélectionner Citroën Jumper ou Fiat Ducato (même plateforme)",
      "PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  VOLKSWAGEN
  // ═══════════════════════════════════════════════════
  "Volkswagen|Golf III": {
    immoBox: "Boîtier IMMO2 (module indépendant) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture EEPROM IMMO2 ou OBD selon version",
    steps: [
      "Identifier version IMMO (IMMO1 ou IMMO2)",
      "IMMO2 : lecture PIN/CS via OBD ou EEPROM",
      "Sélectionner VW → Golf III → IMMO2",
      "Insérer clé vierge PCF7931 (ID33)",
      "Tester"
    ]
  },
  "Volkswagen|Golf IV": {
    immoBox: "Boîtier IMMO3 — intégré sous le tableau de bord côté conducteur, module séparé fixé derrière la colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis (IMMO3) — lecture CS via OBD. IMMO2 : lecture EEPROM.",
    steps: [
      "Identifier version IMMO : IMMO2 ou IMMO3 (selon date fabrication)",
      "IMMO3 : lire CS via OBD (VVDI2 → VW → Golf IV → IMMO3)",
      "IMMO2 : lecture EEPROM BCM si nécessaire",
      "Entrer CS — insérer clé vierge PCF7936 (ID48)",
      "Allumage ON/OFF selon invite",
      "Confirmer — max 8 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Volkswagen|Golf V": {
    immoBox: "Boîtier IMMO4 — intégré dans l'EZS (Electronic Steering Lock), sous le volant / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis (IMMO4) — lecture CS via OBD avec VVDI2",
    steps: [
      "Lire CS via OBD (VVDI2 → VW → Golf V → IMMO4)",
      "Calculer la clé de travail via VVDI2",
      "Apprentissage clé PCF7936 / PCF7941",
      "Confirmer — max 8 clés",
      "Tester démarrage + télécommande"
    ]
  },
  "Volkswagen|Golf VI": {
    immoBox: "Boîtier IMMO4/5 — intégré EZS, sous le volant / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis (IMMO4/5) — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Calculer clé de travail VVDI2",
      "Apprentissage clé PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Volkswagen|Polo 9N": {
    immoBox: "Boîtier IMMO3/4 — sous le tableau de bord (similaire Golf IV)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS/PIN via OBD",
      "Sélectionner VW → Polo 9N → IMMO3/4",
      "PCF7936 / ID48",
      "Tester"
    ]
  },
  "Volkswagen|Polo 6R": {
    immoBox: "Boîtier IMMO4/5 — colonne de direction / EZS",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Polo 6R",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Volkswagen|Passat B6": {
    immoBox: "Boîtier IMMO4 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Passat B6 → IMMO4",
      "PCF7941",
      "Tester"
    ]
  },
  "Volkswagen|Passat B7": {
    immoBox: "Boîtier IMMO5 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Passat B7 → IMMO5",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },
  "Volkswagen|Tiguan I": {
    immoBox: "Boîtier IMMO4/5 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Tiguan I",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Volkswagen|Transporter T5": {
    immoBox: "Boîtier IMMO4 — EZS / sous tableau de bord (similaire Golf V)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Transporter T5",
      "PCF7941 / PCF7936",
      "Tester"
    ]
  },
  "Volkswagen|Caddy III": {
    immoBox: "Boîtier IMMO4 — EZS (similaire Golf V/Polo)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Sélectionner VW → Caddy III",
      "PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  AUDI
  // ═══════════════════════════════════════════════════
  "Audi|A3 8L": {
    immoBox: "Boîtier IMMO2/3 — sous le tableau de bord côté conducteur (même plateforme Golf IV)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS via OBD (VVDI2 → Audi → A3 8L → IMMO2/3)",
      "Apprentissage clé A3 8L",
      "PCF7936 / ID48",
      "Tester"
    ]
  },
  "Audi|A3 8P": {
    immoBox: "Boîtier IMMO4 — EZS / colonne de direction (même plateforme Golf V/VI)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD (VVDI2 → Audi → A3 8P → IMMO4)",
      "Apprentissage clé A3 8P",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Audi|A4 B6": {
    immoBox: "Boîtier IMMO3 — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS via OBD (Audi → A4 B6 → IMMO3)",
      "Apprentissage clé A4 B6",
      "PCF7936",
      "Tester"
    ]
  },
  "Audi|A4 B7": {
    immoBox: "Boîtier IMMO4 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD (Audi → A4 B7 → IMMO4)",
      "Apprentissage clé",
      "PCF7941",
      "Tester"
    ]
  },
  "Audi|A4 B8": {
    immoBox: "Boîtier IMMO5 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD (Audi → A4 B8 → IMMO5)",
      "Apprentissage clé",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },
  "Audi|A6 C6": {
    immoBox: "Boîtier IMMO4/5 — EZS / sous tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD (Audi → A6 C6)",
      "Apprentissage clé",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Audi|Q5": {
    immoBox: "Boîtier IMMO5 — EZS / colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD (Audi → Q5)",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  SKODA
  // ═══════════════════════════════════════════════════
  "Skoda|Fabia I": {
    immoBox: "Boîtier IMMO3 — sous le tableau de bord (similaire VW Polo 9N)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS/PIN via OBD",
      "Sélectionner Skoda → Fabia I → IMMO3",
      "PCF7936 / ID48",
      "Tester"
    ]
  },
  "Skoda|Fabia II": {
    immoBox: "Boîtier IMMO4 — EZS / sous tableau de bord (similaire VW Polo 6R)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Skoda → Fabia II → IMMO4",
      "PCF7941",
      "Tester"
    ]
  },
  "Skoda|Octavia I": {
    immoBox: "Boîtier IMMO2/3 — sous le tableau de bord (similaire VW Golf IV)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS via OBD",
      "Skoda → Octavia I → IMMO2/3",
      "PCF7936 / ID48",
      "Tester"
    ]
  },
  "Skoda|Octavia II": {
    immoBox: "Boîtier IMMO4 — EZS (similaire VW Golf V)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Skoda → Octavia II → IMMO4",
      "PCF7941",
      "Tester"
    ]
  },
  "Skoda|Superb II": {
    immoBox: "Boîtier IMMO4/5 — EZS (similaire VW Passat B6/B7)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Skoda → Superb II",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  SEAT
  // ═══════════════════════════════════════════════════
  "Seat|Ibiza 6L": {
    immoBox: "Boîtier IMMO3/4 — sous le tableau de bord (similaire VW Polo 9N/Golf IV)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS/PIN via OBD",
    steps: [
      "Lire CS/PIN via OBD",
      "Seat → Ibiza 6L → IMMO3/4",
      "PCF7936 / ID48",
      "Tester"
    ]
  },
  "Seat|Ibiza 6J": {
    immoBox: "Boîtier IMMO4/5 — EZS / colonne de direction (similaire VW Polo 6R)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Seat → Ibiza 6J → IMMO4/5",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Seat|León 1P": {
    immoBox: "Boîtier IMMO4 — EZS / colonne de direction (même plateforme VW Golf V/Audi A3 8P)",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Seat → León 1P → IMMO4 (similaire Golf V)",
      "PCF7941",
      "Tester"
    ]
  },
  "Seat|Altea": {
    immoBox: "Boîtier IMMO4 — EZS / sous volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Seat → Altea (similaire León / Golf V)",
      "PCF7941",
      "Tester"
    ]
  },
  "Seat|Toledo III": {
    immoBox: "Boîtier IMMO4 — EZS / sous volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "Requis — CS via OBD",
    steps: [
      "Lire CS via OBD",
      "Seat → Toledo III",
      "PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  BMW
  // ═══════════════════════════════════════════════════
  "BMW|Série 1 E87": {
    immoBox: "CAS3 (Car Access System) — colonne de direction, derrière le cache plastique sous le volant côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN (Individual Serial Number) — lecture CAS3 via OBD",
    steps: [
      "Lire ISN CAS3 via OBD (VVDI2 → BMW → CAS3)",
      "Sélectionner apprentissage clé Série 1 E87",
      "Insérer clé vierge PCF7946 / PCF7953",
      "Confirmer l'apprentissage",
      "Tester démarrage + télécommande"
    ]
  },
  "BMW|Série 3 E46": {
    immoBox: "EWS3 (Electronic Warning System) — sous le tableau de bord côté conducteur, petit module cylindrique ou boîtier fixé sur la planche",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture EWS3 via OBD ou EEPROM si OBD impossible",
    steps: [
      "Lire ISN EWS3 via OBD (VVDI2 → BMW → EWS3)",
      "Ou lecture directe EEPROM EWS si OBD échoue",
      "Sélectionner apprentissage clé E46",
      "Insérer clé vierge PCF7935 (ID44)",
      "Confirmer — tester démarrage + télécommande"
    ]
  },
  "BMW|Série 3 E90": {
    immoBox: "CAS3 — colonne de direction, derrière le cache sous le volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture CAS3 via OBD",
    steps: [
      "Lire ISN CAS3 via OBD",
      "Sélectionner BMW → CAS3 → Apprentissage clé Série 3 E90",
      "Insérer clé vierge PCF7953 / PCF7946",
      "Confirmer — tester"
    ]
  },
  "BMW|Série 5 E39": {
    immoBox: "EWS2/EWS3 — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture OBD ou EEPROM EWS",
    steps: [
      "Lire ISN EWS2/3 via OBD",
      "Sélectionner BMW → Série 5 E39 → EWS2/3",
      "PCF7935 (ID44)",
      "Tester"
    ]
  },
  "BMW|Série 5 E60": {
    immoBox: "CAS2/CAS3 — colonne de direction sous le volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture CAS via OBD",
    steps: [
      "Lire ISN CAS2/3 via OBD",
      "Sélectionner BMW → Série 5 E60",
      "PCF7946 / PCF7953",
      "Tester"
    ]
  },
  "BMW|Série 5 F10": {
    immoBox: "CAS4/CAS4+ — colonne de direction, sous le cache sous le volant",
    tool: "VVDI2 / KeyTool Max (module BMW avancé obligatoire)",
    pin: "ISN CAS4+ via OBD — opération avancée",
    steps: [
      "⚠ CAS4+ : nécessite module VVDI2 BMW avancé ou Autel IM608 Pro",
      "Lire ISN via OBD ou dump CAS selon configuration",
      "Sélectionner BMW → Série 5 F10",
      "PCF7953 / Hitag Pro",
      "Tester"
    ]
  },
  "BMW|X3 E83": {
    immoBox: "CAS2 — colonne de direction sous le volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture CAS2 via OBD",
    steps: [
      "Lire ISN CAS2 via OBD",
      "BMW → X3 E83",
      "PCF7946",
      "Tester"
    ]
  },
  "BMW|X5 E53": {
    immoBox: "EWS3 — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture EWS3 via OBD",
    steps: [
      "Lire ISN EWS3 via OBD",
      "BMW → X5 E53",
      "PCF7935 / PCF7946",
      "Tester"
    ]
  },
  "BMW|X5 E70": {
    immoBox: "CAS3 — colonne de direction",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture CAS3 via OBD",
    steps: [
      "Lire ISN CAS3 via OBD",
      "BMW → X5 E70",
      "PCF7953",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  MINI
  // ═══════════════════════════════════════════════════
  "MINI|Cooper R50": {
    immoBox: "EWS3 — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture EWS3 via OBD",
    steps: [
      "Lire ISN EWS3 via OBD",
      "BMW/MINI → Cooper R50 → EWS3",
      "PCF7935 (ID44)",
      "Tester"
    ]
  },
  "MINI|Cooper R55": {
    immoBox: "CAS3 — colonne de direction, sous le cache sous le volant",
    tool: "VVDI2 / KeyTool Max",
    pin: "ISN — lecture CAS3 via OBD",
    steps: [
      "Lire ISN CAS3 via OBD",
      "BMW/MINI → Cooper R55/R56 → CAS3",
      "PCF7953 / PCF7946",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  MERCEDES
  // ═══════════════════════════════════════════════════
  "Mercedes|Classe A W168": {
    immoBox: "EIS (Electronic Ignition Switch) — dans la colonne de direction, remplace le contacteur classique. Module noir visible en déposant le cache sous volant.",
    tool: "VVDI2 / Autel IM608 / Lonsdor K518",
    pin: "CS — lecture OBD ou EEPROM EIS selon version",
    steps: [
      "Lire CS via OBD (VVDI2 → Mercedes → Classe A W168)",
      "Ou lecture EEPROM EIS si OBD non fonctionnel",
      "Apprentissage clé W168",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Mercedes|Classe A W169": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe A W169",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Mercedes|Classe B W245": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe B W245",
      "PCF7941",
      "Tester"
    ]
  },
  "Mercedes|Classe C W203": {
    immoBox: "EIS (Electronic Ignition Switch) — colonne de direction, module noir visible en déposant le cache sous le volant",
    tool: "VVDI2 / Autel IM608 / Lonsdor K518",
    pin: "CS — lecture OBD ou EEPROM EIS",
    steps: [
      "Lire CS via OBD (VVDI2 → Mercedes → Classe C W203)",
      "Ou dump EEPROM EIS si OBD échoue",
      "Apprentissage clé W203",
      "PCF7936 (ID46)",
      "Tester"
    ]
  },
  "Mercedes|Classe C W204": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe C W204",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Mercedes|Classe E W211": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD ou EEPROM EIS",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe E W211",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Mercedes|Classe E W212": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe E W212",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Mercedes|Classe ML W163": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe ML W163",
      "PCF7936",
      "Tester"
    ]
  },
  "Mercedes|Classe ML W164": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Classe ML W164",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Mercedes|Sprinter W906": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Sprinter W906",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Mercedes|Vito W639": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Vito W639",
      "PCF7941",
      "Tester"
    ]
  },
  "Mercedes|Viano W639": {
    immoBox: "EIS — colonne de direction",
    tool: "VVDI2 / Autel IM608",
    pin: "CS — lecture OBD (identique Vito W639)",
    steps: [
      "Lire CS via OBD",
      "Mercedes → Viano W639 (identique Vito W639)",
      "PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  FORD
  // ═══════════════════════════════════════════════════
  "Ford|Fiesta V": {
    immoBox: "GEM (Generic Electronic Module) / PATS — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PATS PIN — lecture OBD. ⚠ Certains modèles : 2 clés programmées existantes requises",
    steps: [
      "⚠ Vérifier si 2 clés valides existantes nécessaires",
      "Lire PATS PIN via OBD (VVDI2 → Ford → Fiesta V → PATS)",
      "Insérer clé vierge 4D60 (ID60) / Tibbe",
      "Tester"
    ]
  },
  "Ford|Fiesta VI": {
    immoBox: "GEM / PATS — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Fiesta VI → PATS",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Focus II": {
    immoBox: "GEM / PATS — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Focus II → PATS",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Focus III": {
    immoBox: "BCM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Focus III",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|C-Max": {
    immoBox: "GEM / PATS — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD (similaire Focus II)",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → C-Max → PATS",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|S-Max": {
    immoBox: "GEM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → S-Max",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Galaxy II": {
    immoBox: "GEM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Galaxy II (similaire S-Max)",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Mondeo IV": {
    immoBox: "BCM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Mondeo IV",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Kuga I": {
    immoBox: "PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Kuga I",
      "4D63",
      "Tester"
    ]
  },
  "Ford|Kuga II": {
    immoBox: "PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Kuga II",
      "4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Transit V347": {
    immoBox: "GEM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Transit V347",
      "4D60 / 4D63 / Tibbe",
      "Tester"
    ]
  },
  "Ford|Transit Custom": {
    immoBox: "BCM / PATS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PATS PIN — lecture OBD",
    steps: [
      "Lire PATS PIN via OBD",
      "Ford → Transit Custom",
      "4D63 / Tibbe",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  TOYOTA
  // ═══════════════════════════════════════════════════
  "Toyota|Yaris P1": {
    immoBox: "Boîtier IMMO Toyota intégré au tableau de bord — sous le combiné d'instruments côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ Certains Yaris P1 : 2 clés valides existantes requises pour en ajouter une 3e",
    steps: [
      "Vérifier si 2 clés valides existantes disponibles",
      "Toyota → Yaris P1 → Apprentissage clé",
      "Insérer clé vierge 4D67 (ID67)",
      "Tester démarrage + télécommande"
    ]
  },
  "Toyota|Yaris P2": {
    immoBox: "Boîtier IMMO — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ Généralement 2 clés existantes requises",
    steps: [
      "Vérifier disponibilité 2 clés existantes",
      "Toyota → Yaris P2",
      "4D67 / 4D68 selon version",
      "Tester"
    ]
  },
  "Toyota|Yaris P13": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD — 2 clés parfois requises",
    steps: [
      "Vérifier conditions (2 clés ou procédure directe OBD)",
      "Toyota → Yaris P13",
      "H-chip / 4D68",
      "Tester"
    ]
  },
  "Toyota|Corolla E150": {
    immoBox: "Boîtier IMMO — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ 2 clés existantes généralement requises",
    steps: [
      "Vérifier disponibilité 2 clés",
      "Toyota → Corolla E150",
      "4D67 / 4D68",
      "Tester"
    ]
  },
  "Toyota|Auris E150": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ 2 clés parfois requises",
    steps: [
      "Toyota → Auris E150",
      "4D68 / H-chip",
      "Tester"
    ]
  },
  "Toyota|Auris E180": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD",
    steps: [
      "Toyota → Auris E180",
      "H-chip / 4D68",
      "Tester"
    ]
  },
  "Toyota|Avensis T27": {
    immoBox: "Boîtier IMMO — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD — 2 clés parfois requises",
    steps: [
      "Toyota → Avensis T27",
      "H-chip / 4D68",
      "Tester"
    ]
  },
  "Toyota|RAV4 III": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ 2 clés existantes souvent requises",
    steps: [
      "Vérifier disponibilité 2 clés",
      "Toyota → RAV4 III",
      "H-chip / 4D68",
      "Tester"
    ]
  },
  "Toyota|RAV4 IV": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD",
    steps: [
      "Toyota → RAV4 IV",
      "H-chip AES / 8A",
      "Tester"
    ]
  },
  "Toyota|Hilux VII": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "⚠ 2 clés souvent requises",
    steps: [
      "Toyota → Hilux VII",
      "4D67 / 4D68",
      "Tester"
    ]
  },
  "Toyota|Hilux VIII": {
    immoBox: "Boîtier IMMO — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD",
    steps: [
      "Toyota → Hilux VIII",
      "H-chip AES",
      "Tester"
    ]
  },
  "Toyota|Land Cruiser 150 (Prado)": {
    immoBox: "Boîtier IMMO — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD — 2 clés parfois requises",
    steps: [
      "Toyota → Land Cruiser 150",
      "H-chip AES / 4D68 selon année",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  NISSAN
  // ═══════════════════════════════════════════════════
  "Nissan|Micra K11": {
    immoBox: "Boîtier IMMO Nissan — sous le tableau de bord côté conducteur",
    tool: "VVDI KeyTool / VVDI2",
    pin: "PIN via OBD ou procédure ignition selon version",
    steps: [
      "Nissan → Micra K11",
      "PCF7931 / PCF7930 (ID33)",
      "Tester"
    ]
  },
  "Nissan|Micra K12": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Micra K12",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Nissan|Note E11": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Note E11",
      "PCF7936",
      "Tester"
    ]
  },
  "Nissan|Note E12": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Note E12",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Nissan|Qashqai J10": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Qashqai J10",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Nissan|Qashqai J11": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Qashqai J11",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Nissan|Juke F15": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Juke F15",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Nissan|Navara D40": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Navara D40",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Nissan|Navara NP300": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Navara NP300",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Nissan|Primastar": {
    immoBox: "UCH/BCM — sous le tableau de bord (plateforme Renault Trafic / Opel Vivaro)",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD (similaire Renault Trafic II)",
    steps: [
      "Lire PIN via OBD",
      "Nissan → Primastar ou Renault → Trafic II (même plateforme)",
      "PCF7936",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  OPEL
  // ═══════════════════════════════════════════════════
  "Opel|Corsa C": {
    immoBox: "ECU/BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD ou EEPROM selon version",
    steps: [
      "Lire PIN via OBD",
      "Opel → Corsa C",
      "PCF7931 / PCF7936",
      "Tester"
    ]
  },
  "Opel|Corsa D": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Corsa D",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Opel|Astra G": {
    immoBox: "ECU/BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Astra G",
      "PCF7931 / PCF7936 (ID33/ID46)",
      "Tester"
    ]
  },
  "Opel|Astra H": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Astra H",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Opel|Astra J": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Astra J",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Opel|Vectra C": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Vectra C",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Opel|Zafira A": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Zafira A",
      "PCF7936",
      "Tester"
    ]
  },
  "Opel|Zafira B": {
    immoBox: "ECU/BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Zafira B",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Opel|Vivaro X83": {
    immoBox: "UCH/BCM — sous le tableau de bord (plateforme Renault Trafic II / Nissan Primastar)",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD (similaire Renault Trafic II)",
    steps: [
      "Lire PIN via OBD",
      "Opel → Vivaro A ou Renault → Trafic II (même plateforme)",
      "PCF7936",
      "Tester"
    ]
  },
  "Opel|Movano B": {
    immoBox: "UCH/BCM — sous le tableau de bord (plateforme Renault Master III / Nissan NV400)",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Opel → Movano B ou Renault → Master III",
      "PCF7952",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  FIAT
  // ═══════════════════════════════════════════════════
  "Fiat|Punto II (188)": {
    immoBox: "Boîtier IMMO Magneti Marelli/Delphi — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD ou procédure ignition selon version",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Punto II",
      "PCF7930 / PCF7936",
      "Tester"
    ]
  },
  "Fiat|Grande Punto (199)": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Grande Punto (199)",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Fiat|Punto Evo": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Punto Evo",
      "PCF7941",
      "Tester"
    ]
  },
  "Fiat|500 (312)": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Fiat → 500 (312)",
      "PCF7941 / ID46",
      "Tester"
    ]
  },
  "Fiat|Bravo II": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Bravo II",
      "PCF7941",
      "Tester"
    ]
  },
  "Fiat|Doblo II": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Doblo II",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Fiat|Ducato III": {
    immoBox: "ECU Magneti Marelli/Bosch — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD (même plateforme Peugeot Boxer / Citroën Jumper)",
    steps: [
      "Lire PIN via OBD",
      "Fiat → Ducato III ou Peugeot Boxer (même plateforme)",
      "PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  HONDA
  // ═══════════════════════════════════════════════════
  "Honda|Civic VII": {
    immoBox: "IPDM (Intelligent Power Distribution Module) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Civic VII",
      "Insérer clé vierge 4D65 (ID65)",
      "Suivre procédure Honda",
      "Tester"
    ]
  },
  "Honda|Civic VIII": {
    immoBox: "IPDM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Civic VIII",
      "PCF7936 / ID47 selon version",
      "Tester"
    ]
  },
  "Honda|CR-V II": {
    immoBox: "MICU (Multiplex Integrated Control Unit) — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → CR-V II",
      "4D65 (ID65)",
      "Tester"
    ]
  },
  "Honda|CR-V III": {
    immoBox: "MICU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → CR-V III",
      "PCF7936 / ID47",
      "Tester"
    ]
  },
  "Honda|Accord VII": {
    immoBox: "MICU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Accord VII",
      "4D65 / PCF7936",
      "Tester"
    ]
  },
  "Honda|Accord VIII": {
    immoBox: "MICU — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Accord VIII",
      "PCF7936 / ID47",
      "Tester"
    ]
  },
  "Honda|Jazz II": {
    immoBox: "MICU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Jazz II (GD/GE)",
      "4D65",
      "Tester"
    ]
  },
  "Honda|Jazz III": {
    immoBox: "MICU — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → Jazz III (GG/GE)",
      "PCF7936 / ID47",
      "Tester"
    ]
  },
  "Honda|HR-V": {
    immoBox: "MICU — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD Honda",
    steps: [
      "VVDI2 → Honda → HR-V",
      "ID47 / Hitag2",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  HYUNDAI / KIA
  // ═══════════════════════════════════════════════════
  "Hyundai|i10": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → i10",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Hyundai|i20 PB": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → i20",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Hyundai|i30 FD": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → i30 FD",
      "PCF7936",
      "Tester"
    ]
  },
  "Hyundai|i30 GD": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → i30 GD",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Hyundai|i30 PD": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → i30 PD",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Hyundai|Tucson JM": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → Tucson JM",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Hyundai|Tucson LM": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → Tucson LM (ix35)",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Hyundai|Santa Fe CM": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → Santa Fe CM",
      "PCF7936",
      "Tester"
    ]
  },
  "Hyundai|Santa Fe DM": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Hyundai → Santa Fe DM",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Kia|Picanto": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Picanto",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Kia|Ceed ED": {
    immoBox: "BCM — sous le tableau de bord (plateforme Hyundai i30)",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Ceed ED",
      "PCF7936",
      "Tester"
    ]
  },
  "Kia|Ceed JD": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Ceed JD",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Kia|Ceed CD": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Ceed CD",
      "Hitag2 / AES",
      "Tester"
    ]
  },
  "Kia|Sportage II": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Sportage II",
      "PCF7936",
      "Tester"
    ]
  },
  "Kia|Sportage III": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Sportage III",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },
  "Kia|Sportage IV": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Sportage IV",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },
  "Kia|Sorento BL": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Sorento BL",
      "PCF7936",
      "Tester"
    ]
  },
  "Kia|Sorento XM": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Kia → Sorento XM",
      "PCF7952",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  ALFA ROMEO / LANCIA / FIAT GROUP
  // ═══════════════════════════════════════════════════
  "Alfa Romeo|147": {
    immoBox: "BCM Marelli — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Alfa Romeo → 147",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Alfa Romeo|156": {
    immoBox: "BCM Marelli — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Alfa Romeo → 156",
      "PCF7936",
      "Tester"
    ]
  },
  "Alfa Romeo|159": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Alfa Romeo → 159",
      "PCF7941 / ID46",
      "Tester"
    ]
  },
  "Alfa Romeo|Brera": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD (identique 159)",
    steps: [
      "Lire PIN via OBD",
      "Alfa Romeo → Brera (similaire 159)",
      "PCF7941",
      "Tester"
    ]
  },
  "Alfa Romeo|Giulietta": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Alfa Romeo → Giulietta",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Lancia|Delta": {
    immoBox: "BCM Marelli/Bosch — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Lancia → Delta (similaire Fiat Bravo II plateforme)",
      "PCF7941",
      "Tester"
    ]
  },
  "Lancia|Musa": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Lancia → Musa",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Lancia|Ypsilon": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Lancia → Ypsilon",
      "PCF7936",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  VOLVO
  // ═══════════════════════════════════════════════════
  "Volvo|S40": {
    immoBox: "CEM (Central Electronic Module) — sous le tableau de bord côté conducteur, module principal Volvo",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD (VVDI2 → Volvo → S40 II)",
      "Apprentissage clé S40",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Volvo|V50": {
    immoBox: "CEM — sous le tableau de bord côté conducteur (même plateforme S40 II)",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD",
      "Volvo → V50 (identique S40 II)",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Volvo|S60": {
    immoBox: "CEM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD",
      "Volvo → S60",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Volvo|V40": {
    immoBox: "CEM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD",
      "Volvo → V40",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Volvo|V70": {
    immoBox: "CEM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD",
      "Volvo → V70",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Volvo|XC60": {
    immoBox: "CEM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN — lecture CEM via OBD",
    steps: [
      "Lire PIN CEM via OBD",
      "Volvo → XC60",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  MAZDA
  // ═══════════════════════════════════════════════════
  "Mazda|Mazda 3": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD Mazda",
    steps: [
      "Mazda → Mazda 3",
      "4D63 / ID63 selon génération",
      "Tester"
    ]
  },
  "Mazda|Mazda 6": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Mazda",
    steps: [
      "Mazda → Mazda 6",
      "4D63 / ID63",
      "Tester"
    ]
  },
  "Mazda|CX-5": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "Lecture OBD Mazda",
    steps: [
      "Mazda → CX-5",
      "Hitag2 / 4D63",
      "Tester"
    ]
  },
  "Mazda|MX-5": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "Lecture OBD Mazda",
    steps: [
      "Mazda → MX-5",
      "4D63 selon génération",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  MITSUBISHI
  // ═══════════════════════════════════════════════════
  "Mitsubishi|Colt (Z30)": {
    immoBox: "ECU/ETACS (Electronic Time and Alarm Control System) — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Mitsubishi → Colt Z30",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Mitsubishi|Lancer": {
    immoBox: "ECU/ETACS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Mitsubishi → Lancer",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Mitsubishi|Outlander": {
    immoBox: "ECU/ETACS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Mitsubishi → Outlander",
      "PCF7941 / Hitag2",
      "Tester"
    ]
  },
  "Mitsubishi|ASX (GA)": {
    immoBox: "ECU/ETACS — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Mitsubishi → ASX",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Mitsubishi|L200": {
    immoBox: "ECU/ETACS — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Mitsubishi → L200",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  SUZUKI
  // ═══════════════════════════════════════════════════
  "Suzuki|Swift": {
    immoBox: "BCM/ECU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → Swift",
      "PCF7936 / ID46",
      "Tester"
    ]
  },
  "Suzuki|SX4": {
    immoBox: "BCM/ECU — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → SX4",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Suzuki|S-Cross": {
    immoBox: "BCM/ECU — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → SX4 S-Cross",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Suzuki|Vitara": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → Vitara",
      "PCF7952 / Hitag AES",
      "Tester"
    ]
  },
  "Suzuki|Grand Vitara": {
    immoBox: "BCM/ECU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → Grand Vitara",
      "PCF7936 / PCF7941",
      "Tester"
    ]
  },
  "Suzuki|Jimny": {
    immoBox: "ECU — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Suzuki → Jimny",
      "PCF7936",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  SUBARU
  // ═══════════════════════════════════════════════════
  "Subaru|Impreza": {
    immoBox: "ECU/IMMO Denso — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Subaru → Impreza",
      "PCF7936 / 4D62",
      "Tester"
    ]
  },
  "Subaru|Forester": {
    immoBox: "ECU/IMMO Denso — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Subaru → Forester",
      "PCF7936 / 4D62",
      "Tester"
    ]
  },
  "Subaru|Outback": {
    immoBox: "ECU/IMMO Denso — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Subaru → Outback / Legacy",
      "PCF7936 / PCF7952",
      "Tester"
    ]
  },

  // ═══════════════════════════════════════════════════
  //  LAND ROVER
  // ═══════════════════════════════════════════════════
  "Land Rover|Freelander 2 (LF)": {
    immoBox: "BCM (Body Control Module) — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel IM608",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Land Rover → Freelander 2",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
  "Land Rover|Discovery 3": {
    immoBox: "BCM — sous le tableau de bord côté conducteur",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Land Rover → Discovery 3",
      "PCF7941",
      "Tester"
    ]
  },
  "Land Rover|Discovery 4": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Land Rover → Discovery 4",
      "PCF7952 / Hitag2",
      "Tester"
    ]
  },
  "Land Rover|Range Rover Sport (L320)": {
    immoBox: "BCM — sous le tableau de bord",
    tool: "VVDI2 / KeyTool Max / Autel IM608",
    pin: "PIN via OBD",
    steps: [
      "Lire PIN via OBD",
      "Land Rover → Range Rover Sport L320",
      "PCF7941 / PCF7952",
      "Tester"
    ]
  },
};
