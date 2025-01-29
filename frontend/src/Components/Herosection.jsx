
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiMessageSquare, FiUsers, FiShare } from 'react-icons/fi';

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-800/90 backdrop-blur-sm z-50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">ConnectED</h1>
          <Link 
            to="/auth" 
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-down">
          <h1 className="text-5xl font-bold mb-6">
            Bridge the Gap Between <span className="text-blue-500">Alumni</span> & Students
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Connect, collaborate, and grow with your academic community through secure networking
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/auth"
              className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Flow Diagram */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-600"></div>
            
            {[
              { icon: <FiUserPlus />, title: 'Connect', desc: 'Find & send requests to alumni/students' },
              { icon: <FiUsers />, title: 'Network', desc: 'Build your professional circle' },
              { icon: <FiMessageSquare />, title: 'Communicate', desc: 'Real-time chat & discussions' },
              { icon: <FiShare />, title: 'Share', desc: 'Posts, achievements & opportunities' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative z-10 bg-gray-700 p-8 rounded-2xl w-full md:w-56 hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
                {/* Connector Dots */}
                {index !== 3 && (
                  <div className="hidden md:block absolute -right-14 top-[44%] w-8 h-8 bg-gray-700 rounded-full border-4 border-gray-600 group-hover:border-blue-500 transition-colors"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We're dedicated to creating meaningful connections between students and alumni through 
            a secure platform that enables professional networking, knowledge sharing, and career 
            growth opportunities within academic communities.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Secure Authentication', desc: 'Role-based access control' },
              { title: 'Live Chat System', desc: 'Real-time messaging with history' },
              { title: 'Post Management', desc: 'Share updates & media' },
              { title: 'Connection System', desc: 'Request/accept/reject' },
              { title: 'Notifications', desc: 'Instant updates system' },
              { title: 'Profile Management', desc: 'Detailed user profiles' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-700 rounded-xl hover:transform hover:translate-y-2 transition-all duration-300"
              >
                <div className="text-blue-500 text-2xl mb-4">0{index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center bg-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Start Connecting Today</h2>
          <p className="text-gray-400 mb-8">Join your academic community and unlock new opportunities</p>
          <Link
            to="/auth"
            className="inline-block px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
