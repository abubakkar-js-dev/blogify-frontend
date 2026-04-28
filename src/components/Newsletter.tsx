'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-32 mb-20 text-center sm:text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="w-16 h-16 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1] md:leading-tight">
            Stay inspired. Get the best posts straight to your inbox.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Join our newsletter and never miss an update. We only send content that matters.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto max-w-lg mx-auto md:mx-0">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-4 bg-teal-500/10 text-teal-400 p-8 rounded-[2rem] border border-teal-500/20 backdrop-blur-xl"
              >
                <div className="w-12 h-12 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-lg text-white">Success!</p>
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mt-1">Check your inbox</p>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 w-full"
              >
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:ring-0 text-sm placeholder:text-slate-500 outline-none"
                />
                <button 
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-teal-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-teal-500 transition-all transform active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl shadow-teal-600/20"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : 'Subscribe Now'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-slate-500 text-center mt-6 font-bold uppercase tracking-widest opacity-60">
            No spam, only insights. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
