// src/lib/mastery.js
// ── Motor de cálculo de dominio del lenguaje ───────────────────────────────────

// ── Fases de aprendizaje ──────────────────────────────────────────────────────
export const PHASES = [
  {
    phase: 1,
    label: "Descubrimiento",
    description: "Estás familiarizándote con la sintaxis",
    minSessions: 0,
    minCpm:      0,
    minAccuracy: 0,
    color:       "#546e7a",
    icon:        "○",
  },
  {
    phase: 2,
    label: "Aprendizaje",
    description: "El patrón empieza a ser reconocible",
    minSessions: 10,
    minCpm:      60,
    minAccuracy: 70,
    color:       "#4ec994",
    icon:        "◔",
  },
  {
    phase: 3,
    label: "Consolidación",
    description: "Ya no necesitas pensar cada carácter",
    minSessions: 50,
    minCpm:      100,
    minAccuracy: 85,
    color:       "#82aaff",
    icon:        "◑",
  },
  {
    phase: 4,
    label: "Dominio",
    description: "Escritura automática, muscle memory activa",
    minSessions: 150,
    minCpm:      150,
    minAccuracy: 92,
    color:       "#c792ea",
    icon:        "◕",
  },
  {
    phase: 5,
    label: "Interiorizado",
    description: "El lenguaje forma parte de tu memoria muscular",
    minSessions: 500,
    minCpm:      200,
    minAccuracy: 96,
    color:       "#FCEE0A",
    icon:        "●",
  },
];

// ── Calcular fase actual ──────────────────────────────────────────────────────
export function calcPhase(sessions, avgCpm, avgAccuracy) {
  // Recorre de mayor a menor para encontrar la fase alcanzada
  for (let i = PHASES.length - 1; i >= 0; i--) {
    const p = PHASES[i];
    if (
      sessions    >= p.minSessions &&
      avgCpm      >= p.minCpm      &&
      avgAccuracy >= p.minAccuracy
    ) {
      return p;
    }
  }
  return PHASES[0];
}

// ── Calcular nivel (beginner → master) ────────────────────────────────────────
export function calcLevel(sessions, avgAccuracy, bestCpm) {
  if (sessions >= 500 && avgAccuracy >= 96 && bestCpm >= 200) return "master";
  if (sessions >= 150 && avgAccuracy >= 92 && bestCpm >= 150) return "advanced";
  if (sessions >= 50  && avgAccuracy >= 85 && bestCpm >= 100) return "intermediate";
  if (sessions >= 10  && avgAccuracy >= 70 && bestCpm >= 60)  return "learning";
  return "beginner";
}

// ── Calcular consistencia (0-100) ─────────────────────────────────────────────
// Usa la desviación estándar de las últimas N sesiones
// Más consistente = menos variación = mayor puntuación
export function calcConsistency(cpmHistory) {
  if (cpmHistory.length < 2) return 0;

  const mean = cpmHistory.reduce((a, b) => a + b, 0) / cpmHistory.length;
  const variance = cpmHistory.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / cpmHistory.length;
  const stdDev = Math.sqrt(variance);

  // Normalizar: stdDev de 0 = 100% consistente, stdDev de 50+ = 0% consistente
  const consistency = Math.max(0, Math.round(100 - (stdDev / 50) * 100));
  return Math.min(100, consistency);
}

// ── Calcular % de mejora ──────────────────────────────────────────────────────
// Compara el promedio de las primeras 5 sesiones con las últimas 5
export function calcImprovement(firstFive, lastFive) {
  if (firstFive.length === 0 || lastFive.length === 0) return 0;

  const avgFirst = firstFive.reduce((a, b) => a + b, 0) / firstFive.length;
  const avgLast  = lastFive.reduce((a, b) => a + b, 0)  / lastFive.length;

  if (avgFirst === 0) return 0;
  return Math.round(((avgLast - avgFirst) / avgFirst) * 100);
}

// ── Actualizar langData con nueva sesión ──────────────────────────────────────
export function updateLangData(langData, { cpm, accuracy, totalChars }) {
  const s = langData.sessionsCompleted + 1;

  // Actualizar contadores básicos
  langData.sessionsCompleted = s;
  langData.totalChars       += totalChars || 0;
  langData.lastCpm           = cpm;
  langData.lastAccuracy      = accuracy;
  langData.lastPracticedAt   = new Date();

  if (!langData.firstPracticedAt) langData.firstPracticedAt = new Date();

  // Actualizar CPM máximo
  langData.bestCpm = Math.max(langData.bestCpm || 0, cpm);

  // Actualizar promedio CPM (media móvil)
  langData.avgCpm = Math.round(
    ((langData.avgCpm || 0) * (s - 1) + cpm) / s
  );

  // Actualizar promedio accuracy
  langData.avgAccuracy = Math.round(
    ((langData.avgAccuracy || 0) * (s - 1) + accuracy) / s
  );

  // Guardar primeras 5 sesiones
  if (!langData.firstFiveCpm) langData.firstFiveCpm = [];
  if (langData.firstFiveCpm.length < 5) {
    langData.firstFiveCpm = [...langData.firstFiveCpm, cpm];
  }

  // Guardar últimas 5 sesiones (rotating buffer)
  if (!langData.lastFiveCpm) langData.lastFiveCpm = [];
  langData.lastFiveCpm = [...langData.lastFiveCpm, cpm].slice(-5);

  // Guardar últimas 10 sesiones para consistencia
  if (!langData.lastTenCpm) langData.lastTenCpm = [];
  langData.lastTenCpm = [...langData.lastTenCpm, cpm].slice(-10);

  // Calcular métricas derivadas
  langData.consistency   = calcConsistency(langData.lastTenCpm);
  langData.improvementPct = calcImprovement(langData.firstFiveCpm, langData.lastFiveCpm);

  // Calcular fase y nivel
  const phase           = calcPhase(s, langData.avgCpm, langData.avgAccuracy);
  langData.phase        = phase.phase;
  langData.phaseLabel   = phase.label;
  langData.level        = calcLevel(s, langData.avgAccuracy, langData.bestCpm);

  return langData;
}

// ── Progreso hacia siguiente fase ─────────────────────────────────────────────
export function calcNextPhaseProgress(langData) {
  const currentPhase = PHASES[langData.phase - 1];
  const nextPhase    = PHASES[langData.phase]; // undefined si ya es fase 5

  if (!nextPhase) return { pct: 100, label: "Fase máxima alcanzada" };

  // Progreso en cada dimensión
  const sessionsPct  = Math.min(100, Math.round((langData.sessionsCompleted / nextPhase.minSessions) * 100));
  const cpmPct       = Math.min(100, Math.round((langData.avgCpm           / nextPhase.minCpm)      * 100));
  const accuracyPct  = Math.min(100, Math.round((langData.avgAccuracy      / nextPhase.minAccuracy) * 100));

  // Promedio ponderado (sesiones pesan más)
  const pct = Math.round((sessionsPct * 0.5) + (cpmPct * 0.3) + (accuracyPct * 0.2));

  return {
    pct:           Math.min(99, pct), // nunca 100 hasta que suba de fase
    nextPhase:     nextPhase.label,
    sessionsPct,
    cpmPct,
    accuracyPct,
    sessionsNeeded: Math.max(0, nextPhase.minSessions - langData.sessionsCompleted),
    cpmNeeded:      Math.max(0, nextPhase.minCpm      - langData.avgCpm),
    accuracyNeeded: Math.max(0, nextPhase.minAccuracy - langData.avgAccuracy),
  };
}
