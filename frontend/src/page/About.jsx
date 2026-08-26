import Header from "../components/Header";

function About() {
  return (
    <div className="min-h-screen bg-[#EEF1F2]"><Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
        <p className="text-sm font-medium text-[#315678]">WorkBoard</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">เกี่ยวกับเรา</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">แพลตฟอร์มหางานที่ช่วยให้ผู้สมัครค้นพบโอกาสที่เหมาะสม และช่วยให้องค์กรค้นหาคนที่ใช่ได้ง่ายขึ้น</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-white p-5 shadow-sm"><b>ค้นหาง่าย</b><p className="mt-2 text-sm text-slate-500">ค้นหางานตามตำแหน่ง บริษัท และสถานที่</p></div><div className="rounded-xl bg-white p-5 shadow-sm"><b>ข้อมูลครบ</b><p className="mt-2 text-sm text-slate-500">รายละเอียดงานและสวัสดิการอยู่ในที่เดียว</p></div><div className="rounded-xl bg-white p-5 shadow-sm"><b>เชื่อมต่อเร็ว</b><p className="mt-2 text-sm text-slate-500">สร้างโปรไฟล์และเริ่มสมัครงานได้ทันที</p></div></div>
      </main>
    </div>
  );
}

export default About;
