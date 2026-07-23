import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { label: 'CGPA', value: 9.54, suffix: '/10', decimals: 2 },
  { label: 'Internships', value: 3, suffix: '+', decimals: 0 },
  { label: 'Projects', value: 5, suffix: '+', decimals: 0 },
  { label: 'Research Papers', value: 1, suffix: '', decimals: 0 },
];

function StatCard({ label, value, suffix, decimals }: { label: string; value: number; suffix: string; decimals: number }) {
  const { ref, isVisible } = useScrollReveal();
  
  // Math.round fixes the floating-point inaccuracy (e.g., 9.54 * 100 = 953.9999999999999)
  const target = Math.round(value * (decimals > 0 ? 100 : 1));
  const count = useCountUp(target, 2000, isVisible);
  const display = decimals > 0 ? (count / 100).toFixed(decimals) : count;

  return (
    <div ref={ref} className="glass-card glass-card-hover p-6 text-center">
      <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
        {display}{suffix}
      </div>
      <div className="text-sm text-text-secondary font-mono">{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Innovation.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3 space-y-6 text-text-secondary leading-relaxed">
              <p>
                I'm Premraj Navanath Umap — an Artificial Intelligence & Machine Learning
                student at MIT Arts, Commerce & Science College, Alandi. I believe AI should
                not just be studied in textbooks but built, tested, and deployed to solve
                real problems that matter.
              </p>
              <p>
                From leading the Scitect Club as Technical Head to presenting research at
                national conferences, I've consistently pushed beyond the curriculum. My
                internships at Intern Spot Innovation and EduSkills have given me hands-on
                experience with ML pipelines, data preprocessing, and building predictive
                models for production use cases.
              </p>
              <p>
                Whether it's developing fraud detection systems or researching interpretable
                ML models, I'm driven by one principle: technology must translate into
                tangible impact.
              </p>

              <blockquote className="border-l-2 border-black/20 pl-6 py-2 mt-8">
                <p className="text-text-primary font-medium italic">
                  "AI should not only be studied — it should be built, tested, and deployed."
                </p>
              </blockquote>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
