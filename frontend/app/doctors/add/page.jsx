"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
const AddDoctor = () => {
    const [doctordata, setdoctordata] = useState({
        first_name: "",
        last_name: "",
        gender: "Male",
        phone: "",
        email: "",
        department_id: "",
        profile_image: "",
        specialization: "Cardology",
        qualification: "",
        years_of_experience:"",
        available_days: "Monday",
        available_time_from: "",
        available_time_to: "",
        status: "Active",
    });
    const handleChange = (e) =>{
        
        setdoctordata({ ...doctordata,[e.target.name]:e.target.value})
        
    }
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        const fromdata = new FormData();
        for ( const key in doctordata){
          fromdata.append(key,doctordata[key]);

        }
        try{
      const res = await axios.post("http://localhost:5000/doctors/add",fromdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      
      
      if (res.status===200){
        router.push('/doctors')
      }
    }catch(err)
    {
        console.log(err);
        
    }
  }
    
    
  return (
    <div>
      <h1 className="text-center text-4xl md:text-5xl text-[#102D47] font-bold mt-4 mb-8">
        Add Doctor
      </h1>
      <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md " 
      onSubmit={submitHandler}
      >
        <div className=" grid grid-cols-2 gap-4">
          < input  required value={doctordata.first_name}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="text"
            placeholder="First Name"
            name="first_name"
          />
          < input  required value={doctordata.last_name}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="text"
            placeholder="last Name"
            name="last_name"
          />
          
          <select
          
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            name="gender"
             required value={doctordata.gender}
          >  <option value="" disabled>
    Select Gender
  </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          
        <select
        
          name="specialization"
          value={doctordata.specialization}
          onChange={handleChange}
           className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
        >
          
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>
          < input  required value={doctordata.phone}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="text"
            placeholder="Phone"
            name="phone"
          />
          < input  required value={doctordata.email}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="email"
            placeholder="Email"
            name="email"
          />
          < input  required value={doctordata.department_id}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="number"
            placeholder="Department ID"
            name="department_id"
          />
          < input  required 
            onChange={ (e)=> setdoctordata({...doctordata , profile_image:e.target.files[0]})}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="file"
            placeholder="Profile Image URL"
            name="profile_image"
          />
         
          < input  required value={doctordata.qualification}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="text"
            placeholder="Qualification"
            name="qualification"
          />
          < input  required 
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="number"
            value={doctordata.years_of_experience}
            placeholder="Years of Experience"
            name="years_of_experience"
          />
          < input  required value={doctordata.available_time_from}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="time"
            placeholder="Available Time From"
            name="available_time_from"
          />
          < input  required value={doctordata.available_time_to}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            type="time"
            placeholder="Available Time To"
            name="available_time_to"
          />
          <select
           required value={doctordata.available_days}
            onChange={handleChange}
            name="available_days"
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <select
           required value={doctordata.status}
            onChange={handleChange}
            className=" p-3 border rounded-lg shadow-sm focus:outline-blue-500 w-full;"
            name="status"
            id=""
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg text-center hover:bg-blue-700 transition-colors mt-4"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
