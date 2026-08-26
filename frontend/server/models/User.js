import { pool } from "../db/db.js";

const findOne = async ({ email }) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] || null;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, firstname, lastname, name, email, role, created_at FROM users WHERE id = $1",
    [id],
  );
  return rows[0] || null;
};

const create = async ({ firstname, lastname, name, email, password, role }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (firstname, lastname, name, email, password, role)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, name, email, role`,
    [firstname, lastname, name, email, password, role],
  );
  return rows[0];
};

export default { findOne, findById, create };
