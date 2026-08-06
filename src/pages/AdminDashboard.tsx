import { useState, useEffect, FormEvent, ChangeEvent, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
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
  status: string;
  category: string;
  project_date: string | null;
  rating: number;
  ratings_count: number;
  gallery: string[];
  created_at: string;
};

const emptyForm = {
  title: '',
  description: '',
  tech_stack: '',
  image_url: '',
  project_url: '',
  github_url: '',
  featured: false,
  status: 'Completed',
  category: 'ML/AI',
  project_date: '',
  rating: '',
  ratings_count: '',
  gallery: '',
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setProjects(data as Project[]);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus('');

    const { error } = await supabase.from('projects').insert({
      title: form.title,
      description: form.description,
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      image_url: form.image_url || null,
      project_url: form.project_url || null,
      github_url: form.github_url || null,
      featured: form.featured,
      status: form.status,
      category: form.category,
      project_date: form.project_date || null,
      rating: form.rating ? parseFloat(form.rating) : 0,
      ratings_count: form.ratings_count ? parseInt(form.ratings_count) : 0,
      gallery: form.gallery.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setSaving(false);

    if (error) {
      setStatus('Something went wrong: ' + error.message);
      return;
    }

    setStatus('Project added.');
    setForm(emptyForm);
    loadProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    loadProjects();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin');
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Manage projects</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Log out</button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input name="title" value={form.title} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Tech stack (comma-separated)</label>
            <input name="tech_stack" value={form.tech_stack} onChange={handleChange} style={styles.input} placeholder="React, Node.js, Supabase" />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ ...styles.input, minHeight: 90 }} required />
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
              <option value="Deployed">Deployed</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <input name="category" value={form.category} onChange={handleChange} style={styles.input} placeholder="ML/AI" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Date (e.g. 4 May 2026)</label>
            <input name="project_date" value={form.project_date} onChange={handleChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Rating (0–5)</label>
            <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Ratings count</label>
            <input name="ratings_count" type="number" min="0" value={form.ratings_count} onChange={handleChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Image URL (main)</label>
            <input name="image_url" value={form.image_url} onChange={handleChange} style={styles.input} placeholder="https://..." />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Live project URL</label>
            <input name="project_url" value={form.project_url} onChange={handleChange} style={styles.input} placeholder="https://..." />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>GitHub URL</label>
            <input name="github_url" value={form.github_url} onChange={handleChange} style={styles.input} placeholder="https://github.com/..." />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Gallery images (comma-separated URLs)</label>
          <input name="gallery" value={form.gallery} onChange={handleChange} style={styles.input} placeholder="https://img1.png, https://img2.png" />
        </div>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Feature this project
        </label>

        {status && <p style={styles.status}>{status}</p>}

        <button type="submit" style={styles.submitBtn} disabled={saving}>
          {saving ? 'Adding…' : 'Add project'}
        </button>
      </form>

      <h2 style={styles.subheading}>Existing projects ({projects.length})</h2>
      <div style={styles.list}>
        {projects.map((p) => (
          <div key={p.id} style={styles.listItem}>
            <div>
              <strong style={{ color: '#fafafa' }}>{p.title}</strong>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', margin: '4px 0 0' }}>
                {p.tech_stack?.join(', ')}
              </p>
            </div>
            <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Delete</button>
          </div>
        ))}
        {projects.length === 0 && <p style={{ color: '#71717a' }}>No projects yet — add your first one above.</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: { minHeight: '100vh', background: '#0f0f10', padding: '2rem', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 800, margin: '0 auto 1.5rem' },
  heading: { color: '#fafafa', margin: 0 },
  logoutBtn: { background: 'transparent', border: '1px solid #2a2a2e', color: '#d4d4d8', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer' },
  form: { maxWidth: 800, margin: '0 auto', background: '#18181b', border: '1px solid #2a2a2e', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  row: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column' },
  label: { color: '#d4d4d8', fontSize: '0.85rem', marginBottom: 6 },
  input: { background: '#0f0f10', border: '1px solid #2a2a2e', borderRadius: 8, padding: '0.6rem 0.75rem', color: '#fafafa', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' },
  checkboxLabel: { color: '#d4d4d8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 },
  status: { color: '#4ade80', fontSize: '0.85rem', margin: 0 },
  submitBtn: { background: '#fafafa', color: '#0f0f10', border: 'none', borderRadius: 8, padding: '0.7rem', fontWeight: 600, cursor: 'pointer' },
  subheading: { color: '#fafafa', maxWidth: 800, margin: '2rem auto 1rem' },
  list: { maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  listItem: { background: '#18181b', border: '1px solid #2a2a2e', borderRadius: 8, padding: '0.9rem 1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  deleteBtn: { background: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' },
};