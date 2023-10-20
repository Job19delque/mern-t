const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @des Register new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) { // If no to any of the three body request do the below
        res.status(400) // throw a error...which is bad.
        throw new Error('Please add all fields')
    }

    // Check if the user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10) //Salt is needed to hash the password
    const hashedPassword = await bcrypt.hash(password, salt) // it's taking to things: the plain text password and next is the salt

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        }) //
    } else {
        res.status(100)
        throw new Error('Invalid user data')
    }
    // res.json({message: 'Register User'}) // If all the fields have been fixed. This before the hashpassword
})

// @des  Authenticate an user
// @route POST/api/users/login
// @access Public
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body

    // Check for user Email
    const user = await User.findOne({email})

    // Here the pass... we are going to send on the login will not be hashed
    // So we need to use the bcrypt.compare method to do that. 1-the plain password.2- the user we just fetched and the pass.hashed
    if(user && (await bcrypt.compare(password, user.password))) { // If it all turns out nicely we do below.
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else { // If not.
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @des Get user data
// @route GET/api/users/me
// @access Private
const getMe = asyncHandler( async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate a token(JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}