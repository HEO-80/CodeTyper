import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/ui/Navbar";
import GlobalTerminal from "@/components/ui/GlobalTerminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeTyper — aprende sintaxis con los dedos",
  description: "Practica código real con mecanografía. JavaScript, Python, TypeScript, SQL, Solidity y más.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", height: "100vh", margin: 0 }}>
        <Providers>
          <Navbar />
          <div style={{ flex: 1, overflow: "hidden", display: "flex", width: "100%" }}>
            {children}
          </div>
          <GlobalTerminal />
        </Providers>
      </body>
    </html>
  );
}
