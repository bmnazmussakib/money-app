const User = require("../models/User");
const bcrypt = require('bcrypt');
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const { catchError, resourceError } = require("../utils/error");

module.exports = {
    login(req, res) {

        // Extract Data from request
        let { email, password } = req.body;
        
        // Validate Data
        let loginValidator = loginValidator({email, password})

        if(!loginValidator.isValid){
            res.status(400).json(loginValidator.error)
        } else {
            user.findOne({email})
            .then(user => {
                // Check for user availability
                if (!user) {
                    return resourceError(res, "User not found")
                }

                // Compare password
                bcrypt.compare(password, user.password, (err, result)=> {
                    if (err) {
                        return catchError(res, err)
                    }
                    if(!result) {
                        return resourceError(res, "password doesn't match")
                    }
                })
            })
            .catch(error => catchError(res, error))
        }


        
        
        // Generate token and response back

    },

    register(req, res) {
        // Step - 1: Read client data
        let { name, email, password, confirmPassword } = req.body;

        // Step - 2: Validation client data
        let registerValidator = registerValidator({ name, email, password, confirmPassword })

        if (!registerValidator.isValid) {
            res.status(400).json(registerValidator.error)
        } else {
            // Check duplicate user
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, "User already exist");
                    }

                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return resourceError(res, "Server Error Occurred");
                        }

                        // new user object
                        let user = new User({
                            name,
                            email,
                            password: hash
                        })

                        // save to database
                        user.save()
                            .then(user => {
                                // response back with new data
                                res.status(201).json({
                                    message: "User Created Successfully",
                                    user
                                })
                            })
                            .catch(error => catchError(res, error))


                    });

                })
                .catch(error => catchError(res, error))
        }
    }
}



