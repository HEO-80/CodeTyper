// src/lib/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String }, // null si usa Google OAuth
  image:         { type: String },
  provider:      { type: String, default: "credentials" }, // "google" | "credentials"
  createdAt:     { type: Date, default: Date.now },

  // Stats globales
  totalSessions: { type: Number, default: 0 },
  totalChars:    { type: Number, default: 0 },
  bestCpm:       { type: Number, default: 0 },
  streak:        { type: Number, default: 0 },
  lastActiveAt:  { type: Date },

  // Progreso por lenguaje
  langProgress: {
    type: Map,
    of: new mongoose.Schema({
      sessionsCompleted: { type: Number, default: 0 },
      bestCpm:          { type: Number, default: 0 },
      avgAccuracy:      { type: Number, default: 0 },
      level:            { type: String, default: "beginner" }, // beginner | intermediate | advanced | master
      lastPracticedAt:  { type: Date },
    }, { _id: false }),
    default: {},
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
