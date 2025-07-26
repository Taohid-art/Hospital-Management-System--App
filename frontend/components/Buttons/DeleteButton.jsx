'use client'
import axios from "axios"



const deleteButton = ({href}) => {
  
  
  const handleDelete = async () =>{
     try{
      if(!confirm("Are you sure you want to delete this doctor? This action cannot be undone.")){
        return; // User cancelled the deletion
      }
      const res = await axios.delete(`http://localhost:5000${href}`);
      if(res.status === 200){
        alert("Doctor deleted successfully");
        window.location.href = '/doctors'; // Redirect to doctors list
      }
      else{
        alert("Failed to delete doctor");
      }
     }catch(err){
      console.error("Error deleting doctor:", err);
      alert("An error occurred while deleting the doctor");
     }
  }
  return (
    <>
     <button   onClick={handleDelete} className=' mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors duration-300'>
         Delete
        </button>
    </>
  )
}

export default deleteButton