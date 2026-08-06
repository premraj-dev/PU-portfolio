import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Work', to: 'projects' },
  { label: 'Publications', to: 'research' },
  { label: 'Stack', to: 'skills' },
  { label: 'Get in Touch', to: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.to);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/premraj_umap_resume.pdf';
    link.download = 'Premraj_Umap_Resume.pdf';
    link.click();
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-black/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-heading font-bold gradient-text cursor-pointer shrink-0"
          >
            PU
          </button>

          <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-6">
            {NAV_ITEMS.filter((item) => item.to !== 'contact').map((item) => (
              <button
                key={item.to}
                onClick={() => scrollTo(item.to)}
                className={`relative py-2 text-[13px] lg:text-[15px] font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activeSection === item.to
                    ? 'text-[rgb(var(--color-accent))]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
                {activeSection === item.to && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[rgb(var(--color-accent))]"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            <button
              onClick={downloadResume}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/5 border border-black/10 text-xs lg:text-sm font-medium text-text-secondary hover:text-[rgb(var(--color-accent))] hover:border-black/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download size={14} />
              Resume
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-semibold text-white bg-black hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              Get in Touch
            </button>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center text-text-secondary hover:text-[rgb(var(--color-accent))] hover:border-black/20 transition-all cursor-pointer shrink-0"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center text-text-secondary cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="text-text-primary p-2 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-5 right-6 text-text-primary p-2 cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.to}
                  onClick={() => scrollTo(item.to)}
                  className="text-2xl font-heading font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <button
              onClick={downloadResume}
              className="mt-8 flex items-center gap-2 text-lg font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <Download size={18} /> Download Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}