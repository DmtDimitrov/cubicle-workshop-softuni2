const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const homeView = (req, res) => {
    let cubes = cubeService.getAll();
    res.render('index', { cubes });
};

const aboutView = (req, res) => {
    res.render('about');
}

router.get('/', homeView);
router.get('/about', aboutView);

module.exports = router;