import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

const AdminDashBoard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <HeaderAdmin />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-sm font-medium text-[#315678]">Employer workspace</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">ยินดีต้อนรับ, {user?.name}</h1>
        <p className="mt-3 text-slate-600">จัดการประกาศงานของคุณได้จากที่นี่</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/add-company" className="inline-flex rounded-lg bg-[#315678] px-5 py-3 font-medium text-white hover:bg-[#2b4a68]">ลงประกาศงานใหม่</Link>
          <Link to="/applicant-history" className="inline-flex rounded-lg border border-[#315678] px-5 py-3 font-medium text-[#315678] hover:bg-white">ดูประวัติผู้สมัคร</Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashBoard;
