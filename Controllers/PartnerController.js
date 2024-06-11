const express = require('express');
const router = express.Router();
const Partner = require('../models/PartnerModel');

// create new Knowledgebase
router.post('/', async (req, res) => {
    try {
        const NewPartner = await Partner.create(req.body);
        res.status(201).json(NewPartner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all cropplan
router.get('/', async (req, res) => {
    try {
        const Partners = await Partner.findAll();
        if (Partners) {
            res.status(201).json(Partners);
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
        const singlePartner = await Partner.findByPk(req.params.id);
        if (singlePartner) {
            res.status(201).json(singlePartner);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update partner
router.put('/:id', async (req, res) => {
    try {
        const updated = await Partner.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedPartner = await Partner.findByPk(req.params.id);
            if (updatedPartner) {
                res.status(201).json(updatedPartner);
            } else {
                res.status(404).json({ error: 'partner not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete partner
router.delete("/:id", async (req, res) => {
    try {
        const deletePartner = await Partner.destroy({ where: { id: req.params.id } });
        if (deletePartner) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;