const canvas = document.getElementById("ufo-canvas");
const ctx = canvas.getContext("2d");

// function draw() {
//     canvas.height = ufo.height;
//     canvas.width = ufo.width;

//     // ufo.src = "/assets/images/ufo/ufo-frame-1.svg";
//     ctx.scale(0.3, 0.3);
//     ctx.drawImage(ufo, 0, 0);

// }

// draw();


// const duration = 3000;



const ufoAnimate = {
    duration: 1, // duration in seconds
    loops: false,
    ufo: document.querySelector(".splash-image img"),
    draw(frame) {
        // frame values go from 0 -> 100 in one second
        const fps = 24;
        // frame = Math.floor((frame / 100) * fps);
        // frame = (frame % 8) + 1;
        console.log(frame);
        ufo.src = `/assets/images/ufo/ufo-frame-${1}.svg`;
    }
};

let timeElapsed = 0; // timeElapsed in seconds
let start = 0; // start is in milliseconds, because that is what requestAnimationFrame returns

// window.requestAnimationFrame((timeStamp) => {
//     start = timeStamp;
//     animate(timeStamp, ufoAnimate);
// });

function animate(timeStamp, { duration, loops, draw }) {
    let frame = Math.floor(((timeStamp - start) / (duration * 1000)) * 100);

    draw(frame);

    if (frame < 100 && timeElapsed < duration) {
        window.requestAnimationFrame((timeStamp) => animate(timeStamp, { duration, loops, draw }));
    } else if (frame === 100 && ((timeElapsed <= duration) || loops)) {
        timeElapsed++;
        if ((timeElapsed >= duration) && loops) {
            timeElapsed = 0; // Restart loop
        }

        start = timeStamp; // Start new second
        animate(timeStamp, { duration, loops, draw });
    }
}

const ufo = document.querySelector("#ufo");
let currentFrame = 1;

function animateFrame() {
    currentFrame++;
    if (currentFrame > 8) {
        currentFrame = 1;
    }
    ufo.src = ufo.src = `/assets/images/ufo/ufo-frame-${currentFrame}.svg`;
}

setInterval(animateFrame, 72);
