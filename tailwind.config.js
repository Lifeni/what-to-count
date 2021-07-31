module.exports = {
  mode: 'JIT',
  purge: ['./src/**/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'HarmonyOS Sans SC',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
