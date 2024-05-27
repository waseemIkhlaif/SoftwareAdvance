const express = require('express');
const router = express.Router();
const SoilData = require("../models/SoilDataModel");

// create new SoilData
router.post('/', async (req, res) => {
    try {
        const NewSoilData = await SoilData.create(req.body);
        res.status(201).json(NewSoilData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all SoilData
router.get('/', async (req, res) => {
    try {
        const allSoilData = await SoilData.findAll();
        if (allSoilData) {
            res.status(201).json(allSoilData);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single SoilData
router.get('/:id', async (req, res) => {
    try {
        const singlesoildata = await SoilData.findByPk(req.params.id);
        if (singlesoildata) {
            res.status(201).json(singlesoildata);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update SoilData
router.put('/:id', async (req, res) => {
    try {
        const updated = await SoilData.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedSoilData = await SoilData.findByPk(req.params.id);
            if (updatedSoilData) {
                res.status(201).json(updatedSoilData);
            } else {
                res.status(404).json({ error: 'SoilData not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete SoilData
router.delete("/:id", async (req, res) => {
    try {
        const deleteSoilData = await SoilData.destroy({ where: { id: req.params.id } });
        if (deleteSoilData) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;