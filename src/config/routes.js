const express = require('express');

const homeController = require('../controllers/homeController.js');
const cubeController = require('../controllers/cubeControler.js');
const errorController = require('../controllers/errorController.js');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use(errorController);

module.exports = router;
