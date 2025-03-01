import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#2d5438] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2d5438] rounded-full"></div>
              Ayurveda Intelligence
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#2d5438] transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-[#2d5438] transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-[#2d5438] transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-[#2d5438] transition-colors">Contact</a>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-[#2d5438] mb-6 leading-tight">
                Modern Ayurveda for Modern Life
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover the ancient wisdom of Ayurveda enhanced by cutting-edge technology
                and scientific research. Experience personalized wellness solutions that
                adapt to your lifestyle.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#2d5438] text-white px-8 py-3 rounded-full hover:bg-[#1a3222] transition duration-300">
                  Start Your Journey
                </button>
                <button className="border-2 border-[#2d5438] text-[#2d5438] px-8 py-3 rounded-full hover:bg-[#2d5438] hover:text-white transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-[#e9d5c3] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d5438]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d5438] mb-16">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Consultation",
                description: "Get tailored Ayurvedic advice based on your unique constitution and lifestyle needs.",
                icon: "🌿"
              },
              {
                title: "Wellness Programs",
                description: "Comprehensive programs combining traditional Ayurvedic practices with modern lifestyle adaptations.",
                icon: "🧘‍♀️"
              },
              {
                title: "Digital Health Tracking",
                description: "Monitor your progress with our AI-powered health tracking system and get real-time insights.",
                icon: "📱"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#faf6f1] p-8 rounded-xl hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-[#2d5438] mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#f4ede4]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5438] mb-6">
                Bridging Ancient Wisdom with Modern Science
              </h2>
              <p className="text-gray-600 mb-6">
                At Ayurveda Intelligence, we combine traditional Ayurvedic principles
                with contemporary scientific research to provide holistic wellness
                solutions that fit modern lifestyles.
              </p>
              <ul className="space-y-4">
                {[
                  "Evidence-based approach to traditional practices",
                  "Certified Ayurvedic practitioners and modern health experts",
                  "Advanced diagnostic tools and monitoring systems",
                  "Personalized treatment plans with progress tracking"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-[#2d5438] rounded-full"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 h-[400px] bg-[#e9d5c3] rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d5438]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d5438] mb-16">
            Begin Your Wellness Journey
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2d5438] focus:ring-2 focus:ring-[#2d5438]/20"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2d5438] focus:ring-2 focus:ring-[#2d5438]/20"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2d5438] focus:ring-2 focus:ring-[#2d5438]/20"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2d5438] focus:ring-2 focus:ring-[#2d5438]/20"
              ></textarea>
              <button className="w-full bg-[#2d5438] text-white px-8 py-3 rounded-full hover:bg-[#1a3222] transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d5438] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                Ayurveda Intelligence
              </h3>
              <p className="text-gray-300">
                Transforming lives through the wisdom of Ayurveda
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Consultations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wellness Programs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Health Tracking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>contact@ayurvedaintelligence.com</li>
                <li>+1 (555) 123-4567</li>
                <li className="flex gap-4 mt-4">
                  {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Ayurveda Intelligence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
