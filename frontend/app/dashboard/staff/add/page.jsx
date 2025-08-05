'use client';
import React, { useState } from 'react';
import axios from 'axios';
 import { useRouter } from 'next/navigation';
const Page = () => {
  const [staffData, setStaffData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    role: '',
    phone: '',
    email: '',
    department_id: '',
    hire_date: '',
    salary: '',
    shift: '',
    status: 'Active',
    profile_image: null, // File object or null
  });
const router = useRouter(
 
)
  // generic handler that supports file inputs
  const handleChange = (e) => {
   

    const {name , value,type ,files} = e.target;
    if(type==='file'){
      setStaffData((prev)=>({...prev,[name]:files?.[0] || null}));
    }
      else{
        setStaffData((prev)=>({...prev,[name]:value}));
      }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare FormData if there is a file
    const formData = new FormData();
    for (const key in staffData) {
      if (staffData.hasOwnProperty(key)) {
        if (key === 'profile_image') {
          if (staffData.profile_image) formData.append(key, staffData.profile_image);
        } else {
          formData.append(key, staffData[key]);
        }
      }
    }

    try {
      // example API call (adjust URL and headers on backend)
      const res = await axios.post('http://localhost:5000/dashboard/staff/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.status === 200) {
       router.push('/dashboard/staff'); 
      }
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Staff</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={staffData.first_name}
            onChange={handleChange}
            placeholder="First name"
            className="p-2 border rounded"
            required
          />
          <input
            name="last_name"
            value={staffData.last_name}
            onChange={handleChange}
            placeholder="Last name"
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <select name="gender" value={staffData.gender} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select name="role" value={staffData.role} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select role</option>
            <option value="Nurse">Nurse</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Admin">Admin</option>
            <option value="Accountant">Accountant</option>
          </select>

          <input name="phone" value={staffData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
        </div>

        <input name="email" value={staffData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />

        <div className="grid grid-cols-3 gap-4">
          <input name="department_id" value={staffData.department_id} onChange={handleChange} placeholder="Department ID" type="number" className="p-2 border rounded" />
          <input name="hire_date" value={staffData.hire_date} onChange={handleChange} placeholder="Hire date" type="date" className="p-2 border rounded" />
          <input name="salary" value={staffData.salary} onChange={handleChange} placeholder="Salary" type="number" step="0.01" className="p-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="shift" value={staffData.shift} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select shift</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Rotational">Rotational</option>
          </select>

          <select name="status" value={staffData.status} onChange={handleChange} className="p-2 border rounded">
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile image</label>
          <input name="profile_image" onChange={handleChange} type="file" accept="image/*" className="p-1" />
          {staffData.profile_image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(staffData.profile_image)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Save Staff</button>
      </form>
    </div>
  );
};

export default Page;
