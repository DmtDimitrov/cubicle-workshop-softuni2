const Accessory = require('../models/Accessory.js');
const Cube = require('../models/Cube.js');

const getAll = () => Cube.find({}).lean();

const getOne = (id) => Cube.findById(id).lean();

const getOneWithAccessories = (id) => Cube.findById(id).populate('accessories').lean();

const create = (name, description, imageUrl, difficultyLevel) => {
    let newCube = new Cube({
        name,
        description,
        imageUrl,
        difficultyLevel
    });
    return Cube.create(newCube);
};

const editOne = (cubeId, cubeObj) => Cube.findByIdAndUpdate(cubeId, cubeObj, { runValidators: true});

const deleteOne = (cubeId) => Cube.findByIdAndDelete(cubeId);


const search = async (searchedText, from, to) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
};

const attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    // console.log(`cube: ${cube}`);
    // console.log(`accessory: ${accessory}`);
    cube.accessories.push(accessory);
    return cube.save();
};

const cubeService = {
    create,
    getAll,
    getOne,
    search,
    attachAccessory,
    getOneWithAccessories,
    deleteOne,
    editOne
};

module.exports = cubeService;