// src/app/api/stats/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import PracticeSession from "@/lib/models/PracticeSession";
import User from "@/lib/models/User";
import { updateLangData, calcNextPhaseProgress } from "@/lib/mastery";

// ── POST /api/stats ────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      language, snippetId, snippetTitle, difficulty,
      cpm, accuracy, errors, duration, totalChars,
    } = await req.json();

    await connectDB();

    // 1. Guardar sesión
    await PracticeSession.create({
      userId: session.user.id,
      language, snippetId, snippetTitle, difficulty,
      cpm, accuracy, errors, duration, totalChars,
    });

    // 2. Actualizar usuario
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Stats globales
    user.totalSessions += 1;
    user.totalChars += totalChars || 0;
    user.bestCpm = Math.max(user.bestCpm, cpm);
    user.lastActiveAt = new Date();

    // FIX: el Map de Mongoose devuelve un subdocument — hay que llamar .toObject()
    // para obtener un POJO limpio antes de pasarlo a updateLangData
    const rawExisting = user.langProgress.get(language);
    const existing = rawExisting
      ? (typeof rawExisting.toObject === "function" ? rawExisting.toObject() : { ...rawExisting })
      : {};

    const updated = updateLangData({ ...existing }, { cpm, accuracy, totalChars });
    user.langProgress.set(language, updated);

    // FIX: marcar el campo Map como modificado para que Mongoose lo persista
    user.markModified("langProgress");

    await user.save();

    // Calcular progreso hacia siguiente fase
    const nextPhaseInfo = calcNextPhaseProgress(updated);

    return NextResponse.json({
      ok: true,
      phase: updated.phase,
      phaseLabel: updated.phaseLabel,
      level: updated.level,
      consistency: updated.consistency,
      improvement: updated.improvementPct,
      nextPhase: nextPhaseInfo,
    });
  } catch (err) {
    console.error("Stats POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── GET /api/stats ─────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // FIX: NO usar .lean() cuando el schema tiene campos Map —
    // .lean() no convierte el Map a objeto plano de forma fiable.
    // Usamos el documento Mongoose normal y llamamos .toObject() manualmente.
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const recent = await PracticeSession.find({ userId: session.user.id })
      .sort({ completedAt: -1 })
      .limit(10)
      .lean();

    // FIX: iterar el Map de Mongoose con .entries() nativo del Map
    const langProgress = {};
    for (const [lang, rawData] of user.langProgress.entries()) {
      const data = typeof rawData.toObject === "function"
        ? rawData.toObject()
        : { ...rawData };

      langProgress[lang] = {
        ...data,
        nextPhase: calcNextPhaseProgress(data),
      };
    }

    return NextResponse.json({
      totalSessions: user.totalSessions,
      totalChars: user.totalChars,
      bestCpm: user.bestCpm,
      streak: user.streak,
      langProgress,
      recentSessions: recent,
    });
  } catch (err) {
    console.error("Stats GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
