import React, { useState, useEffect } from 'react';
import { Home, MapPin, Ruler, TrendingUp, FileText, Award, Calculator, CheckCircle, Building, Factory, Zap, Star } from 'lucide-react';

export const PropertyValuation = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [area, setArea] = useState(1200);
  const [location, setLocation] = useState('prime');
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('property-valuation');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getEstimatedValue = () => {
    const baseRates = {
      residential: { prime: 8500, good: 6500, average: 4500 },
      commercial: { prime: 12000, good: 9000, average: 6500 },
      industrial: { prime: 5500, good: 4200, average: 3000 }
    };
    
    const rate = baseRates[propertyType as keyof typeof baseRates][location as keyof typeof baseRates.residential];
    return (area * rate).toLocaleString();
  };

  const services = [
    {
      icon: MapPin,
      title: "Location Analysis",
      description: "Comprehensive area assessment including market trends, infrastructure development, and future growth potential analysis.",
      gradient: "from-green-400 to-blue-500",
      delay: "delay-100"
    },
    {
      icon: Ruler,
      title: "Property Inspection",
      description: "Detailed physical inspection covering structure quality, condition assessment, and compliance with building regulations.",
      gradient: "from-blue-400 to-purple-500",
      delay: "delay-200"
    },
    {
      icon: TrendingUp,
      title: "Market Comparison",
      description: "In-depth analysis of comparable properties and recent market transactions in the surrounding area.",
      gradient: "from-purple-400 to-pink-500",
      delay: "delay-300"
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Comprehensive valuation report accepted by banks, legal authorities, insurance companies, and government agencies.",
      gradient: "from-pink-400 to-red-500",
      delay: "delay-400"
    }
  ];

  const propertyCategories = [
    {
      title: "Residential Properties",
      icon: Home,
      items: ["Luxury Apartments", "Independent Villas", "Residential Plots", "Premium Farmhouses"],
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "Commercial Properties", 
      icon: Building,
      items: ["Corporate Offices", "Retail Spaces", "Shopping Malls", "Business Hotels"],
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      title: "Industrial Properties",
      icon: Factory,
      items: ["Manufacturing Units", "Industrial Warehouses", "SEZ Properties", "Technology Parks"],
      gradient: "from-purple-400 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50"
    }
  ];

  const whyChooseUs = [
    { icon: Award, title: "Certified Valuers", desc: "Government certified professionals with 15+ years experience", color: "text-yellow-600" },
    { icon: FileText, title: "Bank Approved", desc: "Reports accepted by all major banks and financial institutions", color: "text-green-600" },
    { icon: TrendingUp, title: "Market Expertise", desc: "Deep understanding of local and national property markets", color: "text-blue-600" },
    { icon: Zap, title: "Quick Turnaround", desc: "Fast and efficient service delivery within 24-48 hours", color: "text-purple-600" }
  ];

  return (
    <section id="property-valuation" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Home className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2">
              <Star className="w-6 h-6 text-blue-300 animate-spin" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Property Valuation Services
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Get <span className="text-blue-600 font-bold">accurate property valuations</span> from certified professionals. 
            Our <span className="text-purple-600 font-bold">comprehensive assessments</span> help you make informed decisions 
            for <span className="text-pink-600 font-bold">buying, selling, or loan purposes</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Services */}
          <div className="space-y-8">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
              Our Valuation Services
            </h3>
            
            <div className="space-y-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 transform transition-all duration-700 ${service.delay} ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                >
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

       

        {/* Animated Property Types */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {propertyCategories.map((category, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden ${
                activeCategory === idx ? 'ring-4 ring-blue-200' : ''
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-30`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-300 ${
                  activeCategory === idx ? 'animate-bounce scale-110' : ''
                }`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className={`text-2xl font-bold text-center mb-6 transition-colors duration-300 ${
                  activeCategory === idx ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {category.title}
                </h4>
                
                <ul className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center space-x-3 group">
                      <div className={`w-6 h-6 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12">
            Why Choose Our Valuation Services?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </section>
  );
};