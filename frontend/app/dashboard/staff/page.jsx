import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import DeleteButton from '@/components/Buttons/DeleteButton';
const StaffList = async () => {

  
  let staff = [];
  try {
    const res = await axios.get('http://localhost:5000/dashboard/staff');
    staff = res.data;
  } catch (error) {
    console.error('Failed to fetch staff:', error);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto"> 
      <h1 className="text-3xl font-bold mb-6 text-center">Hospital Staff List</h1>
      <div className='flex justify-between items-center mb-6'>
        <div></div>
      <Link href='staff/add'  className="w-40  bg-blue-600 text-white p-3 rounded-lg text-center hover:bg-blue-700 transition-colors mt-4"> Add Staff</Link>
     
      </div>
     
      

      {staff.length === 0 && <p className="text-center">No staff data available.</p>}

      {staff.map((person) => (
        <div
          key={person.staff_id}
          className="border rounded-lg p-4 mb-6 shadow-md bg-white"
        >
          
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={
                `http://localhost:5000/images/${person.profile_image}` || '/default.png'
              }
              alt={`${person.first_name} ${person.last_name}`}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">
              {person.first_name} {person.last_name}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
            <div><strong>ID:</strong></div>
            <div>{person.staff_id}</div>

            <div><strong>Gender:</strong></div>
            <div>{person.gender}</div>

            <div><strong>Role:</strong></div>
            <div>{person.role}</div>

            <div><strong>Phone:</strong></div>
            <div>{person.phone}</div>

            <div><strong>Email:</strong></div>
            <div>{person.email}</div>

            <div><strong>Department ID:</strong></div>
            <div>{person.department_id}</div>

            <div><strong>Hire Date:</strong></div>
            <div>{new Date(person.hire_date).toLocaleDateString()}</div>

            <div><strong>Salary:</strong></div>
            <div>৳ {parseFloat(person.salary).toFixed(2)}</div>

            <div><strong>Shift:</strong></div>
            <div>{person.shift}</div>

            <div><strong>Status:</strong></div>
            <div>{person.status}</div>
          </div>
          <DeleteButton href={`/dashboard/staff/delete/${person.staff_id}`} location='/dashboard/staff' item='staff' />
        </div>
      ))}
    </div>
  );
};

export default StaffList;
