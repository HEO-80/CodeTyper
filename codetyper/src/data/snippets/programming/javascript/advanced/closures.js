// src/data/snippets/programming/javascript/advanced/closures.js

const closures = [
  {
    id: "js-adv-clo-001",
    title: "Memoization",
    difficulty: "advanced",
    description: "Cache de resultados con Map",
    code: `function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit:", key);
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize(function fib(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10));
console.log(fibonacci(10));
console.log(fibonacci(40));`,
  },
  {
    id: "js-adv-clo-002",
    title: "Proxy & Reflect",
    difficulty: "advanced",
    description: "Interceptar operaciones en objetos con Proxy",
    code: `function createReactive(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const old = obj[prop];
      obj[prop] = value;
      if (old !== value) onChange(prop, old, value);
      return true;
    },
    get(obj, prop) {
      return Reflect.get(obj, prop);
    },
    deleteProperty(obj, prop) {
      console.log(\`Deleted: \${prop}\`);
      return Reflect.deleteProperty(obj, prop);
    },
  });
}

const state = createReactive(
  { count: 0, name: "app" },
  (prop, oldVal, newVal) => {
    console.log(\`\${prop}: \${oldVal} → \${newVal}\`);
  }
);

state.count = 1;
state.count = 2;
state.name = "codetyper";
delete state.name;`,
  },
];

export default closures;
