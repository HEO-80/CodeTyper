// ─── ENGLISH LANGUAGE SNIPPETS ───────────────────────────────────────────────
// Practicar inglés por niveles con frases útiles y reales

const b1 = [
  {
    id: "en-b1-001",
    title: "Daily routine vocabulary",
    description: "Common phrases for everyday situations",
    code: `I wake up at seven o'clock every morning.
First, I have breakfast and read the news.
Then I start working on my computer.
I usually take a short break at noon.
In the afternoon, I focus on my projects.
I try to learn something new every day.
Before bed, I review what I practiced today.`,
  },
  {
    id: "en-b1-002",
    title: "Talking about work",
    description: "Phrases for professional conversations",
    code: `I work as a software developer.
I write code every day at my job.
My team uses React and Node.js.
We have a meeting every Monday morning.
I am currently working on a new project.
Can you explain that again, please?
I do not understand this part of the code.`,
  },
];

const b2 = [
  {
    id: "en-b2-001",
    title: "Professional email",
    description: "Writing a clear work email",
    code: `Subject: Project Update — CodeTyper v2.0

Hi team,

I wanted to share a quick update on the project.
We have completed the refactoring phase
and the new component structure is now in place.

The main improvements include:
better performance, cleaner code,
and a more scalable folder structure.

Please review the pull request when you have time.
Let me know if you have any questions or feedback.

Best regards,
Hector`,
  },
  {
    id: "en-b2-002",
    title: "Technical explanation",
    description: "Explaining a concept in English",
    code: `A semantic tokenizer analyzes source code
and identifies the type of each token.

For example, the word "class" is a keyword,
while "Animal" is a class name.
A string like "hello" has its own category,
and numbers are identified separately.

This allows the editor to apply
different colors to different token types,
which helps developers read code faster
and understand its structure at a glance.`,
  },
];

const c1 = [
  {
    id: "en-c1-001",
    title: "Technical article intro",
    description: "Academic and technical writing",
    code: `Modern web applications demand not only
functional correctness but also exceptional performance.

As user expectations continue to rise,
developers must adopt architectural patterns
that minimize bundle size, reduce time-to-interactive,
and leverage edge computing effectively.

Islands Architecture, popularized by frameworks
such as Astro, represents a paradigm shift:
instead of hydrating the entire page client-side,
only interactive components receive JavaScript.

The result is a significantly smaller initial payload
and dramatically improved Core Web Vitals scores.`,
  },
  {
    id: "en-c1-002",
    title: "Mindset affirmations C1",
    description: "Advanced English mindset text",
    code: `Mastery is not a destination — it is a daily practice.

Every developer you admire was once where you are now:
confused, frustrated, googling the same things twice.
What separated them was not talent.
It was the decision to keep going.

You are building something remarkable,
not just in code, but in yourself.
Each session of deliberate practice
rewires your brain, sharpens your instincts,
and deepens your intuition for elegant solutions.

The version of you six months from now
will look back at this moment with gratitude.
Keep showing up. Keep building. Keep growing.`,
  },
];

const english = { b1, b2, c1 };
export default english;
