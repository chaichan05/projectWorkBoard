import React from "react";
import logo from "../assets/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
function Footer() {
  return (
    <div>
      <footer className="w-full bg-[#D7E2ED] text-white py-10 px-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          {/* Left: Logo */}
          <div className="shrink-0">
            <img src={logo} alt="logo" className="h-16 sm:h-20 w-auto max-w-full" />
          </div>

          {/* Center: Contact title + icons */}
          <div className="flex items-center text-gray-700">
            <h3 className="text-xl font-semibold mr-4 mt-2">ติดต่อเรา</h3>
            <div className="flex items-center gap-3 mt-3">
              <span className="p-2 md:p-3 rounded-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-80">
                <FaFacebookSquare className="text-blue-600 text-2xl md:text-5xl " />
              </span>
              <span className="p-2 md:p-3 rounded-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-80">
                <FaLine className="text-green-500 text-2xl md:text-5xl  transition duration-700 ease-in-out" />
              </span>
              <span className=" p-2 md:p-3 rounded-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-80">
                <FcGoogle className="text-2xl md:text-5xl transition duration-700 ease-in-out" />
              </span>
            </div>
          </div>

          {/* Right: Company info */}
          <div className="text-center md:text-right text-gray-700 text-sm max-w-md">
            <h3 className="font-bold">บริษัท หางาน ดอท คอม จำกัด</h3>
            <p>
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน อาคาร SC11 (IT)
              <br /> คณะศิลปศาสตร์และวิทยาศาสตร์ เลขที่ 1 หมู่ 6
              <br /> ต.กำแพงแสน อ.กำแพงแสน จ.นครปฐม 73140
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
