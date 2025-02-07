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
          primary: '#A67B5B', // Texte principal
          secondary: '#C2B8A3', // Texte secondaire (beige doux)
        },
        primary: {
          DEFAULT: '#A67B5B', // Chocolat lait
          light: '#C89E7D', // Variante plus claire
          dark: '#8A6243', // Variante plus foncée
        },
        chat: {
          time: '#6d645d',
          message: '#bbaea4',
          channel : {
            seek: '#a26fb7',
            sales: '#ab7a2d',
            event: '#2d64ab',
            info: '#2dab51',
            ads: '#572dab',
            admin: '#ab2d2d'
          }
        },
      },
    },
  },
  safelist: [
    {
      pattern: /^bg-chat-channel-(seek|sales|event|info|ads|admin)$/,
    },
    {
      pattern: /^text-chat-channel-(seek|sales|event|info|ads|admin)$/,
    },
  ],
  plugins: [],
}

