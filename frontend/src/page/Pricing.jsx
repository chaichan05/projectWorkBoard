import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

function Pricing() {
  return (
    <div className="min-h-screen bg-[#EEF1F2]"><HeaderAdmin />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <h1 className="text-3xl font-bold text-slate-900">อัตราโฆษณา</h1>
        <p className="mt-3 text-slate-600">เลือกแพ็กเกจที่เหมาะกับการประกาศงานของคุณ</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{[["เริ่มต้น", "ฟรี", "ประกาศงาน 1 ตำแหน่ง"], ["มาตรฐาน", "฿990", "ประกาศงาน 10 ตำแหน่ง"], ["องค์กร", "฿2,990", "ประกาศงานไม่จำกัด"]].map(([name, price, detail]) => <div key={name} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-xl font-bold">{name}</h2><p className="mt-4 text-3xl font-bold text-[#315678]">{price}</p><p className="mt-3 text-slate-600">{detail}</p><Link to="/add-company" className="mt-6 inline-flex rounded-lg bg-[#315678] px-4 py-2 text-white">เริ่มประกาศงาน</Link></div>)}</div>
      </main>
    </div>
  );
}

export default Pricing;
