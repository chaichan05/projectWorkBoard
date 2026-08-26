import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : null;
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token Not Provieded" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({ success: false, error: "Server error" });
  }
};

export default verifyUser