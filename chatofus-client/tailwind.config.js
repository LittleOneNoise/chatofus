/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // Adaptez le chemin si nécessaire
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#2B1B1B', // Fond principal (main body)
          secondary: '#1A0F0F', // Fond header et footer
        },
        text: {
          // primary: '#EADAC3', // Texte principal (clair)
          primary: '#A67B5B', // Texte principal
          secondary: '#C2B8A3', // Texte secondaire (beige doux)
        },
        primary: {
          DEFAULT: '#A67B5B', // Chocolat lait
          light: '#C89E7D', // Variante plus claire
          dark: '#8A6243', // Variante plus foncée
        },
        chat: {
          incoming: '#8FB398', // Messages entrants (vert clair chaud)
          outgoing: '#E5A97F', // Messages sortants (orange doux)
        },
      },
    },
  },
  plugins: [],
}

