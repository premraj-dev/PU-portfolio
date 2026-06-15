import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GraduationCap, Calendar } from 'lucide-react';

export default function Education() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Academic Foundation
          </h2>

          <div className="glass-card gradient-border p-8 md:p-10 max-w-3xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={24} className="text-black" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                  MIT Arts, Commerce & Science College, Alandi
                </h3>
                <p className="text-text-secondary">
                  B.Sc. Artificial Intelligence & Machine Learning
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar size={14} className="text-black" />
                2024 – 2027
              </span>
              <span className="pill-badge bg-black/5 border border-black/15 text-black">
                9.47 / 10 CGPA
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
