'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect, use } from 'react'
import DeleteButton from '@/components/Buttons/DeleteButton';
import Link from 'next/link';

const page = ({params}) => {
  const [doctor, setDoctor] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctor data
        const doctorRes = await axios.get(`http://localhost:5000/doctors/${id}`);
        setDoctor(doctorRes.data);
        
        // Check admin status
        const authRes = await axios.get('http://localhost:5000/auth/me', {
          withCredentials: true,
        });
        setIsAdmin(authRes.data.admin || false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
        <div className="text-2xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
        <div className="text-2xl text-red-600">Doctor not found</div>
      </div>
    );
  }

 
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center p-2">
          <Image
            width={256}
            height={144}
            src={ `http://localhost:5000/images/${doctor.profile_image}`}
            alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
            className="rounded-xl w-full h-auto object-cover shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="md:w-2/3 p-8 text-gray-800">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Dr. {doctor.first_name} {doctor.last_name}
          </h1>
          <p className="text-lg font-medium text-blue-600 mb-4">{doctor.specialization}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>Status:</strong> {doctor.status}</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Experience:</strong> {doctor.years_of_experience} years</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Available Days:</strong> {doctor.available_days}</p>
            <p><strong>Available Time:</strong> {doctor.available_time_from} - {doctor.available_time_to}</p>
            <p><strong>Department ID:</strong> {doctor.department_id}</p>
           
          </div> 
           {isAdmin && (
            <div className='flex justify-between mt-4 align-center'>
              <DeleteButton href={`/doctors/${doctor.doctor_id}`} location={'/doctors'} item={'Doctor'} />
              <Link href={`/doctors/${doctor.doctor_id}/updatee`} className='mt-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors duration-300'>Update</Link>
            </div>
           )} 
        </div>
      </div>
    </main>
  );

}

export default page