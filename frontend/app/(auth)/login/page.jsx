'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/login',
        loginData,
        {
          withCredentials: true, // allow cookies from backend
        }
      );

      if (res.status === 200) {
        alert('Login successful!');
        window.location.href = '/'; // Redirect to dashboard or home page
      }
    } catch (err) {
      alert('Login failed . Inccorect email and password.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your HealthPoint account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <Link href="/register" className="text-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Sign Up
              </Link>
              <Link href="/forgot-password" className="text-center p-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Forgot?
              </Link>
              <Link href="/admin-login" className="text-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
