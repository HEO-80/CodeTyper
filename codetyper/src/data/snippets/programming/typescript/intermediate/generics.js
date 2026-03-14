// src/data/snippets/programming/typescript/intermediate/generics.js

export default [
  {
    id: "ts-int-001",
    title: "Generic Functions",
    description: "Reusable functions with type parameters",
    difficulty: "intermediate",
    code: `// generics.ts

function identity<T>(value: T): T {
  return value;
}

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

function wrap<T>(value: T): { value: T; timestamp: Date } {
  return { value, timestamp: new Date() };
}

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", email: "alice@email.com" };

console.log(identity<string>("Hello"));
console.log(identity<number>(42));
console.log(first([10, 20, 30]));
console.log(last(["a", "b", "c"]));
console.log(pair("Alice", 30));
console.log(getProperty(user, "name"));
console.log(getProperty(user, "email"));
`,
  },
  {
    id: "ts-int-002",
    title: "Generic Interfaces and Classes",
    description: "Interfaces and classes with generic type parameters",
    difficulty: "intermediate",
    code: `// generic-classes.ts

interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  save(item: T): void;
  delete(id: number): boolean;
}

interface Entity {
  id: number;
}

interface User extends Entity {
  name: string;
  email: string;
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private items: T[] = [];

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  save(item: T): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      this.items[index] = item;
    } else {
      this.items.push(item);
    }
  }

  delete(id: number): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index < 0) return false;
    this.items.splice(index, 1);
    return true;
  }
}

const userRepo = new InMemoryRepository<User>();
userRepo.save({ id: 1, name: "Alice", email: "alice@email.com" });
userRepo.save({ id: 2, name: "Bob",   email: "bob@email.com" });

console.log(userRepo.getAll());
console.log(userRepo.getById(1));
console.log(userRepo.delete(2));
console.log(userRepo.getAll());
`,
  },
  {
    id: "ts-int-003",
    title: "Utility Types",
    description: "Partial, Required, Pick, Omit, Record, Readonly",
    difficulty: "intermediate",
    code: `// utility-types.ts

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "editor" | "viewer";
}

// Partial — all fields optional (useful for update payloads)
type UserUpdate = Partial<User>;

// Required — all fields required
type StrictUser = Required<User>;

// Pick — select specific fields
type UserPreview = Pick<User, "id" | "name">;

// Omit — exclude specific fields
type UserWithoutRole = Omit<User, "role" | "id">;

// Record — key-value map with typed values
type RolePermissions = Record<User["role"], string[]>;

// Readonly — immutable object
type ImmutableUser = Readonly<User>;

const update: UserUpdate = { name: "Alice Updated", age: 31 };

const preview: UserPreview = { id: 1, name: "Alice" };

const permissions: RolePermissions = {
  admin:  ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

const frozen: ImmutableUser = {
  id: 1, name: "Alice", email: "alice@email.com", age: 30, role: "admin",
};

console.log(update);
console.log(preview);
console.log(permissions["admin"]);
console.log(frozen.name);
`,
  },
];
