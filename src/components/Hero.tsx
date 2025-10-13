import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Award, Sparkles, Star } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [homeData, setHomeData] = useState<any>(null); // store WP data
  const [contactData, setContactData] = useState<any>(null); // store WP data
  
  
    useEffect(() => {
        // Fetch Home page data from WordPress
        fetch("http://localhost/wordpress/wp-json/wp/v2/pages/155")
          .then(res => res.json())
          .then(data => setContactData(data))
          .catch(err => console.log(err));
      }, []);



   useEffect(() => {
      // Fetch Home page data from WordPress
      fetch("http://localhost/wordpress/wp-json/wp/v2/pages/8")
        .then(res => res.json())
        .then(data => setHomeData(data))
        .catch(err => console.log(err));
    }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Floating Icons */}
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium text-sm mb-4">
              ✨ Trusted by 10,000+ Customers
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Your Trusted
            <span className="block bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Financial Partner
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Professional <span className="text-amber-600 font-semibold">Gold Finance</span> solutions and accurate 
            <span className="text-blue-700 font-semibold"> Property Valuations</span> backed by years of expertise
            <span className="block mt-2 text-base sm:text-lg text-slate-600">
              Serving <span className="text-black font-semibold">all strata of life</span> - businessmen, entrepreneurs, farmers, retailers with 
              <span className="text-blue-700 font-semibold"> instant processing</span> and <span className="text-amber-600 font-semibold">hassle-free documentation</span>
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <button 
              onClick={scrollToServices}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <a href="tel:+918056312849" className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-700 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
              <span className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Call +91  {homeData?.acf?.phone}</span>
              </span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
            {[
              {
                icon: Shield,
                title: "Secure & Trusted",
                desc: "Bank-level security with insurance coverage",
                delay: "delay-300"
              },
              {
                icon: TrendingUp,
                title: "Best Rates",
                desc: "Competitive rates with transparent pricing",
                delay: "delay-500"
              },
              {
                icon: Award,
                title: "Expert Team",
                desc: "Certified professionals with 15+ years experience",
                delay: "delay-700"
              }
            ].map((feature, idx) => (
              <div key={idx} className={`transform transition-all duration-1000 ${feature.delay} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-500 border border-blue-200 hover:border-blue-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3 transition-colors text-center">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 transition-colors text-center">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a
          href={contactData?.acf?.whatsapp }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce"
          title="Chat with us on WhatsApp"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center bg-white">
          <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};