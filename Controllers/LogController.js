const express = require('express');
const router = express.Router();
const log = require('../models/LogModel');


// create new Knowledgebase
router.post('/', async (req, res) => {
    try {
        const Newlog = await log.create(req.body);
        res.status(201).json(Newlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all cropplan
router.get('/', async (req, res) => {
    try {
        const logs = await log.findAll();
        if (logs) {
            res.status(201).json(logs);
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
        const singleLog = await log.findByPk(req.params.id);
        if (singleLog) {
            res.status(201).json(singleLog);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update log
router.put('/:id', async (req, res) => {
    try {
        const updated = await log.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedLog = await log.findByPk(req.params.id);
            if (updatedLog) {
                res.status(201).json(updatedLog);
            } else {
                res.status(404).json({ error: 'log not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete log
router.delete("/:id", async (req, res) => {
    try {
        const deleteLog = await log.destroy({ where: { id: req.params.id } });
        if (deleteLog) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;