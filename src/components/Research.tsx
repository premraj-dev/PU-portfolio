import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ResearchPaper {
  title: string;
  badge: string;
  abstract: string;
  conference: string;
  paperUrl?: string;
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: 'Statistical Method for Interpretable Machine Learning Models',
    badge: 'Conference Paper',
    abstract:
      'Research on improving ML model transparency and interpretability using statistical methods, presented at the National Level Students Conference on IT, Commerce and Management.',
    conference: 'National Level Students Conference on IT, Commerce and Management',
    paperUrl: '', // Add your paper URL here when available (e.g. 'https://doi.org/...')
  },
];

export default function Research() {
  const { ref, isVisible } = useScrollReveal();
  const paperCount = RESEARCH_PAPERS.length;

  return (
    <section id="research" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-16 flex-wrap">
            <h2 className="section-header text-3xl md:text-4xl gradient-text">
              Published Research
            </h2>
            <span className="pill-badge bg-black/5 border border-black/15 text-black">
              {paperCount} {paperCount === 1 ? 'Research Paper' : 'Research Papers'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {RESEARCH_PAPERS.map((paper, idx) => (
              <div
                key={idx}
                className="glass-card gradient-border p-8 md:p-10 max-w-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-black/30" />

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={24} className="text-black" />
                  </div>
                  <div>
                    <span className="pill-badge bg-black/5 border border-black/15 text-black mb-3 inline-flex">
                      {paper.badge}
                    </span>
                    <h3 className="text-xl font-heading font-semibold text-text-primary leading-snug">
                      {paper.title}
                    </h3>
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {paper.abstract}
                </p>

                <p className="text-xs font-mono text-muted mb-6">
                  {paper.conference}
                </p>

                {paper.paperUrl ? (
                  <a
                    href={paper.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-text-secondary transition-colors cursor-pointer"
                  >
                    View Paper <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-text-secondary transition-colors cursor-pointer"
                    onClick={() => {
                      alert('Paper link coming soon. Please contact directly for the full PDF draft.');
                    }}
                  >
                    View Paper <ExternalLink size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
