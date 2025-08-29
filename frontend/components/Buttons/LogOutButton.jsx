'use client'
import axios from "axios"



const logOut = ({href,location,text}) => {
  
  
  const handleDelete = async () =>{
     try{
      if(!confirm(`Are you sure you want to delete this ${text}? This action cannot be undone.`)){
        return; // User cancelled the deletion
      }
      const res = await axios.post(`http://localhost:5000${href}`,{},{
        withCredentials: true, // allow cookies from backend  
        // 
        });
      if(res.status === 200){
        alert(`${text} successfully`);
        window.location.href = location; // Redirect to doctors list
      }
      else{
        alert(`Failed to  ${text}`);
      }
     }catch(err){
      console.error(`Error  ${text}:`, err);
      alert(`An error occurred while  ${text}`);
     }
  }
  return (
    <>
     <button   onClick={handleDelete} className=' mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors duration-300'>
        {text}
        </button>
    </>
  )
}

export default logOut