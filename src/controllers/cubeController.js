const express = require('express');
const router = express.Router();

const cubeService = require('../services/cubeService.js');

const cubeAccessoryController = require('./cubeAccessoryController.js');


const createCubeViewRoute = (req, res) => {
    res.render('cube/create');
};

const createCubeRoute = async (req, res) => {
    
    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
       await cubeService.create(name, description, imageUrl, difficultyLevel);
        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const cubeDetailsViewRoute = async (req, res) => {
    
    try {
        let specificCube = await cubeService.getOneWithAccessories(req.params.cubeId);
        // console.log(req.params.cubeId);
        res.render('cube/details', { ...specificCube });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const editCubeViewRoute = (req, res) => {
    res.render('cube/edit');
};

const deleteCubeViewRoute = (req, res) => {
    res.render('cube/delete');
};

router.get('/create', createCubeViewRoute);
router.post('/create', createCubeRoute);
router.get('/edit', editCubeViewRoute);
// router.post('/edit', editCubeRoute);
router.get('/delete', deleteCubeViewRoute);
router.get('/:cubeId/', cubeDetailsViewRoute)
router.use('/:cubeId/accessory', cubeAccessoryController)

module.exports = router;