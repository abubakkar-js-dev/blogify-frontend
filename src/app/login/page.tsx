'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { 
  Mail, 
  Lock, 
  Github, 
  Chrome, 
  ArrowRight,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden">
      {/* Left side: Content & Image */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/writing-desk/1200/1600"
            alt="Hero"
            fill
            className="object-cover opacity-50 transition-transform duration-[10s] hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/80 via-slate-900/90 to-slate-900" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Logo dark className="mb-12" />
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">
              Start your journey with the world.
            </h2>
            <p className="text-slate-300 text-lg mb-12 leading-relaxed">
              Join 100,000+ creators sharing their stories and expertise every single day on Blogify.
            </p>
            
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
              <div>
                <p className="text-3xl font-black text-white">2.5M+</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Readers</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">100k</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Authors</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">4.9/5</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Rating</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Right side: Form */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden flex justify-center">
            <Logo className="mb-4" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Sign in to manage your articles and profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-teal-500/20 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-bold text-teal-600 hover:text-teal-700 uppercase tracking-widest">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-teal-500/20 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20" />
              <span className="text-xs text-slate-500 font-medium">Keep me signed in for 30 days</span>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-teal-600 text-white rounded-[1.25rem] font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] shadow-xl shadow-teal-600/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative px-4 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or login with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm group">
              <Chrome className="w-4 h-4 text-slate-600 group-hover:text-teal-600 transition-colors" />
              <span className="text-xs font-bold text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm group">
              <Github className="w-4 h-4 text-slate-600 group-hover:text-teal-600 transition-colors" />
              <span className="text-xs font-bold text-slate-700">Github</span>
            </button>
          </div>

          <p className="text-center mt-12 text-sm text-slate-500 font-medium">
            New to Blogify? {' '}
            <Link href="/register" className="text-teal-600 font-bold hover:underline underline-offset-4 decoration-2 decoration-teal-500/30 transition-all">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
