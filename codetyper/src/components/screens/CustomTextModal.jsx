"use client";

import { useState, useRef } from "react";
import mammoth from "mammoth";
import "./SettingsScreen.css";
import "./CustomTextModal.css";

const STORAGE_KEY = "codetyper-custom-texts";
const MAX_LINE_LENGTH = 72;
const MAX_LINES = 220;
const MAX_CHARS = 16000;

// Pegar texto sin saltos de línea reales (ej. copiado de un PDF o una web)
// deja todo en una única línea gigante: no se ve dentro del encuadre y el
// editor se relentiza al tener que montar miles de caracteres en una sola
// fila sin wrap. Partimos cada línea demasiado larga por palabras para que
// quepa en el ancho de práctica y baje en varias líneas, como el resto de
// snippets.
function wrapPlainText(text, maxLen = MAX_LINE_LENGTH) {
  return text
    .split("\n")
    .map((line) => {
      if (line.length <= maxLen) return line;
      const words = line.split(" ");
      const wrapped = [];
      let current = "";
      for (let word of words) {
        while (word.length > maxLen) {
          if (current) { wrapped.push(current); current = ""; }
          wrapped.push(word.slice(0, maxLen));
          word = word.slice(maxLen);
        }
        if (!current) current = word;
        else if ((current + " " + word).length <= maxLen) current += " " + word;
        else { wrapped.push(current); current = word; }
      }
      if (current) wrapped.push(current);
      return wrapped.join("\n");
    })
    .join("\n");
}

// Límite defensivo: un pegado descomunal (ej. un libro entero, o un docx con
// miles de líneas) sí puede relentizar el editor porque cada carácter se
// monta como su propio nodo del DOM. Se recorta a ~200 líneas antes de
// tokenizar/guardar, con un tope de caracteres extra por si alguna línea
// suelta es gigante.
function prepareCustomCode(rawText) {
  const allLines = rawText.split("\n");
  const linesTruncated = allLines.length > MAX_LINES;
  const byLines = linesTruncated ? allLines.slice(0, MAX_LINES).join("\n") : rawText;
  const charsTruncated = byLines.length > MAX_CHARS;
  const clipped = charsTruncated ? byLines.slice(0, MAX_CHARS) : byLines;
  return { code: wrapPlainText(clipped), truncated: linesTruncated || charsTruncated };
}

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
  const [lengthWarning, setLengthWarning] = useState(false);
  const [loadingKind, setLoadingKind] = useState(null); // "txt" | "word" | "pdf" | null
  const [fileError, setFileError] = useState(null);
  const txtInputRef = useRef(null);
  const docxInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const persist = (list) => {
    setSaved(list);
    saveCustomTexts(list);
  };

  const handleAccept = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const { code, truncated } = prepareCustomCode(text);
    if (truncated) {
      setLengthWarning(true);
      setTimeout(() => setLengthWarning(false), 4000);
    }
    const snippet = { id: `custom-${Date.now()}`, title: title.trim() || "Texto personalizado", code };
    persist([{ ...snippet, createdAt: Date.now() }, ...saved]);
    onStart(snippet, "custom", "personalizado");
  };

  const handleUse = (item) => {
    // Auto-repara entradas guardadas antes de este fix (una sola línea larga).
    const { code } = prepareCustomCode(item.code);
    onStart({ id: item.id, title: item.title, code }, "custom", "personalizado");
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
    const { code } = prepareCustomCode(editText);
    persist(saved.map(s => (
      s.id === id ? { ...s, title: editTitle.trim() || "Texto personalizado", code } : s
    )));
    setEditingId(null);
  };

  const titleFromFilename = (name) => name.replace(/\.[^.]+$/, "");

  // Extractores: cada uno recibe el File y devuelve el texto plano.
  const extractTxt = (file) => file.text();

  const extractDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const extractPdf = async (file) => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // Cada item trae hasEOL cuando pdf.js detecta fin de línea por su
      // posición en la página; sin esto, todo el texto de la página
      // saldría pegado en una sola línea larguísima.
      let pageText = "";
      for (const item of content.items) {
        pageText += item.str + (item.hasEOL ? "\n" : "");
      }
      pages.push(pageText);
    }
    return pages.join("\n\n");
  };

  const runFileLoad = async (kind, file, extract, errorMsg) => {
    setFileError(null);
    setLoadingKind(kind);
    try {
      const extracted = (await extract(file)).trim();
      if (!extracted) {
        setFileError("No se ha encontrado texto en ese archivo.");
        return;
      }
      setText(extracted);
      if (!title.trim()) setTitle(titleFromFilename(file.name));
    } catch {
      setFileError(errorMsg);
    } finally {
      setLoadingKind(null);
    }
  };

  const makeFileHandler = (kind, extract, errorMsg) => (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) runFileLoad(kind, file, extract, errorMsg);
  };

  const handleTxtChange = makeFileHandler("txt", extractTxt, "No se ha podido leer el archivo .txt.");
  const handleDocxChange = makeFileHandler("word", extractDocx, "No se ha podido leer el archivo .docx.");
  const handlePdfChange = makeFileHandler("pdf", extractPdf, "No se ha podido leer el archivo .pdf.");

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

            {/* Cargar desde archivo */}
            <div className="custom-file-row">
              <span className="custom-file-label">Cargar desde archivo:</span>
              <div className="custom-file-buttons">
                <button type="button" className="custom-file-btn" onClick={() => txtInputRef.current?.click()} disabled={!!loadingKind}>
                  📄 {loadingKind === "txt" ? "Cargando…" : "TXT"}
                </button>
                <button type="button" className="custom-file-btn" onClick={() => docxInputRef.current?.click()} disabled={!!loadingKind}>
                  📝 {loadingKind === "word" ? "Cargando…" : "Word"}
                </button>
                <button type="button" className="custom-file-btn" onClick={() => pdfInputRef.current?.click()} disabled={!!loadingKind}>
                  📕 {loadingKind === "pdf" ? "Cargando…" : "PDF"}
                </button>
              </div>
              <input
                ref={txtInputRef}
                type="file"
                accept=".txt"
                className="custom-file-input-hidden"
                onChange={handleTxtChange}
              />
              <input
                ref={docxInputRef}
                type="file"
                accept=".docx"
                className="custom-file-input-hidden"
                onChange={handleDocxChange}
              />
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                className="custom-file-input-hidden"
                onChange={handlePdfChange}
              />
              {fileError && <span className="custom-file-hint custom-file-error">{fileError}</span>}
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
            {lengthWarning
              ? `Texto recortado a ${MAX_LINES} líneas para que no se relentice`
              : text.trim() ? "Se guardará al aceptar" : "Pega un texto para practicar"}
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
