export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container w-full max-w-[1400px] mx-auto px-4">
        {children}
      </div>
    </div>
  );
}