import { getModuleData, getSortedModulesData } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProfessorChat from '@/components/ProfessorChat';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const modules = getSortedModulesData();
  return modules.map((mod) => ({
    slug: mod.slug,
  }));
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const modules = getSortedModulesData();
  const currentIndex = modules.findIndex((m) => m.slug === params.slug);
  
  if (currentIndex === -1) {
    notFound();
  }

  const moduleData = getModuleData(params.slug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <div className="max-w-[720px] mx-auto pb-24 pt-8">
      <header className="mb-16 border border-white/60 pb-12 bg-white/40 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.04)] p-8 rounded-3xl mt-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent_secondary/5 opacity-40 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-accent_secondary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm font-mono font-bold text-accent px-4 py-1.5 bg-white/80 backdrop-blur border border-accent/20 rounded-full shadow-sm">
            Module {String(moduleData.module).padStart(2, '0')}
          </span>
          <span className="text-sm text-text-secondary font-bold tracking-[0.15em] uppercase">
            {moduleData.school}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-gradient pb-2">
          {moduleData.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-serif max-w-[90%]">
          {moduleData.description}
        </p>
      </header>

      <article className="prose prose-lg mb-20">
        <MDXRemote source={moduleData.content} />
      </article>

      <hr className="my-16 border-border" />

      <section className="mb-16">
        <h2 className="text-3xl font-serif font-bold text-navy mb-2">Ask the Professor</h2>
        <p className="text-text-secondary mb-8">
          This AI professor knows this module deeply. Ask anything.
        </p>
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden h-[500px]">
          <ProfessorChat moduleSlug={moduleData.slug} moduleContext={moduleData.content} />
        </div>
      </section>

      <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pb-12">
        {prevModule ? (
          <Link 
            href={`/modules/${prevModule.slug}`}
            className="flex flex-col p-6 rounded-2xl glass-panel hover-lift text-left group"
          >
            <span className="flex items-center gap-2 text-xs text-text-secondary font-bold uppercase tracking-widest mb-3 group-hover:text-accent transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Previous Module
            </span>
            <span className="font-serif text-xl border-l-2 border-transparent group-hover:border-accent pl-2 md:pl-0 md:border-none text-navy font-bold">{prevModule.title}</span>
          </Link>
        ) : <div />}

        {nextModule && (
          <Link 
            href={`/modules/${nextModule.slug}`}
            className="flex flex-col p-6 rounded-2xl glass-panel hover-lift text-right group"
          >
            <span className="flex items-center justify-end gap-2 text-xs text-text-secondary font-bold uppercase tracking-widest mb-3 group-hover:text-accent transition-colors">
              Next Module <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-serif text-xl border-right-2 border-transparent group-hover:border-accent pr-2 md:pr-0 md:border-none text-navy font-bold">{nextModule.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
