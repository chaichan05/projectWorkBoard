import { pool } from "../db/db.js";

const findOne = async ({ email }) => {
  const { rows } = await pool.query("SELECT * FROM information WHERE email = $1", [email]);
  return rows[0] || null;
};

const create = async (data) => {
  const { rows } = await pool.query(
    `INSERT INTO information
      (first_name, last_name, email, gender, birth_date, phone, address,
       position, salary, type_work, image_resume)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [data.first_name, data.last_name, data.email, data.gender, data.date || null,
      data.phone, data.address, data.position, data.salary, data.type_work, data.image_resume],
  );
  return rows[0];
};

const list = async () => {
  const { rows } = await pool.query("SELECT * FROM information ORDER BY id DESC");
  return rows;
};

export default { findOne, create, list };
