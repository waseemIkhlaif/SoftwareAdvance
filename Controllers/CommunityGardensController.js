const express = require('express');
const router = express.Router();
const CommunityGardens = require('../models/CommunityGardensModel.js');

//create new garden
router.post('/', async (req, res) => {
    try {
        const NewGarden = await CommunityGardens.create(req.body);
        res.status(201).json(NewGarden);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get all gardens
router.get('/', async (req, res) => {
    try {
        const allGardens = await CommunityGardens.findAll();
        res.status(201).json(allGardens);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});
//get garden by id
router.get('/:id', async (req, res) => {
    try {
        const singlegarden = await CommunityGardens.findByPk(req.params.id);
        if (singlegarden) {
            res.status(201).json(singlegarden);
        } else {
            res.status(400).json({ error: "Garden not found" });
        }
    } catch {
        res.status(400).json({ error: error.message });
    }
});
// update garden
router.put('/:id', async (req, res) => {
    try {
        const updated = await CommunityGardens.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCommunityGardens = await CommunityGardens.findByPk(req.params.id);
            if (updatedCommunityGardens) {
                res.status(201).json(updatedCommunityGardens);
            } else {
                res.status(404).json({ error: 'garden not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete garden
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await CommunityGardens.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).send();
        } else {
            res.status(400).json({ error: "garden not dound" });
        }
    } catch {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;