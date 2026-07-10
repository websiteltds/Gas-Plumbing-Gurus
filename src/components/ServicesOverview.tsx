/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LONDON_SERVICES, Service } from '../types';
import { ShieldAlert, Flame, Wrench, Search, Hammer, CheckCircle, HelpCircle, ArrowRight, Phone } from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

interface ServicesOverviewProps {
  onBookService: (serviceName: string) => void;
}

export default function ServicesOverview({ onBookService }: ServicesOverviewProps) {
  const [selectedTab, setSelectedTab] = useState(LONDON_SERVICES[0].id);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'FlameKindling':
        return <Flame className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const activeService = LONDON_SERVICES.find((s) => s.id === selectedTab) || LONDON_SERVICES[0];

  return (
    <section id="services-section" className="py-36 sm:py-48 bg-brand-light relative overflow-hidden">
      {/* Absolute glow balls in background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-blue/15 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-orange/15 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black tracking-widest text-brand-orange uppercase mb-4"
          >
            OUR CERTIFIED SERVICES
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black text-brand-dark tracking-tighter leading-none"
          >
            Professional Plumbing & Heating
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 mt-6 text-xl sm:text-2xl font-medium"
          >
            Gas Safe certified engineering and rapid-response repairs. Fully upfront estimates with zero surprise fees.
          </motion.p>
        </div>

        {/* Desktop Layout - Interactive Side Tabs */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">Services Menu</h3>
            {LONDON_SERVICES.map((service) => {
              const isSelected = service.id === selectedTab;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={service.id}
                  id={`tab-${service.id}`}
                  onClick={() => setSelectedTab(service.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl font-bold flex items-center gap-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-blue text-white shadow-[0_10px_20px_rgba(0,87,184,0.2)] scale-[1.02]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-brand-blue'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-blue-50 text-brand-blue'
                  }`}>
                    {getIconComponent(service.iconName)}
                  </div>
                  <div>
                    <span className="block text-sm leading-tight">{service.title}</span>
                    {service.id === 'emergency-plumbing' && (
                      <span className="inline-block mt-1 text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 bg-brand-orange text-white rounded-md">
                        24/7 Rapid
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Tab Details Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-xl p-10 lg:p-12 grid md:grid-cols-2 gap-12 relative overflow-hidden glow-card-blue"
              >
                {/* Background design elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full opacity-60 pointer-events-none" />

                {/* Left side details */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-3 rounded-xl text-brand-blue">
                      {getIconComponent(activeService.iconName)}
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-brand-dark">{activeService.title}</h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{activeService.longDescription}</p>

                  {/* Pricing Box */}
                  <div className="bg-emerald-50 border border-emerald-100/80 p-5 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs uppercase font-extrabold text-emerald-800 tracking-wider">Transparent Rates</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{activeService.pricingInfo}</p>
                    </div>
                  </div>

                  {/* Instant Action CTA */}
                  <div className="flex items-center gap-4 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      id={`book-${activeService.id}`}
                      onClick={() => onBookService(activeService.title)}
                      className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,122,0,0.25)] transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <a
                      href="tel:+447421495104"
                      className="text-slate-700 font-bold hover:text-brand-blue transition-colors text-sm flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span>Call Hotline</span>
                    </a>
                  </div>
                </div>

                {/* Right side check lists */}
                <div className="space-y-8 bg-brand-light/40 p-8 rounded-xl border border-slate-100">
                  {/* Common Issues Fixed */}
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-slate-500 tracking-widest flex items-center gap-1.5 mb-4">
                      <HelpCircle className="w-4 h-4 text-brand-blue" />
                      <span>Issues We Fix</span>
                    </h4>
                    <ul className="space-y-3">
                      {activeService.commonIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <span className="text-brand-orange font-bold text-sm leading-none shrink-0">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Features checklist */}
                  <div className="border-t border-slate-200/60 pt-6">
                    <h4 className="text-xs uppercase font-extrabold text-slate-500 tracking-widest flex items-center gap-1.5 mb-4">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="space-y-3">
                      {activeService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="text-emerald-500 font-bold leading-none shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile & Tablet Layout - Elegant Card Carousel/Grid */}
        <div className="lg:hidden space-y-6">
          {LONDON_SERVICES.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={service.id}
              id={`card-service-${service.id}`}
              className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 space-y-4 glow-card-blue"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-lg text-brand-blue">
                  {getIconComponent(service.iconName)}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-brand-dark leading-tight">{service.title}</h3>
                  {service.id === 'emergency-plumbing' && (
                    <span className="inline-block mt-1 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 bg-brand-orange text-white rounded-md">
                      24/7 Active Dispatch
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-600 text-sm">{service.shortDescription}</p>

              {/* Key Bullet List */}
              <div className="bg-brand-light p-3.5 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Common Problems Solved</p>
                <ul className="space-y-1.5">
                  {service.commonIssues.slice(0, 3).map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-brand-orange font-bold">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100/60 p-3 rounded-lg text-xs font-bold text-emerald-800">
                {service.pricingInfo}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  id={`mobile-book-${service.id}`}
                  onClick={() => onBookService(service.title)}
                  className="bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm text-center cursor-pointer"
                >
                  Book Dispatch
                </motion.button>
                <a
                  href="tel:+447421495104"
                  className="border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue font-bold text-xs py-2.5 rounded-lg text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span>Call 24/7</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

