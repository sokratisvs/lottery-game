export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(String(password));
}

export function fieldsValidation(email, password) {
    if (!email) {
        return {
            isValid: false,
            errorMessage: 'Please enter an email'
        }
    }

    if (!validateEmail(email)) {
        return {
            isValid: false,
            errorMessage: 'Please enter a valid email'
        }
    }

    if (!password) {
        return {
            isValid: false,
            errorMessage: 'Please enter a password'
        }
    }

    if (!validatePassword(password)) {
        return {
            isValid: false,
            errorMessage: 'Password must have at least 6 characters, at least one uppercase letter, one lowercase letter and one number'
        }
    }

    return {
        isValid: true,
        errorMessage: ''
    }
}