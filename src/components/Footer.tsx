import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <img
                  src={logo}
                  alt="South Asian Center Logo"
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-400">
              Dedicated to improving health outcomes in the South Asian
              community through early detection and prevention.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: diabetes@sknfoundation.org</p>
              <p>Phone: +1 732-947-4383</p>
              <p>Address: 123 Health St, Medical District</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 South Asian Center for Diabetes and Heart Health. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
