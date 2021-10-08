const express = require('express');
const router = express.Router();

const cubeService = require('../services/cubeService.js');

const cubeAccessoryController = require('./cubeAccessoryController.js');


const createCubeView = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    
    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
       await cubeService.create(name, description, imageUrl, difficultyLevel);
        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const cubeDetailsView = async (req, res) => {
    
    try {
        let specificCube = await cubeService.getOneWithAccessories(req.params.cubeId);
        // console.log(req.params.cubeId);
        res.render('cube/details', { ...specificCube });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
}

router.get('/create', createCubeView);
router.post('/create', createCube);
router.get('/:cubeId/', cubeDetailsView)
router.use('/:cubeId/accessory', cubeAccessoryController)

module.exports = router;