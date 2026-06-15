import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Zap, GraduationCap, FlaskConical, FileText, Trophy, CircleDot } from 'lucide-react';

const achievements = [
  { icon: Award, title: '3rd Rank in FY', context: 'Academic Excellence' },
  { icon: Zap, title: 'Technical Head', context: 'Scitect Club' },
  { icon: GraduationCap, title: 'Class Representative', context: 'CR' },
  { icon: FlaskConical, title: 'Team Leader', context: 'Vigyan Ashram FabLab' },
  { icon: FileText, title: 'Research Paper Presenter', context: 'National Conference' },
  { icon: Trophy, title: 'Kabaddi Competition Winner', context: 'Sports' },
  { icon: CircleDot, title: 'Volleyball Runner-Up', context: 'Sports' },
];

export default function Achievements() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Milestones
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                className="glass-card glass-card-hover p-5 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center mb-3">
                  <a.icon size={20} className="text-black" />
                </div>
                <h4 className="text-sm font-heading font-semibold text-text-primary mb-1">
                  {a.title}
                </h4>
                <span className="text-xs text-text-secondary">{a.context}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
