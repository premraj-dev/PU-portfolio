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

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
      setBlog(data as Blog);
    }
    fetchBlog();
  }, [id]);

  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <Link to="/" className="text-sm text-text-secondary hover:text-black">← Back</Link>
      <span className="tech-pill w-fit block mt-6 mb-3">{blog.type}</span>
      <h1 className="text-4xl font-heading font-semibold gradient-text mb-3">{blog.name}</h1>
      <p className="text-xs text-text-secondary mb-8">
        {new Date(blog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
      <p className="text-text-secondary leading-relaxed whitespace-pre-line">{blog.content}</p>
    </div>
  );
}
