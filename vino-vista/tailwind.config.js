/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'red': '#a63f3f',
      'brown': '#574240',
      'beige': '#bfa5a3',
      'darkgreen': '#516a12',
      'lightgreen': '#dadd98',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'ghost-white': '#f3f4f6'
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
