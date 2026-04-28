'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  dark?: boolean;
}

export default function Logo({ className = "", showText = true, dark = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group px-1 ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-11 h-11 flex items-center justify-center"
      >
        {/* Modern Layered Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-[14px] shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-teal-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

        {/* Minimalist Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="relative w-6 h-6 z-10"
        >
          <path 
            d="M5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4Z" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-20"
          />
          <path 
            d="M8 8H16" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <path 
            d="M8 12H13" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <path 
            d="M8 16H11" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {showText && (
        <span className={`text-2xl font-black tracking-tighter transition-all duration-300 ${dark ? 'text-white' : 'text-slate-900 group-hover:tracking-tight'}`}>
          BLOG<span className={dark ? 'text-teal-400' : 'text-teal-500'}>IFY</span>
        </span>
      )}
    </Link>
  );
}
