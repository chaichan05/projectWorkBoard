import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";

function ApplicantHistory() {
  const [applicants, setApplicants] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${apiUrl}/dashboard`).then((response) => response.json()).then((result) => setApplicants(result.data || [])).catch(() => setApplicants([]));
  }, [apiUrl]);

  return <div className="min-h-screen bg-[#EEF1F2]"><HeaderAdmin /><main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12"><p className="text-sm font-medium text-[#315678]">Employer workspace</p><h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">ประวัติผู้สมัคร</h1><div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#D7E2ED]"><tr><th className="px-4 py-3">ชื่อ</th><th className="px-4 py-3">อีเมล</th><th className="px-4 py-3">ตำแหน่งที่สนใจ</th><th className="px-4 py-3">ประเภทงาน</th></tr></thead><tbody>{applicants.map((applicant) => <tr key={applicant.id} className="border-t border-slate-100"><td className="px-4 py-3 font-medium">{applicant.first_name} {applicant.last_name}</td><td className="px-4 py-3">{applicant.email}</td><td className="px-4 py-3">{applicant.position || "-"}</td><td className="px-4 py-3">{applicant.type_work || "-"}</td></tr>)}</tbody></table>{applicants.length === 0 && <p className="p-6 text-slate-500">ยังไม่มีข้อมูลผู้สมัคร</p>}</div></main></div>;
}

export default ApplicantHistory;
