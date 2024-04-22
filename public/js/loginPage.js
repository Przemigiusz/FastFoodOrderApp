const links = document.body.querySelectorAll('.form a');
links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const href = link.getAttribute('href');
        main.innerHTML = pages[href];
        history.pushState(null, '', href);
        removeScriptBySrc('/js/loginPage.js');
        switch (href) {
            case '/signup':
                loadScript('./js/registrationPage.js').then(() => {

                }).catch((error) => {
                    console.error(error);
                });
                break;
            case '/forgotpassword':
                loadScript('/js/forgotPasswordPage.js').then(() => {

                }).catch((error) => {
                    console.error(error);
                });
                break;
        }
    })
})

function removeScriptBySrc(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        script.parentNode.removeChild(script);
    }
}