import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { companyInfo } from '../data/company';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/Flow_Logo.png" 
                alt="FLOW" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">FLOW</span>
            </div>
            
            <p className="text-gray-300 mb-4 max-w-md">
              {companyInfo.description}
            </p>
            
            <p className="text-gray-400 text-sm mb-6">
              Established in {companyInfo.established} • {companyInfo.achievements[0].metric} Reports
            </p>
            
            <div className="flex space-x-4">
              <a 
                href={companyInfo.social.linkedin}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={companyInfo.social.twitter}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-300 hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FLOW Research & Analytics. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                License #{companyInfo.contact.license.number} | {companyInfo.contact.license.authority}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;