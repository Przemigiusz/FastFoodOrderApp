export default function initializeRegistrationForm() {
    const form = document.querySelector('form');
    let formSubmitted = false;

    const firstNameErrorDiv = document.querySelector('.first-name-error');
    const lastNameErrorDiv = document.querySelector('.last-name-error');
    const emailErrorDiv = document.querySelector('.email-error');
    const passwordErrorDiv = document.querySelector('.password-error');
    const repeatPasswordErrorDiv = document.querySelector('.repeat-password-error');

    const validator = {
        set: function (target, property, value) {
            if (property === 'first-name') {
                let pattern = /^[a-zA-Z]+$/;
                if (!pattern.test(value)) {
                    target.errors[property] = 'Please enter a valid first name';
                } else {
                    delete target.errors[property];
                }
            }

            if (property === 'last-name') {
                let pattern = /^[a-zA-Z]+$/;
                if (!pattern.test(value)) {
                    target.errors[property] = 'Please enter a valid last name';
                } else {
                    delete target.errors[property];
                }
            }

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

            if (property === 'repeat-password') {
                if (typeof value !== 'string' || value.length < 8) {
                    target.errors[property] = 'Password must be a string and at least 8 characters long';
                } else if (value !== formProxy['password']) {
                    target.errors[property] = 'Passwords do not match';

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
                        case 'first-name':
                            firstNameErrorDiv.textContent = formProxy.errors['first-name'];
                            break;
                        case 'last-name':
                            lastNameErrorDiv.textContent = formProxy.errors['last-name'];
                            break;
                        case 'email':
                            emailErrorDiv.textContent = formProxy.errors.email;
                            break;
                        case 'password':
                            passwordErrorDiv.textContent = formProxy.errors.password;
                            break;
                        case 'repeat-password':
                            repeatPasswordErrorDiv.textContent = formProxy.errors['repeat-password'];
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
                    case 'first-name':
                        firstNameErrorDiv.textContent = formProxy.errors['first-name'];
                        break;
                    case 'last-name':
                        lastNameErrorDiv.textContent = formProxy.errors['last-name'];
                        break;
                    case 'email':
                        emailErrorDiv.textContent = formProxy.errors.email;
                        break;
                    case 'password':
                        passwordErrorDiv.textContent = formProxy.errors.password;
                        break;
                    case 'repeat-password':
                        repeatPasswordErrorDiv.textContent = formProxy.errors['repeat-password'];
                        break;
                }
            }
        }
    });
}