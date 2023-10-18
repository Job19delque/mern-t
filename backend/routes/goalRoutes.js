const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')


// router.route('/').get(getGoals).post(setGoals)
// Since they are almost the same, the above code is just a cleaner version
router.get('/', getGoals)
router.post('/', setGoal)


// router.route('/:id').put(updateGoal).delete(deleteGoal)
// Since they are almost the same, the above code is just a cleaner version
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)


module.exports = router