const Cube = require('../models/cube.js');

const getAll = () => Cube.cubes;

const getOne = (id) => Cube.cubes.find(x => x.id === id);

const create = (name, description, imageUrl, difficultyLevel) => {
    let newCube = new Cube(name, description, imageUrl, difficultyLevel);
    Cube.add(newCube);
};

const search = (searchedText, from, to) => {
    let result = getAll();
    
    if (searchedText) {
        result = result.filter(x => x.name.toLowerCase().includes(searchedText.toLowerCase()));
    };

    if (from) {
        result = result.filter(x => x.difficultyLevel >= from)
    };

    if (to) {
        result = result.filter(x => x.difficultyLevel <= to)
    };

    return result;
};

const cubeService = {
    create,
    getAll,
    getOne,
    search
};

module.exports = cubeService;