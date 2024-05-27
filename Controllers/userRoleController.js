const express = require('express');
const router = express.Router();
const userRole = require("../models/UserRolsModel");

// create new relation
router.post('/', async (req, res) => {
    try {
        const NewSoilData = await userRole.create(req.body);
        res.status(201).json(NewSoilData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all relations
router.get('/', async (req, res) => {
    try {
        const allData = await userRole.findAll();
        if (allData) {
            res.status(201).json(allData);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update relation
router.put('/:id', async (req, res) => {
    try {
        const updated = await userRole.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updateduserRole = await userRole.findByPk(req.params.id);
            if (updateduserRole) {
                res.status(201).json(updateduserRole);
            } else {
                res.status(404).json({ error: 'relation not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete relation
router.delete("/:id", async (req, res) => {
    try {
        const deleterelation = await userRole.destroy({ where: { user_id: req.params.id } });
        if (deleterelation) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;