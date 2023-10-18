const asyncHandler = require('express-async-handler')

// @des Get goals
// @route Get/api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})

// @des Set goal
// @route Post/api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400) // .json({ message: 'Please add a text field' })// This is a way of handling error
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set goals'})
})

// @des Update goals
// @route Put/api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

// @des Delete goals
// @route Delete/api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal,
}