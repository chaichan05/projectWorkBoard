import express from "express";
import cors from "cors";
import connectToDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";
import router from "./routes/myRouter.js";

const app = express();
app.use(cors());
app.use(express.json()); //แปลงข้อมูลทีส่งไปเป็น json ไปยัง nodeJS
app.use("/api/auth", authRouter);
app.use("/", router);
const port = process.env.PORT || 8000;
connectToDatabase()
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch(() => process.exit(1));
