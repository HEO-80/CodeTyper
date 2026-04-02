// src/data/snippets/languages/english/b1/conversations.js

const conversationsSnippets = [
  {
    id: "en-b1-conv-01",
    title: "Code Review Feedback",
    difficulty: "b1",
    description: "Giving and receiving feedback on code",
    code: `Thanks for submitting this pull request.
The overall structure looks clean and readable.
I have a few suggestions for the main function.
Could you add error handling for the API call?
Also, the variable names could be more descriptive.
I think we should split this into two smaller functions.
Please update the tests to cover the new edge cases.
Let me know if you have any questions about my comments.`,
  },
  {
    id: "en-b1-conv-02",
    title: "Technical Review",
    difficulty: "b1",
    description: "Discussing technical decisions with your team",
    code: `We need to decide on the database architecture today.
I think we should use PostgreSQL for this project.
The main reason is that we need relational data support.
However, MongoDB could work better for the user sessions.
What do you think about using both in the same project?
We could use Postgres for core data and Mongo for cache.
This approach is common in large-scale applications.
Let us review the pros and cons before we decide.`,
  },
  {
    id: "en-b1-conv-03",
    title: "Bug Report",
    difficulty: "b1",
    description: "Reporting and describing a bug clearly",
    code: `I found a bug in the user registration flow.
The issue happens when the email already exists in the database.
Instead of showing an error message, the app crashes completely.
I reproduced the bug three times on different browsers.
The error only occurs when submitting the form a second time.
I checked the logs and found an unhandled promise rejection.
The fix should be straightforward once we find the root cause.
I will create a ticket with all the details and steps to reproduce.`,
  },
];

export default conversationsSnippets;
