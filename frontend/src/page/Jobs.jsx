import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const jobTypes = ["", "Full Time", "Hybrid Work", "Work From Home", "Internship"];

function Jobs() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [maxSalary, setMaxSalary] = useState(searchParams.get("maxSalary") || "300000");

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${apiUrl}/jobs`, {
          params: Object.fromEntries(searchParams.entries()),
        });
        setJobs(response.data.data || []);
      } catch (requestError) {
        setError("ไม่สามารถโหลดข้อมูลงานได้ กรุณาลองใหม่อีกครั้ง");
        setJobs([]);
        console.error(requestError);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [apiUrl, searchParams]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearchParams({ keyword, location, type, maxSalary });
  };

  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#315678]">WorkBoard Jobs</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">ค้นหางาน</h1>
          <p className="mt-2 text-slate-600">พบงานที่ตรงกับความสนใจของคุณจากบริษัทในระบบ</p>
        </div>

        <form onSubmit={submitSearch} className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-4">
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="ตำแหน่งงาน หรือ บริษัท" className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
          <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="สถานที่" className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
          <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">ทุกประเภทงาน</option>
            {jobTypes.slice(1).map((jobType) => <option key={jobType} value={jobType}>{jobType}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-[#315678] px-4 py-2 font-semibold text-white hover:bg-[#2b4a68]">ค้นหางาน</button>
          <label className="text-sm text-slate-600 md:col-span-4">
            เงินเดือนสูงสุดที่ต้องการ: {Number(maxSalary).toLocaleString()} บาท
            <input type="range" min="50000" max="300000" step="5000" value={maxSalary} onChange={(event) => setMaxSalary(event.target.value)} className="mt-2 w-full accent-[#315678]" />
          </label>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">งานที่เปิดรับ ({jobs.length})</h2>
          <Link to="/home-page#search" className="text-sm font-medium text-[#315678] hover:underline">แก้ไขการค้นหา</Link>
        </div>
        {loading && <p className="py-12 text-center text-slate-500">กำลังโหลดงาน...</p>}
        {error && <p className="py-12 text-center text-red-600">{error}</p>}
        {!loading && !error && jobs.length === 0 && <p className="py-12 text-center text-slate-500">ไม่พบงานที่ตรงกับการค้นหา</p>}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="flex flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
              <span className="w-fit rounded-full bg-[#E6EEFF] px-3 py-1 text-xs font-semibold text-[#315678]">{job.type_work}</span>
              <h3 className="mt-3 text-lg font-bold text-[#1A2E5A]">{job.title}</h3>
              <p className="mt-1 font-medium text-slate-700">{job.company}</p>
              <p className="mt-3 text-sm text-slate-500">{job.location || "ไม่ระบุสถานที่"}</p>
              <p className="mt-2 text-sm text-slate-700">เงินเดือน {job.min_salary?.toLocaleString() || "-"} - {job.max_salary?.toLocaleString() || "-"} บาท</p>
              <p className="mt-3 line-clamp-3 text-sm text-slate-600">{job.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Jobs;
