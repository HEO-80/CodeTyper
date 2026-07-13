// src/data/snippets/languages/english/c2/academic.js

const academicSnippets = [
  {
    id: "en-c2-aca-01",
    title: "Research Abstract",
    difficulty: "c2",
    description: "Writing a formal academic abstract in English",
    code: `This paper investigates the implications of large language models
on software engineering practices and developer productivity.

Through a mixed-methods study combining quantitative performance metrics
and qualitative interviews with senior engineers across twelve organizations,
we demonstrate that AI-assisted development yields a thirty-seven percent
reduction in time-to-completion for routine implementation tasks.

However, our findings also reveal a statistically significant decline
in junior developers' ability to independently debug complex systems
when AI tools are consistently available from the outset of their careers.

We propose a structured framework for AI tool integration that preserves
foundational skill development while maximizing productivity gains,
and discuss the broader implications for computer science education
and the long-term evolution of the software engineering profession.`,
  },
  {
    id: "en-c2-aca-02",
    title: "Technical Blog — Advanced",
    difficulty: "c2",
    description: "Writing a sophisticated technical article introduction",
    code: `The Illusion of Simplicity: Why Abstractions Fail at Scale

Every abstraction is a lie we agree to tell ourselves.

The React component model promises composability.
The REST API promises stateless predictability.
The relational database promises transactional integrity.
These are not falsehoods — they are contracts,
and like all contracts, they hold only under specific conditions.

The pathology of scale is that it systematically violates
every assumption your abstractions were designed around.
What performs elegantly with ten thousand records
becomes an existential threat with ten billion.
What routes cleanly across three services
becomes a distributed systems nightmare across three hundred.

The engineers who thrive at scale are not those
who know the most abstractions.
They are those who understand most deeply
the conditions under which each abstraction breaks.`,
  },
  {
    id: "en-c2-aca-03",
    title: "Philosophy of Technology",
    difficulty: "c2",
    description: "Reflective writing on technology and human experience",
    code: `We speak of tools as though they were neutral instruments,
as though the hammer does not shape the hand that wields it.

Every technology we adopt reorganizes our attention,
restructures our relationships, and quietly renegotiates
what we consider natural, necessary, or possible.

The programmer who spends a decade thinking in abstractions
does not merely acquire a skill — she acquires a way of seeing.
Problems begin to reveal themselves as systems.
Complexity becomes navigable through decomposition.
The world, in some irreversible sense, becomes more legible.

But legibility has its shadows.
What cannot be abstracted tends to become invisible.
The human friction, the embodied knowledge, the tacit understanding
that resists formalization — these do not disappear.
They simply cease to be counted.

To build technology thoughtfully is to remain suspicious
of one's own fluency — to keep asking what the model leaves out.`,
  },
];

export default academicSnippets;
