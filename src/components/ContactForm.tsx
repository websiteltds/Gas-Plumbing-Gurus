/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { 
  Phone, Calendar, Clock, MessageSquare, ShieldAlert, CheckCircle, 
  User, MapPin, Wrench, Sparkles, ArrowRight, ArrowLeft, Flame, Droplets, ShieldCheck, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  preselectedService?: string;
}

const SERVICES_LIST = [
  {
    id: 'Emergency Plumbing',
    title: 'Emergency Plumbing',
    desc: 'Burst pipes, active leaks, or immediate water isolate',
    icon: ShieldAlert,
    color: 'border-red-100 bg-red-50/30 text-red-600',
    activeColor: 'ring-2 ring-red-500 border-red-500 bg-red-50/60 text-red-700'
  },
  {
    id: 'Boiler Repairs & Servicing',
    title: 'Boiler Repair & Service',
    desc: 'No heating/hot water, pilot issues, fast fix',
    icon: Flame,
    color: 'border-amber-100 bg-amber-50/30 text-amber-600',
    activeColor: 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/60 text-amber-700'
  },
  {
    id: 'Boiler Installation',
    title: 'New Boiler Install',
    desc: 'A-rated premium boiler upgrades with multi-year warranty',
    icon: Sparkles,
    color: 'border-blue-100 bg-blue-50/30 text-brand-blue',
    activeColor: 'ring-2 ring-brand-blue border-brand-blue bg-blue-50/60 text-brand-blue-700'
  },
  {
    id: 'Leak Detection & Pipe Repairs',
    title: 'Leak Detection',
    desc: 'Thermal camera tracking, pressure tests, pipe repair',
    icon: Droplets,
    color: 'border-cyan-100 bg-cyan-50/30 text-cyan-600',
    activeColor: 'ring-2 ring-cyan-500 border-cyan-500 bg-cyan-50/60 text-cyan-700'
  },
  {
    id: 'General Plumbing Maintenance',
    title: 'General Maintenance',
    desc: 'Taps, toilets, pipe repairs, general plumbing projects',
    icon: Wrench,
    color: 'border-slate-100 bg-slate-50/50 text-slate-600',
    activeColor: 'ring-2 ring-slate-800 border-slate-800 bg-slate-100 text-slate-900'
  }
];

