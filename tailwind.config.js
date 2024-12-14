import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors:{
                "lilaPrincipal":"#6A0574",
                "azulFondo":"#25283D",
                "azulSecundario":"#392F5A",
                "carne":"#D4A5A5",
                "lilaSecundario":"#8F3985"
            },
            fontSize: {
                'responsive-h2': ['clamp(1.1em, 9.64vw, 4em)'],
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
