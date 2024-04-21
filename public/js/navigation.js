const main = document.getElementById('main');
const mobileNavbarTabs = document.querySelectorAll('.navbar-mobile-links>li>a')
const navbarTabs = document.querySelectorAll('.navbar-part-center>a, .navbar-part-right>a');

let pages = {};

Promise.all([
    fetch('/html/landingPage.html')
        .then(response => response.text())
        .then(data => {
            pages['/home'] = data;
        }),

    fetch('/html/loginPage.html')
        .then(response => response.text())
        .then(data => {
            pages['/login'] = data;
        }),

    fetch('/html/registrationPage.html')
        .then(response => response.text())
        .then(data => {
            pages['/signup'] = data;
        })
]).then(() => {
    main.innerHTML = pages['/home'];
    const allTabs = [...mobileNavbarTabs, ...navbarTabs];
    allTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const href = tab.getAttribute('href');
            if (pages[href]) {
                main.innerHTML = pages[href];
                history.pushState(null, '', href);
            }
        });
    });
});