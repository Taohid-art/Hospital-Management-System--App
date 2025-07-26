import Button from '@/components/Buttons/Button';
import doctorimage from '@/public/images/Rectangle 401.png'
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      <section className="flex flex-col gap-1 bg-white  h-[60vh] w-full py-10 px-6  text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">Welcome to HealthPoint</h1>
        <p className="text-lg md:text-xl">Your Trusted Partner in Healthcare Management</p>
        <div className='mt-6 flex justify-between items-center gap-4 h-full w-full mx-auto'>
          <div className='flex-1 px-4 flex flex-col justify-center items-start'>
            <h2 className="text-3xl text-left font-semibold text-blue-500">Advanced Healthcare
              Made <br/> Personal</h2>
            <p className="text-md text-left mt-2">Streamline your hospital management with our comprehensive system.</p>
            <Button href="/appointments" text="Book a Appointments" />
          </div>
         < div className='flex-1 '>
            <Image src={doctorimage}  alt='Hero Image' height={400}
            width={300}
            />
          </div>
        </div>
      </section>

      <section className="py-12  px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="text-lg leading-relaxed">
          HealthPoint is a comprehensive Hospital Management System designed to streamline the management of hospital operations,
          improve patient care, and ensure efficient data handling for doctors, staff, and administrators.
        </p>
      </section>

      <section className="py-12 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Patient Management</h3>
            <p>Register, track, and manage patient records efficiently.</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
            <p>Book, update, and manage doctor appointments with ease.</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Doctor & Staff Management</h3>
            <p>Manage doctor schedules, department assignments, and staff profiles.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-2">📍 Location: 123 Health Street, Dhaka</p>
        <p className="text-lg mb-2">📞 Phone: +880 1234-567890</p>
        <p className="text-lg">📧 Email: support@healthpoint.com</p>
      </section>

      <footer className="text-center py-6 bg-blue-900 text-white">
        © 2025 HealthPoint. All rights reserved.
      </footer>
    </main>
  );
}
