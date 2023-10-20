// We are going to have three routes. 'Register; Login in and to get...
const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// 1 - Register/Create the user
router.post('/', registerUser) // it is /api/users - to add a resource. To a user, a registration.

// 2 - Login In
router.post('/login', loginUser)

// 3- To get the user information 
router.get('/me', protect, getMe)


module.exports = router