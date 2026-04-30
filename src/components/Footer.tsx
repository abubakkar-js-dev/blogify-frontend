'use client';

import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa6';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 relative overflow-hidden pt-24 pb-12">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-20">
          <div className="col-span-2 lg:col-span-3">
            <Logo className="mb-8" />
            <p className="text-slate-500 text-base max-w-sm mb-10 leading-relaxed font-medium">
              Empowering the next generation of storytellers with a platform built for speed, beauty, and discovery.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaXTwitter, label: 'Twitter' },
                { Icon: FaLinkedinIn, label: 'LinkedIn' },
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaFacebookF, label: 'Facebook' }
              ].map(({ Icon, label }, i) => (
                <button 
                  key={i} 
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-500 bg-white transition-all duration-300 hover:border-teal-500 hover:text-teal-600 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 group"
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-black text-slate-900 mb-8 text-[11px] uppercase tracking-[0.25em]">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              {['All Features', 'Pricing', 'Themes', 'Integrations'].map((item) => (
                <li key={item} className="hover:text-teal-600 cursor-pointer transition-all duration-200 flex items-center gap-2 group/item">
                  <span className="w-0 h-px bg-teal-500 group-hover/item:w-3 transition-all duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-black text-slate-900 mb-8 text-[11px] uppercase tracking-[0.25em]">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              {['Documentation', 'Help Center', 'Guides', 'Blog'].map((item) => (
                <li key={item} className="hover:text-teal-600 cursor-pointer transition-all duration-200 flex items-center gap-2 group/item">
                  <span className="w-0 h-px bg-teal-500 group-hover/item:w-3 transition-all duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-black text-slate-900 mb-8 text-[11px] uppercase tracking-[0.25em]">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item} className="hover:text-teal-600 cursor-pointer transition-all duration-200 flex items-center gap-2 group/item">
                  <span className="w-0 h-px bg-teal-500 group-hover/item:w-3 transition-all duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-200 text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2024 Blogify HQ</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span>Built for the future</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {['Terms', 'Privacy', 'Cookies', 'Security'].map(item => (
              <Link key={item} href="#" className="hover:text-teal-600 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
