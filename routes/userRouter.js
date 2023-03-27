const router = require('express').Router();
const { register, login } = require('../controllers/userController');
// const login = require('../controllers/userController');


// Register Route
// localhost:4000/api/user/register
router.post('/register', register)

// Login Route
// localhost:4000/api/user/login
router.post('/login', login)

module.exports = router;

