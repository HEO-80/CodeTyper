// src/data/snippets/programming/javascript/exam/full.js

const exam = [
  {
    id: "js-exam-001",
    title: "JS Full Stack — Variables to Async",
    difficulty: "advanced",
    description: "Variables, funciones, clases, async/await, módulos en un solo fichero",
    code: `// 1. Variables & destructuring
const API_URL = "https://api.codetyper.io";
const [major, minor, patch] = [1, 0, 0];

// 2. Utility functions
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 3. Class with private fields
class User {
  #password;

  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.#password = password;
    this.createdAt = new Date().toISOString();
  }

  checkPassword(input) {
    return input === this.#password;
  }

  toJSON() {
    return { name: this.name, email: this.email };
  }
}

// 4. Higher-order function
function withRetry(fn, attempts = 3) {
  return async (...args) => {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);
      } catch (err) {
        if (i === attempts - 1) throw err;
        await delay(200 * (i + 1));
      }
    }
  };
}

// 5. Async / await with error handling
async function fetchProfile(userId) {
  const res = await fetch(\`\${API_URL}/users/\${userId}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

const safeFetch = withRetry(fetchProfile, 3);

// 6. Main execution
async function main() {
  const user = new User({
    name: "Ada",
    email: "ada@code.io",
    password: "s3cr3t",
  });

  console.log(user.toJSON());
  console.log("Auth:", user.checkPassword("s3cr3t"));
  console.log("Version:", \`\${major}.\${minor}.\${patch}\`);
  console.log("Clamped:", clamp(150, 0, 100));

  try {
    const profile = await safeFetch(1);
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Failed after retries:", err.message);
  }
}

main();`,
  },
  {
    id: "js-exam-002",
    title: "React App — Hooks & Context",
    difficulty: "advanced",
    description: "Componente completo con useState, useEffect, useContext y fetch",
    code: `import { useState, useEffect, useContext, createContext } from "react";

// 1. Context
const ThemeContext = createContext("dark");

// 2. Custom hook
function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { posts, loading };
}

// 3. Components
function PostCard({ title, body }) {
  const theme = useContext(ThemeContext);
  return (
    <div className={\`card card--\${theme}\`}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function PostList() {
  const { posts, loading } = usePosts();
  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {posts.map((p) => (
        <PostCard key={p.id} title={p.title} body={p.body} />
      ))}
    </ul>
  );
}

// 4. Root
export default function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme((t) => t === "dark" ? "light" : "dark")}>
        Toggle theme
      </button>
      <PostList />
    </ThemeContext.Provider>
  );
}`,
  },
];

export default exam;
