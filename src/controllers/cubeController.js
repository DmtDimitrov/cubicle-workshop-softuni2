const express = require('express');
const router = express.Router();


const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware.js');


const getCreateCubeView = (req, res) => {
    res.render('cube/create', { title: 'Add Cube' });
};

const postCreateCube = async(req, res) => {

    let { name, description, imageUrl, difficultyLevel } = req.body;
    try {
        await cubeService.create(name, description, imageUrl, difficultyLevel, req.user._id);
        res.redirect('/');

    } catch (error) {
        // res.status(400).send(error.message);
        // res.end();
        // console.log(error.errors.name.message);
        // console.log(Object.keys(error.errors));
        let errors = Object.keys(error.errors).map(x => error.errors[x].message);
        console.log(errors);
        res.locals.errors = errors;
        res.render('cube/create', {})
    }
};

const getDetailsCubeView = async(req, res) => {

    try {
        let specificCube = await cubeService.getOneWithAccessories(req.params.cubeId);

        let isOwn = specificCube.creator == req.user._id;
        // console.log(`specificCube.creator: ${specificCube.creator}`);
        // console.log(`req.user._id: ${req.user._id}`);
        // console.log(req.params.cubeId);
        res.render('cube/details', {...specificCube, title: 'Details Cube', isOwn });

    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const getEditCubeView = async(req, res) => {
    try {
        let cubeId = req.params.cubeId;
        let editedCube = await cubeService.getOne(cubeId);
        console.log();
        // cube[`select${cube.difficultyLevel}`] = true;

        res.render('cube/edit', {...editedCube, title: 'Edit Cube' });
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postEditCubeView = async(req, res) => {

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

const getDeleteCubeView = async(req, res) => {
    try {
        // let cubeId = req.params.cubeId;
        // let cubeToDelete = await cubeService.getOne(cubeId);

        let cubeToDelete = req.cube;

        res.render('cube/delete', {...cubeToDelete, title: 'Delete Cube' });
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postDeleteCubeView = async(req, res) => {
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
router.get('/:cubeId/edit', authMiddleware.isAuth, isOwnCube, getEditCubeView);
router.post('/:cubeId/edit', authMiddleware.isAuth, isOwnCube, postEditCubeView);
router.get('/:cubeId/delete', authMiddleware.isAuth, isOwnCube, getDeleteCubeView);
router.post('/:cubeId/delete', authMiddleware.isAuth, isOwnCube, postDeleteCubeView);
router.use('/:cubeId/accessory', cubeAccessoryController)

module.exports = router;