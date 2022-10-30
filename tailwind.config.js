module.exports = {
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ]
}
