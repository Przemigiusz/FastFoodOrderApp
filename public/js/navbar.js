export default function initializeNavbar() {
    const navbarTabs = [...document.querySelectorAll(".navbar-part-center>a, .navbar-part-right>a")];
    const mobileNavbarTabs = [...document.querySelectorAll(".navbar-mobile-links a")];
    const navbarMobileLinks = document.querySelector(".navbar-mobile-links");

    const updateCurrentTab = () => {
        const currentPath = window.location.pathname;

        navbarTabs.forEach(tab => {
            tab.classList.remove("current-tab");
            if (tab.getAttribute('href') === currentPath) {
                tab.classList.add("current-tab");
            }
        });

        mobileNavbarTabs.forEach(tab => {
            tab.classList.remove("current-tab");
            if (tab.getAttribute('href') === currentPath) {
                tab.classList.add("current-tab");
            }
        });
    };

    updateCurrentTab();

    mobileNavbarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navbarMobileLinks.classList.toggle('show');
            document.body.classList.toggle('no-scroll');

            setTimeout(function () {
                navbarMobileLinks.classList.remove('height-100vh');
            }, 250);
        });
    });

    document.querySelector('.hamburger-btn').addEventListener('click', function () {
        navbarMobileLinks.classList.toggle('show');
        document.body.classList.toggle('no-scroll');

        if (!navbarMobileLinks.classList.contains('show')) {
            setTimeout(function () {
                navbarMobileLinks.classList.remove('height-100vh');
            }, 250);
        } else {
            navbarMobileLinks.classList.add('height-100vh');
        }
    });

    return updateCurrentTab;
}