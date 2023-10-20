const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // what I am saying is that I this type to be an object Id
        required: true, // also required
        ref: 'User', // this a reference which the model ObjectId pertain to
    },
    text: {
        type: String,
        require: true // or [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)