import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
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
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#fba81c] transition"
            >
              About
            </Link>
            <Link to="/contact" className="text-[#0b529c] font-medium">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with our team to learn how Kelem Meda Payroll can
            transform your HR operations.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#0b529c] mb-6">
                  Send Us a Message
                </h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fba81c]"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fba81c]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="company"
                      className="block text-gray-700 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fba81c]"
                      placeholder="Your company"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fba81c]"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#fba81c] text-white py-3 rounded-lg font-medium hover:bg-[#e59715] transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-8 h-full">
                <h2 className="text-2xl font-bold text-[#0b529c] mb-6">
                  Contact Information
                </h2>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#0b529c] mb-4">
                    Headquarters
                  </h3>
                  <div className="flex items-start mb-4">
                    <div className="text-[#fba81c] mr-4 mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Kelem Meda Plaza</p>
                      <p className="text-gray-600">Bole Road, Addis Ababa</p>
                      <p className="text-gray-600">Ethiopia</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#0b529c] mb-4">
                    Get In Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="text-[#fba81c] mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600">+251 11 123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-[#fba81c] mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          info@kelemmedapayroll.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-[#fba81c] mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          support@kelemmedapayroll.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#0b529c] mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">8:30 AM - 5:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.923313490578!2d38.76321431536394!3d9.005876293553492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f882e9e6c9%3A0x1a1b5a1b5a1b5a1b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Kelem Meda Location"
            ></iframe>
          </div>
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

export default Contact;
