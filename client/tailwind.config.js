import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'media',
  content: [
    // "./src/**/*.{html,js,jsx,ts,tsx}",
    // "./src/core-components/**/**/*.{html,js,jsx,ts,tsx}",
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './screens/**/*.{js,jsx,ts,tsx,mdx}',
    './App.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  plugins: [gluestackPlugin],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'primary-green': '#34B566',
          'primary-green-dark': '#56BC76',
          black: '#000000',
          white: '#FFFFFF',
        },
        secondary: {
          'secondary-orange': '#FF6B06',
          'gray-90': '#1A1A1A',
          'gray-80': '#333333',
          'gray-60': '#666666',
          'gray-10': '#E5E5E5',
          cream: '#F7F7F7',
        },
        tertiary: {
          'tertiary-alert': '#D71515',
          'tertiary-license': '#335AB3',
        },
        error: {},
        success: {},
        warning: {},
        info: {},
        typography: {
          white: '#FFFFFF',
          gray: '#D4D4D4',
          black: '#181718',
        },
        outline: {},
        background: {
          light: '#FBFBFB',
          dark: '#181719',
        },
        indicator: {},
      },
      fontFamily: {
        heading: undefined,
        body: undefined,
        mono: undefined,
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        extrablack: '950',
      },
      fontSize: {
        '2xs': '10px',
      },
      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
      },
    },
  },

  plugins: [gluestackPlugin],
};
