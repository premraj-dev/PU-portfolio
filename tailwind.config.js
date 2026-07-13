/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
        },
        surface: 'rgba(0,0,0,0.03)',
        primary: '#000000',
        secondary: '#555555',
        'text-primary': '#000000',
        'text-secondary': '#555555',
        muted: '#999999',
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,0,0,0.08)' },
          '100%': { boxShadow: '0 0 20px rgba(0,0,0,0.15)' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};
