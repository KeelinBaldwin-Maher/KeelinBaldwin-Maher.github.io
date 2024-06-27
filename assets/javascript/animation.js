
const ufo = document.querySelector(".splash-image img");


const canvas = document.getElementById("splash-image-canvas");
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
    duration: 3, // duration in seconds
    loops: false,
    ufo: document.querySelector(".splash-image img"),
    draw(frame) {
        console.log(frame);
        // frame values go from 1 -> 100
    }
};

let start = 0; // start is in milliseconds, because that is what requestAnimationFrame returns
let timeElapsed = 0; // timeElapsed is in seconds

window.requestAnimationFrame((timeStamp) => {
    start = timeStamp;
    animate(timeStamp, ufoAnimate);
});

function animate(timeStamp, {duration, loops, draw}) {
    let frame = Math.floor(((timeStamp - start) / (duration * 1000)) * 100);

    draw(frame);

    if (frame < 100 && timeElapsed < duration) {
        window.requestAnimationFrame((timeStamp) => animate(timeStamp, {duration, loops, draw}));
    } else if (frame === 100 && ((timeElapsed <= duration) || loops)) {
        timeElapsed++;
        console.log(timeElapsed);
        ((timeElapsed >= duration) && loops) ? timeElapsed = 0 : ""; // Restart loop
        
        start = timeStamp; // Start new second
        animate(timeStamp, {duration, loops, draw});
    }
}
