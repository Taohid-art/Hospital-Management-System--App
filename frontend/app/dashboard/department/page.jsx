import Link from 'next/link';
import axios from 'axios';
import DeleteButton from '@/components/Buttons/DeleteButton';
const DepartmentsPage = async () => {
  const res = await axios.get('http://localhost:5000/dashboard/department');
  const departments = res.data;

  const res1 = await axios.get('http://localhost:5000/doctors');
  const doctors = res1.data;

  return (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">All Departments</h2>
    <Link
      href="/dashboard/department/add"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Add Department
    </Link>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {departments.map((dep) => {
      const headDoctor = doctors.find(doc => doc.doctor_id === dep.head_doctor_id);

      return (
        <div
          key={dep.department_id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">{dep.department_name}</h3>
          <p><span className="font-medium">Head Doctor:</span> {headDoctor ? `${headDoctor.first_name} ${headDoctor.last_name}` : 'N/A'}</p>
          <p><span className="font-medium">Phone:</span> {dep.contact_number}</p>
          <p><span className="font-medium">Location:</span> {dep.location}</p>
          <div className="mt-4 flex justify-end">
            <DeleteButton 
              href={`/dashboard/department/delete/${dep.department_id}`} 
              location={'/dashboard/department'} 
              item={'Department'} 
            />
          </div>
        </div>
      );
    })}
  </div>
</div>

  );
};

export default DepartmentsPage;
