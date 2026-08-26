import { Link } from "react-router-dom";
import Header from "../components/Header";

function ForgotPassword() {
  return <div className="min-h-screen bg-[#EEF1F2]"><Header /><main className="mx-auto max-w-md px-4 py-12 sm:py-20"><div className="rounded-xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-200"><h1 className="text-2xl font-bold text-[#1A2E5A]">ลืมรหัสผ่าน</h1><p className="mt-3 text-slate-600">กรุณาติดต่อทีมงานเพื่อขอรีเซ็ตรหัสผ่านของคุณ</p><a href="mailto:support@workboard.local" className="mt-6 inline-flex w-full justify-center rounded-lg bg-[#315678] px-4 py-3 font-medium text-white">ติดต่อทีมงาน</a><Link to="/login-client" className="mt-3 inline-flex w-full justify-center rounded-lg border border-slate-300 px-4 py-3 text-slate-700">กลับหน้าเข้าสู่ระบบ</Link></div></main></div>;
}

export default ForgotPassword;
