'use client';

import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/contact", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fadeInUp">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>

                  {status && (
                    <p className="text-center text-lg font-medium">{status}</p>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="animate-fadeInUp">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="opacity-90">123 Health Street, Dhaka, Bangladesh</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">📞</div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="opacity-90">+880 1234-567890</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="opacity-90">support@healthpoint.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">🕒</div>
                      <div>
                        <p className="font-semibold">Hours</p>
                        <p className="opacity-90">24/7 Emergency Care</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
                  <p className="text-lg mb-4">For medical emergencies, call:</p>
                  <p className="text-3xl font-bold">999</p>
                  <p className="opacity-90 mt-2">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
