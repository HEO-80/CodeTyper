// src/data/snippets/programming/sql/beginner/select.js

const select = [
  {
    id: "sql-beg-sel-001",
    title: "SELECT Basics",
    difficulty: "beginner",
    description: "Consultas básicas SELECT, WHERE, ORDER BY",
    code: `-- Select all columns from a table
SELECT * FROM users;

-- Select specific columns
SELECT name, email, created_at
FROM users;

-- Filter with WHERE
SELECT name, email
FROM users
WHERE active = 1
  AND role = 'admin';

-- Sort results
SELECT name, age
FROM users
WHERE age >= 18
ORDER BY age DESC, name ASC;

-- Limit results
SELECT name, email
FROM users
ORDER BY created_at DESC
LIMIT 10;`,
  },
  {
    id: "sql-beg-sel-002",
    title: "WHERE & Operators",
    difficulty: "beginner",
    description: "Operadores LIKE, IN, BETWEEN, IS NULL",
    code: `-- LIKE: pattern matching
SELECT name, email
FROM users
WHERE email LIKE '%@gmail.com';

-- IN: multiple values
SELECT name, role
FROM users
WHERE role IN ('admin', 'editor', 'moderator');

-- BETWEEN: range
SELECT name, salary
FROM employees
WHERE salary BETWEEN 30000 AND 60000;

-- IS NULL / IS NOT NULL
SELECT name, phone
FROM users
WHERE phone IS NULL;

SELECT name, phone
FROM users
WHERE phone IS NOT NULL
ORDER BY name ASC;`,
  },
  {
    id: "sql-beg-sel-003",
    title: "Aliases & DISTINCT",
    difficulty: "beginner",
    description: "Alias de columnas y tablas, DISTINCT",
    code: `-- Column aliases with AS
SELECT
  name        AS full_name,
  email       AS contact_email,
  created_at  AS member_since
FROM users;

-- Table alias
SELECT u.name, u.email
FROM users u
WHERE u.active = 1;

-- DISTINCT: remove duplicates
SELECT DISTINCT city
FROM customers
ORDER BY city ASC;

-- COUNT with DISTINCT
SELECT COUNT(DISTINCT city) AS unique_cities
FROM customers;`,
  },
];

export default select;
