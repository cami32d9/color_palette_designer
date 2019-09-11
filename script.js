"use strict";

document.addEventListener("DOMContentLoaded", start);


// ----- VARIABLES -----

const colorInput = document.querySelector("input");
const alternativeColors = document.querySelectorAll(".alternative_color");

let color;


// ----- START -----

function start() {
    let box = document.querySelector(`.original_color`);
    color = colorInput.value;
    showHexCode(box);
    getRGBFromHex(color);
    getInputHex();
}

// ----- GET COLOR CODES -----

function getInputHex() {
    let box = document.querySelector(`.original_color`);
    colorInput.addEventListener("input", function () {
        color = colorInput.value;
        showHexCode(box);
        getRGBFromHex(color);
    });
}

function getRGBFromHex(color) {
    let box = document.querySelector(`.original_color`);
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    showRGBCode(box, r, g, b);
    getHSLFromRGB(r, g, b);
}

function getHSLFromRGB(r, g, b) {
    let box = document.querySelector(`.original_color`);
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

    // showHSLCode(h, s, l);
    showHSLCode(box, h, s, l);
    getAnalogousHSL(h, s, l);
}


// ----- GET ANALOGOUS COLOR CODES -----

function getAnalogousHSL(h, s, l) {
    processAnalogousHSL(1, h - 40, s, l);
    processAnalogousHSL(2, h - 20, s, l);
    processAnalogousHSL(3, h + 20, s, l);
    processAnalogousHSL(4, h + 40, s, l);
}

function processAnalogousHSL(dest, h, s, l) {
    showAnalogousColor(dest, h, s, l);
    getAnalogousRGB(dest, h, s, l);
}

let rgb;

function getAnalogousRGB(dest, h, s, l) {
    let box = document.querySelector(`.alternative${dest}`);

    // Function 'HSLtoRGB' from:
    // https://github.com/scripturadesign/color/blob/303480c970bf74956e43166410cbdd26621abdc7/src/functions.php#L120

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
    let hex = Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    showConvertedHexCode(box, hex);
}


// ----- SHOW ALTERNATIVE COLORS -----

function showAnalogousColor(dest, h, s, l) {
    let box = document.querySelector(`.alternative${dest}`);
    box.querySelector(".alternative_color").style.backgroundColor = `hsl(${h}, ${s}%, ${l}%`;
    showHSLCode(box, h, s, l);
}

// ----- SHOW COLOR CODES -----

function showHexCode(box) {
    box.querySelector(".hex").textContent = color;
}

function showConvertedHexCode(box, hex) {
    box.querySelector(".hex").textContent = `#${hex}`;
}

function showRGBCode(box, r, g, b) {
    box.querySelector(".rgb").textContent = `R: ${r} | G: ${g} | B: ${b}`;
}

function showHSLCode(box, h, s, l) {
    box.querySelector(".hsl").textContent = `H: ${h}° | S: ${s}% | L: ${l}%`;
}
