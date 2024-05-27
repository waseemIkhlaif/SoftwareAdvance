const express = require('express');
const router = express.Router();
const CropPlanModel = require("../models/CropPlanModel");

// create new cropPlan
router.post('/', async (req, res) => {
    try {
        const NewCropPlan = await CropPlanModel.create(req.body);
        res.status(201).json(NewCropPlan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all cropplan
router.get('/', async (req, res) => {
    try {
        const cropsPlans = await CropPlanModel.findAll();
        if (cropsPlans) {
            res.status(201).json(cropsPlans);
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
        const singleCropPlan = await CropPlanModel.findByPk(req.params.id);
        if (singleCropPlan) {
            res.status(201).json(singleCropPlan);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update cropPlan
router.put('/:id', async (req, res) => {
    try {
        const updated = await CropPlanModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedcropPlan = await CropPlanModel.findByPk(req.params.id);
            if (updatedcropPlan) {
                res.status(201).json(updatedcropPlan);
            } else {
                res.status(404).json({ error: 'cropPlan not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete crop plan
router.delete("/:id", async (req, res) => {
    try {
        const deleteCropPlan = await CropPlanModel.destroy({ where: { id: req.params.id } });
        if (deleteCropPlan) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;