// src/data/snippets/programming/javascript/intermediate/classes.js

const classes = [
  {
    id: "js-int-cls-001",
    title: "Classes & Inheritance",
    difficulty: "intermediate",
    description: "Clases ES6, constructor, herencia",
    code: `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }

  toString() {
    return \`Animal(\${this.name})\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
    this.tricks = [];
  }

  learn(trick) {
    this.tricks.push(trick);
    return this;
  }

  showTricks() {
    return \`\${this.name} knows: \${this.tricks.join(", ")}\`;
  }
}

const dog = new Dog("Rex");
dog.learn("sit").learn("shake").learn("roll over");
console.log(dog.speak());
console.log(dog.showTricks());`,
  },
  {
    id: "js-int-cls-002",
    title: "Getters, Setters & Static",
    difficulty: "intermediate",
    description: "Propiedades computadas y métodos estáticos",
    code: `class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set fahrenheit(f) {
    this.#celsius = ((f - 32) * 5) / 9;
  }

  get celsius() {
    return this.#celsius;
  }

  static fromFahrenheit(f) {
    return new Temperature(((f - 32) * 5) / 9);
  }

  toString() {
    return \`\${this.#celsius}°C / \${this.fahrenheit}°F\`;
  }
}

const temp = new Temperature(100);
console.log(temp.toString());
console.log(Temperature.fromFahrenheit(32).toString());`,
  },
];

export default classes;
