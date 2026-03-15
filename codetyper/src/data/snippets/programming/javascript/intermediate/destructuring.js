// src/data/snippets/programming/javascript/intermediate/destructuring.js

const destructuring = [
  {
    id: "js-int-des-001",
    title: "Advanced Destructuring",
    difficulty: "intermediate",
    description: "Destructuring anidado, renombrado y valores por defecto",
    code: `const config = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: false,
  },
  db: {
    name: "myapp",
    user: "root",
  },
};

const {
  server: { host, port, ssl = true },
  db: { name: dbName, user: dbUser },
} = config;

console.log(host, port, ssl);
console.log(dbName, dbUser);

function connect({ host = "localhost", port = 5432, ssl = false } = {}) {
  return \`\${ssl ? "ssl" : "tcp"}://\${host}:\${port}\`;
}

console.log(connect({ host: "db.app.io", ssl: true }));
console.log(connect());`,
  },
  {
    id: "js-int-des-002",
    title: "Modules & Imports",
    difficulty: "intermediate",
    description: "ES Modules: import, export, named, default",
    code: `// utils.js (simulado)
export const formatDate = (date) =>
  new Intl.DateTimeFormat("es-ES").format(date);

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const clamp = (val, min, max) =>
  Math.min(Math.max(val, min), max);

export default function logger(msg, level = "info") {
  const time = new Date().toISOString();
  console.log(\`[\${time}] [\${level.toUpperCase()}] \${msg}\`);
}

// main.js
// import logger, { formatDate, capitalize, clamp } from "./utils.js";

logger("App started");
logger("Something went wrong", "error");
console.log(capitalize("hello world"));
console.log(clamp(150, 0, 100));`,
  },
];

export default destructuring;
