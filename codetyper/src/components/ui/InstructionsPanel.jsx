"use client";

import { useRouter } from "next/navigation";
import { INSTRUCTIONS } from "@/data/instructions";
import "./InstructionsPanel.css";

export default function InstructionsPanel({ open, onClose }) {
  const router = useRouter();

  const handleNavigate = (slug) => {
    onClose();
    router.push(`/instrucciones/${slug}`);
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
        {INSTRUCTIONS.map((item) => (
          <div
            key={item.slug}
            className={`instructions-card ${item.color}`}
            onClick={() => handleNavigate(item.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigate(item.slug);
              }
            }}
          >
            <div className="instructions-card-title">{item.title}</div>
            <div className="instructions-card-desc">{item.description}</div>
            <div className="instructions-card-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}
