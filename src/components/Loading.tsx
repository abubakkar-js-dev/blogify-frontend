'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-100 w-full flex flex-col items-center justify-center p-8">
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-teal-100 border-t-teal-600"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-4 border-slate-100 border-t-slate-400"
        />
        
        {/* Center Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-8.5 bg-teal-600 rounded-full shadow-lg shadow-teal-500/50"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <p className="text-sm font-black uppercase tracking-widest text-slate-400 animate-pulse">
          Loading amazing stories...
        </p>
      </motion.div>
    </div>
  );
}
