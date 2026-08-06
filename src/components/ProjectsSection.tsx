import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  featured: boolean;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-header text-3xl md:text-4xl gradient-text mb-12">
          Things I've Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="glass-card glass-card-hover p-6 flex flex-col">
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                {p.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                {p.description}
              </p>

              {p.tech_stack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech_stack.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-black/5">
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-black transition-colors" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                )}
                {p.project_url && (
                  <a href={p.project_url} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-black transition-colors" aria-label="Live Demo">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}