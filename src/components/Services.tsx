import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, Home, Calculator, FileText, Users, Award, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const Services = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [homeData, setHomeData] = useState<any>(null); // store WP data
  const [contactData, setContactData] = useState<any>(null); // store WP data
  
  
    useEffect(() => {
        // Fetch Home page data from WordPress
        fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/pages/155")
          .then(res => res.json())
          .then(data => setContactData(data))
          .catch(err => console.log(err));
      }, []);



  useEffect(() => {
    // Fetch Home page data from WordPress
    fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/pages/8")
      .then(res => res.json())
      .then(data => setHomeData(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: 'gold-finance',
      title: homeData?.acf?.sub_title1 || '',
      description: homeData?.acf?.sub_title1_para || '',
      icon: Coins,
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgGradient: 'from-yellow-50 via-orange-50 to-red-50',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      features: [
        { icon: Calculator, text: 'Quick Valuation' },
        { icon: FileText, text: 'Minimal Docs' },
        { icon: Users, text: 'Ex-Banker Staff' },
        { icon: Award, text: 'Best Rates' }
      ],
      stats: { rate: '12%', time: '30 mins', amount: '₹5L+' }
    },
    {
      id: 'property-valuation',
      title: homeData?.acf?.sub_title2 || '',
      description: homeData?.acf?.sub_title2_para || '',
      icon: Home,
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      bgGradient: 'from-blue-50 via-purple-50 to-pink-50',
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      features: [
        { icon: Calculator, text: 'Accurate Assessment' },
        { icon: FileText, text: 'Detailed Reports' },
        { icon: Users, text: 'Certified Appraisers' },
        { icon: TrendingUp, text: 'Market Analysis' }
      ],
      stats: { rate: '24hrs', time: 'Delivery', amount: '5000+' }
    }
  ];

  return (
    <section id="services" className="py-20 bg-white relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Our Professional Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 sm:mb-6 px-4 sm:px-0">
            Choose Your Perfect
            <span className="block">Financial Solution</span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover our comprehensive range of financial services designed to meet your unique needs with 
            <span className="text-blue-700 font-semibold"> cutting-edge technology</span> and 
            <span className="text-amber-600 font-semibold"> expert guidance</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group cursor-pointer transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => scrollToSection(service.id)}
            >
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden transform group-hover:scale-105 transition-all duration-500 border border-blue-200 group-hover:border-blue-500 mx-4 sm:mx-0">
                {/* Animated Border */}

                <div className="relative z-10">
                  {/* Header with Image */}
                  <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transform transition-transform duration-700"
                    />
                    
                    {/* Floating Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl ${
                        hoveredCard === index ? 'animate-bounce' : ''
                      }`}>
                        <service.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-1 sm:space-x-2">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="bg-white border border-blue-500 rounded-lg px-2 sm:px-3 py-1">
                          <div className="text-blue-700 text-xs sm:text-sm font-bold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3 sm:mb-4 transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-slate-700 transition-colors">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {service.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => navigate(`/${service.id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2 relative overflow-hidden"
                    >
                      <span className="relative z-10 text-center">
                        <span className="hidden sm:inline">Learn More About {service.title.split(' ')[0]} {service.title.split(' ')[1]}</span>
                        <span className="sm:hidden">Learn More</span>
                      </span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-8 sm:mt-12 lg:mt-16 transform transition-all duration-1000 delay-500 mx-4 sm:mx-0 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">Ready to Get Started?</h3>
            <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 text-slate-700">Join thousands of satisfied customers who trust us with their financial needs</p>
            <a 
              href="tel:+918056312849"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              <span className="hidden sm:inline">Call +91 {homeData?.acf?.phone} - Free Consultation</span>
              <span className="sm:hidden">Free Consultation</span>
            </a>
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
