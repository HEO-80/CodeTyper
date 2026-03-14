// src/data/snippets/programming/typescript/beginner/basics.js

export default [
  {
    id: "ts-beg-001",
    title: "Basic Types",
    description: "Primitive types: string, number, boolean, null, undefined",
    difficulty: "beginner",
    code: `// basic-types.ts

const username: string = "Alice";
const age: number = 30;
const isActive: boolean = true;
const score: number = 9.5;

let lastLogin: string | null = null;
let sessionToken: string | undefined = undefined;

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

console.log(greet(username));
console.log(\`Is adult: \${isAdult(age)}\`);
console.log(\`Active: \${isActive}\`);
`,
  },
  {
    id: "ts-beg-002",
    title: "Arrays and Tuples",
    description: "Typed arrays and fixed-length tuples",
    difficulty: "beginner",
    code: `// arrays-tuples.ts

const fruits: string[] = ["apple", "banana", "cherry"];
const scores: number[] = [98, 87, 76, 100];
const flags: boolean[] = [true, false, true];

// Tuple: fixed length and fixed types
const user: [string, number, boolean] = ["Alice", 30, true];
const coordinates: [number, number] = [40.7128, -74.0060];

// Destructuring a tuple
const [name, userAge, active] = user;
const [lat, lng] = coordinates;

fruits.push("mango");
const upperFruits: string[] = fruits.map((f) => f.toUpperCase());

console.log(upperFruits);
console.log(\`User: \${name}, Age: \${userAge}, Active: \${active}\`);
console.log(\`Location: \${lat}, \${lng}\`);
`,
  },
  {
    id: "ts-beg-003",
    title: "Interfaces",
    description: "Define object shapes with interfaces",
    difficulty: "beginner",
    code: `// interfaces.ts

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional field
}

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function printUser(user: User): void {
  console.log(\`[\${user.id}] \${user.name} — \${user.email}\`);
  if (user.age) console.log(\`Age: \${user.age}\`);
}

function formatPrice(product: Product): string {
  return \`\${product.name}: $\${product.price.toFixed(2)}\`;
}

const alice: User = { id: 1, name: "Alice", email: "alice@email.com", age: 30 };
const laptop: Product = { id: 101, name: "Laptop", price: 999.99, inStock: true };

printUser(alice);
console.log(formatPrice(laptop));
`,
  },
  {
    id: "ts-beg-004",
    title: "Type Aliases and Union Types",
    description: "Custom types and union types with type guards",
    difficulty: "beginner",
    code: `// type-aliases.ts

type ID = string | number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

interface Animal {
  name: string;
  species: string;
}

type StringOrNumber = string | number;

function formatID(id: ID): string {
  return typeof id === "number" ? \`#\${id.toString().padStart(5, "0")}\` : id;
}

function getStatusLabel(status: Status): string {
  const labels: Record<Status, string> = {
    active: "✅ Active",
    inactive: "❌ Inactive",
    pending: "⏳ Pending",
  };
  return labels[status];
}

function move(direction: Direction, steps: number): string {
  return \`Moving \${steps} step(s) \${direction}\`;
}

console.log(formatID(42));
console.log(formatID("usr-abc-123"));
console.log(getStatusLabel("active"));
console.log(move("north", 3));
`,
  },
  {
    id: "ts-beg-005",
    title: "Functions and Optional Parameters",
    description: "Typed functions, default and optional parameters",
    difficulty: "beginner",
    code: `// functions.ts

function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

function logMessage(message: string, level?: "info" | "warn" | "error"): void {
  const prefix = level ? \`[\${level.toUpperCase()}]\` : "[LOG]";
  console.log(\`\${prefix} \${message}\`);
}

// Arrow functions with types
const multiply = (a: number, b: number): number => a * b;
const square = (n: number): number => n ** 2;

// Function type alias
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

console.log(add(5, 3));
console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));
logMessage("Server started", "info");
logMessage("Low memory", "warn");
console.log(multiply(4, 7));
console.log(divide(10, 2));
`,
  },
];
