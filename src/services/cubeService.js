const Cube = require('../models/cube.js');

const getAll = () => Cube.find({}).lean();

const getOne = (id) => Cube.findById(id).lean();

const create = (name, description, imageUrl, difficultyLevel) => {
    let newCube = new Cube({
        name, 
        description, 
        imageUrl, 
        difficultyLevel
    });
    Cube.create(newCube);
};

const search = async (searchedText, from, to) => {
    let result = await getAll();
    
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