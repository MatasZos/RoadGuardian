'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="images/roadguardian.jpg" alt="RoadGuardian Logo" className="h-12 w-12 rounded-lg"/>
            <h1 className="text-2xl font-bold text-blue-600">RoadGuardian</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Safe on Every Ride</h2>
          <p className="text-lg opacity-90">Your complete motorcycle safety and maintenance companion</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Personal Maintenance */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="bg-blue-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Personal Maintenance</h3>
              <p className="text-gray-600">Track and manage your motorcycle maintenance schedules, service records, and repairs in one place.</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Card 2: Emergency Assistance */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="bg-red-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-3xl">🆘</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Emergency Assistance</h3>
              <p className="text-gray-600">Connect with nearby riders and provide mutual support during roadside emergencies and breakdowns.</p>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Learn More
              </button>
            </div>

            {/* Card 3: Documents */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="bg-green-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Motorcycle Documents</h3>
              <p className="text-gray-600">Securely store and access your registration, insurance, license, and other important documents.</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Documents
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
