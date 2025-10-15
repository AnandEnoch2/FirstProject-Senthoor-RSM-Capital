import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Calendar, Headphones, Globe } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'gold-finance',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [homeData, setHomeData] = useState<any>(null); // store WP data


  useEffect(() => {
      // Fetch Home page data from WordPress
      fetch("http://localhost/wordpress/wp-json/wp/v2/pages/155")
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

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [
           homeData?.acf?.phone1 ? `+91 ${homeData?.acf?.phone1}` : "",
           homeData?.acf?.phone2 ? `+91 ${homeData?.acf?.phone2}` : "",
           homeData?.acf?.phone3 ? `+91 ${homeData?.acf?.phone3}` : "",
          ],
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Mail,
      title: "Email",
      details: [homeData?.acf?.email || "", homeData?.acf?.email2 ||""],
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: MapPin,
      title: "Address",
      details: [homeData?.acf?.address || "",],
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [homeData?.acf?.business_hours || "", ],
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  const quickStats = [
    { icon: CheckCircle, text: homeData?.acf?.year_of_experience || "", color: "text-green-500" },
    { icon: MessageCircle, text: homeData?.acf?.customers || "", color: "text-blue-500" },
    { icon: Calendar, text: homeData?.acf?.loan_approval || "", color: "text-purple-500" },
    { icon: Headphones, text: homeData?.acf?.customer_support || "", color: "text-orange-500" }
  ];

  return (
    <section id="contact" className="py-20 bg-white relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
         <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
            <Globe className="w-5 h-5" />
            <span>Get In Touch</span>
          </div>
          
         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-4 sm:mb-6 px-4 sm:px-0">
            Let's Start Your
            <span className="block">Financial Journey</span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
           Ready to get started? Contact us today for a <span className="text-blue-700 font-bold">free consultation </span> 
           or to learn more about our <span className="text-amber-600 font-bold">professional services</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <div className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6 sm:mb-8 px-4 lg:px-0">
                Contact Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6 px-4 lg:px-0">
                {contactInfo.map((contact, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 hover:border-blue-500 relative overflow-hidden ${
                      activeContact === idx ? 'ring-4 ring-gray-200' : ''
                    }`}
                  >
                    <div className="relative z-10 flex items-start space-x-3 sm:space-x-4 w-full">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transform transition-all duration-300 ${
                        activeContact === idx ? 'animate-bounce scale-110' : ''
                      }`}>
                        <contact.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-800 text-base sm:text-lg mb-1 sm:mb-2">{contact.title}</h4>
                        {contact.details.map((detail, detailIdx) => (
                          <p key={detailIdx} className="text-slate-600 mb-1 text-sm sm:text-base">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Stats */}
           <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-500 transform transition-all duration-1000 delay-400 mx-4 lg:mx-0 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
             <h4 className="font-bold text-blue-800 text-lg sm:text-xl mb-4 sm:mb-6 text-center">Why Choose Us?</h4>
              <div className="space-y-3 sm:space-y-4">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-white transition-colors group">
                   <stat.icon className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                   <span className="text-slate-700 font-medium group-hover:text-blue-800 transition-colors text-sm sm:text-base">{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className={`lg:col-span-2 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-blue-500 relative overflow-hidden mx-4 lg:mx-0">
              
              <div className="relative z-10">
               <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
                  Send Us a Message
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12">
                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                   <h4 className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4">Message Sent Successfully!</h4>
                    <p className="text-slate-600 text-base sm:text-lg">We'll get back to you within 24 hours with a personalized response.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-bold text-blue-800 mb-2 sm:mb-3">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                         className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 font-medium text-sm sm:text-base"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-blue-800 mb-2 sm:mb-3">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                         className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 font-medium text-sm sm:text-base"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-bold text-blue-800 mb-2 sm:mb-3">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                         className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 font-medium text-sm sm:text-base"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-blue-800 mb-2 sm:mb-3">Service Interested In *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                         className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 font-medium text-sm sm:text-base"
                        >
                          <option value="gold-finance">Gold Finance</option>
                          <option value="property-valuation">Property Valuation</option>
                          <option value="both">Both Services</option>
                          <option value="consultation">General Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2 sm:mb-3">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                       className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:border-blue-500 outline-none transition-all duration-300 resize-none text-slate-800 font-medium text-sm sm:text-base"
                        placeholder="Tell us more about your requirements..."
                      ></textarea>
                    </div>

                    <button
                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Map Section */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-3 sm:p-4 overflow-hidden border border-blue-500 mx-4 sm:mx-0">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                 <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800">Visit Our Office</h4>
                </div>
                <p className="text-slate-600 font-medium text-sm sm:text-base px-2 sm:px-0">{homeData?.acf?.address}</p>
              </div>
              <iframe 
                src={homeData?.acf?.map}
                width="100%" 
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl sm:rounded-2xl sm:h-96 lg:h-[400px]"
                title="Senthoor RSM Capital Location"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <a
            href={homeData?.acf?.whatsapp }
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
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};