export default {
    pages: {},

    loadPage: function (href, pushToHistory = true) {
        const main = document.getElementById('main');
        if (this.pages[href]) {
            window.scrollTo(0, 0);
            main.innerHTML = this.pages[href];
            if (pushToHistory) {
                console.log(`Pushed ${href} to history`);
                history.pushState({}, '', href);
            }
        }

        this.removeScript('/js/tabManager.js');
        this.removeScript('/js/offer.js');
        if (href === '/') {
            this.addScript('/js/tabManager.js');
            this.addScript('/js/mostPopularProducts.js');
        } if (href === '/menu') {
            this.addScript('/js/offer.js');
        }
    },

    loadNavbarAndFootbar: function () {
        document.body.insertAdjacentHTML('afterbegin', this.pages['/navbar']);
        document.body.insertAdjacentHTML('beforeend', this.pages['/footer']);
    },

    addScript: function (src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    },

    removeScript: function (src) {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            script.parentNode.removeChild(script);
        }
    },

    fetchPage: function (url, pageName) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                this.pages[pageName] = data;
            });
    },

    initialize: function () {
        return Promise.all([
            this.fetchPage('/html/navbar.html', '/navbar'),
            this.fetchPage('/html/footer.html', '/footer'),
            this.fetchPage('/html/landingPage.html', '/'),
            this.fetchPage('/html/loginPage.html', '/login'),
            this.fetchPage('/html/registrationPage.html', '/signup'),
            this.fetchPage('/html/offer.html', '/menu')
        ]).then(() => {
            this.loadNavbarAndFootbar();
            const currentUrl = window.location.pathname;
            if (currentUrl === '/') {
                this.loadPage(currentUrl, false);
            } else {
                this.loadPage(currentUrl);
            }


            document.body.addEventListener('click', event => {
                let target = event.target;
                while (target != null) {
                    if (target.tagName === 'A') {
                        event.preventDefault();
                        const href = target.getAttribute('href');
                        this.loadPage(href);
                        break;
                    }
                    target = target.parentElement;
                }
            });
            window.addEventListener('popstate', () => {
                const currentUrl = window.location.pathname;
                this.loadPage(currentUrl, false);
            });
        });
    }
};