// src/data/snippets/programming/typescript/beginner/classes.js

export default [
  {
    id: "ts-beg-006",
    title: "Classes - Basics",
    description: "Class definition, constructor, methods and access modifiers",
    difficulty: "beginner",
    code: `// classes-basics.ts

class Animal {
  name: string;
  private species: string;
  protected age: number;

  constructor(name: string, species: string, age: number) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  speak(): string {
    return \`\${this.name} makes a sound.\`;
  }

  getInfo(): string {
    return \`\${this.name} (\${this.species}), age \${this.age}\`;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, "Canis lupus familiaris", age);
    this.breed = breed;
  }

  speak(): string {
    return \`\${this.name} barks! Woof!\`;
  }

  fetch(item: string): string {
    return \`\${this.name} fetches the \${item}!\`;
  }
}

const dog = new Dog("Rex", 4, "Labrador");
console.log(dog.speak());
console.log(dog.getInfo());
console.log(dog.fetch("ball"));
`,
  },
  {
    id: "ts-beg-007",
    title: "Enums",
    description: "Numeric and string enums with practical use cases",
    difficulty: "beginner",
    code: `// enums.ts

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

enum Role {
  Admin,    // 0
  Editor,   // 1
  Viewer,   // 2
}

function move(direction: Direction): string {
  return \`Moving \${direction}\`;
}

function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.OK:          return "Success";
    case HttpStatus.Created:     return "Resource created";
    case HttpStatus.NotFound:    return "Resource not found";
    case HttpStatus.Unauthorized:return "Authentication required";
    default:                     return "Unknown status";
  }
}

function canEdit(role: Role): boolean {
  return role === Role.Admin || role === Role.Editor;
}

console.log(move(Direction.Up));
console.log(getStatusMessage(HttpStatus.OK));
console.log(getStatusMessage(HttpStatus.NotFound));
console.log(\`Can editor edit? \${canEdit(Role.Editor)}\`);
console.log(\`Can viewer edit? \${canEdit(Role.Viewer)}\`);
`,
  },
  {
    id: "ts-beg-008",
    title: "Type Assertions and Type Guards",
    description: "as keyword, instanceof, typeof type guards",
    difficulty: "beginner",
    code: `// type-guards.ts

interface Cat {
  type: "cat";
  name: string;
  purr(): string;
}

interface Dog {
  type: "dog";
  name: string;
  bark(): string;
}

type Pet = Cat | Dog;

// Discriminated union type guard
function makeSound(pet: Pet): string {
  if (pet.type === "cat") {
    return pet.purr();
  }
  return pet.bark();
}

// typeof type guard
function double(value: string | number): string | number {
  if (typeof value === "string") {
    return value.repeat(2);
  }
  return value * 2;
}

// instanceof type guard
class Circle {
  constructor(public radius: number) {}
  area(): number { return Math.PI * this.radius ** 2; }
}

class Rectangle {
  constructor(public width: number, public height: number) {}
  area(): number { return this.width * this.height; }
}

function getArea(shape: Circle | Rectangle): number {
  if (shape instanceof Circle) return shape.area();
  return shape.area();
}

const myCat: Cat = { type: "cat", name: "Luna", purr: () => "Purrrr..." };
const myDog: Dog = { type: "dog", name: "Rex",  bark: () => "Woof woof!" };

console.log(makeSound(myCat));
console.log(makeSound(myDog));
console.log(double("ha"));
console.log(double(21));
console.log(getArea(new Circle(5)).toFixed(2));
console.log(getArea(new Rectangle(4, 6)));
`,
  },
];
