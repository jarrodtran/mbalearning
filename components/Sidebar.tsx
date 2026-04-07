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
  { slug: 'decision-making', title: 'Strategic Decision-Making' },
  { slug: 'business-analytics-ai', title: 'Business Analytics, AI & Data Strategy' },
  { slug: 'managerial-accounting', title: 'Managerial Accounting & Control' },
  { slug: 'venture-capital', title: 'Venture Capital & Private Equity' },
  { slug: 'organizational-behavior', title: 'Organizational Behavior & Change' },
  { slug: 'macroeconomics', title: 'Macroeconomics & Global Markets' },
  { slug: 'supply-chain', title: 'Supply Chain & Logistics Management' }
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
        "fixed top-0 left-0 md:top-6 md:left-6 z-40 h-screen md:h-[calc(100vh-48px)] w-64 md:w-64 border border-white/60 bg-cream/80 backdrop-blur-xl md:rounded-2xl shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 md:translate-x-0 flex flex-col overflow-hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-border/40 bg-gradient-to-b from-white to-transparent">
          <div className="w-10 h-10 bg-accent text-white flex items-center justify-center rounded-xl mb-4 shadow-md shadow-accent/20">
            <GraduationCap size={20} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy leading-tight mb-2">
            Strategic MBA
          </h1>
          <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">
            Masterclass Edition
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 scrollbar-thin">
          
          <nav className="px-4">
            <h2 className="px-2 text-xs font-bold text-text-secondary/60 uppercase tracking-widest mb-3">Overview</h2>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/" 
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300",
                    pathname === '/' ? "bg-white shadow-sm border border-border/50 text-accent font-bold" : "text-text-secondary hover:bg-white/50 hover:text-navy"
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
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300",
                    pathname === '/ask' ? "bg-white shadow-sm border border-border/50 text-accent font-bold" : "text-text-secondary hover:bg-white/50 hover:text-navy"
                  )}
                >
                  <MessageSquare size={16} />
                  <span>Ask Professor</span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="px-4">
            <h2 className="px-2 text-xs font-bold text-text-secondary/60 uppercase tracking-widest mb-3">Modules</h2>
            <ul className="space-y-1">
              {modules.map((mod, i) => {
                const href = `/modules/${mod.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={mod.slug}>
                    <Link 
                      href={href}
                      className={clsx(
                        "block px-3 py-2 text-sm rounded-lg transition-all duration-300 line-clamp-2",
                        isActive ? "bg-white shadow-sm border border-border/50 text-accent font-bold" : "text-text-secondary hover:bg-white/50 hover:text-navy"
                      )}
                    >
                      <span className={clsx("text-xs mr-2 font-mono", isActive ? "text-accent/60" : "opacity-40")}>{String(i+1).padStart(2, '0')}</span>
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
