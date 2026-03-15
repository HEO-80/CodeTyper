// src/data/snippets/programming/javascript/beginner/variables.js

const variables = [
  {
    id: "js-beg-var-001",
    title: "Variables & Types",
    difficulty: "beginner",
    description: "var, let, const y tipos básicos",
    code: `const name = "Ada Lovelace";
let age = 28;
var isActive = true;

const PI = 3.14159;
let score = null;
let result = undefined;

const user = {
  id: 1,
  username: "ada",
  email: "ada@code.io",
};

console.log(typeof name);
console.log(typeof age);
console.log(typeof isActive);`,
  },
  {
    id: "js-beg-var-002",
    title: "Template Literals",
    difficulty: "beginner",
    description: "Interpolación de strings con backticks",
    code: `const firstName = "Alan";
const lastName = "Turing";
const year = 1912;

const greeting = \`Hello, \${firstName} \${lastName}!\`;
const info = \`Born in \${year}, aged \${2024 - year} years ago.\`;

const multiline = \`
  Name: \${firstName} \${lastName}
  Year: \${year}
  Legacy: Computer Science pioneer
\`;

console.log(greeting);
console.log(info);`,
  },
  {
    id: "js-beg-var-003",
    title: "Operators & Comparisons",
    difficulty: "beginner",
    description: "Operadores aritméticos, lógicos y de comparación",
    code: `const a = 10;
const b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);

console.log(a === b);
console.log(a !== b);
console.log(a > b);
console.log(a >= b);

const x = true;
const y = false;
console.log(x && y);
console.log(x || y);
console.log(!x);`,
  },
];

export default variables;
