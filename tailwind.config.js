/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        keyframes: {
            'float': {
                '0%': { transform: 'translate(0,  0px)' },
                '50%': { transform: 'translate(0, 15px)' },
                '100%': { transform: 'translate(0, -0px)' }   
            }
        },
        animation : {
            'spin-slow' : 'spin 5s linear infinite',
            'float' : 'float 3s ease-in-out infinite',
        }
    },
  },
  plugins: [],
}
