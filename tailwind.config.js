/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Heritage palette — meat-market roots, warm Indiana, supper-club neon
        ember: {
          50: '#FBEFEC',
          100: '#F4D7CF',
          200: '#E8A99A',
          300: '#D87564',
          400: '#B5402F',
          500: '#911A0F',
          600: '#7B0F1A', // primary cranberry
          700: '#5C0A14',
          800: '#3E060D',
          900: '#250307',
        },
        gold: {
          50: '#FBF4E1',
          100: '#F5E6BB',
          200: '#EBCD80',
          300: '#E0B547',
          400: '#D4A24C', // primary warm gold
          500: '#B5872C',
          600: '#8E6920',
          700: '#664B17',
          800: '#3E2D0E',
          900: '#1F1605',
        },
        cream: {
          50: '#FBF8F1',
          100: '#F5EFE2', // primary cream paper
          200: '#ECE3CD',
          300: '#DECDA9',
          400: '#C9B07C',
          500: '#B19353',
        },
        ink: {
          50: '#3A2D26',
          100: '#2E231D',
          200: '#231A14',
          300: '#1A1410', // primary charcoal
          400: '#120D0A',
          500: '#0A0705',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.4 0 0 0 0 0.2 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0' },
          '43%': { opacity: '0' },
          '43.01%': { opacity: '1' },
          '47.99%': { opacity: '1' },
          '48%': { opacity: '0' },
          '49%': { opacity: '0' },
          '49.01%': { opacity: '1' },
        },
        'neon-pulse': {
          '0%, 100%': { textShadow: '0 0 6px currentColor, 0 0 14px currentColor, 0 0 28px currentColor' },
          '50%': { textShadow: '0 0 4px currentColor, 0 0 8px currentColor, 0 0 18px currentColor' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        flicker: 'flicker 5s linear infinite',
        'neon-pulse': 'neon-pulse 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'slow-spin': 'slow-spin 60s linear infinite',
      },
    },
  },
  plugins: [],
};
