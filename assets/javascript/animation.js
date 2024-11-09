const ufoAnimate = {
    duration: 1, // duration in seconds
    loops: false,
    ufo: document.querySelector("#ufo"),
    draw(frame) {
        // frame values go from 0 -> 100 in one second
        const fps = 24;
        // frame = Math.floor((frame / 100) * fps);
        // frame = (frame % 8) + 1;
        console.log(frame);
        ufo.src = `/assets/images/ufo/ufo-frame-${1}.svg`;
    }
};

const ufoBorderAnimate = {
    duration: 3,
    loops: false,
    ufoBorder: document.querySelector("#ufo-border")
};

let timeElapsed = 0; // timeElapsed in seconds
let start = 0; // start is in milliseconds, because that is what requestAnimationFrame returns

function animate(timeStamp, { duration, loops, draw }) {
    let frame = Math.floor(((timeStamp - start) / (duration * 1000)) * 100);

    draw(frame);

    if (frame < 100 && timeElapsed < duration) {
        window.requestAnimationFrame((timeStamp) => animate(timeStamp, { duration, loops, draw }));

    } else if (frame === 100 && ((timeElapsed <= duration) || loops)) {
        // timeElapsed++;
        // if ((timeElapsed >= duration) && loops) {
        //     timeElapsed = 0; // Restart loop
        // }

        // start = timeStamp; // Start new second
        // animate(timeStamp, { duration, loops, draw });
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
