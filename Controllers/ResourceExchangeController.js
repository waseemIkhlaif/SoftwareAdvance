const express = require('express');
const router = express.Router();
const ResourceExchange = require('../models/ResourceExchangeModel');

// create new ResourceExchange
router.post('/', async (req, res) => {
    try {
        const NewResourceExchange = await ResourceExchange.create(req.body);
        res.status(201).json(NewResourceExchange);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all ResourceExchange
router.get('/', async (req, res) => {
    try {
        const allResourceExchange = await ResourceExchange.findAll();
        if (allResourceExchange) {
            res.status(201).json(allResourceExchange);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single ResourceExchange
router.get('/:id', async (req, res) => {
    try {
        const singleResourceExchange = await ResourceExchange.findByPk(req.params.id);
        if (singleResourceExchange) {
            res.status(201).json(singleResourceExchange);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update ResourceExchange
router.put('/:id', async (req, res) => {
    try {
        const updated = await ResourceExchange.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedResourceExchange = await ResourceExchange.findByPk(req.params.id);
            if (updatedResourceExchange) {
                res.status(201).json(updatedResourceExchange);
            } else {
                res.status(404).json({ error: 'ResourceExchange not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete ResourceExchange
router.delete("/:id", async (req, res) => {
    try {
        const deleteResourceExchange = await ResourceExchange.destroy({ where: { id: req.params.id } });
        if (deleteResourceExchange) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;