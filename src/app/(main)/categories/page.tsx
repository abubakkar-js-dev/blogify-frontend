"use client";

import Newsletter from "@/components/Newsletter";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  LuBrain,
  LuBriefcase,
  LuCamera,
  LuCoffee,
  LuHeart,
  LuMapPin,
  LuMonitor,
  LuPalette,
  LuTrendingUp,
} from "react-icons/lu";

const categories = [
  {
    icon: <LuMonitor className="w-5 h-5" />,
    name: "Technology",
    count: "245 Posts",
    color: "bg-blue-50 text-blue-600",
    image: "https://picsum.photos/seed/technology/400/300",
  },
  {
    icon: <LuMapPin className="w-5 h-5" />,
    name: "Travel",
    count: "182 Posts",
    color: "bg-teal-50 text-teal-600",
    image: "https://picsum.photos/seed/travel2/400/300",
  },
  {
    icon: <LuCoffee className="w-5 h-5" />,
    name: "Lifestyle",
    count: "312 Posts",
    color: "bg-orange-50 text-orange-600",
    image: "https://picsum.photos/seed/lifestyle2/400/300",
  },
  {
    icon: <LuCamera className="w-5 h-5" />,
    name: "Photography",
    count: "94 Posts",
    color: "bg-red-50 text-red-600",
    image: "https://picsum.photos/seed/photography2/400/300",
  },
  {
    icon: <LuHeart className="w-5 h-5" />,
    name: "Health",
    count: "156 Posts",
    color: "bg-green-50 text-green-600",
    image: "https://picsum.photos/seed/health2/400/300",
  },
  {
    icon: <LuBriefcase className="w-5 h-5" />,
    name: "Business",
    count: "128 Posts",
    color: "bg-indigo-50 text-indigo-600",
    image: "https://picsum.photos/seed/business/400/300",
  },
  {
    icon: <LuPalette className="w-5 h-5" />,
    name: "Design",
    count: "203 Posts",
    color: "bg-pink-50 text-pink-600",
    image: "https://picsum.photos/seed/design/400/300",
  },
  {
    icon: <LuTrendingUp className="w-5 h-5" />,
    name: "Marketing",
    count: "87 Posts",
    color: "bg-yellow-50 text-yellow-600",
    image: "https://picsum.photos/seed/marketing/400/300",
  },
  {
    icon: <LuBrain className="w-5 h-5" />,
    name: "Personal Growth",
    count: "167 Posts",
    color: "bg-purple-50 text-purple-600",
    image: "https://picsum.photos/seed/growth/400/300",
  },
];

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4 block">
            Categories
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Explore your <br className="hidden sm:block" />{" "}
            <span className="text-teal-500">passions.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-slate-500 text-sm md:text-base max-w-sm mb-2"
        >
          Browse through our curated collection of topics and find stories that
          resonate with you.
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, idx) => (
          <Link key={cat.name} href={`/blogs?category=${cat.name}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative cursor-pointer rounded-4xl sm:rounded-[2.5rem] overflow-hidden aspect-4/3 shadow-lg shadow-slate-200/50"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <div
                    className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1`}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-slate-300 text-xs font-medium">
                    {cat.count}
                  </p>
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                  <LuTrendingUp className="w-4 h-4 rotate-45" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Featured Section */}
      <section className="mt-32">
        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Our community is constantly growing. If you have a unique voice or
              a niche topic, start your own blog and build a community around
              it.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-colors">
                Start a New Topic
              </button>
              <button className="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold border border-slate-200 hover:border-slate-300 transition-all">
                Request Category
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative aspect-square lg:aspect-auto h-75 rounded-4xl overflow-hidden">
            <Image
              src="https://picsum.photos/seed/community/800/600"
              alt="Community"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
