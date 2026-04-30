"use client";

import Newsletter from "@/components/Newsletter";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  LuBookmark,
  LuCalendar,
  LuChevronRight,
  LuClock,
  LuFilter,
  LuSearch,
  LuShare2,
  LuX,
} from "react-icons/lu";

import Loading from "@/components/Loading";
import {
  BlogCategory,
  BlogPost,
  getAllCategories,
  getAllPosts,
  postsData,
} from "@/lib/blog-data";

function BlogContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>(postsData as BlogPost[]);
  const [categoryList, setCategoryList] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [readTimeFilter, setReadTimeFilter] = useState<
    "all" | "short" | "medium" | "long"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]);
        setPosts(fetchedPosts);
        setCategoryList([
          { name: "All", icon: "", color: "", count: "" } as BlogCategory,
          ...fetchedCategories,
        ]);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Sync state with URL params (adjusting state during render)
  const queryParam = searchParams.get("q");
  const categoryParam = searchParams.get("category");
  const [prevParams, setPrevParams] = useState({ queryParam, categoryParam });

  if (queryParam !== prevParams.queryParam || categoryParam !== prevParams.categoryParam) {
    if (queryParam && queryParam !== searchQuery) setSearchQuery(queryParam);
    if (categoryParam && categoryParam !== selectedCategory) setSelectedCategory(categoryParam);
    setPrevParams({ queryParam, categoryParam });
  }

  // Reset page when filtering changes (adjusting state during render)
  const [prevFilters, setPrevFilters] = useState({ selectedCategory, searchQuery, sortBy, readTimeFilter });
  if (
    selectedCategory !== prevFilters.selectedCategory ||
    searchQuery !== prevFilters.searchQuery ||
    sortBy !== prevFilters.sortBy ||
    readTimeFilter !== prevFilters.readTimeFilter
  ) {
    setCurrentPage(1);
    setPrevFilters({ selectedCategory, searchQuery, sortBy, readTimeFilter });
  }

  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.tag === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      // Parse read time (e.g., "12 min read" -> 12)
      const minutes = parseInt(post.readTime.split(" ")[0]) || 0;
      let matchesReadTime = true;
      if (readTimeFilter === "short") matchesReadTime = minutes < 5;
      else if (readTimeFilter === "medium")
        matchesReadTime = minutes >= 5 && minutes <= 10;
      else if (readTimeFilter === "long") matchesReadTime = minutes > 10;

      return matchesCategory && matchesSearch && matchesReadTime;
    });

    // Sort result
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, selectedCategory, searchQuery, readTimeFilter, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, postsPerPage]);

  const featuredPost =
    currentPage === 1 && currentPosts.length > 0 ? currentPosts[0] : null;
  const gridPosts = featuredPost ? currentPosts.slice(1) : currentPosts;

  return (
    <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 text-foreground">
      {/* Header & Filters */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Our Blogs</h1>
            <p className="text-muted-foreground">
              Discover stories, thinking, and expertise from writers everywhere.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hover:text-slate-600"
                >
                  <LuX className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 border rounded-xl transition-all flex items-center gap-2 ${
                  showFilters
                    ? "bg-primary/10 border-teal-200 text-primary"
                    : "bg-background border-border text-slate-600 hover:bg-muted"
                }`}
              >
                <LuFilter className="w-5 h-5" />
                {(sortBy !== "newest" || readTimeFilter !== "all") && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                )}
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl z-50 p-6"
                  >
                    <div className="mb-6">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        Sorting
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "newest", label: "Newest" },
                          { id: "oldest", label: "Oldest" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() =>
                              setSortBy(opt.id as "newest" | "oldest")
                            }
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                              sortBy === opt.id
                                ? "bg-primary text-white"
                                : "bg-muted text-slate-600 hover:bg-muted"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        Read Time
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "all", label: "All" },
                          { id: "short", label: "< 5 min" },
                          { id: "medium", label: "5-10 min" },
                          { id: "long", label: "> 10 min" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() =>
                              setReadTimeFilter(
                                opt.id as "all" | "short" | "medium" | "long",
                              )
                            }
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                              readTimeFilter === opt.id
                                ? "bg-primary text-white"
                                : "bg-muted text-slate-600 hover:bg-muted"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSortBy("newest");
                        setReadTimeFilter("all");
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-rose-500 transition-colors"
                    >
                      <LuX className="w-3 h-3" /> Reset all
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categoryList.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                selectedCategory === cat.name
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-background border-border text-slate-600 hover:border-teal-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-24"
          >
            <Loading />
          </motion.div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24 bg-muted rounded-[3rem] border-2 border-dashed border-border"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <LuSearch className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortBy("newest");
                setReadTimeFilter("all");
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative mb-20 aspect-4/5 sm:aspect-video md:aspect-21/9 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 md:bottom-12 md:left-12 md:right-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`${featuredPost.tagColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}
                    >
                      {selectedCategory === "All" ? "Featured: " : ""}
                      {featuredPost.tag}
                    </span>
                    <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest leading-none">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 max-w-3xl leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-300 mb-6 sm:mb-8 max-w-xl text-xs sm:text-base lg:text-lg line-clamp-3 md:line-clamp-none">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={featuredPost.avatar}
                        alt={featuredPost.author}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white/20 sm:w-10 sm:h-10"
                      />
                      <div className="text-white">
                        <p className="text-xs sm:text-sm font-bold">
                          {featuredPost.author}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          {featuredPost.date}
                        </p>
                      </div>
                    </div>
                    <Link href={`/blogs/${featuredPost.slug}`}>
                      <button className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-background text-foreground rounded-xl font-bold text-xs sm:text-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group/btn">
                        Read Article{" "}
                        <LuChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {gridPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col h-full bg-background border border-border rounded-4xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="relative aspect-4/3 block overflow-hidden"
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
                    <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2 bg-background/90 backdrop-blur rounded-full text-slate-600 hover:text-primary">
                        <LuBookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1">
                        <LuCalendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="flex items-center gap-1">
                        <LuClock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="block mb-4 group/title"
                    >
                      <h3 className="text-xl font-bold text-foreground leading-tight group-hover/title:text-primary transition-colors line-clamp-2 min-h-12">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground mb-8 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.avatar}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                        <div className="text-xs">
                          <p className="font-bold text-foreground">
                            {post.author}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Verified Writer
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <LuShare2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-4">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              currentPage === 1
                ? "bg-muted text-slate-300 cursor-not-allowed opacity-50"
                : "bg-background border border-border text-slate-600 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            }`}
          >
            <LuChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex items-center gap-2 bg-muted p-1.5 rounded-3xl border border-border shadow-inner">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-black transition-all duration-300 relative overflow-hidden ${
                  page === currentPage
                    ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(13,148,136,0.5)] scale-110 z-10"
                    : "text-muted-foreground hover:bg-background hover:text-primary hover:shadow-sm"
                }`}
              >
                {page}
                {page === currentPage && (
                  <motion.div
                    layoutId="pagination-active"
                    className="absolute inset-0 bg-primary -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-muted text-slate-300 cursor-not-allowed opacity-50"
                : "bg-background border border-border text-slate-600 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            }`}
          >
            <LuChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Newsletter />
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
