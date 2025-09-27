import React, { useState, useEffect } from 'react';
import { Users, Award, Shield, TrendingUp, Target, Heart, Lightbulb, Globe, Star, Zap } from 'lucide-react';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [counters, setCounters] = useState({ years: 0, clients: 0, loans: 0, properties: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          const targets = { years: 12, clients: 10000, loans: 500, properties: 5000 };
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounters({
              years: Math.floor(targets.years * progress),
              clients: Math.floor(targets.clients * progress),
              loans: Math.floor(targets.loans * progress),
              properties: Math.floor(targets.properties * progress)
            });
            
            if (step >= steps) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your assets and information are protected with bank-level security, comprehensive insurance coverage, and complete confidentiality.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize our customers' needs above everything else and strive to exceed expectations in every single interaction.",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards of service quality, professional expertise, and industry-leading best practices.",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously improve our services using cutting-edge technology, market insights, and innovative financial solutions.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50"
    }
  ];

  const team = [
    {
      name: "Mr.R.Sudalaimuthu",
      role: "Managing Director and Share Holder",
      experience: "20+ years in financial services",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Mrs.Laxmi",
      role: "Share Holder",
      experience: "20+ years in financial services",
      gradient: "from-pink-500 to-red-500"
    },
    {
      name: "Mr.R.S.Hariram",
      role: "Director - Finance Service",
      experience: "15+ years in banking operations",
      gradient: "from-pink-500 to-red-500"
    },
    {
      name: "Mr.R.S.Sudhakar",
      role: "Director - Technical Head and Accounts",
      experience: "18+ years in property valuation",
      gradient: "from-green-500 to-teal-500"
    },
     {
      name: "Mrs.A.Saranya",
      role: "Director - Operation and Human Resource",
      experience: "20+ years in financial services",
      gradient: "from-blue-500 to-purple-500"
    },
     
  ];

  return (
    <section id="about" className="py-20 bg-white relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
              <Star className="w-5 h-5" />
              <span>About Our Company</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 sm:mb-6 px-4 lg:px-0">
              Tamil Nadu's Premier Gold Finance &
              <span className="block">Property Valuation Experts Since 2013</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
              Established in <span className="text-blue-700 font-bold">2013</span>, we are Tamil Nadu's leading 
              <span className="text-blue-700 font-bold"> gold finance and property valuation company</span> with over 
              <span className="text-amber-600 font-bold"> 12 years of proven expertise</span>. We have successfully served 
              <span className="text-blue-700 font-bold"> 10,000+ satisfied customers</span> across Tamil Nadu, Kerala, and beyond.
            </p>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
              As a <span className="text-blue-700 font-bold">government-certified valuation company</span> operating since 2013, 
              we provide <span className="text-amber-600 font-semibold">instant gold loans</span> and 
              <span className="text-blue-700 font-semibold"> bank-approved property valuations</span> across Tamil Nadu. 
              Our <span className="text-blue-700 font-semibold">certified professionals</span> serve clients in Madurai, 
              Chennai, Coimbatore, Tirunelveli, and throughout South India with <span className="text-black font-semibold">transparent pricing</span> 
              and <span className="text-amber-600 font-semibold"> same-day service</span>.
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 px-4 lg:px-0">
              {[
                { value: `${Math.min(counters.years, 12)}+`, label: 'Years Since 2013', color: 'text-blue-700', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-500' },
                { value: `${(counters.clients / 1000).toFixed(0)}K+`, label: 'Happy Clients', color: 'text-amber-600', bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-500' },
                { value: `₹${counters.loans}Cr+`, label: 'Loans Disbursed', color: 'text-blue-700', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-500' },
                { value: `20K+`, label: 'Properties Valued', color: 'text-amber-600', bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-500' }
              ].map((stat, idx) => (
                <div key={idx} className={`text-center p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl ${stat.bg} transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
                  <div className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Team at work"
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500 mx-4 lg:mx-0"
              />
              
              {/* Floating Achievement Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -left-2 sm:-left-4 lg:-left-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-500 transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-800 text-sm sm:text-base lg:text-lg">Certified Excellence</div>
                    <div className="text-xs sm:text-sm text-slate-600">Tamil Nadu 627005</div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 -right-2 sm:-right-4 lg:-right-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-500 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="text-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 sm:mb-2 text-amber-600" />
                  <div className="font-bold text-sm sm:text-base text-amber-700">99.9%</div>
                  <div className="text-xs text-slate-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Values Section */}
        <div className={`mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className={`text-center group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-blue-200 hover:border-blue-500 ${
                  activeValue === idx ? 'ring-4 ring-blue-200 scale-105' : ''
                }`}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transform transition-all duration-300 ${
                    activeValue === idx ? 'animate-bounce scale-110' : 'group-hover:scale-110 group-hover:rotate-12'
                  }`}>
                    <value.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  
                  <h4 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 transition-colors duration-300 ${
                    activeValue === idx ? 'text-blue-800' : 'text-blue-800'
                  }`}>
                    {value.title}
                  </h4>
                  
                  <p className="text-sm sm:text-base text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Senthoor RSM Capital Legacy Section */}
        <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-500 mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
              <Star className="w-5 h-5" />
              <span>Senthoor RSM Capital Legacy ✨</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
              For over <span className="text-blue-700 font-bold">12 years</span>, the Senthoor RSM Capital name has been respected for its 
              <span className="text-blue-700 font-bold"> strong values</span>, <span className="text-amber-600 font-bold"> integrity</span>, 
              and <span className="text-blue-700 font-bold"> commitment to society</span>. Guided by the belief in giving back to the community, 
              the Group continues to create businesses that grow through <span className="text-black font-bold">excellence and innovation</span>, 
              while upholding the interests of customers, employees, and society at large.
            </p>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
              Over the years, the Senthoor RSM Capital brand has come to represent more than just financial strength. It stands for 
              <span className="text-blue-700 font-bold"> Trust</span>, <span className="text-amber-600 font-bold"> Quality</span>, 
              <span className="text-blue-700 font-bold"> Ethical Leadership</span>, and <span className="text-amber-600 font-bold">  Respect </span> 
              for every customer we serve.
            </p>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
              Anchored in values and driven by vision, <span className="text-blue-700 font-bold">Senthoor RSM Capital Group</span> is building a future 
              where <span className="text-amber-600 font-bold">growth and responsibility</span> go hand in hand.
            </p>
          </div>
        </div>

        {/* Our Commitments Section */}
        <div className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-500 mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
              <Heart className="w-5 h-5" />
              <span>Our Commitments at Senthoor RSM Capital ✨</span>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Fairness & Customer Care */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-200">
              <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4 text-center">
                Fairness & Customer Care
              </h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                At Senthoor RSM Capital Finance, our customers come first. By eliminating hidden charges, introducing clear and simple loan agreements, 
                and practicing complete transparency, we have built a culture of fairness and trust. We continue to listen, learn, 
                and design solutions that help customers make informed and confident financial decisions.
              </p>
            </div>

            {/* Supporting Small & Medium Businesses */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200">
              <h4 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4 text-center">
                Supporting Small & Medium Businesses
              </h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                Small and medium enterprises are the growth engine of India's economy. We are proud to support them with dedicated 
                lending solutions, including loan overdraft schemes and online payment facilities. Our commitment is to empower 
                entrepreneurs with the resources they need to expand, innovate, and succeed.
              </p>
            </div>

            {/* Affordable Housing Finance */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-200">
              <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4 text-center">
                Affordable Housing Finance
              </h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                Buying a home is one of life's most important milestones. At Senthoor RSM Capital Finance, we make this dream accessible 
                through affordable mortgage products, transparent processes, and personalized guidance. Our loan specialists work 
                closely with customers—whether first-time buyers, modest-income families, or seasoned investors—to find the right 
                option with competitive rates and flexible terms.
              </p>
            </div>

            {/* Commitment to Regulatory Excellence */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200">
              <h4 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4 text-center">
                Commitment to Regulatory Excellence
              </h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                We strongly support responsible regulatory reforms that protect customer interests and bring greater confidence 
                to the lending sector. By aligning with the highest ethical standards, we ensure that our business practices 
                remain fair, transparent, and customer-focused.
              </p>
            </div>

            {/* Closing Statement */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg">
              <p className="text-lg sm:text-xl font-bold">
                💎 At Senthoor RSM Capital Finance, we believe that growth is meaningful only when it is shared—with our customers, communities, and society at large.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-500 mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-1100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
              <Target className="w-5 h-5" />
              <span>Our Vision</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-200 text-center">
              <h4 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">
                Our Vision
              </h4>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                Be the most admired, conglomerate touching the lives of every global citizen while enriching all stake holders
              </p>
            </div>
          </div>
        </div>

        {/* Path to Success Section */}
        <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-500 mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-amber-600 rounded-full text-amber-800 font-medium mb-6 shadow-lg">
              <Star className="w-5 h-5" />
              <span>Path to Success 🌟</span>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200">
              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed text-center mb-6">
                At Senthoor RSM Capital, our journey has always been guided by three eternal lights — <span className="text-blue-700 font-bold">Credibility</span>, 
                <span className="text-amber-600 font-bold"> Reliability</span>, and <span className="text-blue-700 font-bold">Trust</span>. 
                Like the stars aligned in Orion's Belt, shining straight and true in the night sky, we too remain a constant — 
                a source of clarity and direction for every dream entrusted to us.
              </p>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed text-center mb-6">
                The flame of progress within us never fades. It is fueled by the ever-changing hopes of people, inspiring us to adapt, 
                evolve, and move forward with purpose. For us, success is not just measured in milestones, but in the smiles we create, 
                the trust we nurture, and the lives we touch along the way.
              </p>
              
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 sm:p-6 text-white text-center shadow-lg">
                <p className="text-lg sm:text-xl font-bold">
                  💫 Senthoor RSM Capital — where trust becomes tradition, and tradition leads to tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
         </div>
      
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a
          href="https://wa.me/918056312849"
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
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};