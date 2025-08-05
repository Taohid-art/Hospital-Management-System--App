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
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#doctor-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'department_name') {
      const selectedDep = depNames.find(dep => dep.name === value);
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
    try {
      const res = await axios.post('http://localhost:5000/dashboard/department', depData);
      alert('Department added successfully');
      if (res.status === 201) {
        setDepData({
          department_id: '',
          department_name: '',
          head_doctor_id: '',
          contact_number: '',
          location: ''
        });
        setShowDropdown(false);
        window.location.href = '/dashboard/department'; // Redirect to the department page after successful addition
      }
    } catch (error) {
      alert(`Error: you are adding a department with the same name`);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 text-center mt-5 text-blue-500'>Add Department</h1>
      <form className='bg-white p-6 rounded shadow-md' onSubmit={handleSubmit}>
        <div className='mb-4 grid grid-cols-2 gap-5'>

          {/* Department Name Select */}
          <div className='flex justify-start items-center gap-3'>
            <label className='block text-gray-700 text-md font-bold mb-2 mt-2' htmlFor="department_name">Department Name :</label>
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

          {/* Head Doctor Custom Dropdown */}
          <div className='flex justify-start items-center gap-3 relative' id="doctor-dropdown">
            <label className="block text-gray-700 text-md font-bold mb-2 mt-2" htmlFor="head_doctor_id">
              Head Doctor:
            </label>
            <button
              type="button"
              className="flex items-center justify-between py-2 px-4 w-90 border rounded-lg shadow-sm bg-white"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              {depData.head_doctor_id ? (() => {
                const selectedDoc = doctors.find(doc => doc.doctor_id === parseInt(depData.head_doctor_id));
                return selectedDoc ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={`http://localhost:5000/images/${selectedDoc.profile_image}`}
                      alt={selectedDoc.first_name}
                      width={25}
                      height={25}
                      className="rounded-full object-cover"
                    />
                    <span>Dr. {selectedDoc.first_name} {selectedDoc.last_name}</span>
                  </div>
                ) : <span>Select Doctor</span>;
              })() : <span>Select Doctor</span>}
              <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20"><path d="M5.5 7l4.5 4.5L14.5 7" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </button>

            {showDropdown && (
              <ul className="absolute z-10 mt-2 w-80 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
                {doctors.map((ele) => (
                  <li
                    key={ele.doctor_id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2"
                    onClick={() => {
                      setDepData(prev => ({
                        ...prev,
                        head_doctor_id: ele.doctor_id
                      }));
                      setShowDropdown(false);
                    }}
                  >
                    <Image
                      src={`http://localhost:5000/images/${ele.profile_image}`}
                      alt={ele.first_name}
                      width={25}
                      height={25}
                      className="rounded-full object-cover"
                    />
                    <span>
                      Dr. {ele.first_name} {ele.last_name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
