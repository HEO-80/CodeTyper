// src/data/snippets/languages/english/exam/index.js

const examSnippets = [
  {
    id: "en-exam-01",
    title: "Full Technical Email",
    difficulty: "exam",
    description: "Complete professional email with all structures",
    code: `Subject: Proposal for Microservices Migration — Phase One

Dear team,

I hope you are all doing well.
I am writing to share my proposal for migrating our monolith to microservices.

After analyzing the current architecture, I have identified three main bottlenecks.
First, the authentication module is tightly coupled to the payment service.
Second, deployments require the entire application to restart simultaneously.
Third, scaling individual features independently is currently not possible.

My proposal consists of three phases spread over six months.
In phase one, we would extract the authentication service and deploy it independently.
This would allow us to scale it separately and reduce the overall deployment risk.
If phase one succeeds, we would proceed with the payment and notification services.

I have attached a detailed technical document with diagrams and cost estimates.
I would appreciate your feedback before we present this to the stakeholders.
Please let me know if you would like to schedule a review session this week.

Best regards,
Alex`,
  },
  {
    id: "en-exam-02",
    title: "Technical Blog Post Intro",
    difficulty: "exam",
    description: "Writing a technical article introduction",
    code: `Why Most Developers Get State Management Wrong

State management is one of those topics that every developer encounters
yet few truly master. We reach for Redux, Zustand, or Context API
without fully understanding the problem we are trying to solve.

The core mistake is treating state management as a technical choice
when it is fundamentally an architectural one.
Before selecting a library, you must answer a more important question:
what is the actual scope and lifetime of this piece of state?

Local component state, server state, URL state, and global application state
are four fundamentally different things that require different solutions.
Conflating them leads to over-engineered codebases that are hard to reason about.

In this article, I will walk you through a decision framework
that has helped me and my teams write cleaner, more maintainable React applications.
By the end, you will have a clear mental model for every state decision you face.`,
  },
];
export default examSnippets;