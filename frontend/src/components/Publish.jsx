import React from "react";
import company1 from "../assets/companies/company1.jpg";
import company2 from "../assets/companies/company2.jpg";
import company3 from "../assets/companies/company3.jpg";
import company4 from "../assets/companies/company4.jpg";
import company5 from "../assets/companies/company5.jpg";
import company6 from "../assets/companies/company6.png";
import preCompany1 from "../assets/premiumcompany/preCompany1.png";
import preCompany2 from "../assets/premiumcompany/preCompany2.png";
import preCompany3 from "../assets/premiumcompany/preCompany3.png";
import preCompany4 from "../assets/premiumcompany/preCompany4.png";
import preCompany5 from "../assets/premiumcompany/preCompany5.png";
import career1 from "../assets/career/career1.png";
import career2 from "../assets/career/career2.jpg";
import career3 from "../assets/career/career3.jpg";
import career4 from "../assets/career/career4.jpg";
import career5 from "../assets/career/career5.jpg";

const companies = [
  {
    image: company1,
    name: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จํากัด",
  },
  {
    image: company2,
    name: "บริษัท ปตท. จำกัด (มหาชน)",
  },
  {
    image: company3,
    name: "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส",
  },
  {
    image: company4,
    name: "บริษัท พีทีจี เอ็นเนอยี จํากัด (มหาชน)",
  },
  {
    image: company5,
    name: "บริษัท แพลน บี มีเดีย",
  },
  {
    image: company6,
    name: "บริษัท ซีพี แอ็กซ์ตร้า จํากัด (มหาชน)",
  },
];

const premiumCompany = [
  { image: preCompany1 },
  { image: preCompany2 },
  { image: preCompany3 },
  { image: preCompany4 },
  { image: preCompany5 },
];

const career = [
  {
    image: career1,
    name: "ออกเเบบ/เขียนเเบบ",
    description: "9562   ตำเเหน่งงาน",
    title:"ออกแบบ"
  },
  { image: career2, name: "วิศวกรรม", description: "9853  ตำเเหน่งงาน",title:"วิศวกรรม" },
  {
    image: career3,
    name: "ขนส่ง/คลังสินค้า",
    description: "1544  ตำเเหน่งงาน",
    title:"ขนส่ง/คลังสินค้า"
  },
  {
    image: career4,
    name: "การศึกษา/วิชาการ",
    description: "1563   ตำเเหน่งงาน",
    title:"การศึกษา/วิชาการ"
  },
  { image: career5, name: "สถาปนิก", description: "3054   ตำเเหน่งงาน" ,title:"สถาปนิก"},
];
function Publish() {
  return (
    <div>
      <h3 className="font-bold text-xl sm:text-[24px] px-4 sm:px-8 pt-8">
        บริษัทยอดเยี่ยมแห่งปี (Company of the Year)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-4 sm:px-8 py-8 ">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-[#0040A1] drop-shadow-lg w-full min-h-64 sm:min-h-80 hover:scale-105 transition-all duration-200"
          >
            <img
              key={index}
              src={company.image}
              alt={company.name}
              className="w-full h-40 sm:h-60 object-cover"
            />
            <p className="flex items-start p-2 mt-2 text-sm sm:text-base text-white font-bold break-words">
              {company.name}
            </p>
          </div>
        ))}
      </div>
      <h3 className="font-bold text-xl sm:text-[24px] px-4 sm:px-8 pt-8">
        หางานบริษัทชั้นนำ (Premium Company)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-8 py-8 ">
        {premiumCompany.map((company, index) => (
          <div
            key={index}
            className="w-full aspect-square drop-shadow-lg hover:scale-105 transition-all duration-200"
          >
            <img key={index} src={company.image} />
          </div>
        ))}
      </div>

      <h3 className="font-bold text-xl sm:text-[24px] px-4 sm:px-8 pt-8">
        งานตามสาขาอาชีพ (Hot Careers)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-8 py-8">
        {career.map((company, index) => (
          <div
            key={index}
            className="relative bg-[#0040A1] drop-shadow-lg w-full min-h-64 sm:min-h-80 hover:scale-105 transition-all duration-200"
          >
            {/* ป้ายด้านซ้าย */}
            <div className="absolute -left-3 top-4 bg-[#0040A1] text-white text-[16px] mt-30 font-medium px-3 py-1 rounded-r-lg">
              {company.title}
            </div>

            <img src={company.image} alt={company.name} className="w-full h-36 sm:h-50 object-cover" />

            <p className="ml-3 mt-2 text-white font-bold">{company.name}</p>

            <p className="ml-3 mt-2 text-[#DFDFDF] font-medium text-sm">
              {company.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publish;
