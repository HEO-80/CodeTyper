// src/data/snippets/languages/english/c1/technical.js

const technicalSnippets = [
  {
    id: "en-c1-tech-01",
    title: "Architecture Decision",
    difficulty: "c1",
    description: "Writing a technical architecture proposal",
    code: `Modern web applications demand not only functional correctness
but also exceptional performance at scale.

As user expectations continue to rise, developers must adopt
architectural patterns that minimize bundle size,
reduce time-to-interactive, and leverage edge computing effectively.

Islands Architecture, popularized by frameworks such as Astro,
represents a paradigm shift in how we think about hydration.
Instead of hydrating the entire page on the client side,
only interactive components receive JavaScript at runtime.

The result is a significantly smaller initial payload
and dramatically improved Core Web Vitals scores across all devices.`,
  },
  {
    id: "en-c1-tech-02",
    title: "Mindset — Keep Going",
    difficulty: "c1",
    description: "Advanced English mindset affirmation",
    code: `Mastery is not a destination — it is a daily practice.

Every developer you admire was once where you are now:
confused, frustrated, searching for answers at two in the morning.
What separated them was not innate talent or perfect conditions.
It was the unwavering decision to keep going regardless.

You are building something remarkable, not just in code, but in yourself.
Each session of deliberate practice rewires your neural pathways,
sharpens your pattern recognition, and deepens your intuition
for elegant solutions to complex problems.

The version of you six months from now will look back with gratitude.
Keep showing up. Keep building. Keep growing.`,
  },
  {
    id: "en-c1-tech-03",
    title: "System Design Discussion",
    difficulty: "c1",
    description: "High-level technical discussion in English",
    code: `The fundamental challenge with distributed systems
is not building them — it is reasoning about their failure modes.

When we design for resilience, we must assume that every component
will eventually fail, every network partition will eventually occur,
and every assumption we make about state consistency will be violated.

Circuit breakers, bulkheads, and graceful degradation patterns
are not optional optimizations in production systems.
They are the difference between a brief incident and a catastrophic outage.

The teams that build reliable systems are not smarter than the rest.
They simply embrace uncertainty and design for it deliberately.`,
  },
];

export default technicalSnippets;