import React, { useState, useEffect } from 'react';
import { Home, MapPin, Ruler, TrendingUp, FileText, Award, Calculator, CheckCircle, Building, Factory, Zap, Star, Users, Shield, Globe, Target, Briefcase, BookOpen, Wrench, PieChart, BarChart3, Clock, Phone, Mail, Landmark, CaseSensitive as University, Banknote, CreditCard, Wallet, DollarSign, PiggyBank, Calendar } from 'lucide-react';

export const PropertyValuationPage = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [area, setArea] = useState(1200);
  const [location, setLocation] = useState('prime');
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeService, setActiveService] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(serviceInterval);
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

  const coreServices = [
    {
      icon: MapPin,
      title: "Land & Building Valuation",
      description: "Comprehensive valuation services for all types of properties including residential, commercial, and industrial assets with detailed market analysis.",
      gradient: "from-green-400 to-blue-500",
      delay: "delay-100"
    },
    {
      icon: Wrench,
      title: "Technical Assessment & Monitoring",
      description: "Professional technical evaluation and ongoing monitoring services to ensure structural integrity and compliance with building standards.",
      gradient: "from-blue-400 to-purple-500",
      delay: "delay-200"
    },
    {
      icon: PieChart,
      title: "Business Valuation",
      description: "Expert business valuation services for mergers, acquisitions, financial reporting, and strategic decision-making purposes.",
      gradient: "from-purple-400 to-pink-500",
      delay: "delay-300"
    },
    {
      icon: FileText,
      title: "Detailed Valuation Reports",
      description: "Comprehensive reports accepted by banks, NBFCs, legal authorities, insurance companies, and government agencies nationwide.",
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

  const assetClasses = [
    { name: "Office Spaces", icon: Building, color: "text-blue-600" },
    { name: "Residential", icon: Home, color: "text-green-600" },
    { name: "Data Centres & Warehouses", icon: Factory, color: "text-purple-600" },
    { name: "Healthcare & Educational", icon: BookOpen, color: "text-pink-600" },
    { name: "Hospitality", icon: Star, color: "text-yellow-600" },
    { name: "Infrastructure & Industrial", icon: Wrench, color: "text-red-600" },
    { name: "Land Development", icon: MapPin, color: "text-indigo-600" }
  ];

  const clientTypes = [
    { type: "Banks", icon: Building, count: "10+", color: "from-blue-500 to-cyan-500" },
    { type: "NBFCs", icon: Briefcase, count: "25+", color: "from-green-500 to-emerald-500" },
    { type: "ARCs", icon: Shield, count: "10+", color: "from-purple-500 to-pink-500" },
    { type: "Developers", icon: Home, count: "50+", color: "from-yellow-500 to-orange-500" },
    { type: "Corporates", icon: Target, count: "100+", color: "from-red-500 to-pink-500" },
    { type: "Government", icon: Globe, count: "20+", color: "from-indigo-500 to-purple-500" }
  ];

  const capabilities = [
    {
      title: "Asset Valuation",
      items: [
        "Valuation of Movable/Immovable Property",
        "Rent Fixation for Apartments",
        "Bank Loan and Visa Purpose Valuations",
        "Highway Compensation Assessments"
      ],
      icon: Calculator,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Income Tax Valuations",
      items: [
        "Fair Market Value Calculations",
        "Capital Gains Tax Assessments",
        "Wealth Tax and Gift Tax Valuations",
        "Compliance with Direct Tax Laws"
      ],
      icon: FileText,
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "Engineering Projects",
      items: [
        "Project Management Consultation",
        "Industrial & Commercial Projects",
        "Township & Infrastructure Development",
        "Safety and Quality Assurance"
      ],
      icon: Wrench,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Property Management",
      items: [
        "Property Management & Accounting",
        "Marketing & Rent/Lease Evaluation",
        "Property Maintenance Services",
        "Techno-Economic Feasibility Studies"
      ],
      icon: Home,
      gradient: "from-yellow-500 to-red-500"
    }
  ];

  const certifications = [
    { 
      name: "Registered Valuer Since 2013", 
      id: "F-24800", 
      icon: Award,
      description: "Government certified registered valuer with over 12 years of professional experience in property valuation across multiple asset classes."
    },
     { 
      name: "Quality Council of India", 
      id: "FM-6057/2018-2019", 
      icon: CheckCircle,
      description: "Quality management certification ensuring consistent delivery of high-standard valuation services and client satisfaction."
    },
   { 
      name: "Indian Green Building Council", 
      id: "IGBC-IM-01250655", 
      icon: Star,
      description: "Specialized certification in green building assessment and sustainable property valuation methodologies."
    },
    { 
      name: "IOV Registered Valuer Foundation", 
      id: "IOVRVF/M/L&B/354", 
      icon: Shield,
      description: "Certified by the Institute of Valuers for Land & Building valuation, ensuring adherence to international valuation standards."
    },
      { 
      name: "American Society of Civil Engineers", 
      id: "9372611", 
      icon: Globe,
      description: "International membership demonstrating commitment to global engineering excellence and best practices in structural assessment."
    },
  ];

  const projectServices = [
    { name: "Project Management", icon: Target },
    { name: "Cost Management", icon: Calculator },
    { name: "Building Consultancy", icon: Building },
    { name: "MEP Design", icon: Zap },
    { name: "Interior Design", icon: Home },
    { name: "Workplace Solutions", icon: Users },
    { name: "Program Management Office", icon: Briefcase },
    { name: "Design and Build", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-white relative">

      {/* Hero Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Home className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Senthoor RSM Capital
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">Property Valuation Services</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed mb-8">
              Leading property consultants in India with <span className="text-blue-700 font-bold">50+ professionals</span> and 
              <span className="text-amber-600 font-bold"> 12+ years of expertise</span> delivering accurate, transparent, 
              and reliable valuation solutions across multiple business verticals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+918056312849" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 transform hover:scale-105 shadow-lg">
                <span className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call +91 8056312849 {homeData?.acf?.phone}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

     {/* Core Services */}
<section className="py-16 bg-white relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div
      className={`text-center mb-16 transform transition-all duration-1000 delay-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
        Our Core Valuation Services
      </h2>
      <p className="text-lg text-slate-700 max-w-3xl mx-auto">
        Comprehensive valuation and advisory solutions across multiple business verticals
      </p>
    </div>

    {/* Services List - Centered */}
    <div className="flex justify-center">
      <div className="max-w-3xl space-y-8">
        {coreServices.map((service, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 transform transition-all duration-700 ${service.delay} ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 ${
                activeService === index ? 'animate-bounce' : ''
              }`}
            >
              <service.icon className="w-8 h-8 text-white" />
            </div>

            {/* Text */}
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold text-blue-800 mb-3 transition-colors cursor-pointer">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Asset Classes Coverage */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Our Coverage - Asset Classes
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Expertise spanning across multiple asset classes with comprehensive market knowledge
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {assetClasses.map((asset, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 hover:border-blue-500 text-center group">
                <asset.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-blue-800 transition-colors text-sm sm:text-base">
                  {asset.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Capabilities */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Our Comprehensive Capabilities
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Pioneer firm in property valuation services since 2013, providing expert solutions for over 12 years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {capabilities.map((capability, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
                
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center text-blue-800 mb-6 transition-colors">
                    {capability.title}
                  </h3>
                  
                  <ul className="space-y-3">
                    {capability.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center space-x-3 group/item">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700 group-hover/item:text-blue-800 transition-colors font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Our Diverse Clientele
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Serving a wide range of clients across India with professional excellence
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {clientTypes.map((client, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <client.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-blue-800 mb-2 transition-colors">
                  {client.type}
                </h4>
                <p className="text-2xl font-bold text-amber-600">{client.count}</p>
                <p className="text-xs text-slate-500">Clients</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl border border-blue-500 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-6 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
                Certifications & Professional Credentials
              </h3>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                Our expertise is backed by prestigious certifications and professional memberships from leading industry bodies
              </p>
            </div>
            
            <div className="mb-12">
              {/* First row - 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {certifications.slice(0, 3).map((cert, idx) => (
                  <div key={idx} className="relative text-center group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-blue-200 hover:border-blue-400 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <cert.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-xl text-blue-800 mb-3 group-hover:text-blue-900 transition-colors">
                        {cert.name}
                      </h4>
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 px-4 py-2 rounded-xl shadow-inner">
                        <p className="text-sm font-mono text-blue-800 font-bold">
                          ID: {cert.id}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
              </div>

              {/* Second row - 2 items centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                  {certifications.slice(3, 5).map((cert, idx) => (
                    <div key={idx + 3} className="relative text-center group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-blue-200 hover:border-blue-400 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                      </div>

                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                          <cert.icon className="w-10 h-10 text-white" />
                        </div>

                        <div className="mb-4">
                          <h4 className="font-bold text-xl text-blue-800 mb-3 group-hover:text-blue-900 transition-colors">
                            {cert.name}
                          </h4>
                          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 px-4 py-2 rounded-xl shadow-inner">
                            <p className="text-sm font-mono text-blue-800 font-bold">
                              ID: {cert.id}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mb-1">12+</div>
                  <div className="text-sm text-slate-600">Years Certified</div>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-amber-700 mb-1">5</div>
                  <div className="text-sm text-slate-600">Professional Bodies</div>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Compliance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project & Development Services */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-lg transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Project & Development Services
              </h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Our Project & Development advisors bring a long-term perspective that minimizes risk and drives value 
                throughout design and construction to ensure seamless project delivery for occupiers and investors.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {projectServices.map((service, idx) => (
                <div key={idx} className="text-center p-4 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 border border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-sm text-blue-800">{service.name}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-200">
              <h4 className="text-xl font-bold mb-4 text-center text-blue-800">You Can Rely On Us For:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h5 className="font-bold mb-2 text-blue-800">Strategic Advice</h5>
                  <p className="text-sm text-slate-700">Project goals and business strategy consultation</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 text-amber-600" />
                  <h5 className="font-bold mb-2 text-amber-700">Capital Optimization</h5>
                  <p className="text-sm text-slate-700">Maximize ROI from capital expenditure decisions</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h5 className="font-bold mb-2 text-blue-800">Data-Driven Analytics</h5>
                  <p className="text-sm text-slate-700">Predictive analytics for strategic decision-making</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-850 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Our Banking & Financial Partners
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Trusted by leading banks and financial institutions across India
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "HDB Financial Services", logo: "/hdb.jpeg" },
              { name: "Tamil Nadu Grama Bank", logo: "/Tngb.webp" },
              { name: "Suryoday Small Finance Bank", logo: "/suryo.jpeg" },
              { name: "Repco Bank", logo: "/repco.png" },
              { name: "L&T Finance", logo: "/lt.webp" },
              { name: "IndusInd Bank", logo: "/indus.png" },
              { name: "PNB Housing Finance", logo: "/punjab.jpeg" },
              { name: "Bandhan Bank", logo: "/bandhan.jpeg" },
              { name: "Repco Home Finance", logo: "/repcohome.jpeg" },
              { name: "Vastu Home Finance", logo: "/vastu.jpg" },
              { name: "Aditya Birla Housing Finance", logo: "/adithya.jpeg" },
              { name: "Hiranadhini Home Finance", logo: "/hfs.webp" }
            ].map((partner, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-blue-200 hover:border-blue-400 flex items-center justify-center group ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${850 + idx * 50}ms` }}
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 inline-block">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-800">10+</div>
                  <div className="text-sm text-slate-600">Banking Partners</div>
                </div>
                <div className="h-12 w-px bg-blue-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">100%</div>
                  <div className="text-sm text-slate-600">Approval Rate</div>
                </div>
                <div className="h-12 w-px bg-blue-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">1000+</div>
                  <div className="text-sm text-slate-600">Valuations Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Clients */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Our Esteemed Clients
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Trusted by leading organizations across Tamil Nadu, Kerala, and beyond
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-4xl w-full">
              {/* Corporate Clients */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-500">
                <h3 className="text-2xl font-bold text-center text-blue-800 mb-8">
                  Corporate & Business Clients
                </h3>

                <div className="space-y-6">
                  {[
                    { city: "Madurai", clients: ["Thangamayil Jewellers", "Vishal Promotors", "Pandiyan Hotel", "Aruna Alloys & Steels", "Asian Health & Nutri Foods Ltd", "Rajmahal", "Vishal De Mall", "Dattatreya Textiles Pvt. Ltd", "Ultra College", "Susee Automobiles Ltd", "Pothys", "Sri Sathya Steel", "Saasify Solutions Pvt. Ltd"] },
                    { city: "Chennai", clients: ["Robust Health Care", "Rajalakshmi Educational Trust", "KRR Special Gases", "Srikal Automation Pvt. Ltd", "Southern Automation & Electrical Solutions Pvt. Ltd"] },
                    { city: "Coimbatore", clients: ["Creative Jewellers", "Arem Logistics", "Sri Balaji Spinners"] },
                    { city: "Other Cities", clients: ["Mayura Textile (Tiruppur)", "Vaishnavi Metals (Ambattur)", "Hotel Le-Median (Kochi)", "Pyrologics Systech International LLP (Thiruvallur)", "Sri Ragavendra Minerals (Kanyakumari)", "Venlub Petro Products Pvt. Ltd (Kozhikode)"] }
                  ].map((cityGroup, idx) => (
                    <div key={idx} className="border-l-4 border-gray-300 pl-6">
                      <h4 className="font-bold text-lg text-blue-700 mb-3">{cityGroup.city}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cityGroup.clients.map((client, clientIdx) => (
                          <div key={clientIdx} className="text-sm text-slate-600 py-2 px-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                            {client}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white relative">
        {/* Locations Covered Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-500 transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-6 shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
                Locations Covered (Tamil Nadu)
              </h3>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                Our valuation network extends across all major districts in Tamil Nadu
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {[
                "Chennai", "Tiruvallur", "Kanchipuram", "Chengalpattu", "Ranipet",
                "Vellore", "Thiruvannamalai", "Trichy", "Thanjavur", "Pattukottai",
                "Pudhukottai", "Madurai", "Virudhunagar/Sivakasi", "Coimbatore", "Erode",
                "Tiruppur", "Salem", "Dharmapuri", "Theni", "Dindugal",
                "Tuticorin", "Tenkasi", "Tirunelveli", "Nagaercoil", "Kombakonam & Jeyakondam area",
                "Ariyalur", "Perambalur", "Ramanathapuram", "Sivaganga", "Karur", "Kallkurichi"
              ].map((location, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 hover:border-blue-400 text-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors">
                    {location}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mb-1">31+</div>
                  <div className="text-sm text-slate-600">Districts Covered</div>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-amber-700 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Tamil Nadu Coverage</div>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-700 mb-1">24-48hrs</div>
                  <div className="text-sm text-slate-600">Service Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg text-center transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready for Professional Property Valuation?
            </h3>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Get accurate, bank-approved property valuations from certified professionals. 
              Contact us today for a free consultation and detailed quote.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+918056312849" className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call +91 {homeData?.acf?.phone}</span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                  <p className="font-bold">24-48 Hours</p>
                  <p className="text-sm text-gray-300">Quick Turnaround</p>
                </div>
                <div>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <p className="font-bold">Bank Approved</p>
                  <p className="text-sm text-gray-300">Certified Reports</p>
                </div>
                <div>
                  <Award className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                  <p className="font-bold">12+ Years</p>
                  <p className="text-sm text-gray-300">Industry Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};
