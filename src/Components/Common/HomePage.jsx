import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, Pill, Stethoscope, Heart } from 'lucide-react';

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Add this hook

  const services = [
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Medicine Management",
      description: "Track and manage your medications with smart reminders",
      color: "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Virtual Consultations",
      description: "Connect with doctors online from the comfort of your home",
      color: "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Monitoring",
      description: "Track vital signs and health metrics in real-time",
      color: "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Records",
      description: "Your health data is encrypted and securely stored",
      color: "bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
    },
  ];

  const features = [
    {
      title: "24/7 Access",
      description: "Access your health records anytime, anywhere",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Expert Care",
      description: "Connect with certified healthcare professionals",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Secure & Private",
      description: "Bank-level security for your health data",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Add this function to handle dashboard navigation
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to <span className="text-blue-600">HealthCare+</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Your comprehensive healthcare management platform.
              Connecting patients with quality care through innovative technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Updated button to use navigation */}
              <button
                onClick={handleDashboardClick} // Changed to onClick handler
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HealthCare+?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Experience healthcare like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive healthcare solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${hoveredCard === index ? 'shadow-2xl' : ''
                  } ${service.color}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href="/services"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of satisfied patients and healthcare providers
          </p>
          <button
            onClick={handleDashboardClick} // Also add navigation to this button
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white dark:bg-gray-100 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;