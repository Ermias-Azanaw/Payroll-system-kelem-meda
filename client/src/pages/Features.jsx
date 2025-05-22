import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Employee Management",
    description:
      "Comprehensive employee records with personal details, employment history, and document management.",
    icon: "👥",
    details: [
      "Centralized employee database",
      "Document storage (contracts, certificates)",
      "Employment history tracking",
      "Department and position management",
    ],
  },
  {
    title: "Payroll Processing",
    description:
      "Automated payroll calculations compliant with Ethiopian tax laws and Kelem Meda policies.",
    icon: "💰",
    details: [
      "Tax and deduction calculations",
      "Pension and benefit management",
      "Overtime and bonus calculations",
      "Multiple payment methods",
    ],
  },
  {
    title: "Leave Management",
    description:
      "Streamlined leave requests and approvals with Ethiopian holiday calendar integration.",
    icon: "🏖️",
    details: [
      "Annual leave tracking",
      "Sick leave management",
      "Custom leave policies",
      "Approval workflow",
    ],
  },
  {
    title: "Reporting & Analytics",
    description:
      "Comprehensive reports for HR and finance teams with export capabilities.",
    icon: "📊",
    details: [
      "Monthly payroll reports",
      "Tax compliance documents",
      "Employee performance metrics",
      "Custom report generation",
    ],
  },
  {
    title: "Mobile Access",
    description: "Employee self-service portal accessible via mobile devices.",
    icon: "📱",
    details: [
      "Payslip access",
      "Leave requests",
      "Personal info updates",
      "Company announcements",
    ],
  },
  {
    title: "Security & Compliance",
    description:
      "Enterprise-grade security with Ethiopian data protection compliance.",
    icon: "🔒",
    details: [
      "Role-based access control",
      "Data encryption",
      "Audit logs",
      "GDPR compliance",
    ],
  },
];

const Features = () => {
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
            <Link to="/features" className="text-[#0b529c] font-medium">
              Features
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#fba81c] transition"
            >
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
      <section className="py-16 px-4 bg-gradient-to-r from-[#0b529c] to-[#0a4785] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kelem Meda Payroll Features
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover how our specialized payroll solution can streamline your HR
            operations and ensure compliance with Ethiopian regulations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition hover:border-t-4 hover:border-[#fba81c]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#0b529c] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#fba81c] mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#fba81c] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Payroll Process?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join dozens of Ethiopian businesses already benefiting from our
            specialized payroll solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="inline-block bg-[#0b529c] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0a4785] transition"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#0b529c] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Request Demo
            </Link>
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

export default Features;
