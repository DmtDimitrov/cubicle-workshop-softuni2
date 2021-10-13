const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: [5, 'Name should be at least 5 characters'],
        validate: [/^[a-zA-Z0-9\s]+$/, 'Name should have english letters and digits'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [20, 'Description should be at least 20 characters'],
        validate: [/^[a-zA-Z0-9\s]+$/, 'Name should have english letters and digits'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url is required!'],
        validate: [/^https?:\/\//i, 'Invalid image Url!']
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;