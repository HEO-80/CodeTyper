"use client";

import { useEffect, useRef } from "react";

const LANG_META = {
  solidity:   { label: "Smart Contract",  icon: "◆", color: "#c792ea" },
  javascript: { label: "JavaScript",      icon: "⬡", color: "#ffcb6b" },
  typescript: { label: "TypeScript",      icon: "⬡", color: "#82aaff" },
  csharp:     { label: ".NET Web API",    icon: "◈", color: "#82aaff" },
  sql:        { label: "SQL Script",      icon: "▪", color: "#f78c6c" },
  powershell: { label: "PowerShell",      icon: "▶", color: "#5391FE" },
  bash:       { label: "Bash Script",     icon: "▶", color: "#4ec994" },
  python:     { label: "Python",          icon: "⬡", color: "#4ec994" },
  java:       { label: "Java",            icon: "◆", color: "#f89820" },
  cloud:      { label: "Cloud Script",    icon: "⬡", color: "#f78c6c" },
};

export default function ContextPanel({
  structure,
  activeIndex,
  language,
  snippet,
  cursor,
  total,
  visible,
  onToggle,
}) {
  const activeRef = useRef(null);
  const meta = LANG_META[language] || { label: language, icon: "◉", color: "#82aaff" };
  const progress = total > 0 ? Math.round((cursor / total) * 100) : 0;

  // Auto-scroll active item into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        style={{
          ...styles.toggleBtn,
          background: visible ? "#1c2333" : "#0d1117",
          borderColor: visible ? meta.color : "#21262d",
          color: visible ? meta.color : "#546e7a",
        }}
        title={visible ? "Hide context panel" : "Show code structure"}
      >
        <StructureSVGIcon color={visible ? meta.color : "#546e7a"} />
        <span style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
          {visible ? "STRUCTURE" : "STRUCTURE"}
        </span>
      </button>

      {/* Panel */}
      {visible && (
        <div style={styles.panel}>
          <style>{`
            @keyframes pulse-node {
              0%, 100% { opacity: 1; transform: scale(1); }
              50%       { opacity: 0.6; transform: scale(1.2); }
            }
            @keyframes slide-in {
              from { opacity: 0; transform: translateX(20px); }
              to   { opacity: 1; transform: translateX(0); }
            }
            .ctx-item:hover { background: rgba(255,255,255,0.03) !important; }
          `}</style>

          {/* Header */}
          <div style={styles.header}>
            <span style={{ ...styles.langIcon, color: meta.color }}>{meta.icon}</span>
            <div style={styles.headerText}>
              <div style={{ ...styles.langLabel, color: meta.color }}>{meta.label}</div>
              <div style={styles.snippetTitle}>{snippet?.title || ""}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={{
                ...styles.progressFill,
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${meta.color}, #82aaff)`,
              }} />
            </div>
            <span style={{ ...styles.progressLabel, color: meta.color }}>{progress}%</span>
          </div>

          {/* Structure tree */}
          <div style={styles.tree}>
            {structure.length === 0 ? (
              <div style={styles.empty}>
                <span style={{ color: "#30363d", fontSize: "11px" }}>
                  No structure detected
                </span>
              </div>
            ) : (
              <>
                {/* Root node */}
                <div style={styles.rootNode}>
                  <SVGConnector color={meta.color} root />
                  <span style={{ color: meta.color, fontSize: "12px", fontWeight: "600" }}>
                    {meta.icon} {snippet?.title || meta.label}
                  </span>
                </div>

                {/* Section nodes */}
                {structure.map((sec, i) => {
                  const isActive  = i === activeIndex;
                  const isDone    = i < activeIndex;
                  const isLast    = i === structure.length - 1;

                  const nodeColor = isDone ? "#30363d" : isActive ? sec.color : "#21262d";
                  const textColor = isDone ? "#546e7a"  : isActive ? sec.color : "#30363d";

                  return (
                    <div
                      key={sec.id}
                      ref={isActive ? activeRef : null}
                      className="ctx-item"
                      style={{
                        ...styles.item,
                        animation: isActive ? "slide-in 0.2s ease" : "none",
                      }}
                    >
                      <SVGConnector color={nodeColor} isLast={isLast} />

                      {/* Node circle */}
                      <span style={{
                        ...styles.nodeCircle,
                        background: isActive ? sec.color : isDone ? "#1e2d3d" : "transparent",
                        borderColor: nodeColor,
                        boxShadow: isActive ? `0 0 8px ${sec.color}60` : "none",
                        animation: isActive ? "pulse-node 1.5s ease-in-out infinite" : "none",
                      }} />

                      {/* Icon + label */}
                      <div style={styles.itemContent}>
                        <span style={{ color: textColor, fontSize: "13px" }}>{sec.icon}</span>
                        <div style={styles.itemText}>
                          <span style={{
                            ...styles.itemLabel,
                            color: textColor,
                            fontWeight: isActive ? "600" : "400",
                          }}>
                            {sec.label}
                          </span>
                          {sec.sublabel && (
                            <span style={styles.itemSublabel}>{sec.sublabel}</span>
                          )}
                        </div>

                        {/* Status badge */}
                        {isDone && (
                          <span style={styles.doneBadge}>✓</span>
                        )}
                        {isActive && (
                          <span style={{ ...styles.activeBadge, color: sec.color, borderColor: sec.color }}>
                            here
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer stats */}
          <div style={styles.footer}>
            <Stat label="sections" value={structure.length} />
            <Stat label="done"     value={Math.max(0, activeIndex)} />
            <Stat label="left"     value={Math.max(0, structure.length - activeIndex - 1)} />
          </div>
        </div>
      )}
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Stat({ label, value }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "#c9d1d9", fontSize: "14px", fontWeight: "600" }}>{value}</div>
      <div style={{ color: "#30363d", fontSize: "10px", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

function SVGConnector({ color, root, isLast }) {
  if (root) {
    return (
      <svg width="20" height="20" style={{ flexShrink: 0, marginRight: "6px" }}>
        <circle cx="10" cy="10" r="4" fill={color} opacity="0.9" />
      </svg>
    );
  }
  return (
    <svg width="20" height="32" style={{ flexShrink: 0 }}>
      {!isLast && <line x1="10" y1="16" x2="10" y2="32" stroke={color} strokeWidth="1" opacity="0.3" />}
      <line x1="10" y1="0"  x2="10" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function StructureSVGIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="2" cy="2"  r="1.5" fill={color} />
      <circle cx="2" cy="7"  r="1.5" fill={color} opacity="0.7" />
      <circle cx="2" cy="12" r="1.5" fill={color} opacity="0.4" />
      <line x1="3.5" y1="2"  x2="12" y2="2"  stroke={color} strokeWidth="1.2" />
      <line x1="3.5" y1="7"  x2="10" y2="7"  stroke={color} strokeWidth="1.2" opacity="0.7" />
      <line x1="3.5" y1="12" x2="8"  y2="12" stroke={color} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  toggleBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    border: "1px solid",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "all 0.15s",
    flexShrink: 0,
  },
  panel: {
    width: "350px",
    minWidth: "350px",
    background: "#0a0f1a",
    borderLeft: "1px solid #21262d",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'JetBrains Mono', monospace",
    animation: "slide-in 0.2s ease",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px",
    borderBottom: "1px solid #21262d",
  },
  langIcon: { fontSize: "20px", flexShrink: 0 },
  headerText: { overflow: "hidden" },
  langLabel: { fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "600" },
  snippetTitle: { fontSize: "12px", color: "#546e7a", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  progressWrap: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderBottom: "1px solid #21262d" },
  progressTrack: { flex: 1, height: "3px", background: "#21262d", borderRadius: "2px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "2px", transition: "width 0.3s ease" },
  progressLabel: { fontSize: "11px", fontWeight: "600", minWidth: "30px", textAlign: "right" },
  tree: { flex: 1, overflowY: "auto", padding: "8px 0", scrollbarWidth: "thin", scrollbarColor: "#21262d #0a0f1a" },
  rootNode: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px 4px" },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "2px 16px",
    cursor: "default",
    transition: "background 0.1s",
    borderRadius: "4px",
    margin: "0 4px",
  },
  nodeCircle: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "1px solid",
    flexShrink: 0,
    marginRight: "6px",
    transition: "all 0.2s",
  },
  itemContent: { display: "flex", alignItems: "center", gap: "6px", flex: 1, overflow: "hidden" },
  itemText: { flex: 1, overflow: "hidden" },
  itemLabel: { fontSize: "12px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" },
  itemSublabel: { fontSize: "10px", color: "#30363d", display: "block" },
  doneBadge: { fontSize: "10px", color: "#4ec994", flexShrink: 0 },
  activeBadge: { fontSize: "9px", border: "1px solid", borderRadius: "3px", padding: "1px 4px", flexShrink: 0, letterSpacing: "0.04em" },
  footer: { display: "flex", justifyContent: "space-around", padding: "12px 16px", borderTop: "1px solid #21262d" },
  empty: { display: "flex", justifyContent: "center", padding: "32px" },
};