export default function ContactForm({ onSubmitInquiry, preselectedService = '' }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [serviceType, setServiceType] = useState('Emergency Plumbing');
  const [urgency, setUrgency] = useState<'emergency' | 'high' | 'standard'>('emergency');
  const [preferredDateTime, setPreferredDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Validation errors state
  const [errors, setErrors] = useState<{
    address?: string;
    postcode?: string;
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  // Sync preselected service from parents
  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
      if (preselectedService === 'Emergency Plumbing') {
        setUrgency('emergency');
      } else {
        setUrgency('high');
      }
    }
  }, [preselectedService]);

  // Handle auto preferred timing values based on urgency
  useEffect(() => {
    if (urgency === 'emergency') {
      setPreferredDateTime('Immediate Dispatch (Under 45 Mins)');
    } else if (urgency === 'high') {
      setPreferredDateTime('Same-Day Urgent Visit');
    } else {
      if (preferredDateTime === 'Immediate Dispatch (Under 45 Mins)' || preferredDateTime === 'Same-Day Urgent Visit') {
        setPreferredDateTime('');
      }
    }
  }, [urgency]);

  // Regex Helpers
  const validateEmail = (emailStr: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr.trim());
  };

  const validatePhone = (phoneStr: string): boolean => {
    // Standard UK phone validation (allows +44 or 0, followed by optional spaces and 9-11 digits)
    const clean = phoneStr.replace(/[\s-()]/g, '');
    const regex = /^(?:(?:\+44|0)\s?7\d{9}|(?:\+44|0)\s?[123589]\d{8,9})$/;
    return regex.test(clean);
  };

  const validatePostcode = (pcStr: string): boolean => {
    const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    return regex.test(pcStr.trim());
  };

  const validateStep = (currentStep: number, updateErrors = false): boolean => {
    const newErrors: typeof errors = {};

    if (currentStep === 1) {
      // Step 1 has serviceType which is pre-selected & interactive, always valid
    }
    if (currentStep === 2) {
      if (address.trim().length < 5) {
        newErrors.address = 'Please enter a valid street address (minimum 5 characters)';
      }
      if (!postcode.trim()) {
        newErrors.postcode = 'Postcode is required';
      } else if (!validatePostcode(postcode)) {
        newErrors.postcode = 'Please enter a valid UK postcode (e.g. SW2 1HD)';
      }
    }
    if (currentStep === 3) {
      if (name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Please enter a valid UK mobile or landline number (e.g. 07700 900077)';
      }
      if (!email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
      }
    }

    if (updateErrors) {
      setErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step, true)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1, true) || !validateStep(2, true) || !validateStep(3, true)) {
      // Find which step has errors and jump to it
      if (!validateStep(2)) {
        setStep(2);
      } else if (!validateStep(3)) {
        setStep(3);
      }
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      onSubmitInquiry({
        name,
        phone,
        email,
        address,
        postcode: postcode.toUpperCase(),
        serviceType,
        urgency,
        preferredDateTime: preferredDateTime || 'As soon as possible',
        description: description || `Booking for ${serviceType}`
      });
      setSubmitting(false);
      // Reset State
      setStep(1);
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setPostcode('');
      setPreferredDateTime('');
      setDescription('');
      setErrors({});
    }, 1500);
  };

  return (
    <section id="contact-booking-form-section" className="py-36 sm:py-48 bg-brand-light relative overflow-hidden">
      {/* Background visual light elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Simplified Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28 space-y-4">
          <span className="text-xs font-black tracking-widest text-brand-orange uppercase bg-brand-orange/10 px-5 py-2 rounded-full inline-block">
            FAST DISPATCH SYSTEM
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-brand-dark tracking-tighter leading-none">
            Book Certified Engineers
          </h2>
          <p className="text-slate-600 text-xl sm:text-2xl font-semibold max-w-2xl mx-auto">
            Complete our simple 3-step booking to match with an active Gas Safe professional near you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Premium Real-Time Booking Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-brand-dark text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-slate-800 text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue rounded-bl-full opacity-10 pointer-events-none" />
              
              <h3 className="font-display text-lg font-bold tracking-tight mb-4 flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                <span>Booking Summary</span>
              </h3>

              <div className="space-y-4 text-xs">
                {/* Step 1 Preview */}
                <div className="border-b border-slate-800 pb-3.5 space-y-2">
                  <p className="text-slate-400 font-bold">1. Service & Urgency</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{serviceType || 'Not selected'}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      urgency === 'emergency' 
                        ? 'bg-red-950 text-red-400 border border-red-900/60' 
                        : urgency === 'high' 
                        ? 'bg-amber-950 text-amber-400 border border-amber-900/60' 
                        : 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                    }`}>
                      {urgency}
                    </span>
                  </div>
                </div>

                {/* Step 2 Preview */}
                <div className="border-b border-slate-800 pb-3.5 space-y-2">
                  <p className="text-slate-400 font-bold">2. Location & Schedule</p>
                  {address || postcode ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
                        <span className="truncate">{address} {postcode && `, ${postcode.toUpperCase()}`}</span>
                      </p>
                      <p className="text-[11px] text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{preferredDateTime || 'As soon as possible'}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Enter location details...</p>
                  )}
                </div>

                {/* Step 3 Preview */}
                <div className="space-y-2">
                  <p className="text-slate-400 font-bold">3. Contact Person</p>
                  {name || phone || email ? (
                    <div className="space-y-1 text-left">
                      {name && (
                        <p className="font-semibold text-slate-200 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{name}</span>
                        </p>
                      )}
                      {phone && (
                        <p className="text-slate-300 font-mono text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{phone}</span>
                        </p>
                      )}
                      {email && (
                        <p className="text-slate-400 font-mono text-[10px] break-all flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{email}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Enter contact details...</p>
                  )}
                </div>

                {/* Live Estimator Note */}
                <div className="bg-slate-900/40 rounded-xl p-3.5 border border-slate-800 space-y-1.5 mt-2 text-left">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>No Call-Out Fee</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    You only approve transparent pricing before work begins. Immediate diagnostic guarantees are valid throughout the SW2 10-mile radius.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Hotline Helper */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3.5 text-left">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Need Immediate Help?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip the steps and dial our direct hotline for active plumber dispatch within 45 minutes.
              </p>
              <a
                href="tel:+447421495104"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-sm"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>07421 495104</span>
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form Card */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden relative">
              
              {/* Progress Bar */}
              <div className="h-1 bg-slate-100 w-full relative">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 bg-brand-blue"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Form Content Wrapper */}
              <div className="p-6 sm:p-10">
                {/* Step Headers */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase">Step {step} of 3</span>
                    <h3 className="font-display text-xl font-extrabold text-brand-dark tracking-tight mt-0.5">
                      {step === 1 && "Select Service & Urgency"}
                      {step === 2 && "Location & Schedule"}
                      {step === 3 && "Contact & Submit Details"}
                    </h3>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(s => (
                      <div 
                        key={s} 
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          s === step ? 'bg-brand-blue scale-110' : s < step ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Interactive Service Grid Selector */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Choose Service Required</label>
                          <div className="grid sm:grid-cols-2 gap-3.5">
                            {SERVICES_LIST.map((srv) => {
                              const SrvIcon = srv.icon;
                              const isSelected = serviceType === srv.id;
                              return (
                                <button
                                  key={srv.id}
                                  type="button"
                                  onClick={() => setServiceType(srv.id)}
                                  className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                                    isSelected 
                                      ? srv.activeColor + ' shadow-md scale-[1.01]' 
                                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                                  }`}
                                >
                                  <div className={`p-2.5 rounded-xl shrink-0 ${
                                    isSelected ? 'bg-white shadow-sm' : srv.color
                                  }`}>
                                    <SrvIcon className="w-5 h-5" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-slate-900">{srv.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-normal">{srv.desc}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Urgency Selector */}
                        <div className="space-y-3 pt-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase">Urgency Level</label>
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setUrgency('emergency')}
                              className={`p-3.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer flex flex-col items-center gap-1.5 ${
                                urgency === 'emergency'
                                  ? 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100'
                                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                              <span>Emergency</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUrgency('high')}
                              className={`p-3.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer flex flex-col items-center gap-1.5 ${
                                urgency === 'high'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200 ring-2 ring-amber-100'
                                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                              <span>Urgent</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUrgency('standard')}
                              className={`p-3.5 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer flex flex-col items-center gap-1.5 ${
                                urgency === 'standard'
                                  ? 'bg-blue-50 text-brand-blue border-blue-200 ring-2 ring-blue-100'
                                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                              <span>Standard</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-12 gap-4">
                          {/* Street Address */}
                          <div className="sm:col-span-8 text-left">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>Street Address *</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                                if (errors.address && e.target.value.trim().length >= 5) {
                                  setErrors(prev => ({ ...prev, address: undefined }));
                                }
                              }}
                              placeholder="e.g. 45 Brixton Hill, SW2 Area"
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                                errors.address ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                              }`}
                            />
                            {errors.address && (
                              <p className="text-red-500 text-[11px] mt-1.5 font-bold flex items-center gap-1">
                                <span>⚠️</span> {errors.address}
                              </p>
                            )}
                          </div>

                          {/* London Postcode */}
                          <div className="sm:col-span-4 text-left">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                              <span>Postcode *</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={postcode}
                              onChange={(e) => {
                                setPostcode(e.target.value);
                                if (errors.postcode && validatePostcode(e.target.value)) {
                                  setErrors(prev => ({ ...prev, postcode: undefined }));
                                }
                              }}
                              placeholder="e.g. SW2 1HD"
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                                errors.postcode ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                              }`}
                            />
                            {errors.postcode && (
                              <p className="text-red-500 text-[11px] mt-1.5 font-bold flex items-center gap-1">
                                <span>⚠️</span> {errors.postcode}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Preferred Date and Time Input */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Preferred Arrival Window / Date</span>
                          </label>
                          <input
                            type="text"
                            value={preferredDateTime}
                            onChange={(e) => setPreferredDateTime(e.target.value)}
                            placeholder={
                              urgency === 'emergency' 
                                ? 'Immediate Dispatch (Under 45 Mins)' 
                                : urgency === 'high'
                                ? 'Same-Day Urgent Visit'
                                : 'e.g. Tomorrow at 10am, or Saturday afternoon'
                            }
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all"
                          />
                          <p className="text-[11px] text-slate-400 mt-1.5">
                            For standard visits, we confirm a precise 1-hour slot via SMS so you do not wait all day.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="text-left">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span>Your Full Name *</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name && e.target.value.trim().length >= 2) {
                                  setErrors(prev => ({ ...prev, name: undefined }));
                                }
                              }}
                              placeholder="e.g. Sarah Jenkins"
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                              }`}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-[11px] mt-1.5 font-bold flex items-center gap-1">
                                <span>⚠️</span> {errors.name}
                              </p>
                            )}
                          </div>

                          {/* Email Address */}
                          <div className="text-left">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>Email Address *</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email && validateEmail(e.target.value)) {
                                  setErrors(prev => ({ ...prev, email: undefined }));
                                }
                              }}
                              placeholder="e.g. sarah@example.com"
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                              }`}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-[11px] mt-1.5 font-bold flex items-center gap-1">
                                <span>⚠️</span> {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Phone Number */}
                          <div className="text-left">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase mb-2">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>Mobile Phone Number *</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (errors.phone && validatePhone(e.target.value)) {
                                  setErrors(prev => ({ ...prev, phone: undefined }));
                                }
                              }}
                              placeholder="e.g. 07700 900077"
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all ${
                                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-[11px] mt-1.5 font-bold flex items-center gap-1">
                                <span>⚠️</span> {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="text-left">
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Brief description of job (Optional)</label>
                          <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Hot water not heating up, water leaking under bathtub, etc..."
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50/50 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-4">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!validateStep(step)}
                        className={`px-6 py-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          validateStep(step)
                            ? 'bg-brand-blue text-white shadow-md hover:scale-[1.01]'
                            : 'bg-slate-100 text-slate-400 border border-slate-100 cursor-not-allowed'
                        }`}
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={submitting || !validateStep(3)}
                        id="submit-booking-form-button"
                        className={`px-8 py-3.5 rounded-xl text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2 ${
                          !validateStep(3)
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            : urgency === 'emergency'
                            ? 'bg-brand-orange hover:bg-brand-orange/95'
                            : 'bg-brand-blue hover:bg-brand-blue/95'
                        }`}
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Matching Nearest Engineer...</span>
                          </>
                        ) : (
                          <>
                            {urgency === 'emergency' ? (
                              <>
                                <ShieldAlert className="w-4 h-4 animate-pulse" />
                                <span>Dispatch Emergency Plumber Now</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Confirm Booking</span>
                              </>
                            )}
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
