module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F7F1F3',
          text: '#000000',
          link: '#4432ff',
          transparent: 'rgba(0, 0, 0, 0.8)',
          'extra-transparent': 'rgba(0, 0, 0, 0.4)',
        },
        dark: {
          background: '#161717',
          text: '#f0f6fc',
          link: '#4432ff',
          transparent: 'rgba(240, 246, 252, 0.8)',
          'extra-transparent': 'rgba(240, 246, 252, 0.4)',
        },
      },
      fontFamily: {
        sans: ['GT Walsheim', 'sans-serif'],
        title: ['Inter', 'sans-serif'],
      },
      screens: {
        ty: '420px',
      },
    },
  },
  plugins: [],
};
