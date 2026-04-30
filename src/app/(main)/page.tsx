"use client";

import Newsletter from "@/components/Newsletter";
import {
  LuArrowRight,
  LuChartColumnIncreasing,
  LuBookmark,
  LuCamera,
  LuChevronRight,
  LuCoffee,
  LuCpu,
  LuGlobe,
  LuHeart,
  LuLayoutDashboard,
  LuPenLine,
  LuPlus,
  LuTrendingUp,
  LuType,
  LuUsers,
  LuZap,
} from "react-icons/lu";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: <LuPenLine className="w-5 h-5 text-teal-600" />, title: "Write effortlessly", desc: "Beautiful editor for creators", bg: "bg-teal-50" },
  { icon: <LuUsers className="w-5 h-5 text-blue-600" />, title: "Grow your audience", desc: "Built-in SEO and engagement tools", bg: "bg-blue-50" },
  { icon: <LuChartColumnIncreasing className="w-5 h-5 text-indigo-600" />, title: "Track & improve", desc: "Powerful analytics to keep growing", bg: "bg-indigo-50" },
];

import {
  BlogCategory,
  BlogPost,
  getAllCategories,
  getAllPosts,
} from "@/lib/blog-data";
import { useEffect, useState } from "react";

// Icon Map for dynamic category icons
const iconMap: Record<string, React.ReactNode> = {
  Cpu: <LuCpu className="w-5 h-5" />,
  Globe: <LuGlobe className="w-5 h-5" />,
  Heart: <LuHeart className="w-5 h-5" />,
  Zap: <LuZap className="w-5 h-5" />,
  Coffee: <LuCoffee className="w-5 h-5" />,
  Camera: <LuCamera className="w-5 h-5" />,
};

const brands = ["The Verge", "TechCrunch", "Wired", "Medium", "Substack"];

const features = [
  { title: "Distraction-Free Editor", desc: "Focus purely on your words with our clean, minimalist writing interface designed for absolute flow.", icon: <LuType className="w-6 h-6 text-white" />, color: "bg-teal-500" },
  { title: "Smart SEO Tools", desc: "Built-in optimization that helps your stories reach the right readers on search engines automatically.", icon: <LuTrendingUp className="w-6 h-6 text-white" />, color: "bg-blue-500" },
  { title: "Detailed Analytics", desc: "Understand your audience with deep insights into who is reading and where they come from.", icon: <LuLayoutDashboard className="w-6 h-6 text-white" />, color: "bg-indigo-500" },
];

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [posts, cats] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]);
        setFeaturedPosts(posts.slice(0, 6));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <main className="relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-125 h-125 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-150 h-150 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-100 h-100 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50/80 backdrop-blur-sm text-teal-700 rounded-full text-[10px] sm:text-xs font-bold mb-8 border border-teal-100/30"
            >
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Your ideas. Your voice. Your audience.
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              Where ideas <br className="hidden sm:block" />
              inspire and stories <br className="hidden sm:block" />
              make an{" "}
              <span className="text-teal-600 relative inline-block">
                impact.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-teal-400/40"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 2, 50 5 T 100 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
              Blogify is a modern blogging platform to share your thoughts, grow
              your audience, and build your brand. Join 50K+ readers today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-teal-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-700 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-600/20">
                  Start Writing <LuArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/blogs" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center">
                  Explore Blogs
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[13px] leading-tight">
                      {stat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:mt-0 mt-20"
          >
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 rounded-full blur-[100px] -z-10" />

            <div className="relative group p-4 sm:p-6">
              <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-2xl border-white border-12 rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <Image
                  src="https://picsum.photos/seed/adventure/1200/1600"
                  alt="Stories"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>

              {/* Top Right Stats Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-2 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-5 w-48 border border-white/50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                    Total Readers
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mb-2">
                  24.8K
                </div>
                <div className="h-10 w-full">
                  <svg
                    className="w-full h-full text-teal-500"
                    viewBox="0 0 100 40"
                  >
                    <path
                      d="M0 35 Q 20 15, 40 30 T 70 15 T 100 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="20" r="3" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center">
                  <LuArrowRight className="w-3 h-3 -rotate-45" />
                </div>
              </motion.div>

              {/* Bottom Writers Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-3xl p-4 flex items-center gap-6 border border-slate-50 w-[95%] sm:w-max sm:min-w-[320px]"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex -space-x-3 shrink-0">
                    {[1, 2, 3, 4].map((i) => (
                      <Image
                        key={i}
                        src={`https://i.pravatar.cc/100?u=user${i}`}
                        width={30}
                        height={30}
                        className="rounded-full border-2 border-white sm:w-9 sm:h-9"
                        alt="Join Blogify"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black text-slate-900">
                      Join 10K+ writers
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold">
                      sharing their stories
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-teal-700 transition-all hover:scale-105 shrink-0">
                  <LuPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof / Brands */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 pt-16 border-t border-slate-100/50"
        >
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
            Trusted by creators from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-2xl font-black text-slate-900 tracking-tighter"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Categories Bar */}
      <section className="bg-white border-y border-slate-100 py-12 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
              Explore Topics
            </h2>
            <Link
              href="/blogs"
              className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 group"
            >
              View all{" "}
              <LuChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-slate-50 animate-pulse rounded-2xl border border-slate-100"
                  />
                ))
              : categories.map((cat, idx) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group cursor-pointer flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all"
                  >
                    <div
                      className={`w-10 h-10 shrink-0 ${cat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      {iconMap[cat.icon]}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-black text-slate-900 text-xs truncate">
                        {cat.name}
                      </h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
                        {cat.count} stories
                      </p>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-20 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Featured Posts
            </h2>
            <p className="text-slate-500">
              Hand-picked articles from our top community members.
            </p>
          </div>
          <Link
            href="/blogs"
            className="text-teal-600 font-semibold text-sm flex items-center gap-1 group"
          >
            View all posts{" "}
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-4/5 bg-slate-50 animate-pulse rounded-3xl"
                />
              ))
            : featuredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-teal-200 transition-all hover:shadow-xl hover:shadow-teal-900/5 h-full flex flex-col"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="relative aspect-4/3 overflow-hidden block"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute bottom-4 left-4 ${post.tagColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm`}
                    >
                      {post.tag}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <Link href={`/blogs/${post.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 min-h-14 group-hover:text-teal-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.avatar}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {post.author}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {post.date}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <LuBookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section className="bg-slate-950 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-teal-500/10 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center mb-16 md:mb-24">
          <span className="text-teal-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4 inline-block">
            The Platform
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
            Designed for creators who <br className="hidden sm:block" /> demand
            more.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            We&apos;ve removed the complexity to let your creativity shine.
            Everything you need to go from idea to viral story.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 sm:p-10 bg-white/5 border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] hover:bg-white/10 transition-all hover:border-white/20"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-2xl shadow-indigo-500/20 transition-transform group-hover:scale-110 group-hover:rotate-3`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/register">
            <button className="px-10 py-5 bg-teal-500 text-white rounded-2xl font-black text-sm hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/40 hover:scale-105 active:scale-95">
              Join the revolution
            </button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}
