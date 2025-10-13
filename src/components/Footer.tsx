import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Heart, Star, Zap, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [homeData, setHomeData] = useState<any>(null); // store WP data


  useEffect(() => {
    // Fetch Home page data from WordPress
    fetch("http://localhost/wordpress/wp-json/wp/v2/pages/155")
      .then((res) => res.json())
      .then((data) => setHomeData(data))
      .catch((err) => console.log(err));
  }, []);

  const socialLinks = [
    { icon: Linkedin, href:[homeData?.acf?.linkdin], color: "hover:bg-blue-700", name: "LinkedIn" },
    { icon: MessageCircle, href: [homeData?.acf?.whatsapp], color: "hover:bg-green-600", name: "WhatsApp" },
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gold-finance', label: 'Gold Finance' },
    { path: '/property-valuation', label: 'Property Valuation' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const contactDetails = [
    { icon: Phone, label: "Call Us", 
      value: [
        `+91 ${homeData?.acf?.phone1 || "9788752611"}`,
        `+91 ${homeData?.acf?.phone2 || "8838766508"}`,
        `+91 ${homeData?.acf?.phone3 || "8838768756"}`,
      ], 
      color: "text-green-400"
    },
    { icon: Mail, label: "Email Us", value:
      [homeData?.acf?.email || "info@goldfinance.com",
       homeData?.acf?.email_2 || "support@goldfinance.com"

    ] , color: "text-blue-400" },
    { icon: MapPin, label: "Visit Us", value: [homeData?.acf?.address ||"Plot No:2 Jain Shanthi Villa, Tamil Nadu 627005"], color: "text-purple-400" }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Enhanced Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg sm:text-xl">GF</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  Senthoor RSM Capital Pvt Ltd.
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span>Your Trusted Financial Partner</span>
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: homeData?.acf?.logo_para || "" }}>
              {/* With over <span className="text-white font-semibold">12 years of experience</span>, we provide 
              <span className="text-amber-300 font-semibold"> secure gold financing solutions</span> and 
              <span className="text-blue-300 font-semibold"> accurate property valuations</span>, combining 
              traditional expertise with modern technology. */}
            </p>
            
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group py-1 sm:py-2 text-sm sm:text-base"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Contact Info
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {contactDetails.map((contact, idx) => (
                <div key={idx} className="flex items-start space-x-2 sm:space-x-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">{contact.label}</p>
                    <div className="text-white font-medium transition-colors text-sm sm:text-base">
                      {Array.isArray(contact.value) ? (
                        contact.value.map((val: string, i: number) => (
                          <p key={i}>{val}</p>
                        ))
                      ) : (
                        <p>{contact.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-blue-800 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
                © 2025 Senthoor RSM Capital Pvt Ltd. All rights reserved.
              </p>
              <div className="hidden sm:flex items-center space-x-1">
                <span className="text-gray-500">Made with</span>
                <Heart className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-gray-500">for our customers</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 sm:gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300 hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-800">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span>Instant Processing</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span>5-Star Rated Service</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span className="hidden sm:inline">Customer Satisfaction Guaranteed</span>
                <span className="sm:hidden">Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};