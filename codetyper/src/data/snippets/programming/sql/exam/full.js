// src/data/snippets/programming/sql/exam/full.js

const exam = [
  {
    id: "sql-exam-001",
    title: "SQL Full — E-Commerce Schema",
    difficulty: "advanced",
    description: "CREATE, INSERT, SELECT, JOIN, GROUP BY, subquery en un solo script",
    code: `-- 1. CREATE tables
CREATE TABLE customers (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  city       VARCHAR(80),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id       INT PRIMARY KEY AUTO_INCREMENT,
  name     VARCHAR(150) NOT NULL,
  price    DECIMAL(10,2) NOT NULL,
  stock    INT NOT NULL DEFAULT 0,
  category VARCHAR(80)
);

CREATE TABLE orders (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  status      ENUM('pending','paid','shipped','cancelled') DEFAULT 'pending',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  order_id   INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 2. INSERT sample data
INSERT INTO customers (name, email, city) VALUES
  ('Ada Lovelace',  'ada@code.io',   'London'),
  ('Alan Turing',   'alan@code.io',  'Manchester'),
  ('Grace Hopper',  'grace@code.io', 'New York');

INSERT INTO products (name, price, stock, category) VALUES
  ('Mechanical Keyboard', 89.99,  50, 'Hardware'),
  ('USB-C Hub',           34.99, 120, 'Hardware'),
  ('VS Code Course',      19.99, 999, 'Digital');

-- 3. SELECT with JOIN + aggregates
SELECT
  c.name                              AS customer,
  COUNT(DISTINCT o.id)                AS total_orders,
  SUM(oi.quantity * oi.unit_price)    AS total_spent,
  MAX(o.created_at)                   AS last_order
FROM customers c
LEFT JOIN orders o      ON o.customer_id = c.id
LEFT JOIN order_items oi ON oi.order_id  = o.id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;

-- 4. Subquery: customers above average spend
SELECT name, email
FROM customers
WHERE id IN (
  SELECT o.customer_id
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  GROUP BY o.customer_id
  HAVING SUM(oi.quantity * oi.unit_price) > (
    SELECT AVG(order_total)
    FROM (
      SELECT SUM(oi2.quantity * oi2.unit_price) AS order_total
      FROM orders o2
      JOIN order_items oi2 ON oi2.order_id = o2.id
      GROUP BY o2.customer_id
    ) AS totals
  )
);

-- 5. Window function: rank products by revenue
SELECT
  p.name,
  SUM(oi.quantity * oi.unit_price)  AS revenue,
  RANK() OVER (ORDER BY SUM(oi.quantity * oi.unit_price) DESC) AS revenue_rank
FROM products p
JOIN order_items oi ON oi.product_id = p.id
GROUP BY p.id, p.name;`,
  },
];

export default exam;
