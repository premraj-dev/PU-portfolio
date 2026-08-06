import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Trophy } from 'lucide-react';
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
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Particles
        id="hero-particles"
        options={PARTICLE_OPTIONS}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg z-[1]" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16 flex flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="pill-badge bg-black/5 border border-black/15 text-black">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            Open to AI/ML Internships 2026
          </span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-text-primary leading-tight whitespace-nowrap mb-6 md:mb-8">
          Premraj's Portfolio.
        </h1>
        
        <motion.div variants={fadeUp} className="mb-8">
          <div className="text-lg sm:text-xl text-text-secondary font-medium h-8">
            <Typewriter
              options={{
                strings: [
                  'AI & Machine Learning Student',
                  'Research Enthusiast',
                  'Future AI/ML Engineer',
                  'Technical Head, Scitect Club',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 sm:gap-6 text-sm text-text-secondary mb-10 justify-center"
        >
          <span className="flex items-center gap-2"><MapPin size={16} className="text-black" /> Pune, India</span>
        </motion.div>
      </motion.div>
    </section>
  );
}