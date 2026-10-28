/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1E9', cream: '#FAF8F3', ink: '#171715',
        olive: { DEFAULT: '#51583B', dark: '#3f4530', deep: '#2f3323' },
        terra: { DEFAULT: '#B66E56', dark: '#a05f49' },
        line: '#D9D2C7', mute: '#6D6A61', star: '#E08A2E',
      },
      fontFamily: {
        display: ['Anton', 'Barlow Condensed', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        logo: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
