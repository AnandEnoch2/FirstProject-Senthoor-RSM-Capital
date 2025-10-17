import React, { useState, useEffect } from 'react';
import { Coins, Calculator, Shield, TrendingUp, FileText, Award, CheckCircle, Zap, Star, Phone, Mail, Clock, Users, Target, ArrowRight, Sparkles, CreditCard, Banknote, PiggyBank, DollarSign, Wallet, Percent, Calendar } from 'lucide-react';

export const GoldFinance = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [goldWeight, setGoldWeight] = useState(50);
  const [goldPurity, setGoldPurity] = useState('22k');
  const [isVisible, setIsVisible] = useState(false);
  const [activeScheme, setActiveScheme] = useState(0);

  // EMI Calculator states
  const [emiLoanAmount, setEmiLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(12);
  const [bankGoldLoanRates, setBankGoldLoanRates] = useState<any[]>([]);
  const [activeBankIndex, setActiveBankIndex] = useState<number | null>(null);
  const [goldLoanFeesIndia, setGoldLoanFeesIndia] = useState<any[]>([]);
  const [goldLoanFeesSouthIndia, setGoldLoanFeesSouthIndia] = useState<any[]>([]);
  const [gokulamSchemes, setGokulamSchemes] = useState([]);    
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
    // Fetch data from WordPress REST API
    fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/gold_loans?orderby=id&order=asc")
      .then((res) => res.json())
      .then((data) => {
        // Map API response to your table structure
        const formattedData = data.map((item) => ({
          lender: item.acf.lender_title, // Post title
          rate: item.acf.interest_rate, // ACF field: Interest Rate
          amount: item.acf.loan_amount, // ACF field: Loan Amount
          color: item.acf.color || "from-gray-500 to-gray-700", // optional color field
          particular: item.acf.particulars, // Assuming 'particular' is the post title
          charge: item.acf.charges || 'N/A', // Replace 'meta.charge' with actual field if using ACF

        
        }));
        setBankGoldLoanRates(formattedData);
      })
      .catch((err) => console.error("Error fetching gold loans:", err));
  }, []);


   useEffect(() => {
    // Fetch Home page data from WordPress
    fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/pages/8")
      .then(res => res.json())
      .then(data => setHomeData(data))
      .catch(err => console.log(err));
  }, []);



  useEffect(() => {
  fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/all_over_india?orderby=id&order=asc")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      const formattedData = data.map((item) => ({
        particular: item.title.rendered,           // Post title
        charge: item.acf?.charges || "N/A",        // ACF field
        region: item.acf?.region


        
      }));
      setGoldLoanFeesIndia(formattedData);  // Make sure this is the correct state
    })
    .catch((err) => console.error("Error fetching gold loans:", err));
}, []);

 useEffect(() => {
  fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/south_india?orderby=id&order=asc")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      const formattedData = data.map((item) => ({
        particular: item.acf?.particulars,           // Post title
        charge: item.acf?.charges || "N/A",        // ACF field
        region: item.acf?.region


        
      }));
      setGoldLoanFeesSouthIndia(formattedData);  // Make sure this is the correct state
    })
    .catch((err) => console.error("Error fetching gold loans:", err));
}, []);

