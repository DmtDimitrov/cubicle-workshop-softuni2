const Cube = require('../models/cube.js');

const getAll = () => Cube.cubes;

const getOne = (id) => Cube.cubes.find(x => x.id === id);

const create = (name, description, imageUrl, difficultyLevel) => {
    let newCube = new Cube(name, description, imageUrl, difficultyLevel);
    Cube.add(newCube);
};

const cubeService = {
    create,
    getAll,
    getOne
};

module.exports = cubeService;