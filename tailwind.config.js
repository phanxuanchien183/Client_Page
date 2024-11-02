module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {},
      boxShadow: {
        '3xl': '0 0 10px 3px rgba(0,0,0,0.08)',
      },
      colors: {
        'shalom-green-500': '#388C40',
        'shalom-green-300': '#FFCC40',
        'shalom-green-100': '#FBEE3E',
        'shalom-orange-300': '#F0C045',
        'shalom-orange-100': '#FFF8E6',
      },
      backgroundImage: {
        'shalom-footer-texture': "url('/assets/images/footer-bg.jpg')",
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}