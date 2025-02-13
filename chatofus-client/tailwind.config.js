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
            info: '#2dab51',
          },
          dynamic : {
            monstergroup: '#44c36a',
            chatachievement: '#b5ac2c',
            subarea: '#b863f1',
            map: '#b863f1',
            chatitem: '#5984c7',
            guild: '#d59837',
            alliance: '#22978d',
          }
        },
      },
    },
  },
  safelist: [
    {
      pattern: /^bg-chat-channel-(seek|sales|info)$/,
    },
    {
      pattern: /^text-chat-channel-(seek|sales|info)$/,
    },
  ],
  plugins: [],
}

