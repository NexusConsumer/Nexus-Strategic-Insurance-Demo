/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        "primary-dark": "#2563EB",
        "background-light": "#F8FAFC",
        "background-dark": "#0A0D17",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E293B",
        "text-main": "#191C1F",
        "text-secondary": "#707579",
        brand: "#3B82F6",
        accent: "#06B6D4",
      },
      fontFamily: {
        display: ["Assistant", "Heebo", "sans-serif"],
        sans: ["Assistant", "Heebo", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        'xl': '20px',
        '2xl': '28px',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'reveal-envelope': 'envelopeOpen 1.5s ease-out forwards',
        'slide-card': 'cardSlide 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards',
        'glow': 'glowPulse 3s infinite alternate',
        'shimmer': 'shimmer 2s infinite linear',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        envelopeOpen: {
          '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        cardSlide: {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: '0' },
          '100%': { transform: 'translateY(-20px) scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(59, 130, 246, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
