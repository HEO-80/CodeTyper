// src/data/snippets/programming/sql/beginner/insert.js

const insert = [
  {
    id: "sql-beg-ins-001",
    title: "CREATE TABLE",
    difficulty: "beginner",
    description: "Crear tablas con tipos de datos y constraints",
    code: `-- Create a users table
CREATE TABLE users (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('admin','editor','viewer') DEFAULT 'viewer',
  active     TINYINT(1)   NOT NULL DEFAULT 1,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Create a posts table with foreign key
CREATE TABLE posts (
  id         INT          NOT NULL AUTO_INCREMENT,
  user_id    INT          NOT NULL,
  title      VARCHAR(200) NOT NULL,
  body       TEXT,
  published  TINYINT(1)   DEFAULT 0,
  created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`,
  },
  {
    id: "sql-beg-ins-002",
    title: "INSERT & UPDATE & DELETE",
    difficulty: "beginner",
    description: "Insertar, actualizar y borrar registros",
    code: `-- INSERT single row
INSERT INTO users (name, email, password, role)
VALUES ('Ada Lovelace', 'ada@code.io', 'hashed_pw', 'admin');

-- INSERT multiple rows
INSERT INTO users (name, email, password)
VALUES
  ('Alan Turing',  'alan@code.io',  'hashed_pw'),
  ('Grace Hopper', 'grace@code.io', 'hashed_pw'),
  ('Linus T.',     'linus@code.io', 'hashed_pw');

-- UPDATE single record
UPDATE users
SET role = 'editor', active = 1
WHERE id = 3;

-- UPDATE multiple records
UPDATE users
SET active = 0
WHERE last_login < '2024-01-01';

-- DELETE with condition
DELETE FROM users
WHERE active = 0
  AND created_at < '2023-01-01';`,
  },
];

export default insert;
