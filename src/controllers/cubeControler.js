const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const createCubeView = (req, res) => {
    let cubes = cubeService.getAll();
    console.log(cubes);
    res.render('create');
};

const createCube = (req, res) => {
    console.log(req.body);
    let { name, description, imageUrl, difficultyLevel } = req.body;
    cubeService.create(name, description, imageUrl, difficultyLevel);
    res.redirect('/');
}

router.get('/create', createCubeView);
router.post('/create', createCube);

module.exports = router;