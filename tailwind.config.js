/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#000000",
                surface: "#0a0a0a",
                accent: "#ffffff",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Rajdhani', 'Inter', 'sans-serif'],
                title: ['Bebas Neue', 'sans-serif'],
            },
            letterSpacing: {
                widest: '.25em',
                ultra: '.5em',
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
            },
        },
    },
    plugins: [],
}
