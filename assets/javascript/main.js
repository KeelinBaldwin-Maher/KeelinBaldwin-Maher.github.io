
const navBar = document.querySelector("nav");

const sections = document.querySelectorAll("section");

const section1Bottom = (sections[0]) ? sections[0].offsetHeight + sections[0].offsetTop : 0;
const section2Bottom = (sections[1]) ? (sections[1].offsetHeight + sections[1].offsetTop) - 1 : 0;

let prevScrollPos = 0;
// https://andrewwalpole.com/blog/the-showy-hidey-nav-bar/
function toggleNav() {
    const st = document.documentElement.scrollTop;

    console.log(prevScrollPos);

    if (st > prevScrollPos && st > navBar.clientHeight && 
        prevScrollPos !== 0 && prevScrollPos !== section1Bottom && prevScrollPos !== section2Bottom ) {
        navBar.style.top = "-100%";
    } else if (st < prevScrollPos) {
        navBar.style.top = "0";
    }
    prevScrollPos = st;
}


function activeSection() {
    const windowHeight = window.innerHeight;

    const visibleSections = [];

    for (let i = 0; i < sections.length; i++) {
        const sectionRect = sections[i].getBoundingClientRect();

        const heightPercentage = Math.floor((sectionRect.bottom / windowHeight) * 100);

        if (sectionRect.top < windowHeight && heightPercentage > 10) {
            visibleSections.push(sections[i]);
        }
    }

    const activeSection = visibleSections[0];

    const currentActiveLink = document.querySelector("nav .active");
    (document.querySelector("nav .active")) ? currentActiveLink.classList.remove("active") : "";

    document.querySelector(`nav a[data-name="${activeSection.id}"]`).classList.add("active");
}

window.addEventListener('scroll', onScroll);

function onScroll() {
    toggleNav();
    activeSection();
}

activeSection();
