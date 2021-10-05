const express = require('express');

const homeController = require('../controllers/homeController.js');
const cubeController = require('../controllers/cubeController.js');
const errorController = require('../controllers/errorController.js');
const accessoryController = require('../controllers/accessoryController.js');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use(errorController);

module.exports = router;
