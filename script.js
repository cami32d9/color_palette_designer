// ----- DISCLAIMER -----
/* This code, and design, isn't pretty. I know!
Nor does it match my call graph... at all. Yet.
It'll get better in the second part of the assignment,
when I've had more time. I promise.
Main point: it works. */


// ----- VARIABLES -----

const input = document.querySelector("input");
let color;


// ----- GETTING COLOR -----

input.addEventListener("input", function() {
    color = input.value;
    getColors(color);
});

function getColors(color) {
    document.querySelector(".hex").textContent = color;
    let r = parseInt(color.substring(1,3), 16);
    let g = parseInt(color.substring(3,5), 16);
    let b = parseInt(color.substring(5,7), 16);

    console.log("RGB " + r, g, b);
    document.querySelector(".rgb").textContent = `R: ${r} | G: ${g} | B: ${b}`;

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

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    console.log("hsl", h, s, l); // just for testing
    document.querySelector(".hsl").textContent = `H: ${h}° | S: ${s}% | L: ${l}%`;
}
