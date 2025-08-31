'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/images/vector.png';
import Link from 'next/link';
import axios from 'axios';
import LogOutButton from './Buttons/LogOutButton';

const Nav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check admin status from backend
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true,
        });
        setIsAdmin(res.data.admin || false);
        setToken(true);
      } catch {
        setIsAdmin(false);
        setToken(false);
      }
    };
    checkAuth();
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

 
  return (
    <header className="h-20 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-8 shadow-lg">
      <div className="logo flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
          <Image src={logo} alt="Logo" width={24} height={24} className="filter brightness-0 invert" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HealthPoint</h2>
      </div>

      <nav className="flex items-center justify-between gap-10">
        <ul className="flex items-center justify-around gap-6">
          <li className="relative group">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Home</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative group">
            <Link href="/doctors" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Doctors</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative group">
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">About</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative group">
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Contact</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </li>
          {isAdmin && (
            <li className="relative group">
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Dashboard</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </li>
          )}
        </ul>

        {!token ? (
          <div className="flex gap-3">
            <Link href="/login" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium">Login</Link>
            <Link href="/register" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium">Register</Link>
          </div>
        ) : (
          <LogOutButton text="Log Out" href="/logout" location="/login" />
        )}
      </nav>
    </header>
  );
};

export default Nav;
