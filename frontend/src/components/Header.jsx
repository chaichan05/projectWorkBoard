import React from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home-page");
  };
  return (
    <nav className="sticky top-0 z-10 w-full bg-[#EEF1F2] border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm shadow-[#96AECC]">
      {/*  ฝั่งซ้าย */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-8">
        <Link to="/home-page"><img src={logo} alt="logo" className="h-12 sm:h-20 w-auto" /></Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-6 text-sm font-medium text-gray-700">
          <Link
            to="/home-page"
            className="relative inline-block text-gray-700 hover:text-[#1A2E5A] transition-colors
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:w-0 after:h-[1px] after:bg-[#1A2E5A]
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/jobs"
            className="relative inline-block text-gray-700 hover:text-[#1A2E5A] transition-colors
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:w-0 after:h-[1px] after:bg-[#1A2E5A]
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            หางาน
          </Link>
          <Link
            to="/about"
            className="relative inline-block text-gray-700 hover:text-[#1A2E5A] transition-colors
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:w-0 after:h-[1px] after:bg-[#1A2E5A]
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            เกี่ยวกับ
          </Link>
        </div>
      </div>

      {/* ฝั่งขวา */}
      <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 border border-gray-300 rounded-full px-2 sm:px-4 py-1.5">
          <div className="w-6 h-6 rounded-full bg-[#1A2E5A] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <span className="block max-w-24 sm:max-w-44 truncate text-xs sm:text-sm font-medium text-gray-700">
            {user?.name || "ผู้เยี่ยมชม"}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold">
          <button className="px-2 py-1 rounded text-gray-500 border border-gray-300 hover:bg-gray-100 transition-colors">
            TH
          </button>
          <span className="text-gray-300">|</span>
          <button className="px-2 py-1 rounded bg-[#1A2E5A] text-white hover:bg-[#15254a] transition-colors">
            EN
          </button>
        </div>
        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-red-300 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50"
          >
            ออกจากระบบ
          </button>
        ) : (
          <Link
            to="/login-client"
            className="rounded-md bg-[#1A2E5A] px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#15254a]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
