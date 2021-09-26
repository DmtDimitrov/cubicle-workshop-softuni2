const express = require('express');

const router = express.Router();

const createCubeView = (req, res) => {
    res.render('create');
};

router.get('/create', createCubeView);

module.exports = router;