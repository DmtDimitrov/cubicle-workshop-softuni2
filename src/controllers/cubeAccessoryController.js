const express = require('express');
const accessoryService = require('../services/accessoryService.js');
const cubeService = require('../services/cubeService.js');
const router = express.Router({ mergeParams: true });



const attachAccessoryView = async (req, res) => {
    try {
        
        let cube = await cubeService.getOne(req.params.cubeId);
       
        let accessories = await accessoryService.getAll()
        console.log(accessories);
        res.render('cube/accessory/add', { cube, accessories });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

router.get('/add', attachAccessoryView);

module.exports = router;