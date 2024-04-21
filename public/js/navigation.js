const main = document.getElementById('main');
const mobileNavbarTabs = document.querySelectorAll('.navbar-mobile-links>li>a')
const navbarTabs = document.querySelectorAll('.navbar-part-center>a, .navbar-part-right>a');

const currentTab = document.querySelector('.tab-home');

let landingPage;
let loginPage;
let registrationPage;

Promise.all([
    fetch('/html/landingPage.html')
        .then(response => response.text())
        .then(data => {
            landingPage = data;
        }),

    fetch('/html/loginPage.html')
        .then(response => response.text())
        .then(data => {
            loginPage = data;
        }),

    fetch('/html/registrationPage.html')
        .then(response => response.text())
        .then(data => {
            registrationPage = data;
        })
]).then(() => {
    main.innerHTML = landingPage;
    const allTabs = [...mobileNavbarTabs, ...navbarTabs];
    allTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (tab.getAttribute('href') === '#home') {
                main.innerHTML = landingPage;
            } else if (tab.getAttribute('href') === '#login') {
                main.innerHTML = loginPage;
            } else if (tab.getAttribute('href') === '#signup') {
                main.innerHTML = registrationPage;
            }
        });
    });
});