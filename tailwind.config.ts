import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#fdfaf3',
          100: '#f8f0d8',
          200: '#f0e0b0',
          300: '#e8cf88',
        },
        ink: '#1a1209',
        mishnah: {
          DEFAULT: '#5c3d1e',
          light:   '#f5ede0',
        },
        gemara: {
          DEFAULT: '#1a3a5c',
          light:   '#e8f0f8',
        },
        tosafot: {
          DEFAULT: '#1e4d2b',
          light:   '#e8f4ec',
        },
        rashi: {
          DEFAULT: '#4d1e3a',
          light:   '#f4e8ef',
        },
        border: '#c8b88a',
      },
      fontFamily: {
        serif: ['var(--font-frank-ruhl)', 'Georgia', 'serif'],
        sans:  ['var(--font-assistant)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
