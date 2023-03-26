const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: Number,
    income: Number,
    expense: Number,
    transaction: [{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;