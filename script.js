"use strict";

document.addEventListener("DOMContentLoaded", start);


// ----- VARIABLES -----

const colorInput = document.querySelector("input");


// ----- START -----

function start() {
    // Defines destination box of original
    let box = document.querySelector(`.original_color`);

    // Finds hex code at load
    let hex = colorInput.value;

    // Shows the hex code at load, gets the RGB code a load, and starts the process of reading input on event
    showHexCode(box, hex);
    getRGBFromHex(box, hex);
    getInputHex(box);
}


// ----- GET COLOR CODES FOR INPUT -----

function getInputHex(box) {
    colorInput.addEventListener("input", function () {
        let hex = colorInput.value;
        showHexCode(box, hex);
        getRGBFromHex(box, hex);
    });
}

function getRGBFromHex(box, hex) {
    // Converts hex to r, g and b in numbers
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    showRGBCode(box, r, g, b);
    getHSLFromRGB(box, r, g, b);
}

function getHSLFromRGB(box, r, g, b) {
    // Converts rgb to hsl.
    // Code from assignment on fronter.
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    // Round to get even numbers
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    showHSLCode(box, h, s, l);

    // Starts process of finding analogous colors
    getAnalogousHSL(h, s, l);
}


// ----- GET ANALOGOUS COLOR CODES -----

function getAnalogousHSL(h, s, l) {
    // Starts the process for each of the four colors that should be defined.
    // The first parameter, dest, is the number of the box, defined in HTML.
    // The second parameter, h (+/- x) is the h-value from the original, with 20 degrees' difference for each color.
    processAnalogousHSL(1, h - 40, s, l);
    processAnalogousHSL(2, h - 20, s, l);
    processAnalogousHSL(3, h + 20, s, l);
    processAnalogousHSL(4, h + 40, s, l);
}

function processAnalogousHSL(dest, h, s, l) {
    // Defines destination box for the alternative colors, using the dest given as parameter.
    let box = document.querySelector(`.alternative${dest}`);

    // Only needs the parameters given in getAnalogousHSL function, to output in DOM.
    showAnalogousColor(box, h, s, l);
    showHSLCode(box, h, s, l);

    getAnalogousRGB(box, h, s, l);
}


function getAnalogousRGB(box, h, s, l) {
    // Converts HSL to RGB.
    // Function 'HSLtoRGB' from:
    // https://github.com/scripturadesign/color/blob/303480c970bf74956e43166410cbdd26621abdc7/src/functions.php#L120

    let rgb;

    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - (c / 2);
    switch (true) {
        case (h < 60 || h === 360):
            rgb = [c, x, 0];
            break;
        case (h < 120):
            rgb = [x, c, 0];
            break;
        case (h < 180):
            rgb = [0, c, x];
            break;
        case (h < 240):
            rgb = [0, x, c];
            break;
        case (h < 300):
            rgb = [x, 0, c];
            break;
        case (h < 360):
            rgb = [c, 0, x];
            break;
    }

    let r = Math.round((rgb[0] + m) * 255);
    let g = Math.round((rgb[1] + m) * 255);
    let b = Math.round((rgb[2] + m) * 255);

    showRGBCode(box, r, g, b);
    getHexFromRGB(box, r, g, b);
}

function getHexFromRGB(box, r, g, b) {
    let hex = "#" + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    showHexCode(box, hex);
}


// ----- SHOW ALTERNATIVE COLORS -----

function showAnalogousColor(box, h, s, l) {
    box.querySelector(".alternative_color").style.backgroundColor = `hsl(${h}, ${s}%, ${l}%`;
}

// ----- SHOW COLOR CODES -----

function showHexCode(box, hex) {
    box.querySelector(".hex").textContent = hex;
}

function showRGBCode(box, r, g, b) {
    box.querySelector(".rgb").textContent = `R: ${r} | G: ${g} | B: ${b}`;
}

function showHSLCode(box, h, s, l) {
    box.querySelector(".hsl").textContent = `H: ${h}° | S: ${s}% | L: ${l}%`;
}
