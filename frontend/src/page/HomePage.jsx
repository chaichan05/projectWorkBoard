import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import Footer from "../components/Footer";
import HomeSearch from "../components/HomeSearch";
import PopularSerach from "../components/PopularSerach";

import Publish from "../components/Publish";

function HomePage() {
  return (
    <div className="bg-[#D7E2ED] rounded-lg">
      <Header />
      <HomeSearch />
      <div className="bg-[#EEF1F2] rounded-lg">
        <PopularSerach />
        <Publish />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-[#00236F] w-full min-h-20 px-4 py-4 text-center text-base sm:text-[18px] text-white font-bold">
        คุณกำลังหางานอยู่ใช่ไหม ?
        <Link to="/home-page#search" className="inline-flex items-center justify-center bg-white text-base sm:text-[18px] text-black font-bold rounded-3xl px-6 h-10 hover:scale-110 transition-all duration-200">
          เริ่มหางานได้เลย
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
