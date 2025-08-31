'use client';

import { useState, useEffect } from "react";
import axios from "axios";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "pending",
  });
  
  const [user, setUser] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch doctors and user info on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors
        const doctorsRes = await axios.get("http://localhost:5000/doctors", {
          withCredentials: true,
        });
        setDoctors(doctorsRes.data);
        
        // Fetch current user
        const userRes = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true,
        });
        setUser(userRes.data.user);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("❌ Please login to book an appointment");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      setMessage("❌ Please login to book an appointment");
      setLoading(false);
      return;
    }

    try {
      const appointmentData = {
        ...formData,
        patient_id: user.patient_id
      };
      
      await axios.post("http://localhost:5000/appointments", appointmentData, {
        withCredentials: true,
      });
      setMessage("✅ Appointment booked successfully!");
      setFormData({
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
        status: "pending",
      });
    } catch (err) {
      console.error('Appointment booking error:', err);
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        setMessage("❌ Backend server is not running. Please start the server first.");
      } else if (err.response?.status === 404) {
        setMessage("❌ Appointment service not found. Please check server configuration.");
      } else {
        setMessage("❌ Error booking appointment: " + (err.response?.data?.error || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book Appointment
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Schedule your visit with our expert doctors
          </p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info Display */}
              {user && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Booking for:</strong> {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-blue-600">Patient ID: {user.patient_id}</p>
                </div>
              )}

              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctor_id} value={doctor.doctor_id}>
                      Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Appointment
                </label>
                <textarea
                  name="reason"
                  placeholder="Describe your symptoms or reason for visit"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>

              {/* Message */}
              {message && (
                <div className={`text-center p-4 rounded-xl ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <p className="font-medium">{message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">📅 Appointment Guidelines</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Book at least 24 hours in advance</li>
                <li>• Arrive 15 minutes early</li>
                <li>• Bring your ID and insurance card</li>
                <li>• Cancel 2 hours before if needed</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">🕒 Working Hours</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
                <p className="font-semibold">Emergency: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
