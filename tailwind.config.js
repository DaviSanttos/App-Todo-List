/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html", ".build/js/*.js"],
  theme: {
    extend: {   
      colors: {
      'Oxford-blue' : '#0A2342',
      'Zomp' : '#2CA58D',
      'Cambridge-blue' : '#84BC9C',
      'Baby-powder' : '#FEFEF8',
      'Cyclamen' : '#F46197',
      'Branco' : '#FFFDF7',
    },
  },
  },
  plugins: [],
}

