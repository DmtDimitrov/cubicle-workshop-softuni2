const express = require('express');
const router = express.Router();


const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


const getCreateCubeView = (req, res) => {
    res.render('cube/create', { title: 'Add Cube' });
};

const postCreateCube = async (req, res) => {

    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
        await cubeService.create(name, description, imageUrl, difficultyLevel);
        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getDetailsCubeView = async (req, res) => {

    try {
        let specificCube = await cubeService.getOneWithAccessories(req.params.cubeId);
        // console.log(req.params.cubeId);
        res.render('cube/details', { ...specificCube, title: 'Details Cube' });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getEditCubeView = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        let editedCube = await cubeService.getOne(cubeId);
        console.log();
        // cube[`select${cube.difficultyLevel}`] = true;

        res.render('cube/edit', { ...editedCube, title: 'Edit Cube' });
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postEditCubeView = async (req, res) => {

    try {
        let cubeId = req.params.cubeId;
        let { name, description, imageUrl, difficultyLevel } = req.body;

        await cubeService.editOne(cubeId, { name, description, imageUrl, difficultyLevel });

        res.redirect(`/cube/${cubeId}`)
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getDeleteCubeView = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        let cubeToDelete = await cubeService.getOne(cubeId);

        res.render('cube/delete', {...cubeToDelete, title: 'Delete Cube'});
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postDeleteCubeView = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        await cubeService.deleteOne(cubeId);
        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

router.get('/create', authMiddleware.isAuth, getCreateCubeView);
router.post('/create', authMiddleware.isAuth, postCreateCube);
router.get('/:cubeId/', getDetailsCubeView)
router.get('/:cubeId/edit', authMiddleware.isAuth, getEditCubeView);
router.post('/:cubeId/edit', authMiddleware.isAuth, postEditCubeView);
router.get('/:cubeId/delete', authMiddleware.isAuth, getDeleteCubeView);
router.post('/:cubeId/delete', authMiddleware.isAuth, postDeleteCubeView);
router.use('/:cubeId/accessory', cubeAccessoryController)

module.exports = router;