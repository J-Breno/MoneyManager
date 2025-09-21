/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEFBFF',
          100: '#F7F2FA',
          200: '#E7E4E9',
          300: '#CD93DF',
          400: '#BB71D2',
          500: '#A950C4',
          600: '#9142A8',
          700: '#78358C',
          800: '#5F296F',
          900: '#49115A',
        },
        gray: {
          50: '#FDFDFE',
          100: '#F8F6F9',
          200: '#EDEAEF',
          300: '#E1DEE3',
          400: '#CFA5DC',
          500: '#B679C8',
          600: '#9C4FB4',
          700: '#82269E',
          800: '#701F88',
          900: '#5D1872',
        },
        dark: {
          100: '#A6A6A7',
          200: '#969597',
          300: '#868587',
          400: '#767576',
          500: '#666566',
          600: '#555456',
          700: '#454446',
          800: '#353436',
          900: '#232224',
        },
        success: {
          300: '#50E170',
          500: '#32D957',
          700: '#28BB49',
        },
        warning: {
          300: '#FFD76B',
          500: '#FFCE52',
          700: '#D9B043',
        },
        error: {
          300: '#F05454',
          500: '#EB3D3D',
          700: '#D03333',
        }
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}