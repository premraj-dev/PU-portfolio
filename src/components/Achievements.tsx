import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Zap, FlaskConical, FileText, Trophy } from 'lucide-react';

const milestoneCategories = [
  {
    category: 'Academic & Research',
    items: [
      { icon: Award, title: '3rd Rank in FY', context: 'Academic Excellence' },
      { icon: FileText, title: 'Research Paper Presenter', context: 'National Conference' },
    ],
  },
  {
    category: 'Leadership & Roles',
    items: [
      { icon: Zap, title: 'Technical Head', context: 'Scitect Club' },
      { icon: FlaskConical, title: 'Team Leader', context: 'Vigyan Ashram FabLab' },
    ],
  },
  {
    category: 'Beyond Academics',
    items: [
      { icon: Trophy, title: 'Kabaddi Competition Winner', context: 'Sports & Athletics' },
    ],
  },
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestoneCategories.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                className="glass-card p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: groupIdx * 0.12, duration: 0.5 }}
              >
                <div>
                  <h3 className="text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-black/10">
                    {group.category}
                  </h3>

                  <div className="space-y-4">
                    {group.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center gap-4 p-3 rounded-xl bg-black/[0.02] border border-black/[0.05] hover:bg-black/[0.04] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                          <item.icon size={20} className="text-black" />
                        </div>
                        <div>
                          <h4 className="text-sm font-heading font-semibold text-text-primary">
                            {item.title}
                          </h4>
                          <span className="text-xs text-text-secondary">
                            {item.context}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
