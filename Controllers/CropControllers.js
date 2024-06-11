const express = require('express');
const router = express.Router();
const CropModel = require("../models/CropModel");
// create new crop
router.post('/', async (req, res) => {
    try {
        const NewCrop = await CropModel.create(req.body);
        res.status(201).json(NewCrop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all users
router.get('/', async (req, res) => {
    try {
        const crops = await CropModel.findAll();
        if (crops) {
            res.status(201).json(crops);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single user
router.get('/:id', async (req, res) => {
    try {
        const singleCrop = await CropModel.findByPk(req.params.id);
        if (singleCrop) {
            res.status(201).json(singleCrop);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update crop
router.put('/:id', async (req, res) => {
    try {
        const updated = await CropModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedcrop = await CropModel.findByPk(req.params.id);
            if (updatedcrop) {
                res.status(201).json(updatedcrop);
            } else {
                res.status(404).json({ error: 'crop not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete crop
router.delete("/:id", async (req, res) => {
    try {
        const deleteCrop = await CropModel.destroy({ where: { id: req.params.id } });
        if (deleteCrop) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;