'use client';
import React from 'react'
import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeInUp">
        <h1 className="text-5xl font-bold gradient-text mb-4">Admin Dashboard</h1>
        <p className="text-xl text-gray-600">Manage your hospital operations efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-3xl mb-2">👨‍⚕️</div>
          <h3 className="text-2xl font-bold mb-1">150+</h3>
          <p className="opacity-90">Total Doctors</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-2xl font-bold mb-1">500+</h3>
          <p className="opacity-90">Total Patients</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-2xl font-bold mb-1">25</h3>
          <p className="opacity-90">Today's Appointments</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-3xl mb-2">🏥</div>
          <h3 className="text-2xl font-bold mb-1">12</h3>
          <p className="opacity-90">Departments</p>
        </div>
      </div>

      {/* Management Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Doctors Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">👨‍⚕️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Doctors</h3>
            <p className="text-gray-600">Manage doctor profiles and schedules</p>
          </div>
          <div className="space-y-3">
            <Link href='/doctors' className='block w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              View All Doctors
            </Link>
            <Link href='/doctors/add' className='block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              Add New Doctor
            </Link>
          </div>
        </div>

        {/* Departments Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🏥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Departments</h3>
            <p className="text-gray-600">Manage hospital departments</p>
          </div>
          <div className="space-y-3">
            <Link href='/dashboard/department' className='block w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              Manage Departments
            </Link>
          </div>
        </div>

        {/* Staff Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Staff</h3>
            <p className="text-gray-600">Manage hospital staff members</p>
          </div>
          <div className="space-y-3">
            <Link href='/dashboard/staff' className='block w-full bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              Manage Staff
            </Link>
          </div>
        </div>

        {/* Appointments Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointments</h3>
            <p className="text-gray-600">View and manage appointments</p>
          </div>
          <div className="space-y-3">
            <Link href='/appointments' className='block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              View Appointments
            </Link>
          </div>
        </div>

        {/* Patients Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🏥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Patients</h3>
            <p className="text-gray-600">Manage patient records</p>
          </div>
          <div className="space-y-3">
            <button className='block w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              View Patients
            </button>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Reports</h3>
            <p className="text-gray-600">Generate hospital reports</p>
          </div>
          <div className="space-y-3">
            <button className='block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium'>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage