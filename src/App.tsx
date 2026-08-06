import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import ProjectsSection from './components/ProjectsSection';
import Research from './components/Research';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin imports
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Main portfolio page component
function MainPortfolio({ loaded }: { loaded: boolean }) {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main className={loaded ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <Experience />
        <ProjectsSection />
        <Research />
        <Skills />
        <Achievements />
        <Certifications />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const particlesInit = useCallback(async () => {
    await loadSlim(tsParticles);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <ParticlesProvider init={particlesInit}>
        <Router>
          <Routes>
            {/* Public Portfolio Route */}
            <Route path="/" element={<MainPortfolio loaded={loaded} />} />

            {/* Admin Login Route */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Protected Admin Dashboard Route */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ParticlesProvider>
    </ThemeProvider>
  );
}