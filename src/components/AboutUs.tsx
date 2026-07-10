/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Clock, Heart, Award, CheckCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section id="about-us-section" className="py-36 sm:py-48 bg-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-brand-blue/15 blur-[130px]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Core Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Visual Bento of Stats & Badges */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="grid grid-cols-2 gap-6">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="bg-brand-light p-8 rounded-3xl border border-slate-100 space-y-4 text-left glow-card-blue shadow-md"
              >
                <div className="bg-brand-blue/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-blue">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-4xl font-black font-display text-brand-dark">24/7</p>
                <p className="text-sm font-black text-slate-500 uppercase tracking-wider leading-none">Emergency Help</p>
                <p className="text-xs text-slate-400 font-medium">On-call dispatch active 365 days across the SW2 10-mile radius.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="bg-brand-light p-8 rounded-3xl border border-slate-100 space-y-4 text-left glow-card-orange shadow-md"
              >
                <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-4xl font-black font-display text-brand-dark">#618290</p>
                <p className="text-sm font-black text-slate-500 uppercase tracking-wider leading-none">Gas Safe</p>
                <p className="text-xs text-slate-400 font-medium">Strictly certified and regulated gas heating works.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="bg-brand-light p-8 rounded-3xl border border-slate-100 space-y-4 text-left col-span-2 glow-card-blue shadow-md"
              >
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-500">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black font-display text-brand-dark">100% Local</p>
                    <p className="text-sm font-black text-slate-500 uppercase tracking-wider mt-0.5">Brixton Hill Base</p>
                  </div>
                  <span className="text-xs bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded font-black uppercase tracking-wider">SW2 Stationed</span>
                </div>
                <p className="text-xs text-slate-400 font-medium font-medium">Based in Brixton Hill to reach Clapham, Streatham, Dulwich, and Balham in record response times.</p>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Company Story & Values */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-10 text-left"
          >
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-5 py-2 rounded-full">WHO WE ARE</span>
            
            <h2 className="font-display text-5xl sm:text-7xl font-black text-brand-dark tracking-tighter leading-none">
              Friendly, Trustworthy Local Experts
            </h2>

            <p className="text-slate-600 text-xl sm:text-2xl font-semibold leading-relaxed">
              We started with a simple belief: plumbing problems should be <strong>solved first time</strong>. No cutting corners, no hidden hourly charges, and no endless return visits. Every engineer on our team is fully licensed, insured, and Gas Safe Registered.
            </p>

            {/* Our Promises Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Transparency First</p>
                  <p className="text-xs text-slate-500">Upfront diagnostics flat-rates. You approve quotes first.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Highly Skilled Crews</p>
                  <p className="text-xs text-slate-500">We solve complex structural leaks handymen can't fix.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">24/7 Availability</p>
                  <p className="text-xs text-slate-500">On-call plumbers awake, fully equipped, and dispatching right now.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Cleanliness Promised</p>
                  <p className="text-xs text-slate-500">We wear boot covers, clean spillages, and leave your home spotless.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
