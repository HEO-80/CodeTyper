// src/data/snippets/languages/english/index.js
import { beginnerSnippets }     from "./beginner";
import { intermediateSnippets } from "./intermediate";
import { advancedSnippets }     from "./advanced";
import { examSnippetsAll }      from "./exam";

export const ENGLISH_SNIPPETS = {
  beginner:     beginnerSnippets,
  intermediate: intermediateSnippets,
  advanced:     advancedSnippets,
  exam:         examSnippetsAll,
};

export const ALL_ENGLISH = [
  ...beginnerSnippets,
  ...intermediateSnippets,
  ...advancedSnippets,
  ...examSnippetsAll,
];

export default ENGLISH_SNIPPETS;
