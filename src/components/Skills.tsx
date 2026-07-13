import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code2, BrainCircuit, MessageSquare } from 'lucide-react';

const skillGroups = [
  {
    icon: Code2,
    title: 'Core Languages',
    skills: ['Python', 'R', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    icon: BrainCircuit,
    title: 'Machine Learning',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'HuggingFace',
      'XGBoost',
      'MLflow',
    ],
  },
  {
    icon: Code2,
    title: 'Data Operations',
    skills: [
      'Pandas',
      'Numpy',
      'Polars',
      'Apache Spark',
      'PostgreSQL',
    ],
  },
  {
    icon: Code2,
    title: 'Architecture',
    skills: [
      'Docker',
      'FastAPI',
      'Flask',
      'AWS',
      'Git',
      'CI/CD',
      'VS Code',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Soft Skills',
    skills: [
      'Leadership',
      'Communication',
      'Problem Solving',
      'Teamwork',
      'Critical Thinking',
    ],
  },
];

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Technical Arsenal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.15, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center">
                    <group.icon size={20} className="text-black" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="tech-pill"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
