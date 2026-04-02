// src/data/snippets/languages/english/advanced/writing.js

export const writingSnippets = [
  {
    id: "en-adv-wri-01",
    title: "Persuasive Proposal",
    difficulty: "advanced",
    description: "Writing a persuasive technical proposal",
    code: `I would like to propose migrating our current infrastructure
to a containerized architecture using Docker and Kubernetes.

The primary motivation for this change is operational efficiency.
Our current deployment process requires manual intervention at
multiple stages, which introduces human error and slows us down.
By containerizing our services, we eliminate environment inconsistencies
and reduce deployment time from forty minutes to under five minutes.

From a cost perspective, the initial migration will require approximately
two weeks of engineering time. However, the long-term savings in
reduced downtime and faster iteration cycles will recover this investment
within the first quarter after completion.

I am happy to put together a detailed migration plan if the team
is open to exploring this direction. I believe it is the right move
for where we want to be as an engineering organization next year.`,
  },
  {
    id: "en-adv-wri-02",
    title: "Post-Mortem Report",
    difficulty: "advanced",
    description: "Writing a professional incident post-mortem",
    code: `## Incident Post-Mortem: Production Outage — March 15th

### What Happened

At 14:32 UTC the main API began returning 503 errors to all clients.
The issue persisted for approximately forty-seven minutes before
full service was restored at 15:19 UTC. Approximately twelve thousand
users were unable to access the platform during this window.

### Root Cause

A database migration script deployed at 14:28 UTC contained an
index creation statement that locked the users table exclusively.
This prevented any reads or writes for the duration of the operation,
which took longer than expected due to the volume of existing records.

### What We Are Doing to Prevent Recurrence

We will require all migration scripts to be reviewed by a senior
engineer before they are allowed to run in the production environment.
We will also implement a pre-migration check that estimates lock duration
and blocks execution if the estimated time exceeds thirty seconds.`,
  },
];
