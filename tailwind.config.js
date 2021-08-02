module.exports = {
  purge: ['./src/**/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        'Roboto',
        'Inter',
        'HarmonyOS Sans SC',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
      ],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
