import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  tag: string | null;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Machine Learning Intern',
    company: 'Intern Spot Innovation Pvt Ltd',
    duration: 'Feb 2026 – Apr 2026',
    description:
      'Developed ML workflows, data preprocessing pipelines, and predictive models for real-world AI applications in production environments.',
    tag: 'Latest',
  },
  {
    role: 'AI/ML Virtual Intern',
    company: 'EduSkills AICTE + Google for Developers',
    duration: 'Apr 2025 – Jun 2025',
    description:
      'Completed a 10-week intensive program covering ML pipelines, model training, and AI-driven problem-solving with Google tools.',
    tag: null,
  },
  {
    role: 'FabLab Intern',
    company: 'Vigyan Ashram',
    duration: 'Feb 2025 – Mar 2025',
    description:
      'Led prototype development and innovation-driven projects with hands-on technical implementation in a maker environment.',
    tag: null,
  },
];

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Where I've Worked
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Timeline Bar */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-black via-black/30 to-transparent md:-translate-x-px" />

            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  className={`relative flex flex-col md:flex-row mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-black border-2 border-bg -translate-x-[5px] md:-translate-x-[6px] top-8 z-10">
                    <div className="absolute inset-0 rounded-full bg-black/30 animate-ping" />
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Body */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass-card glass-card-hover p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={16} className="text-black" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-text-primary">{exp.role}</h3>
                          <p className="text-sm text-black font-mono">{exp.company}</p>
                        </div>
                      </div>

                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Calendar size={12} /> {exp.duration}
                        </span>
                        {exp.tag && (
                          <span className="pill-badge bg-black/5 border border-black/15 text-black">
                            <Sparkles size={10} /> {exp.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
