'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HiOutlineSquares2X2, 
  HiOutlineDocumentText, 
  HiOutlineChartBar, 
  HiOutlineUsers, 
  HiOutlineEnvelope, 
  HiOutlineCog6Tooth,
  HiOutlinePlus,
  HiOutlineArrowLeftOnRectangle,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi2';
import Logo from '@/components/Logo';

const menuItems = [
  { name: 'Overview', href: '/dashboard', icon: HiOutlineSquares2X2 },
  { name: 'My Posts', href: '/dashboard/posts', icon: HiOutlineDocumentText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: HiOutlineChartBar },
  { name: 'Subscribers', href: '/dashboard/subscribers', icon: HiOutlineUsers },
  { name: 'Newsletter', href: '/dashboard/newsletter', icon: HiOutlineEnvelope },
  { name: 'Settings', href: '/dashboard/settings', icon: HiOutlineCog6Tooth },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      h-full bg-white border-r border-slate-200 flex flex-col pt-6 transition-all duration-300 ease-in-out relative group/sidebar
    `}>
      {/* Floating Toggle Button */}
      <button 
        onClick={onToggle}
        className={`
          absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 shadow-sm z-[100] transition-all
          opacity-0 group-hover/sidebar:opacity-100 focus:opacity-100
        `}
      >
        {isCollapsed ? <HiChevronRight className="w-3.5 h-3.5" /> : <HiChevronLeft className="w-3.5 h-3.5" />}
      </button>

      <div className={`mb-10 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-7 justify-start'}`}>
        <Logo showText={!isCollapsed} isCollapsed={isCollapsed} />
      </div>

      <div className={`px-4 mb-8 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <Link href="/dashboard/posts/new" className={isCollapsed ? "" : "w-full"}>
          <button className={`
            group relative flex items-center justify-center overflow-hidden bg-slate-900 text-white rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 active:scale-[0.98]
            ${isCollapsed ? 'w-12 h-12' : 'w-full py-4 px-4'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <HiOutlinePlus className={`stroke-[3px] transition-transform duration-500 group-hover:rotate-90 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
            
            <span className={`
              text-[11px] font-black uppercase tracking-[0.15em] relative z-10 whitespace-nowrap transition-all duration-300
              ${isCollapsed ? 'opacity-0 w-0 invisible' : 'opacity-100 w-auto ml-2 visible delay-200'}
            `}>
              New Post
            </span>
          </button>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} title={isCollapsed ? item.name : ''}>
              <div className={`
                flex items-center rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors duration-200
                ${isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5'}
                ${isActive 
                  ? 'bg-teal-50 text-teal-600' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
              `}>
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                
                <span className={`
                  truncate whitespace-nowrap transition-all duration-300
                  ${isCollapsed ? 'opacity-0 w-0 invisible' : 'opacity-100 w-auto visible delay-200'}
                `}>
                  {item.name}
                </span>

                {!isCollapsed && isActive && (
                   <motion.div 
                    layoutId="active-nav"
                    className="ml-auto w-1.5 h-1.5 bg-teal-600 rounded-full"
                   />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 mt-auto border-t border-slate-50 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button className={`
          flex items-center rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200
          ${isCollapsed ? 'w-10 h-10 justify-center p-0' : 'gap-3 px-4 py-3 w-full'}
        `} title={isCollapsed ? "Log out" : ""}>
          <HiOutlineArrowLeftOnRectangle className="w-5 h-5 shrink-0" />
          <span className={`
            whitespace-nowrap transition-all duration-300
            ${isCollapsed ? 'opacity-0 w-0 invisible' : 'opacity-100 w-auto visible delay-200'}
          `}>
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
}
