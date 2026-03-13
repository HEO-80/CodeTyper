// ─── SQL SNIPPETS ─────────────────────────────────────────────────────────────

const beginner = [
  {
    id: "sql-beg-001",
    title: "CREATE TABLE",
    description: "Crear tabla con tipos y constraints",
    code: `CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  edad INT DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
  },
  {
    id: "sql-beg-002",
    title: "INSERT INTO",
    description: "Insertar registros en una tabla",
    code: `INSERT INTO usuarios (nombre, email, edad)
VALUES
  ('Ana García', 'ana@email.com', 28),
  ('Carlos López', 'carlos@email.com', 35),
  ('María Pérez', 'maria@email.com', 22);

-- Insertar un solo registro
INSERT INTO usuarios (nombre, email, edad)
VALUES ('Hector Oviedo', 'hector@email.com', 30);`,
  },
  {
    id: "sql-beg-003",
    title: "SELECT básico",
    description: "Consultas SELECT simples",
    code: `-- Todos los registros
SELECT * FROM usuarios;

-- Columnas específicas
SELECT nombre, email FROM usuarios;

-- Con filtro
SELECT nombre, edad
FROM usuarios
WHERE activo = true
  AND edad >= 18
ORDER BY nombre ASC
LIMIT 10;`,
  },
];

const intermediate = [
  {
    id: "sql-int-001",
    title: "INNER JOIN",
    description: "Unir tablas con JOIN",
    code: `SELECT
  u.nombre,
  u.email,
  p.titulo,
  p.fecha_publicacion
FROM usuarios u
INNER JOIN publicaciones p
  ON u.id = p.usuario_id
WHERE p.activo = true
  AND u.activo = true
ORDER BY p.fecha_publicacion DESC
LIMIT 20;`,
  },
  {
    id: "sql-int-002",
    title: "LEFT JOIN con GROUP BY",
    description: "Contar publicaciones por usuario",
    code: `SELECT
  u.nombre,
  u.email,
  COUNT(p.id) AS total_publicaciones,
  MAX(p.fecha_publicacion) AS ultima_publicacion
FROM usuarios u
LEFT JOIN publicaciones p
  ON u.id = p.usuario_id
GROUP BY u.id, u.nombre, u.email
HAVING COUNT(p.id) > 0
ORDER BY total_publicaciones DESC;`,
  },
  {
    id: "sql-int-003",
    title: "UPDATE y DELETE",
    description: "Actualizar y eliminar registros",
    code: `-- Actualizar un registro
UPDATE usuarios
SET
  nombre = 'Ana García López',
  activo = true
WHERE id = 1;

-- Actualizar varios
UPDATE publicaciones
SET activo = false
WHERE fecha_publicacion < '2023-01-01';

-- Eliminar con condición
DELETE FROM publicaciones
WHERE activo = false
  AND fecha_publicacion < '2022-01-01';`,
  },
];

const advanced = [
  {
    id: "sql-adv-001",
    title: "Stored Procedure",
    description: "Procedimiento almacenado con parámetros",
    code: `DELIMITER //

CREATE PROCEDURE obtener_usuarios_activos(
  IN limite INT,
  IN offset_val INT,
  OUT total INT
)
BEGIN
  SELECT COUNT(*) INTO total
  FROM usuarios
  WHERE activo = true;

  SELECT id, nombre, email, creado_en
  FROM usuarios
  WHERE activo = true
  ORDER BY creado_en DESC
  LIMIT limite OFFSET offset_val;
END //

DELIMITER ;

-- Llamar al procedimiento
CALL obtener_usuarios_activos(10, 0, @total);
SELECT @total AS total_usuarios;`,
  },
  {
    id: "sql-adv-002",
    title: "TRIGGER",
    description: "Trigger para auditoría automática",
    code: `CREATE TABLE auditoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tabla_nombre VARCHAR(50),
  operacion VARCHAR(10),
  usuario_id INT,
  datos_anteriores JSON,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER after_usuario_update
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO auditoria (
    tabla_nombre,
    operacion,
    usuario_id,
    datos_anteriores
  )
  VALUES (
    'usuarios',
    'UPDATE',
    OLD.id,
    JSON_OBJECT(
      'nombre', OLD.nombre,
      'email', OLD.email,
      'activo', OLD.activo
    )
  );
END //

DELIMITER ;`,
  },
];

const sql = { beginner, intermediate, advanced };
export default sql;
