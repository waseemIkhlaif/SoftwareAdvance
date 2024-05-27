const express = require('express');
const router = express.Router();
const KnowledgeBase = require("../models/KnowledgeBaseModel");


// create new Knowledgebase
router.post('/', async (req, res) => {
    try {
        const NewKnowledgebase = await KnowledgeBase.create(req.body);
        res.status(201).json(NewKnowledgebase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all cropplan
router.get('/', async (req, res) => {
    try {
        const Knowledgebases = await KnowledgeBase.findAll();
        if (Knowledgebases) {
            res.status(201).json(Knowledgebases);
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
        const singleKnowledge = await KnowledgeBase.findByPk(req.params.id);
        if (singleKnowledge) {
            res.status(201).json(singleKnowledge);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update knowledgebase
router.put('/:id', async (req, res) => {
    try {
        const updated = await KnowledgeBase.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedknowledgebase = await KnowledgeBase.findByPk(req.params.id);
            if (updatedknowledgebase) {
                res.status(201).json(updatedknowledgebase);
            } else {
                res.status(404).json({ error: 'knowledgebase not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete knowledgebase
router.delete("/:id", async (req, res) => {
    try {
        const deleteKnowledgeBase = await KnowledgeBase.destroy({ where: { id: req.params.id } });
        if (deleteKnowledgeBase) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;