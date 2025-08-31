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
        setIsAdmin(res.data.admin || false);
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
   <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Meet Our Doctors
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Expert medical professionals dedicated to your health
          </p>
        </div>
      </section>

      <div className="py-16 px-6">

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Find Your Doctor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <input
                type="text"
                name="name"
                value={filter.name}
                onChange={handleChange}
                placeholder="Search by name"
                className="p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />

              <select
                name="specialization"
                value={filter.specialization}
                onChange={handleChange}
                className="p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
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
                className="p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
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
                className="p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {isAdmin && (
                <Link
                  href="/doctors/add"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Add Doctor
                </Link>
              )}
            </div>
          </div>
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
                  <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden border border-white/20">
                    <div className="w-32 h-32 mb-6 flex-shrink-0">
                      <Image
                        width={128}
                        height={128}
                        src={`http://localhost:5000/images/${doctor.profile_image}`}
                        alt={`${doctor.first_name} ${doctor.last_name}`}
                        className="rounded-full object-cover w-full h-full border-4 border-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                      />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 mb-2">
                      Dr. {doctor.first_name} {doctor.last_name}
                    </h2>
                    <p className="text-indigo-600 font-semibold mb-4">{doctor.specialization}</p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium">Experience:</span>
                        <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-700">{doctor.years_of_experience} yrs</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium">Gender:</span>
                        <span className="bg-purple-100 px-2 py-1 rounded-full text-purple-700">{doctor.gender}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`px-2 py-1 rounded-full font-semibold ${
                            doctor.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : doctor.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {doctor.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">👨⚕️</div>
              <p className="text-2xl text-gray-600 font-semibold">No doctors found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
