const navBar = document.querySelector("#primary-navigation");
let prevScrollPos = 0;
// https://andrewwalpole.com/blog/the-showy-hidey-nav-bar/
function toggleNav() {
    const sections = document.querySelectorAll("section");

    const st = document.documentElement.scrollTop;

    const section2Top = (sections[1]) ? sections[1].offsetTop : 0;
    const section3Top = (sections[2]) ? sections[2].offsetTop : 0;

    if (st > prevScrollPos && st > navBar.clientHeight &&
        !(st > (section2Top - 100) && st < section2Top) &&
        st !== section3Top) {
        navBar.classList.remove("show");
        navBar.classList.add("hide");

    } else if (st < prevScrollPos) {
        navBar.classList.remove("hide");
        navBar.classList.add("show");
    }
    prevScrollPos = st;
}

function activeSection() {
    const sections = document.querySelectorAll("section");

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

    // If there is a active link, then remove the 'active' style
    const currentActiveLink = document.querySelector("nav .active");
    (currentActiveLink) ? currentActiveLink.classList.remove("active") : "";

    // All the links have data-name values that match the section they link to
    document.querySelector(`nav a[data-name="${activeSection.id}"]`).classList.add("active");
}

function handleScroll() {
    toggleNav();
    activeSection();
}

const mediaQueryWidth = window.matchMedia("(max-width: 40em)");

if (!mediaQueryWidth.matches) {
    activeSection();
    window.addEventListener('scroll', handleScroll);
}

function handleMediaQueryWidth(event) {
    if (!event.matches) {
        // navBar.classList.remove("hide");
        // navBar.classList.add("show");
        activeSection();
        window.addEventListener('scroll', handleScroll);
        
    } else {
        // Reset nav style
        const currentActiveLink = document.querySelector("nav .active");
        (currentActiveLink) ? currentActiveLink.classList.remove("active") : "";
        // navBar.classList.remove("show");
        // navBar.classList.add("hide");

        window.removeEventListener('scroll', handleScroll);
    }
}

mediaQueryWidth.addEventListener("change", handleMediaQueryWidth);

const hamburgerMenu = document.querySelector(".hamburger-menu");

function handleHamburgerMenu() {
    if (hamburgerMenu.ariaExpanded === "true") {
        // Close menu
        hamburgerMenu.ariaExpanded = "false";
    } else {
        // Open menu
        hamburgerMenu.ariaExpanded = "true";

    }
}

hamburgerMenu.addEventListener("click", handleHamburgerMenu)

