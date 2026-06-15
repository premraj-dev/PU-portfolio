import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Cpu, UserCheck, Users } from 'lucide-react';

const roles = [
  {
    icon: Cpu,
    title: 'Technical Head',
    org: 'Scitect Club',
    oneLiner: 'Driving technical initiatives and AI workshops for the college science & technology community.',
  },
  {
    icon: UserCheck,
    title: 'Class Representative',
    org: 'MIT ACS College',
    oneLiner: 'Bridging communication between students and faculty, ensuring academic concerns are addressed.',
  },
  {
    icon: Users,
    title: 'Team Leader',
    org: 'FabLab Internship, Vigyan Ashram',
    oneLiner: 'Led a team through prototype development and hands-on innovation projects.',
  },
];

export default function Leadership() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="leadership" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Leadership & Roles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                className="glass-card glass-card-hover p-8"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center mb-5">
                  <role.icon size={24} className="text-black" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-lg mb-1">
                  {role.title}
                </h3>
                <p className="text-sm text-black font-mono mb-4">{role.org}</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {role.oneLiner}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
