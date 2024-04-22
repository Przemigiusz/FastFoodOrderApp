export default {
    pages: {},
    currentPage: null,
    previousPage: null,

    loadPage: function (href) {
        const main = document.getElementById('main');
        if (this.pages[href]) {
            main.innerHTML = this.pages[href];
            this.previousPage = this.currentPage;
            this.currentPage = href;
            history.pushState(null, '', href);
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
            this.fetchPage('/html/landingPage.html', '/home'),
            this.fetchPage('/html/loginPage.html', '/login'),
            this.fetchPage('/html/registrationPage.html', '/signup')
        ]).then(() => {
            this.loadNavbarAndFootbar();
            this.loadPage('/home');
            document.body.addEventListener('click', event => {
                if (event.target.tagName === 'A') {
                    event.preventDefault();
                    const href = event.target.getAttribute('href');
                    this.loadPage(href);
                }
            });
        });
    }
};