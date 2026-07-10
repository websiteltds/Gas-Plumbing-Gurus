/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TESTIMONIALS, Testimonial } from '../types';
import { Star, ShieldCheck, CheckCircle2, Award, User, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date' | 'verified'>) => void;
}

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Brixton Hill, SW2');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    onAddTestimonial({
      author: newAuthor,
      location: newLocation,
      rating: newRating,
      text: newText
    });

    setSuccessMsg(true);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
    
    setTimeout(() => {
      setSuccessMsg(false);
      setShowReviewModal(false);
    }, 2500);
  };

  return (
    <section id="reviews-section" className="py-36 sm:py-48 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          <div className="md:col-span-8 text-left space-y-6">
            <p className="text-xs font-black tracking-widest text-brand-orange uppercase">REVIEWS</p>
            <h2 className="font-display text-5xl sm:text-7xl font-black text-brand-dark tracking-tighter leading-none">
              What Our Customers Say
            </h2>
            <p className="text-slate-600 max-w-2xl text-xl sm:text-2xl font-semibold">
              Verified local ratings from home and business owners across our SW2 10-mile radius.
            </p>
          </div>
          
          {/* Trust Score Box */}
          <div className="md:col-span-4 bg-brand-light p-8 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-3xl font-black font-display text-brand-dark leading-none mt-1">5.0 / 5.0</p>
            <p className="text-xs font-bold text-slate-500 mt-2">Based on 27 Google Reviews</p>
            
            <button
              id="write-review-trigger"
              onClick={() => setShowReviewModal(true)}
              className="mt-4 bg-white hover:bg-slate-50 text-brand-blue border border-slate-200 hover:border-brand-blue font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-brand-light/40 border border-slate-100 p-6 rounded-2xl hover:shadow-[0_15px_30px_rgba(255,122,0,0.15)] hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars and Verified Sign */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>Verified Google Review</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-extrabold text-brand-blue border border-blue-50">
                  {review.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 leading-snug">{review.author}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{review.location} • {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Leave-a-Review Modal Dialog */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-dark/65 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full overflow-hidden p-6 relative">
              <h3 className="font-display text-xl font-bold text-brand-dark mb-2">Write a Google Review</h3>
              <p className="text-xs text-slate-500 mb-4">
                Thank you for choosing Gas & Plumbing Gurus LTD! Share your feedback with the Brixton Hill community.
              </p>

              {successMsg ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <p className="text-sm font-bold text-emerald-800">Review Submitted Successfully!</p>
                  <p className="text-xs text-slate-500">Your review has been added to our live local ratings board.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setNewRating(starValue)}
                          className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-8 h-8 ${starValue <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. James McAllister"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  {/* Location Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Local Area (SW2 10-Mile Radius)</label>
                    <select
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="Brixton Hill, SW2 Area">Brixton Hill, SW2 Area</option>
                      <option value="Clapham, SW2 Area">Clapham, SW2 Area</option>
                      <option value="Dulwich, SW2 Area">Dulwich, SW2 Area</option>
                      <option value="Streatham, SW2 Area">Streatham, SW2 Area</option>
                      <option value="Herne Hill, SW2 Area">Herne Hill, SW2 Area</option>
                      <option value="Balham, SW2 Area">Balham, SW2 Area</option>
                      <option value="Camberwell, SW2 Area">Camberwell, SW2 Area</option>
                    </select>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Excellent, fast, and very professional service!"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-2.5 rounded-lg text-center cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm py-2.5 rounded-lg text-center cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
