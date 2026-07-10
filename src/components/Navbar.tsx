/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MessageCircle, Menu, X, ShieldAlert, Award, Star } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openBookingModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'admin', label: 'Calendar Admin' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner with Trust Signals */}
      <div className="bg-brand-dark text-white py-2 px-4 text-xs font-medium border-b border-blue-900/40 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Emergency Plumbers Active in Brixton Hill (SW2) & 10-Mile Radius — 24/7 Response</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <strong className="text-white">5.0 Rating</strong> (27 Reviews)
            </span>
            <span className="h-3 w-px bg-slate-700 hidden sm:inline" />
            <span className="flex items-center gap-1 text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>Gas Safe #618290</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        id="main-nav-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-3 border-b border-slate-100'
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            id="logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="bg-brand-blue text-white p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl text-brand-dark tracking-tight block leading-tight">
                GAS & PLUMBING
              </span>
              <span className="text-xs font-semibold tracking-wider text-brand-orange block uppercase leading-none">
                Gurus LTD
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold tracking-tight transition-all relative py-1 cursor-pointer ${
                  activeTab === item.id
                    ? 'text-brand-blue'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.span 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call-to-actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+447421495104"
              id="cta-phone-nav"
              className="flex items-center gap-2 text-slate-800 font-bold hover:text-brand-blue transition-colors text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-blue"
            >
              <div className="bg-emerald-500/10 p-1.5 rounded-md text-emerald-600">
                <Phone className="w-4 h-4 animate-pulse-subtle" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-medium uppercase leading-none">Call 24/7 Hotline</p>
                <p className="text-sm font-extrabold text-slate-800 leading-tight">07421 495104</p>
              </div>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/447421495104?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20heating%20or%20plumbing%20services."
              target="_blank"
              rel="noreferrer"
              id="cta-whatsapp-nav"
              className="flex items-center gap-2 text-slate-800 font-bold hover:text-[#25D366] transition-colors text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#25D366]"
            >
              <div className="bg-[#25D366]/10 p-1.5 rounded-md text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-medium uppercase leading-none">WhatsApp Live</p>
                <p className="text-sm font-extrabold text-slate-800 leading-tight">Chat with Us</p>
              </div>
            </a>

            <button
              id="cta-emergency-nav"
              onClick={openBookingModal}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white text-sm font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Book Emergency Callout</span>
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/447421495104?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20heating%20or%20plumbing%20services."
              target="_blank"
              rel="noreferrer"
              id="mobile-whatsapp-nav"
              className="bg-[#25D366] text-white p-2.5 rounded-lg shadow-sm hover:bg-[#20ba5a] transition-colors flex items-center justify-center"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="tel:+447421495104"
              id="mobile-phone-nav"
              className="bg-emerald-500 text-white p-2.5 rounded-lg shadow-sm hover:bg-emerald-600 transition-colors flex items-center justify-center"
              title="Call Plumber Now"
            >
              <Phone className="w-5 h-5 animate-pulse-subtle" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div id="mobile-nav-menu" className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-4 z-50">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-bold py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-brand-blue'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-1" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:+447421495104"
                  id="mobile-nav-call"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-center py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>Call 24/7</span>
                </a>
                <button
                  id="mobile-nav-book"
                  onClick={() => {
                    setIsOpen(false);
                    openBookingModal();
                  }}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Emergency Help</span>
                </button>
              </div>
              <a
                href="https://wa.me/447421495104?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20heating%20or%20plumbing%20services."
                target="_blank"
                rel="noreferrer"
                id="mobile-nav-whatsapp"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-center py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Urgent Chat</span>
              </a>
            </div>
          </div>
        )}

        {/* Dynamic sliding scroll progress bar under the header */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-blue origin-left z-50 shadow-[0_1px_8px_rgba(0,87,184,0.4)]"
          style={{ scaleX }}
        />
      </header>
    </>
  );
}
