module.exports = {
    purge: {
      content: ['./pages/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
      options: {
        safelist: [
          /data-theme$/,
        ]
      },
    },
    theme: {
       extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('daisyui'),
    ],
    daisyui: {
      styled: true,
      themes: false,
      rtl: false,
    },
  }
  