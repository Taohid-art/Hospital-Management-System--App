"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DoctorsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    specialization: "",
    status: "",
    gender: "",
  });

  // ✅ Check admin status from backend
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true, // send cookies
        });
        setIsAdmin(res.data.admin);
        console.log("User info:", res.data.user);
      } catch {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  // ✅ Fetch doctors
  const fetchDoctors = async () => {
    const query = new URLSearchParams(filter).toString();
    const res = await axios.get(`http://localhost:5000/doctors?${query}`, {
      withCredentials: true, // important if doctors API also requires auth
    });
    setDoctors(res.data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDoctors();
    }, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [filter]);

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
   <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
  <h1 className="text-center text-4xl md:text-5xl text-[#102D47] font-bold mb-10">
    Meet Our Doctors
  </h1>

  {/* Filters */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
    <input
      type="text"
      name="name"
      value={filter.name}
      onChange={handleChange}
      placeholder="Search by name"
      className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
    />

    <select
      name="specialization"
      value={filter.specialization}
      onChange={handleChange}
      className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
    >
      <option value="">All Specializations</option>
      <option value="Cardiology">Cardiology</option>
      <option value="Emergency">Emergency</option>
      <option value="General Medicine">General Medicine</option>
      <option value="Neurology">Neurology</option>
      <option value="Orthopedics">Orthopedics</option>
      <option value="Pediatrics">Pediatrics</option>
      <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
      <option value="Radiology">Radiology</option>
      <option value="ICU (Intensive Care)">ICU (Intensive Care)</option>
      <option value="Pathology & Lab">Pathology & Lab</option>
    </select>

    <select
      name="status"
      value={filter.status}
      onChange={handleChange}
      className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
    >
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="On Leave">On Leave</option>
      <option value="Retired">Retired</option>
    </select>

    <select
      name="gender"
      value={filter.gender}
      onChange={handleChange}
      className="p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
    >
      <option value="">All Genders</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    {isAdmin && (
      <Link
        href="/doctors/add"
        className="bg-blue-600 text-white p-3 rounded-lg text-center hover:bg-blue-700 transition-colors font-medium"
      >
        Add Doctor
      </Link>
    )}
  </div>

  {/* Doctor Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
  {doctors.length > 0 ? (
    doctors.map((doctor) => (
      <motion.div
        key={doctor.doctor_id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href={`/doctors/${doctor.doctor_id}`}>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-4 flex flex-col items-center text-center overflow-hidden">
            <div className="w-48 h-48 mb-4 flex-shrink-0">
              <Image
                width={192}
                height={192}
                src={`http://localhost:5000/images/${doctor.profile_image}`}
                alt={`${doctor.first_name} ${doctor.last_name}`}
                className="rounded-full object-cover w-full h-full border-2 border-blue-200"
              />
            </div>

            <h2 className="text-xl font-semibold text-[#102D47] group-hover:text-white truncate">
              Dr. {doctor.first_name} {doctor.last_name}
            </h2>
            <p className="text-blue-600 font-medium truncate">{doctor.specialization}</p>

            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600 group-hover:text-white">
              <span>Experience: {doctor.years_of_experience} yrs</span>
              <span>Gender: {doctor.gender}</span>
              <span>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    doctor.status === "Active"
                      ? "text-green-500"
                      : doctor.status === "On Leave"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {doctor.status}
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    ))
  ) : (
    <p className="text-center text-gray-600 text-lg col-span-full">
      No doctors found
    </p>
  )}
</div>

</div>

  );
}
