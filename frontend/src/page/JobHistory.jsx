import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";

function JobHistory() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${apiUrl}/jobs`)
      .then((response) => response.json())
      .then((result) => setJobs(result.data || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-[#EEF1F2]"><HeaderAdmin />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-sm font-medium text-[#315678]">Employer workspace</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">ประวัติการประกาศงาน</h1>
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[#D7E2ED] text-slate-700"><tr><th className="px-4 py-3">ตำแหน่งงาน</th><th className="px-4 py-3">บริษัท</th><th className="px-4 py-3">สถานที่</th><th className="px-4 py-3">สถานะ</th></tr></thead>
            <tbody>{loading ? <tr><td className="px-4 py-6" colSpan="4">กำลังโหลด...</td></tr> : jobs.map((job) => <tr key={job.id} className="border-t border-slate-100"><td className="px-4 py-3 font-medium">{job.title}</td><td className="px-4 py-3">{job.company || "-"}</td><td className="px-4 py-3">{job.location || "-"}</td><td className="px-4 py-3"><span className="rounded-full bg-green-100 px-3 py-1 text-green-700">เผยแพร่</span></td></tr>)}</tbody>
          </table>
          {!loading && jobs.length === 0 && <p className="p-6 text-slate-500">ยังไม่มีประกาศงาน</p>}
        </div>
      </main>
    </div>
  );
}

export default JobHistory;
