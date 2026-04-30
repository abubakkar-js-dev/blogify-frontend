"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  LuCircleCheckBig,
  LuLoader,
  LuMail,
  LuMapPin,
  LuMessageCircle,
  LuPhone,
  LuSend,
} from "react-icons/lu";

const contactInfo = [
  {
    icon: <LuMail className="w-5 h-5 text-primary" />,
    title: "Email us",
    value: "hello@blogify.io",
    desc: "For general inquiries and support.",
  },
  {
    icon: <LuMessageCircle className="w-5 h-5 text-secondary" />,
    title: "Live chat",
    value: "Available 24/7",
    desc: "Talk to our friendly bot or humans.",
  },
  {
    icon: <LuMapPin className="w-5 h-5 text-accent" />,
    title: "Our office",
    value: "San Francisco, CA",
    desc: "Come say hi at our HQ.",
  },
  {
    icon: <LuPhone className="w-5 h-5 text-orange-600" />,
    title: "Call us",
    value: "+1 (555) 000-0000",
    desc: "Mon-Fri from 8am to 5pm PST.",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            We&apos;d love to <span className="text-primary">hear from you.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-12 max-w-lg">
            Have a question, feedback, or just want to say hello? Fill out the
            form below and we&apos;ll get back to you as soon as possible.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background p-12 rounded-[2.5rem] border border-border shadow-xl shadow-slate-200/50 text-center"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 mx-auto">
                  <LuCircleCheckBig className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for reaching out. A member of our team will get back
                  to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 bg-background p-8 md:p-10 rounded-[2.5rem] border border-border shadow-xl shadow-slate-200/50"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider ml-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="w-full px-5 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider ml-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full px-5 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider ml-1">
                    Subject
                  </label>
                  <select className="w-full px-5 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Press</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider ml-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-5 py-4 bg-muted border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none resize-none"
                  />
                </div>

                <button
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <LuLoader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <LuSend className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:pt-24"
        >
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="p-6 bg-background border border-border rounded-3xl"
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                <p className="text-primary font-bold text-sm mb-2">
                  {info.value}
                </p>
                <p className="text-xs text-muted-foreground">{info.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold mb-4">Connect on social</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Follow us for platform updates, writing tips, and creator
              spotlights.
            </p>
            <div className="flex gap-4">
              {[FaXTwitter, FaLinkedinIn, FaGithub].map((Icon, i) => (
                <button
                  key={i}
                  className="px-6 py-3 bg-background/5 border border-white/10 rounded-xl hover:bg-background/10 hover:border-white/20 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
              <span className="w-8 h-px bg-slate-800" />
              Join our community
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
