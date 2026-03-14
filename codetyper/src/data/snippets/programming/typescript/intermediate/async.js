// src/data/snippets/programming/typescript/intermediate/async.js

export default [
  {
    id: "ts-int-004",
    title: "Promises with Types",
    description: "Typed promises, Promise.all, error handling",
    difficulty: "intermediate",
    code: `// promises.ts

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }
  return response.json() as Promise<Post>;
}

async function fetchMultiplePosts(ids: number[]): Promise<Post[]> {
  const requests = ids.map((id) => fetchPost(id));
  return Promise.all(requests);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  try {
    const post = await fetchPost(1);
    console.log(\`Post: \${post.title}\`);

    await delay(500);

    const posts = await fetchMultiplePosts([1, 2, 3]);
    posts.forEach((p) => console.log(\`[\${p.id}] \${p.title}\`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(\`Error: \${error.message}\`);
    }
  }
}

main();
`,
  },
  {
    id: "ts-int-005",
    title: "Async / Await with Error Handling",
    description: "Result pattern and typed error handling",
    difficulty: "intermediate",
    code: `// async-error-handling.ts

type Result<T, E = Error> =
  | { success: true;  data: T }
  | { success: false; error: E };

async function safeJsonFetch<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        success: false,
        error: new Error(\`Request failed with status \${response.status}\`),
      };
    }
    const data = (await response.json()) as T;
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err : new Error("Unknown error"),
    };
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function main(): Promise<void> {
  const result = await safeJsonFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  if (result.success) {
    console.log(\`User: \${result.data.name}\`);
    console.log(\`Email: \${result.data.email}\`);
  } else {
    console.error(\`Failed: \${result.error.message}\`);
  }
}

main();
`,
  },
];
