const cubeService = require('../services/cubeService.js');

exports.isOwnCube = function(req, res, next) {
    let cube = cubeService.getOne(req.params.cubeId);

    if (cube.creator == req.user._id) {
        req.cube = cube;

        next();
    } else {
        next('You are not autorized!');

    }
}