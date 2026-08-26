import { pool } from "../db/db.js";

const create = async (data) => {
  const { rows } = await pool.query(
    `INSERT INTO jobs
      (title, type_work, location, description, education, amount, min_salary,
       max_salary, welfare, contact_name, company, contact_address,
       contact_phone, contact_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING *`,
    [data.title, data.type_work || "ทุกประเภท", data.location, data.description,
      data.education, data.amount || null, data.min_salary || null, data.max_salary || null,
      data.welfare, data.contact?.name, data.contact?.company, data.contact?.address,
      data.contact?.phone, data.contact?.email],
  );
  return rows[0];
};

const search = async ({ keyword = "", location = "", type = "", maxSalary = "" }) => {
  const term = `%${keyword.trim()}%`;
  const place = `%${location.trim()}%`;
  const params = [term, place];
  let typeClause = "";
  if (type) {
    params.push(type);
    typeClause = `AND type_work = $${params.length}`;
  }
  let salaryClause = "";
  if (maxSalary) {
    params.push(Number(maxSalary));
    salaryClause = `AND (max_salary IS NULL OR max_salary <= $${params.length})`;
  }
  const { rows } = await pool.query(
    `SELECT * FROM jobs
     WHERE (title ILIKE $1 OR company ILIKE $1 OR description ILIKE $1)
      AND location ILIKE $2 ${typeClause} ${salaryClause}
     ORDER BY post_date DESC`,
    params,
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
  return rows[0] || null;
};

export default { create, search, findById };
