"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const modules = [
  { slug: 'case-study-method', title: 'The Executive Case Study Method' },
  { slug: 'competitive-strategy', title: 'Competitive Strategy & Moats' },
  { slug: 'innovation-disruption', title: 'Innovation & Market Disruption' },
  { slug: 'leadership-dynamics', title: 'Interpersonal Dynamics & Leadership' },
  { slug: 'strategic-marketing', title: 'Strategic Marketing & Positioning' },
  { slug: 'negotiation', title: 'Advanced Negotiation Tactics' },
  { slug: 'corporate-finance', title: 'Corporate Finance & Valuation' },
  { slug: 'operations-systems', title: 'Operations & Systems Thinking' },
  { slug: 'global-strategy', title: 'Global Strategy & Expansion' },
  { slug: 'entrepreneurial-finance', title: 'Entrepreneurial Finance' },
  { slug: 'decision-making', title: 'Strategic Decision-Making' }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on mobile when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-navy text-cream rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-navy/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={clsx(
        "fixed top-0 left-0 z-40 h-screen w-64 border-r border-white/40 bg-cream/90 backdrop-blur-xl shadow-[4px_0_24px_-10px_rgba(0,0,0,0.1)] transition-transform duration-300 md:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-border/60 bg-gradient-to-b from-white/60 to-transparent">
          <div className="w-10 h-10 bg-navy text-cream flex items-center justify-center rounded-xl mb-4 shadow-sm">
            <GraduationCap size={20} />
          </div>
          <h1 className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-navy to-navy-light leading-tight mb-2">
            Strategic MBA
          </h1>
          <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">
            Masterclass Edition
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 scrollbar-thin">
          
          <nav className="px-4">
            <h2 className="px-2 text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">Overview</h2>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/" 
                  className={clsx(
                    "flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors",
                    pathname === '/' ? "bg-navy/5 text-navy font-bold" : "text-text-secondary hover:bg-navy/5 hover:text-navy"
                  )}
                >
                  <BookOpen size={16} />
                  <span>Curriculum</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/ask" 
                  className={clsx(
                    "flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors",
                    pathname === '/ask' ? "bg-navy/5 text-navy font-bold" : "text-text-secondary hover:bg-navy/5 hover:text-navy"
                  )}
                >
                  <MessageSquare size={16} />
                  <span>Ask Professor</span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="px-4">
            <h2 className="px-2 text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">Modules</h2>
            <ul className="space-y-1">
              {modules.map((mod, i) => {
                const href = `/modules/${mod.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={mod.slug}>
                    <Link 
                      href={href}
                      className={clsx(
                        "block px-2 py-2 text-sm rounded-md transition-colors line-clamp-2",
                        isActive ? "bg-navy/5 text-navy font-bold" : "text-text-secondary hover:bg-navy/5 hover:text-navy"
                      )}
                    >
                      <span className="opacity-50 text-xs mr-2 font-mono">{String(i+1).padStart(2, '0')}</span>
                      {mod.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
