const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const homeView = async (req, res) => {
    let cubes = await cubeService.getAll();
    res.render('index', { cubes });
};

const aboutView = (req, res) => {
    res.render('about');
}

const searchView = (req, res) => {
    // console.log(req.query);

    let { search, from, to } = req.query;

    let cubes = cubeService.search(search, from, to);

    res.render('search', { cubes });
}

router.get('/', homeView);
router.get('/about', aboutView);
router.get('/search', searchView);

module.exports = router;