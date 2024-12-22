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
                'responsive-ul': ['clamp(1em,5vw, 2.5em)'],
                'responsive-table':['clamp(0.12em,3.5vw, 1.5em)'],
                'responsive-note-table':['clamp(0.2em,2vw, 1em)'],
                'responsive-td-table':['clamp(0.01em,6vw, 1em)'],
                'responsive-index-title':['clamp(0.8em,3.4vw, 1.6em)'],
                'responsive-index':['clamp(0.55em,2.8vw, 1.1em)'],
            },
            width:{
                'responsive-width': ['clamp(16em, 90vw, 40em)'],
                'responsive-normal-button-width': ['clamp(8em, 16vw, 9em)'],
                'responsive-width-table-image': ['clamp(2em, 12vw, 6em)'],
                'responsive-index-button-width': ['clamp(7em, 12vw, 4em)'],
                'responsive-index-width': ['clamp(12em, 40vw, 15em)'],
                'responsive-input':['clamp(5em, 64vw, 32em)'],
                'responsive-mini-input':['clamp(2em, 24vw, 15em)'],
                'responsive-mini-mini-input':['clamp(1em, 14vw, 8em)'],
                'responsive-popup':['clamp(5em, 64vw, 32em)'],
            },
            height:{
                'responsive-height-first-image': ['clamp(20em, 64vw, 45em)'],
                'responsive-height-second-image': ['clamp(12em, 60vw, 34em)'],
                'responsive-normal-button-height': ['clamp(3em, 8vw, 3em)'],
                'responsive-height-table-image': ['clamp(2em, 12vw, 6em)'],
                'responsive-index-button-height': ['clamp(3em, 8vw, 3em)'],
                'responsive-index-height': ['clamp(3em, 8vw, 3em)'],
            },
            screens:{
                'custom-flex-wrap-first-title':{max:'1309px'},
                'custom-flex-wrap-little-devices':{max:'755px'},
            }
        },
    },

    plugins: [forms],
};
