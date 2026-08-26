import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await axios.get(`${apiUrl}/jobs/${id}`);
        setJob(response.data.data);
      } catch (requestError) {
        setError("ไม่พบรายละเอียดประกาศงานนี้");
        console.error(requestError);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [apiUrl, id]);

  if (loading) return <div className="min-h-screen bg-[#EEF1F2]"><Header /><p className="py-20 text-center text-slate-500">กำลังโหลดรายละเอียดงาน...</p></div>;
  if (error || !job) return <div className="min-h-screen bg-[#EEF1F2]"><Header /><main className="mx-auto max-w-4xl px-4 py-20 text-center"><p className="text-red-600">{error}</p><Link to="/jobs" className="mt-5 inline-block text-[#315678] hover:underline">กลับไปค้นหางาน</Link></main></div>;

  const applyPath = user ? "/dashboard" : "/login-client";
  const salary = `${job.min_salary?.toLocaleString() || "ไม่ระบุ"} - ${job.max_salary?.toLocaleString() || "ไม่ระบุ"} บาท`;

  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <button type="button" onClick={() => navigate(-1)} className="mb-5 text-sm font-medium text-[#315678] hover:underline">← กลับไปหน้าผลการค้นหา</button>
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex min-h-40 items-center justify-center bg-[#D7E2ED] px-6 py-10 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#315678]">ประกาศรับสมัครงาน</p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">{job.title}</h1>
              <p className="mt-2 text-slate-600">{job.company}</p>
            </div>
          </div>
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-[#E6EEFF] px-3 py-1 font-semibold text-[#315678]">{job.type_work}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{job.location || "ไม่ระบุสถานที่"}</span>
              </div>
              <div className="mt-6 grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-3">
                <div><p className="text-xs text-slate-500">เงินเดือน</p><p className="mt-1 font-semibold text-slate-800">{salary}</p></div>
                <div><p className="text-xs text-slate-500">จำนวนที่รับ</p><p className="mt-1 font-semibold text-slate-800">{job.amount || "ไม่ระบุ"} อัตรา</p></div>
                <div><p className="text-xs text-slate-500">วันที่ประกาศ</p><p className="mt-1 font-semibold text-slate-800">{new Date(job.post_date).toLocaleDateString("th-TH")}</p></div>
              </div>
              <DetailSection title="รายละเอียดงาน" value={job.description} />
              <DetailSection title="คุณสมบัติและการศึกษา" value={job.education} />
              <DetailSection title="สวัสดิการ" value={job.welfare} />
              <div className="mt-7 border-t border-slate-200 pt-6">
                <h2 className="text-lg font-bold text-slate-900">สถานที่ทำงาน</h2>
                <div className="mt-3 flex min-h-28 items-center justify-center rounded-lg bg-[#D7E2ED] p-4 text-center text-slate-700">{job.contact_address || job.location || "ไม่ระบุสถานที่"}</div>
              </div>
            </div>
            <aside className="h-fit rounded-xl bg-[#EFF4FF] p-5 ring-1 ring-[#C2C7CF] lg:sticky lg:top-24">
              <h2 className="font-bold text-slate-900">สนใจตำแหน่งนี้?</h2>
              <p className="mt-2 text-sm text-slate-600">สมัครงานเพื่อส่งข้อมูลโปรไฟล์ให้บริษัทพิจารณา</p>
              <Link to={applyPath} className="mt-5 block rounded-lg bg-[#315678] px-4 py-3 text-center font-semibold text-white hover:bg-[#2b4a68]">สมัครงาน</Link>
              <div className="mt-6 border-t border-[#C2C7CF] pt-5 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">ข้อมูลติดต่อ</p>
                <p className="mt-2">{job.contact_name || "ไม่ระบุชื่อผู้ติดต่อ"}</p>
                <p>{job.contact_phone || "ไม่ระบุเบอร์โทร"}</p>
                <p className="break-words">{job.contact_email || "ไม่ระบุอีเมล"}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function DetailSection({ title, value }) {
  return (
    <section className="mt-7">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{value || "ไม่ระบุข้อมูล"}</p>
    </section>
  );
}

export default JobDetail;
