/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Inquiry } from '../types';
import { 
  ShieldCheck, Phone, Clock, MapPin, Calendar, 
  User, FileText, MessageSquare, Smartphone 
} from 'lucide-react';

interface BookingConfirmationProps {
  inquiry: Inquiry | null;
  onReset: () => void;
}

export default function BookingConfirmation({ inquiry, onReset }: BookingConfirmationProps) {
  if (!inquiry) return null;

  const refCode = `GPG-${inquiry.id.replace('gp_lead_', '').toUpperCase()}`;
  
  // Format the automatic message to the on-call plumber
  const rawMessage = `Hi Gas & Plumbing Gurus,\n\nI would like to confirm my booking (Ref: ${refCode}).\n\n• Customer: ${inquiry.name}\n• Need: ${inquiry.serviceType} (${inquiry.urgency.toUpperCase()})\n• Time: ${inquiry.preferredDateTime}\n• Address: ${inquiry.address}, ${inquiry.postcode.toUpperCase()}\n• Contact Phone: ${inquiry.phone}\n• Notes: ${inquiry.description || 'None'}\n\nPlease dispatch an engineer as soon as possible.`;
  const encodedMessage = encodeURIComponent(rawMessage);
  
  const whatsappUrl = `https://wa.me/447421495104?text=${encodedMessage}`;
  const smsUrl = `sms:+447421495104?body=${encodedMessage}`;

  return (
    <div id="booking-confirmation-view" className="py-12 sm:py-20 bg-slate-50 min-h-[85vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Main Card container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
          
          {/* Header visual style */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div className="text-left">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest">
                Booking Details Prepared
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-slate-900">
                Inquiry Successfully Submitted
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Reference ID: <span className="font-mono text-slate-700 font-bold">{refCode}</span> • Submitted on {new Date(inquiry.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              id="back-home-confirmation"
              onClick={onReset}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>

          {/* Interactive Option Section: WhatsApp or SMS Messages dispatch */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <h3 className="font-display text-sm font-black text-slate-900 uppercase tracking-wider">
                Select Dispatch Option (Required to Speed Up Arrival)
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Open your automatically generated job sheet in either <strong>WhatsApp</strong> or <strong>Messages (SMS)</strong> to instantly inform our on-duty engineer of what you need and what time to arrive:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {/* Option 1: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold p-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] transition-all text-center"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <span className="block text-[10px] text-emerald-100 uppercase font-black leading-none">Option 1</span>
                  <span className="block text-sm font-black leading-tight">Send via WhatsApp</span>
                </div>
              </a>

              {/* Option 2: Messages (SMS) */}
              <a
                href={smsUrl}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold p-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] transition-all text-center"
              >
                <Smartphone className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <span className="block text-[10px] text-blue-100 uppercase font-black leading-none">Option 2</span>
                  <span className="block text-sm font-black leading-tight">Send via Messages (SMS)</span>
                </div>
              </a>
            </div>

            {/* Preview of the auto message */}
            <div className="bg-white border border-slate-100 p-3.5 rounded-xl text-[11px] font-mono text-slate-600 space-y-1 relative">
              <span className="absolute top-2 right-3 text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase">Job Sheet Preview</span>
              <p className="font-bold text-slate-800">Prefilled Message Draft:</p>
              <div className="whitespace-pre-line text-slate-500 pl-2 border-l-2 border-slate-200 mt-1.5 text-[10px] leading-relaxed">
                {rawMessage}
              </div>
            </div>
          </div>

          {/* Genuine static helper message banner */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl flex items-start gap-3.5 text-left">
            <div className="bg-emerald-500 text-white p-2 rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Ready for Dispatch</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Your booking details have been prepared for our on-duty dispatcher. If you completed sending the message via WhatsApp or SMS, our team has already received your exact request. We will review your details shortly to schedule or dispatch an active Gas Safe professional near your location.
              </p>
            </div>
          </div>

          {/* Core booking details summary */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            
            {/* Left Box: Customer & Service Profile */}
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 text-left space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-blue" />
                <span>Customer & Contact</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Name</p>
                  <p className="text-sm font-bold text-slate-800">{inquiry.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</p>
                  <p className="text-sm font-mono font-bold text-slate-800">{inquiry.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Property Address</p>
                  <p className="text-sm font-medium text-slate-800 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{inquiry.address}, {inquiry.postcode.toUpperCase()}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Job & Schedule Details */}
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 text-left space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-orange" />
                <span>Job & Schedule Info</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Selected Service</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{inquiry.serviceType}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      inquiry.urgency === 'emergency' 
                        ? 'bg-red-100 text-red-700' 
                        : inquiry.urgency === 'high' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-blue-100 text-brand-blue'
                    }`}>
                      {inquiry.urgency}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Preferred Timing</p>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inquiry.preferredDateTime}</span>
                  </p>
                </div>
                {inquiry.description && (
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Additional Notes</p>
                    <p className="text-xs text-slate-600 line-clamp-2 italic">"{inquiry.description}"</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Genuine next steps section */}
          <div className="space-y-4 pt-4 border-t border-slate-100 text-left">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Next Professional Steps</h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center mb-2">1</div>
                <h4 className="text-xs font-bold text-slate-900">Review & Match</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Our team checks for active, on-call Gas Safe plumbers in your local borough.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center mb-2">2</div>
                <h4 className="text-xs font-bold text-slate-900">Phone Confirmation</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">The assigned engineer calls you directly to confirm access details and ETA.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center mb-2">3</div>
                <h4 className="text-xs font-bold text-slate-900">Transparent Estimate</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">We provide a clear diagnostic estimate on-site. You only pay after approving it.</p>
              </div>
            </div>
          </div>

          {/* Direct call action helper banner */}
          <div className="bg-sky-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange rounded-bl-full opacity-10 pointer-events-none" />
            
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-brand-orange uppercase tracking-wider">Need to speed up dispatch?</p>
              <p className="text-xs text-slate-300 max-w-md">
                Call our direct office line immediately. Our dispatcher can instantly match your reference ID with active vans.
              </p>
            </div>

            <a
              href="tel:+447421495104"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] shrink-0 shadow-md"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>07421 495104</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
