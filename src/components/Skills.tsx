import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import * as Lucide from 'lucide-react';

type IconName = 'Code2' | 'BrainCircuit' | 'MessageSquare' | 'Database' | 'Server';

type FallbackSvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const FALLBACK_SVGS: Record<IconName, FallbackSvgComponent> = {
  Code2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
  ),
  BrainCircuit: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5V3"/><path d="M5 12H3"/><path d="M21 12h-2"/><path d="M19 9a7 7 0 1 0-13.6 2.3C5.1 11.7 5 12.1 5 12.5c0 1.4 1.1 2.5 2.5 2.5h.5c.6 0 1-.4 1-1v-1c0-.6.4-1 1-1h1c.6 0 1-.4 1-1V9c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1h-1"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>
  ),
  MessageSquare: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Database: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
  ),
  Server: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
  ),
};

interface SkillGroup {
  iconName: IconName;
  title: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    iconName: 'Code2',
    title: 'Core Languages',
    skills: ['Python', 'R', 'SQL'],
  },
  {
    iconName: 'BrainCircuit',
    title: 'Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'XGBoost'],
  },
  {
    iconName: 'Database',
    title: 'Data Operations',
    skills: ['Pandas', 'Numpy', 'Polars', 'PostgreSQL'],
  },
  {
    iconName: 'Server',
    title: 'Architecture',
    skills: ['Docker', 'FastAPI', 'AWS', 'Git', 'CI/CD'],
  },
  {
    iconName: 'MessageSquare',
    title: 'Soft Skills',
    skills: ['Leadership', 'Critical Thinking', 'Problem Solving', 'Teamwork'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  },
};

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  const renderIcon = (iconName: IconName) => {
    const LucideIcon = Lucide[iconName] as React.ComponentType<{ size?: number; className?: string }> | undefined;
    const FallbackSvg = FALLBACK_SVGS[iconName];

    if (LucideIcon) {
      return <LucideIcon size={20} className="text-black" />;
    }
    if (FallbackSvg) {
      const CustomSvg = FallbackSvg;
      return <CustomSvg className="text-black" />;
    }
    return <span className="text-sm font-bold text-black">⚡</span>;
  };

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.h2 
            variants={cardVariants}
            className="section-header text-3xl md:text-4xl gradient-text mb-16"
          >
            Technical Arsenal
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={cardVariants}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center">
                    {renderIcon(group.iconName)}
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
