import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: user.id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" },
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user.id,
        name:
          user.name || `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "กรุณากรอกชื่อ นามสกุล อีเมล และรหัสผ่าน",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "อีเมลนี้ถูกใช้งานแล้ว" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      email,
      password: hashedPassword,
      role: role || "client",
    });
    const token = jwt.sign(
      { _id: newUser.id, role: newUser.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" },
    );

    res.status(201).json({
      success: true,
      token,
      user: { _id: newUser.id, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, register, verify };
