"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  HiBars3CenterLeft,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiXMark,
} from "react-icons/hi2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block h-full shrink-0 z-50">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Sidebar - Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 z-70 lg:hidden"
            >
              <Sidebar
                isCollapsed={false}
                onToggle={() => setIsMobileOpen(false)}
              />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-6 -right-12.5 w-10 h-10 bg-white rounded-xl shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-slate-100"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-40">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              <HiBars3CenterLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-xs group hidden sm:block">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="text"
                placeholder="Find anything..."
                className="w-full h-9 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/30 transition-all outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="relative w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-teal-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-6 w-px bg-slate-100 mx-1 lg:mx-2" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-black text-slate-900 leading-none mb-1">
                  Alex Chen
                </p>
                <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">
                  Pro Creator
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:border-teal-500 transition-colors">
                <Image
                  src="https://picsum.photos/seed/alex/100/100"
                  alt="User"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 scroll-smooth">
          <div className="max-w-400 mx-auto p-4 lg:p-8">
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
