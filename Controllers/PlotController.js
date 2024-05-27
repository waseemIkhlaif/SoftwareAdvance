const express = require('express');
const router = express.Router();
const Plots = require('../models/PlotsModel');

// create new plot
router.post('/', async (req, res) => {
    try {
        const NewPlot = await Plots.create(req.body);
        res.status(201).json(NewPlot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all plots
router.get('/', async (req, res) => {
    try {
        const allPlots = await Plots.findAll();
        if (allPlots) {
            res.status(201).json(allPlots);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single plot
router.get('/:id', async (req, res) => {
    try {
        const singlePlot = await Plots.findByPk(req.params.id);
        if (singlePlot) {
            res.status(201).json(singlePlot);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update plot
router.put('/:id', async (req, res) => {
    try {
        const updated = await Plots.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedplot = await Plots.findByPk(req.params.id);
            if (updatedplot) {
                res.status(201).json(updatedplot);
            } else {
                res.status(404).json({ error: 'Plot not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete plot
router.delete("/:id", async (req, res) => {
    try {
        const deletePlot = await Plots.destroy({ where: { id: req.params.id } });
        if (deletePlot) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;