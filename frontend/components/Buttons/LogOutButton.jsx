'use client'
import axios from "axios"
import { useState } from "react"

const LogOutButton = ({href, location, text}) => {
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      if (!confirm(`Are you sure you want to ${text.toLowerCase()}?`)) {
        return;
      }
      
      setLoading(true);
      const res = await axios.post(`http://localhost:5000${href}`, {}, {
        withCredentials: true,
      });
      
      if (res.status === 200) {
        window.location.href = location;
      } else {
        alert(`Failed to ${text.toLowerCase()}`);
      }
    } catch (err) {
      console.error(`Error ${text.toLowerCase()}:`, err);
      alert(`An error occurred while ${text.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <button 
      onClick={handleLogout} 
      disabled={loading}
      className='bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <span>🚪</span>
          <span>{text}</span>
        </>
      )}
    </button>
  )
}

export default LogOutButton