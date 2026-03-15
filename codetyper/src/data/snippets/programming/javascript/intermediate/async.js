// src/data/snippets/programming/javascript/intermediate/async.js

const async_snippets = [
  {
    id: "js-int-asy-001",
    title: "Promises",
    difficulty: "intermediate",
    description: "Crear y encadenar Promises",
    code: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) {
      reject(new Error("Invalid user ID"));
      return;
    }
    setTimeout(() => {
      resolve({ id, name: "Alice", role: "admin" });
    }, 500);
  });
}

fetchUser(1)
  .then((user) => {
    console.log("User:", user.name);
    return user.role;
  })
  .then((role) => console.log("Role:", role))
  .catch((err) => console.error("Error:", err.message))
  .finally(() => console.log("Done"));`,
  },
  {
    id: "js-int-asy-002",
    title: "async / await",
    difficulty: "intermediate",
    description: "Sintaxis moderna para código asíncrono",
    code: `async function getWeather(city) {
  try {
    const response = await fetch(
      \`https://api.weather.com/v1/\${city}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather:", error.message);
    return null;
  }
}

async function loadDashboard() {
  const [weather, user] = await Promise.all([
    getWeather("Madrid"),
    fetchUser(1),
  ]);

  console.log("Dashboard ready:", { weather, user });
}

loadDashboard();`,
  },
  {
    id: "js-int-asy-003",
    title: "Promise.all & Promise.race",
    difficulty: "intermediate",
    description: "Ejecutar promesas en paralelo",
    code: `const delay = (ms, val) =>
  new Promise((res) => setTimeout(() => res(val), ms));

async function runParallel() {
  const start = Date.now();

  const results = await Promise.all([
    delay(300, "first"),
    delay(100, "second"),
    delay(200, "third"),
  ]);

  console.log("All:", results);
  console.log("Time:", Date.now() - start, "ms");
}

async function runRace() {
  const winner = await Promise.race([
    delay(300, "slow"),
    delay(100, "fast"),
    delay(200, "medium"),
  ]);

  console.log("Winner:", winner);
}

runParallel();
runRace();`,
  },
];

export default async_snippets;
