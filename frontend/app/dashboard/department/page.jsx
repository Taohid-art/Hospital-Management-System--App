import Link from 'next/link';
import axios from 'axios';
import DeleteButton from '@/components/Buttons/DeleteButton';
const DepartmentsPage = async () => {
  const res = await axios.get('http://localhost:5000/dashboard/department');
  const departments = res.data;

  const res1 = await axios.get('http://localhost:5000/doctors');
  const doctors = res1.data;

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">All Departments</h2>
        <Link
          href="/dashboard/department/add"
          className="bg-blue-600 text-white p-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
        >
          Add Department
        </Link>
      </div>

      <ul>
        {departments.map((dep) => {
          const headDoctor = doctors.find(doc => doc.doctor_id === dep.head_doctor_id);

          return (
            <li key={dep.department_id} className="p-2 border-b">
              <strong>{dep.department_name}</strong> | 
              Head Doctor Name: {headDoctor ? `${headDoctor.first_name} ${headDoctor.last_name}` : 'N/A'} | 
              Phone: {dep.contact_number} | 
              Location: {dep.location}
              <div className='ml-2'><DeleteButton href={`/dashboard/department/delete/${dep.department_id}`}  location={'/dashboard/department'} item={'Department'} /></div>
              
            </li>
            
          );
        })}
      </ul>
    </div>
  );
};

export default DepartmentsPage;
