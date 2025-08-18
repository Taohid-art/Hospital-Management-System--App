"use client";
import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files.length > 0) {
      setAdminData({ ...adminData, profile_image: files[0] });
    } else {
      setAdminData({ ...adminData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in adminData) {
        formData.append(key, adminData[key]);
      }

      const response = await axios.post("http://localhost:5000/register/admin-register", formData,   {
      withCredentials:true, headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Admin registered successfully!");
      setAdminData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        profile_image: null,
      });
      window.location.href = "/dashboard"; // redirect to  dashboard
    } catch (error) {
      console.error("Error registering admin:", error);
      alert(error.response?.data?.message || "Failed to register admin.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-2.5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded "
          value={adminData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={adminData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={adminData.first_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={adminData.last_name}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="profile_image"
          accept="image/*"
          className="w-full col-span-2 p-2 border rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
