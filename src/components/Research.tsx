import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function Research() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="research" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Published Research
          </h2>

          <div className="glass-card gradient-border p-8 md:p-10 max-w-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-black/30" />

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-black" />
              </div>
              <div>
                <span className="pill-badge bg-black/5 border border-black/15 text-black mb-3 inline-flex">
                  Conference Paper
                </span>
                <h3 className="text-xl font-heading font-semibold text-text-primary leading-snug">
                  Statistical Method for Interpretable Machine Learning Models
                </h3>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Research on improving ML model transparency and interpretability using statistical
              methods, presented at the National Level Students Conference on IT, Commerce and
              Management.
            </p>

            <p className="text-xs font-mono text-muted mb-6">
              National Level Students Conference on IT, Commerce and Management
            </p>

            <a
              href="[ADD YOUR PAPER URL]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-text-secondary transition-colors"
            >
              View Paper <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
