const navBar = document.querySelector("#primary-navigation");

let prevScrollPos = 0;

function clickOnNavBar() {
    // All the links have data-name values that match the section they link to
    let navAnchors = document.querySelectorAll(`nav a`);
    for (i = 0; i < navAnchors.length ; i++) {
        if (navAnchors[i].attributes[`data-name`]) {
            navAnchors[i].addEventListener("click", () => {
                navBar.classList.remove("hide");
                navBar.classList.add("show");
            });
        }
    }
    return true;
}

/**
 * Hides the navigation bar when scrolling down. Shows the navigation bar when scrolling up.
 */
function toggleNav() {
    // The value of scrollPos increases as you scroll down the page.
    // scrollPos has it's highest value when the page is scrolled to the bottom.
    // So if the scrollPos is less than prevScrollPos, it means the paged has been scrolled upward.
    const scrollPos = document.documentElement.scrollTop;

    // I don't want the nav bar to be hidden when:
    //    - The user hasn't scrolled past the height of the nav bar
    //    - The user has clicked to navigate to another section of the same page:
    //        - Nav should show when scrollPos is at the top of the section
    //            - The nav should be shown between the top of the 
    //              section, and 100 px above the top of the section.

    // All content is organized into sections. There should at least be 1 section on a page.
    const sections = document.querySelectorAll("section");

    let notAtTopOfSection = true;
    if (sections.length > 1) {
        for (let i = 0; i < sections.length && notAtTopOfSection; i++) {
            let sectionTop = sections[i].offsetTop;
            notAtTopOfSection = !(scrollPos > (sectionTop - 125) && scrollPos <= sectionTop);
        }
    }

    let pastNavHeight = scrollPos > navBar.clientHeight;
    
    if (scrollPos > prevScrollPos && prevScrollPos !== 0 && notAtTopOfSection && pastNavHeight) {
        navBar.classList.remove("show");
        navBar.classList.add("hide");
    } else {
        navBar.classList.remove("hide");
        navBar.classList.add("show");
    }
    
    prevScrollPos = scrollPos;
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

