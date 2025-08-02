'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AddDepartment = () => {
  const depNames = [
    { name: 'Emergency', id: 1 },
    { name: 'Cardiology', id: 2 },
    { name: 'General Medicine', id: 3 },
    { name: 'Neurology', id: 4 },
    { name: 'Orthopedics', id: 5 },
    { name: 'Pediatrics', id: 6 },
    { name: 'Gynecology & Obstetrics', id: 7 },
    { name: 'Radiology', id: 8 },
    { name: 'ICU (Intensive Care)', id: 9 },
    { name: 'Pathology & Lab', id: 10 },
  ];

  const [doctors, setDoctors] = useState([]);

  const [depData, setDepData] = useState({
    department_id: '',
    department_name: '',
    head_doctor_id: '',
    contact_number: '',
    location: ''
  });

  const fetchDoctors = async () => {
    const res = await axios.get('http://localhost:5000/doctors/');
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'department_name') {
      const selectedDep = depNames.find(dep => dep.name === value);
      console.log('selectedDep:', selectedDep);
      
      setDepData(prev => ({
        ...prev,
        department_name: value,
        department_id: selectedDep?.id || ''
      }));
    } else {
      setDepData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    log('Submitting department data:', depData);
    try {
      const res = await axios.post('http://localhost:5000/dashboard/department', depData);
      console.log(res);
      
      alert('Department added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding department');
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 text-center mt-5 text-blue-500'>Add Department</h1>
      <form className='bg-white p-6 rounded shadow-md' onSubmit={handleSubmit}>
        <div className='mb-4 grid grid-cols-2 gap-5'>
          
          {/* Department Name Select */}
          <div className='flex justify-start items-center gap-3'>
            <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="department_name">Department Name :</label>
            <select
              name="department_name"
              id="department_name"
              value={depData.department_name}
              onChange={handleChange}
              className="py-2 px-3 rounded-lg border shadow-sm w-80"
              required
            >
              <option value="">Select Department</option>
              {depNames.map((ele) => (
                <option key={ele.id} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>
          </div>

          {/* Head Doctor Select */}
          <div className='flex justify-start items-center gap-3'>
            <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="head_doctor_id">Head Doctor:</label>
            <select
              name="head_doctor_id"
              id="head_doctor_id"
              value={depData.head_doctor_id}
              onChange={handleChange}
              className="py-2 px-5 rounded-lg border shadow-sm w-90"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((ele) => (
                <option key={ele.doctor_id} value={ele.doctor_id}>
                  Dr. {ele.first_name} {ele.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contact_number'>Contact Number</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='contact_number'
              name='contact_number'
              placeholder='Enter Contact Number'
              value={depData.contact_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>Location</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='location'
              name='location'
              placeholder='2nd Floor - Block B'
              value={depData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          type="submit"
          value="Add Department"
          className="w-full bg-blue-600 text-white p-2 rounded-lg text-center hover:bg-blue-700 transition-colors mt-4"
        />
      </form>
    </div>
  );
};

export default AddDepartment;
