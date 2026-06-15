import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const particlesInit = useCallback(async () => {
    await loadSlim(tsParticles);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <main className={loaded ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Achievements />
        <Certifications />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </ParticlesProvider>
  );
}
