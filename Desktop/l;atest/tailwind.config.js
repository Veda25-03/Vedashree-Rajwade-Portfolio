/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          25: '#faf5ff',
        },
        pink: {
          25: '#fdf2f8',
        },
        blue: {
          25: '#eff6ff',
        },
        green: {
          25: '#f0fdf4',
        },
        yellow: {
          25: '#fefce8',
        },
        rose: {
          25: '#fff1f2',
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
