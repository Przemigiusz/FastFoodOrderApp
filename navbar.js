const navbarTabs = Array.from(document.querySelectorAll(".navbar-part-center>a, .navbar-part-right>a"));
const mobileNavbarTabs = Array.from(document.querySelectorAll(".navbar-mobile-links>li>a"));
const homeTab = document.getElementsByClassName("tab-home")[0];
const brandName = document.getElementsByClassName("brand-name")[0];
homeTab.classList.add("current-tab");

// Create a mapping between desktop and mobile links
const tabMapping = new Map();
navbarTabs.forEach(tab => {
    const matchingMobileTab = mobileNavbarTabs.find(mobileTab => mobileTab.getAttribute('href') === tab.getAttribute('href'));
    if (matchingMobileTab) {
        tabMapping.set(tab, matchingMobileTab);
    }
});

navbarTabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
        event.preventDefault();

        navbarTabs.forEach(t => t.classList.remove("current-tab"));
        mobileNavbarTabs.forEach(t => t.classList.remove("current-tab"));

        if (tab === brandName) {
            homeTab.classList.add("current-tab");
        } else {
            tab.classList.add("current-tab");
            if (tabMapping.has(tab)) {
                tabMapping.get(tab).classList.add("current-tab");
            }
        }
    });
});

const navbarMobileLinks = document.getElementsByClassName("navbar-mobile-links")[0];

document.getElementsByClassName('hamburger-btn')[0].addEventListener('click', function () {
    navbarMobileLinks.classList.toggle('show');
});

mobileNavbarTabs.forEach(tab => {
    tab.addEventListener("click", function () {
        navbarMobileLinks.classList.toggle('show');
    });

});