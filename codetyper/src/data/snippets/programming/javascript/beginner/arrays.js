// src/data/snippets/programming/javascript/beginner/arrays.js

const arrays = [
  {
    id: "js-beg-arr-001",
    title: "Array Basics & Loops",
    difficulty: "beginner",
    description: "Crear arrays, for, for...of, forEach",
    code: `const fruits = ["apple", "banana", "cherry"];

fruits.push("mango");
fruits.unshift("strawberry");
const last = fruits.pop();

for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}

for (const fruit of fruits) {
  console.log(fruit.toUpperCase());
}

fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});`,
  },
  {
    id: "js-beg-arr-002",
    title: "map, filter, reduce",
    difficulty: "beginner",
    description: "Los tres métodos más importantes de arrays",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map((n) => n * 2);

const evens = numbers.filter((n) => n % 2 === 0);

const total = numbers.reduce((acc, n) => acc + n, 0);

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Carol", age: 30 },
];

const adults = users
  .filter((u) => u.age >= 18)
  .map((u) => u.name);

console.log(doubled);
console.log(evens);
console.log(total);
console.log(adults);`,
  },
  {
    id: "js-beg-arr-003",
    title: "Objects & Destructuring",
    difficulty: "beginner",
    description: "Objetos, spread y destructuring básico",
    code: `const user = {
  name: "Alice",
  age: 25,
  city: "Madrid",
};

const { name, age } = user;
const { city, ...rest } = user;

const updated = { ...user, age: 26, role: "admin" };

const coords = [40.4168, -3.7038];
const [lat, lng] = coords;

const [first, second, ...others] = [1, 2, 3, 4, 5];

console.log(name, age);
console.log(rest);
console.log(updated);
console.log(lat, lng);
console.log(first, others);`,
  },
];

export default arrays;
