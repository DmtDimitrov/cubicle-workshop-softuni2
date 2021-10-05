const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!']
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    maxlength: [200, 'Description max length is 200 characters!']
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
  }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;