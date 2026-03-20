"use client";

import { useState, useEffect } from "react";
import CodeTyperTerminal from "@/components/ui/CodeTyperTerminal";
import { SNIPPETS } from "@/data/snippets";
import { useRouter } from "next/navigation";

export default function GlobalTerminal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLaunchSnippet = (snippet, language, difficulty) => {
    setOpen(false);
    // Navigate to terminal page with snippet info as query params
    router.push(
      `/practice/terminal?lang=${language}&snippetId=${snippet.id}&difficulty=${difficulty || "beginner"}`
    );
  };

  return (
    <CodeTyperTerminal
      open={open}
      onClose={() => setOpen(false)}
      onLaunchSnippet={handleLaunchSnippet}
      snippetsData={SNIPPETS}
    />
  );
}
