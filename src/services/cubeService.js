const Cube = require('../models/cube.js');

const getAll = () => Cube.cubes;

const create = (name, description, imageUrl, difficultyLevel) => {
    let newCube = new Cube(name, description, imageUrl, difficultyLevel);
    Cube.add(newCube);
};

const cubeService = {
    create,
    getAll
};

module.exports = cubeService;