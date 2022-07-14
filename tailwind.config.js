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
        },
        dark: {
          background: '#161B22',
          text: '#f0f6fc',
          link: '#4432ff',
        },
      },
      fontFamily: {
        sans: ['GT Walsheim', 'sans-serif'],
        title: ['MADE Kenfolg', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
