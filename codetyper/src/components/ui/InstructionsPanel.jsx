"use client";

import { useRouter } from "next/navigation";
import { INSTRUCTION_CARDS } from "@/data/instructions";
import "./InstructionsPanel.css";

export default function InstructionsPanel({ open, onClose }) {
  const router = useRouter();

  const handleNavigate = (id) => {
    onClose();
    router.push(`/instrucciones/${id}`);
  };

  return (
    <div className={`instructions-panel${open ? " instructions-panel--open" : ""}`}>
      <div className="instructions-panel-header">
        <div className="instructions-panel-title">// instrucciones</div>
        <button className="instructions-panel-close" onClick={onClose} aria-label="Cerrar instrucciones">
          ✕
        </button>
      </div>

      <div className="instructions-panel-list">
        {INSTRUCTION_CARDS.map((item) => (
          <div
            key={item.id}
            className="instructions-card"
            style={{ "--card-color": item.color }}
            onClick={() => handleNavigate(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigate(item.id);
              }
            }}
          >
            <div className="instructions-card-head">
              <span className="instructions-card-icon">{item.icon}</span>
              <span className="instructions-card-title">{item.title}</span>
            </div>
            <div className="instructions-card-desc">{item.description}</div>
            <div className="instructions-card-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}
