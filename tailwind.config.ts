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
          50:  '#fefcf8',
          100: '#f5f1e8',
          200: '#ebe3ce',
          300: '#d8cc9e',
        },
        ink: '#18120e',
        mishnah: {
          DEFAULT: '#7c3820',
          light:   '#fdf5f0',
        },
        gemara: {
          DEFAULT: '#1a3560',
          light:   '#eef3fa',
        },
        tosafot: {
          DEFAULT: '#1b4d30',
          light:   '#eef6f1',
        },
        rashi: {
          DEFAULT: '#5a1e42',
          light:   '#faeef5',
        },
        border: '#cfc3a0',
      },
      fontFamily: {
        serif:   ['var(--font-frank-ruhl)', 'Georgia', 'serif'],
        sans:    ['var(--font-assistant)', 'Arial', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
