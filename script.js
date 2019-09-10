"use strict";

document.addEventListener("DOMContentLoaded", start);


// ----- VARIABLES -----

const colorInput = document.querySelector("input");
let color;


// ----- START -----

function start() {
    color = colorInput.value;
    showHex(color);
    getRGB(color);
    getInputHex();
}


// ----- GET COLOR CODES -----

function getInputHex() {
    colorInput.addEventListener("input", function() {
        color = colorInput.value;
        showHex(color);
        getRGB(color);
    });
}

function getRGB(color) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    showRGB(r, g, b);
    getHSL(r, g, b);
}

function getHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);

    if( max === min ) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min) );
    }

    if (h < 0) {h = h + 360; }

    l = (min + max) / 2;

    if (max === 0 || min === 1 ) {
        s = 0;
    } else {
        s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    // Round to get even numbers
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    showHSL(h, s, l);
}


// ----- SHOW COLOR CODES -----

function showHex() {
    document.querySelector(".hex").textContent = color;
}

function showRGB(r, g, b) {
    document.querySelector(".rgb").textContent = `R: ${r} | G: ${g} | B: ${b}`;
}

function showHSL(h, s, l) {
    // Adds degree and percent symbols for precision
    document.querySelector(".hsl").textContent = `H: ${h}° | S: ${s}% | L: ${l}%`;
}
