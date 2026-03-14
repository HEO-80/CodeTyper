// src/data/snippets/programming/typescript/advanced/decorators.js

export default [
  {
    id: "ts-adv-001",
    title: "Class Decorators",
    description: "Decorators for logging, validation and metadata",
    difficulty: "advanced",
    code: `// decorators.ts
// tsconfig.json must have: "experimentalDecorators": true

function Singleton<T extends { new (...args: unknown[]): object }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: unknown[]) {
      if (instance) return instance;
      super(...args);
      instance = this as unknown as T;
    }
  };
}

function Log(target: object, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(\`Calling \${key} with:\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned:\`, result);
    return result;
  };
  return descriptor;
}

function Validate(min: number, max: number) {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (value: number) {
      if (value < min || value > max) {
        throw new RangeError(\`\${key}: value \${value} out of range [\${min}, \${max}]\`);
      }
      return original.call(this, value);
    };
    return descriptor;
  };
}

@Singleton
class DatabaseConnection {
  private connected = false;

  @Log
  connect(host: string): string {
    this.connected = true;
    return \`Connected to \${host}\`;
  }

  @Validate(0, 100)
  setPoolSize(size: number): void {
    console.log(\`Pool size set to \${size}\`);
  }
}

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true — singleton

db1.connect("localhost:5432");
db1.setPoolSize(10);
`,
  },
  {
    id: "ts-adv-002",
    title: "Conditional and Mapped Types",
    description: "Advanced type manipulation with conditional and mapped types",
    difficulty: "advanced",
    code: `// advanced-types.ts

// Conditional types
type IsString<T> = T extends string ? true : false;
type Flatten<T> = T extends Array<infer U> ? U : T;
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Deep partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Extract function return types
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;

interface Config {
  readonly host: string;
  readonly port: number;
  readonly db: {
    readonly name: string;
    readonly pool: number;
  };
}

type MutableConfig = Mutable<Config>;
type PartialConfig = DeepPartial<Config>;

const config: MutableConfig = {
  host: "localhost",
  port: 5432,
  db: { name: "mydb", pool: 10 },
};

config.host = "production.server.com"; // now mutable

const partialConfig: PartialConfig = {
  db: { pool: 20 }, // deep partial works
};

type A = IsString<string>; // true
type B = IsString<number>; // false
type C = Flatten<number[]>; // number
type D = Flatten<string>;   // string

console.log(config);
console.log(partialConfig);
`,
  },
  {
    id: "ts-adv-003",
    title: "Advanced Generic Constraints",
    description: "infer keyword, template literal types, recursive types",
    difficulty: "advanced",
    code: `// advanced-generics.ts

// Template literal types
type EventName = \`on\${Capitalize<string>}\`;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ApiRoute = \`/api/\${string}\`;
type HttpEvent = \`\${Lowercase<HttpMethod>}:\${ApiRoute}\`;

// Recursive types
type NestedObject = {
  [key: string]: string | number | boolean | NestedObject;
};

type Path<T, K extends keyof T = keyof T> =
  K extends string
    ? T[K] extends Record<string, unknown>
      ? K | \`\${K}.\${Path<T[K]>}\`
      : K
    : never;

// Builder pattern with generics
class QueryBuilder<T extends Record<string, unknown>> {
  private conditions: string[] = [];
  private selectedFields: (keyof T)[] = [];
  private limitValue?: number;

  select(...fields: (keyof T)[]): this {
    this.selectedFields = fields;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  build(): string {
    const fields = this.selectedFields.length
      ? this.selectedFields.join(", ")
      : "*";
    const where = this.conditions.length
      ? \`WHERE \${this.conditions.join(" AND ")}\`
      : "";
    const limit = this.limitValue ? \`LIMIT \${this.limitValue}\` : "";
    return \`SELECT \${fields} FROM table \${where} \${limit}\`.trim();
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const query = new QueryBuilder<User>()
  .select("id", "name", "email")
  .where("age > 18")
  .where("email IS NOT NULL")
  .limit(10)
  .build();

console.log(query);
`,
  },
];
