const express = require('express');
const router = express.Router();


const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');


const getCreateCubeViewRoute = (req, res) => {
    res.render('cube/create');
};

const postCreateCubeRoute = async (req, res) => {

    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
        await cubeService.create(name, description, imageUrl, difficultyLevel);
        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getDetailsCubeViewRoute = async (req, res) => {

    try {
        let specificCube = await cubeService.getOneWithAccessories(req.params.cubeId);
        // console.log(req.params.cubeId);
        res.render('cube/details', { ...specificCube });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getEditCubeViewRoute = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        let editedCube = await cubeService.getOne(cubeId);

        res.render('cube/edit', editedCube);
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postEditCubeViewRoute = async (req, res) => {

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

const getDeleteCubeViewRoute = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        let cubeToDelete = await cubeService.getOne(cubeId);

        res.render('cube/delete', cubeToDelete);
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postDeleteCubeViewRoute = async (req, res) => {
    try {
        let cubeId = req.params.cubeId;
        await cubeService.deleteOne(cubeId);
        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

router.get('/create', authMiddleware.isAuth, getCreateCubeViewRoute);
router.post('/create', authMiddleware.isAuth, postCreateCubeRoute);
router.get('/:cubeId/', getDetailsCubeViewRoute)
router.get('/:cubeId/edit', authMiddleware.isAuth, getEditCubeViewRoute);
router.post('/:cubeId/edit', authMiddleware.isAuth, postEditCubeViewRoute);
router.get('/:cubeId/delete', authMiddleware.isAuth, getDeleteCubeViewRoute);
router.post('/:cubeId/delete', authMiddleware.isAuth, postDeleteCubeViewRoute);
router.use('/:cubeId/accessory', cubeAccessoryController)

module.exports = router;