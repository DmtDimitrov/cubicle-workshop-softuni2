const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const homeView = async (req, res) => {
    try {
        let cubes = await cubeService.getAll();
        res.render('index', { cubes });
    } catch (error) {
        res.status(400).send(error.message);
    };
};

const aboutView = (req, res) => {
    res.render('about');
}

const searchView = async (req, res) => {
    try {
        let { search, from, to } = req.query;

        let cubes = await cubeService.search(search, from, to);

        res.render('search', { cubes });
    } catch (error) {
        res.status(400).send(error.message);
    };

};

router.get('/', homeView);
router.get('/about', aboutView);
router.get('/search', searchView);

module.exports = router;