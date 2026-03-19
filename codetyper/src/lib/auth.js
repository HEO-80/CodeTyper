// src/lib/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ── Google OAuth ──────────────────────────────────────────────────────────
    Google({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ── Email + Password ──────────────────────────────────────────────────────
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Auto-crear usuario en MongoDB si es Google OAuth
      if (account?.provider === "google") {
        await connectDB();
        const exists = await User.findOne({ email: user.email });
        if (!exists) {
          await User.create({
            name:     user.name,
            email:    user.email,
            image:    user.image,
            provider: "google",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) token.id = dbUser._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/",   // No redirigir, usamos modal propio
    error:  "/",
  },

  session: { strategy: "jwt" },
});
