function loadContent() {
    let pages = {};
    let currentPage;
    let previousPage;

    return Promise.all([
        fetch('/html/navbar.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
            }),

        fetch('/html/footer.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            }),

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
        const main = document.getElementById('main');
        main.innerHTML = pages['/home'];
        currentPage = '/home';
        const mobileNavbarTabs = document.querySelectorAll('.navbar-mobile-links>li>a')
        const navbarTabs = document.querySelectorAll('.navbar-part-center>a, .navbar-part-right>a');
        const allTabs = [...mobileNavbarTabs, ...navbarTabs];

        allTabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const href = tab.getAttribute('href');
                if (pages[href]) {
                    main.innerHTML = pages[href];
                    previousPage = currentPage;
                    currentPage = href;
                    history.pushState(null, '', href);
                    switch (previousPage) {
                        case '/home':
                            removeScriptBySrc('/js/landingPage.js');
                            break;
                        case '/login':
                            removeScriptBySrc('/js/loginPage.js');
                            break;
                        case '/signup':
                            removeScriptBySrc('/js/registrationPage.js');
                            break;
                    }
                    switch (currentPage) {
                        case '/home':
                            loadScript('./js/landingPage.js').then(() => {

                            }).catch((error) => {
                                console.error(error);
                            });
                            break;
                        case '/login':
                            loadScript('/js/loginPage.js').then(() => {

                            }).catch((error) => {
                                console.error(error);
                            });
                            break;
                        case '/signup':
                            loadScript('/js/registrationPage.js').then(() => {

                            }).catch((error) => {
                                console.error(error);
                            });
                            break;
                    }
                }
            });
        });
    });
}

function removeScriptBySrc(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        script.parentNode.removeChild(script);
    }
}