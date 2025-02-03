function animate(animateObject) {
    let start = performance.now();

    requestAnimationFrame(function drawNextFrame(time) {
        let currentTime = (time - start);

        if (currentTime > animateObject.duration) {
            currentTime = animateObject.duration;
        }

        let imageState = animateObject.timing(currentTime);

        animateObject.draw(imageState);

        if (currentTime < animateObject.duration) {
            requestAnimationFrame(drawNextFrame);
        } else if (currentTime >= animateObject.duration && animateObject.loop) {
            animate(animateObject);
        }
    });

}

const ufoAnimate = {
    ufo: document.querySelector("#ufo"),
    duration: 850,
    ufoFrames: 8,
    loop: true,
    timing(currentTime) {
        currentFrame = parseInt(currentTime / (this.duration / this.ufoFrames));
        if (currentFrame <= 0) {
            return 8;
        } else {
            return currentFrame;
        }
    },
    draw(imageState) {
        ufo.src = `/assets/images/ufo/ufo-frame-${imageState}.svg`;
    }
}

animate(ufoAnimate);

const ufo = document.querySelector("#ufo");
let currentFrame = 1;

function animateFrame() {
    currentFrame++;
    if (currentFrame > 8) {
        currentFrame = 1;
    }
    ufo.src = ufo.src = `/assets/images/ufo/ufo-frame-${currentFrame}.svg`;
}

// setInterval(animateFrame, 72);
