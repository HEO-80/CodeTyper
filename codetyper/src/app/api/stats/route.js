// src/app/api/stats/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import PracticeSession from "@/lib/models/PracticeSession";
import User from "@/lib/models/User";

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

    // 2. Actualizar stats del usuario
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.totalSessions += 1;
    user.totalChars += totalChars || 0;
    user.bestCpm = Math.max(user.bestCpm, cpm);
    user.lastActiveAt = new Date();

    // Progreso por lenguaje
    const langData = user.langProgress.get(language) || {
      sessionsCompleted: 0,
      bestCpm: 0,
      avgAccuracy: 0,
      level: getInitialLevel(language),
      lastPracticedAt: null,
    };

    langData.sessionsCompleted += 1;
    langData.bestCpm = Math.max(langData.bestCpm, cpm);
    langData.avgAccuracy = Math.round(
      (langData.avgAccuracy * (langData.sessionsCompleted - 1) + accuracy) /
      langData.sessionsCompleted
    );
    langData.lastPracticedAt = new Date();
    langData.level = calcLevel(
      language,
      langData.sessionsCompleted,
      langData.avgAccuracy,
      langData.bestCpm,
      difficulty
    );

    user.langProgress.set(language, langData);
    await user.save();

    return NextResponse.json({ ok: true, level: langData.level });
  } catch (err) {
    console.error("Stats POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── GET /api/stats ─────────────────────────────────────────────────────────────
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).lean();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const recent = await PracticeSession.find({ userId: session.user.id })
      .sort({ completedAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      totalSessions: user.totalSessions,
      totalChars: user.totalChars,
      bestCpm: user.bestCpm,
      streak: user.streak,
      langProgress: {
        type: Map,
        of: Number,
        default: {},
      },
      recentSessions: recent,
    });
  } catch (err) {
    console.error("Stats GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

// Cloud usa azure/aws/exam en lugar de beginner/intermediate/advanced
const CLOUD_DIFFICULTIES = ["azure", "aws", "exam"];

function getInitialLevel(language) {
  return language === "cloud" ? "azure" : "beginner";
}

function calcLevel(language, sessions, avgAccuracy, bestCpm, lastDifficulty) {
  // Cloud: nivel = último proveedor practicado
  if (language === "cloud") {
    if (CLOUD_DIFFICULTIES.includes(lastDifficulty)) return lastDifficulty;
    if (sessions >= 10 && avgAccuracy >= 90) return "exam";
    if (sessions >= 5) return "aws";
    return "azure";
  }

  // Resto de lenguajes: basado en rendimiento
  if (sessions >= 30 && avgAccuracy >= 95 && bestCpm >= 200) return "master";
  if (sessions >= 15 && avgAccuracy >= 90 && bestCpm >= 120) return "advanced";
  if (sessions >= 5 && avgAccuracy >= 80 && bestCpm >= 60) return "intermediate";
  return "beginner";
}
