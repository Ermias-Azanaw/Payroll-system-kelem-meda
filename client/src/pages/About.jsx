import React from "react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Alemayehu Kebede",
    role: "Founder & CEO",
    bio: "15+ years experience in HR technology solutions",
    image:
      "https://i.pinimg.com/originals/9d/9d/9d/9d9d9d9d9d9d9d9d9d9d9d9d9d9d9d.png",
  },
  {
    name: "Selamawit Tekle",
    role: "CTO",
    bio: "Software architect specializing in financial systems",
    image:
      "https://i.pinimg.com/originals/a5/a5/a5/a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5.png",
  },
  {
    name: "Yohannes Assefa",
    role: "Head of Compliance",
    bio: "Ethiopian labor law and tax regulation expert",
    image:
      "https://i.pinimg.com/originals/8a/8b/9d/8a8b9d9e5e5d5d5d5e5d5d5e5d5d5d5.png",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/originals/7a/7a/7a/7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a.png"
              alt="Kelem Meda Logo"
              className="h-12 mr-3"
            />
            <span className="text-xl font-bold text-[#0b529c]">
              Kelem Meda Payroll
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/features"
              className="text-gray-600 hover:text-[#fba81c] transition"
            >
              Features
            </Link>
            <Link to="/about" className="text-[#0b529c] font-medium">
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-[#fba81c] transition"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-[#0b529c] hover:text-[#fba81c] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#0b529c] text-white px-4 py-2 rounded-lg hover:bg-[#0a4785] transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0b529c] to-[#0a4785] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Kelem Meda Payroll
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ethiopian-built payroll solution designed specifically for Ethiopian
            businesses and regulations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src="https://i.pinimg.com/originals/6e/6e/6e/6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e.png"
                alt="Our Story"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#0b529c] mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, Kelem Meda Payroll was born out of a need for
                payroll solutions that truly understand the complexities of
                Ethiopian employment regulations and business practices.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of HR professionals, software engineers, and tax
                experts came together to build a system that eliminates the
                headaches of manual payroll processing while ensuring full
                compliance with Ethiopian laws.
              </p>
              <p className="text-gray-600">
                Today, we serve businesses across Ethiopia, from small
                enterprises to large corporations, all benefiting from our
                localized expertise and cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b529c] text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#fba81c]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0b529c]">
                  {member.name}
                </h3>
                <p className="text-[#fba81c] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b529c] text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-[#fba81c] mb-4">🇪🇹</div>
              <h3 className="text-xl font-bold text-[#0b529c] mb-2">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Built by Ethiopians, for Ethiopian businesses with deep
                understanding of local regulations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-[#fba81c] mb-4">🔒</div>
              <h3 className="text-xl font-bold text-[#0b529c] mb-2">
                Data Security
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security protecting your sensitive payroll
                data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-[#fba81c] mb-4">🔄</div>
              <h3 className="text-xl font-bold text-[#0b529c] mb-2">
                Continuous Innovation
              </h3>
              <p className="text-gray-600">
                Regular updates to keep pace with changing regulations and
                business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#fba81c] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Payroll Revolution
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the difference of a payroll system built specifically for
            Ethiopian businesses.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-[#0b529c] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0a4785] transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0b529c] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Kelem Meda Payroll System. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
