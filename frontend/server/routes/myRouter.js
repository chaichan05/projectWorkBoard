import express from "express";
import multer from "multer";
import Information from "../models/informationSchema.js";
import Job from "../models/jobSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router is connected");
});

router.get("/dashboard", async (req, res) => {
  try {
    const result = await Information.list();
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// อัพโหลด
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/dashboard"); //ตำแหน่งเก็บไฟล์
  },
  filename: function (req, file, cb) {
    // เปลี่ยนชื่อไฟล์กันชื่อซ้ำ
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({
  storage: storage,
});

router.post("/dashboard", upload.single("imageDashboard"), async (req, res) => {
  try {
    // ป้องกันการบันทึกซ้ำ ตรวจสอบว่า email มีอยู่แล้วหรือไม่
    const existing = await Information.findOne({ email: req.body.email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "อีเมลนี้ถูกใช้งานแล้ว" });
    }
    // สร้างเอกสารใหม่จาก Mongoose model 'Information'
    // เดิมโค้ดใช้ new Resume(...) ซึ่งไม่มีตัวแปร Resume ในไฟล์นี้
    const data = await Information.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      date: req.body.date,
      phone: req.body.phone,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary,
      type_work: req.body.type_work,
      image_resume: req.file?.filename, // เก็บชื่อไฟล์ที่อัพโหลด
    });

    // บันทึกข้อมูลลง MongoDB ด้วย .save()
    // เดิมโค้ดเรียก Resume.saveProduct(...) ซึ่งไม่ใช่เมธอดของ Mongoose model

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    return res.status(200).json({
      success: true,
      message: "ข้อมูลถูกบันทึกแล้ว",
      data,
      file: req.file?.filename,
    });
  } catch (err) {
    console.error(err);
    // จับกรณี duplicate key จาก MongoDB (e.g., unique index บน email)
    if (err && err.code === "23505") {
      return res
        .status(409)
        .json({ success: false, error: "อีเมลนี้ถูกใช้งานแล้ว" });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
});

// สร้างประกาศงาน
router.post("/jobs", async (req, res) => {
  try {
    const payload = req.body;
    // สร้างเอกสารงานใหม่
    const job = await Job.create(payload);
    return res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.search(req.query);
    return res.json({ success: true, data: jobs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "ไม่พบประกาศงาน" });
    }
    return res.json({ success: true, data: job });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
