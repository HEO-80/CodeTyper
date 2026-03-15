// src/data/snippets/programming/sql/advanced/triggers.js

const triggers = [
  {
    id: "sql-adv-trg-001",
    title: "Triggers",
    difficulty: "advanced",
    description: "BEFORE/AFTER INSERT, UPDATE, DELETE triggers",
    code: `-- Audit log trigger on UPDATE
DELIMITER $$

CREATE TRIGGER trg_users_audit
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    table_name, record_id,
    action, changed_at, changed_by
  )
  VALUES (
    'users', OLD.id,
    'UPDATE', NOW(), CURRENT_USER()
  );
END$$

DELIMITER ;

-- Prevent delete of admin users
DELIMITER $$

CREATE TRIGGER trg_prevent_admin_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
  IF OLD.role = 'admin' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot delete admin users';
  END IF;
END$$

DELIMITER ;

-- Auto-update stock on order
DELIMITER $$

CREATE TRIGGER trg_update_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock = stock - NEW.quantity
  WHERE id = NEW.product_id;
END$$

DELIMITER ;`,
  },
  {
    id: "sql-adv-trg-002",
    title: "Indexes & Performance",
    difficulty: "advanced",
    description: "Crear índices, índices compuestos y EXPLAIN",
    code: `-- Single column index
CREATE INDEX idx_users_email
ON users(email);

-- Composite index for common query pattern
CREATE INDEX idx_posts_user_published
ON posts(user_id, published, created_at DESC);

-- Unique index
CREATE UNIQUE INDEX idx_users_username
ON users(username);

-- Full-text index for search
CREATE FULLTEXT INDEX idx_posts_content
ON posts(title, body);

-- Use EXPLAIN to analyze query
EXPLAIN SELECT
  u.name, p.title, p.created_at
FROM users u
INNER JOIN posts p ON p.user_id = u.id
WHERE p.published = 1
  AND u.active = 1
ORDER BY p.created_at DESC
LIMIT 20;

-- Drop index
DROP INDEX idx_posts_user_published ON posts;`,
  },
];

export default triggers;
