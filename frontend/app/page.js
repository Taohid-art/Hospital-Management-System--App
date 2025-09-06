import Button from '@/components/Buttons/Button';
import doctorimage from '@/public/images/Rectangle 401.png'
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 text-gray-800 font-sans">
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-[80vh] w-full py-20 px-6 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse-custom">Welcome to HealthPoint</h1>
            <p className="text-xl md:text-2xl opacity-90">Your Trusted Partner in Healthcare Management</p>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-12 mt-16'>
            <div className='flex-1 text-center lg:text-left animate-fadeInUp'>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Advanced Healthcare<br/>Made Personal</h2>
              <p className="text-lg mb-8 opacity-90 max-w-lg mx-auto lg:mx-0">Streamline your hospital management with our comprehensive system.</p>
              <Button href="/appointments" text="Book Appointment" />
            </div>
            <div className='flex-1 flex justify-center animate-float'>
              <Image src={doctorimage} alt='Hero Image' height={400} width={320} className="rounded-2xl shadow-2xl max-w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 animate-fadeInUp">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">About Us</h2>
          <p className="text-xl leading-relaxed text-gray-700 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            HealthPoint is a comprehensive Hospital Management System designed to streamline the management of hospital operations,
            improve patient care, and ensure efficient data handling for doctors, staff, and administrators.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-white">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4">Patient Management</h3>
              <p className="opacity-90">Register, track, and manage patient records efficiently with our advanced system.</p>
            </div>
            <div className="group p-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-white">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-4">Appointment Scheduling</h3>
              <p className="opacity-90">Book, update, and manage doctor appointments with seamless integration.</p>
            </div>
            <div className="group p-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-white">
              <div className="text-3xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-4">Doctor & Staff Management</h3>
              <p className="opacity-90">Manage schedules, departments, and staff profiles efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 gradient-text">Contact Us</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6 text-lg">
              <div className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-xl transition-colors">
                <div className="text-2xl mb-2">📍</div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600">123 Health Street, Dhaka</p>
              </div>
              <div className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-xl transition-colors">
                <div className="text-2xl mb-2">📞</div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">+880 1234-567890</p>
              </div>
              <div className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-xl transition-colors">
                <div className="text-2xl mb-2">📧</div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">support@healthpoint.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <p className="text-lg">© 2025 HealthPoint. All rights reserved.</p>
      </footer>
    </main>
  );
}
