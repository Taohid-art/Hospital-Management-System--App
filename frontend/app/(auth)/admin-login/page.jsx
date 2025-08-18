'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const response = await axios.post(
      'http://localhost:5000/login/admin-login',
      formData,
      {
        withCredentials: true, // ✅ important for cookies
      }
    );

    // No need to store token in localStorage if using cookies
    if (response.data.message === 'Admin login successful') {
      window.location.href='/dashboard' // redirect
    } else {
      setError('Login failed. Please try again.');
    }
  } catch (err) {
    setError(err.response?.data?.error || 'Login failed. Please try again.');
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded focus:outline-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <a href="/admin/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
        <br />
        <a href="/admin-register" className="text-blue-600 hover:underline">
          Sign Up as Admin
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
