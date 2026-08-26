import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:workborad@localhost:5432/databaseWork",
});

const connectToDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'client',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type_work VARCHAR(80) NOT NULL DEFAULT 'ทุกประเภท',
        post_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        location VARCHAR(255),
        description TEXT,
        education TEXT,
        amount INTEGER,
        min_salary INTEGER,
        max_salary INTEGER,
        welfare TEXT,
        contact_name VARCHAR(200),
        company VARCHAR(255),
        contact_address TEXT,
        contact_phone VARCHAR(50),
        contact_email VARCHAR(255)
      );
      CREATE TABLE IF NOT EXISTS information (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(255),
        gender VARCHAR(50), birth_date DATE, phone VARCHAR(50), address TEXT,
        position VARCHAR(255), salary VARCHAR(100), type_work VARCHAR(100),
        image_resume VARCHAR(255)
      );
    `);
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    throw error;
  }
};

export { pool };
export default connectToDatabase;
