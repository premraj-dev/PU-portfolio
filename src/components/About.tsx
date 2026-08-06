import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { label: 'CGPA', value: 9.54, suffix: '', decimals: 2 },
  { label: 'Internships', value: 3, suffix: '+', decimals: 0 },
  { label: 'Projects', value: 5, suffix: '+', decimals: 0 },
  { label: 'Research Papers', value: 1, suffix: '', decimals: 0 },
];

function StatCard({ label, value, suffix, decimals }: { label: string; value: number; suffix: string; decimals: number }) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(Math.round(value * (decimals > 0 ? 100 : 1)), 2000, isVisible);
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="text-sm font-mono text-text-secondary tracking-widest uppercase">
                  About
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-text-primary mt-3 leading-tight">
                  Premraj Umap
                </h2>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed">
              <p>
                I'm an AI & Machine Learning student who'd rather ship a working
                model than admire one in a textbook. I care less about memorizing
                algorithms and more about watching them hold up under real data,
                real constraints, and real users.
              </p>
              <p>
                As Technical Head of the Scitect Club, I've led teams through
                projects that actually shipped — not just demoed. My internships
                at Intern Spot Innovation and EduSkills pushed that further:
                building ML pipelines, wrangling messy data into something usable,
                and shipping predictive models meant for production, not just a
                Jupyter notebook.
              </p>
              <p>
                My research into interpretable ML and my work on fraud detection
                systems both come from the same instinct — a model is only as good
                as the trust people can place in it. I'm currently looking for an
                AI/ML internship in 2026 where I can bring that same rigor to a
                real team, on real problems.
              </p>

              <div className="glass-card p-6 md:p-8">
                <span className="text-xs font-mono tracking-widest text-text-secondary uppercase">
                  Bio Facts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-5">
                  <div>
                    <div className="text-xs font-mono tracking-widest text-text-secondary uppercase mb-1">
                      Location
                    </div>
                    <div className="font-body text-text-primary">Pune, India</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest text-text-secondary uppercase mb-1">
                      Education
                    </div>
                    <div className="font-body text-text-primary">
                      B.Sc. AI & ML, MIT ACSC Alandi
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest text-text-secondary uppercase mb-1">
                      Duration
                    </div>
                    <div className="font-body text-text-primary">2024 – 2027</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono tracking-widest text-text-secondary uppercase mb-1">
                      Specialization
                    </div>
                    <div className="font-body text-text-primary">Artificial Intelligence and Machine Learning</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}