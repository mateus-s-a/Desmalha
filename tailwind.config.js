import tailwindcss from '@tailwindcss/vite'
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

export default {
  plugins: [
    tailwindcss(),    
  ],
}
