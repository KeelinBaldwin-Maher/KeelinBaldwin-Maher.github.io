
// https://andrewwalpole.com/blog/the-showy-hidey-nav-bar/
function navScroll() {
    let prevScrollPos = 0;
    const navBar = document.querySelector("nav");

    function toggleNav() {
        const st = document.documentElement.scrollTop;
        if (st > prevScrollPos && st > navBar.clientHeight) {
            navBar.style.top = "-100%";
        } else if (st < prevScrollPos) {
            navBar.style.top = "0";
        }
        prevScrollPos = st <= 0 ? 0 : st;
    }
    
    if (navBar) {
        window.removeEventListener("scroll", toggleNav);
        window.addEventListener("scroll", toggleNav);
    }
}

const sections = document.querySelectorAll("section");

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

    // Make sure nav bar is on top 
    document.querySelector("nav").style.top = "0";

    document.querySelector(`nav a[data-name="${activeSection.id}"]`).classList.add("active");
}

window.addEventListener('scroll', activeSection);

// function onScroll() {
//     navScroll();
//     activeSection();
// }

navScroll();
activeSection();

//const navBar = document.querySelector("nav");
// console.log(navBar.clientHeight);
// console.log(parseInt(getComputedStyle(navBar).getPropertyValue("--nav-height")));