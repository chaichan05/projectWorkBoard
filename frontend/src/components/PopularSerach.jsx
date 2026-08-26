import React from 'react'
import sponser from '../assets/sponser.jpg'

function PopularSerach() {
  return (
    <div >
      <h3 className="font-bold text-xl sm:text-[24px] px-4 sm:px-8 pt-8" >POPULAR SEARCH</h3>
        <div className="flex flex-wrap gap-2 px-4 sm:px-8 mt-5">
          {[
            "Hybrid Work",
            "วิทยาศาสตร์",
            "UX/UI",
            "ภาษาจีน",
            "งานเงินเดือน 100K+",
            "หยุดเสาร์-อาทิตย์",
            "ล่าม/แปล",
            "AI Jobs",
            "จบใหม่",
            "Cyber Security",
            "IT",
            "สถาปนิก",
            "ง่านโรงแรม",
            "รับสมัครงานด่วน",
            "บัญชีเงินเดือน50K+",
          ].map((item) => (
            <div key={item} className="flex items-center justify-center font-medium w-fit border rounded-2xl min-h-9 px-4 bg-[#B9C8DA] mb-1 hover:bg-[#9cb4d1] hover:scale-105 transition-all duration-200">
              {item}
            </div>
          ))}
          
        </div>
           <div className='flex items-center justify-center mt-8 mx-4 sm:mx-8 min-h-48 sm:min-h-72 bg-[#C98F00] overflow-hidden'>
             <img src={sponser} alt="ผู้สนับสนุน" className='w-full max-w-5xl h-auto object-cover' />
          </div>
       
    </div>
  )
}

export default PopularSerach
