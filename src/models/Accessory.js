const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate:[/^https?:\/\//i, 'invalid image url!']
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;