/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award, Star, Clock } from 'lucide-react';
import { NEIGHBOURHOODS } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Footer({ setActiveTab, openBookingModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-brand-dark text-slate-300 border-t-2 border-brand-orange/80">
      
      {/* Top Banner: Emergency Contact Strip */}
      <div className="bg-[#071322] border-b border-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-display text-xl font-extrabold text-white">Active Plumbing or Boiler Emergency?</h3>
            <p className="text-xs text-slate-400 font-medium">Speak directly to an on-call engineer right now. No automated bots.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:+447421495104"
              id="footer-call-now"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-center px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-colors"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>07421 495104</span>
            </a>
            <button
              id="footer-book-now"
              onClick={openBookingModal}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-center px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Clock className="w-5 h-5" />
              <span>Book Online Dispatch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        
        {/* Column 1: Brand & Credentials */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-brand-blue p-2 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-black text-lg text-white leading-tight block">
                GAS & PLUMBING
              </span>
              <span className="text-xs font-bold tracking-widest text-brand-orange block uppercase leading-none">
                Gurus LTD
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Gas & Plumbing Gurus LTD is a fully accredited, highly trustworthy local trades company providing Gas Safe certified installations, fast emergency leak isolation, and comprehensive boiler servicing.
          </p>

          <div className="flex flex-col gap-2 pt-2 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Gas Safe Registered #618290</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>5.0 rating across 27 Google Reviews</span>
            </div>
          </div>
        </div>

        {/* Column 2: Service Coverage Areas */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">SW2 10-Mile Radius Coverage</h4>
          <p className="text-xs text-slate-400 leading-snug font-medium">
            We operate out of <strong className="text-white">Brixton Hill (SW2)</strong>, giving us rapid arrival times across all locations within a strict 10-mile radius:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {NEIGHBOURHOODS.slice(0, 12).map((area) => (
              <span
                key={area}
                className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded font-semibold"
              >
                {area}
              </span>
            ))}
            <span className="text-[10px] text-slate-500 font-bold self-center ml-1">and more...</span>
          </div>
        </div>

        {/* Column 3: Navigation Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">Quick Directory</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNavClick('home')} className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer text-left">
                Core Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer text-left">
                About Our Team
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('reviews')} className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer text-left">
                Reviews & Testimonials
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer text-left">
                Contact & Quote Form
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Core Details */}
        <div className="md:col-span-2 space-y-4 text-xs">
          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">Office Base</h4>
          
          <div className="space-y-3 pt-1 text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-300">Brixton Hill, SW2 Area, United Kingdom</span>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold">Open 24 Hours / 7 Days</p>
                <p className="text-[10px] font-semibold text-slate-500">Domestic plumbing & gas dispatch</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Ground bottom footer rights */}
      <div className="bg-[#071322] text-[10px] text-slate-500 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-medium">© {currentYear} Gas & Plumbing Gurus LTD. All Rights Reserved. Company Registered in England & Wales.</p>
          <div className="flex gap-4 font-semibold text-slate-400">
            <span>Gas Safe Registered Number: #618290</span>
            <span className="hidden sm:inline">|</span>
            <span>VAT Registered</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
