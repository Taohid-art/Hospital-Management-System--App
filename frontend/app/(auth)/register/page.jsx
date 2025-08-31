"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientRegister = () => {
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
    registered_date: "",
    status: "Active",
    password: "",
  });

  // Set today's date on client side to prevent hydration mismatch
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setPatientData(prev => ({ ...prev, registered_date: today }));
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold gradient-text mb-2">Patient Registration</h2>
            <p className="text-gray-600">Join HealthPoint for better healthcare management</p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter first name"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter last name"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
              <select
                name="blood_group"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
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
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.phone}
                onChange={handleChange}
                required
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                placeholder="Enter full address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 resize-none"
                rows={3}
                value={patientData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                onChange={handleChange}
              />
            </div>
            {/* Emergency Contact Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Name</label>
              <input
                type="text"
                name="emergency_contact_name"
                placeholder="Enter emergency contact name"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.emergency_contact_name}
                onChange={handleChange}
              />
            </div>
            
            {/* Emergency Contact Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Phone</label>
              <input
                type="tel"
                name="emergency_contact_phone"
                placeholder="Enter emergency contact phone"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.emergency_contact_phone}
                onChange={handleChange}
              />
            </div>
            
            {/* Insurance Provider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Provider</label>
              <input
                type="text"
                name="insurance_provider"
                placeholder="Enter insurance provider"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.insurance_provider}
                onChange={handleChange}
              />
            </div>
            
            {/* Insurance Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Number</label>
              <input
                type="text"
                name="insurance_number"
                placeholder="Enter insurance number"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                value={patientData.insurance_number}
                onChange={handleChange}
              />
            </div>
            {/* Submit */}
            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
