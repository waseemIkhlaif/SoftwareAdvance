const express = require('express');
const router = express.Router();
const Resource = require('../models/ResourceModel');

// create new Resource
router.post('/', async (req, res) => {
    try {
        const NewResource = await Resource.create(req.body);
        res.status(201).json(NewResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all Resource
router.get('/', async (req, res) => {
    try {
        const allResources = await Resource.findAll();
        if (allResources) {
            res.status(201).json(allResources);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single Resource
router.get('/:id', async (req, res) => {
    try {
        const singleResource = await Resource.findByPk(req.params.id);
        if (singleResource) {
            res.status(201).json(singleResource);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update Resource
router.put('/:id', async (req, res) => {
    try {
        const updated = await Resource.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedResource = await Resource.findByPk(req.params.id);
            if (updatedResource) {
                res.status(201).json(updatedResource);
            } else {
                res.status(404).json({ error: 'Resource not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete Resource
router.delete("/:id", async (req, res) => {
    try {
        const deleteResource = await Resource.destroy({ where: { id: req.params.id } });
        if (deleteResource) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;