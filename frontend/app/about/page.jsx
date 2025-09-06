export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-white">
            About HealthPoint
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Excellence in Healthcare Since 1995
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fadeInUp">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welcome to <strong>HealthPoint Hospital</strong>, where we are committed to providing world-class healthcare with compassion and excellence. Our team of highly skilled doctors, nurses, and healthcare professionals work together to ensure the best possible outcomes for our patients.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We specialize in a wide range of medical services, from general practice to advanced surgical procedures. With state-of-the-art facilities and a patient-first approach, we aim to make healthcare accessible, affordable, and reliable for everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white animate-fadeInUp">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg opacity-90">
                To bring healing and hope through medical innovation, personalized care, and community trust.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">25+</div>
              <p className="text-gray-700">Years of Excellence</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <p className="text-gray-700">Expert Doctors</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-pink-600 mb-2">50K+</div>
              <p className="text-gray-700">Happy Patients</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-700">Emergency Care</p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">💙</div>
              <h3 className="text-2xl font-bold mb-4">Compassionate Care</h3>
              <p className="opacity-90">We treat every patient with empathy, respect, and dignity.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold mb-4">Advanced Technology</h3>
              <p className="opacity-90">State-of-the-art equipment and innovative treatment methods.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="opacity-90">Committed to the highest standards of medical care and service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
