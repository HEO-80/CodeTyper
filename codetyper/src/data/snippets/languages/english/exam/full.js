// src/data/snippets/languages/english/exam/full.js

export const examSnippets = [
  {
    id: "en-exam-01",
    title: "Full Stack Developer Interview",
    difficulty: "exam",
    description: "Simulated technical interview in English",
    code: `Tell me about yourself and your experience as a developer.

I have been working as a full-stack developer for five years.
I specialize in JavaScript, TypeScript, and React on the frontend,
and Node.js with Express or Next.js on the backend side.
I am also comfortable working with relational and document databases.

What is your greatest technical achievement so far in your career?

I would say building a real-time collaborative coding platform
from scratch for a startup I joined two years ago.
The system handled over five hundred concurrent users with
sub-hundred-millisecond latency using WebSockets and Redis pub/sub.
We went from zero to launch in three months with a team of four.
That project taught me a great deal about system design and scaling.

How do you handle disagreements with teammates about technical decisions?

I believe the best approach is to keep the conversation objective.
I try to focus on data and measurable outcomes rather than opinions.
If we cannot reach consensus, I am comfortable deferring to the lead
while making sure my concerns are documented for future reference.`,
  },
  {
    id: "en-exam-02",
    title: "Architecture Decision Record",
    difficulty: "exam",
    description: "Writing a formal ADR document in English",
    code: `## ADR 007: Use PostgreSQL as the Primary Database

### Status: Accepted

### Context

We need to choose a primary database for the new platform.
The system requires complex relational queries, transactional integrity,
and the ability to store structured user and session data reliably.
We evaluated MongoDB, MySQL, and PostgreSQL as our main candidates.

### Decision

We have decided to use PostgreSQL as our primary database.

### Rationale

PostgreSQL offers full ACID compliance with excellent performance
at the scale we anticipate for the next two to three years.
Its support for JSONB columns gives us document-store flexibility
without sacrificing relational consistency when we need it.
The team already has strong PostgreSQL expertise, which reduces
the learning curve and the risk of operational mistakes in production.

### Consequences

All new services must use PostgreSQL unless a compelling case
is made and approved through this ADR process for an exception.
We will provision a managed instance on our cloud provider
and establish backup and replication procedures before launch.`,
  },
];
