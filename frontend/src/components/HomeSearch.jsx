import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineAddLocation } from 'react-icons/md'
import { PiBookOpenTextLight } from 'react-icons/pi'

function HomeSearch() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [salary, setSalary] = useState('300000')

  const searchJobs = (event) => {
    event.preventDefault()
    const params = new URLSearchParams({ keyword, location, type, maxSalary: salary })
    navigate(`/jobs?${params.toString()}`)
  }

  return (
    <div id="search">
        <div className="mx-auto mt-8 px-4 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold">ค้นหางาน</h2>
          <p className="mt-2 text-lg sm:text-2xl font-bold">
            ค้นหางาน{" "}
              <span className="text-lg sm:text-2xl ml-1 mt-2 font-bold text-red-600">
              100,000 อัตรา
            </span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-4 px-4 sm:px-8">
          {/* ฝั่งซ้าย */}
          <div className="w-full lg:w-1/2">
            <div className="grid gap-3 mt-4">
              <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0040A1] text-lg" />

                <input
                  type="text"
                  placeholder="ตำแหน่งงาน หรือ ชื่อบริษัท"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid gap-2 grid-cols-2">
                <div className="relative w-full">
                  <MdOutlineAddLocation className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0040A1] text-lg" />
                  <input
                    type="text"
                    placeholder="สถานที่"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative w-full">
                  <PiBookOpenTextLight className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0040A1] text-lg" />
                  <input
                    type="text"
                    placeholder="สาขา"
                    className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* เส้นคั้น */}
          <div className="hidden lg:block w-px self-stretch bg-[#000000]/20" />

          {/* ฝั่งขวา */}
          <div className="w-full lg:w-1/2">
            <div className="p-0 lg:p-4">
              {/* Radio */}
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  ["Full Time", "งานเต็มเวลา"],
                  ["Hybrid Work", "งานสัญญาจ้าง"],
                  ["Work From Home", "งานพาร์ทไทม์"],
                  ["Internship", "งานชั่วคราว"],
                ].map(([label, value]) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={value}
                      onChange={(event) => setType(event.target.value)}
                      className="h-4 w-4 accent-[#0040A1]"
                    />
                    <span className="text-sm text-black">{label}</span>
                  </label>
                ))}
              </div>

              {/* Salary + Button */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="text-[12px] font-bold tracking-[0.2em] uppercase text-gray-700 mb-2">
                    Salary up to {Number(salary).toLocaleString()} บาท
                  </div>

                  <input
                    type="range"
                    min="50000"
                    max="300000"
                    defaultValue="150000"
                    value={salary}
                    onChange={(event) => setSalary(event.target.value)}
                    className="w-full max-w-[300px] accent-[#0040A1] cursor-pointer"
                  />

                  <div className="flex justify-between w-full max-w-[300px] text-[10px] text-slate-500 mt-1">
                    <span className="text-sm">฿50k</span>
                    <span className="text-sm">฿300k</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={searchJobs}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#313F5C] to-[#4B637E] px-8 py-3 text-sm font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 sm:mr-0"
                >
                  ค้นหางาน
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomeSearch
