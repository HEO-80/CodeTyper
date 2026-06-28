"use client";

import CodeTyperTerminal from "@/components/ui/CodeTyperTerminal";
import { SNIPPETS } from "@/data/snippets";
import { useRouter } from "next/navigation";

export default function GlobalTerminal({ open, onClose }) {
  const router = useRouter();

  const handleLaunchSnippet = (snippet, language, difficulty) => {
    onClose();
    router.push(
      `/practice/terminal?lang=${language}&snippetId=${snippet.id}&difficulty=${difficulty || "beginner"}`
    );
  };

  return (
    <CodeTyperTerminal
      open={open}
      onClose={onClose}
      onLaunchSnippet={handleLaunchSnippet}
      snippetsData={SNIPPETS}
    />
  );
}
