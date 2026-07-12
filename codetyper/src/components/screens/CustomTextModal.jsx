"use client";

import { useState } from "react";
import "./SettingsScreen.css";
import "./CustomTextModal.css";

const STORAGE_KEY = "codetyper-custom-texts";

function loadCustomTexts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveCustomTexts(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export default function CustomTextModal({ onClose, onStart }) {
  const [title, setTitle] = useState("");
  const [text,  setText]  = useState("");
  const [saved, setSaved] = useState(() => loadCustomTexts());
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText,  setEditText]  = useState("");
  const [fileHint,  setFileHint]  = useState(null);

  const persist = (list) => {
    setSaved(list);
    saveCustomTexts(list);
  };

  const handleAccept = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const snippet = { id: `custom-${Date.now()}`, title: title.trim() || "Texto personalizado", code: text };
    persist([{ ...snippet, createdAt: Date.now() }, ...saved]);
    onStart(snippet, "custom", "personalizado");
  };

  const handleUse = (item) => {
    onStart({ id: item.id, title: item.title, code: item.code }, "custom", "personalizado");
  };

  const handleDelete = (id) => {
    persist(saved.filter(s => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditText(item.code);
  };

  const saveEdit = (id) => {
    persist(saved.map(s => (
      s.id === id ? { ...s, title: editTitle.trim() || "Texto personalizado", code: editText } : s
    )));
    setEditingId(null);
  };

  const handleFileClick = (kind) => {
    setFileHint(kind);
    setTimeout(() => setFileHint(null), 2000);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel custom-text-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="settings-header">
          <div className="settings-title">
            <span className="settings-title-accent">✎</span>
            Personalizado
          </div>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">

          {/* ── Pegar texto ── */}
          <section className="settings-section">
            <div className="settings-section-label">// pega tu texto</div>

            <input
              type="text"
              className="custom-title-input"
              placeholder="Título (opcional)"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="custom-text-area"
              placeholder="Pega aquí el texto o código que quieres practicar..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={8}
            />

            {/* Cargar desde archivo — solo visual por ahora */}
            <div className="custom-file-row">
              <span className="custom-file-label">Cargar desde archivo:</span>
              <div className="custom-file-buttons">
                <button type="button" className="custom-file-btn" onClick={() => handleFileClick("txt")}>📄 TXT</button>
                <button type="button" className="custom-file-btn" onClick={() => handleFileClick("word")}>📝 Word</button>
                <button type="button" className="custom-file-btn" onClick={() => handleFileClick("pdf")}>📕 PDF</button>
              </div>
              {fileHint && <span className="custom-file-hint">Próximamente disponible</span>}
            </div>
          </section>

          {/* ── Agregados ── */}
          <section className="settings-section">
            <div className="settings-section-label">
              // agregados{" "}
              <span style={{ color: "var(--tx4)" }}>({saved.length})</span>
            </div>

            {saved.length === 0 ? (
              <div className="custom-empty">Todavía no has guardado ningún texto.</div>
            ) : (
              <div className="custom-saved-list">
                {saved.map(item => (
                  <div key={item.id} className="custom-saved-row">
                    {editingId === item.id ? (
                      <div className="custom-edit-block">
                        <input
                          type="text"
                          className="custom-title-input"
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="custom-text-area"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          rows={5}
                        />
                        <div className="custom-edit-actions">
                          <button className="settings-reset-btn" onClick={() => setEditingId(null)}>Cancelar</button>
                          <button className="settings-save-btn" onClick={() => saveEdit(item.id)}>Guardar</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          className="custom-saved-title"
                          onClick={() => handleUse(item)}
                          title="Practicar este texto"
                        >
                          ▶ {item.title}
                        </button>
                        <div className="custom-saved-actions">
                          <button className="custom-icon-btn" title="Editar" onClick={() => startEdit(item)}>✎</button>
                          <button className="custom-icon-btn custom-icon-btn--danger" title="Borrar" onClick={() => handleDelete(item.id)}>🗑</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="custom-footer-hint">
            {text.trim() ? "Se guardará al aceptar" : "Pega un texto para practicar"}
          </span>
          <button
            className="settings-save-btn"
            disabled={!text.trim()}
            onClick={handleAccept}
          >
            Aceptar y practicar
          </button>
        </div>

      </div>
    </div>
  );
}
