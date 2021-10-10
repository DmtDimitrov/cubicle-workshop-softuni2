const express = require('express');
const accessoryService = require('../services/accessoryService.js');
const cubeService = require('../services/cubeService.js');
const router = express.Router({ mergeParams: true });



const getAttachAccessoryView = async (req, res) => {
    try {
        let cube = await cubeService.getOne(req.params.cubeId);
        let accessories = await accessoryService.getAllRemaining(cube.accessories)
        // console.log(accessories);
        res.render('cube/accessory/add', { cube, accessories });
    } catch (error) {
        res.status(400).send(error.message);
        res.end();
    }
};

const postAttachAccessoryView = async (req, res) => {
    try {
        const cubeId = req.params.cubeId;
        const accessoryId = req.body.accessory;

        await cubeService.attachAccessory(cubeId, accessoryId);
        res.redirect(`/cube/${cubeId}`);
    } catch (error) {
        res.status(400).send(error.message);
        res.end();

    }
};

router.get('/add', getAttachAccessoryView);
router.post('/add', postAttachAccessoryView);

module.exports = router;