const express = require('express');
const accessoryService = require('../services/accessoryService.js');
const cubeService = require('../services/cubeService.js');
const router = express.Router({ mergeParams: true });



const attachAccessoryView = async (req, res) => {
    try {
        
        let cube = await cubeService.getOne(req.params.cubeId);
        console.log(cube);
        let accessory = await accessoryService.getAll()
        res.render('cube/accessory/add', { cube });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

router.get('/add', attachAccessoryView);

module.exports = router;