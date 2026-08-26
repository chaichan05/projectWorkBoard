import React, { useState } from "react";
import Header from "../components/Header";

const Dashboard = () => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date: "",
    phone: "",
    address: "",
    position: "",
    salary: "",
    type_work: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // เพิ่มข้อมูลจาก formValues ลงใน formData
    if (file) formData.append("imageResume", file);
    formData.append("first_name", formValues.first_name);
    formData.append("last_name", formValues.last_name);
    formData.append("email", formValues.email);
    formData.append("gender", formValues.gender);
    formData.append("date", formValues.date);
    formData.append("phone", formValues.phone);
    formData.append("address", formValues.address);
    formData.append("position", formValues.position);
    formData.append("salary", formValues.salary);
    formData.append("type_work", formValues.type_work);

    try {
      const response = await fetch("http://localhost:8000/resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("result:", data);
    } catch (error) {
      console.log(error);
    }
    setFormValues({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      date: "",
      phone: "",
      address: "",
      position: "",
      salary: "",
      type_work: "",
    });
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-[#EEF1F2]">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Dashboard</h1>
      <form onSubmit={handleSumit} encType="multipart/form-data" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="First Name"
              name="first_name"
              value={formValues.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Last Name"
              name="last_name"
              value={formValues.last_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Phone Number"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Position</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Position"
              name="position"
              value={formValues.position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Salary</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Salary"
              name="salary"
              value={formValues.salary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type of Work</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Type of Work"
              name="TypeWork"
              value={formValues.TypeWork}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              name="imageResume"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full max-w-full border border-black rounded-md p-2 cursor-pointer"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-md bg-green-500 px-5 py-2 text-white cursor-pointer"
        >
          บันทึกข้อมูล
        </button>
      </form>
      </main>
    </div>
  );
};

export default Dashboard;
