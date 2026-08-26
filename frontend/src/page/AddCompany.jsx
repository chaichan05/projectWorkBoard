import React from "react";
import { GoLightBulb } from "react-icons/go";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import axios from "axios";

function AddCompany() {
  const [jobData, setJobData] = React.useState({
    title: "",
    type_work: "ทุกประเภท",
    location: "",
    description: "",
    education: "",
    amount: "",
    min_salary: "",
    max_salary: "",
    welfare: "",
    contact: {
      name: "",
      company: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setJobData((prevData) => ({
        ...prevData,
        contact: { ...prevData.contact, [key]: value },
      }));
    } else {
      setJobData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/jobs", jobData);
      console.log("ข้อมูลถูกส่งไปยัง backend:", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
    setJobData({
      title: "",
      type_work: "เลือกประเภท",
      location: "",
      description: "",
      education: "",
      amount: "",
      min_salary: "",
      max_salary: "",
      welfare: "",
      contact: {
        name: "",
        company: "",
        address: "",
        phone: "",
        email: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <HeaderAdmin />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">ลงประกาศหางานใหม่</h1>
        <p className="text-gray-500 max-w-2xl text-sm">
          กรุณากรอกรายละเอียดด้านล่างเพื่อสร้างประกาศรับสมัครงานใหม่
        </p>
      </div>

      {/* ฝั่งซ้าย */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
            <div className="space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm ring-1 ring-gray-200">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  รายละเอียดพื้นฐาน
                </h1>

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่องาน
                    </label>
                    <input
                      name="title"
                      type="text"
                      placeholder="เช่น วิศวกรซอฟต์แวร์"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={jobData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ประเภท
                    </label>
                    <select
                      name="type_work"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={jobData.type_work}
                      onChange={handleChange}
                    >
                      <option>เลือกประเภท</option>
                      <option>ทุกประเภท</option>
                      <option>งานเต็มเวลา</option>
                      <option>งานพาร์ทไทม์</option>
                      <option>งานสัญญาจ้าง</option>
                      <option>งานชั่วคราว</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ตำแหน่ง
                    </label>
                    <input
                      name="location"
                      type="text"
                      placeholder="เช่น ซานฟรานซิสโก รัฐแคลิฟอร์เนีย"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={jobData.location}
                      onChange={handleChange}
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-5 mt-6">
                      รายละเอียดและข้อกำหนด
                    </h2>
                    <hr className="my-6 border-gray-200" />
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          รายละเอียดงาน
                        </label>
                        <textarea
                          rows="4"
                          placeholder="อธิบายบทบาท หน้าที่ และทีมงาน..."
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          name="description"
                          value={jobData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              การศึกษา
                            </label>
                            <textarea
                              rows="4"
                              placeholder="ระบุวุฒิการศึกษาและสาขาที่ต้องการ..."
                              className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="education"
                              value={jobData.education}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              จำนวนตำแหน่ง
                            </label>
                            <input
                              type="number"
                              placeholder="จำนวนตำแหน่ง"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="amount"
                              value={jobData.amount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              เงินเดือนขั้นต่ำ (บาท)
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="0"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="min_salary"
                              value={jobData.min_salary}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              เงินเดือนสูงสุด (บาท)
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="0"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="max_salary"
                              value={jobData.max_salary}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          สวัสดิการ
                        </label>
                        <textarea
                          rows="4"
                          placeholder="ระบุสวัสดิการและสิทธิประโยชน์..."
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          name="welfare"
                          value={jobData.welfare}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ชื่อผู้ติดต่อ
                          </label>
                          <input
                            type="text"
                            placeholder="ชื่อผู้ติดต่อ"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            name="contact.name"
                            value={jobData.contact.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            บริษัท
                          </label>
                          <input
                            type="text"
                            placeholder="ชื่อบริษัท"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            name="contact.company"
                            value={jobData.contact.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ที่อยู่
                          </label>
                          <input
                            type="text"
                            placeholder="ที่อยู่ติดต่อ"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            name="contact.address"
                            value={jobData.contact.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              เบอร์โทร
                            </label>
                            <input
                              type="text"
                              placeholder="เบอร์โทรศัพท์"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="contact.phone"
                              value={jobData.contact.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              อีเมล
                            </label>
                            <input
                              type="email"
                              placeholder="อีเมลติดต่อ"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              name="contact.email"
                              value={jobData.contact.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-6 border-gray-200" />

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        บันทึกแบบร่าง
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-lg bg-[#315678] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2b4a68]"
                      >
                        ลงประกาศ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ฝั่งขวา */}
            <div className="space-y-6">
              <div className="bg-[#E6EEFF] p-4 sm:p-6 rounded-2xl shadow-sm ring-1 ring-[#C2C7CF]">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  สถานะรายการ
                </h2>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#C2C7CF]" />
                  <div>
                    <div className="font-medium text-slate-900">แบบร่าง</div>
                    <p className="mt-1 text-sm text-slate-600">
                      ตำแหน่งงานของคุณจะไม่ปรากฏให้ผู้สมัครเห็นจนกว่าคุณจะกด
                      “เผยแพร่”
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#EFF4FF] p-4 sm:p-6 rounded-2xl shadow-sm ring-1 ring-[#A6CAF2]">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-9 w-9 rounded-2xl fo text-[#315678] flex items-center justify-center">
                    <span className="text-lg mb-5">
                      <GoLightBulb />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#315678] mb-2">
                      เคล็ดลับมือโปร
                    </h3>
                    <p className="text-sm text-slate-600">
                      ระบุตำแหน่งงานให้ชัดเจนเพื่อดึงดูดผู้สมัครที่เหมาะสม
                      หากเป็นไปได้ให้ประกาศชัดเจนเรื่องสวัสดิการและสิ่งที่เสนอเพื่อช่วยให้ผู้สมัครตัดสินใจได้ง่ายขึ้น
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default AddCompany;
