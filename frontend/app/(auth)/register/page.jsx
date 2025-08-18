"use client";
import React, { useState } from "react";
import axios from "axios";

const PatientRegister = () => {
  const today = new Date().toISOString().split("T")[0];

  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    phone: "",
    email: "",
    address: "",
    profile_image: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    insurance_provider: "",
    insurance_number: "",
    registered_date: today,
    status: "Active",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files.length > 0) {
      setPatientData({ ...patientData, profile_image: files[0] });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in patientData) {
        formData.append(key, patientData[key]);
      }

      const res = await axios.post("http://localhost:5000/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success
      alert("Patient registered successfully!");
      if (res.status === 201) {
        window.location.href = "/"; // redirect
      }
    } catch (err) {
  console.error("Error registering patient:", err);

  if (err.response && err.response.status === 400) {
    // Show the backend error message
    alert(err.response.data.error);
  } else {
    alert("Failed to register patient.");
  }
}

  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-2.5">
        {/* First Name */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={patientData.first_name}
          onChange={handleChange}
          required
        />
        {/* Last Name */}
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={patientData.last_name}
          onChange={handleChange}
          required
        />
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={patientData.email}
          onChange={handleChange}
          required
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={patientData.password}
          onChange={handleChange}
          required
        />
        {/* Blood Group */}
        <select
          name="blood_group"
          className="w-full p-2 border rounded"
          value={patientData.blood_group}
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={patientData.phone}
          onChange={handleChange}
          required
        />
        {/* Date of Birth */}
        <div className="flex items-center justify-center gap-0.5">
          <legend className="text-md text-gray-800">Birth:</legend>
          <input
            type="date"
            name="date_of_birth"
            className="w-full p-2 border rounded"
            value={patientData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        {/* Gender */}
        <select
          name="gender"
          className="w-full p-2 border rounded"
          value={patientData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          className="w-full col-span-2 p-2 border rounded"
          value={patientData.address}
          onChange={handleChange}
        ></textarea>
        {/* Profile Image */}
        <input
          type="file"
          name="profile_image"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        {/* Emergency Contact */}
        <input
          type="text"
          name="emergency_contact_name"
          placeholder="Emergency Contact Name"
          className="w-full p-2 border rounded"
          value={patientData.emergency_contact_name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="emergency_contact_phone"
          placeholder="Emergency Contact Phone"
          className="w-full p-2 border rounded"
          value={patientData.emergency_contact_phone}
          onChange={handleChange}
        />
        {/* Insurance */}
        <input
          type="text"
          name="insurance_provider"
          placeholder="Insurance Provider"
          className="w-full p-2 border rounded"
          value={patientData.insurance_provider}
          onChange={handleChange}
        />
        <input
          type="text"
          name="insurance_number"
          placeholder="Insurance Number"
          className="w-full p-2 border rounded"
          value={patientData.insurance_number}
          onChange={handleChange}
        />
        {/* Status */}
        <select
          name="status"
          className="w-full p-2 border rounded"
          value={patientData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {/* Submit */}
        <button
          type="submit"
          className="w-full grid-cols-2 col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register Patient
        </button>
      </form>
    </div>
  );
};

export default PatientRegister;
