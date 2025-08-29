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
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-4 flex items-center justify-around gap-2 text-blue-600">
        <Link href="/register" className="hover:underline">Sign Up</Link>
        <Link href="/forgot-password" className="hover:underline">Forgot Password?</Link>
        <Link href="/admin-login" className="hover:underline">Admin</Link>
      </div>
    </div>
  );
};

export default LoginPage;
