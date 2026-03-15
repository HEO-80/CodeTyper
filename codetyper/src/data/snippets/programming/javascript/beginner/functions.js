// src/data/snippets/programming/javascript/beginner/functions.js

const functions = [
  {
    id: "js-beg-fn-001",
    title: "Function Declaration",
    difficulty: "beginner",
    description: "Funciones declaradas y expresadas",
    code: `function greet(name) {
  return "Hello, " + name + "!";
}

const double = function (n) {
  return n * 2;
};

const square = (n) => n * n;

const add = (a, b) => {
  const result = a + b;
  return result;
};

console.log(greet("World"));
console.log(double(5));
console.log(square(4));
console.log(add(3, 7));`,
  },
  {
    id: "js-beg-fn-002",
    title: "Default & Rest Params",
    difficulty: "beginner",
    description: "Parámetros por defecto y rest operator",
    code: `function createUser(name, role = "viewer", active = true) {
  return { name, role, active };
}

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

function logAll(first, ...rest) {
  console.log("First:", first);
  console.log("Rest:", rest);
}

console.log(createUser("Alice"));
console.log(createUser("Bob", "admin"));
console.log(sum(1, 2, 3, 4, 5));
logAll("a", "b", "c", "d");`,
  },
  {
    id: "js-beg-fn-003",
    title: "Conditionals",
    difficulty: "beginner",
    description: "if/else, ternario y switch",
    code: `function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else return "F";
}

const age = 20;
const status = age >= 18 ? "adult" : "minor";

function getDayName(day) {
  switch (day) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    default: return "Unknown";
  }
}

console.log(getGrade(85));
console.log(status);
console.log(getDayName(2));`,
  },
];

export default functions;
