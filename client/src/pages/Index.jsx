import React from "react";
import { Link } from "react-router-dom";

// Static features data
const features = [
  {
    title: "Employee Management",
    description:
      "Efficiently manage all Kelem Meda staff details including personal information, positions, and employment history.",
    image:
      "https://i.pinimg.com/originals/2e/2f/7a/2e2f7ac27a3a8e6e5c7a7a4a5e5d5d5d.png", // Employee management icon
  },
  {
    title: "Payroll Calculation",
    description:
      "Automated payroll with Ethiopian tax laws, pension, and Kelem Meda's specific compensation rules.",
    image:
      "https://i.pinimg.com/originals/8a/8b/9d/8a8b9d9e5e5d5d5d5e5d5d5e5d5d5d5.png", // Payroll icon
  },
  {
    title: "Payment Processing",
    description:
      "Secure salary disbursement with integration to major Ethiopian banks and payment systems.",
    image:
      "https://i.pinimg.com/originals/5e/5d/5d/5e5d5d5e5d5d5e5d5d5e5d5d5e5d5d.png", // Payment icon
  },
  {
    title: "Reporting & Analytics",
    description:
      "Comprehensive reports for management with Kelem Meda's specific metrics and KPIs.",
    image:
      "https://i.pinimg.com/originals/d5/d5/e5/d5d5e5e5d5d5e5d5d5e5d5d5e5d5d5.png", // Analytics icon
  },
];

// Static testimonials data
const testimonials = [
  {
    name: "Ato Kebede Hailu",
    role: "HR Director, Kelem Meda",
    quote:
      "This system transformed our payroll operations, reducing processing time by 70%.",
    image:
      "https://i.pinimg.com/originals/9d/9d/9d/9d9d9d9d9d9d9d9d9d9d9d9d9d9d9d.png", // Ethiopian professional
  },
  {
    name: "W/ro Selamawit Abebe",
    role: "Finance Manager, Kelem Meda",
    quote:
      "Finally, a payroll system that understands Ethiopian business needs and tax regulations.",
    image:
      "https://i.pinimg.com/originals/a5/a5/a5/a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5.png", // Ethiopian professional woman
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
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
              className="text-[#0b529c] hover:text-[#fba81c] transition"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-[#0b529c] hover:text-[#fba81c] transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-[#0b529c] hover:text-[#fba81c] transition"
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0b529c] mb-4">
              Kelem Meda Payroll Solution
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Tailored payroll management system designed specifically for Kelem
              Meda's unique requirements, compliant with Ethiopian labor laws
              and tax regulations.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                to="/login"
                className="inline-block bg-[#0b529c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0a4785] transition"
              >
                Employee Login
              </Link>
              <Link
                to="/signup"
                className="inline-block bg-[#fba81c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e59715] transition"
              >
                Request Demo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://i.pinimg.com/originals/6e/6e/6e/6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e.png"
              alt="Kelem Meda Payroll Dashboard"
              className="w-full rounded-lg shadow-lg border border-gray-200"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b529c] text-center mb-12">
            Kelem Meda Payroll Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition hover:shadow-xl"
              >
                <div className="bg-[#0b529c] w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#0b529c] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0b529c]/10 to-[#fba81c]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b529c] text-center mb-12">
            Trusted by Kelem Meda Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#fba81c]">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <h3 className="text-lg font-semibold text-[#0b529c]">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center bg-[#0b529c] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Modernize Kelem Meda's Payroll?
          </h2>
          <p className="text-lg mb-6">
            Our specialized solution is designed specifically for Kelem Meda's
            operational needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="inline-block bg-[#fba81c] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e59715] transition"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-block border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0a4785] transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0b529c] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://i.pinimg.com/originals/7a/7a/7a/7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a.png"
                alt="Kelem Meda Logo"
                className="h-12 mb-4"
              />
              <p>
                Specialized payroll solution for Kelem Meda's unique
                requirements.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-[#fba81c] transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-[#fba81c] transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/demo" className="hover:text-[#fba81c] transition">
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="hover:text-[#fba81c] transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="hover:text-[#fba81c] transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="hover:text-[#fba81c] transition"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p>Addis Ababa, Ethiopia</p>
              <p>info@kelemmedapayroll.com</p>
              <p>+251 911 234 567</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-[#fba81c] transition">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#fba81c] transition">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-[#fba81c] transition">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#0a4785] mt-8 pt-8 text-center">
            <p>
              © {new Date().getFullYear()} Kelem Meda Payroll System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
