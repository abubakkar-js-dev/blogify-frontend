"use client";

import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import {
  LuArrowRight,
  LuCircleCheckBig,
  LuLoader,
  LuLock,
  LuMail,
  LuShieldCheck,
  LuUser,
} from "react-icons/lu";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center bg-background p-12 rounded-14 shadow-2xl shadow-slate-200 border border-white"
        >
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-8 flex items-center justify-center mb-8 mx-auto shadow-inner">
            <LuCircleCheckBig className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-4">
            You&apos;re in!
          </h1>
          <p className="text-muted-foreground mb-10 leading-relaxed font-medium">
            Welcome to the Blogify creator community. We&apos;ve sent a
            verification link to your email to get you started.
          </p>
          <Link href="/login">
            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.98]">
              Proceed to Login <LuArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden">
      {/* Left side: Hero */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/creative-office/1200/1600"
            alt="Creator Space"
            fill
            priority
            className="object-cover opacity-60 transition-transform duration-[12s] hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-teal-600/90 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Logo dark className="mb-12" />
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">
              Unleash your inner storyteller today.
            </h2>
            <p className="text-slate-200 text-lg mb-12 leading-relaxed font-medium">
              Join a global network of thinkers, writers, and curious minds.
              Your first article is just a few clicks away.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <LuCircleCheckBig className="w-5 h-5" />
                </div>
                <p className="text-white font-bold">
                  Free forever for basic authors
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <LuCircleCheckBig className="w-5 h-5" />
                </div>
                <p className="text-white font-bold">
                  Advanced reach & SEO tools
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-24 bg-background relative overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-xl"
        >
          <div className="mb-10 lg:hidden flex justify-center">
            <Logo className="mb-4" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Get started with your free creator account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-4 bg-muted border-2 border-transparent rounded-[1.25rem] focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest ml-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="johndoe123"
                  className="w-full px-5 py-4 bg-muted border-2 border-transparent rounded-[1.25rem] focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="w-full pl-11 pr-4 py-4 bg-muted border-2 border-transparent rounded-[1.25rem] focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-4 bg-muted border-2 border-transparent rounded-[1.25rem] focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2 mt-2 px-1">
                <LuShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground font-medium tracking-tight">
                  Secured with 256-bit encryption
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 px-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                I agree to Blogify&apos;s{" "}
                <Link
                  href="#"
                  className="font-bold text-foreground hover:underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="font-bold text-foreground hover:underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-[1.25rem] font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LuLoader className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <LuArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative px-4 bg-background text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Sign up with provider
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 bg-background border border-border rounded-xl hover:bg-muted transition-all shadow-sm">
              <FaGoogle className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 bg-background border border-border rounded-xl hover:bg-muted transition-all shadow-sm">
              <FaGithub className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-700">Github</span>
            </button>
          </div>

          <p className="text-center mt-12 text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline underline-offset-4 decoration-2 decoration-teal-500/30"
            >
              Sign In here
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
