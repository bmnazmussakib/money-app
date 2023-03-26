const validator = require('validator');

const loginValidator = user => {
    let error = {}


    if (!user.email) {
        error.email = "Please Provide Your Email"
    } else if (!validator.isEmail(user.email)) {
        error.email = "Email is not valid"
    }

    if (!user.password) {
        error.password = "Please provide a password"
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}


module.exports = loginValidator;