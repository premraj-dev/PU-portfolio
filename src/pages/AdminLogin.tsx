import { useState, FormEvent, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError('Incorrect email or password.');
      return;
    }

    navigate('/admin/dashboard');
  }

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.heading}>Admin login</h1>
        <p style={styles.subheading}>Sign in to manage your portfolio projects.</p>

        <label style={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
          autoFocus
        />

        <label style={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f0f10',
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    background: '#18181b',
    border: '1px solid #2a2a2e',
    borderRadius: 12,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: { color: '#fafafa', fontSize: '1.4rem', margin: 0 },
  subheading: { color: '#a1a1aa', fontSize: '0.9rem', marginTop: 4, marginBottom: '1.5rem' },
  label: { color: '#d4d4d8', fontSize: '0.85rem', marginBottom: 6, marginTop: '1rem' },
  input: {
    background: '#0f0f10',
    border: '1px solid #2a2a2e',
    borderRadius: 8,
    padding: '0.6rem 0.75rem',
    color: '#fafafa',
    fontSize: '0.95rem',
    outline: 'none',
  },
  error: { color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem' },
  button: {
    marginTop: '1.5rem',
    background: '#fafafa',
    color: '#0f0f10',
    border: 'none',
    borderRadius: 8,
    padding: '0.7rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
};