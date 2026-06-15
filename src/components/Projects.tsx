import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink, Github } from 'lucide-react';

type ProjectStatus = 'All' | 'In Development' | 'ML/AI' | 'Research';

interface Project {
  title: string;
  status: string;
  category: ProjectStatus;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'TrustShield AI',
    status: 'In Development',
    category: 'In Development',
    description:
      'AI-powered identity verification & fraud detection platform. OCR, facial verification, fraud analysis, document validation, audit tracking.',
    tech: ['Python', 'FastAPI', 'ML', 'OCR', 'Computer Vision', 'PostgreSQL', 'JWT'],
    github: '[ADD YOUR GITHUB URL]',
    demo: '[ADD YOUR DEMO URL]',
  },
  {
    title: 'Crypto Price Prediction System',
    status: 'Completed',
    category: 'ML/AI',
    description:
      'ML-based crypto forecasting using historical market data and predictive analytics.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Analytics'],
    github: '[ADD YOUR GITHUB URL]',
  },
  {
    title: 'ML Research Project',
    status: 'Research',
    category: 'Research',
    description:
      'Interpretable machine learning research — transparency and explainability of ML models.',
    tech: ['Python', 'Research', 'Statistics', 'ML'],
    github: '[ADD YOUR GITHUB URL]',
  },
];

const FILTERS: ProjectStatus[] = ['All', 'In Development', 'ML/AI', 'Research'];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectStatus>('All');
  const { ref, isVisible } = useScrollReveal();

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-black/5 border-black/15 text-black';
      case 'Completed':
        return 'bg-black/5 border-black/15 text-black';
      case 'Research':
        return 'bg-black/5 border-black/15 text-black';
      default:
        return 'bg-black/3 border-black/8 text-text-secondary';
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-12">
            Things I've Built
          </h2>

          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 cursor-pointer ${
                  filter === f
                    ? 'gradient-btn text-white'
                    : 'ghost-btn text-text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card glass-card-hover p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`pill-badge ${statusColor(project.status)}`}>
                      {project.status === 'In Development' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      )}
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2 border-t border-black/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-black transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-black transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
