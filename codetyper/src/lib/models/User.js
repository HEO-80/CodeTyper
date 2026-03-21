// src/lib/models/User.js
import mongoose from "mongoose";

const LangProgressSchema = new mongoose.Schema({
  // Contadores
  sessionsCompleted: { type: Number, default: 0 },
  totalChars:        { type: Number, default: 0 },

  // Velocidad
  bestCpm:           { type: Number, default: 0 },
  avgCpm:            { type: Number, default: 0 },
  lastCpm:           { type: Number, default: 0 },

  // Precisión
  avgAccuracy:       { type: Number, default: 0 },
  lastAccuracy:      { type: Number, default: 0 },

  // Histórico para medir mejora
  firstFiveCpm:      { type: [Number], default: [] }, // primeras 5 sesiones
  lastFiveCpm:       { type: [Number], default: [] }, // últimas 5 sesiones
  improvementPct:    { type: Number, default: 0 },    // % mejora

  // Consistencia (desviación estándar invertida, 0-100)
  lastTenCpm:        { type: [Number], default: [] },
  consistency:       { type: Number, default: 0 },

  // Fase de aprendizaje (1-5)
  phase:             { type: Number, default: 1 },
  phaseLabel:        { type: String, default: "Descubrimiento" },

  // Nivel
  level:             { type: String, default: "beginner" },

  // Timestamps
  firstPracticedAt:  { type: Date },
  lastPracticedAt:   { type: Date },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String },
  image:         { type: String },
  provider:      { type: String, default: "credentials" },

  totalSessions: { type: Number, default: 0 },
  totalChars:    { type: Number, default: 0 },
  bestCpm:       { type: Number, default: 0 },
  streak:        { type: Number, default: 0 },
  lastActiveAt:  { type: Date },

  langProgress: {
    type:    Map,
    of:      LangProgressSchema,
    default: {},
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
