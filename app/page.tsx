import { getSortedModulesData } from '@/lib/mdx';
import Link from 'next/link';

export default function Home() {
  const modules = getSortedModulesData();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-navy font-bold tracking-tight mb-4 leading-tight">
          Strategic MBA <br/>Masterclass
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary font-serif max-w-2xl">
          Graduate-level business education. Every framework. Every case. One platform.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Link 
            href={`/modules/${mod.slug}`} 
            key={mod.slug}
            className="group flex flex-col glass-panel rounded-2xl p-8 hover-lift border-t-4 border-t-transparent hover:border-t-accent"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-bold text-accent px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                Module {String(mod.module).padStart(2, '0')}
              </span>
            </div>
            
            <h2 className="text-xl font-serif font-bold text-navy mb-2 group-hover:text-accent transition-colors">
              {mod.title}
            </h2>
            
            <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-4">
              {mod.school}
            </p>
            
            <p className="text-sm text-text-primary/80 leading-relaxed mt-auto">
              {mod.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
