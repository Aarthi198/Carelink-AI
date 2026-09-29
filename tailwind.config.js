/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc2fd',
          400: '#36a1fa',
          500: '#0c82eb',
          600: '#0267c8',
          700: '#0252a2',
          800: '#064685',
          900: '#0b3b6f',
          950: '#07254a',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        medical: {
          red: '#dc2626',
          amber: '#d97706',
          green: '#16a34a',
          blue: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(12, 130, 235, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 35px -5px rgba(12, 130, 235, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(14, 165, 233, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'waveform 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        waveform: {
          '0%': { height: '10%' },
          '100%': { height: '100%' }
        }
      }
    },
  },
  plugins: [],
}
