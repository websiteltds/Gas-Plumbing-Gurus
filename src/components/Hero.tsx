/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, ShieldCheck, Clock, Award, Star, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onEmergencyClick: () => void;
  onExploreServicesClick: () => void;
}

export default function Hero({ onEmergencyClick, onExploreServicesClick }: HeroProps) {
  return (
    <section id="homepage-hero" className="relative bg-gradient-to-b from-brand-dark via-[#0d142b] to-brand-dark text-white overflow-hidden py-36 lg:py-48">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-[700px] h-[700px] rounded-full bg-brand-blue/40 blur-[160px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[700px] h-[700px] rounded-full bg-brand-orange/30 blur-[160px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Hero Left - Core Selling Points & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10 sm:space-y-12 text-left"
          >
            {/* Dynamic Headline */}
            <div className="space-y-6">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.05]">
                SW2 Brixton's <br />
                <span className="gradient-glowing-text">Plumbing Gurus</span>
              </h1>
              <p className="text-slate-300 text-xl sm:text-2xl font-semibold max-w-xl leading-relaxed">
                Expert emergency repairs and boiler installations. Fully licensed, Gas Safe certified, and stationing live in Brixton Hill.
              </p>
            </div>

            {/* Core Selling Bullet Badges with glow on hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-100">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-3 bg-brand-dark/40 p-4 rounded-xl border border-slate-700/50 hover:border-brand-orange/60 transition-colors shadow-sm"
              >
                <Clock className="w-5 h-5 text-brand-orange shrink-0 animate-pulse-subtle" />
                <span>Under 45 Mins Response</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-3 bg-brand-dark/40 p-4 rounded-xl border border-slate-700/50 hover:border-brand-blue/60 transition-colors shadow-sm"
              >
                <Award className="w-5 h-5 text-brand-blue shrink-0" />
                <span>Gas Safe Certified (#618290)</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-3 bg-brand-dark/40 p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/60 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Fully Licensed & Insured</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-3 bg-brand-dark/40 p-4 rounded-xl border border-slate-700/50 hover:border-amber-400/60 transition-colors shadow-sm"
              >
                <Star className="w-5 h-5 text-amber-400 shrink-0 fill-amber-400" />
                <span>5.0 Star Local Rating</span>
              </motion.div>
            </div>

            {/* Core CTA Conversions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+447421495104"
                id="hero-call-now-cta"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transform transition-all text-center flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6 animate-bounce" />
                <div className="text-left">
                  <span className="block text-[10px] text-emerald-100 font-extrabold uppercase leading-none">Call Plumber 24/7</span>
                  <span className="block text-xl font-black leading-tight">07421 495104</span>
                </div>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-emergency-booking-cta"
                onClick={onEmergencyClick}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-8 py-4.5 rounded-xl shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <ShieldAlert className="w-5 h-5 animate-pulse-subtle" />
                <span>Book Instant Dispatch</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Right - Photo Frame & Google Reviews Summary Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with Orange Accent Borders */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-blue opacity-50 blur-md pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden bg-brand-dark/50 border border-slate-700/80 shadow-[0_0_40px_rgba(0,87,184,0.25)] aspect-square glow-card-blue">
                <img
                  src="/src/assets/images/plumbing_hero_professional_1782752361138.jpg"
                  alt="Gas & Plumbing Gurus Boiler and Tools Setup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-95 object-center hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating "Local Expert" Label */}
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-600/40 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  <span>Brixton Hill, SW2 Base</span>
                </div>
              </div>

              {/* Floating Review Card (Conversion booster) - Floating and glowing */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -right-2 sm:-right-6 bg-white text-slate-800 p-5 rounded-xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)] max-w-[280px] hidden sm:block animate-float glow-card-orange"
              >
                <div className="flex items-center gap-1 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-1">5.0</span>
                </div>
                <p className="text-xs italic text-slate-600 leading-relaxed mb-3">
                  "Solved a serious leak quickly that two other plumbers failed to locate."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-extrabold text-brand-blue">
                    MV
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-800 leading-none">Marcus Vance</p>
                    <p className="text-[9px] text-slate-400">Dulwich, SW2 Area</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Signals Bar (Full Width) */}
      <div id="hero-trust-bar" className="bg-slate-900/60 border-t border-slate-800/80 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-3 md:pt-0">
              <p className="text-3xl font-black font-display text-white">5.0</p>
              <div className="flex items-center justify-center gap-0.5 my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">27 Google Reviews</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl font-black font-display text-brand-orange">24/7</p>
              <p className="text-xs text-slate-200 font-bold my-1.5">Emergency Help</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">SW2 10-Mile Radius</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl font-black font-display text-white">100%</p>
              <p className="text-xs text-slate-200 font-bold my-1.5">Gas Safe Registered</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Engineers ID #618290</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl font-black font-display text-brand-blue">45 Mins</p>
              <p className="text-xs text-slate-200 font-bold my-1.5">Average Response</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Local Stationing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

