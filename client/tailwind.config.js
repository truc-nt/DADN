/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './screens/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundColor: {
                lightblue: '#F4FAFF',
                semiblue: '#D6EEF3',
                blue: '#5AC2DA',
            },
            colors: {
                white: '#FFFFFF',
                black: '#000000',
                blue: '#5AC2DA',
                offhome: '#DAE9F6',
                grey: '#ABAFB3',
            },
        },
    },

    plugins: [],
};
