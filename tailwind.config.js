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
                'responsive-h1': ['clamp(1.3em, 9vw, 4.6em)'],
                'responsive-h2': ['clamp(1.1em, 9.64vw, 4em)'],
                'responsive-h4': ['clamp(0.5em,4vw, 1.5em)'],
            },
            width:{
                'responsive-width': ['clamp(16em, 90vw, 40em)'],
            },
            height:{
                'responsive-height-first-image': ['clamp(20em, 64vw, 45em)'],
            },
            screens:{
                'custom-flex-wrap-first-title':{max:'1309px'},
            }
        },
    },

    plugins: [forms],
};
