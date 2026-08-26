import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import logoLogin from "../assets/logoLogin.png";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
      );
      if (response.data.success) {
        // store token first, then update context
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        login(response.data.user);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      // safe error extraction
      if (error && error.response && error.response.data) {
        const respData = error.response.data;
        setError(respData.error || respData.message || "Server Error");
      } else if (error && error.message) {
        setError(error.message);
      } else {
        setError("Server Error");
      }
    }
  };
  return (
    <div>
      <Header />

      <div className="flex min-h-screen flex-col lg:flex-row gap-10 bg-[#EEF1F2] px-4 sm:px-10 py-8 sm:py-12">
        {/* ฝั่งซ้าย */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-full max-w-md bg-[#D9D9D933] rounded-2xl shadow-xl p-5 sm:p-8">
            <h2 className="text-center text-2xl font-bold text-[#1A2E5A]">
              ผู้ประกอบการ
            </h2>

            <div className="text-center mt-2">
              <span className="text-3xl font-bold">Login</span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-400">Signin</span>
            </div>

            <hr className="my-6" />

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="username"
                className="w-full border rounded-lg px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                className="w-full border rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between text-sm">
                <label>
                  <input type="checkbox" className="mr-2" />
                  จดจำฉัน
                </label>

                <a href="/forgot-password">ลืมรหัสผ่าน</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3E4E73] text-white py-3 rounded-lg hover:bg-[#2f3c5c]"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="w-full lg:w-2/3 flex items-center justify-center lg:mt-[-200px]">
          <div>
            <img src={logoLogin} alt="login" className="w-48 sm:w-[300px] mx-auto" />

            <div className="">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                คำแนะนำในการตั้งรหัสผ่าน :
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร</li>
                <li>
                  ต้องประกอบด้วยตัวอักษรพิมพ์เล็ก - พิมพ์ใหญ่
                  ผสมกับอักษตรพิเศษหรือตัวเลข
                </li>
                <li>
                  หลีกเลี่ยงการใช้ชื่อ วันเกิด เลขบัตรประชาชน หรือข้อมูลส่วนตัว
                </li>
                <li>ควรเปลี่ยนรหัสผ่านทุก 6 เดือน</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
