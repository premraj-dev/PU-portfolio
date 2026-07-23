import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Trophy, ChevronDown, ArrowDown, Mail } from 'lucide-react';
import Particles from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';
import Typewriter from 'typewriter-effect';

const PARTICLE_OPTIONS: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: ['#000000', '#888888'] },
    links: {
      color: '#000000',
      distance: 150,
      enable: true,
      opacity: 0.08,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none' as const,
      outModes: { default: 'bounce' as const },
    },
    number: { value: 50, density: { enable: true } },
    opacity: { value: { min: 0.05, max: 0.2 } },
    shape: { type: 'circle' as const },
    size: { value: { min: 1, max: 2.5 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' as const },
      onClick: { enable: true, mode: 'push' as const },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.15 } },
      push: { quantity: 2 },
    },
  },
  detectRetina: true,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = async () => {
    const resumePath = '/resume.pdf';
    try {
      const response = await fetch(resumePath, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Premraj_Umap_Resume.pdf';
        link.click();
      } else {
        alert('Resume file is currently being updated. Please request directly via the contact form!');
      }
    } catch {
      alert('Resume file is currently being updated. Please request directly via the contact form!');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Particles
        id="hero-particles"
        options={PARTICLE_OPTIONS}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg z-[1]" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="pill-badge bg-black/5 border border-black/15 text-black inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            Open to AI/ML Internships
          </span>
        </motion.div>

        <h1 className="font-serif text-6xl md:text-8xl font-normal tracking-tight text-text-primary leading-tight mb-4">
          Premraj's <br />
          Portfolio.
        </h1>

        <motion.div variants={fadeUp} className="mb-8">
          <div className="text-lg sm:text-xl text-text-secondary font-medium h-8 flex items-center">
            <Typewriter
              options={{
                strings: [
                  'AI & Machine Learning Student',
                  'Research Enthusiast',
                  'Future AI Engineer',
                  'Technical Head, Scitect Club',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: '|',
                cursorClassName: 'text-text-primary font-mono ml-0.5 animate-pulse',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 sm:gap-6 text-sm text-text-secondary mb-10"
        >
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-black" /> Pune, India
          </span>
          <span className="flex items-center gap-2">
            <GraduationCap size={16} className="text-black" /> CGPA 9.53/10
          </span>
          <span className="flex items-center gap-2">
            <Trophy size={16} className="text-black" /> Technical Head
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <button
            onClick={scrollToProjects}
            className="gradient-btn px-6 py-3 rounded-lg font-semibold text-white text-sm cursor-pointer"
          >
            View Projects
          </button>
          <button
            className="ghost-btn px-6 py-3 rounded-lg font-semibold text-text-primary text-sm flex items-center gap-2 cursor-pointer"
            onClick={handleResumeDownload}
          >
            Download Resume <ArrowDown size={16} />
          </button>
          <button
            onClick={scrollToContact}
            className="ghost-btn px-6 py-3 rounded-lg font-semibold text-text-primary text-sm flex items-center gap-2 cursor-pointer"
          >
            Contact Me <Mail size={16} />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}
      >
        <ChevronDown size={28} className="text-text-secondary" />
      </motion.div>
    </section>
  );
}
