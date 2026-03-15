// src/data/snippets/programming/javascript/advanced/patterns.js

const patterns = [
  {
    id: "js-adv-pat-001",
    title: "Closures & HOF",
    difficulty: "advanced",
    description: "Closures, currying y funciones de orden superior",
    code: `function makeCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = initial; },
    value: () => count,
  };
}

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const add = curry((a, b, c) => a + b + c);
const add5 = add(5);
const add5and3 = add5(3);

const counter = makeCounter(10);
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.value());
console.log(add5and3(2));`,
  },
  {
    id: "js-adv-pat-002",
    title: "Observer Pattern",
    difficulty: "advanced",
    description: "Patrón observador con EventEmitter propio",
    code: `class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach((fn) => fn(...args));
  }

  once(event, listener) {
    const unsubscribe = this.on(event, (...args) => {
      listener(...args);
      unsubscribe();
    });
  }
}

const bus = new EventEmitter();
const unsub = bus.on("data", (d) => console.log("Got:", d));
bus.once("connect", () => console.log("Connected!"));
bus.emit("connect");
bus.emit("data", { id: 1 });
unsub();
bus.emit("data", { id: 2 });`,
  },
];

export default patterns;
