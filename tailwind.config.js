/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html", // Ensures Tailwind scans your index.html
    "./src/**/*.{html,js,jsx,ts,tsx}", // Includes all relevant file types in your src directory
  ],
  theme: {
    extend: {}, // Placeholder for any custom theming/extensions you may add
  },
  plugins: [],
};
