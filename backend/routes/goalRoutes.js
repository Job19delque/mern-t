const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')



// router.route('/').get(getGoals).post(setGoals)
// Since they are almost the same, the above code is just a cleaner version
router.get('/', protect, getGoals)
router.post('/', protect, setGoal)


// router.route('/:id').put(updateGoal).delete(deleteGoal)
// Since they are almost the same, the above code is just a cleaner version
router.put('/:id', protect, updateGoal)
router.delete('/:id', protect, deleteGoal)


module.exports = router