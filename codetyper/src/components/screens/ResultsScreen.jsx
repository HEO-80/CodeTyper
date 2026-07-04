"use client";


import { LANGUAGE_LABELS } from "@/lib/constants";
import { getNextSnippet } from "@/data/snippets";
import "./ResultsScreen.css";

export default function ResultsScreen({ result, onRepeat, onMenu, onNext, hasNext }) {
  const { tokens, totalErrors, startTime, endTime, snippet, language } = result;

  const seconds = (endTime - startTime) / 1000;
  const cpm = Math.round((tokens.length / seconds) * 60);
  const accuracy = Math.round(((tokens.length - totalErrors) / tokens.length) * 100);
  const time = Math.round(seconds);

  const grade =
    accuracy >= 98 ? "S" :
    accuracy >= 95 ? "A" :
    accuracy >= 88 ? "B" :
    accuracy >= 75 ? "C" : "D";

  const gradeColors = {
    S: "var(--hl-yellow)", A: "var(--hl-green)", B: "var(--hl-blue)", C: "var(--hl-orange)", D: "var(--hl-red)",
  };
  const gradeColor = gradeColors[grade];

  const gradeMessages = {
    S: "¡Perfecto! Memoria muscular activada 🔥",
    A: "¡Excelente! Casi sin errores 💪",
    B: "¡Bien! Sigue practicando 👍",
    C: "Vas por buen camino, repite este snippet 🎯",
    D: "No te rindas, la constancia es la clave 🧠",
  };

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .result-btn:hover { opacity: 0.8; transform: translateY(-1px); }
      `}</style>

      <div style={styles.wrap}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.langBadge}>
            {LANGUAGE_LABELS[language] || language} · {snippet.title}
          </div>
          <div style={{ ...styles.grade, color: gradeColor }}>
            {grade}
          </div>
          <p style={styles.gradeMsg}>{gradeMessages[grade]}</p>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: "var(--hl-blue)" }}>{cpm}</div>
            <div style={styles.statLabel}>CPM</div>
            <div style={styles.statSub}>caracteres por minuto</div>
          </div>
          <div style={styles.statCard}>
            <div style={{
              ...styles.statNum,
              color: accuracy >= 95 ? "var(--hl-green)" : accuracy >= 80 ? "var(--hl-yellow)" : "var(--hl-red)"
            }}>
              {accuracy}%
            </div>
            <div style={styles.statLabel}>Precisión</div>
            <div style={styles.statSub}>{totalErrors} errores cometidos</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: "var(--hl-purple)" }}>{time}s</div>
            <div style={styles.statLabel}>Tiempo</div>
            <div style={styles.statSub}>{tokens.length} caracteres totales</div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          {hasNext && (
            <button
              className="result-btn"
              style={{ ...styles.btn, borderColor: "var(--hl-green)", color: "var(--hl-green)", fontWeight: "600" }}
              onClick={onNext}
            >
              siguiente →
            </button>
          )}
          <button
            className="result-btn"
            style={{ ...styles.btn, borderColor: "var(--hl-blue)", color: "var(--hl-blue)" }}
            onClick={onRepeat}
          >
            ↺ repetir
          </button>
          <button
            className="result-btn"
            style={{ ...styles.btn, borderColor: "var(--bd3)", color: "var(--tx2)" }}
            onClick={onMenu}
          >
            ← elegir otro
          </button>
        </div>
        {!hasNext && (
          <p style={styles.completedMsg}>
            ¡Completaste todos los niveles de este idioma/lenguaje! 🏆
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    height: "100%",
    background: "var(--bg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "24px",
    boxSizing: "border-box",
  },
  wrap: {
    width: "100%",
    maxWidth: "600px",
    animation: "fadeUp 0.5s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  langBadge: {
    fontSize: "12px",
    color: "var(--tx3)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  grade: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "97px",
    fontWeight: "800",
    lineHeight: 1,
    animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)",
    marginBottom: "12px",
  },
  gradeMsg: {
    color: "var(--tx2)",
    fontSize: "14px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "32px",
  },
  statCard: {
    background: "var(--bg3)",
    border: "1px solid var(--bd)",
    borderRadius: "10px",
    padding: "24px 16px",
    textAlign: "center",
  },
  statNum: {
    fontSize: "37px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "11px",
    color: "var(--tx3)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "4px",
  },
  statSub: {
    fontSize: "11px",
    color: "var(--tx4)",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  completedMsg: {
    textAlign: "center",
    marginTop: "20px",
    color: "var(--hl-yellow)",
    fontSize: "13px",
    letterSpacing: "0.03em",
  },
  btn: {
    padding: "10px 24px",
    background: "transparent",
    border: "1px solid",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.05em",
    transition: "all 0.15s",
  },
};
