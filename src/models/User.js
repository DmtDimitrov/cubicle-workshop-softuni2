const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required!']
    },
    password: {
        type: String,
        required:[true, 'Password is required!']
    }
})