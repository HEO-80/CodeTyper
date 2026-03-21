"use client";


import { LANGUAGE_LABELS } from "@/lib/constants";
import "./ResultsScreen.css";

export default function ResultsScreen({ result, onRepeat, onMenu }) {
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
    S: "#ffcb6b", A: "#4ec994", B: "#82aaff", C: "#f78c6c", D: "#ff5555",
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
            <div style={{ ...styles.statNum, color: "#82aaff" }}>{cpm}</div>
            <div style={styles.statLabel}>CPM</div>
            <div style={styles.statSub}>caracteres por minuto</div>
          </div>
          <div style={styles.statCard}>
            <div style={{
              ...styles.statNum,
              color: accuracy >= 95 ? "#4ec994" : accuracy >= 80 ? "#ffcb6b" : "#ff5555"
            }}>
              {accuracy}%
            </div>
            <div style={styles.statLabel}>Precisión</div>
            <div style={styles.statSub}>{totalErrors} errores cometidos</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNum, color: "#c792ea" }}>{time}s</div>
            <div style={styles.statLabel}>Tiempo</div>
            <div style={styles.statSub}>{tokens.length} caracteres totales</div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button
            className="result-btn"
            style={{ ...styles.btn, borderColor: "#82aaff", color: "#82aaff" }}
            onClick={onRepeat}
          >
            ↺ repetir snippet
          </button>
          <button
            className="result-btn"
            style={{ ...styles.btn, borderColor: "#30363d", color: "#8b949e" }}
            onClick={onMenu}
          >
            ← elegir otro
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    height: "100%",  // ← era minHeight: "100vh"
    // minHeight: "100vh",
    background: "#0d1117",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "24px",
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
    fontSize: "11px",
    color: "#546e7a",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  grade: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "96px",
    fontWeight: "800",
    lineHeight: 1,
    animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)",
    marginBottom: "12px",
  },
  gradeMsg: {
    color: "#8b949e",
    fontSize: "13px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "32px",
  },
  statCard: {
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: "10px",
    padding: "24px 16px",
    textAlign: "center",
  },
  statNum: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "10px",
    color: "#546e7a",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "4px",
  },
  statSub: {
    fontSize: "10px",
    color: "#30363d",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
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
