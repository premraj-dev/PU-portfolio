import { Github, Linkedin, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Research', to: 'research' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-black/5 bg-bg/80">
      <div className="h-px bg-gradient-to-r from-black via-black/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-heading font-bold gradient-text">PREMRAJ UMAP</span>
            <p className="text-xs text-text-secondary mt-1">Building intelligent systems with AI</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.to}
                onClick={() => scrollTo(item.to)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href="[https://github.com/premraj-dev]"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-black/3 border border-black/8 flex items-center justify-center text-text-secondary hover:text-black hover:border-black/15 transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="[www.linkedin.com/in/premraj-umap-028035375]"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-black/3 border border-black/8 flex items-center justify-center text-text-secondary hover:text-black hover:border-black/15 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:thepremraj01@gmail.com"
              className="w-9 h-9 rounded-lg bg-black/3 border border-black/8 flex items-center justify-center text-text-secondary hover:text-black hover:border-black/15 transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 text-center">
          <p className="text-xs text-muted">
            &copy; 2026 Premraj Navanath Umap. Building the future with AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
