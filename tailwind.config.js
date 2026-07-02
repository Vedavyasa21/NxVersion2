/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — locked. One accent only.
        ink: '#0A0A0A',
        paper: '#FFFFFF',
        offwhite: '#FAFAFA',
        accent: {
          DEFAULT: '#D4A017', // warm amber/gold — the only accent
          light: '#F5C542', // lighter hover/highlight variant
          50: '#FFF8E1',
          100: '#FFECB3',
          500: '#D4A017',
          600: '#B8860B',
          700: '#9A7209',
        },
      },
      fontFamily: {
        // Body — Inter. Display — Space Grotesk. Both loaded from Google Fonts in index.html.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        // Used sparingly — soft accent glow on hover.
        'accent-glow': '0 0 0 1px rgba(212,160,23,0.35), 0 12px 40px -8px rgba(212,160,23,0.35)',
        'accent-glow-sm': '0 0 0 1px rgba(212,160,23,0.25), 0 6px 24px -6px rgba(212,160,23,0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
