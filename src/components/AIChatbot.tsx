/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Phone, Award, Clock,
  Sparkles, CornerDownLeft, Loader2 
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi! I'm Guru Bot, your 24/7 AI Plumbing and Heating assistant. 🛠️\n\nHow can I help you today? You can ask me about our services, rates, coverage area, or how to handle basic issues.\n\n⚠️ **If you have a live active emergency within 10 miles of SW2 (Brixton Hill), please call our on-call engineer directly at 07421 495104 for a rapid 20-minute dispatch!**"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = { role: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Map history excluding the first welcoming message to keep context concise
      const history = updatedMessages.slice(1, -1);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: history,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: "I'm having a brief connection blip! Please call us directly at **07421 495104** or submit our quick booking form to speak with an on-call plumber immediately. We're active and dispatching across the SW2 10-mile radius right now!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white border border-slate-200/80 rounded-3xl shadow-2xl w-[92vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5 text-left">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/30">
                    <Sparkles className="w-5 h-5 text-brand-orange" />
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm leading-tight flex items-center gap-1.5">
                    Guru Bot
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">Gas & Plumbing AI Expert</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a 
                  href="tel:07421495104"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-brand-orange transition-colors"
                  title="Call On-Duty Plumber"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Emergency Hotline Strip */}
            <div className="bg-[#0c2444] text-white px-4 py-2 text-[10px] font-bold flex items-center justify-between gap-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-orange animate-pulse" />
                <span>24/7 SW2 10-Mile Radius Helpline</span>
              </span>
              <a href="tel:07421495104" className="text-brand-orange hover:underline font-extrabold tracking-wide">
                📞 07421 495104
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed text-left shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-brand-blue text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="space-y-2 whitespace-pre-line">
                        {/* Format markdown bold indicators */}
                        {msg.text.split('**').map((chunk, i) => {
                          if (i % 2 === 1) {
                            return <strong key={i} className="font-bold text-slate-950">{chunk}</strong>;
                          }
                          return chunk;
                        })}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-orange" />
                    <span>Guru Bot is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-200/80 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your plumbing..."
                className="flex-grow bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue/50 focus:bg-white transition-all border border-slate-200/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white p-2.5 rounded-xl transition-all shadow-md disabled:opacity-40 disabled:scale-100 active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        id="ai-chat-launcher"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-brand-dark hover:bg-slate-900 text-white rounded-full p-4 shadow-2xl flex items-center gap-2.5 border border-slate-800 group relative cursor-pointer"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
          </span>
        </div>
        
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
          Ask Guru Bot
        </span>
      </motion.button>
    </div>
  );
}
