const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const getHomeView = async (req, res) => {
    try {
        let cubes = await cubeService.getAll();
        res.render('index', { cubes });
    } catch (error) {
        res.status(400).send(error.message);
    };
};

const getAboutView = (req, res) => {
    res.render('about');
}

const getSearchView = async (req, res) => {
    try {
        let { search, from, to } = req.query;

        let cubes = await cubeService.search(search, from, to);

        res.render('search', { cubes });
    } catch (error) {
        res.status(400).send(error.message);
    };

};

router.get('/', getHomeView);
router.get('/about', getAboutView);
router.get('/search', getSearchView);

module.exports = router;