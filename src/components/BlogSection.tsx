import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

type Blog = {
  id: string;
  name: string;
  type: string;
  description: string;
  created_at: string;
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, name, type, description, created_at')
        .order('created_at', { ascending: false });
      if (!error && data) setBlogs(data as Blog[]);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  if (loading) return null;

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-header text-3xl md:text-4xl gradient-text mb-12">
          Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <Link
              to={`/blog/${b.id}`}
              key={b.id}
              className="glass-card glass-card-hover p-6 flex flex-col"
            >
              <span className="tech-pill w-fit mb-3">{b.type}</span>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                {b.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                {b.description}
              </p>
              <p className="text-xs text-text-secondary mt-4">
                {new Date(b.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
