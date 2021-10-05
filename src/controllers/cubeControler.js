const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const createCubeView = (req, res) => {
    let cubes = cubeService.getAll();

    res.render('cube/create');
};

const createCube = (req, res) => {
    let { name, description, imageUrl, difficultyLevel } = req.body;
    cubeService.create(name, description, imageUrl, difficultyLevel);
    res.redirect('/');
};

const cubeDetailsView = (req, res) => {
    let specificCube = cubeService.getOne(req.params.cubeId);
    res.render('details', { ...specificCube });
}

router.get('/create', createCubeView);
router.post('/create', createCube);
router.get('/:cubeId/', cubeDetailsView)

module.exports = router;