export default function initializeLoginForm() {
    const form = document.querySelector('form');
    let formSubmitted = false;

    const emailErrorDiv = document.querySelector('.email-error');
    const passwordErrorDiv = document.querySelector('.password-error');

    const validator = {
        set: function (target, property, value) {
            if (property === 'email') {
                let pattern = /\S+@\S+\.\S+/;
                if (!pattern.test(value)) {
                    target.errors[property] = 'Please enter a valid email';
                } else {
                    delete target.errors[property];
                }
            }

            if (property === 'password') {
                if (typeof value !== 'string' || value.length < 8) {
                    target.errors[property] = 'Password must be a string and at least 8 characters long';
                } else {
                    delete target.errors[property];
                }
            }

            target[property] = value;
            form.elements[property].value = value;
            return true;
        },
        get: function (target, property) {
            if (property === 'errors') {
                return target.errors;
            }
            return target[property];
        }
    };

    const formProxy = new Proxy({ errors: {} }, validator);
    Array.from(form.elements).forEach(element => {
        if (element.name) {
            element.addEventListener('input', function (event) {
                formProxy[element.name] = event.target.value;
                if (formSubmitted) {
                    switch (element.name) {
                        case 'email':
                            emailErrorDiv.textContent = formProxy.errors.email;
                            break;
                        case 'password':
                            passwordErrorDiv.textContent = formProxy.errors.password;
                            break;
                    }
                }
            });
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!formSubmitted) {
            formSubmitted = true;
            for (let error in formProxy.errors) {
                switch (error) {
                    case 'email':
                        emailErrorDiv.textContent = formProxy.errors.email;
                        break;
                    case 'password':
                        passwordErrorDiv.textContent = formProxy.errors.password;
                        break;
                }
            }
        }
    });
}