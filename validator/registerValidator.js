const validator = require('validator');

const registerValidator = user => {
    let error = {}

    if (!user.name) {
        error.name = "Please Provide Your Name";
    }
    if (!user.email) {
        error.email = "Please Provide Your Email"
    } else if (!validator.isEmail(user.email)) {
        error.email = "Email is not valid"
    }

    if (!user.password) {
        error.password = "Please provide a password"
    } else if (user.password.length <= 6) {
        error.password = "password length must be grater than 6"
    }

    if (!user.confirmPassword) {
        error.confirmPassword = "Please provide a confirm password"
    } else if (user.password != user.confirmPassword) {
        error.password = "password doesn't match"
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}


module.exports = registerValidator;