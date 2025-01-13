/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html", // Ensures Tailwind scans your index.html
    "./src/**/*.{html,js,jsx,ts,tsx}", // Includes all relevant file types in your src directory
    "node_modules/flowbite/**/*.js" // Adds Flowbite's JavaScript files for scanning
  ],
  theme: {
    extend: {}, // Placeholder for any custom theming/extensions you may add
  },
  plugins: [
    flowbitePlugin // Includes the Flowbite plugin
  ],
};
