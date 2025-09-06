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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20 animate-fadeInUp">
          {/* Admin Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
              <span className="text-2xl text-white">🔒</span>
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-2">Admin Portal</h2>
            <p className="text-gray-600">Secure administrative access</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-center font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/70"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter admin password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/70"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500 text-sm">Admin Options</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <a href="/admin/forgot-password" className="text-center p-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Forgot Password?
              </a>
              <a href="/admin-register" className="text-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Register Admin
              </a>
            </div>
            
            {/* Back to User Login */}
            <div className="text-center pt-4">
              <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                ← Back to User Login
              </a>
            </div>
          </div>
          
          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⚠️</span>
              <p className="text-sm text-yellow-800 font-medium">
                This is a secure admin area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
