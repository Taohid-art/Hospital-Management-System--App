export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
          About Our Hospital
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Welcome to <strong>Health Point Hospital</strong>, where we are
          committed to providing world-class healthcare with compassion and
          excellence. Our team of highly skilled doctors, nurses, and healthcare
          professionals work together to ensure the best possible outcomes for
          our patients.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We specialize in a wide range of medical services, from general
          practice to advanced surgical procedures. With state-of-the-art
          facilities and a patient-first approach, we aim to make healthcare
          accessible, affordable, and reliable for everyone.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to bring healing and hope through medical innovation,
          personalized care, and community trust.
        </p>
      </div>
    </div>
  );
}
