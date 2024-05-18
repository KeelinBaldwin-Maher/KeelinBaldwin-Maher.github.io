const navLinks = document.querySelectorAll("nav .menu-link");

navLinks.forEach(link => link.addEventListener("click", navigation));

function navigation({ target }) {
    const currentActiveLink = document.querySelector("nav .active");
    (currentActiveLink) ? currentActiveLink.classList.remove("active") : "";
    target.classList.add("active");
}


const sections = document.querySelectorAll("section");

function isElementVisible(section) {
    const sectionTop = section.offsetTop;
    const sectionBottom = (section.offsetTop + section.offsetHeight);
    const viewportTop = window.scrollY;
    const viewportBottom = window.innerHeight + viewportTop;
    return viewportTop < sectionTop && viewportBottom > sectionBottom;
}

// window.addEventListener('scroll', () => { 
//     sections.forEach((section, i) => { 
//         isElementVisible(section) ?  navLinks[i] : ""
//     });
// }); 

// function activeSection() {
//     sections.forEach((section) => {
//         console.log(section);
//         console.log(isElementVisible(section));
//     });
// }

console.log("Window height: " + window.innerHeight);
let activeSection = "";

const windowHeight = window.innerHeight;

for (let i = 0; i < sections.length; i++) {
    const sectionRect = sections[i].getBoundingClientRect();

    if (sectionRect.bottom < windowHeight && sectionRect.bottom !== 0
        && (sectionRect.bottom / windowHeight) > 0.1) {
        activeSection = sections[i];
    } 

    const sectionTop = sectionRect.top > 0 && sectionRect.top < windowHeight 
        ? sectionRect.top : sectionRect.top > windowHeight ? windowHeight : 0;

    const sectionBottom = sectionRect.bottom > 0 && sectionRect.bottom < windowHeight 
        ? sectionRect.bottom : sectionRect.bottom > windowHeight ? windowHeight : 0;
    
    
    console.log(sections[i].id + " top: " + sectionTop);
    console.log(sections[i].id + " bottom: " + sectionBottom);
}
console.log(activeSection.id);