import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

type Blog = {
  id: string;
  name: string;
  type: string;
  description: string;
  content: string;
  created_at: string;
};

function parseMarkdown(content: string) {
  return content.split('\n').map((line, idx) => {
    if (line.startsWith('# ')) {
      return <h1 key={idx} className="text-3xl font-heading font-semibold gradient-text mb-4 mt-8">{line.slice(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={idx} className="text-2xl font-heading font-semibold text-text-primary mb-3 mt-6">{line.slice(3)}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={idx} className="text-xl font-heading font-semibold text-text-primary mb-2 mt-4">{line.slice(4)}</h3>;
    }
    if (!line.trim()) {
      return <div key={idx} className="h-2" />;
    }
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return <li key={idx} className="text-text-secondary leading-relaxed mb-2 ml-6 list-disc">{line.slice(2)}</li>;
    }
    if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '');
      return <li key={idx} className="text-text-secondary leading-relaxed mb-2 ml-6 list-decimal">{text}</li>;
    }
    return <p key={idx} className="text-text-secondary leading-relaxed mb-4">{line}</p>;
  });
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
      setBlog(data as Blog);
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto px-6 py-24">Loading...</div>;
  if (!blog) return <div className="max-w-3xl mx-auto px-6 py-24">Blog not found</div>;

  const readTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <Link to="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">← Back to portfolio</Link>
      
      <div className="mt-8 mb-8">
        <span className="tech-pill w-fit mb-4">{blog.type}</span>
        <h1 className="text-3xl md:text-4xl font-heading font-semibold gradient-text mb-4">{blog.name}</h1>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <time>{new Date(blog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {parseMarkdown(blog.content)}
      </div>
    </article>
  );
}
