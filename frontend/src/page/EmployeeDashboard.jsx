import { Link } from "react-router-dom";
import Header from "../components/Header";

function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900">ข้อมูลผู้สมัครงาน</h1>
        <p className="mt-3 text-slate-600">กรอกข้อมูลและอัปโหลดเรซูเม่เพื่อเริ่มสมัครงาน</p>
        <Link to="/dashboard" className="mt-7 inline-flex rounded-lg bg-[#315678] px-5 py-3 font-medium text-white hover:bg-[#2b4a68]">กรอกโปรไฟล์ผู้สมัคร</Link>
      </main>
    </div>
  )
}

export default EmployeeDashboard
