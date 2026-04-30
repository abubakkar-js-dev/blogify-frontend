"use client";

import Newsletter from "@/components/Newsletter";
import { BlogPost } from "@/lib/blog-data";
import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import {
  LuArrowLeft,
  LuBookmark,
  LuCalendar,
  LuClock,
  LuEllipsis,
  LuShare2,
  LuThumbsUp,
  LuUser,
} from "react-icons/lu";

interface BlogPostClientProps {
  post: BlogPost;
  suggestedPosts: BlogPost[];
}

export default function BlogPostClient({ post, suggestedPosts }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isLiked, setIsLiked] = useState(false);

  return (
    <main className="relative bg-background pb-24">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-60"
        style={{ scaleX }}
      />

      {/* Floating Share Bar (Desktop) */}
      <div className="hidden xl:block fixed left-1/2 -ml-160 top-48 z-40 bg-background border border-border rounded-full p-2 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-2">
          {[
            {
              icon: LuThumbsUp,
              color: isLiked ? "text-primary bg-primary/10" : "text-muted-foreground",
              onClick: () => setIsLiked(!isLiked),
            },
            { icon: FaXTwitter, color: "text-sky-400 hover:bg-sky-50" },
            { icon: FaLinkedinIn, color: "text-secondary hover:bg-secondary/10" },
            { icon: FaFacebookF, color: "text-accent hover:bg-accent/10" },
            { icon: LuBookmark, color: "text-muted-foreground hover:bg-muted" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 ${item.color}`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
          <div className="w-6 h-px bg-muted mx-auto my-1" />
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
            <LuEllipsis className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-12 mb-16">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em] mb-12 group"
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <LuArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            Back to Articles
          </Link>

          <header className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`${post.tagColor} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-current opacity-80 backdrop-blur-sm shadow-sm`}
                >
                  {post.tag}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                  <LuClock className="w-3.5 h-3.5" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight mb-10">
                {post.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 py-8 border-y border-border">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14">
                    <Image
                      src={post.avatar}
                      alt={post.author}
                      fill
                      className="rounded-full object-cover ring-4 ring-slate-50 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-black text-foreground text-lg leading-tight">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mt-1">
                      <span className="flex items-center gap-1.5">
                        <LuCalendar className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-primary font-bold">
                        Verified Expert
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                    <LuShare2 className="w-4 h-4" /> Share Article
                  </button>
                  <button className="p-3 bg-muted text-muted-foreground rounded-2xl hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/10">
                    <LuBookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </header>
        </div>

        {/* Layout with Content and Sidebar */}
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-16/10 rounded-[3rem] overflow-hidden mb-16 shadow-2xl border-white border-8"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-black prose-headings:text-foreground prose-p:text-slate-600 prose-p:leading-relaxed prose-blockquote:border-primary prose-blockquote:bg-primary/10 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-teal-700 transition-all"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.article>

            {/* Tags section */}
            <div className="flex flex-wrap gap-3 mt-16 pb-16 border-b border-border">
              {["Writing", "Inspiration", post.tag].map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 bg-muted text-muted-foreground rounded-xl text-xs font-bold border border-border hover:border-teal-200 hover:text-primary transition-colors cursor-pointer"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Author Card Footer */}
            <div className="mt-20 p-8 md:p-12 bg-background rounded-4xl md:rounded-[3rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="relative w-32 h-32 shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={post.avatar}
                    alt={post.author}
                    fill
                    className="rounded-3xl object-cover shadow-2xl rotate-3 group-hover:rotate-0 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-4 inset-x-0 mx-auto w-max px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    Author
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black mb-4">
                    Meet {post.author}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                    {post.bio}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button className="px-6 py-3 bg-background text-foreground rounded-2xl font-bold text-sm hover:bg-primary/10 transition-all flex items-center gap-2">
                      <LuUser className="w-4 h-4" /> Follow Author
                    </button>
                    <div className="flex items-center gap-2">
                      {[FaXTwitter, FaLinkedinIn, FaGithub].map((Icon, i) => (
                        <button
                          key={i}
                          className="w-10 h-10 rounded-xl border border-white/10 hover:bg-background/10 flex items-center justify-center transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <section className="mt-24 mb-24">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-foreground">
                    Discussion
                  </h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-extrabold leading-none">
                    12 Comments
                  </span>
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <LuClock className="w-4 h-4" /> Sort by: Newest
                </div>
              </div>

              <div className="bg-muted rounded-[2.5rem] p-4 mb-12">
                <div className="bg-background rounded-4xl p-6 shadow-sm">
                  <textarea
                    placeholder="What are your thoughts on this story?"
                    className="w-full text-base text-slate-700 bg-transparent border-none focus:ring-0 outline-none resize-none min-h-35 placeholder:text-slate-300"
                  />
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <button className="hover:text-slate-600 p-2">
                        <LuShare2 className="w-5 h-5" />
                      </button>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] hidden sm:inline">
                        Markdown Supported
                      </span>
                    </div>
                    <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all transform active:scale-95 shadow-xl shadow-slate-900/10">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated single comment */}
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src="https://i.pravatar.cc/100?u=sarah"
                      alt="User"
                      fill
                      className="rounded-2xl object-cover ring-2 ring-slate-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-black text-foreground">
                        Sarah Jenkins
                      </h4>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      This article perfectly captures why I&apos;ve been struggling
                      lately. The &quot;systems vs willpower&quot; distinction is a
                      complete game changer for me. I&apos;m going to start habit
                      stacking my meditation with my morning tea.
                    </p>
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                        <LuThumbsUp className="w-3.5 h-3.5" /> 14
                      </button>
                      <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-12">
              {/* Newsletter Widget */}
              <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-black mb-4 relative z-10">
                  Get the best of Blogify
                </h3>
                <p className="text-primary/10 text-sm mb-8 leading-relaxed opacity-90 relative z-10">
                  Join our newsletter and get the weekly digest of the best
                  stories from around the world.
                </p>
                <div className="space-y-3 relative z-10">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-background/10 border border-white/20 rounded-2xl text-sm text-white placeholder:text-primary/10/50 focus:outline-none focus:bg-background/20 transition-all font-medium"
                  />
                  <button className="w-full py-4 bg-background text-primary rounded-2xl font-black text-sm hover:bg-primary/10 transition-all shadow-xl shadow-black/10">
                    Subscribe Now
                  </button>
                </div>
                <p className="text-[10px] text-primary/10/50 text-center font-bold uppercase tracking-widest mt-6">
                  No spam. Ever.
                </p>
              </div>

              {/* Suggested Articles */}
              <div>
                <h3 className="text-lg font-black text-foreground mb-8 flex items-center justify-between">
                  Related Articles
                  <Link
                    href="/blogs"
                    className="text-primary text-[10px] uppercase tracking-widest hover:underline"
                  >
                    View All
                  </Link>
                </h3>
                <div className="space-y-8">
                  {suggestedPosts.map((sp) => (
                    <Link
                      key={sp.slug}
                      href={`/blogs/${sp.slug}`}
                      className="group flex gap-5 items-start"
                    >
                      <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-border">
                        <Image
                          src={sp.image}
                          alt={sp.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`${sp.tagColor} px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider mb-2 inline-block`}
                        >
                          {sp.tag}
                        </span>
                        <h4 className="font-black text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {sp.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2">
                          {sp.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sticky Footer Info */}
              <div className="pt-12 border-t border-border">
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <Link href="/contact" className="hover:text-slate-600">
                    Contact
                  </Link>
                  <Link href="/privacy" className="hover:text-slate-600">
                    Privacy
                  </Link>
                  <Link href="/terms" className="hover:text-slate-600">
                    Terms
                  </Link>
                </div>
                <p className="text-[10px] text-slate-300 mt-4 font-medium italic">
                  © 2024 Blogify Media. All rights reserved.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Suggested reading at the bottom (Mobile/Tablet and Desktop) */}
      <section className="bg-muted mt-32 py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-black text-foreground mb-2">
                More from Blogify
              </h2>
              <p className="text-muted-foreground font-medium tracking-tight">
                Keep reading the most inspiring stories of the week.
              </p>
            </div>
            <Link href="/blogs">
              <button className="px-8 py-4 bg-background text-foreground rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-muted transition-all border border-border shadow-sm">
                Explore All Articles{" "}
                <LuArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {suggestedPosts.map((sp, idx) => (
              <motion.div
                key={sp.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-background rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl transition-all h-full flex flex-col shadow-sm"
              >
                <Link
                  href={`/blogs/${sp.slug}`}
                  className="relative aspect-16/10 block overflow-hidden"
                >
                  <Image
                    src={sp.image}
                    alt={sp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute top-4 left-4 ${sp.tagColor} px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm`}
                  >
                    {sp.tag}
                  </div>
                </Link>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-foreground mb-6 leading-tight group-hover:text-primary transition-colors">
                    {sp.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={sp.avatar}
                        alt={sp.author}
                        width={32}
                        height={32}
                        className="rounded-full shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-bold text-foreground text-xs">
                        {sp.author}
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      {sp.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
