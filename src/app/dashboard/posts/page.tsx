"use client";

import { postsData, type BlogPost } from "@/lib/blog-data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowTrendingUp,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDocumentDuplicate,
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineListBullet,
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineSquares2X2,
  HiOutlineTrash,
} from "react-icons/hi2";

type PostStatus = "Published" | "Draft" | "Scheduled";
type ViewMode = "grid" | "table";
type SortOption = "newest" | "oldest" | "popular" | "engaging";

interface DashboardPost extends BlogPost {
  status: PostStatus;
  comments: number;
}

// Extract unique categories for filter
const categories = [
  "All",
  ...Array.from(new Set(postsData.map((post) => post.tag))),
];

// Enhance posts with dashboard-specific data
const dashboardPosts: DashboardPost[] = postsData.map((post, idx) => ({
  ...post,
  status: idx === 2 ? "Draft" : idx === 4 ? "Scheduled" : "Published",
  comments: Math.floor(Math.random() * 50) + 10,
}));

const statusColors = {
  Published: "bg-teal-50 text-teal-600 border-teal-100",
  Draft: "bg-slate-100 text-slate-500 border-slate-200",
  Scheduled: "bg-blue-50 text-blue-600 border-blue-100",
};

export default function MyPostsPage() {
  const [statusFilter, setStatusFilter] = useState<PostStatus | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPosts = useMemo(() => {
    let result = dashboardPosts.filter((post) => {
      const matchesStatus =
        statusFilter === "All" || post.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || post.tag === categoryFilter;
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });

    // Handle Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "popular") return (b.views || 0) - (a.views || 0);
      if (sortBy === "engaging") return b.comments - a.comments;
      return 0;
    });

    return result;
  }, [statusFilter, categoryFilter, searchQuery, sortBy]);

  // Pagination Logic
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stats = [
    {
      label: "Total Views",
      value: "1.2M",
      icon: HiOutlineArrowTrendingUp,
      color: "text-teal-500",
      bg: "bg-teal-50",
    },
    {
      label: "Articles",
      value: dashboardPosts.length,
      icon: HiOutlineDocumentDuplicate,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Comments",
      value: "4.8K",
      icon: HiOutlineChatBubbleLeft,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      label: "Scheduled",
      value: "3",
      icon: HiOutlineCalendarDays,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-visible">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            My Content
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">
            Manage and track your storytelling journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all w-64"
            />
          </div>
          <Link href="/dashboard/posts/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 group">
              <HiOutlinePlus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>Create Post</span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white border border-slate-100 rounded-4xl shadow-sm hover:shadow-md transition-all group"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              {stat.label}
            </p>
            <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
          </motion.div>
        ))}
      </div>

      {/* Filters bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 py-4 px-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl">
            {["All", "Published", "Draft", "Scheduled"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setStatusFilter(tab as never);
                  setCurrentPage(1);
                }}
                className={`
                  px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${
                    statusFilter === tab
                      ? "bg-white text-slate-950 shadow-md border border-slate-50"
                      : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden lg:block" />

          {/* New Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Category
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none hover:border-teal-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none hover:border-teal-500 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="engaging">Most Discussed</option>
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-slate-900 border border-slate-50" : "text-slate-400 hover:text-slate-600"}`}
            >
              <HiOutlineSquares2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-all ${viewMode === "table" ? "bg-white shadow-sm text-slate-900 border border-slate-50" : "text-slate-400 hover:text-slate-600"}`}
            >
              <HiOutlineListBullet className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content View */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedPosts.map((post, idx) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 w-full group/image overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link href={`/blogs/${post.slug}`}>
                      <button className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl">
                        <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${statusColors[post.status]}`}
                  >
                    {post.status}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`px-2 py-0.5 ${post.tagColor} rounded-md text-[8px] font-black uppercase tracking-widest`}
                    >
                      {post.tag}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === idx ? null : idx)
                        }
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                      >
                        <HiOutlineEllipsisVertical className="w-5 h-5" />
                      </button>

                      <AnimatePresence>
                        {activeMenu === idx && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                          >
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl transition-all text-left group">
                              <HiOutlinePencilSquare className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                              <span className="text-[11px] font-black uppercase tracking-widest">
                                Edit Post
                              </span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-rose-600 rounded-xl transition-all text-left group">
                              <HiOutlineTrash className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                              <span className="text-[11px] font-black uppercase tracking-widest">
                                Delete
                              </span>
                            </button>
                            <div className="h-px bg-slate-100 my-1 mx-2" />
                            <Link href={`/blogs/${post.slug}`}>
                              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-left">
                                <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-slate-400" />
                                <span className="text-[11px] font-black uppercase tracking-widest">
                                  Preview
                                </span>
                              </button>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="min-h-12">
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2 uppercase tracking-tight">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="flex items-center gap-1">
                        <HiOutlineEye className="w-4 h-4" />
                        <span className="text-[10px] font-black">
                          {post.views?.toLocaleString() || "0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiOutlineHeart className="w-4 h-4" />
                        <span className="text-[10px] font-black">
                          {post.likes || "0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiOutlineChatBubbleLeft className="w-4 h-4" />
                        <span className="text-[10px] font-black">
                          {post.comments}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 italic font-mono">
                      {post.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto overflow-y-visible"
          >
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left">
                  <th className="px-6 py-4 font-black">Article</th>
                  <th className="px-6 py-4 font-black">Status</th>
                  <th className="px-6 py-4 font-black text-center">
                    Performance
                  </th>
                  <th className="px-6 py-4 font-black">Date</th>
                  <th className="px-6 py-4 font-black"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map((post, idx) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group bg-white hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <td className="px-6 py-4 rounded-l-3xl border-y border-l border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={post.image}
                            alt=""
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-widest text-teal-600 mb-0.5">
                            {post.tag}
                          </p>
                          <h4 className="text-xs font-black text-slate-900 group-hover:text-teal-600 transition-colors uppercase tracking-tight line-clamp-1">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-y border-slate-100">
                      <span
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-transparent ${statusColors[post.status]}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-y border-slate-100">
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-900">
                            {post.views?.toLocaleString()}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase">
                            Views
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-900">
                            {post.likes}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase">
                            Likes
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-y border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 italic font-mono">
                        {post.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 rounded-r-3xl border-y border-r border-slate-100 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-white rounded-xl transition-all">
                          <HiOutlinePencilSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {paginatedPosts.length === 0 && (
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-2">
            <HiOutlineMagnifyingGlass className="w-8 h-8 text-slate-200" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              No content found
            </h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto">
              Try adjusting your filters or search terms.
            </p>
          </div>
          <button
            onClick={() => {
              setStatusFilter("All");
              setCategoryFilter("All");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="text-teal-600 font-black text-[10px] uppercase tracking-widest hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Dynamic Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
          >
            <HiOutlineChevronLeft className="w-4 h-4 text-slate-900" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all
                      ${
                        currentPage === pageNum
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10"
                          : "border border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900"
                      }
                    `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
          >
            <HiOutlineChevronRight className="w-4 h-4 text-slate-900" />
          </button>
        </div>
      )}
    </div>
  );
}
