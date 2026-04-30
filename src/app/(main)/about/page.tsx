'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  LuUsers, 
  LuTarget, 
  LuHeart, 
  LuSparkles,
  LuArrowRight
} from 'react-icons/lu';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import Newsletter from '@/components/Newsletter';

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Visionary leader with 10+ years in digital publishing.'
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Engineering',
    image: 'https://i.pravatar.cc/150?u=marcus',
    bio: 'Architecting the future of real-time collaborative writing.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    image: 'https://i.pravatar.cc/150?u=elena',
    bio: 'Passionate about typography and minimalist design.'
  },
  {
    name: 'David Kim',
    role: 'Community Lead',
    image: 'https://i.pravatar.cc/150?u=david',
    bio: 'Building spaces where Every voice feels heard.'
  }
];

const values = [
  {
    icon: <LuSparkles className="w-6 h-6 text-teal-600" />,
    title: 'Creativity First',
    desc: 'We build tools that stay out of the way, letting your ideas shine through.'
  },
  {
    icon: <LuUsers className="w-6 h-6 text-blue-600" />,
    title: 'Inclusive Community',
    desc: 'A safe space for diverse perspectives and authentic storytelling.'
  },
  {
    icon: <LuTarget className="w-6 h-6 text-indigo-600" />,
    title: 'Radical Transparency',
    desc: 'Honest communication with our users about how we build and grow.'
  },
  {
    icon: <LuHeart className="w-6 h-6 text-red-600" />,
    title: 'Privacy Minded',
    desc: 'Your data belongs to you. We never sell your personal information.'
  }
];

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            We're on a mission to <span className="text-teal-500">democratize storytelling.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Blogify started in a small cafe in 2022 with a simple question: Why is it so hard to start a beautiful blog without being a tech expert?
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Today, we're a global team empowering thousands of writers to share their passions, build their brands, and connect with audiences they never thought possible.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <Image 
            src="https://picsum.photos/seed/about/1000/1000" 
            alt="Our team working"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-teal-500/10 mix-blend-multiply" />
        </motion.div>
      </div>

      {/* Values Grid */}
      <section className="mb-40">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Values that drive us</h2>
          <p className="text-slate-500">The core principles behind every decision we make at Blogify.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div 
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Meet the creators</h2>
            <p className="text-slate-500 max-w-sm">The humans behind the screens building the future of blogging.</p>
          </div>
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:border-slate-300 transition-all flex items-center gap-2 group">
            Work with us <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((person, i) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6">
                <Image 
                  src={person.image} 
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-4 bottom-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-center gap-4">
                  <FaXTwitter className="w-4 h-4 text-white hover:text-teal-400 cursor-pointer" />
                  <FaLinkedinIn className="w-4 h-4 text-white hover:text-teal-400 cursor-pointer" />
                  <FaGithub className="w-4 h-4 text-white hover:text-teal-400 cursor-pointer" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
              <p className="text-teal-600 text-sm font-bold mb-3">{person.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
