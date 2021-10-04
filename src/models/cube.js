const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  imageUrl: {
    type: String,
    required: true,
    validate: [/^https?:\/\//i, 'Invalid imageUrl!']
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