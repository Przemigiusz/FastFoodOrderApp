import './mostPopularProducts.js';
import setTopThreeProducts from './mostPopularProducts.js';
import './offer.js';
import setOffer from './offer.js';
import './tabManager.js';
import { openTab, initializeTabs } from './tabManager.js';

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

        if (href === '/') {
            let fakeEvent = {
                currentTarget: document.querySelector('.menu-tab')
            };
            initializeTabs();
            openTab(fakeEvent, 'burgers');
            setTopThreeProducts();
        } if (href === '/menu') {
            setOffer();
        }
    },

    loadNavbarAndFootbar: function () {
        document.body.insertAdjacentHTML('afterbegin', this.pages['/navbar']);
        document.body.insertAdjacentHTML('beforeend', this.pages['/footer']);
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