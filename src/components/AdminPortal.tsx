/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { googleSignIn, logout, initAuth } from '../lib/firebaseAuth';
import { Inquiry } from '../types';
import { 
  Calendar, ShieldAlert, LogIn, LogOut, CheckCircle, Clock, 
  MapPin, Phone, Mail, FileText, RefreshCw, AlertCircle, PlusCircle, Trash2 
} from 'lucide-react';

interface AdminPortalProps {
  onAddTestBooking: () => void;
}

export default function AdminPortal({ onAddTestBooking }: AdminPortalProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Inquiry[]>([]);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load bookings from localStorage
  const loadBookings = () => {
    const saved = localStorage.getItem('gurus_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse bookings", err);
      }
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
    // Watch for updates
    const interval = setInterval(loadBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle Google Sign In
  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setSuccessMsg(`Successfully linked Google account: ${result.user.email}`);
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Log Out
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setSuccessMsg('Successfully signed out.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Sync a single booking to Google Calendar
  const syncToCalendar = async (booking: Inquiry) => {
    if (!token) {
      setErrorMsg('Please connect your Google account first to sync to your calendar.');
      return;
    }

    setSyncingId(booking.id);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/calendar/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: booking.name,
          phone: booking.phone,
          email: booking.email,
          address: booking.address,
          postcode: booking.postcode,
          serviceType: booking.serviceType,
          urgency: booking.urgency,
          preferredDateTime: booking.preferredDateTime,
          description: booking.description,
          accessToken: token
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync event to Google Calendar.');
      }

      // Mark as synced in local state and localStorage
      const saved = localStorage.getItem('gurus_bookings');
      if (saved) {
        const list: Inquiry[] = JSON.parse(saved);
        const updatedList = list.map(b => b.id === booking.id ? { ...b, status: 'synced' as any } : b);
        localStorage.setItem('gurus_bookings', JSON.stringify(updatedList));
        setBookings(updatedList);
      }

      setSuccessMsg(`Successfully synced booking for ${booking.name} to calendar!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error syncing to Google Calendar. Please check authorization permissions.');
    } finally {
      setSyncingId(null);
    }
  };

  // Remove booking from list
  const deleteBooking = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to remove this booking from the dashboard? This does not delete any Google Calendar events.');
    if (!confirmed) return;

    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem('gurus_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <div id="admin-portal-view" className="py-12 sm:py-16 bg-slate-50 min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Admin Hub Header */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Gurus LTD Internal Console
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Plumber Booking & Calendar Sync Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage incoming plumber bookings and automatically populate Google Calendar for <strong className="text-slate-800">gasplumbinggurus@gmail.com</strong>
            </p>
          </div>

          {/* Google Sign In Controller */}
          <div className="shrink-0">
            {user ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-left">
                  <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider">Connected Google Calendar</p>
                  <p className="text-sm font-bold text-slate-800">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 hover:text-red-600 hover:border-red-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-1">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="gsi-material-button bg-brand-blue hover:bg-brand-blue/95 hover:shadow-md text-white border-0 py-3 px-5 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <div className="bg-white p-1 rounded-md shrink-0">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 block">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </div>
                  <span>{isLoading ? 'Connecting...' : 'Link gasplumbinggurus@gmail.com Calendar'}</span>
                </button>
                <p className="text-[10px] text-slate-400 font-medium pl-1">Authorizes secure calendar scheduling</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications and Alerts */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200/60 text-red-800 p-4 rounded-2xl flex items-center gap-3 text-left mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-xs font-bold">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200/60 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-left mb-6">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />
            <span className="text-xs font-bold">{successMsg}</span>
          </div>
        )}

        {/* Action Controls for Testing */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={onAddTestBooking}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate Simulated Booking</span>
          </button>
        </div>

        {/* Bookings Table List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden text-left">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
            <h3 className="font-display font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span>Incoming Plumber Bookings List ({bookings.length})</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200/60 px-2 py-0.5 rounded-md">
              Refreshed live
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-16 text-center">
              <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">No bookings recorded yet</p>
              <p className="text-xs text-slate-500 mt-1">Bookings made by customers on the home page will appear here instantly.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase">
                    <th className="px-6 py-4">Client Detail</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Required Service</th>
                    <th className="px-6 py-4">Preferred Timing</th>
                    <th className="px-6 py-4 text-center">Calendar Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* Client info */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{booking.name}</p>
                        <p className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" /> {booking.phone}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" /> {booking.email}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{booking.address}</span>
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 font-mono mt-0.5 bg-slate-100 inline-block px-1.5 py-0.5 rounded uppercase">
                          {booking.postcode}
                        </p>
                      </td>

                      {/* Service & Urgency */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{booking.serviceType}</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase mt-1 ${
                          booking.urgency === 'emergency' 
                            ? 'bg-red-100 text-red-700' 
                            : booking.urgency === 'high' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-100 text-brand-blue'
                        }`}>
                          {booking.urgency}
                        </span>
                      </td>

                      {/* Timing */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{booking.preferredDateTime}</span>
                        </p>
                      </td>

                      {/* Sync status */}
                      <td className="px-6 py-4 text-center">
                        {booking.status === 'synced' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                            <CheckCircle className="w-3.5 h-3.5 fill-current text-emerald-500 text-white" />
                            <span>Synced to Calendar</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl">
                            <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                            <span>Pending Sync</span>
                          </span>
                        )}
                      </td>

                      {/* Sync / Delete Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => syncToCalendar(booking)}
                            disabled={syncingId === booking.id || booking.status === 'synced'}
                            className={`text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm border ${
                              booking.status === 'synced'
                                ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed shadow-none'
                                : 'bg-brand-orange hover:bg-brand-orange/95 text-white border-brand-orange cursor-pointer hover:scale-[1.02]'
                            }`}
                          >
                            {syncingId === booking.id ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Syncing...</span>
                              </>
                            ) : (
                              <>
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{booking.status === 'synced' ? 'Synced' : 'Sync to Calendar'}</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-100 p-2 rounded-xl transition-all cursor-pointer"
                            title="Remove booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
