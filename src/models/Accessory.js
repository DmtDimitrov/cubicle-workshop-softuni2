const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url is required!'],
        validate: [/^https?:\/\//i, 'invalid image url!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        maxlength: [200, 'Description max length is 200 characters!'],
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;