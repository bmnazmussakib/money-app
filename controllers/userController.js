const User = require("../models/User");
const bcrypt = require('bcrypt');
const registerValidator = require("../validator/registerValidator");
const { serverError, resourceError } = require("../utils/error");
const loginValidator = require("../validator/loginValidator");
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res) {

        // Step - 1: Extract Data from request
        // Step - 2: Validate Data
        // Step - 3: Check user availability
        // Step - 4: Compare password
        // Step - 5: Generate token and response back


        // =======================================
        // Step - 1: Extract Data from request
        // =======================================
        let { email, password } = req.body;


        // =======================================
        // Step - 2: Validate Data
        // =======================================
        const validate = loginValidator({ email, password })
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }


        // =======================================
        // Step - 3: Check user availability
        // =======================================
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return resourceError(res, "User not found")
                }

                // =======================================
                // Step - 4: Compare password
                // =======================================
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }

                    if (!result) {
                        return resourceError(res, "password doesn't match")
                    }

                    // =======================================
                    // Step - 5: Generate token and response back
                    // =======================================
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, "SECRET", { expiresIn: '1h' })


                    res.status(200).json({
                        message: "Login Successfully",
                        token: `Bearer ${token}`
                    })


                });
            })
            .catch(err => { serverError(res, err) })




    },

    register(req, res) {

        // Step - 1: Extract Data from request
        // Step - 2: Validate Data
        // Step - 3: Check duplicate user
        // Step - 4: New User Object
        // Step - 5: Save To Database
        // Step - 6: Response Back With New Data



        // =======================================
        // Step - 1: Extract Data from request
        // =======================================
        let { name, email, password, confirmPassword } = req.body;


        // =======================================
        // Step - 2: Validate Data
        // =======================================
        const validate = registerValidator({ name, email, password, confirmPassword })
        if (!validate.isValid) {
            res.status(400).json(validate.error)
        } else {

            // =======================================
            // Step - 3: Check duplicate user
            // =======================================
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, "User already exist");
                    }

                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            return resourceError(res, "Server Error Occurred");
                        }


                        // =======================================
                        // Step - 4: New User Object
                        // =======================================
                        let user = new User({
                            name,
                            email,
                            password: hash
                        })

                        // =======================================
                        // Step - 5: Save To Database
                        // =======================================
                        user.save()
                            .then(user => {

                                // =======================================
                                // Step - 6: Response Back With New Data
                                // =======================================
                                res.status(201).json({
                                    message: "User Created Successfully",
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    });

                })
                .catch(error => serverError(res, error))
        }
    }
}



