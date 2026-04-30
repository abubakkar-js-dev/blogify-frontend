"use client";

import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import {
  LuChartColumn,
  LuGlobe,
  LuLayoutGrid,
  LuPenTool,
  LuSearch,
  LuShare2,
  LuShield,
  LuSmartphone,
  LuZap,
} from "react-icons/lu";

const features = [
  {
    icon: <LuPenTool className="w-6 h-6 text-primary" />,
    title: "Modern Editor",
    description:
      "A distraction-free writing experience with rich media support and auto-save.",
    bg: "bg-primary/10",
  },
  {
    icon: <LuChartColumn className="w-6 h-6 text-secondary" />,
    title: "Advanced Analytics",
    description:
      "Deep insights into your readers, where they come from, and what they like.",
    bg: "bg-secondary/10",
  },
  {
    icon: <LuLayoutGrid className="w-6 h-6 text-accent" />,
    title: "Custom Themes",
    description:
      "Choose from a variety of beautiful layouts or build your own with our API.",
    bg: "bg-accent/10",
  },
  {
    icon: <LuSearch className="w-6 h-6 text-orange-600" />,
    title: "SEO Optimized",
    description:
      "Built-in tools to help your content rank higher on search engines.",
    bg: "bg-orange-50",
  },
  {
    icon: <LuZap className="w-6 h-6 text-yellow-600" />,
    title: "Blazing Fast",
    description:
      "Global CDN ensures your blog loads instantly for anyone, anywhere.",
    bg: "bg-yellow-50",
  },
  {
    icon: <LuShield className="w-6 h-6 text-red-600" />,
    title: "Privacy First",
    description:
      "You own your data. Secure backups and enterprise-grade encryption.",
    bg: "bg-red-50",
  },
  {
    icon: <LuSmartphone className="w-6 h-6 text-green-600" />,
    title: "Responsive Design",
    description:
      "Looks perfect on mobile, tablets, and desktops out of the box.",
    bg: "bg-green-50",
  },
  {
    icon: <LuGlobe className="w-6 h-6 text-purple-600" />,
    title: "Custom Domains",
    description: "Connect your own domain to maintain your brand consistency.",
    bg: "bg-purple-50",
  },
  {
    icon: <LuShare2 className="w-6 h-6 text-pink-600" />,
    title: "Social Integration",
    description:
      "Share your stories automatically with one-click social connectors.",
    bg: "bg-pink-50",
  },
];

export default function FeaturesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
            Platform Features
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Everything you need to{" "}
            <span className="text-primary">tell your story.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We&apos;ve built the ultimate platform for creators. Focus on your
            ideas while we handle the technical magic.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-background border border-border rounded-4xl hover:shadow-xl hover:shadow-teal-900/5 transition-all group"
          >
            <div
              className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Secondary CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 p-12 bg-primary rounded-[3rem] relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-primary/10 mb-10 text-lg">
            Join thousands of creators who chose Blogify to share their voice
            with the world.
          </p>
          <button className="px-10 py-4 bg-background text-primary rounded-2xl font-bold hover:bg-primary/10 transition-colors shadow-xl">
            Get Started for Free
          </button>
        </div>
      </motion.div>

      <Newsletter />
    </main>
  );
}
