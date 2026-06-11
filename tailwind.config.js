/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#080F0B',
          900: '#0D1810',
          800: '#111F16',
          700: '#142018',
          600: '#1B2920',
          500: '#223028',
          400: '#2A3A2F',
          300: '#3A5040',
          200: '#4E6054',
          100: '#8FA890',
          50:  '#C5D5C7',
        },
        terra: {
          950: '#3A0F00',
          900: '#5C1A00',
          800: '#8B3A22',
          700: '#A84A25',
          600: '#C85C2A',
          500: '#D97040',
          400: '#E8883A',
          300: '#F09A55',
          200: '#F5C08A',
          100: '#FBE5CC',
          50:  '#FEF4E8',
        },
        cream: {
          900: '#9A8E73',
          800: '#B5A88A',
          700: '#C8BB9F',
          600: '#D9CDB2',
          500: '#EDE4CB',
          400: '#F2EAD5',
          300: '#F6EFE0',
          200: '#FAF5EC',
          100: '#FDFAF5',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-breathe': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'glow-breathe': 'glow-breathe 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in-left': 'slide-in-left 0.7s ease both',
        'slide-in-right': 'slide-in-right 0.7s ease both',
        'scroll-bounce': 'scroll-bounce 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
