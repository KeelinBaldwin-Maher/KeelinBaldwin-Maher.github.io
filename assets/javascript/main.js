const navBar = document.querySelector("#primary-navigation");
let prevScrollPos = 0;
// https://andrewwalpole.com/blog/the-showy-hidey-nav-bar/
function toggleNav() {
    const st = document.documentElement.scrollTop;

    const sections = document.querySelectorAll("section");
    const section2Top = (sections[1]) ? sections[1].offsetTop : 0;
    const section3Top = (sections[2]) ? sections[2].offsetTop : 0;

    if (st > prevScrollPos && st > navBar.clientHeight &&
        prevScrollPos !== 0 &&
        !(st > (section2Top - 100) && st < section2Top) && // Because of the scroll-margin-top the actual top of the section is not accurate
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

    let activeSection = ""

    for (let i = 0; i < sections.length; i++) {
        // Get the dimensions of the section. 
        const sectionRect = sections[i].getBoundingClientRect();

        // The top and bottom attributes will be negative if they are not visible 
        const visibilityPercent = Math.floor((sectionRect.bottom / windowHeight) * 100);

        if (visibilityPercent > 15) { // The section is active when it's at least 15% visible
            activeSection = sections[i];
            i = sections.length;
        }
    }

    // If there is a active link, then remove the 'active' style
    const currentActiveLink = document.querySelector("nav .active");
    (currentActiveLink) ? currentActiveLink.classList.remove("active") : "";

    // All the links have data-name values that match the section they link to
    document.querySelector(`nav a[data-name="${activeSection.id}"]`).classList.add("active");
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburgerMenuSpans = document.querySelectorAll(".hamburger-menu-icon span");

function handleHamburgerMenu() {
    if (hamburgerMenu.ariaExpanded === "true") {
        // Close menu
        hamburgerMenu.ariaExpanded = "false";

        hamburgerMenuSpans[0].style.animation = "hamburger-span-1-reverse 0.3s ease 0s 1 normal forwards";
        hamburgerMenuSpans[1].style.opacity = "1";
        hamburgerMenuSpans[2].style.animation = "hamburger-span-3-reverse 0.3s ease 0s 1 normal forwards";

        navBar.classList.remove("show");
        navBar.classList.add("hide");
    } else {
        // Open menu
        hamburgerMenu.ariaExpanded = "true";

        hamburgerMenuSpans[0].style.animation = "hamburger-span-1 0.3s ease 0s 1 normal forwards";
        hamburgerMenuSpans[1].style.opacity = "0";
        hamburgerMenuSpans[2].style.animation = "hamburger-span-3 0.3s ease 0s 1 normal forwards";

        navBar.classList.remove("hide");
        navBar.classList.add("show");
    }
}

hamburgerMenu.addEventListener("click", handleHamburgerMenu);

function handleScroll() {
    toggleNav();
    activeSection();
}

const mediaQueryWidth = window.matchMedia("(min-width: 50em)");

function closeMobileNavMenu() {
    hamburgerMenu.ariaExpanded = "false";
    hamburgerMenuSpans[0].style.animation = "hamburger-span-1-reverse 0.3s ease 0s 1 normal forwards";
    hamburgerMenuSpans[1].style.opacity = "1";
    hamburgerMenuSpans[2].style.animation = "hamburger-span-3-reverse 0.3s ease 0s 1 normal forwards";
    navBar.classList.remove("show");
}

function handleMediaQueryWidth(event) {
    const navMenuLinks = document.querySelectorAll("nav .menu-link");

    if (event.matches) { // Mobile nav off
        // Reset hamburger
        hamburgerMenu.ariaExpanded = "false"
        hamburgerMenuSpans[0].style.animation = "";
        hamburgerMenuSpans[1].style.opacity = "1";
        hamburgerMenuSpans[2].style.animation = "";
        // Reset nav
        navBar.classList.remove("hide");
        navBar.classList.remove("show");
        navMenuLinks.forEach((menuLink) => menuLink.removeEventListener("click", closeMobileNavMenu));

        activeSection();
        window.addEventListener('scroll', handleScroll);

    } else { // Mobile nav on
        // Reset hamburger
        hamburgerMenu.ariaExpanded = "false"
        // Reset nav
        navBar.classList.remove("hide");
        navBar.classList.remove("show");
        const currentActiveLink = document.querySelector("nav .active");
        (currentActiveLink) ? currentActiveLink.classList.remove("active") : "";
        navMenuLinks.forEach((menuLink) => {menuLink.addEventListener("click", closeMobileNavMenu);});

        window.removeEventListener('scroll', handleScroll);
    }
}

mediaQueryWidth.addEventListener("change", handleMediaQueryWidth);

handleMediaQueryWidth(mediaQueryWidth);