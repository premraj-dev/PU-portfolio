import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  School,
} from 'lucide-react';

// [ADD YOUR EMAILJS CREDENTIALS]
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-header text-3xl md:text-4xl gradient-text mb-16">
            Let's Talk.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
                Whether you're looking for an AI/ML intern, want to collaborate on research,
                or just want to connect — I'd love to hear from you.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-black" />
                  <span className="text-text-secondary">Pune, Maharashtra, India</span>
                </div>
                <a
                  href="mailto:premrajumap01@gmail.com"
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-black transition-colors"
                >
                  <Mail size={16} className="text-black" />
                  thepremraj01@gmail.com
                </a>
                <div className="flex items-center gap-3 text-sm">
                  <School size={16} className="text-black" />
                  <span className="text-text-secondary">5301598@mitacsc.edu.in</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-black" />
                  <span className="text-text-secondary">+91 7020244035</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="[https://github.com/premraj-dev]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-black/3 border border-black/8 flex items-center justify-center text-text-secondary hover:text-black hover:border-black/15 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="[www.linkedin.com/in/premraj-umap-028035375]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-black/3 border border-black/8 flex items-center justify-center text-text-secondary hover:text-black hover:border-black/15 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-black/2 border border-black/8 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-black/2 border border-black/8 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-text-secondary mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full bg-black/2 border border-black/8 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-black/2 border border-black/8 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="gradient-btn px-8 py-3 rounded-lg font-semibold text-white text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
                <Send size={16} />
              </button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-black text-sm"
                >
                  <CheckCircle size={16} /> Message sent successfully!
                </motion.div>
              )}
              {error && (
                <p className="text-black/60 text-sm">{error}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
