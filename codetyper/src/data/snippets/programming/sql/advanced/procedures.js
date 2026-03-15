// src/data/snippets/programming/sql/advanced/procedures.js

const procedures = [
  {
    id: "sql-adv-pro-001",
    title: "Stored Procedures",
    difficulty: "advanced",
    description: "Procedimientos almacenados con parámetros IN/OUT",
    code: `-- Procedure with IN parameter
DELIMITER $$

CREATE PROCEDURE GetUserOrders(IN p_user_id INT)
BEGIN
  SELECT
    o.id          AS order_id,
    o.created_at  AS order_date,
    o.status,
    SUM(oi.quantity * oi.unit_price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.user_id = p_user_id
  GROUP BY o.id, o.created_at, o.status
  ORDER BY o.created_at DESC;
END$$

DELIMITER ;

-- Procedure with IN and OUT parameters
DELIMITER $$

CREATE PROCEDURE TransferFunds(
  IN  p_from_id INT,
  IN  p_to_id   INT,
  IN  p_amount  DECIMAL(10,2),
  OUT p_status  VARCHAR(50)
)
BEGIN
  DECLARE v_balance DECIMAL(10,2);

  SELECT balance INTO v_balance
  FROM accounts
  WHERE id = p_from_id
  FOR UPDATE;

  IF v_balance < p_amount THEN
    SET p_status = 'INSUFFICIENT_FUNDS';
  ELSE
    UPDATE accounts SET balance = balance - p_amount WHERE id = p_from_id;
    UPDATE accounts SET balance = balance + p_amount WHERE id = p_to_id;
    SET p_status = 'SUCCESS';
  END IF;
END$$

DELIMITER ;

-- Call procedure
CALL GetUserOrders(1);

CALL TransferFunds(1, 2, 500.00, @status);
SELECT @status;`,
  },
  {
    id: "sql-adv-pro-002",
    title: "Functions & Cursors",
    difficulty: "advanced",
    description: "Funciones definidas por usuario y cursores",
    code: `-- Scalar function
DELIMITER $$

CREATE FUNCTION FormatCurrency(amount DECIMAL(10,2))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
  RETURN CONCAT('€', FORMAT(amount, 2));
END$$

DELIMITER ;

-- Function using it
SELECT
  name,
  FormatCurrency(salary) AS formatted_salary
FROM employees;

-- Cursor to iterate rows
DELIMITER $$

CREATE PROCEDURE RecalculateBonuses()
BEGIN
  DECLARE done     INT DEFAULT 0;
  DECLARE emp_id   INT;
  DECLARE emp_sal  DECIMAL(10,2);
  DECLARE bonus    DECIMAL(10,2);

  DECLARE cur CURSOR FOR
    SELECT id, salary FROM employees WHERE active = 1;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;
  read_loop: LOOP
    FETCH cur INTO emp_id, emp_sal;
    IF done THEN LEAVE read_loop; END IF;

    SET bonus = CASE
      WHEN emp_sal > 60000 THEN emp_sal * 0.15
      WHEN emp_sal > 40000 THEN emp_sal * 0.10
      ELSE emp_sal * 0.05
    END;

    UPDATE employees SET bonus = bonus WHERE id = emp_id;
  END LOOP;

  CLOSE cur;
END$$

DELIMITER ;`,
  },
];

export default procedures;
