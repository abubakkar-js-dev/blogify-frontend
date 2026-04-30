"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuSearch, LuUser, LuX, LuMenu } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "Features", href: "/features" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/blogs?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-slate-200/40 px-4 sm:px-6 py-4 transition-all duration-300">
      <div className="max-w-360 mx-auto flex items-center justify-between gap-4">
        <Logo />

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative px-1 py-1 group/link whitespace-nowrap ${
                  isActive
                    ? "text-teal-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.75 bg-teal-500 transition-all duration-500 rounded-full ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover/link:w-full group-hover/link:opacity-100"}`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <form
            onSubmit={handleSearch}
            className="relative hidden xl:block group"
          >
            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-teal-600 group-focus-within:scale-110 transition-all" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="SEARCH..."
              className="pl-11 pr-6 py-2.5 bg-slate-900/5 hover:bg-slate-900/10 border-none rounded-2xl text-[10px] font-black tracking-widest focus:ring-8 focus:ring-teal-500/5 focus:bg-white focus:shadow-2xl transition-all w-48 focus:w-64 outline-none placeholder:text-slate-400"
            />
          </form>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:flex items-center justify-center w-10 h-10 border border-slate-200 hover:border-slate-900 rounded-xl transition-all hover:bg-slate-900 hover:text-white group"
            >
              <LuUser className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="/register">
              <button className="h-10 px-4 sm:px-6 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl shadow-slate-900/10 active:shadow-none whitespace-nowrap">
                Register
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <LuX className="w-6 h-6" />
            ) : (
              <LuMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100 mt-4 -mx-4 sm:-mx-6 px-4 py-8"
          >
            <div className="flex flex-col gap-6">
              <form onSubmit={handleSearch} className="relative group mb-4">
                <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="SEARCH ARTICLES..."
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black tracking-widest outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-200 transition-all"
                />
              </form>

              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center text-center ${
                      pathname === link.href
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-8 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/login"
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-colors"
                >
                  <LuUser className="w-5 h-5" /> Account Login
                </Link>
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                  © 2024 Blogify
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
