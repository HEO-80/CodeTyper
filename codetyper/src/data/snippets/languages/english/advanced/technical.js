// src/data/snippets/languages/english/advanced/technical.js

export const technicalSnippets = [
  {
    id: "en-adv-tech-01",
    title: "Pull Request Description",
    difficulty: "advanced",
    description: "Writing a professional PR description in English",
    code: `## Summary

This pull request implements the OAuth 2.0 authentication flow
using Google as the identity provider. It replaces the previous
session-based authentication with a stateless JWT strategy.

## Changes

- Added NextAuth configuration with Google and Credentials providers
- Implemented JWT callback to attach the user ID to the session token
- Created a custom sign-in page that matches the existing design system
- Added middleware to protect all authenticated routes automatically

## Testing

All existing unit tests pass with no modifications required.
Added integration tests covering the full authentication lifecycle.
Tested manually on Chrome, Firefox, and Safari on both macOS and Windows.

## Notes

The refresh token rotation is not yet implemented in this version.
This will be addressed in a follow-up ticket scheduled for next sprint.`,
  },
  {
    id: "en-adv-tech-02",
    title: "Technical Documentation",
    difficulty: "advanced",
    description: "Writing clear technical documentation for an API",
    code: `## Authentication API

### POST /api/auth/register

Creates a new user account with email and password credentials.
The password is hashed using bcrypt with a cost factor of twelve.
Returns a 201 status code upon successful account creation.
Returns a 409 status code if the email address already exists.

### Request Body

The request body must be a valid JSON object containing the fields
name, email, and password. The password must be at least six characters
long. All three fields are required and must not be empty strings.

### Error Handling

All errors are returned as JSON with an error field containing
a human-readable message describing what went wrong. Validation
errors return a 400 status, authentication errors return a 401,
and server errors return a 500 with a generic message.`,
  },
  {
    id: "en-adv-tech-03",
    title: "Code Review Comment",
    difficulty: "advanced",
    description: "Leaving constructive code review feedback",
    code: `Thanks for this implementation, the overall structure looks solid.

I have a few suggestions that could improve the robustness here.

On line 42, the error is being caught but then silently swallowed.
This makes debugging in production significantly more difficult.
I would recommend at least logging the error with its full stack trace,
or better yet, propagating it up to the global error handler.

Regarding the database query on line 67, this will cause an N plus one
problem when fetching users with their associated sessions. Consider
using a join or a populate call to fetch everything in a single query.

The logic itself is correct and the tests cover the happy path well.
Could you add a test case for when the user is not found in the database?
Overall this is close to being ready, just a couple of things to address.`,
  },
];
