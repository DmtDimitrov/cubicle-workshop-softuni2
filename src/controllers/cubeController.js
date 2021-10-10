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
    let editedCube = cubeService.getOne(req.params.cubeId);
    // console.log(req.params.cubeId);
    res.render('cube/edit', { ...editedCube });
};

const editCubeRoute = async (req, res) => {

    try {
        let editedCube = await cubeService.getOne(req.params.cubeId);
        // console.log(editedCube);
        res.render('cube/details', { ...editedCube });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const deleteCubeViewRoute = (req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    res.render('cube/delete');
};

const deleteCubeRoute = async (req, res) => {


};

router.get('/create', createCubeViewRoute);
router.post('/create', createCubeRoute);
router.get('/:cubeId/', cubeDetailsViewRoute)
router.use('/:cubeId/accessory', cubeAccessoryController)
router.get('/:cubeId/edit', editCubeViewRoute);
router.post('/:cubeId/edit', editCubeRoute);
router.get('/:cubeId/delete', deleteCubeViewRoute);
router.post('/:cubeId/delete', deleteCubeRoute);

module.exports = router;