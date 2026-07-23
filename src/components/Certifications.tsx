import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BadgeCheck } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date?: string;
}

const certifications: Certification[] = [
  {
    title: 'Machine Learning with Python Internship',
    issuer: 'Intern Spot Innovation',
  },
  {
    title: 'AI & ML Virtual Internship',
    issuer: 'Google for Developers + EduSkills',
  },
  {
    title: 'Data Analytics with Gen-AI Program',
    issuer: 'Certification Program',
  },
  {
    title: 'Python for Data Science & ML',
    issuer: 'Technical Training Program',
  },
  {
    title: 'Foundations of Artificial Intelligence',
    issuer: 'Professional Certification',
  },
];

export default function Certifications() {
  const { ref, isVisible } = useScrollReveal();
  const certCount = certifications.length;

  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-16 flex-wrap">
            <h2 className="section-header text-3xl md:text-4xl gradient-text">
              Certifications
            </h2>
            <span className="pill-badge bg-black/5 border border-black/15 text-black">
              {certCount} Verified Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                className="glass-card glass-card-hover p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck size={20} className="text-black" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary mb-2 text-sm leading-snug">
                    {cert.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary font-mono mt-2">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
