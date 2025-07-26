import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import doctorimage from '@/public/images/Rectangle 401.png'
import DeleteButton from '@/components/Buttons/DeleteButton';
const page = async ({params}) => {
 
  const { id } = params;
  const res = await axios.get(`http://localhost:5000/doctors/${id}`);
  
    const doctor = res.data;
    
  const admin = true; // Assuming admin is true for this example, replace with actual admin check

 
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center p-2">
          <Image
            src={doctorimage}
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
          <div className='flex justify-between mt-4 aling-center '>
           { admin &&
            <DeleteButton href={`/doctors/${doctor.doctor_id}`} />
           } 
            </div>
        </div>
      </div>
    </main>
  );

}

export default page