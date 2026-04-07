import ProfessorChat from '@/components/ProfessorChat';
import { getSortedModulesData } from '@/lib/mdx';

export default function AskPage() {
  const modules = getSortedModulesData();
  
  return (
    <div className="max-w-5xl mx-auto py-8 lg:py-12 flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-96px)]">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-serif text-navy font-bold tracking-tight mb-4 leading-tight">
          Global Office Hours
        </h1>
        <p className="text-lg text-text-secondary font-serif max-w-2xl">
          Consult the AI Professor on any topic across the {modules.length}-module Strategic MBA curriculum. Synthesize frameworks, ask for case study examples, or get feedback on your executive decision-making.
        </p>
      </header>

      <div className="flex-1 bg-white border border-border shadow-sm rounded-xl overflow-hidden min-h-[500px]">
        <ProfessorChat />
      </div>
    </div>
  );
}
