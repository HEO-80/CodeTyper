// src/data/snippets/programming/sql/intermediate/joins.js

const joins = [
  {
    id: "sql-int-joi-001",
    title: "INNER JOIN",
    difficulty: "intermediate",
    description: "Unir tablas con INNER JOIN — solo coincidencias",
    code: `-- INNER JOIN: only matching rows
SELECT
  u.name        AS author,
  p.title       AS post_title,
  p.created_at  AS published_on
FROM users u
INNER JOIN posts p ON p.user_id = u.id
WHERE p.published = 1
ORDER BY p.created_at DESC;

-- Multiple INNER JOINs
SELECT
  o.id          AS order_id,
  u.name        AS customer,
  p.name        AS product,
  oi.quantity,
  oi.unit_price
FROM orders o
INNER JOIN users u    ON u.id = o.user_id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p ON p.id = oi.product_id
WHERE o.status = 'completed'
ORDER BY o.id;`,
  },
  {
    id: "sql-int-joi-002",
    title: "LEFT JOIN & RIGHT JOIN",
    difficulty: "intermediate",
    description: "Incluir registros sin coincidencia con LEFT/RIGHT JOIN",
    code: `-- LEFT JOIN: all users, even without posts
SELECT
  u.name,
  COUNT(p.id) AS total_posts
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id, u.name
ORDER BY total_posts DESC;

-- Find users with NO posts at all
SELECT u.name, u.email
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE p.id IS NULL;

-- RIGHT JOIN: all posts, even orphaned ones
SELECT
  p.title,
  u.name AS author
FROM users u
RIGHT JOIN posts p ON p.user_id = u.id
ORDER BY p.created_at DESC;`,
  },
  {
    id: "sql-int-joi-003",
    title: "Subqueries",
    difficulty: "intermediate",
    description: "Subconsultas en WHERE, FROM y SELECT",
    code: `-- Subquery in WHERE
SELECT name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);

-- Subquery in FROM (derived table)
SELECT dept, avg_salary
FROM (
  SELECT
    department   AS dept,
    AVG(salary)  AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_stats
WHERE avg_salary > 50000;

-- Correlated subquery
SELECT e.name, e.salary, e.department
FROM employees e
WHERE e.salary = (
  SELECT MAX(salary)
  FROM employees
  WHERE department = e.department
);`,
  },
];

export default joins;
