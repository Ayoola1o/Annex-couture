/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FBF4E8',
          200: '#F5E4C8',
          300: '#EED1A2',
          400: '#E2BA73',
          500: '#C5A059',
          600: '#D4AF37',
          700: '#AA7C11',
          800: '#7E5B09',
          900: '#543C04',
        },
        noir: {
          950: '#09090B',
          900: '#121215',
          800: '#1C1C22',
          700: '#2A2A34',
          600: '#3F3F4E',
        },
        champagne: '#F7F3E9',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
