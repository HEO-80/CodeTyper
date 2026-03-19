// src/lib/models/PracticeSession.js
import mongoose from "mongoose";

const PracticeSessionSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  language:   { type: String, required: true },
  snippetId:  { type: String, required: true },
  snippetTitle: { type: String },
  difficulty: { type: String }, // beginner | intermediate | advanced | exam

  // Performance
  cpm:        { type: Number, required: true },
  accuracy:   { type: Number, required: true }, // 0-100
  errors:     { type: Number, default: 0 },
  duration:   { type: Number }, // segundos
  totalChars: { type: Number },

  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Index para queries frecuentes
PracticeSessionSchema.index({ userId: 1, language: 1 });
PracticeSessionSchema.index({ userId: 1, completedAt: -1 });

export default mongoose.models.PracticeSession ||
  mongoose.model("PracticeSession", PracticeSessionSchema);
