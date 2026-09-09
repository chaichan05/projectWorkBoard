import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// หน้า LoginAdmin: สำหรับเข้าสู่ระบบ admin โดยใช้ username admin และ password admin123
import Header from "../components/Header";
import logoLogin from "../assets/logoLogin.png";

const LoginAdmin = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email: username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          setError("บัญชีนี้ไม่ใช่ผู้ดูแลระบบ");
        }
      }
    } catch (error) {
      if (error && error.response && error.response.data) {
        const respData = error.response.data;
        setError(respData.error || respData.message || "Server Error");
      } else if (error && error.message) {
        setError(error.message);
      } else {
        setError("Server Error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex min-h-screen flex-col lg:flex-row gap-10 bg-[#EEF1F2] px-4 sm:px-10 py-8 sm:py-12">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-full max-w-md bg-[#D9D9D933] rounded-2xl shadow-xl p-5 sm:p-8">
            <h2 className="text-center text-2xl font-bold text-[#1A2E5A]">
              Login Admin
            </h2>

            <p className="mt-3 text-center text-sm text-gray-500">
              Username: admin
            </p>

            <hr className="my-6" />

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                className="w-full border rounded-lg px-4 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#3E4E73] text-white py-3 rounded-lg hover:bg-[#2f3c5c]"
              >
                {submitting ? "กำลังดำเนินการ..." : "เข้าสู่ระบบ Admin"}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex items-center justify-center lg:mt-[-200px]">
          <div>
            <img src={logoLogin} alt="login" className="w-48 sm:w-[300px] mx-auto" />

            <div className="mt-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                คำแนะนำในการใช้ Admin
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Username: admin</li>
                <li>Password: admin123</li>
                <li>ใช้สำหรับเข้าสู่หน้าแผงควบคุมระบบ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
