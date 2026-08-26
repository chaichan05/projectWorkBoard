import bcrypt from "bcrypt";
import connectToDatabase, { pool } from "./db/db.js";

const companyNames = [
  "เซ็นทรัล รีเทล", "ปตท.", "แอดวานซ์ อินโฟร์ เซอร์วิส", "พีทีจี เอ็นเนอยี",
  "แพลน บี มีเดีย", "ซีพี แอ็กซ์ตร้า", "ไทยเบฟเวอเรจ", "การบินไทย",
  "ธนาคารกสิกรไทย", "ธนาคารกรุงเทพ", "ธนาคารกรุงไทย", "เอสซีจี",
  "ซีพี ออลล์", "ไมเนอร์ อินเตอร์เนชั่นแนล", "บ้านปู", "ไทยยูเนี่ยน",
  "เดอะมอลล์ กรุ๊ป", "โตโยต้า มอเตอร์", "ฮอนด้า ออโตโมบิล", "นิสสัน มอเตอร์",
];

const seed = async () => {
  try {
    await connectToDatabase();
    const password = await bcrypt.hash("admin", 10);
    await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)
       ON CONFLICT (email) DO NOTHING`,
      ["admin", "admin@gmail.com", password, "admin"],
    );

    for (let index = 0; index < 100; index += 1) {
      const company = `${companyNames[index % companyNames.length]} ${Math.floor(index / companyNames.length) + 1}`;
      const types = ["Full Time", "Hybrid Work", "Work From Home", "Internship"];
      const jobType = types[index % types.length];
      await pool.query(
        `INSERT INTO jobs (title, type_work, location, description, company, min_salary, max_salary)
         SELECT $1, $2, $3, $4, $5, $6, $7
         WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE company = $5::varchar)`,
        [`รับสมัครงาน ${company}`, jobType, index % 2 ? "กรุงเทพมหานคร" : "นครปฐม",
          "ร่วมงานกับทีมมืออาชีพและเติบโตไปพร้อมกับองค์กร", `บริษัท ${company} จำกัด`,
          18000 + (index % 5) * 3000, 45000 + (index % 5) * 5000],
      );
      await pool.query("UPDATE jobs SET type_work = $1 WHERE company = $2", [jobType, `บริษัท ${company} จำกัด`]);
    }
    console.log("Seeded admin and 100 companies");
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
};

seed();
