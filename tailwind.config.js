/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gdk-gray": "#2C303B",
        "gdk-white": "#FEFEFE",
        "gdk-blue": "#1169EE",
        "gdk-light-blue": "#96BCF4",
        "gdk-lighter-blue": "#E7F0FD",
        "gdk-red": "#BD0909",
        "gdk-neon-green": "#3DF99A",
        "gdk-tree-green": "#CAE11F",
        "gdk-dark-blue": "#0948A7",
        "gdk-dark-green": "#07964E",
        "gdk-purple": "#660A9C",
      },
    },
  },
  plugins: [],
};
