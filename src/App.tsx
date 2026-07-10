/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Inquiry, Testimonial, TESTIMONIALS, NEIGHBOURHOODS } from './types';
import Navbar from './components/Navbar';
import { motion } from 'motion/react';
import Hero from './components/Hero';
import ServicesOverview from './components/ServicesOverview';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import BookingConfirmation from './components/BookingConfirmation';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import { 
  Phone, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Star, 
  Flame, 
  ShieldCheck, 
  AlertTriangle,
  Search,
  MessageSquare,
  MessageCircle,
  Wrench,
  X,
  Droplet
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [preselectedService, setPreselectedService] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);
  const [transmissionInquiry, setTransmissionInquiry] = useState<Inquiry | null>(null);
  
  // Emergency Modal Form States
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalAddress, setModalAddress] = useState('');
  const [modalPostcode, setModalPostcode] = useState('');
  const [modalService, setModalService] = useState('Emergency Plumbing');
  const [modalDesc, setModalDesc] = useState('');
  const [modalErrors, setModalErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    postcode?: string;
  }>({});

  // Reset emergency modal form fields when opened/closed
  useEffect(() => {
    if (isBookingModalOpen) {
      setModalName('');
      setModalPhone('');
      setModalEmail('');
      setModalAddress('');
      setModalPostcode('');
      setModalService('Emergency Plumbing');
      setModalDesc('');
      setModalErrors({});
    }
  }, [isBookingModalOpen]);
  
  // Local area search for borough check in London
  const [searchNeighbourhood, setSearchNeighbourhood] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Initialize reviews and inquiry state from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('guru_reviews');
    if (savedReviews) {
      setTestimonials(JSON.parse(savedReviews));
    } else {
      setTestimonials(TESTIMONIALS);
      localStorage.setItem('guru_reviews', JSON.stringify(TESTIMONIALS));
    }

    const savedInquiry = localStorage.getItem('active_plumbing_inquiry');
    if (savedInquiry) {
      setCurrentInquiry(JSON.parse(savedInquiry));
    }
  }, []);

  // Handle adding custom testimonials
  const handleAddTestimonial = (newReview: Omit<Testimonial, 'id' | 'date' | 'verified'>) => {
    const testimonialWithMeta: Testimonial = {
      ...newReview,
      id: Math.random().toString(36).substr(2, 9),
      date: 'Just now',
      verified: true
    };
    const updated = [testimonialWithMeta, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('guru_reviews', JSON.stringify(updated));
  };

  // Handle submitting inquiry / booking emergency plumber
  const handleInquirySubmit = (formData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    // Generate a simulated Gas Safe plumber team to assign
    const names = ['David', 'Alan', 'Christopher', 'Michael', 'Simon'];
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const idNum = Math.floor(100000 + Math.random() * 900000).toString();
    const distance = parseFloat((1.0 + Math.random() * 1.8).toFixed(1));
    const eta = Math.floor(15 + Math.random() * 15);
    
    // Custom plumber avatars for South London crew
    const avatars = [
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=60'
    ];
    const selectedAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newInquiry: Inquiry = {
      ...formData,
      id: 'gp_lead_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending',
      assignedGuru: {
        name: selectedName,
        gasSafeId: idNum,
        avatarUrl: selectedAvatar,
        etaMinutes: eta,
        distanceMiles: distance,
        phone: '07421 495104'
      }
    };

    setIsBookingModalOpen(false);
    setTransmissionInquiry(newInquiry);
  };

  // Complete booking with selected transmission channel
  const completeBooking = (inquiry: Inquiry, method: 'whatsapp' | 'sms' | 'skip') => {
    const formattedMessage = `NEW GURUS PLUMBING BOOKING ALERT!
----------------------------------
Customer Name: ${inquiry.name}
Phone Number: ${inquiry.phone}
Email Address: ${inquiry.email}
Property Address: ${inquiry.address}, ${inquiry.postcode}
Selected Service: ${inquiry.serviceType} (Urgency: ${inquiry.urgency.toUpperCase()})
Preferred Date & Time: ${inquiry.preferredDateTime}
Additional Notes: ${inquiry.description || 'N/A'}`;

    // Log the transmission payload with distinctive styling for debugging and transparency
    console.log(
      `%c[SMS TRANSMITTED TO 07421495104 via ${method.toUpperCase()}]\n\n${formattedMessage}`,
      "color: #ffffff; font-weight: bold; font-size: 13px; border: 2px solid #ff7a00; padding: 12px; border-radius: 8px; background: #0057b8;"
    );

    if (method === 'whatsapp') {
      const waUrl = `https://wa.me/447421495104?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank');
    } else if (method === 'sms') {
      const smsUrl = `sms:+447421495104?body=${encodeURIComponent(formattedMessage)}`;
      window.open(smsUrl, '_blank');
    }

    setCurrentInquiry(inquiry);
    localStorage.setItem('active_plumbing_inquiry', JSON.stringify(inquiry));
    setTransmissionInquiry(null);
    setActiveTab('booking-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel/Reset inquiry and go back to home
  const handleResetInquiry = () => {
    setCurrentInquiry(null);
    localStorage.removeItem('active_plumbing_inquiry');
    setActiveTab('home');
  };

  // Service Area Finder Checker
  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchNeighbourhood.trim();
    if (!query) return;

    const lowerQuery = query.toLowerCase();

    // Check if the query looks like a postcode (contains at least one digit)
    const hasDigits = /\d/.test(query);

    let isMatched = false;

    if (hasDigits) {
      // Validate postcode format (district or full)
      const cleanPostcode = query.toUpperCase().replace(/\s+/g, ' ').trim();
      const fullPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
      const districtPostcodeRegex = /^[A-Z]{1,2}\s?[0-9][A-Z0-9]?$/i;

      const isValidFormat = fullPostcodeRegex.test(cleanPostcode) || districtPostcodeRegex.test(cleanPostcode);

      if (isValidFormat) {
        // Now check if it belongs to SW2 or within a 10-mile radius of SW2
        // SW2 and nearby postcode areas (SW, SE, CR, SM, BR, KT, TW) which are roughly within a 10-mile radius of SW2
        const localPrefixRegex = /^(sw|se|cr|sm|br|kt|tw)(\s|\d|$)/i;
        if (localPrefixRegex.test(cleanPostcode)) {
          isMatched = true;
        }
      }
    } else {
      // If no digits, check if it matches a local SW2 neighborhood (Brixton, Streatham, Dulwich, etc.)
      const matchedNeighbourhood = NEIGHBOURHOODS.some(
        (n) => n.toLowerCase().includes(lowerQuery) || lowerQuery.includes(n.toLowerCase())
      );

      // Other keywords specifically within 10 miles of SW2
      const sw2RadiusKeywords = [
        'sw2', 'brixton', 'clapham', 'streatham', 'dulwich', 'herne hill',
        'balham', 'tooting', 'stockwell', 'tulse hill', 'camberwell', 'battersea',
        'wandsworth', 'lambeth', 'southwark', 'peckham', 'kennington', 'vauxhall',
        'croydon', 'merton', 'sutton', 'richmond', 'kingston'
      ];

      const matchedKeyword = sw2RadiusKeywords.some(keyword => lowerQuery.includes(keyword));

      if (matchedNeighbourhood || matchedKeyword) {
        isMatched = true;
      }
    }

    if (isMatched) {
      setSearchResult(`✅ Yes! We have active 24/7 plumbers stationed in or near "${query}". Dispatch available immediately!`);
    } else {
      setSearchResult(`❌ No, we don't serve "${query}". We only serve areas within a 10-mile radius of SW2 (Brixton Hill)!`);
    }
  };

  // Utility to handle preselected service click and scroll
  const handleBookServiceClick = (serviceName: string) => {
    setPreselectedService(serviceName);
    setActiveTab('contact');
    
    // Smooth scroll down to the contact booking form
    setTimeout(() => {
      const contactFormElement = document.getElementById('contact-booking-form-section');
      if (contactFormElement) {
        contactFormElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative">
      
      {/* Navbar Integration */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setIsBookingModalOpen(true)} 
      />

      {/* Floating Active Booking Notification Bar */}
      {currentInquiry && activeTab !== 'booking-confirmation' && (
        <div className="bg-emerald-500 text-white py-3 px-4 shadow-md sticky top-[69px] z-30">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold animate-pulse-subtle">
              <CheckCircle className="w-4.5 h-4.5 text-white shrink-0" />
              <span>Your booking inquiry has been recorded. Reference: GP-{currentInquiry.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <button
              onClick={() => setActiveTab('booking-confirmation')}
              className="bg-white text-emerald-600 hover:bg-slate-50 font-black px-3.5 py-1.5 rounded-lg text-xs tracking-tight shadow-sm transition-all cursor-pointer"
            >
              View Booking Details
            </button>
          </div>
        </div>
      )}

      {/* Main Container Content */}
      <main className="flex-grow">
        
        {/* Render Tab Views dynamically with smooth visual focus */}
        {activeTab === 'booking-confirmation' && currentInquiry && (
          <BookingConfirmation inquiry={currentInquiry} onReset={handleResetInquiry} />
        )}

        {activeTab === 'booking-confirmation' && !currentInquiry && (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
            <ShieldAlert className="w-16 h-16 text-slate-300 mx-auto" />
            <h2 className="font-display text-2xl font-bold text-slate-800">No Active Bookings</h2>
            <p className="text-sm text-slate-500">You currently do not have any active booking or gas callout inquiries on this device.</p>
            <button 
              onClick={() => setActiveTab('home')} 
              className="bg-brand-blue text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm cursor-pointer"
            >
              Return Home
            </button>
          </div>
        )}

        {activeTab === 'home' && (
          <>
            {/* Core Hero Section */}
            <Hero 
              onEmergencyClick={() => setIsBookingModalOpen(true)} 
              onExploreServicesClick={() => handleBookServiceClick('')}
            />

            {/* Quick Diagnostic Offer Strip */}
            <div className="bg-white py-6 border-b border-slate-100 shadow-sm relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-tight">The Guru Guarantee — Transparent Estimates</h3>
                    <p className="text-xs text-slate-500">We operate with completely transparent estimates and clear updates. No hidden mileage, no surprise callout charges, and no night-shift premiums.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a 
                    href="tel:+447421495104" 
                    className="bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:bg-emerald-600 transition-colors"
                  >
                    Speak to Engineer (Free Advice)
                  </a>
                </div>
              </div>
            </div>

            {/* Why Choose Gas & Plumbing Gurus Section */}
            <section id="why-choose-us" className="py-36 sm:py-48 bg-white relative overflow-hidden">
              <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-orange/10 blur-[130px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-6 sm:px-8 text-left">
                <div className="max-w-4xl mb-20 sm:mb-28">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-black tracking-widest text-brand-orange uppercase mb-4"
                  >
                    WHY CHOOSE US
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-brand-dark tracking-tighter leading-none"
                  >
                    Reliable local gas-safe engineers you can depend on.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 mt-6 text-xl sm:text-2xl font-semibold"
                  >
                    Stationed right in Brixton Hill, we provide fast, correct, and professional heating and plumbing solutions.
                  </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
                  {/* Card 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="bg-brand-light p-10 rounded-3xl border border-slate-100 space-y-6 shadow-md glow-card-orange"
                  >
                    <div className="bg-brand-orange/10 text-brand-orange w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                      <Clock className="w-6 h-6 animate-pulse-subtle" />
                    </div>
                    <h3 className="font-extrabold text-2xl text-brand-dark leading-tight">45 Min Response</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Our response vehicles are pre-packed and localized around Brixton Hill to arrive under 45 minutes on emergency boiler shutoffs and water leaks.
                    </p>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="bg-brand-light p-10 rounded-3xl border border-slate-100 space-y-6 shadow-md glow-card-blue"
                  >
                    <div className="bg-brand-blue/10 text-brand-blue w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-2xl text-brand-dark leading-tight">Gas Safe Verified</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Every engineer carries physical Gas Safe badges (#618290) and has up to £5M in comprehensive public liability insurance.
                    </p>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="bg-brand-light p-10 rounded-3xl border border-slate-100 space-y-6 shadow-md glow-card-blue"
                  >
                    <div className="bg-emerald-500/10 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-2xl text-brand-dark leading-tight">Transparent Quotes</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Clear upfront diagnostics with absolute transparency. You will know and approve the exact quote before we touch a tool.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Interactive Services Selector */}
            <ServicesOverview onBookService={handleBookServiceClick} />

            {/* Live SW2 10-Mile Radius Postcode Coverage Checker Section */}
            <section id="coverage-checker" className="py-36 sm:py-48 bg-gradient-to-b from-[#070b19] via-[#0e1735] to-[#070b19] text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue/35 blur-[150px]" />
              </div>

              <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-12 relative z-10">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs font-black tracking-widest text-brand-orange uppercase"
                >
                  SERVICE COVERAGE CHECKER
                </motion.p>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none"
                >
                  Are We Active in <span className="text-brand-orange">Your Area?</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-medium"
                >
                  We serve SW2 (Brixton Hill) and locations within a strict 10-mile radius. Enter your neighborhood or postcode below to check live on-duty coverage status.
                </motion.p>

                {/* Search Form with Glowing Border */}
                <motion.form 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleCheckArea} 
                  className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 bg-slate-900/60 p-4 rounded-3xl border border-brand-blue/50 shadow-[0_0_35px_rgba(0,98,255,0.3)] focus-within:border-brand-orange/80 focus-within:shadow-[0_0_45px_rgba(255,69,0,0.4)] transition-all"
                >
                  <div className="relative flex-grow flex items-center">
                    <MapPin className="absolute left-4 w-5 h-5 text-brand-orange animate-bounce" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brixton, SW2, Dulwich, Clapham..."
                      value={searchNeighbourhood}
                      onChange={(e) => setSearchNeighbourhood(e.target.value)}
                      className="w-full bg-transparent border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-0 text-white placeholder-slate-400 font-bold"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-brand-orange/30 transition-all cursor-pointer shrink-0"
                  >
                    Check Location
                  </motion.button>
                </motion.form>

                {/* Search Result */}
                {searchResult && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm sm:text-base bg-[#0c142e] border-2 border-brand-orange/40 p-5 rounded-2xl max-w-xl mx-auto font-extrabold text-slate-100 animate-pulse-subtle shadow-2xl"
                  >
                    {searchResult}
                  </motion.p>
                )}
              </div>
            </section>

            {/* Testimonials Review Portal */}
            <Testimonials 
              testimonials={testimonials} 
              onAddTestimonial={handleAddTestimonial} 
            />

            {/* Core Dispatch Booking Form at Bottom */}
            <ContactForm 
              onSubmitInquiry={handleInquirySubmit} 
              preselectedService={preselectedService} 
            />
          </>
        )}

        {activeTab === 'services' && (
          <div className="bg-brand-light py-6">
            <ServicesOverview onBookService={handleBookServiceClick} />
            
            {/* Call to Action Box inside Services */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <div className="bg-brand-dark text-white p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <h3 className="font-display text-xl font-extrabold">Need a Custom Maintenance Project Quote?</h3>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  From commercial gas system servicing to complete luxury bathroom pipe installations, our engineering team handles medium to large renovations with premium quality standards.
                </p>
                <div className="pt-2">
                  <a
                    href="tel:+447421495104"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-xl shadow-md text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>07421 495104</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* About Page Hero */}
            <div className="bg-brand-dark text-white py-16 text-center">
              <div className="max-w-4xl mx-auto px-4 space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Our Heritage</span>
                <h1 className="font-display text-4xl font-extrabold tracking-tight">The Plumbing & Heating Experts of Brixton Hill</h1>
                <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                  Discover why thousands of property owners, estate agents, and commercial units trust Gas & Plumbing Gurus LTD for immediate repairs and premium boiler works.
                </p>
              </div>
            </div>

            <AboutUs />

            {/* Gas Safe Registration Notice Badge board */}
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="bg-emerald-50 border border-emerald-100/80 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-left">
                <div className="bg-emerald-600 text-white p-3.5 rounded-xl shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-emerald-900 uppercase tracking-tight">Accreditation Verified — Gas Safe Registered #618290</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    By law, any domestic boiler, gas hobs, or heating maintenance works in the UK must be conducted by Gas Safe registered professionals. Our registration is active, compliant, and we always provide physical credentials upon entering your property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white">
            <Testimonials 
              testimonials={testimonials} 
              onAddTestimonial={handleAddTestimonial} 
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="bg-brand-light">
            {/* Contact Header */}
            <div className="bg-brand-dark text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4 space-y-2">
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Available 24/7</span>
                <h1 className="font-display text-3xl font-extrabold tracking-tight">Direct Dispatch & Quote Request</h1>
                <p className="text-slate-300 text-xs sm:text-sm">Get immediate answers. Typical telephone answer time is under 10 seconds.</p>
              </div>
            </div>

            <ContactForm 
              onSubmitInquiry={handleInquirySubmit} 
              preselectedService={preselectedService} 
            />
          </div>
        )}

      </main>

      {/* Footer Integration */}
      <Footer 
        setActiveTab={setActiveTab} 
        openBookingModal={() => setIsBookingModalOpen(true)} 
      />

      {/* MOBILE ONLY Sticky Call Now conversions bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2.5 md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+447421495104"
            id="mobile-sticky-call"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[11px] py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 animate-pulse-subtle" />
            <span>Call 24/7</span>
          </a>
          <a
            href="https://wa.me/447421495104?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20heating%20or%20plumbing%20services."
            target="_blank"
            rel="noreferrer"
            id="mobile-sticky-whatsapp"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-[11px] py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <button
            id="mobile-sticky-book"
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-[11px] py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer transition-all active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Book Online</span>
          </button>
        </div>
      </div>

      {/* Overlay modal box: Instant Emergency Dispatch */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-dark/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full overflow-hidden relative"
          >
            
            {/* Header */}
            <div className="bg-brand-dark text-white p-6 flex justify-between items-center text-left">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                  <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Priority Dispatch
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold mt-1.5 text-white">Emergency Booking</h3>
              </div>
              <button
                id="close-booking-modal"
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
              <div className="bg-red-50/70 border border-red-100/60 p-4 rounded-2xl flex gap-3 text-left">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-900 uppercase">Safety Guidelines</p>
                  <p className="text-[11px] text-red-700 leading-relaxed mt-0.5">
                    If you smell gas, turn off the mains and step outdoors. If water is flooding, locate and isolate your main stopcock.
                  </p>
                </div>
              </div>

              {/* Booking Form Overlay Wrapper */}
              <div className="text-left">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  
                  const validateEmail = (emailStr: string): boolean => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
                  };

                  const validatePhone = (phoneStr: string): boolean => {
                    const clean = phoneStr.replace(/[\s-()]/g, '');
                    return /^(?:(?:\+44|0)\s?7\d{9}|(?:\+44|0)\s?[123589]\d{8,9})$/.test(clean);
                  };

                  const validatePostcode = (pcStr: string): boolean => {
                    return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(pcStr.trim());
                  };

                  const errors: typeof modalErrors = {};

                  if (modalName.trim().length < 2) {
                    errors.name = 'Name must be at least 2 characters';
                  }
                  if (!modalPhone.trim()) {
                    errors.phone = 'Phone number is required';
                  } else if (!validatePhone(modalPhone)) {
                    errors.phone = 'Please enter a valid UK phone number (e.g. 07700 900077)';
                  }
                  if (!modalEmail.trim()) {
                    errors.email = 'Email address is required';
                  } else if (!validateEmail(modalEmail)) {
                    errors.email = 'Please enter a valid email address';
                  }
                  if (modalAddress.trim().length < 5) {
                    errors.address = 'Street address must be at least 5 characters';
                  }
                  if (!modalPostcode.trim()) {
                    errors.postcode = 'Postcode is required';
                  } else if (!validatePostcode(modalPostcode)) {
                    errors.postcode = 'Please enter a valid UK postcode (e.g. SW2 1HD)';
                  }

                  if (Object.keys(errors).length > 0) {
                    setModalErrors(errors);
                    return;
                  }

                  handleInquirySubmit({
                    name: modalName,
                    phone: modalPhone,
                    email: modalEmail,
                    address: modalAddress,
                    postcode: modalPostcode.toUpperCase(),
                    serviceType: modalService,
                    urgency: 'emergency',
                    preferredDateTime: 'Immediate Emergency Dispatch (Under 45 Mins)',
                    description: modalDesc || 'Urgent plumbing emergency callout requested.'
                  });
                }} className="space-y-4">
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Your Name *</label>
                      <input
                        name="modal_name"
                        required
                        type="text"
                        value={modalName}
                        onChange={(e) => {
                          setModalName(e.target.value);
                          if (modalErrors.name && e.target.value.trim().length >= 2) {
                            setModalErrors(prev => ({ ...prev, name: undefined }));
                          }
                        }}
                        placeholder="Sarah Jenkins"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                          modalErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                        }`}
                      />
                      {modalErrors.name && (
                        <p className="text-red-500 text-[11px] mt-1 font-bold">⚠️ {modalErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Email Address *</label>
                      <input
                        name="modal_email"
                        required
                        type="email"
                        value={modalEmail}
                        onChange={(e) => {
                          setModalEmail(e.target.value);
                          const validateEmail = (emailStr: string): boolean => {
                            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
                          };
                          if (modalErrors.email && validateEmail(e.target.value)) {
                            setModalErrors(prev => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="sarah@example.com"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                          modalErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                        }`}
                      />
                      {modalErrors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-bold">⚠️ {modalErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Mobile Phone *</label>
                      <input
                        name="modal_phone"
                        required
                        type="tel"
                        value={modalPhone}
                        onChange={(e) => {
                          setModalPhone(e.target.value);
                          const validatePhone = (phoneStr: string): boolean => {
                            const clean = phoneStr.replace(/[\s-()]/g, '');
                            return /^(?:(?:\+44|0)\s?7\d{9}|(?:\+44|0)\s?[123589]\d{8,9})$/.test(clean);
                          };
                          if (modalErrors.phone && validatePhone(e.target.value)) {
                            setModalErrors(prev => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="07700 900077"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                          modalErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                        }`}
                      />
                      {modalErrors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-bold">⚠️ {modalErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Postcode (SW2 10-Mile Radius) *</label>
                      <input
                        name="modal_postcode"
                        required
                        type="text"
                        value={modalPostcode}
                        onChange={(e) => {
                          setModalPostcode(e.target.value);
                          const validatePostcode = (pcStr: string): boolean => {
                            return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(pcStr.trim());
                          };
                          if (modalErrors.postcode && validatePostcode(e.target.value)) {
                            setModalErrors(prev => ({ ...prev, postcode: undefined }));
                          }
                        }}
                        placeholder="SW2 1HD"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                          modalErrors.postcode ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                        }`}
                      />
                      {modalErrors.postcode && (
                        <p className="text-red-500 text-[11px] mt-1 font-bold">⚠️ {modalErrors.postcode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Street Address *</label>
                    <input
                      name="modal_address"
                      required
                      type="text"
                      value={modalAddress}
                      onChange={(e) => {
                        setModalAddress(e.target.value);
                        if (modalErrors.address && e.target.value.trim().length >= 5) {
                          setModalErrors(prev => ({ ...prev, address: undefined }));
                        }
                      }}
                      placeholder="12 High Street, Brixton"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                        modalErrors.address ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                      }`}
                    />
                    {modalErrors.address && (
                      <p className="text-red-500 text-[11px] mt-1 font-bold">⚠️ {modalErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Active Issue Type</label>
                    <select
                      name="modal_service"
                      value={modalService}
                      onChange={(e) => setModalService(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-blue h-[46px] transition-all"
                    >
                      <option value="Emergency Plumbing">Emergency Plumbing ( severe leaks / blockages )</option>
                      <option value="Boiler Repairs & Servicing">Boiler Breakdown & Fast Repair</option>
                      <option value="Leak Detection & Pipe Repairs">Mystery Water Leak Detection</option>
                      <option value="Boiler Installation">New Boiler Installation Quote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Describe Issue (Optional)</label>
                    <textarea
                      name="modal_desc"
                      rows={2}
                      value={modalDesc}
                      onChange={(e) => setModalDesc(e.target.value)}
                      placeholder="e.g. Toilet tank leaking on floor, need isolation quickly..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Locate Nearest Plumber Now</span>
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Direct Call Alternative */}
              <div className="border-t border-slate-100 pt-4 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or, call the dispatcher directly</p>
                <a
                  href="tel:+447421495104"
                  className="inline-flex items-center gap-1.5 mt-2 text-emerald-600 hover:text-emerald-700 font-extrabold text-sm"
                >
                  <Phone className="w-3.5 h-3.5 animate-bounce" />
                  <span>07421 495104 (Priority Hotline)</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* Dynamic Transmission / Dispatch Overlay Choice Modal */}
      {transmissionInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-dark/75 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full overflow-hidden relative text-left"
          >
            {/* Header with high contrast success style */}
            <div className="bg-brand-dark text-white p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue rounded-bl-full opacity-10 pointer-events-none" />
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Step 1 of 2 Complete</p>
                  <h3 className="font-display text-xl font-extrabold text-white">Booking Recorded</h3>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-800">Final Step: Transmit Booking Details</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose how to instantly dispatch this booking to our engineering dispatcher at <strong className="text-slate-800 font-mono">07421 495104</strong>. This launches your message pre-written with who, what, and at what time.
                </p>
              </div>

              {/* Autogenerated Message Text Preview box */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 font-mono text-[11px] text-slate-600 leading-relaxed relative">
                <span className="absolute top-3 right-3 text-[9px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100 uppercase tracking-wider select-none">
                  Pre-filled payload
                </span>
                <p className="whitespace-pre-line leading-relaxed">
                  {`NEW GURUS PLUMBING BOOKING ALERT!
----------------------------------
Customer Name: ${transmissionInquiry.name}
Phone Number: ${transmissionInquiry.phone}
Property Address: ${transmissionInquiry.address}, ${transmissionInquiry.postcode}
Selected Service: ${transmissionInquiry.serviceType} (Urgency: ${transmissionInquiry.urgency.toUpperCase()})
Preferred Date & Time: ${transmissionInquiry.preferredDateTime}`}
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 gap-3">
                {/* Option 1: WhatsApp */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => completeBooking(transmissionInquiry, 'whatsapp')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-500/10 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2.5 rounded-xl shrink-0">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black">Option A: Send via WhatsApp</p>
                      <p className="text-[11px] text-emerald-100">Autocomposes WhatsApp to 07421 495104</p>
                    </div>
                  </div>
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <span className="text-xs font-bold font-mono">⚡ Instant</span>
                  </div>
                </motion.button>

                {/* Option 2: SMS Mobile Messages */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => completeBooking(transmissionInquiry, 'sms')}
                  className="bg-brand-blue hover:bg-brand-blue/95 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-brand-blue/10 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2.5 rounded-xl shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black">Option B: Send via Text Message / SMS</p>
                      <p className="text-[11px] text-blue-100">Autocomposes SMS text to 07421 495104</p>
                    </div>
                  </div>
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <span className="text-xs font-bold font-mono">💬 Mobile</span>
                  </div>
                </motion.button>
              </div>

              {/* Bypass/Skip link button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => completeBooking(transmissionInquiry, 'skip')}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold transition-colors underline cursor-pointer"
                >
                  Skip messaging & view booking details
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}

      {/* 24/7 AI Plumbing Chatbot */}
      <AIChatbot />

    </div>
  );
}