useEffect(() => {
  fetch("https://senthoorrsmcapital.com/wordpress/wp-json/wp/v2/fees_charges?orderby=id&order=asc")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      const formattedData = data.map((item) => ({
        scheme: item.acf?.scheme_loan,                                 // Scheme name
        tenure: [
          item.acf?.tenure_1,
          item.acf?.tenure_2,
          item.acf?.tenure_3
        ].filter(Boolean),                                              // Only include non-empty tenures
        slab: [
          item.acf?.slab_1,
          item.acf?.slab_2,
          item.acf?.slab_3
        ].filter(Boolean),                                              // Only include non-empty slabs
        annualizedRate: item.acf?.annualized_rate || "N/A"             // Default if missing
      }));

      setGokulamSchemes(formattedData);
    })
    .catch((err) => console.error("Error fetching Gokulam schemes:", err));
}, []);



  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScheme((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const bankInterval = setInterval(() => {
      setActiveBankIndex((prev) => (prev + 1) % 8);
    }, 2500);
    return () => clearInterval(bankInterval);
  }, []);

  const getEstimatedLoan = () => {
    const goldRates = { '24k': 6500, '22k': 5900, '18k': 4800 };
    const rate = goldRates[goldPurity as keyof typeof goldRates];
    const maxLoan = (goldWeight * rate * 0.75);
    return Math.min(loanAmount, maxLoan).toLocaleString();
  };

  // EMI Calculation Functions
  const calculateEMI = () => {
    const principal = emiLoanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const numPayments = tenure;
    
    if (monthlyRate === 0) {
      return principal / numPayments;
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return Math.round(emi);
  };

  const calculateTotalAmount = () => {
    return calculateEMI() * tenure;
  };

  const calculateTotalInterest = () => {
    return calculateTotalAmount() - emiLoanAmount;
  };

 
  const features = [
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Get your gold loan approved and disbursed within 30 minutes with minimal documentation and hassle-free procedures.",
      gradient: "from-blue-500 to-indigo-600",
      delay: "delay-100"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your gold is stored in bank-grade security vaults with comprehensive insurance coverage and 24/7 monitoring.",
      gradient: "from-blue-500 to-indigo-600",
      delay: "delay-200"
    },
    {
      icon: TrendingUp,
      title: "Competitive Rates",
      description: "Enjoy some of the most competitive interest rates in the market with transparent pricing and no hidden charges.",
      gradient: "from-blue-500 to-indigo-600",
      delay: "delay-300"
    },
    {
      icon: FileText,
      title: "Flexible Repayment",
      description: "Choose from multiple repayment options including monthly EMI, bullet payment, or partial prepayment facilities.",
      gradient: "from-blue-500 to-indigo-600",
      delay: "delay-400"
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: "No Income Proof Required", color: "text-blue-800" },
    { icon: CheckCircle, text: "Instant Loan Approval", color: "text-blue-800" },
    { icon: CheckCircle, text: "Competitive Interest Rates", color: "text-blue-800" },
    { icon: CheckCircle, text: "Flexible Tenure Options", color: "text-blue-800" },
    { icon: CheckCircle, text: "Safe & Secure Storage", color: "text-blue-800" },
    { icon: CheckCircle, text: "Transparent Pricing", color: "text-blue-800" },
    { icon: CheckCircle, text: "Quick Documentation", color: "text-blue-800" },
    { icon: CheckCircle, text: "Doorstep Service Available", color: "text-blue-800" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-700 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Coins className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Gold Finance Solutions
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">Unlock Your Gold's Value</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed mb-8">
              Get <span className="text-blue-700 font-bold">instant loans against your gold</span> with competitive rates, 
              <span className="text-blue-700 font-bold"> minimal documentation</span>, and 
              <span className="text-amber-600 font-bold">same-day disbursement</span>. Serving all strata of life across Tamil Nadu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+918056312849" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call +91 {homeData?.acf?.phone}</span>
                </span>
              </a>
             
            </div>
          </div>
        </div>
      </section>

      {/* About Gold Loan Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-medium mb-6 shadow-lg">
                <Star className="w-5 h-5" />
                <span>About Gold Loan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
                Understanding Gold Loans
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                  <span className="text-blue-800 font-bold">Gold loan</span> is a secured loan that is offered by the banks and NBFCs against applicant's self-owned gold to be kept as a collateral or security with the lender. Financial institutions offer gold loans by keeping applicant's self-owned <span className="text-blue-700 font-semibold">gold jewellery, coins or ornaments</span> as a collateral or security, which is returned back to the borrower upon timely repayment of loan and in full.
                </p>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                  Usually, a loan secured with gold ornaments is offered for <span className="text-blue-700 font-semibold">short- to medium-term duration</span>. At Senthoor RSM Capital, individuals have an option of accessing Gold loan EMI Calculator to calculate the EMIs in lieu of the loan, that shall further help in <span className="text-blue-700 font-semibold">efficient loan planning and monthly budgeting</span>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800 mb-2">Secured Loan</h4>
                    <p className="text-sm text-slate-600">Your gold acts as collateral, ensuring lower interest rates</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800 mb-2">Short-Medium Term</h4>
                    <p className="text-sm text-slate-600">Flexible tenure options to suit your needs</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800 mb-2">EMI Calculator</h4>
                    <p className="text-sm text-slate-600">Plan your budget with our easy EMI calculator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Loan EMI Calculator Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-600 rounded-full text-blue-800 font-medium mb-6 shadow-lg">
              <Calculator className="w-5 h-5" />
              <span>Gold Loan EMI Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
              Gold Loan EMI Calculator
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Calculate your monthly EMI payments with our advanced gold loan calculator
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* EMI Calculator */}
            <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Calculate Loan EMI</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full"></div>
              </div>

              <div className="space-y-8">
                {/* Loan Amount */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-bold text-slate-700 flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span>Loan Amount</span>
                    </label>
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      <span className="text-blue-700 font-bold">₹{emiLoanAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={emiLoanAmount}
                    onChange={(e) => setEmiLoanAmount(Number(e.target.value))}
                    className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span>₹10K</span>
                    <span>₹50L</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-bold text-slate-700 flex items-center space-x-2">
                      <Percent className="w-5 h-5 text-blue-600" />
                      <span>Interest Rate</span>
                    </label>
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      <span className="text-blue-700 font-bold">{interestRate}%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="36"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span>8%</span>
                    <span>36%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-bold text-slate-700 flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Tenure</span>
                    </label>
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      <span className="text-blue-700 font-bold">{tenure} {tenure === 1 ? 'Month' : 'Months'}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span>1 Month</span>
                    <span>60 Months</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <p className="text-xs text-slate-600 text-center italic">
                  * The EMI calculation is based on interest rate input provided by the user and for illustrative purposes only.
                </p>
              </div>
            </div>

            {/* Results Panel */}
            <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl border border-blue-200 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Loan Summary</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mx-auto"></div>
              </div>

              <div className="space-y-6">
                {/* EMI */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Monthly EMI</p>
                  <p className="text-3xl font-bold text-blue-800">₹{calculateEMI().toLocaleString()}</p>
                </div>

                {/* Interest Payable */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Interest Payable</p>
                  <p className="text-2xl font-bold text-amber-700">₹{calculateTotalInterest().toLocaleString()}</p>
                </div>

                {/* Total Amount Payable */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Total Amount Payable</p>
                  <p className="text-sm text-slate-500">(Principal + Interest)</p>
                  <p className="text-2xl font-bold text-green-700">₹{calculateTotalAmount().toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                
                <a href="tel:+918056312849" className="w-full bg-white border-2 border-blue-600 text-blue-700 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call +91 {homeData?.acf?.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Loan Calculator */}
    <section className="py-16 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Center Wrapper */}
    <div className="flex justify-center">
      <div className="max-w-3xl text-center">
        {/* Heading */}
        <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-12">
          Our Gold Finance Services
        </h3>

        {/* Services List */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 transform transition-all duration-700 ${feature.delay} ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-10 opacity-0'
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 text-left">
                <h4 className="text-2xl font-bold text-blue-800 mb-3 hover:text-blue-700 transition-colors cursor-pointer">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Benefits Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Highlights of Gold Loan Section */}
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-medium mb-6 shadow-lg">
                <Star className="w-5 h-5" />
                <span>Gold Loan Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
                Highlights of Gold Loan
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-800 mb-2 text-lg">Eligibility</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        To apply for this loan with major banks in India, an individual must own gold and should be above 18 years of age and maximum up to 70 years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-800 mb-2 text-lg">Interest Rate</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Most banks and NBFCs in India offer Gold loan interest rate at competitive interest rates with affordable EMIs and flexible repayment options
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Turn Your Gold Ornaments Section */}
          <div className={`bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl mb-16 transform transition-all duration-1000 delay-250 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-6 shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span>Golden Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Turn Your Gold Ornaments into Golden Opportunities
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                  Why let your gold jewelry stay idle when it can work for you?
                </h3>
                <p className="text-base sm:text-lg leading-relaxed opacity-90">
                  With <span className="text-white font-bold">Senthoor RSM Capital Gold Loan</span>, you can unlock instant funds for your personal or business needs — whether it's for 
                  <span className="text-white font-semibold"> medical emergencies</span>, 
                  <span className="text-white font-semibold"> higher studies</span>, 
                  <span className="text-white font-semibold"> business expansion</span>, or 
                  <span className="text-white font-semibold"> agricultural needs</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Gold Loan Eligibility Criteria Section */}
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-medium mb-6 shadow-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Eligibility Criteria</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
                Gold Loan Eligibility Criteria
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200 mb-6">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                  <span className="text-blue-800 font-bold">Senthoor RSM Capital</span> offers gold loan to applicants between the age of 
                  <span className="text-blue-700 font-bold"> 18-70 years</span>. While the lender has not disclosed the eligibility criteria of its gold loan applicants in detail, the lender may also consider the 
                  <span className="text-blue-700 font-bold">weight and purity of gold</span> pledged by the applicant while evaluating the gold loan eligibility of its applicants, just like other lenders do.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-800 mb-3 text-lg">Purity & Quantity</h4>
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-semibold">Purity and weight of gold articles</span> also affect the loan amount offered to you. The bank appraises your gold articles and extends loans against the appraised value. Do note that the 
                      <span className="font-semibold">value of gold articles appraised by the bank might be different from its actual value</span>. This also has an impact on the 
                      <span className="font-semibold">interest rate offered to you</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why is Gold Loan preferred Section */}
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-medium mb-6 shadow-lg">
                <Star className="w-5 h-5" />
                <span>Why Choose Gold Loan?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Why is Gold Loan preferred?
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200 mb-8">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 text-center">
                  To meet the <span className="text-blue-800 font-bold">immediate financial requirements</span>, gold loan is a 
                  <span className="text-blue-800 font-bold"> preferred choice of individuals</span> for several reasons. 
                  Some of those reasons include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Low Interest Rates",
                      description: "As compared to other lending products, such as personal loan, business loan, MSME loan, etc.",
                      gradient: "from-blue-600 to-indigo-700"
                    },
                    {
                      icon: Clock,
                      title: "Flexible Repayment Tenure",
                      description: "That varies from few days to several months",
                      gradient: "from-blue-600 to-indigo-700"
                    },
                    {
                      icon: CreditCard,
                      title: "No Pre-payment Charges",
                      description: "Many financial institutions do not levy pre-payment charges on gold loans",
                      gradient: "from-blue-600 to-indigo-700"
                    },
                    {
                      icon: FileText,
                      title: "Minimal Documentation",
                      description: "With hassle-free process",
                      gradient: "from-blue-600 to-indigo-700"
                    },
                    {
                      icon: Zap,
                      title: "Instant Loan Disbursals",
                      description: "Quick processing and immediate fund transfer",
                      gradient: "from-blue-600 to-indigo-700"
                    }
                  ].map((reason, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                      <div className={`w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <reason.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-800 mb-2 text-lg">{reason.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Why Choose Our Gold Finance?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Experience the best-in-class gold loan services with unmatched benefits
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 text-center group">
                <benefit.icon className={`w-8 h-8 ${benefit.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <p className="font-medium text-slate-700 group-hover:text-blue-800 transition-colors text-sm sm:text-base">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Loan Fees & Charges - All Over India */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-12 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8">
              Gold Loan Fees & Other Charges
            </h3>
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                Fees & Other Charges - All over India
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-blue-300 rounded-2xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Particulars</th>
                      <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goldLoanFeesIndia.map((fee, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors`}>
                        <td className="border border-blue-300 px-6 py-4 font-medium text-slate-700">{fee.particular}</td>
                        <td className="border border-blue-300 px-6 py-4 text-slate-700">{fee.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                Fees & Other Charges - South Indian Branches
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-blue-300 rounded-2xl overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Particulars</th>
                      <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goldLoanFeesSouthIndia.map((fee, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors`}>
                        <td className="border border-blue-300 px-6 py-4 font-medium text-slate-700">{fee.particular}</td>
                        <td className="border border-blue-300 px-6 py-4 text-slate-700 whitespace-pre-line">{fee.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Comparison Table */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 mb-12 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8">
              Gold Loan Interest Rates Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-blue-300 rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Lender</th>
                    <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Gold Loan Interest Rate</th>
                    <th className="border border-blue-300 px-6 py-4 text-left font-bold text-lg">Loan Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bankGoldLoanRates.map((bank, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors ${
                      activeBankIndex === idx ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                    }`}>
                      <td className="border border-blue-300 px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg`}>
                            <Banknote className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-slate-700">{bank.lender}</span>
                        </div>
                      </td>
                      <td className="border border-blue-300 px-6 py-4 font-bold text-green-600">{bank.rate}</td>
                      <td className="border border-blue-300 px-6 py-4 font-medium text-slate-700">{bank.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 italic">
                You can compare the interest rate charged by other banks on gold loans here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Senthoor RSM Capital Gold Loan Schemes */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl mb-12 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-6 shadow-lg">
                <Star className="w-5 h-5" />
                <span>Senthoor RSM Capital Exclusive Schemes</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Senthoor RSM Capital Type of Gold Loan Fees & Charges
              </h3>
              <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
                Choose from our specially designed gold loan schemes with competitive rates and flexible tenure options
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/30 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                <thead>
                  <tr className="bg-white/20 backdrop-blur-sm">
                    <th className="border border-white/30 px-6 py-4 text-left font-bold text-lg text-white">Scheme Loan</th>
                    <th className="border border-white/30 px-6 py-4 text-left font-bold text-lg text-white">Loan Tenure</th>
                    <th className="border border-white/30 px-6 py-4 text-left font-bold text-lg text-white">Slab</th>
                    <th className="border border-white/30 px-6 py-4 text-left font-bold text-lg text-white">Annualized Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {gokulamSchemes.map((scheme, schemeIdx) => (
                    <React.Fragment key={schemeIdx}>
                      {scheme.tenure.map((tenure, tenureIdx) => (
                        <tr key={`${schemeIdx}-${tenureIdx}`} className={`hover:bg-white/10 transition-colors ${
                          activeScheme === schemeIdx ? 'bg-white/15 ring-2 ring-white/30' : ''
                        }`}>
                          {tenureIdx === 0 && (
                            <td 
                              className="border border-white/30 px-6 py-4 font-bold text-white bg-white/10" 
                              rowSpan={scheme.tenure.length}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shadow-lg`}>
                                  <Coins className="w-4 h-4 text-white" />
                                </div>
                                <span>{scheme.scheme}</span>
                              </div>
                            </td>
                          )}
                          <td className="border border-white/30 px-6 py-4 text-white font-medium">{tenure}</td>
                          <td className="border border-white/30 px-6 py-4 text-white font-bold">{scheme.slab[tenureIdx]}</td>
                          {tenureIdx === 0 && (
                            <td 
                              className="border border-white/30 px-6 py-4 font-bold text-white bg-white/10 text-center" 
                              rowSpan={scheme.tenure.length}
                            >
                              {scheme.annualizedRate}
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-white/90 text-sm">
                * Interest rates are subject to change based on market conditions and RBI guidelines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Get your gold loan in just 4 easy steps with minimal documentation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Bring Your Gold", desc: "Visit our branch with your gold jewelry or ornaments", icon: Coins, color: "from-blue-600 to-indigo-700" },
              { step: "02", title: "Gold Assessment", desc: "Our experts evaluate purity and weight using advanced testing", icon: Calculator, color: "from-blue-600 to-indigo-700" },
              { step: "03", title: "Loan Approval", desc: "Get instant approval with competitive interest rates", icon: CheckCircle, color: "from-blue-600 to-indigo-700" },
              { step: "04", title: "Cash Disbursement", desc: "Receive cash immediately or direct bank transfer", icon: CreditCard, color: "from-blue-600 to-indigo-700" }
            ].map((process, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <process.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-slate-700">{process.step}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {process.title}
                </h4>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors">
                  {process.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl text-center transform transition-all duration-1000 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Your Gold Loan?
            </h3>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust us for their gold financing needs. 
              Get instant approval with the best rates in the market.
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
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-bold">30 Minutes</p>
                  <p className="text-sm opacity-80">Quick Processing</p>
                </div>
                <div>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-bold">100% Safe</p>
                  <p className="text-sm opacity-80">Secure Storage</p>
                </div>
                <div>
                  <Award className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-bold">Best Rates</p>
                  <p className="text-sm opacity-80">Competitive Interest</p>
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
