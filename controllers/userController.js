const validate = require("../validator/registerValidator");

module.exports = {
    login(req, res) {
        let name = req.body.name;
        let email = req.body.email;

        res.json({
            message: `Welcome ${name} to Money App. You can login with this email: ${email}`
        })
    },

    register(req, res) {
        // Read client data
        let {name, email, password, confirmPassword} = req.body;

        // Validation client data
        let validator = validate({name, email, password, confirmPassword})

        if (!validator.isValid) {
            res.status(400).json(validator.error)
        } else {
            res.status(200).json({
                message: "Everything is ok"
            })
        }

        // Check duplicate user
        // new user object
        // save to database
        // response back with new data
    }
}



