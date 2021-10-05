const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const createCubeView = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    
    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
       await cubeService.create(name, description, imageUrl, difficultyLevel);
        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message).end();
        
    }
};

const cubeDetailsView = async (req, res) => {
    
    try {
        let specificCube = await cubeService.getOne(req.params.cubeId);
        // console.log(req.params.cubeId);
        res.render('cube/details', { ...specificCube });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

router.get('/create', createCubeView);
router.post('/create', createCube);
router.get('/:cubeId/', cubeDetailsView)

module.exports = router;