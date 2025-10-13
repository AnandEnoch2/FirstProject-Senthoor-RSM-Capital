import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Sparkles, MapPin } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [homeData, setHomeData] = useState<any>(null); // store WP data



   useEffect(() => {
      // Fetch Home page data from WordPress
      fetch("http://localhost/wordpress/wp-json/wp/v2/pages/8")
        .then(res => res.json())
        .then(data => setHomeData(data))
        .catch(err => console.log(err));
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: homeData?.acf?.menu1 || 'Home' },
    { path: '/about', label: homeData?.acf?.menu2 || 'About' },
    { path: '/services', label: homeData?.acf?.menu3 || 'Services' },
    { path: '/gold-finance', label: homeData?.acf?.menu4 || 'Gold Finance' },
    { path: '/property-valuation', label: homeData?.acf?.menu5 || 'Property Valuation' },
    { path: '/contact', label: homeData?.acf?.menu6 || '  ' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-500 bg-white shadow-lg border-b border-blue-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex justify-between items-center py-2 sm:py-2.5 lg:py-3">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform group-hover:scale-110 transition-all duration-300">
                <img 
                  src={homeData?.acf?.logo || "/logo.png"} 
                  alt="Senthoor RSM Capital Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent transition-all duration-300">
                <span className="hidden lg:inline">Senthoor RSM Capital Pvt Ltd</span>
                <span className="lg:hidden">Senthoor RSM Capital</span>
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 transition-colors duration-300">
                <span className="hidden xl:inline">Your Trusted Financial Partner</span>
                <span className="xl:hidden">Trusted Partner</span>
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-1 xl:px-2 py-2 font-semibold text-xs xl:text-sm transition-all duration-300 group whitespace-nowrap ${
                  isActivePath(item.path)
                    ? 'text-blue-700' 
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-300 rounded-full ${
                  isActivePath(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-8">
            <a href="tel:+918056312849" className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white text-sm font-semibold transform hover:scale-105 transition-all duration-300">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 8056312849</span>
            </a>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white text-sm font-semibold transform hover:scale-105 transition-all duration-300">
              <Mail className="w-3.5 h-3.5" />
              <span>info@goldfinance.com</span>
            </div>
          </div>

          <button
            className="lg:hidden p-2 sm:p-3 rounded-xl transition-all duration-300 text-blue-700 hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-xl sm:rounded-2xl mt-2 py-3 sm:py-6 mx-2 sm:mx-4 border border-blue-200 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-2 sm:space-y-4 px-3 sm:px-6">
              {navigationItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left font-semibold text-sm sm:text-base py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="pt-2 sm:pt-4 border-t border-blue-100 space-y-1.5 sm:space-y-3">
                <a href="tel:+918056312849" className="flex items-center space-x-3 text-slate-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-xs sm:text-sm">+91 8056312849</span>
                </a>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-xs sm:text-sm">info@goldfinance.com</span>
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};