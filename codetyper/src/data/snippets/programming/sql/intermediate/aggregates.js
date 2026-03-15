// src/data/snippets/programming/sql/intermediate/aggregates.js

const aggregates = [
  {
    id: "sql-int-agg-001",
    title: "GROUP BY & Aggregates",
    difficulty: "intermediate",
    description: "COUNT, SUM, AVG, MAX, MIN con GROUP BY",
    code: `-- Basic aggregates
SELECT
  COUNT(*)          AS total_users,
  COUNT(phone)      AS with_phone,
  MIN(created_at)   AS first_signup,
  MAX(created_at)   AS last_signup
FROM users;

-- GROUP BY with aggregates
SELECT
  role,
  COUNT(*)      AS total,
  AVG(salary)   AS avg_salary,
  MAX(salary)   AS top_salary
FROM employees
GROUP BY role
ORDER BY avg_salary DESC;

-- HAVING: filter after GROUP BY
SELECT
  department,
  COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5
ORDER BY headcount DESC;`,
  },
  {
    id: "sql-int-agg-002",
    title: "Window Functions",
    difficulty: "intermediate",
    description: "ROW_NUMBER, RANK, LAG, SUM OVER con PARTITION",
    code: `-- ROW_NUMBER per partition
SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) AS rank_in_dept
FROM employees;

-- Running total with SUM OVER
SELECT
  order_date,
  amount,
  SUM(amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders;

-- LAG: compare with previous row
SELECT
  month,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) AS growth
FROM monthly_sales;`,
  },
];

export default aggregates;
