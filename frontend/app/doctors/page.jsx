'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import doctorimage from '@/public/images/Rectangle 401.png';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function DoctorsPage() {
  const admin = true
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    specialization: '',
    status: '',
    gender: '',
  });

  const fetchDoctors = async () => {
    const query = new URLSearchParams(filter).toString();
    const res = await axios.get(`http://localhost:5000/doctors?${query}`);
    setDoctors(res.data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDoctors();
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [filter]);

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <h1 className="text-center text-4xl md:text-5xl text-[#102D47] font-bold mb-8">
        Meet Our Doctors
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
        <input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleChange}
          placeholder="Search by name"
          className="p-2 rounded-lg border shadow-sm"
        />

        <select
          name="specialization"
          value={filter.specialization}
          onChange={handleChange}
          className="p-2 rounded-lg border shadow-sm"
        >
          <option value="">All Specializations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>

        <select
          name="status"
          value={filter.status}
          onChange={handleChange}
          className="p-2 rounded-lg border shadow-sm"
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
          className="p-2 rounded-lg border shadow-sm"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        { admin && <Link href="/doctors/add" className="bg-blue-600 text-white p-2 rounded-lg text-center hover:bg-blue-700 transition-colors">
          Add Doctor
        </Link> }  
     
      </div>

      {/* Doctor Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <motion.div
              key={doctor.doctor_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/doctors/${doctor.doctor_id}`}>
                <div className="bg-white hover:bg-blue-500 text-black hover:text-white w-64 h-full p-2 rounded-xl shadow-lg transition-all duration-300 group">
                  <Image
                    src={doctorimage}
                    alt="doctor"
                    className="rounded-lg h-52 w-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold text-blue-600 group-hover:text-white">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h2>
                  <p>{doctor.specialization}</p>
                  <p className="text-sm">Experience: {doctor.years_of_experience} years</p>
                  <p className="text-sm">Gender: {doctor.gender}</p>
                  <p className="text-sm">Status: {doctor.status}</p>
                  
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No doctors found</p>
        )}
      </div>
    </div>
  );
}
