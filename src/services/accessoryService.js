const Accessory = require('../models/Accessory.js');

const create = (name, description, imageUrl) => {
    return Accessory.create({ name, description, imageUrl });
};

const getAll = () => {
    return Accessory.find({}).lean();
}

const getAllRemaining = (accessoryIds) => {
    return Accessory.find({ _id: { $nin: accessoryIds } }).lean();
}

const accessoryService = {
    create,
    getAll,
    getAllRemaining
};

module.exports = accessoryService;