"use client";

import { postsData } from "@/lib/blog-data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineEllipsisHorizontal,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const stats = [
  {
    label: "Total Views",
    value: "24,842",
    change: "+12.5%",
    isPositive: true,
    icon: HiOutlineEye,
    color: "bg-teal-50 text-teal-600",
  },
  {
    label: "Total Likes",
    value: "1,284",
    change: "+5.2%",
    isPositive: true,
    icon: HiOutlineHeart,
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "Subscribers",
    value: "842",
    change: "+18.7%",
    isPositive: true,
    icon: HiOutlineUsers,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Earnings",
    value: "$432.50",
    change: "-2.4%",
    isPositive: false,
    icon: HiOutlineCurrencyDollar,
    color: "bg-amber-50 text-amber-600",
  },
];

// Mock Performance Chart Data for Recharts
const chartData = [
  { name: "Mon", views: 2000 },
  { name: "Tue", views: 4500 },
  { name: "Wed", views: 3000 },
  { name: "Thu", views: 6500 },
  { name: "Fri", views: 5500 },
  { name: "Sat", views: 8000 },
  { name: "Sun", views: 9500 },
];

export default function DashboardOverview() {
  const recentPosts = postsData.slice(0, 4);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black text-slate-900 leading-tight">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-slate-500 font-medium">
            Your platform growth is up{" "}
            <span className="text-teal-600 font-bold">12%</span> this week.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:border-slate-900 transition-all">
            Download Report
          </button>
          <Link href="/dashboard/posts/new">
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              Create Post
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Main Grid: Left Column (Stats + Chart) | Right Column (Widgets) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="xl:col-span-2 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${stat.isPositive ? "text-teal-600" : "text-rose-500"}`}
                  >
                    {stat.isPositive ? (
                      <HiOutlineArrowTrendingUp className="w-3 h-3" />
                    ) : (
                      <HiOutlineArrowTrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Chart Card with Recharts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-1">
                  Engagement Analytics
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Growth trend over the last 7 days
                </p>
              </div>
              <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none hover:border-teal-500 transition-colors">
                <option>Last 7 Days</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className="h-64 w-full relative group">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "16px",
                      border: "1px solid #f1f5f9",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    cursor={{
                      stroke: "#14b8a6",
                      strokeWidth: 2,
                      strokeDasharray: "5 5",
                    }}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 900 }}
                    dy={10}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#14b8a6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity Table-like list */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-900 leading-none">
                Content Performance
              </h2>
              <Link
                href="/dashboard/posts"
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                Manage All
              </Link>
            </div>

            <div className="bg-white border border-slate-100 rounded-4xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="col-span-6">Post Details</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Engagement</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y divide-slate-100">
                {recentPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50/50 transition-colors group cursor-pointer relative"
                  >
                    <div className="col-span-6 flex gap-4 min-w-0">
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors uppercase tracking-tight">
                          {post.title}
                        </h3>
                        <p className="text-[10px] font-medium text-slate-400">
                          {post.date}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="px-2 py-0.5 bg-teal-50 text-teal-600 border border-teal-100 rounded-md text-[8px] font-black uppercase tracking-widest">
                        Published
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1">
                          <HiOutlineEye className="w-3 h-3 text-slate-300" />{" "}
                          {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineHeart className="w-3 h-3 text-slate-300" />{" "}
                          {post.likes || 0}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end items-center gap-2 relative">
                      <AnimatePresence>
                        {activeMenu === idx ? (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex gap-1.5"
                          >
                            <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-teal-600 transition-all shadow-md">
                              <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-2 bg-white text-slate-600 border border-slate-100 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm">
                              <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                              <HiOutlineTrash className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(null);
                              }}
                              className="ml-1 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                            >
                              <HiOutlineEllipsisHorizontal className="w-4 h-4 rotate-90" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-2"
                          >
                            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                              <HiOutlineDocumentText className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(idx);
                              }}
                              className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-all"
                            >
                              <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section / Widgets */}
        <div className="space-y-8">
          {/* Quick Creator CTA */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
                <HiOutlineDocumentText className="w-6 h-6 text-slate-950" />
              </div>
              <h3 className="text-2xl font-black mb-2 leading-tight">
                New Story?
              </h3>
              <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">
                Let&apos;s craft something amazing and share it with your readers.
              </p>
              <Link href="/dashboard/posts/new">
                <button className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-400 transition-all transform active:scale-95 shadow-xl shadow-white/5">
                  Open Editor
                </button>
              </Link>
            </div>
          </div>

          {/* Social Stats/Notifications Mini List */}
          <div className="p-6 bg-white border border-slate-100 rounded-4xl shadow-sm">
            <div className="flex items-center justify-between mb-6 px-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-teal-500 decoration-2 underline-offset-4">
                Recent Feedback
              </h4>
              <HiOutlineChatBubbleLeftRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="space-y-4">
              {[
                {
                  user: "Sarah J.",
                  text: "Great insights on the AI post!",
                  time: "2m ago",
                  avatar: "https://i.pravatar.cc/150?u=sarah",
                },
                {
                  user: "Mike D.",
                  text: "Can we collaborate on the next one?",
                  time: "1h ago",
                  avatar: "https://i.pravatar.cc/150?u=mike",
                },
                {
                  user: "Elena R.",
                  text: "Check your DM for a partnership.",
                  time: "3h ago",
                  avatar: "https://i.pravatar.cc/150?u=elena",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image
                      src={item.avatar}
                      alt={item.user}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-black text-slate-900">
                        {item.user}
                      </p>
                      <span className="text-[9px] font-bold text-slate-300">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
              View All Comments
            </button>
          </div>

          {/* Category distribution */}
          <div className="p-6 bg-white border border-slate-100 rounded-4xl shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-6 underline decoration-teal-500 decoration-2 underline-offset-4">
              Engagement Split
            </h4>
            <div className="space-y-5">
              {[
                {
                  name: "Technology",
                  posts: 12,
                  percent: 65,
                  color: "bg-teal-500",
                },
                {
                  name: "Travel",
                  posts: 8,
                  percent: 45,
                  color: "bg-slate-900",
                },
                {
                  name: "Lifestyle",
                  posts: 4,
                  percent: 20,
                  color: "bg-slate-200",
                },
              ].map((cat) => (
                <div key={cat.name} className="px-2">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-2">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className="text-teal-600">{cat.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden p-px border border-slate-100 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
