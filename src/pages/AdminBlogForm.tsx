import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminBlogForm() {
  const [form, setForm] = useState({ name: '', type: '', description: '', content: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('blogs').insert([form]);
    if (error) {
      setStatus('Error: ' + error.message);
    } else {
      setStatus('Blog published!');
      setForm({ name: '', type: '', description: '', content: '' });
    }
  };

  const inputClass = "w-full border border-black/15 rounded-lg p-2 mb-4 bg-transparent";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <h3 className="text-xl font-heading font-semibold mb-4">Add New Blog</h3>
      <input className={inputClass} placeholder="Blog Name" required value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className={inputClass} placeholder="Type (e.g. Machine Learning)" required value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })} />
      <textarea className={inputClass} placeholder="Short Description" required rows={3} value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <textarea className={inputClass} placeholder="Full Blog Content" required rows={8} value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })} />
      <button type="submit" className="gradient-btn text-white px-6 py-2 rounded-lg">Publish</button>
      {status && <p className="mt-3 text-sm text-text-secondary">{status}</p>}
    </form>
  );
}
